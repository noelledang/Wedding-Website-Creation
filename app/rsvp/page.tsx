"use client";

import { useState } from "react";
import { useLanguage } from "../LanguageProvider";

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbztNFNB_-PFYIfeqjL0gw-xr8uM1OwIx9IqkcSoLvLKW8M_rzPKRyi3hW1Kl5J68cVWbg/exec";
type Guest = {
    name: string;
};

export default function RSVPPage() {
    const { language } = useLanguage();

    const [attending, setAttending] = useState<"yes" | "no" | "">("");
    const [guestCount, setGuestCount] = useState(1);

    const [guestNames, setGuestNames] = useState<Guest[]>([
        {
            name: "",
        },
    ]);

    const [message, setMessage] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const isVietnamese = language === "viet";

    const handleAttendanceChange = (value: "yes" | "no") => {
        setAttending(value);
        setError("");

        if (value === "yes") {
            setGuestCount(1);

            setGuestNames([
                {
                    name: "",
                },
            ]);
        } else {
            setGuestCount(0);

            setGuestNames([
                {
                    name: "",
                },
            ]);
        }
    };

    const handleGuestCountChange = (count: number) => {
        setGuestCount(count);

        setGuestNames((currentGuests) => {
            const updatedGuests = [...currentGuests];

            while (updatedGuests.length < count) {
                updatedGuests.push({
                    name: "",
                });
            }

            return updatedGuests.slice(0, count);
        });
    };

    const handleGuestNameChange = (
        index: number,
        value: string
    ) => {
        setGuestNames((currentGuests) => {
            const updatedGuests = [...currentGuests];

            updatedGuests[index] = {
                name: value,
            };

            return updatedGuests;
        });

        setError("");
    };

    const handleSubmit = async () => {
        setError("");

        if (!attending) {
            setError(
                isVietnamese
                    ? "Vui lòng cho chúng mình biết bạn có tham dự hay không."
                    : "Please let us know if you will be attending."
            );
            return;
        }

        // Names are required only for guests who are attending
        if (attending === "yes") {
            const hasMissingName = guestNames.some(
                (guest) => !guest.name.trim()
            );

            if (hasMissingName) {
                setError(
                    isVietnamese
                        ? "Vui lòng nhập đầy đủ họ và tên của tất cả khách tham dự."
                        : "Please enter the full name for every guest."
                );
                return;
            }
        }

        setSubmitting(true);

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify({
                    attending,
                    guestCount: attending === "yes" ? guestCount : 0,
                    guests: guestNames,
                    message: message.trim(),
                }),
            });

            setSubmitted(true);
        } catch {
            setError(
                isVietnamese
                    ? "Đã xảy ra lỗi. Vui lòng thử lại."
                    : "Something went wrong. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    /* CONFIRMATION SCREEN */
    if (submitted) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6 section-texture">
                <section className="w-full max-w-2xl text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-16 md:px-16 shadow-sm">

                        <div className="flex justify-center mb-8">
                            <span className="text-5xl">🌸</span>
                        </div>

                        <p className="uppercase tracking-[0.3em] text-sm mb-5">
                            RSVP
                        </p>

                        <h1 className="font-heading text-5xl md:text-6xl mb-6">
                            {isVietnamese
                                ? "Cảm ơn bạn!"
                                : "Thank You!"}
                        </h1>

                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="h-px w-16 bg-[#D4AF37]" />
                            <span className="text-[#D4AF37] text-xl">✿</span>
                            <span className="h-px w-16 bg-[#D4AF37]" />
                        </div>

                        <p className="font-heading text-2xl md:text-3xl mb-6">
                            {isVietnamese
                                ? attending === "yes"
                                    ? "Chúng mình rất vui khi bạn sẽ chung vui cùng chúng mình!"
                                    : "Cảm ơn bạn đã cho chúng mình biết."
                                : attending === "yes"
                                    ? "We’re so happy you’ll be celebrating with us!"
                                    : "Thank you for letting us know."}
                        </p>

                        <p className="leading-relaxed max-w-lg mx-auto">
                            {isVietnamese
                                ? attending === "yes"
                                    ? "Xác nhận tham dự của bạn đã được ghi nhận. Chúng mình rất mong được gặp bạn trong ngày đặc biệt này."
                                    : "Chúng mình rất tiếc sẽ không có cơ hội được đón tiếp bạn trong ngày đặc biệt này, nhưng rất trân trọng lời chúc của bạn."
                                : attending === "yes"
                                    ? "Your RSVP has been received. We can't wait to celebrate this special day with you!"
                                    : "We’re sorry we won’t get to celebrate together, but we truly appreciate your warm wishes."}
                        </p>

                        <div className="mt-10">
                            <p className="font-heading text-3xl">
                                {isVietnamese
                                    ? "Cường & Nghi"
                                    : "Noelle & Nathan"}
                            </p>

                            <p className="text-sm tracking-[0.2em] uppercase mt-3">
                                September 13, 2027
                            </p>
                        </div>

                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen">

            {/* RSVP HEADER */}
            <section className="py-24 px-6 text-center section-texture">
                <div className="max-w-3xl mx-auto">

                    <p className="uppercase tracking-[0.3em] text-sm mb-4">
                        {isVietnamese
                            ? "Xác nhận tham dự"
                            : "RSVP"}
                    </p>

                    <h1 className="font-heading text-5xl md:text-6xl mb-6">
                        {isVietnamese
                            ? "Bạn sẽ tham dự chứ?"
                            : "Will You Join Us?"}
                    </h1>

                    <div className="flex justify-center mb-8">
                        <span className="text-3xl">❀</span>
                    </div>

                    <p className="max-w-xl mx-auto leading-relaxed">
                        {isVietnamese
                            ? "Vui lòng xác nhận tham dự để chúng mình có thể chuẩn bị chu đáo nhất cho ngày đặc biệt."
                            : "Please let us know if you'll be joining us so we can prepare for our special day."}
                    </p>

                </div>
            </section>

            {/* RSVP FORM */}
            <section className="py-20 px-6">
                <div className="max-w-2xl mx-auto">

                    {/* ATTENDANCE */}
                    <div className="mb-12">

                        <h2 className="font-heading text-3xl mb-6 text-center">
                            {isVietnamese
                                ? "Bạn có tham dự không?"
                                : "Will you be attending?"}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">

                            <button
                                type="button"
                                onClick={() =>
                                    handleAttendanceChange("yes")
                                }
                                className={`border px-6 py-5 rounded-lg transition ${attending === "yes"
                                        ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                                        : "border-gray-300 hover:border-[#D4AF37]"
                                    }`}
                            >
                                <span className="block text-lg">
                                    {isVietnamese
                                        ? "Chúng mình sẽ tham dự"
                                        : "Joyfully accepts"}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    handleAttendanceChange("no")
                                }
                                className={`border px-6 py-5 rounded-lg transition ${attending === "no"
                                        ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                                        : "border-gray-300 hover:border-[#D4AF37]"
                                    }`}
                            >
                                <span className="block text-lg">
                                    {isVietnamese
                                        ? "Rất tiếc không thể tham dự"
                                        : "Regretfully declines"}
                                </span>
                            </button>

                        </div>

                    </div>

                    {/* ATTENDING INFORMATION */}
                    {attending === "yes" && (
                        <div>

                            {/* GUEST COUNT */}
                            <div className="mb-12">

                                <h2 className="font-heading text-3xl mb-6 text-center">
                                    {isVietnamese
                                        ? "Có bao nhiêu người tham dự?"
                                        : "How many people are attending?"}
                                </h2>

                                <div className="flex justify-center">

                                    <select
                                        value={guestCount}
                                        onChange={(event) =>
                                            handleGuestCountChange(
                                                Number(event.target.value)
                                            )
                                        }
                                        className="border border-gray-300 rounded-lg px-6 py-4 text-lg bg-white"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map(
                                            (number) => (
                                                <option
                                                    key={number}
                                                    value={number}
                                                >
                                                    {number}
                                                </option>
                                            )
                                        )}
                                    </select>

                                </div>

                            </div>

                            {/* GUEST NAMES */}
                            <div className="mb-12">

                                <h2 className="font-heading text-3xl mb-8 text-center">
                                    {isVietnamese
                                        ? "Tên khách tham dự"
                                        : "Guest Names"}
                                </h2>

                                <div className="space-y-6">

                                    {guestNames.map(
                                        (guest, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-xl p-6"
                                            >

                                                <h3 className="font-heading text-2xl mb-5">
                                                    {isVietnamese
                                                        ? `Khách ${index + 1}`
                                                        : `Guest ${index + 1}`}
                                                </h3>

                                                <div>
                                                    <label className="block text-sm mb-2">
                                                        {isVietnamese
                                                            ? "Họ và tên"
                                                            : "Full Name"}
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={guest.name}
                                                        onChange={(event) =>
                                                            handleGuestNameChange(
                                                                index,
                                                                event.target.value
                                                            )
                                                        }
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition"
                                                        placeholder={
                                                            isVietnamese
                                                                ? "Nhập họ và tên"
                                                                : "Enter full name"
                                                        }
                                                    />
                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>

                            </div>

                            {/* OPTIONAL MESSAGE */}
                            <div className="mb-12">

                                <h2 className="font-heading text-3xl mb-3 text-center">
                                    {isVietnamese
                                        ? "Nhắn gửi đến Cường & Nghi"
                                        : "A Note to Noelle & Nathan"}
                                </h2>

                                <p className="text-center text-sm mb-6">
                                    {isVietnamese
                                        ? "Không bắt buộc"
                                        : "Optional"}
                                </p>

                                <textarea
                                    value={message}
                                    onChange={(event) =>
                                        setMessage(event.target.value)
                                    }
                                    rows={5}
                                    placeholder={
                                        isVietnamese
                                            ? "Gửi lời chúc đến chúng mình..."
                                            : "Leave us a little note or a message..."
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-5 py-4 resize-none focus:outline-none focus:border-[#D4AF37] transition"
                                />

                            </div>

                        </div>
                    )}

                    {/* DECLINING INFORMATION */}
                    {attending === "no" && (
                        <div className="mb-12">

                            {/* OPTIONAL NAME */}
                            <div className="mb-12">

                                <h2 className="font-heading text-3xl mb-3 text-center">
                                    {isVietnamese
                                        ? "Họ và tên"
                                        : "Your Name"}
                                </h2>

                                <p className="text-center text-sm mb-6">
                                    {isVietnamese
                                        ? "Không bắt buộc"
                                        : "Optional"}
                                </p>

                                <input
                                    type="text"
                                    value={guestNames[0]?.name || ""}
                                    onChange={(event) =>
                                        setGuestNames([
                                            {
                                                name: event.target.value,
                                            },
                                        ])
                                    }
                                    placeholder={
                                        isVietnamese
                                            ? "Nhập họ và tên"
                                            : "Enter your full name"
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] transition"
                                />

                            </div>

                            {/* OPTIONAL MESSAGE */}
                            <div>

                                <h2 className="font-heading text-3xl mb-3 text-center">
                                    {isVietnamese
                                        ? "Nhắn gửi đến Cường & Nghi"
                                        : "A Note to Noelle & Nathan"}
                                </h2>

                                <p className="text-center text-sm mb-6">
                                    {isVietnamese
                                        ? "Không bắt buộc"
                                        : "Optional"}
                                </p>

                                <textarea
                                    value={message}
                                    onChange={(event) =>
                                        setMessage(event.target.value)
                                    }
                                    rows={5}
                                    placeholder={
                                        isVietnamese
                                            ? "Gửi lời chúc đến chúng mình..."
                                            : "Leave us a little note or a message..."
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-5 py-4 resize-none focus:outline-none focus:border-[#D4AF37] transition"
                                />

                            </div>

                        </div>
                    )}

                    {/* ERROR MESSAGE */}
                    {error && (
                        <div className="mb-8 text-center">
                            <p className="text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* SUBMIT */}
                    {attending && (
                        <div className="text-center">

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="bg-[#D4AF37] text-white px-10 py-4 rounded-lg text-lg hover:opacity-90 transition disabled:opacity-50"
                            >
                                {submitting
                                    ? isVietnamese
                                        ? "Đang gửi..."
                                        : "Submitting..."
                                    : isVietnamese
                                        ? "Gửi xác nhận"
                                        : "Submit RSVP"}
                            </button>

                        </div>
                    )}

                </div>
            </section>

        </main>
    );
}