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
      scroll: "Scroll to explore",
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
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/hero-ocean-background.png')",
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


        {/* OUR WEDDING SECTION */}
        <section
          id="details"
          className="py-28 px-6 bg-[#FDEFE8]"
        >
          <div className="max-w-6xl mx-auto text-center">

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

                <div className="grid md:grid-cols-3 gap-12 mt-16">

                  {/* DATE */}
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.3em] text-[#916A63]">
                      When
                    </p>

                    <h3 className="font-heading text-3xl text-[#622825] mt-3">
                      The Date
                    </h3>

                    <p className="font-body text-sm text-[#916A63] mt-4">
                      March 13, 2027
                    </p>
                  </div>

                  {/* VENUE */}
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.3em] text-[#916A63]">
                      Where
                    </p>

                    <h3 className="font-heading text-3xl text-[#622825] mt-3">
                      The Venue
                    </h3>

                    <p className="font-body text-sm text-[#916A63] mt-4">
                      The Ocean Villas Resort
                    </p>

                    <p className="font-body text-xs text-[#916A63] mt-1">
                      Da Nang, Viet Nam
                    </p>
                  </div>

                  {/* ATTIRE */}
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.3em] text-[#916A63]">
                      Attire
                    </p>

                    <h3 className="font-heading text-3xl text-[#622825] mt-3">
                      Dress Code
                    </h3>

                    <p className="font-body text-sm text-[#916A63] mt-4">
                      Formal / Garden Elegant
                    </p>

                    <p className="font-body text-xs leading-6 text-[#916A63] mt-2">
                      No white, jeans, shorts, or sneakers
                    </p>
                  </div>

                </div>
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
                        <circle cx="25" cy="32" r="12" />
                        <circle cx="39" cy="32" r="12" />
                      </svg>
                    </div>

                    <h3 className="font-heading text-2xl text-[#5f4a42]">
                      Thời gian
                    </h3>

                    <p className="mt-3 font-body text-sm text-[#8c756b]">
                      13 tháng 3, 2027
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
                      Địa điểm
                    </h3>

                    <p className="mt-3 font-body text-sm text-[#8c756b]">
                      The Ocean Villas Resort
                      <br />
                      Đà Nẵng, Việt Nam
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
                      Trang phục
                    </h3>

                    <p className="mt-3 font-body text-sm text-[#8c756b]">
                      Trang trọng
                      <br />
                      Thanh lịch
                    </p>

                  </div>

                </div>
              </>
            )}

          </div>
        </section>


      </main>
    </>
  );
}