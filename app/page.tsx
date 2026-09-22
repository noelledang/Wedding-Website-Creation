
"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import Link from "next/link";
import MobileSlideshow from "./components/MobileSlideshow";

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
      rsvp: "RSVP",
    },

    viet: {
      heroTogether: "Welcome to Our Wedding!",
      heroInvitation: "Save the Date",
      heroDate: "NGÀY 13 THÁNG 3, 2027",
      heroMessage: "Trân trọng kính mời mọi người cùng chung vui trong ngày trọng đại của chúng tôi",
      scroll: "Kính mời!",
      rsvp: "Xác nhận tham dự",
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

        {/* MOBILE SLIDESHOW */}
        <div id="mobile-home" className="md:hidden scroll-mt-24"><MobileSlideshow /></div>

        {/* ========================= */}
        {/* MOBILE HERO */}
        {/* ========================= */}

        <section className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-12 overflow-hidden md:hidden">

          {/* Mobile Hero Background */}
          <div className="absolute inset-0">
            <img
              src="/images/hero.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Light Overlay */}
          <div className="absolute inset-0 bg-white/10" />

          {/* Mobile Hero Content */}
          <div className="relative z-10 w-full text-center">

            {/* INTRO */}
            <p className="font-body text-sm uppercase tracking-[0.35em] mb-6">
              {translations[language].heroTogether}
            </p>

            <p className="font-body text-sm uppercase tracking-[0.15em] mb-6">
              {translations[language].heroInvitation}
            </p>

            {/* COUPLE NAMES */}
            {language === "viet" ? (
              <h1 className="font-great-vibes text-7xl text-[var(--color-gold-accent)]">

                <span className="block">
                  Tấn Cường
                </span>

                <span className="flex justify-center my-3">
                  <svg
                    viewBox="0 0 100 50"
                    className="w-16 h-8"
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

                <span className="block">
                  Lãm Nghi
                </span>

              </h1>
            ) : (
              <div className="text-center leading-none">

                <h1 className="font-heading text-6xl font-light tracking-[0.18em] uppercase text-[var(--color-gold-accent)]">
                  NOELLE
                </h1>

                <div className="font-script text-4xl text-[#916A63] -mt-2">
                  Dang
                </div>

                <div className="flex items-center justify-center gap-3 my-4">

                  <span className="h-px w-10 bg-[#916A63]/40"></span>

                  <span className="font-script text-3xl text-[#916A63]">
                    &
                  </span>

                  <span className="h-px w-10 bg-[#916A63]/40"></span>

                </div>

                <h1 className="font-heading text-6xl font-light tracking-[0.18em] uppercase text-[var(--color-gold-accent)]">
                  NATHAN
                </h1>

                <div className="font-script text-4xl text-[#916A63] -mt-2">
                  Huynh
                </div>

              </div>
            )}

            {/* DECORATIVE DIVIDER */}
            <div className="flex items-center justify-center gap-4 mt-8">

              <span className="h-px w-16 bg-[#916A63]/50"></span>

              <span className="text-lg text-[#916A63]">
                ♥
              </span>

              <span className="h-px w-16 bg-[#916A63]/50"></span>

            </div>

            {/* COUNTDOWN */}
            <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto mt-10">

              {/* DAYS */}
              <div className="border border-[#916A63]/30 py-5 px-2">

                <p className="font-heading text-4xl text-[var(--color-gold-accent)]">
                  {timeLeft.days}
                </p>

                <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                  {language === "eng" ? "Days" : "Ngày"}
                </p>

              </div>

              {/* HOURS */}
              <div className="border border-[#916A63]/30 py-5 px-2">

                <p className="font-heading text-4xl text-[var(--color-gold-accent)]">
                  {timeLeft.hours}
                </p>

                <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                  {language === "eng" ? "Hours" : "Giờ"}
                </p>

              </div>

              {/* MINUTES */}
              <div className="border border-[#916A63]/30 py-5 px-2">

                <p className="font-heading text-4xl text-[var(--color-gold-accent)]">
                  {timeLeft.minutes}
                </p>

                <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                  {language === "eng" ? "Minutes" : "Phút"}
                </p>

              </div>

              {/* SECONDS */}
              <div className="border border-[#916A63]/30 py-5 px-2">

                <p className="font-heading text-4xl text-[var(--color-gold-accent)]">
                  {timeLeft.seconds}
                </p>

                <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                  {language === "eng" ? "Seconds" : "Giây"}
                </p>

              </div>

            </div>

            {/* RSVP BUTTON */}
            <div className="mt-10">

              <Link
                href="#mobile-rsvp"
                className="inline-block bg-[#D4AF37] text-white px-8 py-4 rounded-full font-body text-sm uppercase tracking-[0.2em] hover:opacity-90 transition"
              >
                {translations[language].rsvp}
              </Link>

            </div>

            {/* SCROLL */}
            <div className="mt-10">

              <span className="font-body text-xs uppercase tracking-[0.3em]">
                {translations[language].scroll}
              </span>

            </div>

          </div>
        </section>



        <div className="md:hidden">

          {/* MOBILE DETAILS */}
          
          <section
            id="mobile-details"
            className="relative md:hidden scroll-mt-24 px-6 py-24 bg-[#FDEFE8] overflow-hidden"
          >
            {/* BACKGROUND */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/images/details.png')",
              }}
            />

            <div className="absolute inset-0 bg-white/10" />

            <div className="relative z-10 max-w-md mx-auto text-center">
              <span className="font-heading text-3xl text-[var(--color-gold-accent)]">
                ♥
              </span>

              <h2 className="font-heading text-5xl text-[#622825] mt-4">
                {language === "eng" ? "The Details" : "Chi Tiết"}
              </h2>

              <p className="font-script text-3xl text-[#916A63] mt-5">
                {language === "eng"
                  ? "Everything you need to know"
                  : "Những điều bạn cần biết"}
              </p>

              <div className="flex justify-center mt-7">
                <div className="w-24 h-px bg-[#D4AF37]/60" />
              </div>

              <div className="mt-12 space-y-10">
                {/* WHEN */}
                <div>
                  <div className="flex justify-center mb-4">
                    <svg
                      viewBox="0 0 64 64"
                      className="h-12 w-12 text-[var(--color-gold-accent)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="12" y="14" width="40" height="38" rx="2" />
                      <path d="M21 10v9" />
                      <path d="M43 10v9" />
                      <path d="M12 25h40" />
                      <circle cx="22" cy="34" r="1" fill="currentColor" />
                      <circle cx="32" cy="34" r="1" fill="currentColor" />
                      <circle cx="42" cy="34" r="1" fill="currentColor" />
                      <circle cx="22" cy="43" r="1" fill="currentColor" />
                      <circle cx="32" cy="43" r="1" fill="currentColor" />
                      <circle cx="42" cy="43" r="1" fill="currentColor" />
                    </svg>
                  </div>

                  <h3 className="font-heading text-3xl text-[#622825]">
                    {language === "eng" ? "When" : "Ngày"}
                  </h3>

                  <p className="font-body text-base text-[#916A63] mt-3">
                    {language === "eng"
                      ? "March 13, 2027"
                      : "13 tháng 3, 2027"}
                  </p>
                </div>

                {/* WHERE */}
                <div>
                  <div className="flex justify-center mb-4">
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

                  <h3 className="font-heading text-3xl text-[#622825]">
                    {language === "eng" ? "Where" : "Địa Điểm"}
                  </h3>

                  <p className="font-body text-base text-[#916A63] mt-3">
                    The Ocean Villas Resort
                    <br />
                    {language === "eng"
                      ? "Da Nang, Viet Nam"
                      : "Đà Nẵng, Việt Nam"}
                  </p>
                </div>

                {/* DRESS CODE */}
                <div id="mobile-dress-code" className="scroll-mt-28">
                  <div className="flex justify-center mb-4">
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

                  <h3 className="font-heading text-3xl text-[#622825]">
                    {language === "eng" ? "Dress Code" : "Trang Phục"}
                  </h3>

                  <Link
                    href="#what-should-i-wear"
                    className="mt-3 inline-block cursor-pointer font-body text-base text-[#916A63] underline decoration-[#D4AF37]/60 underline-offset-4 transition hover:text-[var(--color-gold-accent)]"
                  >
                    {language === "eng" ? (
                      <>
                        Formal
                      </>
                    ) : (
                      <>
                        Trang trọng
                        <br />
                        </>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </section>



          {/* MOBILE VIETNAMESE FAMILY SECTION */}
          {language === "viet" && (
            <section 
              id="mobile-family" 
              className="relative min-h-[900px] px-6 py-24 overflow-hidden md:hidden">

              {/* MOBILE FAMILY BACKGROUND */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/family-mobile.png')",
                }}
              />

              {/* LIGHT OVERLAY */}
              <div className="absolute inset-0 bg-white/10" />

              {/* FAMILY CONTENT */}
              <div className="relative z-10 max-w-md mx-auto text-center">

                <p className="font-body text-xs uppercase tracking-[0.3em] text-[#916A63]">
                  Với sự chúc phúc của:
                </p>

                <h2 className="font-heading text-4xl text-[#622825] mt-4">
                  Gia Đình Hai Bên
                </h2>

                <div className="flex items-center justify-center gap-5 my-10">
                  <span className="h-px w-20 bg-[#916A63]/30" />

                  <span className="text-xl text-[var(--color-gold-accent)]">
                    ❦
                  </span>

                  <span className="h-px w-20 bg-[#916A63]/30" />
                </div>

                <div className="space-y-16">

                  {/* BRIDE'S FAMILY */}
                  <div className="text-center">
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
                        <circle cx="32" cy="17" r="7" />
                        <path d="M25 18c-5 2-7 7-6 13 1 5 3 9 1 14" />
                        <path d="M39 18c5 2 7 7 6 13-1 5-3 9-1 14" />
                        <path d="M25 13c2-5 5-7 7-7s5 2 7 7" />
                        <path d="M23 34c2-5 5-8 9-8s7 3 9 8" />
                        <path d="M23 34l-7 22h32l-7-22" />
                        <path d="M27 28c1.5 2 3 3 5 3s3.5-1 5-3" />
                        <path d="M21 43c7 3 15 3 22 0" />
                      </svg>
                    </div>

                    <h3 className="font-heading text-3xl text-[#5f4a42]">
                      Gia đình nhà gái
                    </h3>

                    <div className="mt-6 space-y-2">
                      <p className="font-body text-base text-[#8c756b]">
                        Ông: Đặng Mậu Tân
                      </p>

                      <p className="font-body text-base text-[#8c756b]">
                        Bà: Lâm Lan
                      </p>
                    </div>
                  </div>

                  {/* GROOM'S FAMILY */}
                  <div className="text-center">
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
                        <circle cx="32" cy="16" r="7" />
                        <path d="M25 15c1-5 4-8 7-8s6 2 7 7" />
                        <path d="M23 34c2-5 5-8 9-8s7 3 9 8" />
                        <path d="M23 34l-7 22h32l-7-22" />
                        <path d="M27 28l5 7 5-7" />
                        <path d="M30 35l2 5 2-5" />
                        <path d="M21 43l11 13 11-13" />
                      </svg>
                    </div>

                    <h3 className="font-heading text-3xl text-[#5f4a42]">
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

          <div id="mobile-venue" className="scroll-mt-24"><MobileVenueSection /></div>

          <div id="mobile-schedule" className="scroll-mt-24"><MobileScheduleSection /></div>

          <div id="mobile-rsvp" className="scroll-mt-24"><MobileRSVPSection /></div>

          <div id="mobile-gallery" className="hidden">
            <MobileGallerySection />
          </div>
          <div id="mobile-faq" className="scroll-mt-24"><MobileFAQSection /></div>

          {/* MOBILE THANK YOU */}
          <section 
            id="mobile-thank-you"
          className="relative min-h-[900px] px-6 overflow-hidden md:hidden">
            {/* BACKGROUND */}
            <div className="absolute inset-0">
              <img
                src="/images/thank-you-mobile.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>

            <div className="absolute inset-0 bg-white/10" />

            <div className="relative z-10 min-h-[900px] max-w-md mx-auto flex flex-col items-center justify-center text-center py-28">
              <span className="font-heading text-3xl text-[var(--color-gold-accent)]">
                ♥
              </span>

              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-[#916A63] mt-6">
                {language === "eng"
                  ? "With Love"
                  : "Với Tất Cả Yêu Thương"}
              </p>

              <h2 className="font-heading text-5xl leading-tight text-[#622825] mt-5">
                {language === "eng" ? "Thank You" : "Cảm Ơn"}
              </h2>

              <p className="font-script text-4xl text-[#916A63] mt-6">
                {language === "eng"
                  ? "For being part of our story"
                  : "Vì đã là một phần trong câu chuyện của chúng mình"}
              </p>

              <div className="flex justify-center mt-7">
                <div className="w-24 h-px bg-[#D4AF37]/60" />
              </div>

              <p className="font-body text-sm leading-7 max-w-sm mx-auto mt-10 text-[#622825]">
                {language === "eng"
                  ? "We are so grateful to celebrate this special chapter surrounded by the people we love most. Thank you for sharing in our joy and making this day even more meaningful."
                  : "Chúng mình vô cùng biết ơn khi được chia sẻ khoảnh khắc đặc biệt này cùng những người thân yêu nhất. Cảm ơn bạn đã chung vui và làm cho ngày trọng đại của chúng mình thêm ý nghĩa."}
              </p>

              <p
                className={`mt-12 text-[var(--color-gold-accent)] ${language === "eng"
                    ? "font-heading text-4xl tracking-[0.08em]"
                    : "font-great-vibes text-5xl"
                  }`}
              >
                {coupleNames}
              </p>
            </div>
          </section>

        </div>

        {/* ========================= */}
        {/* DESKTOP HERO */}
        {/* ========================= */}

        <section className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden hidden md:flex">

            {/* Desktop Hero Background */}
            <div className="absolute inset-0">
              <img
                src="/images/hero-desktop.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Light Overlay */}
            <div className="absolute inset-0 bg-white/10" />

            {/* Desktop Hero Content */}
            <div className="relative z-10 text-center">

              <p className="font-body text-sm uppercase tracking-[0.35em] mb-6">
                {translations[language].heroTogether}
              </p>

              <p className="font-body text-sm uppercase tracking-[0.15em] mb-6">
                {translations[language].heroInvitation}
              </p>

              {/* COUPLE NAMES */}
              <div className="font-great-vibes text-7xl md:text-9xl text-[var(--color-gold-accent)]">

                {language === "viet" ? (

                  <h1 className="font-great-vibes text-7xl md:text-9xl text-[var(--color-gold-accent)]">

                    <span className="block">
                      Tấn Cường
                    </span>

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

                    <span className="block">
                      Lãm Nghi
                    </span>

                  </h1>

                ) : (

                  <div className="text-center leading-none">

                    <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.18em] uppercase text-[var(--color-gold-accent)]">
                      NOELLE
                    </h1>

                    <div className="font-script text-4xl md:text-5xl text-[#916A63] -mt-2">
                      Dang
                    </div>

                    <div className="flex items-center justify-center gap-3 my-4">

                      <span className="h-px w-10 md:w-14 bg-[#916A63]/40"></span>

                      <span className="font-script text-3xl md:text-4xl text-[#916A63]">
                        &
                      </span>

                      <span className="h-px w-10 md:w-14 bg-[#916A63]/40"></span>

                    </div>

                    <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.18em] uppercase text-[var(--color-gold-accent)]">
                      NATHAN
                    </h1>

                    <div className="font-script text-4xl md:text-5xl text-[#916A63] -mt-2">
                      Huynh
                    </div>

                  </div>

                )}

              </div>

              {/* DIVIDER */}
              <div className="flex items-center justify-center gap-4 mt-8">

                <span className="h-px w-16 bg-[#916A63]/50"></span>

                <span className="text-lg text-[#916A63]">
                  ♥
                </span>

                <span className="h-px w-16 bg-[#916A63]/50"></span>

              </div>

              <div className="mt-8">

                {/* ORIGINAL DESKTOP DATE */}
                <p className="font-body text-sm uppercase tracking-[0.3em] text-[#622825]">
                  {translations[language].heroDate}
                </p>

                {/* COUNTDOWN */}
                <div className="grid grid-cols-4 gap-5 max-w-lg mx-auto mt-10">

                  {/* DAYS */}
                  <div className="border border-[#916A63]/30 py-5 px-2">

                    <p className="font-heading text-5xl text-[var(--color-gold-accent)]">
                      {timeLeft.days}
                    </p>

                    <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                      {language === "eng" ? "Days" : "Ngày"}
                    </p>

                  </div>

                  {/* HOURS */}
                  <div className="border border-[#916A63]/30 py-5 px-2">

                    <p className="font-heading text-5xl text-[var(--color-gold-accent)]">
                      {timeLeft.hours}
                    </p>

                    <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                      {language === "eng" ? "Hours" : "Giờ"}
                    </p>

                  </div>

                  {/* MINUTES */}
                  <div className="border border-[#916A63]/30 py-5 px-2">

                    <p className="font-heading text-5xl text-[var(--color-gold-accent)]">
                      {timeLeft.minutes}
                    </p>

                    <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                      {language === "eng" ? "Minutes" : "Phút"}
                    </p>

                  </div>

                  {/* SECONDS */}
                  <div className="border border-[#916A63]/30 py-5 px-2">

                    <p className="font-heading text-5xl text-[var(--color-gold-accent)]">
                      {timeLeft.seconds}
                    </p>

                    <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                      {language === "eng" ? "Seconds" : "Giây"}
                    </p>

                  </div>

                </div>

                {/* ORIGINAL DESKTOP HERO MESSAGE */}
                <p className="font-script text-4xl mt-10 text-[#916A63]">
                  {translations[language].heroMessage}
                </p>

                {/* RSVP BUTTON */}
                <div className="mt-8">

                  <Link
                    href="/rsvp"
                    className="inline-block bg-[#D4AF37] text-white px-8 py-4 rounded-full font-body text-sm uppercase tracking-[0.2em] hover:opacity-90 transition"
                  >
                    {translations[language].rsvp}
                  </Link>

                </div>

                {/* SCROLL */}
                <div className="mt-10">

                  <span className="font-body text-xs uppercase tracking-[0.3em]">
                    {translations[language].scroll}
                  </span>

                </div>

              </div>

            </div>
          </section>


          {/* VIETNAMESE FAMILY SECTION */}
          {language === "viet" && (
          <section className="hidden md:block py-24 px-6 section-texture">

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
                        Bà: Lâm Lan
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
            className="hidden md:block py-28 px-6 section-texture"
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
                  {language === "eng" ? "Attire" : "Trang phục"}
                </h3>

                <Link
                  href="#what-should-i-wear"
                  className="mt-3 inline-block font-body text-sm text-[#8c756b] underline decoration-[#D4AF37]/60 underline-offset-4 transition hover:text-[var(--color-gold-accent)]"
                >
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
                </Link>
                </div>

              </div>

            </div>
          </section>

      </main>
    </>
  );
}

function MobileVenueSection() {
  const { language } = useLanguage();

  return (
    <div>

      {/* ========================================================= */}
      {/* MOBILE VENUE */}
      {/* ========================================================= */}

      <section className="relative min-h-[850px] md:hidden px-6 overflow-hidden">

        {/* Mobile Venue Background */}
        <div className="absolute inset-0">
          <img
            src="/images/venue-mobile.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-white/15" />

        {/* Mobile Content */}
        <div className="relative z-10 max-w-md mx-auto text-center pt-28 pb-24">

          {/* HEART */}
          <span className="font-heading text-3xl text-[var(--color-gold-accent)]">
            ♥
          </span>

          {/* SECTION LABEL */}
          <p className="font-body text-[11px] uppercase tracking-[0.28em] text-[#916A63] mt-6">
            {language === "eng"
              ? "Where We Say I Do"
              : "Nơi Ta Trao Lời Hẹn Ước"}
          </p>

          {/* VENUE NAME */}
          <h1 className="font-heading text-5xl leading-tight text-[#4A1E1C] mt-5">
            The Ocean Villas Resort
          </h1>

          {/* LOCATION */}
          <p className="font-script text-4xl mt-6 text-[#916A63]">
            {language === "eng"
              ? "Da Nang, Viet Nam"
              : "Đà Nẵng, Việt Nam"}
          </p>

          {/* GOLD DIVIDER */}
          <div className="flex justify-center mt-7">
            <div className="w-24 h-px bg-[#D4AF37]/60" />
          </div>

          {/* DESCRIPTION */}
          <p className="font-body text-sm leading-7 max-w-sm mx-auto mt-10 text-[#622825]">
            {language === "eng"
              ? "A beautiful seaside setting where we will gather with our favorite people to celebrate this special day."
              : "Một không gian bên biển tuyệt đẹp, nơi chúng ta sẽ cùng những người thân yêu lưu giữ những khoảnh khắc đáng nhớ trong ngày đặc biệt này."}
          </p>

          {/* DIRECTIONS */}
          <div className="mt-10">
            <a
              href="https://www.google.com/maps/search/?api=1&query=The+Ocean+Villas+Resort+Da+Nang+Vietnam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#622825] bg-[#FDEFE8]/30 text-[#622825] px-9 py-4 font-body text-xs uppercase tracking-[0.28em] hover:bg-[#622825] hover:text-[#FDEFE8] transition"
            >
              {language === "eng"
                ? "View Directions"
                : "Xem Hướng Dẫn"}
            </a>
          </div>

        </div>

      </section>


    </div>
  );
}

function MobileScheduleSection() {
  const { language } = useLanguage();

  return (
    <div>

      {/* WEDDING DAY SCHEDULE */}
      <section
        id="schedule"
        className="relative py-28 px-6 section-texture overflow-hidden"
      >

        {/* MOBILE BACKGROUND */}
        <div className="absolute inset-0 md:hidden">
          <img
            src="/images/schedule-mobile.png"
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div
  className="relative z-10 max-w-4xl mx-auto -translate-y-20"
          style={{
            textShadow:
              "0 1px 2px rgba(253, 239, 232, 1), 0 0 6px rgba(253, 239, 232, 0.95), 0 0 12px rgba(253, 239, 232, 0.8)",
          }}
        >

          {/* SECTION HEADER */}
          <div
            className="text-center mb-20 pt-12 md:pt-0"
            style={{
              textShadow:
                "-1px -1px 2px rgba(255,248,240,0.95), 1px -1px 2px rgba(255,248,240,0.95), -1px 1px 2px rgba(255,248,240,0.95), 1px 1px 2px rgba(255,248,240,0.95), 0 0 7px rgba(255,248,240,0.9)",
            }}
          >

            <h2 className="font-heading text-5xl md:text-7xl text-[#622825]">
              {language === "eng" ? "Schedule" : "Lịch trình"}
            </h2>

            <p className="font-script text-4xl md:text-5xl mt-5 text-[#916A63]">
              {language === "eng"
                ? "A day to remember"
                : "Một ngày đáng nhớ"}
            </p>

            <div className="flex justify-center mt-5">
              <div className="w-24 h-px bg-[#D4AF37]/60" />
            </div>

          </div>


          {/* TIMELINE */}
          <div
            className="relative"
            style={{
              textShadow:
                "-1px -1px 2px rgba(255,248,240,0.95), 1px -1px 2px rgba(255,248,240,0.95), -1px 1px 2px rgba(255,248,240,0.95), 1px 1px 2px rgba(255,248,240,0.95), 0 0 7px rgba(255,248,240,0.9)",
            }}
          >

            {/* VERTICAL LINE */}
            <div className="absolute hidden md:block left-[150px] top-2 bottom-2 w-px bg-[#916A63]/40"></div>

            <div className="space-y-14">


              {/* GUEST ARRIVAL */}
              <div className="relative flex items-start gap-4 md:gap-12">
                <div className="w-20 md:w-32 shrink-0 text-right pl-1 md:pl-0">
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#9A6A16]">
                    3:30 PM
                  </p>
                </div>

                <div className="relative z-10 mt-1 w-7 h-7 shrink-0 flex items-center justify-center">

                  {/* Mobile line */}
                  <span className="md:hidden w-px h-7 bg-[#916A63]/50"></span>

                  {/* Desktop heart */}
                  <span className="hidden md:flex w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">
                      ♥
                    </span>
                  </span>

                </div>

                <div className="pt-0">
                  <h3 className="font-heading text-3xl md:text-4xl">
                    {language === "eng"
                      ? "Guest Arrival"
                      : "Đón Khách"}
                  </h3>

                  <p className="font-body text-sm mt-2 font-medium text-[#622825]">
                    {language === "eng"
                      ? "Check in, grab a drink & find your seat"
                      : "Đón khách, thưởng thức đồ uống và tìm chỗ ngồi"}
                  </p>
                </div>

              </div>


              {/* CEREMONY */}
              <div className="relative flex items-start gap-4 md:gap-12">

                <div className="w-20 md:w-32 shrink-0 text-right">
                  <p 
                  className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#9A6A16]">
                    4:00 PM
                  </p>
                </div>

                <div className="relative z-10 mt-1 w-7 h-7 shrink-0 flex items-center justify-center">

                  {/* Mobile line */}
                  <span className="md:hidden w-px h-7 bg-[#916A63]/50"></span>

                  {/* Desktop heart */}
                  <span className="hidden md:flex w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">
                      ♥
                    </span>
                  </span>

                </div>

                <div>
                  <h3 className="font-heading text-3xl md:text-4xl">
                    {language === "eng"
                      ? "Vows Ceremony"
                      : "Lễ Vows"}
                  </h3>

                  <p className="font-body text-sm mt-2 font-medium text-[#622825]">
                    {language === "eng"
                      ? 'Join us as we say "I do"'
                      : "Chứng kiến khoảnh khắc 2 vợ chồng trao lời thề nguyện và cảm ơn gia đình, bạn bè đã đi cùng chúng tôi đến ngày hôm nay"}
                  </p>
                </div>

              </div>


              {/* COCKTAIL HOUR */}
              <div className="relative flex items-start gap-4 md:gap-12">

                <div className="w-20 md:w-32 shrink-0 text-right">
                  <p 
                  className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#9A6A16]">
                    5:00 PM
                  </p>
                </div>

                <div className="relative z-10 mt-1 w-7 h-7 shrink-0 flex items-center justify-center">

                  {/* Mobile line */}
                  <span className="md:hidden w-px h-7 bg-[#916A63]/50"></span>

                  {/* Desktop heart */}
                  <span className="hidden md:flex w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">
                      ♥
                    </span>
                  </span>

                </div>

                <div>
                  <h3 className="font-heading text-3xl md:text-4xl">
                    {language === "eng"
                      ? "Photos & Drink Hour"
                      : "Chụp hình và giải khát"}
                  </h3>

                  <p className="font-body text-sm mt-2 font-medium text-[#622825]">
                    {language === "eng"
                      ? "Mingle, sip & celebrate"
                      : "Cùng chụp hình, trò chuyện và chung vui"}
                  </p>
                </div>

              </div>


              {/* RECEPTION */}
              <div className="relative flex items-start gap-4 md:gap-12">

                <div className="w-20 md:w-32 shrink-0 text-right">
                  <p 
                    className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#9A6A16]">
                    6:00 PM
                  </p>
                </div>

                <div className="relative z-10 mt-1 w-7 h-7 shrink-0 flex items-center justify-center">

                  {/* Mobile line */}
                  <span className="md:hidden w-px h-7 bg-[#916A63]/50"></span>

                  {/* Desktop heart */}
                  <span className="hidden md:flex w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">
                      ♥
                    </span>
                  </span>

                </div>

                <div>
                  <h3 className="font-heading text-3xl md:text-4xl">
                    {language === "eng"
                      ? "Grand Entrance"
                      : "Tiệc Mừng"}
                  </h3>

                  <p className="font-body text-sm mt-2 font-medium text-[#622825]">
                    {language === "eng"
                      ? "Dinner, dancing & good vibes"
                      : "Dùng tiệc và giao lưu, tận hưởng những khoảnh khắc đáng nhớ"}
                  </p>
                </div>

              </div>


              {/* FIRST DANCE */}
              <div className="relative flex items-start gap-4 md:gap-12">

                <div className="w-20 md:w-32 shrink-0 text-right">
                  <p 
                    className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#9A6A16]">
                    8:00 PM
                  </p>
                </div>

                <div className="relative z-10 mt-1 w-7 h-7 shrink-0 flex items-center justify-center">

                  {/* Mobile line */}
                  <span className="md:hidden w-px h-7 bg-[#916A63]/50"></span>

                  {/* Desktop heart */}
                  <span className="hidden md:flex w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">
                      ♥
                    </span>
                  </span>

                </div>

                <div>
                  <h3 className="font-heading text-3xl md:text-4xl">
                    {language === "eng"
                      ? "First Dance"
                      : "Điệu Nhảy Đầu Tiên"}
                  </h3>

                  <p className="font-body text-sm mt-2 font-medium text-[#622825]">
                    {language === "eng"
                      ? "A special moment for the newlyweds"
                      : "Khoảnh khắc của cô dâu và chú rể nhảy điệu đầu tiên"}
                  </p>
                </div>

              </div>


              {/* SEND OFF */}
              <div className="relative flex items-start gap-4 md:gap-12">

                <div className="w-20 md:w-32 shrink-0 text-right">
                  <p 
                  className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#9A6A16]">
                    9:30 PM
                  </p>
                </div>

                <div className="relative z-10 mt-1 w-7 h-7 shrink-0 flex items-center justify-center">

                  {/* Mobile line */}
                  <span className="md:hidden w-px h-7 bg-[#916A63]/50"></span>

                  {/* Desktop heart */}
                  <span className="hidden md:flex w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">
                      ♥
                    </span>
                  </span>

                </div>

                <div>
                  <h3 className="font-heading text-3xl md:text-4xl">
                    {language === "eng"
                      ? "Bride & Groom Send Off"
                      : "Tiễn Cô Dâu & Chú Rể"}
                  </h3>

                  <p className="font-body text-sm mt-2 font-medium text-[#622825]">
                    {language === "eng"
                      ? "Send us off in style!"
                      : "Cùng tiễn cô dâu và chú rể trong niềm vui và những lời chúc tốt đẹp"}
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyh-flC_23B9Z0HTOuD3jMJLVxP9f4HpgNKQB2NlCutm3i3vVrspJtxQezaSlAx9qqvw/exec";

type Guest = {
  name: string;
};

function MobileRSVPSection() {
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
      <div className="min-h-screen flex items-center justify-center px-6 section-texture">
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
                March 13, 2027
              </p>
            </div>

          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative isolate">

      {/* Mobile Background Only */}
      <div className="absolute inset-0 md:hidden -z-10 flex items-center justify-center bg-[#FDEFE8]">
        <img
          src="/images/RSVP-mobile2.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

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
                  className="w-full rounded-xl border border-white/60 bg-transparent px-5 py-4 text-[#622825] caret-[#622825] placeholder:text-[#916A63]/70 shadow-sm resize-none outline-none transition-colors duration-300 focus:border-[#D4AF37] focus:bg-[#FFF9F2]/85 focus:ring-2 focus:ring-[#D4AF37]/15"
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
                  className="w-full rounded-xl border border-white/60 bg-transparent px-5 py-4 text-[#622825] caret-[#622825] placeholder:text-[#916A63]/70 shadow-sm resize-none outline-none transition-colors duration-300 focus:border-[#D4AF37] focus:bg-[#FFF9F2]/85 focus:ring-2 focus:ring-[#D4AF37]/15"
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

    </div>
  );
}

function MobileGallerySection() {
  const { language } = useLanguage();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const photos = [
    "Picture 1.JPG",
    "Picture 2.JPG",
    "Picture 3.JPG",
    "Picture 4.JPG",
    "Picture 5.JPG",
    "Picture 6.JPG",
  ];

  const selectedPhoto =
    selectedIndex !== null ? photos[selectedIndex] : null;

  const goToPrevious = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0
        ? photos.length - 1
        : selectedIndex - 1
    );
  };

  const goToNext = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === photos.length - 1
        ? 0
        : selectedIndex + 1
    );
  };

  /* KEYBOARD CONTROLS */
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowLeft") {
        goToPrevious();
      }

      if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <div>
      {/* PHOTO GALLERY SECTION */}
      <section
        id="gallery"
        className="py-20 md:py-28 px-4 sm:px-6 section-texture"
      >
        <div className="max-w-6xl mx-auto">

          {/* SECTION HEADER */}
          <div className="text-center mb-12 md:mb-16">
            <p className="font-body text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#916A63]">
              {language === "eng"
                ? "Moments We Treasure"
                : "Những Khoảnh Khắc Đáng Nhớ"}
            </p>

            <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl text-[#622825] mt-3 md:mt-4">
              {language === "eng"
                ? "Our Gallery"
                : "Thư Viện Ảnh"}
            </h2>

            <p className="font-script text-3xl sm:text-4xl md:text-5xl mt-4 md:mt-5 text-[#916A63]">
              {language === "eng"
                ? "A glimpse into our love story"
                : "Những khoảnh khắc trong câu chuyện tình yêu của chúng tôi"}
            </p>

            {/* GOLD DIVIDER */}
            <div className="flex justify-center items-center mt-6 md:mt-7">
              <div className="w-10 sm:w-16 h-px bg-[#D4AF37]/50" />

              <span className="mx-3 sm:mx-4 text-[#D4AF37] text-base sm:text-lg">
                ❧
              </span>

              <div className="w-10 sm:w-16 h-px bg-[#D4AF37]/50" />
            </div>
          </div>

          {/* PHOTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {photos.map((photo, index) => (
              <button
                key={photo}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="group relative overflow-hidden rounded-sm bg-[#FDEFE8] border border-[#D4AF37]/30 shadow-sm cursor-pointer text-left"
                aria-label={
                  language === "eng"
                    ? `Open photo ${index + 1}`
                    : `Mở ảnh ${index + 1}`
                }
              >
                {/* PHOTO */}
                <img
                  src={`/wedding-gallery/${encodeURIComponent(photo)}`}
                  alt={
                    language === "eng"
                      ? `Noelle and Nathan - Photo ${index + 1}`
                      : `Noelle và Nathan - Ảnh ${index + 1}`
                  }
                  className="w-full h-auto block transition-transform duration-700 ease-out md:group-hover:scale-[1.03]"
                />

                {/* SUBTLE OVERLAY */}
                <div className="absolute inset-0 bg-[#622825]/0 md:group-hover:bg-[#622825]/10 transition-colors duration-700" />

                {/* GOLD CORNER ACCENTS */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-7 h-7 sm:w-8 sm:h-8 border-l border-t border-[#D4AF37]/0 md:group-hover:border-[#D4AF37]/80 transition-all duration-500" />

                <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 border-r border-b border-[#D4AF37]/0 md:group-hover:border-[#D4AF37]/80 transition-all duration-500" />
              </button>
            ))}
          </div>

          {/* FOOTER MESSAGE */}
          <div className="text-center mt-16 md:mt-20">
            <span className="font-heading text-xl md:text-2xl text-[var(--color-gold-accent)]">
              ♥
            </span>

            <p className="font-script text-2xl sm:text-3xl md:text-4xl text-[#916A63] mt-3 md:mt-4">
              {language === "eng"
                ? "More memories coming soon..."
                : "Những khoảnh khắc đẹp hơn sẽ được cập nhật sớm..."}
            </p>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedPhoto && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#2A1715]/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedIndex(null)}
        >

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D4AF37]/60 text-[#FDEFE8] text-xl sm:text-2xl flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors"
            aria-label={
              language === "eng"
                ? "Close photo"
                : "Đóng ảnh"
            }
          >
            ×
          </button>

          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-2 sm:left-5 md:left-8 z-20 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-[#D4AF37]/50 text-[#FDEFE8] text-3xl flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors"
            aria-label={
              language === "eng"
                ? "Previous photo"
                : "Ảnh trước"
            }
          >
            ‹
          </button>

          {/* PHOTO AREA */}
          <div
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={`/wedding-gallery/${encodeURIComponent(selectedPhoto)}`}
              alt={
                language === "eng"
                  ? `Noelle and Nathan - Photo ${selectedIndex + 1}`
                  : `Noelle và Nathan - Ảnh ${selectedIndex + 1}`
              }
              className="max-w-[88vw] sm:max-w-[85vw] max-h-[80vh] sm:max-h-[78vh] object-contain rounded-sm shadow-2xl"
            />

            {/* PHOTO COUNTER */}
            <p className="font-body text-[10px] sm:text-xs tracking-[0.25em] text-[#FDEFE8]/80 mt-4 sm:mt-5">
              {selectedIndex + 1} {language === "eng" ? "OF" : "TRÊN"}{" "}
              {photos.length}
            </p>
          </div>

          {/* NEXT BUTTON */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goToNext();
            }}
            className="absolute right-2 sm:right-5 md:right-8 z-20 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-[#D4AF37]/50 text-[#FDEFE8] text-3xl flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors"
            aria-label={
              language === "eng"
                ? "Next photo"
                : "Ảnh tiếp theo"
            }
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

function MobileFAQSection() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div id="faq" className="min-h-screen bg-[#FDEFE8] text-[#622825]">

      {/* =========================================================
          MOBILE FAQ ACCORDION
          ========================================================= */}
      <section className="relative min-h-screen overflow-hidden px-5 py-24 md:hidden">

        {/* Mobile Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/FAQ-mobile.png')",
          }}
        />

        {/* Very subtle overlay */}
        <div className="absolute inset-0 bg-[#FDEFE8]/5" />

        {/* Mobile Content */}
        <div className="relative z-10 mx-auto max-w-md">

          {/* Heading */}
          <div className="text-center">

            <h1 className="font-heading text-4xl leading-tight text-[var(--color-gold-accent)]">
              {language === "eng"
                ? "Frequently Asked Questions"
                : "Câu Hỏi Thường Gặp"}
            </h1>

            <p className="mt-4 font-script text-3xl text-[#916A63]">
              {language === "eng"
                ? "A few helpful details"
                : "Một vài thông tin hữu ích"}
            </p>

          </div>


          {/* Accordion */}
          <div className="mt-12 space-y-4">


            {/* DRESS CODE */}
            <div
              id="what-should-i-wear"
              className="scroll-mt-28 overflow-hidden rounded-xl border border-[#916A63]/20 bg-[#FDEFE8]/55"
            >

              <button
                type="button"
                onClick={() =>
                  setOpenIndex(openIndex === 0 ? null : 0)
                }
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >

                <h2 className="font-heading text-xl leading-7 text-[var(--color-gold-accent)]">
                  {language === "eng"
                    ? "What should I wear?"
                    : "Tôi nên mặc gì?"}
                </h2>

                <span
                  className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold-accent)]/50 text-[var(--color-gold-accent)] transition-transform duration-300 ${openIndex === 0 ? "rotate-45" : "rotate-0"
                    }`}
                >
                  <span className="absolute h-px w-3 bg-[var(--color-gold-accent)]" />
                  <span className="absolute h-3 w-px bg-[var(--color-gold-accent)]" />
                </span>

              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${openIndex === 0
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="min-h-0 overflow-hidden">

                  <p className="border-t border-[#916A63]/15 px-5 pb-6 pt-4 font-body text-sm leading-7 text-[#622825]">

                    {language === "eng" ? (
                      <>
                        Our dress code is Formal / Garden Elegant.
                        <br />
                        Please no white, jeans, shorts, or sneakers.
                        <br />

                        <span className="text-[var(--color-gold-accent)]">
                          Ladies:
                        </span>{" "}
                        No white or cream dresses, and please avoid wearing anything
                        that could be mistaken for a wedding dress.
                        <br />

                        <span className="text-[var(--color-gold-accent)]">
                          Gentlemen:
                        </span>{" "}
                        A suit or dress pants with a button-up shirt is appropriate.
                        Feeling fancy? Add a tie or bowtie for a polished look.
                        <br />
                        <br />

                        If you are unsure about what to wear, you are welcome to reach
                        out to us directly for guidance.
                      </>
                    ) : (
                      <>
                        Trang phục được yêu cầu là Trang trọng / Thanh lịch cho tiệc ngoài vườn.
                        <br />
                        Vui lòng không mặc váy màu trắng, quần jeans, quần short
                        hoặc giày thể thao.
                        <br />
                        <br />

                        <span className="text-[var(--color-gold-accent)]">
                          Quý cô:
                        </span>{" "}
                        Vui lòng tránh trang phục màu trắng hoặc kem, cũng như những
                        kiểu váy có thể dễ bị nhầm với váy cưới.
                        <br />

                        <span className="text-[var(--color-gold-accent)]">
                          Quý ông:
                        </span>{" "}
                        Quý khách có thể mặc vest hoặc quần tây cùng áo sơ mi.
                        Khuyến khích quý ông hãy kết hợp cùng cà vạt hoặc nơ cho thêm phần trịnh trọng.
                        <br />
                        <br />

                        Nếu chưa chắc chắn về trang phục, quý khách có thể liên hệ
                        trực tiếp với chúng tôi để được tư vấn.
                      </>
                    )}

                  </p>

                </div>
              </div>

            </div>


            {/* CHILDREN */}
            <div className="overflow-hidden rounded-xl border border-[#916A63]/20 bg-[#FDEFE8]/55">

              <button
                type="button"
                onClick={() =>
                  setOpenIndex(openIndex === 1 ? null : 1)
                }
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >

                <h2 className="font-heading text-xl leading-7 text-[var(--color-gold-accent)]">
                  {language === "eng"
                    ? "Can I bring my children?"
                    : "Tôi có thể đưa trẻ em đến dự không?"}
                </h2>

                <span
                  className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold-accent)]/50 text-[var(--color-gold-accent)] transition-transform duration-300 ${openIndex === 1 ? "rotate-45" : "rotate-0"
                    }`}
                >
                  <span className="absolute h-px w-3 bg-[var(--color-gold-accent)]" />
                  <span className="absolute h-3 w-px bg-[var(--color-gold-accent)]" />
                </span>

              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${openIndex === 1
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="min-h-0 overflow-hidden">

                  <p className="border-t border-[#916A63]/15 px-5 pb-6 pt-4 font-body text-sm leading-7 text-[#622825]">

                    {language === "eng" ? (
                      <>
                        While we love your little ones, we have decided to make our
                        wedding an adult-only celebration. Only family members and
                        friends who have been specifically invited to bring children
                        are welcome to do so.
                        <br />
                        <br />

                        If there are any questions or concerns, please reach out to us
                        directly.
                      </>
                    ) : (
                      <>
                        Chúng tôi rất yêu quý các bé, tuy nhiên tiệc cưới sẽ được tổ
                        chức dành riêng cho người lớn. Chỉ những thành viên gia đình
                        và bạn bè được chúng tôi mời cụ thể kèm theo trẻ em mới có
                        thể đưa các bé đến tham dự.
                        <br />
                        <br />

                        Nếu quý khách có bất kỳ câu hỏi hoặc thắc mắc nào, vui lòng
                        liên hệ trực tiếp với chúng tôi.
                      </>
                    )}

                  </p>

                </div>
              </div>

            </div>


            {/* ARRIVAL */}
            <div className="overflow-hidden rounded-xl border border-[#916A63]/20 bg-[#FDEFE8]/55">

              <button
                type="button"
                onClick={() =>
                  setOpenIndex(openIndex === 2 ? null : 2)
                }
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >

                <h2 className="font-heading text-xl leading-7 text-[var(--color-gold-accent)]">
                  {language === "eng"
                    ? "What time should I arrive?"
                    : "Tôi nên đến lúc mấy giờ?"}
                </h2>

                <span
                  className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold-accent)]/50 text-[var(--color-gold-accent)] transition-transform duration-300 ${openIndex === 2 ? "rotate-45" : "rotate-0"
                    }`}
                >
                  <span className="absolute h-px w-3 bg-[var(--color-gold-accent)]" />
                  <span className="absolute h-3 w-px bg-[var(--color-gold-accent)]" />
                </span>

              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${openIndex === 2
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="min-h-0 overflow-hidden">

                  <p className="border-t border-[#916A63]/15 px-5 pb-6 pt-4 font-body text-sm leading-7 text-[#622825]">

                    {language === "eng" ? (
                      <>
                        For the Vows Ceremony, guest arrival begins at 3:30 PM, with the ceremony beginning
                        at 4:00 PM.
                        <br />
                        <br />

                        For the reception, guest arrival begins at 5:00 PM, with the ceremony beginning at 6:00 PM.
                        <br />
                        <br />

                        Late arrivals will not be permitted to enter the ceremony area
                        once it has started, so please plan to arrive on time.
                      </>
                    ) : (
                      <>
                        Cho lễ Vows, thời gian đón khách bắt đầu lúc 3:30 PM, với buổi lễ sẽ bắt đầu
                        lúc 4:00 PM.
                        <br />
                        <br />

                        Cho Tiệc Mừng, thời gian đón khách bắt đầu lúc 5:00 PM, với buổi lễ sẽ bắt đầu
                        lúc 6:00 PM.
                        <br />
                        <br />

                        Sau khi buổi lễ bắt đầu, khách đến muộn sẽ không được phép
                        vào khu vực làm lễ. Vì vậy, kính mong quý khách sắp xếp thời
                        gian đến đúng giờ.
                      </>
                    )}

                  </p>

                </div>
              </div>

            </div>


            {/* CEREMONY & RECEPTION */}
            <div className="overflow-hidden rounded-xl border border-[#916A63]/20 bg-[#FDEFE8]/55">

              <button
                type="button"
                onClick={() =>
                  setOpenIndex(openIndex === 3 ? null : 3)
                }
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >

                <h2 className="font-heading text-xl leading-7 text-[var(--color-gold-accent)]">
                  {language === "eng"
                    ? "Why is there a Vows Ceremony and a Reception?"
                    : "Vì sao có Lễ Vows và Tiệc Mừng?"}
                </h2>

                <span
                  className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold-accent)]/50 text-[var(--color-gold-accent)] transition-transform duration-300 ${openIndex === 3 ? "rotate-45" : "rotate-0"
                    }`}
                >
                  <span className="absolute h-px w-3 bg-[var(--color-gold-accent)]" />
                  <span className="absolute h-3 w-px bg-[var(--color-gold-accent)]" />
                </span>

              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${openIndex === 3
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="min-h-0 overflow-hidden">

                  <p className="border-t border-[#916A63]/15 px-5 pb-6 pt-4 font-body text-sm leading-7 text-[#622825]">

                    {language === "eng" ? (
                      <>
                        The ceremony is a traditional wedding service reserved for
                        family as the bride and groom declare their vows.
                        <br />
                        The reception is a celebration where guests can socialize,
                        dance, and enjoy a meal.
                        <br />
                        Your invitation will specify which events you are invited to
                        attend.
                        <br />
                        If you have any questions, please reach out to us directly.
                      </>
                    ) : (
                      <>
                        Lễ vows là nghi thức truyền thống, dành cho gia đình chứng
                        kiến cô dâu và chú rể trao lời nguyện ước.
                        <br />
                        Tiệc mừng là dịp để bạn bè và người thân cùng gặp gỡ, dùng bữa, khiêu
                        vũ và chung vui.
                        <br />
                        Thiệp mời sẽ ghi rõ những sự kiện mà quý khách được mời tham
                        dự.
                        <br />
                        Nếu có bất kỳ câu hỏi nào, quý khách vui lòng liên hệ trực
                        tiếp với chúng tôi.
                      </>
                    )}

                  </p>

                </div>
              </div>

            </div>


            {/* PLUS ONE */}
            <div className="overflow-hidden rounded-xl border border-[#916A63]/20 bg-[#FDEFE8]/55">

              <button
                type="button"
                onClick={() =>
                  setOpenIndex(openIndex === 4 ? null : 4)
                }
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >

                <h2 className="font-heading text-xl leading-7 text-[var(--color-gold-accent)]">
                  {language === "eng"
                    ? "Can I bring a plus-one?"
                    : "Tôi có thể đi cùng người thân hoặc bạn đời không?"}
                </h2>

                <span
                  className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold-accent)]/50 text-[var(--color-gold-accent)] transition-transform duration-300 ${openIndex === 4 ? "rotate-45" : "rotate-0"
                    }`}
                >
                  <span className="absolute h-px w-3 bg-[var(--color-gold-accent)]" />
                  <span className="absolute h-3 w-px bg-[var(--color-gold-accent)]" />
                </span>

              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${openIndex === 4
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="min-h-0 overflow-hidden">

                  <p className="border-t border-[#916A63]/15 px-5 pb-6 pt-4 font-body text-sm leading-7 text-[#622825]">

                    {language === "eng"
                      ? "Only spouses are invited to attend. If you have a significant other, please reach out to us directly to discuss your invitation."
                      : "Chỉ vợ hoặc chồng được mời tham dự. Nếu quý khách có người yêu hoặc bạn đời, vui lòng liên hệ trực tiếp với chúng tôi để trao đổi thêm về lời mời."}

                  </p>

                </div>
              </div>

            </div>


          </div>


          {/* Decorative Ending */}
          <div className="mt-12 flex items-center justify-center gap-4">

            <div className="h-px w-16 bg-[var(--color-gold-accent)]/50" />

            <span className="text-xl text-[var(--color-gold-accent)]">
              ✦
            </span>

            <div className="h-px w-16 bg-[var(--color-gold-accent)]/50" />

          </div>

        </div>

      </section>

    </div>
  );
}