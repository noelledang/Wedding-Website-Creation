"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import { useInvitation } from "./InvitationProvider";
import { invitationHref } from "../lib/invitation";
export default function InvitationLink({ href, ...props }: ComponentProps<typeof Link>) {
  const invitation = useInvitation();
  return <Link {...props} href={typeof href === "string" ? invitationHref(href, invitation?.token) : href} />;
}
