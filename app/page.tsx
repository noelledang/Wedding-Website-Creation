"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Home() {
  const { language } = useLanguage();

  const coupleNames =
    language === "eng" ? "Noelle & Nathan" : "Tấn Cường & Lãm Nghi";

  const translations = {
    eng: {
      heroTogether: "Together with their families",
      heroInvitation: "We invite you to celebrate the wedding of",
      heroDate: "MARCH 13, 2027",
      heroMessage: "Please join us as we celebrate our love",
      scroll: "We can't wait to see you!",
    },

    viet: {
      heroTogether: "Welcome to Our Wedding!",
      heroInvitation: "Save the Date",
      heroDate: "NGÀY 13 THÁNG 3, 2027",
      heroMessage:
        "Trân trọng kính mời mọi người cùng chung vui trong ngày trọng đại của chúng tôi",
      scroll: "Kính mời!",
    },
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2027-03-13T16:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(
            difference / (1000 * 60 * 60 * 24)
          ),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            (difference % (1000 * 60 * 60)) /
            (1000 * 60)
          ),
          seconds: Math.floor(
            (difference % (1000 * 60)) / 1000
          ),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <main>

        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden">

          {/* Hero Background */}
          <div
            className="absolute inset-0 bg-cover bg-top"
            style={{
              backgroundImage:
                "url('/images/white flowers.png')",
            }}
          />

          {/* Light Overlay */}
          <div className="absolute inset-0 bg-white/10" />

          {/* Hero Content */}
          <div className="relative z-10 text-center">

            <p className="font-body text-sm uppercase tracking-[0.35em] mb-6">
              {translations[language].heroTogether}
            </p>

            <p className="font-body text-sm uppercase tracking-[0.15em] mb-6">
              {translations[language].heroInvitation}
            </p>

            <h1 className="font-great-vibes text-7xl md:text-9xl text-[var(--color-gold-accent)]">
              {language === "viet" ? (
                <>
                  <span className="block">Tấn Cường</span>

                  <span className="flex justify-center my-3">
                    <svg
                      viewBox="0 0 100 50"
                      className="w-16 h-8 md:w-20 md:h-10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <circle
                        cx="38"
                        cy="25"
                        r="16"
                        stroke="var(--color-gold-accent)"
                        strokeWidth="3"
                      />
                      <circle
                        cx="62"
                        cy="25"
                        r="16"
                        stroke="var(--color-gold-accent)"
                        strokeWidth="3"
                      />
                    </svg>
                  </span>

                  <span className="block">Lãm Nghi</span>
                </>
              ) : (
                coupleNames
              )}
            </h1>

            <div className="flex items-center justify-center gap-4 mt-8">
              <span className="h-px w-16 bg-[#916A63]/50"></span>
              <span className="text-lg text-[#916A63]">♥</span>
              <span className="h-px w-16 bg-[#916A63]/50"></span>
            </div>

            <div className="mt-8">

              {/* WEDDING DATE */}
              <p className="font-body text-sm uppercase tracking-[0.3em] text-[#622825]">
                {translations[language].heroDate}
              </p>

              {/* COUNTDOWN */}
              <div className="grid grid-cols-4 gap-3 md:gap-5 max-w-lg mx-auto mt-10">

                {/* DAYS */}
                <div className="border border-[#916A63]/30 py-5 px-2">
                  <p className="font-heading text-4xl md:text-5xl text-[var(--color-gold-accent)]">
                    {timeLeft.days}
                  </p>

                  <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                    {language === "eng" ? "Days" : "Ngày"}
                  </p>
                </div>

                {/* HOURS */}
                <div className="border border-[#916A63]/30 py-5 px-2">
                  <p className="font-heading text-4xl md:text-5xl text-[var(--color-gold-accent)]">
                    {timeLeft.hours}
                  </p>

                  <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                    {language === "eng" ? "Hours" : "Giờ"}
                  </p>
                </div>

                {/* MINUTES */}
                <div className="border border-[#916A63]/30 py-5 px-2">
                  <p className="font-heading text-4xl md:text-5xl text-[var(--color-gold-accent)]">
                    {timeLeft.minutes}
                  </p>

                  <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                    {language === "eng" ? "Minutes" : "Phút"}
                  </p>
                </div>

                {/* SECONDS */}
                <div className="border border-[#916A63]/30 py-5 px-2">
                  <p className="font-heading text-4xl md:text-5xl text-[var(--color-gold-accent)]">
                    {timeLeft.seconds}
                  </p>

                  <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                    {language === "eng" ? "Seconds" : "Giây"}
                  </p>
                </div>

              </div>

              {/* HERO MESSAGE */}
              <p className="font-script text-3xl md:text-4xl mt-10 text-[#916A63]">
                {translations[language].heroMessage}
              </p>

              {/* SCROLL */}
              <div className="mt-12">
                <span className="font-body text-xs uppercase tracking-[0.3em]">
                  {translations[language].scroll}
                </span>
              </div>

            </div>

          </div>
        </section>


        {/* VIETNAMESE FAMILY SECTION */}
        {language === "viet" && (
          <section className="py-24 px-6 section-texture">

            <div className="max-w-5xl mx-auto text-center">

              {/* SECTION HEADER */}
              <div className="text-center">

                <p className="font-body text-xs uppercase tracking-[0.3em] text-[#916A63]">
                  Với sự chúc phúc của:
                </p>

                <h2 className="font-heading text-4xl md:text-5xl text-[#622825] mt-4">
                  Gia Đình Hai Bên
                </h2>

              </div>


              {/* Divider */}
              <div className="flex items-center justify-center gap-5 my-10">
                <span className="h-px w-20 bg-[#916A63]/30"></span>

                <span className="text-xl text-[var(--color-gold-accent)]">
                  ❦
                </span>

                <span className="h-px w-20 bg-[#916A63]/30"></span>
              </div>


              {/* FAMILY GROUPS */}
              <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">

                {/* BRIDE'S FAMILY */}
                <div className="text-center">

                  {/* Female Icon */}
                  {/* Female Icon */}
                  <div className="mb-5 flex justify-center">
                    <svg
                      viewBox="0 0 64 64"
                      className="h-14 w-14 text-[var(--color-gold-accent)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {/* Head */}
                      <circle cx="32" cy="17" r="7" />

                      {/* Long Flowing Hair */}
                      <path d="M25 18c-5 2-7 7-6 13 1 5 3 9 1 14" />
                      <path d="M39 18c5 2 7 7 6 13-1 5-3 9-1 14" />

                      {/* Hair framing face */}
                      <path d="M25 13c2-5 5-7 7-7s5 2 7 7" />

                      {/* Shoulders / Dress */}
                      <path d="M23 34c2-5 5-8 9-8s7 3 9 8" />
                      <path d="M23 34l-7 22h32l-7-22" />

                      {/* Neckline */}
                      <path d="M27 28c1.5 2 3 3 5 3s3.5-1 5-3" />

                      {/* Dress Detail */}
                      <path d="M21 43c7 3 15 3 22 0" />
                    </svg>
                  </div>


                  <h3 className="font-heading text-2xl md:text-3xl text-[#5f4a42]">
                    Gia đình nhà gái
                  </h3>

                  <div className="mt-6 space-y-2">

                    <p className="font-body text-base text-[#8c756b]">
                      Ông: Đặng Mậu Tân
                    </p>

                    <p className="font-body text-base text-[#8c756b]">
                      Bà: Lâm Thị Lan
                    </p>

                  </div>

                </div>


                {/* GROOM'S FAMILY */}
                <div className="text-center">

                  {/* Male Icon */}
                  <div className="mb-5 flex justify-center">
                    <svg
                      viewBox="0 0 64 64"
                      className="h-14 w-14 text-[var(--color-gold-accent)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {/* Head */}
                      <circle cx="32" cy="16" r="7" />

                      {/* Hair */}
                      <path d="M25 15c1-5 4-8 7-8s6 2 7 7" />

                      {/* Shoulders / Suit */}
                      <path d="M23 34c2-5 5-8 9-8s7 3 9 8" />
                      <path d="M23 34l-7 22h32l-7-22" />

                      {/* Shirt / Tie */}
                      <path d="M27 28l5 7 5-7" />
                      <path d="M30 35l2 5 2-5" />

                      {/* Jacket Detail */}
                      <path d="M21 43l11 13 11-13" />
                    </svg>
                  </div>


                  <h3 className="font-heading text-2xl md:text-3xl text-[#5f4a42]">
                    Gia đình nhà trai
                  </h3>

                  <div className="mt-6 space-y-2">

                    <p className="font-body text-base text-[#8c756b]">
                      Ông: Huỳnh Văn Tấn
                    </p>

                    <p className="font-body text-base text-[#8c756b]">
                      Bà: Phạm Thị Thu
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>
        )}

        {/* OUR WEDDING SECTION */}
        <section
          id="details"
          className="py-28 px-6 section-texture"
        >
          <div className="max-w-6xl mx-auto text-center">

            {/* SECTION HEADER */}
            <div className="text-center">

              {language === "eng" ? (
                <>
                  <p className="font-body text-xs uppercase tracking-[0.3em] text-[#916A63]">
                    The beginning of forever
                  </p>

                  <h2 className="font-heading text-5xl md:text-6xl text-[#622825] mt-4">
                    Our Wedding
                  </h2>

                  <p className="font-script text-3xl md:text-4xl text-[#916A63] mt-6">
                    Join us as we celebrate
                  </p>
                </>
              ) : (
                <>
                  <p className="font-body text-xs uppercase tracking-[0.3em] text-[#916A63]">
                    Khởi đầu của một hành trình mới
                  </p>

                  <h2 className="font-heading text-5xl md:text-6xl text-[#622825] mt-4">
                    Ngày Cưới
                  </h2>

                  <p className="font-script text-3xl md:text-4xl text-[#916A63] mt-6">
                    Cùng chúng tôi chung vui
                  </p>
                </>
              )}

            </div>


            <div className="grid md:grid-cols-3 gap-12 mt-16">

              {/* DATE */}
              <div className="text-center">

                <div className="mb-4 flex justify-center">
                  <svg
                    viewBox="0 0 64 64"
                    className="h-12 w-12 text-[var(--color-gold-accent)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="12"
                      y="14"
                      width="40"
                      height="38"
                      rx="2"
                    />

                    <path d="M21 10v9" />
                    <path d="M43 10v9" />
                    <path d="M12 25h40" />

                    <circle
                      cx="22"
                      cy="34"
                      r="1"
                      fill="currentColor"
                    />
                    <circle
                      cx="32"
                      cy="34"
                      r="1"
                      fill="currentColor"
                    />
                    <circle
                      cx="42"
                      cy="34"
                      r="1"
                      fill="currentColor"
                    />

                    <circle
                      cx="22"
                      cy="43"
                      r="1"
                      fill="currentColor"
                    />
                    <circle
                      cx="32"
                      cy="43"
                      r="1"
                      fill="currentColor"
                    />
                    <circle
                      cx="42"
                      cy="43"
                      r="1"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <h3 className="font-heading text-2xl text-[#5f4a42]">
                  {language === "eng"
                    ? "Date"
                    : "Ngày"}
                </h3>

                <p className="mt-3 font-body text-sm text-[#8c756b]">
                  {language === "eng"
                    ? "March 13, 2027"
                    : "13 tháng 3, 2027"}
                </p>

              </div>


              {/* VENUE */}
              <div className="text-center">

                <div className="mb-4 flex justify-center">
                  <svg
                    viewBox="0 0 64 64"
                    className="h-12 w-12 text-[var(--color-gold-accent)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M32 56s18-17.2 18-32A18 18 0 0 0 14 24c0 14.8 18 32 18 32Z" />
                    <circle cx="32" cy="24" r="6" />
                  </svg>
                </div>

                <h3 className="font-heading text-2xl text-[#5f4a42]">
                  {language === "eng"
                    ? "Venue"
                    : "Địa điểm"}
                </h3>

                <p className="mt-3 font-body text-sm text-[#8c756b]">
                  The Ocean Villas Resort
                  <br />
                  {language === "eng"
                    ? "Da Nang, Viet Nam"
                    : "Đà Nẵng, Việt Nam"}
                </p>

              </div>


              {/* ATTIRE */}
              <div className="text-center">

                <div className="mb-4 flex justify-center">
                  <svg
                    viewBox="0 0 64 64"
                    className="h-12 w-12 text-[var(--color-gold-accent)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M28 8c0 3 1.5 6 4 7.5C34.5 14 36 11 36 8" />
                    <path d="M28 15.5 22 22l-7 4 7 4" />
                    <path d="M36 15.5 42 22l7 4-7 4" />
                    <path d="M22 30c4 2 16 2 20 0" />
                    <path d="M22 30 13 56h38L42 30" />
                    <path d="M18 43c9 3 19 3 28 0" />
                    <path d="M13 56h38" />
                  </svg>
                </div>

                <h3 className="font-heading text-2xl text-[#5f4a42]">
                  {language === "eng"
                    ? "Attire"
                    : "Trang phục"}
                </h3>

                <p className="mt-3 font-body text-sm text-[#8c756b]">
                  {language === "eng" ? (
                    <>
                      Formal
                      <br />
                      Garden Elegant
                    </>
                  ) : (
                    <>
                      Trang trọng
                      <br />
                      Thanh lịch
                    </>
                  )}
                </p>

              </div>

            </div>

          </div>
        </section>

      </main>
    </>
  );
}