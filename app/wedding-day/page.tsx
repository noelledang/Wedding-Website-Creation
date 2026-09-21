"use client";

import { useLanguage } from "../LanguageProvider";

export default function WeddingDayPage() {
  const { language } = useLanguage();

  return (
    <main>

      {/* WEDDING DAY SCHEDULE */}
      <section
        id="schedule"
        className="relative py-28 px-6 section-texture overflow-hidden"
      >

        {/* MOBILE BACKGROUND */}
        <div className="absolute inset-0 md:hidden">
          <img
            src="/images/schedule-mobile2.png"
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* SECTION HEADER */}
          <div className="text-center mb-20 pt-12 md:pt-0">

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
            <div className="absolute hidden md:block left-[150px] top-2 bottom-2 w-px bg-[#916A63]/40"></div>

            <div className="space-y-14">


              {/* GUEST ARRIVAL */}
              <div className="relative flex items-start gap-4 md:gap-12">

                <div className="w-20 md:w-32 shrink-0 text-right pl-1 md:pl-0">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
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

                  <p className="font-body text-sm mt-2 text-[#916A63]">
                    {language === "eng"
                      ? "Check in, grab a drink & find your seat"
                      : "Đón khách, thưởng thức đồ uống và tìm chỗ ngồi"}
                  </p>
                </div>

              </div>


              {/* CEREMONY */}
              <div className="relative flex items-start gap-4 md:gap-12">

                <div className="w-20 md:w-32 shrink-0 text-right">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
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

                  <p className="font-body text-sm mt-2 text-[#916A63]">
                    {language === "eng"
                      ? 'Join us as we say "I do"'
                      : "Chứng kiến khoảnh khắc 2 vợ chồng trao lời thề nguyện và cảm ơn gia đình, bạn bè đã đi cùng chúng tôi đến ngày hôm nay"}
                  </p>
                </div>

              </div>


              {/* COCKTAIL HOUR */}
              <div className="relative flex items-start gap-4 md:gap-12">

                <div className="w-20 md:w-32 shrink-0 text-right">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
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

                  <p className="font-body text-sm mt-2 text-[#916A63]">
                    {language === "eng"
                      ? "Mingle, sip & celebrate"
                      : "Cùng chụp hình, trò chuyện và chung vui"}
                  </p>
                </div>

              </div>


              {/* RECEPTION */}
              <div className="relative flex items-start gap-4 md:gap-12">

                <div className="w-20 md:w-32 shrink-0 text-right">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
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
                      ? "Reception"
                      : "Tiệc Mừng"}
                  </h3>

                  <p className="font-body text-sm mt-2 text-[#916A63]">
                    {language === "eng"
                      ? "Dinner, dancing & good vibes"
                      : "Dùng tiệc và giao lưu, tận hưởng những khoảnh khắc đáng nhớ"}
                  </p>
                </div>

              </div>


              {/* FIRST DANCE */}
              <div className="relative flex items-start gap-4 md:gap-12">

                <div className="w-20 md:w-32 shrink-0 text-right">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
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

                  <p className="font-body text-sm mt-2 text-[#916A63]">
                    {language === "eng"
                      ? "A special moment for the newlyweds"
                      : "Khoảnh khắc của cô dâu và chú rể nhảy điệu đầu tiên"}
                  </p>
                </div>

              </div>


              {/* SEND OFF */}
              <div className="relative flex items-start gap-4 md:gap-12">

                <div className="w-20 md:w-32 shrink-0 text-right">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
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

    </main>
  );
}