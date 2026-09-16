"use client";

import { useLanguage } from "../LanguageProvider";

export default function GalleryPage() {
    const { language } = useLanguage();

    return (
        <main>

            {/* PHOTO GALLERY SECTION */}
            <section
                id="gallery"
                className="py-28 px-6 section-texture"
            >
                <div className="max-w-6xl mx-auto">

                    {/* SECTION HEADER */}
                    <div className="text-center mb-16">

                        <p className="font-body text-xs uppercase tracking-[0.3em] text-[#916A63]">
                            {language === "eng"
                                ? "Moments We Treasure"
                                : "Những Khoảnh Khắc Đáng Nhớ"}
                        </p>

                        <h2 className="font-heading text-5xl md:text-7xl text-[#622825] mt-4">
                            {language === "eng"
                                ? "Our Gallery"
                                : "Thư Viện Ảnh"}
                        </h2>

                        <p className="font-script text-4xl md:text-5xl mt-5 text-[#916A63]">
                            {language === "eng"
                                ? "A glimpse into our love story"
                                : "Những khoảnh khắc trong câu chuyện tình yêu của chúng tôi"}
                        </p>

                        <div className="flex justify-center mt-6">
                            <div className="w-24 h-px bg-[#D4AF37]/60" />
                        </div>

                    </div>


                    {/* PHOTO GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* PHOTO 1 */}
                        <div className="aspect-[4/5] bg-[#FDEFE8] border border-[#916A63]/20 flex items-center justify-center">
                            <div className="text-center px-6">
                                <span className="text-3xl text-[#D4AF37]">♥</span>
                                <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63] mt-4">
                                    {language === "eng" ? "Photo 1" : "Ảnh 1"}
                                </p>
                            </div>
                        </div>

                        {/* PHOTO 2 */}
                        <div className="aspect-[4/5] bg-[#FDEFE8] border border-[#916A63]/20 flex items-center justify-center">
                            <div className="text-center px-6">
                                <span className="text-3xl text-[#D4AF37]">♥</span>
                                <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63] mt-4">
                                    {language === "eng" ? "Photo 2" : "Ảnh 2"}
                                </p>
                            </div>
                        </div>

                        {/* PHOTO 3 */}
                        <div className="aspect-[4/5] bg-[#FDEFE8] border border-[#916A63]/20 flex items-center justify-center">
                            <div className="text-center px-6">
                                <span className="text-3xl text-[#D4AF37]">♥</span>
                                <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63] mt-4">
                                    {language === "eng" ? "Photo 3" : "Ảnh 3"}
                                </p>
                            </div>
                        </div>

                        {/* PHOTO 4 */}
                        <div className="aspect-[4/5] bg-[#FDEFE8] border border-[#916A63]/20 flex items-center justify-center">
                            <div className="text-center px-6">
                                <span className="text-3xl text-[#D4AF37]">♥</span>
                                <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63] mt-4">
                                    {language === "eng" ? "Photo 4" : "Ảnh 4"}
                                </p>
                            </div>
                        </div>

                        {/* PHOTO 5 */}
                        <div className="aspect-[4/5] bg-[#FDEFE8] border border-[#916A63]/20 flex items-center justify-center">
                            <div className="text-center px-6">
                                <span className="text-3xl text-[#D4AF37]">♥</span>
                                <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63] mt-4">
                                    {language === "eng" ? "Photo 5" : "Ảnh 5"}
                                </p>
                            </div>
                        </div>

                        {/* PHOTO 6 */}
                        <div className="aspect-[4/5] bg-[#FDEFE8] border border-[#916A63]/20 flex items-center justify-center">
                            <div className="text-center px-6">
                                <span className="text-3xl text-[#D4AF37]">♥</span>
                                <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63] mt-4">
                                    {language === "eng" ? "Photo 6" : "Ảnh 6"}
                                </p>
                            </div>
                        </div>

                    </div>


                    {/* FOOTER MESSAGE */}
                    <div className="text-center mt-20">

                        <span className="font-heading text-2xl text-[var(--color-gold-accent)]">
                            ♥
                        </span>

                        <p className="font-script text-3xl md:text-4xl text-[#916A63] mt-4">
                            {language === "eng"
                                ? "More memories coming soon..."
                                : "Những khoảnh khắc đẹp hơn sẽ được cập nhật sớm..."}
                        </p>

                    </div>

                </div>
            </section>

        </main>
    );
}