"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageProvider";

type Wish = { name: string; message: string };
const DEMO_WISHES: Wish[] = [
  { name: "Linh & Chris", message: "Wishing you both a lifetime of happiness!" },
  { name: "Mai & Huy", message: "Chúc hai bạn trăm năm hạnh phúc!" },
  { name: "Anna", message: "May your love grow stronger every day!" },
];

export default function WeddingWishesMarquee() {
  const { language } = useLanguage();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/wedding-wishes", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Wishes unavailable");
        return response.json();
      })
      .then((data: { wishes?: Wish[]; demo?: boolean }) => {
        if (!active) return;
        setWishes(Array.isArray(data.wishes) ? data.wishes : []);
        setIsDemo(data.demo === true);
      })
      .catch(() => { if (active) setWishes([]); });
    return () => { active = false; };
  }, []);

  if (wishes.length === 0) return null;
  const displayWishes = wishes.length === 1 ? [...wishes, ...wishes, ...wishes] : wishes.length === 2 ? [...wishes, ...wishes] : wishes;
  return (
    <section aria-label={language === "viet" ? "Lời chúc từ người thân" : "Wishes from our loved ones"} className="py-12 overflow-hidden">
      <h2 className="font-heading text-3xl md:text-4xl text-center text-[#865467] mb-2">
        ♡ {language === "viet" ? "Lời Chúc Từ Người Thân" : "Wishes From Our Loved Ones"} ♡
      </h2>
      <p className="text-center text-sm text-[#997982] mb-7">
        {language === "viet" ? "Yêu thương từ gia đình và bạn bè" : "A little love from our family and friends"}
      </p>
      {isDemo && <p className="text-center text-xs text-[#865467] mb-4">Preview sample messages · Tin nhắn mẫu</p>}
      <div className="w-full overflow-x-auto md:overflow-hidden group" tabIndex={0} aria-label="Wedding wishes, pause on hover or focus">
        <div className="flex w-max gap-3 animate-[weddingWishesScroll_35s_linear_infinite] group-hover:[animation-play-state:paused] group-focus:[animation-play-state:paused] motion-reduce:animate-none">
          {[...displayWishes, ...displayWishes].map((wish, index) => (
            <div key={index} aria-hidden={index >= displayWishes.length} className="w-[230px] md:w-[270px] shrink-0 min-h-32 rounded-xl border border-[#D8B89A] bg-[#FFF9F6]/95 px-5 py-5 text-center shadow-sm">
              <p className="font-heading text-xl text-[#864C62] mb-2">{wish.name} ♡</p>
              <p className="font-heading italic text-base text-[#785D65] leading-relaxed break-words">{wish.message}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`@keyframes weddingWishesScroll { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
