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
        <section className="relative overflow-hidden bg-[#FDEFE8] px-7 pb-16 pt-32 md:hidden">

            {/* SLIDESHOW BACKGROUND */}
            <img
                src="/images/slideshow-mobile.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* SUBTLE OVERLAY FOR PHOTO VISIBILITY */}
            <div className="absolute inset-0 bg-[#FDEFE8]/10" />

            {/* SLIDESHOW CONTENT */}
            <div className="relative z-10 mx-auto w-full max-w-md">

                {/* THIN GOLD SLIDESHOW FRAME */}
                <div className="relative">
                    <div className="rounded-[30px] border border-[#D4AF37]/80 bg-[#FDEFE8]/35 p-[5px] shadow-[0_15px_40px_rgba(98,40,37,0.15)]">
                        <div className="rounded-[25px] border border-[#D4AF37]/35 p-[3px]">

                            {/* MAIN PHOTO */}
                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[21px] bg-[#FDEFE8]">
                                {photos.map((photo, index) => (
                                    <img
                                        key={photo}
                                        src={photo}
                                        alt=""
                                        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ease-in-out ${index === currentPhoto
                                                ? "opacity-100"
                                                : "pointer-events-none opacity-0"
                                            }`}
                                    />
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* BOTTOM-LEFT FLORAL CORNER */}
                    <img
                        src="/images/slideshow-floral-corner.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-9 -left-7 z-30 w-32 select-none"
                    />

                    {/* TOP-RIGHT FLORAL CORNER */}
                    <img
                        src="/images/slideshow-floral-corner.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-7 -top-9 z-30 w-32 rotate-180 select-none"
                    />
                </div>

                {/* GOLD PROGRESS DIAMONDS */}
                <div className="mt-12 flex items-center justify-center gap-4">
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