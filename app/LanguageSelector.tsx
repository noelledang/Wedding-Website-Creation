"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function LanguageSelector() {
  const [showSelector, setShowSelector] = useState(false);
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("wedding-language");

    if (savedLanguage === "eng" || savedLanguage === "viet") {
      setLanguage(savedLanguage);
      setShowSelector(false);
    } else {
      setShowSelector(true);
    }
  }, [setLanguage]);

  const selectLanguage = (language: "eng" | "viet") => {
    setLanguage(language);
    localStorage.setItem("wedding-language", language);
    setShowSelector(false);
  };

  if (!showSelector) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f8f1ed]/95 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white px-8 py-12 text-center shadow-xl">

        <p className="mb-3 font-body text-sm uppercase tracking-[0.25em] text-[#8c756b]">
          Noelle & Nathan
        </p>

        <h1 className="font-heading text-4xl text-[#5f4a42]">
          Welcome to our wedding
        </h1>

        <p className="mt-4 font-body text-sm text-[#8c756b]">
          Please select your language
        </p>

        <div className="mt-8 flex flex-col gap-4">

          <button
            onClick={() => selectLanguage("eng")}
            className="rounded-full border border-[#c9a99d] px-6 py-3 font-body text-sm tracking-wide text-[#5f4a42] transition hover:bg-[#f8f1ed]"
          >
            ENG
          </button>

          <button
            onClick={() => selectLanguage("viet")}
            className="rounded-full border border-[#c9a99d] px-6 py-3 font-body text-sm tracking-wide text-[#5f4a42] transition hover:bg-[#f8f1ed]"
          >
            VIET
          </button>

        </div>
      </div>
    </div>
  );
}