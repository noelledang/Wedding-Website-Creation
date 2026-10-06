import { randomUUID } from "node:crypto";
import { getInvitation, saveInvitationResponse, type InvitationResponse } from "../../../lib/invitation-store";
import { invitationRSVP } from "../../../lib/invitation-rsvp";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbztNFNB_-PFYIfeqjL0gw-xr8uM1OwIx9IqkcSoLvLKW8M_rzPKRyi3hW1Kl5J68cVWbg/exec";

export async function POST(request: Request) {
    try {
        let body = await request.json();
        let invitationResponse: InvitationResponse | undefined;
        const responseId = randomUUID();
        if (body && Object.prototype.hasOwnProperty.call(body, "invitationToken") && body.invitationToken !== undefined) {
            if (typeof body.invitationToken !== "string") return NextResponse.json({ success: false, error: "Invalid invitation." }, { status: 400 });
            const invitation = await getInvitation(body.invitationToken);
            if (!invitation) return NextResponse.json({ success: false, error: "Invitation not found." }, { status: 404 });
            try { body = invitationRSVP(body, invitation); }
            catch { return NextResponse.json({ success: false, error: "Please check the guest names and party size." }, { status: 400 }); }
            invitationResponse = {
                invitationToken: invitation.token, eventGroup: invitation.eventGroup,
                guestName: invitation.guestName, attending: body.attending, guestCount: body.guestCount,
                guests: body.guests, message: body.message, submittedAt: new Date().toISOString(), googleSaved: false,
            };
            // Save the group before forwarding. The existing Google Script may ignore extra columns.
            await saveInvitationResponse(invitationResponse, responseId);
        }

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(body),
            cache: "no-store",
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error(
                "Google RSVP response:",
                response.status,
                responseText.slice(0, 500)
            );

            return NextResponse.json(
                { success: false },
                { status: 502 }
            );
        }

        let result: { success?: boolean };

        try {
            result = JSON.parse(responseText);
        } catch {
            console.error(
                "Google RSVP returned non-JSON:",
                responseText.slice(0, 500)
            );

            return NextResponse.json(
                { success: false },
                { status: 502 }
            );
        }

        if (result.success !== true) {
            console.error("Google RSVP did not confirm success:", result);

            return NextResponse.json(
                { success: false },
                { status: 502 }
            );
        }

        if (invitationResponse) {
            // Google has already confirmed. A receipt update failure must not encourage duplicate sheet submissions.
            try { await saveInvitationResponse({ ...invitationResponse, googleSaved: true }, responseId); }
            catch { console.error("Google RSVP saved, but invitation receipt confirmation needs reconciliation:", responseId); }
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Mobile RSVP submission failed:", error);

        return NextResponse.json(
            { success: false },
            { status: 502 }
        );
    }
}