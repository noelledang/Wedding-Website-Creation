"use client";

import { useState, useEffect } from "react";
import MusicPlayer from "./MusicPlayer";
import { useLanguage } from "./LanguageProvider";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language } = useLanguage();
  const coupleNames =
    language === "eng" ? "Noelle & Nathan" : "Cường & Nghi";

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
      heroMessage: "Trân trọng kính mời mọi người cùng chung vui trong ngày trọng đại của chúng tôi",
      scroll: "Lướt lên để khám phá thông tin tiếp theo",
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
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
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

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center border border-[#916A63]/40 bg-[#FDEFE8] text-[#622825] hover:text-[#D4AF37] transition"
      >
        <span className="text-2xl">
          {menuOpen ? "✕" : "☰"}
        </span>
      </button>

      {menuOpen && (
        <div className="fixed top-0 right-0 h-screen w-80 bg-[#FDEFE8] shadow-xl border-l border-[#916A63]/30 p-10 z-40">
          <nav className="flex flex-col gap-8 mt-16 font-body text-sm uppercase tracking-[0.2em]">

            <a
              href="#details"
              onClick={() => setMenuOpen(false)}
              className="text-[#622825] hover:text-[#916A63] transition"            >
              {language === "eng" ? "Details" : "Chi tiết đám cưới"}
            </a>

            <a
              href="#schedule"
              onClick={() => setMenuOpen(false)}
              className="text-[#622825] hover:text-[#D4AF37] transition"            >
              {language === "eng" ? "Schedule" : "Lịch trình"}
            </a>

            <a
              href="#venue"
              onClick={() => setMenuOpen(false)}
              className="text-[#622825] hover:text-[#D4AF37] transition"
            >
              {language === "eng" ? "Venue" : "Địa điểm"}
            </a>

            <a
              href="#rsvp"
              onClick={() => setMenuOpen(false)}
              className="hover:opacity-50 transition"
            >
              {language === "eng" ? "RSVP" : "Đăng ký tham dự"}
            </a>

            <a
              href="#gallery"
              onClick={() => setMenuOpen(false)}
              className="hover:opacity-50 transition"
            >
              {language === "eng" ? "Gallery" : "Thư viện ảnh"}
            </a>

            <a
              href="#faq"
              onClick={() => setMenuOpen(false)}
              className="hover:opacity-50 transition"
            >
              {language === "viet"
                ? "Câu Hỏi Thường Gặp"
                : "FAQ"}
            </a>
          <div className="text-center mt-4 mb-8">

              <p className="font-heading text-3xl text-[#D4AF37]">
                {coupleNames}
            </p>

  <span className="text-xl text-[#916A63]">
    ♥
  </span>

</div>
          </nav>

        </div>
      )}

      <main>

        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden">

          {/* Hero Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/hero-ocean-background.png')",
            }}
          />

          {/* Light Overlay */}
          <div className="absolute inset-0 bg-white/10" />
          <div className="relative z-10 text-center">

            <p className="font-body text-sm uppercase tracking-[0.35em] mb-3">
              Together with their families
            </p>



        <p className="font-body text-sm uppercase tracking-[0.15em] mb-6">
            We invite you to celebrate the wedding of
            </p>

            <h1 className="font-great-vibes text-7xl md:text-9xl text-[var(--color-gold-accent)]">            
              {coupleNames}
          </h1>

            <div className="flex items-center justify-center gap-4 mt-8">
              <span className="h-px w-16 bg-[#916A63]/50"></span>
              <span className="text-lg text-[#916A63]">♥</span>
              <span className="h-px w-16 bg-[#916A63]/50"></span>
            </div>
            <div className="mt-8">

              <p className="font-body text-sm uppercase tracking-[0.3em] text-[#622825]">
                MARCH 13, 2027
              </p>

              {/* COUNTDOWN */}
              <div className="grid grid-cols-4 gap-3 md:gap-5 max-w-lg mx-auto mt-10">

                <div className="border border-[#916A63]/30 py-5 px-2">
                  <p className="font-heading text-4xl md:text-5xl text-[var(--color-gold-accent)]">
                    {timeLeft.days}
                  </p>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                    {language === "eng" ? "Days" : "Ngày"}
                  </p>
                </div>

                <div className="border border-[#916A63]/30 py-5 px-2">
                  <p className="font-heading text-4xl md:text-5xl text-[var(--color-gold-accent)]">
                    {timeLeft.hours}
                  </p>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                    {language === "eng" ? "Hours" : "Giờ"}
                  </p>
                </div>

                <div className="border border-[#916A63]/30 py-5 px-2">
                  <p className="font-heading text-4xl md:text-5xl text-[var(--color-gold-accent)]">
                    {timeLeft.minutes}
                  </p>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                    {language === "eng" ? "Minutes" : "Phút"}
                  </p>
                </div>

                <div className="border border-[#916A63]/30 py-5 px-2">
                  <p className="font-heading text-4xl md:text-5xl text-[var(--color-gold-accent)]">
                    {timeLeft.seconds}
                  </p>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                    {language === "eng" ? "Seconds" : "Giây"}
                  </p>
                </div>

              </div>

              <p className="font-script text-3xl md:text-4xl mt-10 text-[#916A63]">
                Please join us as we celebrate our love
              </p>

              <div className="mt-10">
                <a
                  href="#rsvp"
                  className="inline-block border border-[#622825] text-[#622825] px-8 py-3 font-body text-xs uppercase tracking-[0.25em] hover:bg-[#622825] hover:text-[#FDEFE8] transition"
                >
                  RSVP
                </a>
              </div>

              <div className="mt-12">
                <span className="font-body text-xs uppercase tracking-[0.3em]">
                  Scroll to explore
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* WEDDING DETAILS SECTION */}
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
                      {/* Wedding Rings Icon */}
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
                      {/* Location Pin Icon */}
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
                      {/* Bridal Gown Icon */}
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
                          {/* Neckline */}
                          <path d="M28 8c0 3 1.5 6 4 7.5C34.5 14 36 11 36 8" />

                          {/* Bodice and sleeves */}
                          <path d="M28 15.5 22 22l-7 4 7 4" />
                          <path d="M36 15.5 42 22l7 4-7 4" />

                          {/* Waist */}
                          <path d="M22 30c4 2 16 2 20 0" />

                          {/* Flowing skirt */}
                          <path d="M22 30 13 56h38L42 30" />

                          {/* Skirt detail */}
                          <path d="M18 43c9 3 19 3 28 0" />

                          {/* Bottom of gown */}
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
    
        {/* WEDDING DAY SCHEDULE */}
        <section
          id="schedule"
          className="py-28 px-6 section-texture"
        >
          <div className="max-w-4xl mx-auto">

            {/* SECTION HEADER */}
            <div className="text-center mb-20">

              <h2 className="font-heading text-5xl md:text-7xl text-[#622825]">
                {language === "eng" ? "Wedding Day" : "Lịch trình"}
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
            <div className="relative">

              {/* VERTICAL LINE */}
              <div className="absolute left-[7px] md:left-[150px] top-2 bottom-2 w-px bg-[#916A63]/40"></div>

              <div className="space-y-14">


                {/* GUEST ARRIVAL */}
                <div className="relative flex items-start gap-8 md:gap-12">

                  <div className="w-4 md:w-32 shrink-0 md:text-right">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
                      3:30 PM
                    </p>
                  </div>

                  <div className="relative z-10 mt-1 w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] shrink-0 flex items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">♥</span>
                  </div>

                  <div className="pt-0">
                    <h3 className="font-heading text-3xl md:text-4xl">
                      {language === "eng" ? "Guest Arrival" : "Đón Khách"}
                    </h3>

                    <p className="font-body text-sm mt-2 text-[#916A63]">
                      {language === "eng"
                        ? "Check in, grab a drink & find your seat"
                        : "Đón khách, thưởng thức đồ uống và tìm chỗ ngồi"}
                    </p>
                  </div>

                </div>


                {/* CEREMONY */}
                <div className="relative flex items-start gap-8 md:gap-12">

                  <div className="w-4 md:w-32 shrink-0 md:text-right">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
                      4:00 PM
                    </p>
                  </div>

                  <div className="relative z-10 mt-1 w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] shrink-0 flex items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">♥</span>
                  </div>

                  <div>
                    <h3 className="font-heading text-3xl md:text-4xl">
                      {language === "eng" ? "Ceremony" : "Lễ Cưới"}
                    </h3>

                    <p className="font-body text-sm mt-2 text-[#916A63]">
                      {language === "eng"
                        ? 'Join us as we say "I do"'
                        : "Chứng kiến khoảnh khắc 2 vợ chồng trao lời thề nguyện và căm ơn gia đình, bạn bè đã đi cùng chúng tôi đến ngày hôm nay"}
                    </p>
                  </div>

                </div>


                {/* COCKTAIL HOUR */}
                <div className="relative flex items-start gap-8 md:gap-12">

                  <div className="w-4 md:w-32 shrink-0 md:text-right">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
                      5:00 PM
                    </p>
                  </div>

                  <div className="relative z-10 mt-1 w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] shrink-0 flex items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">♥</span>
                  </div>

                  <div>
                    <h3 className="font-heading text-3xl md:text-4xl">
                      {language === "eng" ? "Cocktail Hour" : "Tiệc Cocktail"}
                    </h3>

                    <p className="font-body text-sm mt-2 text-[#916A63]">
                      {language === "eng"
                        ? "Mingle, sip & celebrate"
                        : "Cùng nâng ly, trò chuyện và chung vui"}
                    </p>
                  </div>

                </div>


                {/* RECEPTION */}
                <div className="relative flex items-start gap-8 md:gap-12">

                  <div className="w-4 md:w-32 shrink-0 md:text-right">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
                      6:00 PM
                    </p>
                  </div>

                  <div className="relative z-10 mt-1 w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] shrink-0 flex items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">♥</span>
                  </div>

                  <div>
                    <h3 className="font-heading text-3xl md:text-4xl">
                      {language === "eng" ? "Reception" : "Tiệc Mừng"}
                    </h3>

                    <p className="font-body text-sm mt-2 text-[#916A63]">
                      {language === "eng"
                        ? "Dinner, dancing & good vibes"
                        : "Dùng tiệc, khiêu vũ và tận hưởng những khoảnh khắc đáng nhớ"}
                    </p>
                  </div>

                </div>


                {/* FIRST DANCE */}
                <div className="relative flex items-start gap-8 md:gap-12">

                  <div className="w-4 md:w-32 shrink-0 md:text-right">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
                      8:00 PM
                    </p>
                  </div>

                  <div className="relative z-10 mt-1 w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] shrink-0 flex items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">♥</span>
                  </div>

                  <div>
                    <h3 className="font-heading text-3xl md:text-4xl">
                      {language === "eng"
                        ? "First Dance"
                        : "Điệu Nhảy Đầu Tiên"}
                    </h3>

                    <p className="font-body text-sm mt-2 text-[#916A63]">
                      {language === "eng"
                        ? "A special moment for the newlyweds"
                        : "Khoảnh khắc của cô dâu và chú rể nhảy điệu đầu tiên"}
                    </p>
                  </div>

                </div>


                {/* SEND OFF */}
                <div className="relative flex items-start gap-8 md:gap-12">

                  <div className="w-4 md:w-32 shrink-0 md:text-right">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
                      9:30 PM
                    </p>
                  </div>

                  <div className="relative z-10 mt-1 w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] shrink-0 flex items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">♥</span>
                  </div>

                  <div>
                    <h3 className="font-heading text-3xl md:text-4xl">
                      {language === "eng"
                        ? "Bride & Groom Send Off"
                        : "Tiễn Cô Dâu & Chú Rể"}
                    </h3>

                    <p className="font-body text-sm mt-2 text-[#916A63]">
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
  

        {/* VENUE SECTION */}
        <section
          id="venue"
          className="py-28 px-6 section-texture"
        >
          <div className="max-w-5xl mx-auto text-center">

            {/* SECTION HEADER */}
            <div className="mb-16">

          

              <h2 className="font-heading text-5xl md:text-7xl text-[#622825]">
                {language === "eng"
                  ? "The Venue"
                  : "Địa Điểm"}
              </h2>

              <p className="font-script text-4xl md:text-5xl mt-5 text-[#916A63]">
                {language === "eng"
                  ? "Where We Say I Do"
                  : "Nơi Ta Trao Lời Hẹn Ước"}
              </p>

              {/* SINGLE DIVIDER */}
              <div className="flex justify-center mt-6">
                <div className="w-24 h-px bg-[#D4AF37]/60" />
              </div>

            </div>


            {/* VENUE CONTENT */}
            <div className="py-2">

              <span className="font-heading text-2xl text-[var(--color-gold-accent)]">
                ♥
              </span>

              <h3 className="font-heading text-4xl md:text-5xl text-[#622825] mt-3">
                The Ocean Villas Resort
              </h3>

              <p className="font-body text-xs uppercase tracking-[0.3em] mt-5 text-[#916A63]">
                {language === "eng"
                  ? "Da Nang, Viet Nam"
                  : "Đà Nẵng, Việt Nam"}
              </p>

              <p className="font-body text-sm leading-7 max-w-xl mx-auto mt-8 text-[#622825]">
                {language === "eng"
                  ? "A beautiful seaside setting where we will gather with our favorite people to celebrate this special day."
                  : "Một không gian bên biển tuyệt đẹp, nơi chúng ta sẽ cùng những người thân yêu lưu giữ những khoảnh khắc đáng nhớ trong ngày đặc biệt này."}
              </p>

              <div className="mt-10">

                <a
                  href="https://www.google.com/maps/search/?api=1&query=The+Ocean+Villas+Resort+Da+Nang+Vietnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-[#622825] text-[#622825] px-10 py-4 font-body text-xs uppercase tracking-[0.3em] hover:bg-[#622825] hover:text-[#FDEFE8] transition"
                >
                  {language === "eng"
                    ? "View Directions"
                    : "Xem Hướng Dẫn"}
                </a>

              </div>

            </div>

          </div>
        </section>
  

        {/* RSVP SECTION */}
        <section
          id="rsvp"
          className="py-28 px-6 bg-[#FDEFE8]"
        >
          <div className="max-w-3xl mx-auto text-center">

            {language === "eng" ? (
              <>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-[#916A63]">
                  We hope you can join us
                </p>

                <h2 className="font-heading text-5xl md:text-6xl text-[#622825] mt-4">
                  RSVP
                </h2>

                <div className="flex items-center justify-center gap-4 mt-6">
                  <span className="h-px w-16 bg-[#916A63]/40"></span>
                  <span className="text-lg text-[#916A63]">♥</span>
                  <span className="h-px w-16 bg-[#916A63]/40"></span>
                </div>

                <p className="font-script text-3xl md:text-4xl text-[#916A63] mt-8">
                  Celebrate with us
                </p>

                <p className="font-body text-sm leading-7 text-[#916A63] max-w-xl mx-auto mt-6">
                  Your presence would mean so much to us. Please let us know if
                  you'll be joining us for our special day.
                </p>

                <div className="mt-10">
                  <a
                    href="https://forms.gle/acJ9i9A2xHR5p3yP8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-[#622825] text-[#622825] px-8 py-3 font-body text-xs uppercase tracking-[0.25em] hover:bg-[#622825] hover:text-[#FDEFE8] transition"
                  >
                    RSVP Now
                  </a>
                </div>

                <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63] mt-8">
                  Formal invitation to follow
                </p>
              </>
            ) : (
              <>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-[#916A63]">
                  Trân trọng kính mời
                </p>

                <h2 className="font-heading text-5xl md:text-6xl text-[#622825] mt-4">
                  RSVP
                </h2>

                <div className="flex items-center justify-center gap-4 mt-6">
                  <span className="h-px w-16 bg-[#916A63]/40"></span>
                  <span className="text-lg text-[#916A63]">♥</span>
                  <span className="h-px w-16 bg-[#916A63]/40"></span>
                </div>

                <p className="font-script text-3xl md:text-4xl text-[#916A63] mt-8">
                  Cùng chúng tôi chung vui
                </p>

                <p className="font-body text-sm leading-7 text-[#916A63] max-w-xl mx-auto mt-6">
                  Sự hiện diện của quý khách là niềm vinh hạnh và hạnh phúc
                  đối với chúng tôi. Kính mong quý khách xác nhận tham dự
                  để chúng tôi có thể chuẩn bị chu đáo cho ngày vui.
                </p>

                <div className="mt-10">
                  <a
                    href="https://forms.gle/acJ9i9A2xHR5p3yP8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-[#622825] text-[#622825] px-8 py-3 font-body text-xs uppercase tracking-[0.25em] hover:bg-[#622825] hover:text-[#FDEFE8] transition"
                  >
                    Xác nhận tham dự
                  </a>
                </div>

                <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63] mt-8">
                  Thiệp mời chính thức sẽ được gửi sau
                </p>
              </>
            )}

          </div>
        </section>


        {/* PHOTO GALLERY SECTION */}
        <section
          id="gallery"
          className="py-28 px-6 section-texture"
        >

          <div className="max-w-6xl mx-auto">

            {/* SECTION HEADER */}
            <div className="text-center mb-20">

              <p className="font-body text-xs uppercase tracking-[0.35em] text-[#916A63] mb-5">
                A little glimpse of our love
              </p>

              <h2 className="font-heading text-5xl md:text-7xl text-[#622825]">
                Our Memories
              </h2>

              <p className="font-script text-4xl md:text-5xl mt-5 text-[#916A63]">
                Moments worth remembering
              </p>

            </div>


            {/* PHOTO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* PHOTO 1 */}
              <div className="aspect-[4/5] bg-white border border-[#916A63]/20 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center transition duration-500 group-hover:scale-[1.02]">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63]">
                    Photo coming soon
                  </p>
                </div>
              </div>

              {/* PHOTO 2 */}
              <div className="aspect-[4/5] bg-white border border-[#916A63]/20 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center transition duration-500 group-hover:scale-[1.02]">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63]">
                    Photo coming soon
                  </p>
                </div>
              </div>

              {/* PHOTO 3 */}
              <div className="aspect-[4/5] bg-white border border-[#916A63]/20 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center transition duration-500 group-hover:scale-[1.02]">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63]">
                    Photo coming soon
                  </p>
                </div>
              </div>

              {/* PHOTO 4 */}
              <div className="aspect-[4/5] bg-white border border-[#916A63]/20 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center transition duration-500 group-hover:scale-[1.02]">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63]">
                    Photo coming soon
                  </p>
                </div>
              </div>

              {/* PHOTO 5 */}
              <div className="aspect-[4/5] bg-white border border-[#916A63]/20 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center transition duration-500 group-hover:scale-[1.02]">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63]">
                    Photo coming soon
                  </p>
                </div>
              </div>

              {/* PHOTO 6 */}
              <div className="aspect-[4/5] bg-white border border-[#916A63]/20 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center transition duration-500 group-hover:scale-[1.02]">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63]">
                    Photo coming soon
                  </p>
                </div>
              </div>

            </div>

            <div className="text-center mt-16">
              <span className="font-heading text-2xl text-[#916A63]">
                ♥
              </span>

              <p className="font-script text-3xl mt-3 text-[#916A63]">
                More memories to come
              </p>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="py-28 px-6 section-texture"
        >

          <div className="max-w-4xl mx-auto">

            <h2 className="font-heading text-5xl md:text-7xl text-[var(--color-gold-accent)]">
              {language === "eng"
                ? "Frequently Asked Questions"
                : "Câu Hỏi Thường Gặp"}
            </h2>

            <p className="font-script text-3xl mt-4 text-[#916A63]">
              {language === "eng"
                ? "A few helpful details"
                : "Một vài thông tin hữu ích"}
            </p>
          </div>


          <div className="space-y-8">


            {/* DRESS CODE */}
            <div className="border-b border-[#916A63]/20 pb-6">

              <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-gold-accent)]">
                {language === "eng"
                  ? "What should I wear?"
                  : "Tôi nên mặc gì?"}
              </h3>

              <p className="font-body text-sm leading-7 mt-3 text-[#622825]">

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

                    Nếu chưa chắc chắn về trang phục, quý khách có thể liên hệ
                    trực tiếp với chúng tôi để được tư vấn.
                  </>
                )}

              </p>
            </div>


            {/* CHILDREN */}
            <div className="border-b border-[#916A63]/20 pb-6">

              <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-gold-accent)]">
                {language === "eng"
                  ? "Can I bring my children?"
                  : "Tôi có thể đưa trẻ em đến dự không?"}
              </h3>

              <p className="font-body text-sm leading-7 mt-3 text-[#622825]">

                {language === "eng" ? (
                  <>
                    While we love your little ones, we have decided to make our
                    wedding an adult-only celebration. Only family members and
                    friends who have been specifically invited to bring children
                    are welcome to do so.
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
                    Nếu quý khách có bất kỳ câu hỏi hoặc thắc mắc nào, vui lòng
                    liên hệ trực tiếp với chúng tôi.
                  </>
                )}

              </p>
            </div>


            {/* ARRIVAL */}
            <div className="border-b border-[#916A63]/20 pb-6">

              <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-gold-accent)]">
                {language === "eng"
                  ? "What time should I arrive?"
                  : "Tôi nên đến lúc mấy giờ?"}
              </h3>

              <p className="font-body text-sm leading-7 mt-3 text-[#622825]">

                {language === "eng" ? (
                  <>
                    Guest arrival begins at 3:30 PM and 5:00 PM, with the ceremony beginning
                    at 4:00 PM and the reception beginning at 6:00 PM.
                    <br />
                    Late arrivals will not be permitted to enter the ceremony area
                    once it has started, so please plan to arrive on time.
                  </>
                ) : (
                  <>
                    Thời gian đón khách bắt đầu lúc 3:30 PM và 5:00 PM, với lễ vows sẽ bắt đầu
                    lúc 4:00 PM và tiệc mừng bắt đầu lúc 6:00 PM.
                    <br />
                    Sau khi buổi lễ bắt đầu, khách đến muộn sẽ không được phép
                    vào khu vực làm lễ. Vì vậy, kính mong quý khách sắp xếp thời
                    gian đến đúng giờ.
                  </>
                )}

              </p>
            </div>


            {/* CEREMONY & RECEPTION */}
            <div className="border-b border-[#916A63]/20 pb-6">

              <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-gold-accent)]">
                {language === "eng"
                  ? "Why is there a Vow Ceremony and a Reception?"
                  : "Vì sao có Lễ Vows và Tiệc Mừng?"}
              </h3>

              <p className="font-body text-sm leading-7 mt-3 text-[#622825]">

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


            {/* PLUS ONE */}
            <div className="border-b border-[#916A63]/20 pb-6">

              <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-gold-accent)]">
                {language === "eng"
                  ? "Can I bring a plus-one?"
                  : "Tôi có thể đi cùng người thân hoặc bạn đời không?"}
              </h3>

              <p className="font-body text-sm leading-7 mt-3 text-[#622825]">

                {language === "eng"
                  ? "Only spouses are invited to attend. If you have a significant other, please reach out to us directly to discuss your invitation."
                  : "Chỉ vợ hoặc chồng được mời tham dự. Nếu quý khách có người yêu hoặc bạn đời, vui lòng liên hệ trực tiếp với chúng tôi để trao đổi thêm về lời mời."}

              </p>
            </div>


          </div>

        </section>
        
        
        {/* FOOTER */}
        <footer className="py-16 px-6 section-texture text-center">

          <div className="max-w-3xl mx-auto">

            <p className="font-heading text-3xl md:text-4xl text-[#622825]">
              {language === "eng"
                ? "Thank you for celebrating with us!"
                : "Cảm ơn mọi người đã cùng chung vui với chúng tôi!"}
            </p>

            <div className="flex justify-center mt-6">
              <span className="text-xl text-[var(--color-gold-accent)]">
                ♥
              </span>
            </div>

            <p className="font-body text-xs uppercase tracking-[0.3em] mt-6 text-[#916A63]">
              {language === "eng"
                ? "September 13, 2027"
                : "13 tháng 9, 2027"}
            </p>

            <p className="font-script text-4xl md:text-5xl mt-6 text-[#916A63]">
              {language === "eng"
                ? "With love,"
                : "Thương yêu,"}
            </p>

            <p className="font-great-vibes text-4xl md:text-5xl mt-2 text-[var(--color-gold-accent)]">
              {coupleNames}
            </p>

          </div>

        </footer>
    
    
        <MusicPlayer language={language} />


      </main>

    </>
  );
}