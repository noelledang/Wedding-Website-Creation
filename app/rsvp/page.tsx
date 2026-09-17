"use client";

import { useLanguage } from "../LanguageProvider";

export default function RSVPPage() {
    const { language } = useLanguage();

    return (
        <main className="min-h-screen text-[#622825]">

            {/* HERO */}
            <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-28 section-texture">

                {/* SECTION HEADER */}
                <div className="mb-10">

                    <p className="font-body text-xs uppercase tracking-[0.3em] text-[#916A63] mb-6">
                        {language === "eng"
                            ? "We'd Love to Celebrate With You"
                            : "Chúng Tôi Rất Mong Được Đón Tiếp Bạn"}
                    </p>

                    <h1 className="font-heading text-6xl md:text-8xl text-[#622825]">
                        {language === "eng"
                            ? "RSVP"
                            : "Xác Nhận Tham Dự"}
                    </h1>

                    <div className="mt-6 text-[#D4AF37] text-2xl">
                        ❦
                    </div>

                </div>

                <p className="font-body text-sm md:text-base max-w-xl leading-8 text-[#916A63]">
                    {language === "eng"
                        ? "Please let us know if you'll be joining us as we celebrate our wedding day."
                        : "Vui lòng cho chúng tôi biết bạn có thể tham dự ngày vui của chúng tôi hay không."}
                </p>

                {/* RSVP BUTTON */}
                <a
                    href="https://forms.gle/acJ9i9A2xHR5p3yP8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 inline-block border border-[#622825] px-10 py-4 font-body text-xs uppercase tracking-[0.25em] text-[#622825] hover:bg-[#622825] hover:text-[#FDEFE8] transition"
                >
                    {language === "eng"
                        ? "RSVP Now"
                        : "Xác Nhận Ngay"}
                </a>

            </section>


            {/* DETAILS */}
            <section className="px-6 pb-24 text-center section-texture">

                <div className="max-w-2xl mx-auto border-t border-[#916A63]/30 pt-12">

                    <p className="font-heading text-3xl md:text-4xl text-[#622825]">
                        {language === "eng"
                            ? "We Hope to See You There"
                            : "Chúng Tôi Mong Được Gặp Bạn"}
                    </p>

                    <p className="mt-6 font-body text-sm leading-8 text-[#916A63]">
                        {language === "eng"
                            ? "Your presence means so much to us. Thank you for being part of this special chapter in our lives."
                            : "Sự hiện diện của bạn có ý nghĩa rất lớn đối với chúng tôi. Cảm ơn bạn đã trở thành một phần trong chương đặc biệt này của cuộc đời chúng tôi."}
                    </p>

                </div>

            </section>

        </main>
    );
}