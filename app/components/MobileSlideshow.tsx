"use client";

import { useEffect, useState } from "react";

const photos = [
    "/wedding-gallery/Picture 4.JPG",
    "/wedding-gallery/Picture 5.JPG",
    "/wedding-gallery/Picture 6.JPG",
    "/wedding-gallery/Picture 7.JPG",
    "/wedding-gallery/Picture 8.JPG",
];

export default function MobileSlideshow() {
    const [currentPhoto, setCurrentPhoto] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhoto((current) =>
                current === photos.length - 1 ? 0 : current + 1
            );
        }, 4500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden bg-[#FDEFE8] md:hidden">
            <div className="relative mx-auto w-full max-w-md">
                <div className="relative aspect-[941/1672] w-full">
                    {/* GARDEN AND WALNUT FRAME */}
                    <img
                        src="/images/slideshow-walnut-garden.webp"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full"
                    />

                    {/* PHOTO OPENING INSIDE THE FRAME */}
                    <div className="absolute left-[15.5%] top-[24%] h-[52%] w-[68%] overflow-hidden bg-[#FDEFE8]">
                        {photos.map((photo, index) => (
                            <img
                                key={photo}
                                src={photo}
                                alt={`Noelle and Nathan, photo ${index + 1}`}
                                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ease-in-out ${index === currentPhoto
                                    ? "opacity-100"
                                    : "pointer-events-none opacity-0"
                                }`}
                            />
                        ))}
                    </div>

                    {/* FLORALS OVERLAP THE PHOTO WITHOUT BLOCKING CONTROLS */}
                    <img
                        src="/images/slideshow-walnut-garden.webp"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 h-full w-full select-none"
                        style={{ clipPath: "polygon(0 0, 44% 0, 44% 21%, 37% 24%, 29% 27%, 25% 35%, 19% 43%, 0 44%)" }}
                    />
                    <img
                        src="/images/slideshow-walnut-garden.webp"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 h-full w-full select-none"
                        style={{ clipPath: "polygon(100% 55%, 87% 57%, 82% 61%, 77% 64%, 71% 67%, 66% 72%, 55% 75%, 54% 83%, 100% 85%)" }}
                    />
                </div>

                {/* GOLD PROGRESS DIAMONDS */}
                <div className="absolute bottom-[9%] left-0 right-0 flex items-center justify-center gap-4">
                    {photos.map((photo, index) => (
                        <button
                            key={photo}
                            type="button"
                            onClick={() => setCurrentPhoto(index)}
                            aria-label={`Show photo ${index + 1}`}
                            aria-current={currentPhoto === index ? "true" : undefined}
                            className={`h-2.5 w-2.5 rotate-45 border border-[#D4AF37] transition-all duration-300 ${currentPhoto === index
                                    ? "scale-125 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.55)]"
                                    : "bg-[#FDEFE8]/50 opacity-60"
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}