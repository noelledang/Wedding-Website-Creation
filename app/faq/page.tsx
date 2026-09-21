"use client";

import { useState } from "react";
import { useLanguage } from "../LanguageProvider";

export default function FAQPage() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main id="faq" className="min-h-screen bg-[#FDEFE8] text-[#622825]">

      {/* =========================================================
          DESKTOP FAQ
          ========================================================= */}
      <section className="hidden md:block py-28 px-6 section-texture">

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


        <div className="max-w-4xl mx-auto mt-16 space-y-8">


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
                  Cho lễ Vows, thời gian đón khách bắt đầu lúc 3:30 PM, với buổi lễ bắt đầu
                  lúc 4:00 PM.
                  <br />
                  Cho Tiệc Mừng, thời gian đón khách bắt đầu lúc 5:00 PM, với buổi lễ bắt đầu
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
            <div className="overflow-hidden rounded-xl border border-[#916A63]/20 bg-[#FDEFE8]/55">

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

    </main>
  );
}