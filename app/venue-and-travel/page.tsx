
"use client";

import { useLanguage } from "../LanguageProvider";

export default function TravelPage() {
    const { language } = useLanguage();

    return (
        <main>

            {/* VENUE HERO */}
            <section className="py-32 px-6 section-texture">
                <div className="max-w-5xl mx-auto text-center">

                    {/* SECTION HEADER */}
                    <div className="mb-10">

                        <span className="font-heading text-3xl text-[var(--color-gold-accent)]">
                            ♥
                        </span>

                        <p className="font-body text-xs uppercase tracking-[0.3em] text-[#916A63] mt-6">
                            {language === "eng"
                                ? "Where We Say I Do"
                                : "Nơi Ta Trao Lời Hẹn Ước"}
                        </p>

                        <h1 className="font-heading text-6xl md:text-8xl text-[#622825] mt-4">
                            The Ocean Villas Resort
                        </h1>

                        <p className="font-script text-4xl md:text-5xl mt-6 text-[#916A63]">
                            {language === "eng"
                                ? "Da Nang, Viet Nam"
                                : "Đà Nẵng, Việt Nam"}
                        </p>

                        <div className="flex justify-center mt-7">
                            <div className="w-24 h-px bg-[#D4AF37]/60" />
                        </div>

                    </div>

                    <p className="font-body text-sm leading-7 max-w-2xl mx-auto mt-10 text-[#622825]">
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
            </section>


            {/* GETTING TO DA NANG */}
            <section className="py-28 px-6 section-texture">
                <div className="max-w-5xl mx-auto">

                    {/* SECTION HEADER */}
                    <div className="text-center mb-16">

                        <span className="font-heading text-2xl text-[var(--color-gold-accent)]">
                            ✈
                        </span>

                        <h2 className="font-heading text-5xl md:text-6xl text-[#622825] mt-4">
                            {language === "eng"
                                ? "Getting to Da Nang"
                                : "Đến Đà Nẵng"}
                        </h2>

                        <p className="font-script text-3xl md:text-4xl mt-5 text-[#916A63]">
                            {language === "eng"
                                ? "Your journey begins here"
                                : "Hành trình của bạn bắt đầu từ đây"}
                        </p>

                        <div className="flex justify-center mt-6">
                            <div className="w-24 h-px bg-[#D4AF37]/60" />
                        </div>

                    </div>


                    <div className="grid md:grid-cols-2 gap-12">

                        {/* AIRPORT */}
                        <div className="text-center">

                            <div className="w-14 h-14 mx-auto rounded-full border border-[#916A63] bg-[#FDEFE8] flex items-center justify-center">
                                <span className="text-xl text-[#916A63]">
                                    ✈
                                </span>
                            </div>

                            <h3 className="font-heading text-3xl md:text-4xl text-[#622825] mt-6">
                                {language === "eng"
                                    ? "Da Nang International Airport"
                                    : "Sân Bay Quốc Tế Đà Nẵng"}
                            </h3>

                            <p className="font-body text-sm leading-7 mt-5 text-[#916A63]">
                                {language === "eng"
                                    ? "Da Nang International Airport (DAD) is the main airport serving the city and is conveniently located near the wedding venue."
                                    : "Sân bay Quốc tế Đà Nẵng (DAD) là sân bay chính phục vụ thành phố và nằm thuận tiện gần địa điểm tổ chức đám cưới."}
                            </p>

                        </div>


                        {/* ARRIVAL */}
                        <div className="text-center">

                            <div className="w-14 h-14 mx-auto rounded-full border border-[#916A63] bg-[#FDEFE8] flex items-center justify-center">
                                <span className="text-xl text-[#916A63]">
                                    ♥
                                </span>
                            </div>

                            <h3 className="font-heading text-3xl md:text-4xl text-[#622825] mt-6">
                                {language === "eng"
                                    ? "Arrival"
                                    : "Khi Đến Nơi"}
                            </h3>

                            <p className="font-body text-sm leading-7 mt-5 text-[#916A63]">
                                {language === "eng"
                                    ? "Once you arrive in Da Nang, taxis, ride-hailing services, and private transportation are available to take you to your accommodation."
                                    : "Sau khi đến Đà Nẵng, bạn có thể sử dụng taxi, dịch vụ gọi xe hoặc phương tiện đưa đón riêng để di chuyển đến nơi lưu trú."}
                            </p>

                        </div>

                    </div>

                </div>
            </section>


            {/* WHERE TO STAY */}
            <section className="py-28 px-6 section-texture">
                <div className="max-w-6xl mx-auto">

                    {/* SECTION HEADER */}
                    <div className="text-center mb-16">

                        {/* HOTEL ICON */}
                        <div className="flex justify-center">
                            <svg
                                viewBox="0 0 64 64"
                                className="h-12 w-12 text-[var(--color-gold-accent)]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                {/* Hotel Building */}
                                <path d="M14 54V16h36v38" />

                                {/* Roof */}
                                <path d="M10 54h44" />

                                {/* Entrance */}
                                <path d="M27 54V42h10v12" />

                                {/* Windows */}
                                <rect x="20" y="23" width="5" height="6" />
                                <rect x="31" y="23" width="5" height="6" />
                                <rect x="42" y="23" width="5" height="6" />

                                <rect x="20" y="33" width="5" height="6" />
                                <rect x="31" y="33" width="5" height="6" />
                                <rect x="42" y="33" width="5" height="6" />

                                {/* Hotel Roof Detail */}
                                <path d="M10 16h44" />
                                <path d="M18 10h28l4 6H14l4-6Z" />
                            </svg>
                        </div>

                        <h2 className="font-heading text-5xl md:text-6xl text-[#622825] mt-4">
                            {language === "eng"
                                ? "Where to Stay"
                                : "Nơi Lưu Trú"}
                        </h2>

                        <p className="font-script text-3xl md:text-4xl mt-5 text-[#916A63]">
                            {language === "eng"
                                ? "Make yourself at home"
                                : "Hãy tận hưởng một kỳ nghỉ thật thoải mái"}
                        </p>

                        <div className="flex justify-center mt-6">
                            <div className="w-24 h-px bg-[#D4AF37]/60" />
                        </div>

                    </div>


                    <div className="grid md:grid-cols-3 gap-10">

                        {/* STAY AT VENUE */}
                        <div className="text-center border border-[#916A63]/20 p-10">

                            <span className="text-2xl text-[#D4AF37]">
                                ♥
                            </span>

                            <h3 className="font-heading text-3xl text-[#622825] mt-5">
                                The Ocean Villas Resort
                            </h3>

                            <p className="font-body text-xs uppercase tracking-[0.25em] mt-4 text-[#916A63]">
                                Da Nang, Viet Nam
                            </p>

                            <p className="font-body text-sm leading-7 mt-6 text-[#916A63]">
                                {language === "eng"
                                    ? "Our wedding celebration will take place here, making it a convenient option for guests who would like to stay close to the festivities."
                                    : "Đây là nơi tổ chức lễ cưới của chúng tôi, rất thuận tiện cho những khách mời muốn lưu trú gần nơi diễn ra các hoạt động."}
                            </p>

                            <a
                                href="https://www.google.com/maps/search/?api=1&query=The+Ocean+Villas+Resort+Da+Nang+Vietnam"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-8 border border-[#622825] text-[#622825] px-7 py-3 font-body text-xs uppercase tracking-[0.2em] hover:bg-[#622825] hover:text-[#FDEFE8] transition"
                            >
                                {language === "eng"
                                    ? "View Location"
                                    : "Xem Địa Điểm"}
                            </a>

                        </div>


                        {/* NEARBY HOTELS */}
                        <div className="text-center border border-[#916A63]/20 p-10">

                            <span className="text-2xl text-[#D4AF37]">
                                ♡
                            </span>

                            <h3 className="font-heading text-3xl text-[#622825] mt-5">
                                {language === "eng"
                                    ? "Nearby Hotels"
                                    : "Khách Sạn Gần Đó"}
                            </h3>

                            <p className="font-body text-xs uppercase tracking-[0.25em] mt-4 text-[#916A63]">
                                {language === "eng"
                                    ? "Convenient Options"
                                    : "Các Lựa Chọn Thuận Tiện"}
                            </p>

                            <p className="font-body text-sm leading-7 mt-6 text-[#916A63]">
                                {language === "eng"
                                    ? "There are a variety of hotels and resorts in the Da Nang area to suit different preferences and budgets."
                                    : "Đà Nẵng có nhiều khách sạn và khu nghỉ dưỡng phù hợp với nhiều nhu cầu và ngân sách khác nhau."}
                            </p>

                        </div>


                        {/* STAY LONGER */}
                        <div className="text-center border border-[#916A63]/20 p-10">

                            <span className="text-2xl text-[#D4AF37]">
                                ✦
                            </span>

                            <h3 className="font-heading text-3xl text-[#622825] mt-5">
                                {language === "eng"
                                    ? "Stay a Little Longer"
                                    : "Ở Lại Lâu Hơn Một Chút"}
                            </h3>

                            <p className="font-body text-xs uppercase tracking-[0.25em] mt-4 text-[#916A63]">
                                {language === "eng"
                                    ? "Explore Da Nang"
                                    : "Khám Phá Đà Nẵng"}
                            </p>

                            <p className="font-body text-sm leading-7 mt-6 text-[#916A63]">
                                {language === "eng"
                                    ? "If you have the time, we would love for you to enjoy a little extra time in Da Nang and experience everything this beautiful destination has to offer."
                                    : "Nếu có thời gian, chúng tôi rất mong bạn có thể ở lại lâu hơn để khám phá Đà Nẵng và tận hưởng những điều tuyệt vời mà thành phố xinh đẹp này mang lại."}
                            </p>

                        </div>

                    </div>

                </div>
            </section>


            {/* GETTING AROUND */}
            <section className="py-28 px-6 section-texture">
                <div className="max-w-5xl mx-auto">

                    {/* SECTION HEADER */}
                    <div className="text-center mb-16">

                        <span className="font-heading text-2xl text-[var(--color-gold-accent)]">
                            ✦
                        </span>

                        <h2 className="font-heading text-5xl md:text-6xl text-[#622825] mt-4">
                            {language === "eng"
                                ? "Getting Around"
                                : "Di Chuyển"}
                        </h2>

                        <p className="font-script text-3xl md:text-4xl mt-5 text-[#916A63]">
                            {language === "eng"
                                ? "Getting from here to there"
                                : "Di chuyển dễ dàng trong thành phố"}
                        </p>

                        <div className="flex justify-center mt-6">
                            <div className="w-24 h-px bg-[#D4AF37]/60" />
                        </div>

                    </div>


                    <div className="grid md:grid-cols-3 gap-10">

                        {/* TAXI */}
                        <div className="text-center">

                            <div className="w-14 h-14 mx-auto rounded-full border border-[#916A63] bg-[#FDEFE8] flex items-center justify-center">
                                <span className="text-lg">
                                    🚕
                                </span>
                            </div>

                            <h3 className="font-heading text-3xl text-[#622825] mt-5">
                                {language === "eng"
                                    ? "Taxi & Ride Services"
                                    : "Taxi & Dịch Vụ Gọi Xe"}
                            </h3>

                            <p className="font-body text-sm leading-7 mt-4 text-[#916A63]">
                                {language === "eng"
                                    ? "Taxis and ride-hailing services are convenient options for getting around Da Nang."
                                    : "Taxi và các dịch vụ gọi xe là những lựa chọn thuận tiện để di chuyển trong Đà Nẵng."}
                            </p>

                        </div>


                        {/* PRIVATE TRANSPORTATION */}
                        <div className="text-center">

                            <div className="w-14 h-14 mx-auto rounded-full border border-[#916A63] bg-[#FDEFE8] flex items-center justify-center">
                                <span className="text-lg">
                                    🚗
                                </span>
                            </div>

                            <h3 className="font-heading text-3xl text-[#622825] mt-5">
                                {language === "eng"
                                    ? "Private Transportation"
                                    : "Phương Tiện Riêng"}
                            </h3>

                            <p className="font-body text-sm leading-7 mt-4 text-[#916A63]">
                                {language === "eng"
                                    ? "Guests may also arrange private transportation between the airport, hotel, and wedding venue."
                                    : "Khách mời cũng có thể sắp xếp phương tiện riêng giữa sân bay, khách sạn và địa điểm tổ chức đám cưới."}
                            </p>

                        </div>


                        {/* ROUTE */}
                        <div className="text-center">

                            <div className="w-14 h-14 mx-auto rounded-full border border-[#916A63] bg-[#FDEFE8] flex items-center justify-center">
                                <span className="text-lg">
                                    ♧
                                </span>
                            </div>

                            <h3 className="font-heading text-3xl text-[#622825] mt-5">
                                {language === "eng"
                                    ? "Plan Your Route"
                                    : "Lên Kế Hoạch Di Chuyển"}
                            </h3>

                            <p className="font-body text-sm leading-7 mt-4 text-[#916A63]">
                                {language === "eng"
                                    ? "We recommend checking your preferred route and transportation options before heading to the venue."
                                    : "Chúng tôi khuyên bạn nên kiểm tra tuyến đường và phương tiện di chuyển trước khi đến địa điểm tổ chức."}
                            </p>

                        </div>

                    </div>

                </div>
            </section>


            {/* TRAVEL TIPS */}
            <section className="py-28 px-6 section-texture">
                <div className="max-w-4xl mx-auto">

                    {/* SECTION HEADER */}
                    <div className="text-center mb-16">

                        <span className="font-heading text-2xl text-[var(--color-gold-accent)]">
                            ♡
                        </span>

                        <h2 className="font-heading text-5xl md:text-6xl text-[#622825] mt-4">
                            {language === "eng"
                                ? "Travel Tips"
                                : "Thông Tin Du Lịch"}
                        </h2>

                        <p className="font-script text-3xl md:text-4xl mt-5 text-[#916A63]">
                            {language === "eng"
                                ? "A few things to know"
                                : "Một vài điều bạn nên biết"}
                        </p>

                        <div className="flex justify-center mt-6">
                            <div className="w-24 h-px bg-[#D4AF37]/60" />
                        </div>

                    </div>


                    <div className="space-y-10">

                        {/* WEATHER */}
                        <div className="flex gap-6 items-start">

                            <div className="w-12 h-12 shrink-0 rounded-full border border-[#916A63] bg-white/40 flex items-center justify-center">
                                <span className="text-[#916A63]">
                                    ☼
                                </span>
                            </div>

                            <div>
                                <h3 className="font-heading text-3xl text-[#622825]">
                                    {language === "eng"
                                        ? "Weather"
                                        : "Thời Tiết"}
                                </h3>

                                <p className="font-body text-sm leading-7 mt-2 text-[#916A63]">
                                    {language === "eng"
                                        ? "Please check the local forecast closer to the wedding date so you can pack accordingly."
                                        : "Vui lòng kiểm tra dự báo thời tiết gần ngày cưới để chuẩn bị trang phục và hành lý phù hợp."}
                                </p>
                            </div>

                        </div>


                        {/* CURRENCY */}
                        <div className="flex gap-6 items-start">

                            <div className="w-12 h-12 shrink-0 rounded-full border border-[#916A63] bg-white/40 flex items-center justify-center">
                                <span className="text-[#916A63]">
                                    $
                                </span>
                            </div>

                            <div>
                                <h3 className="font-heading text-3xl text-[#622825]">
                                    {language === "eng"
                                        ? "Currency"
                                        : "Tiền Tệ"}
                                </h3>

                                <p className="font-body text-sm leading-7 mt-2 text-[#916A63]">
                                    {language === "eng"
                                        ? "Vietnam uses the Vietnamese đồng (VND). Guests may wish to have some local currency available for smaller purchases."
                                        : "Việt Nam sử dụng đồng Việt Nam (VND). Bạn có thể chuẩn bị một ít tiền mặt để thuận tiện cho các khoản chi tiêu nhỏ."}
                                </p>
                            </div>

                        </div>


                        {/* CONNECTIVITY */}
                        <div className="flex gap-6 items-start">

                            <div className="w-12 h-12 shrink-0 rounded-full border border-[#916A63] bg-white/40 flex items-center justify-center">
                                <span className="text-[#916A63]">
                                    ♧
                                </span>
                            </div>

                            <div>
                                <h3 className="font-heading text-3xl text-[#622825]">
                                    {language === "eng"
                                        ? "Connectivity"
                                        : "Kết Nối"}
                                </h3>

                                <p className="font-body text-sm leading-7 mt-2 text-[#916A63]">
                                    {language === "eng"
                                        ? "Consider arranging an international phone plan, local SIM card, or eSIM before or shortly after arrival."
                                        : "Bạn có thể chuẩn bị gói cước quốc tế, SIM địa phương hoặc eSIM trước hoặc ngay sau khi đến Việt Nam."}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* FINAL MESSAGE */}
            <section className="py-28 px-6 section-texture">

                <div className="max-w-4xl mx-auto text-center">

                    {/* SECTION HEADER */}
                    <div className="mb-10">

                        <span className="font-heading text-2xl text-[var(--color-gold-accent)]">
                            ♥
                        </span>

                        <h2 className="font-heading text-5xl md:text-6xl text-[#622825] mt-4">
                            {language === "eng"
                                ? "See You in Da Nang"
                                : "Hẹn Gặp Bạn Tại Đà Nẵng"}
                        </h2>

                        <p className="font-script text-3xl md:text-4xl mt-5 text-[#916A63]">
                            {language === "eng"
                                ? "We cannot wait to celebrate with you"
                                : "Chúng tôi rất mong được cùng bạn chung vui"}
                        </p>

                        <div className="flex justify-center mt-6">
                            <div className="w-24 h-px bg-[#D4AF37]/60" />
                        </div>

                    </div>

                    <p className="font-body text-sm leading-7 max-w-xl mx-auto mt-10 text-[#916A63]">
                        {language === "eng"
                            ? "Safe travels, and we'll see you soon!"
                            : "Chúc bạn có một hành trình thật vui vẻ, và hẹn gặp bạn sớm!"}
                    </p>

                </div>

            </section>

        </main>
    );
}

