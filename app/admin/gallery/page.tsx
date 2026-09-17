"use client";

import { useEffect, useState } from "react";

type Photo = {
  url: string;
  pathname: string;
};

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const [englishIntro, setEnglishIntro] = useState("Moments We Treasure");
  const [englishTitle, setEnglishTitle] = useState("Our Gallery");
  const [englishSubtitle, setEnglishSubtitle] = useState(
    "A glimpse into our love story"
  );
  const [englishFooter, setEnglishFooter] = useState(
    "More memories coming soon..."
  );

  const [vietnameseIntro, setVietnameseIntro] = useState(
    "Những Khoảnh Khắc Đáng Nhớ"
  );
  const [vietnameseTitle, setVietnameseTitle] =
    useState("Thư Viện Ảnh");
  const [vietnameseSubtitle, setVietnameseSubtitle] = useState(
    "Những khoảnh khắc trong câu chuyện tình yêu của chúng tôi"
  );
  const [vietnameseFooter, setVietnameseFooter] = useState(
    "Những khoảnh khắc đẹp hơn sẽ được cập nhật sớm..."
  );

  useEffect(() => {
    async function loadPhotos() {
      try {
        const response = await fetch("/api/gallery");

        if (!response.ok) {
          return;
        }

        const result = await response.json();

        if (result.success) {
          setPhotos(result.photos);
        }
      } catch (error) {
        console.error("Could not load gallery photos:", error);
      }
    }

    loadPhotos();
  }, []);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();

        throw new Error(
          result.error ||
          "An unknown error occurred while uploading the photo."
        );
      }

      return response.json();
    });

    try {
      await Promise.all(uploadPromises);

      alert("Photos uploaded successfully!");

      const galleryResponse = await fetch("/api/gallery");

      if (galleryResponse.ok) {
        const galleryResult = await galleryResponse.json();

        if (galleryResult.success) {
          setPhotos(galleryResult.photos);
        }
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? `Upload failed: ${error.message}`
          : "An unknown error occurred while uploading the photos."
      );
    }

    event.target.value = "";
  }

  function handleSave() {
    alert("Gallery changes saved!");
  }

  return (
    <main className="min-h-screen bg-[#FDEFE8] px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="font-body text-sm uppercase tracking-[0.25em] text-[#916A63]">
            Noelle & Nathan
          </p>

          <h1 className="font-heading text-5xl md:text-6xl text-[#622825] mt-3">
            Edit Gallery
          </h1>

          <p className="font-body text-[#916A63] mt-4">
            Manage the content and photos displayed in your gallery.
          </p>
        </div>

        {/* ENGLISH */}
        <section className="bg-white/70 rounded-2xl p-6 md:p-8 border border-[#916A63]/20 mb-8">
          <h2 className="font-heading text-3xl text-[#622825] mb-6">
            English
          </h2>

          <div className="space-y-5">

            <div>
              <label className="font-body text-sm text-[#916A63]">
                Small Heading
              </label>

              <input
                type="text"
                value={englishIntro}
                onChange={(e) => setEnglishIntro(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#916A63]/30 bg-white font-body text-[#622825] outline-none"
              />
            </div>

            <div>
              <label className="font-body text-sm text-[#916A63]">
                Main Heading
              </label>

              <input
                type="text"
                value={englishTitle}
                onChange={(e) => setEnglishTitle(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#916A63]/30 bg-white font-body text-[#622825] outline-none"
              />
            </div>

            <div>
              <label className="font-body text-sm text-[#916A63]">
                Subtitle
              </label>

              <input
                type="text"
                value={englishSubtitle}
                onChange={(e) => setEnglishSubtitle(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#916A63]/30 bg-white font-body text-[#622825] outline-none"
              />
            </div>

            <div>
              <label className="font-body text-sm text-[#916A63]">
                Footer Message
              </label>

              <input
                type="text"
                value={englishFooter}
                onChange={(e) => setEnglishFooter(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#916A63]/30 bg-white font-body text-[#622825] outline-none"
              />
            </div>

          </div>
        </section>

        {/* VIETNAMESE */}
        <section className="bg-white/70 rounded-2xl p-6 md:p-8 border border-[#916A63]/20 mb-8">
          <h2 className="font-heading text-3xl text-[#622825] mb-6">
            Vietnamese
          </h2>

          <div className="space-y-5">

            <div>
              <label className="font-body text-sm text-[#916A63]">
                Small Heading
              </label>

              <input
                type="text"
                value={vietnameseIntro}
                onChange={(e) => setVietnameseIntro(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#916A63]/30 bg-white font-body text-[#622825] outline-none"
              />
            </div>

            <div>
              <label className="font-body text-sm text-[#916A63]">
                Main Heading
              </label>

              <input
                type="text"
                value={vietnameseTitle}
                onChange={(e) => setVietnameseTitle(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#916A63]/30 bg-white font-body text-[#622825] outline-none"
              />
            </div>

            <div>
              <label className="font-body text-sm text-[#916A63]">
                Subtitle
              </label>

              <input
                type="text"
                value={vietnameseSubtitle}
                onChange={(e) => setVietnameseSubtitle(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#916A63]/30 bg-white font-body text-[#622825] outline-none"
              />
            </div>

            <div>
              <label className="font-body text-sm text-[#916A63]">
                Footer Message
              </label>

              <input
                type="text"
                value={vietnameseFooter}
                onChange={(e) => setVietnameseFooter(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#916A63]/30 bg-white font-body text-[#622825] outline-none"
              />
            </div>

          </div>
        </section>

        {/* PHOTOS */}
        <section className="bg-white/70 rounded-2xl p-6 md:p-8 border border-[#916A63]/20 mb-8">

          <h2 className="font-heading text-3xl text-[#622825] mb-2">
            Photos
          </h2>

          <p className="font-body text-sm text-[#916A63] mb-6">
            Manage the photos displayed in your gallery.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {photos.map((photo) => (
              <div
                key={photo.pathname}
                className="aspect-[4/5] rounded-xl overflow-hidden border border-[#916A63]/20 bg-[#FDEFE8]"
              >
                <img
                  src={photo.url}
                  alt="Wedding gallery photo"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

          </div>

          {/* UPLOAD BUTTON */}
          <label className="inline-block cursor-pointer mt-6 px-6 py-3 rounded-full bg-[#622825] text-white font-body text-sm">

            Upload Photos

            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleUpload}
            />

          </label>

        </section>

        {/* SAVE */}
        <div className="text-center pb-10">

          <button
            onClick={handleSave}
            className="px-8 py-3 rounded-full bg-[#622825] text-white font-body text-sm"
          >
            Save Changes
          </button>

        </div>

      </div>
    </main>
  );
}