"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageProvider";

export default function GalleryPage() {
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
        <main>
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
        </main>
    );
}