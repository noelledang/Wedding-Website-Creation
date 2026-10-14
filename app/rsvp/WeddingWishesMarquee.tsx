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
  const [status, setStatus] = useState("loading");
  const [paused, setPaused] = useState(false);

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
        setStatus(typeof (data as { status?: string }).status === "string" ? (data as { status: string }).status : "ready");
      })
      .catch(() => { if (active) { setWishes([]); setStatus("feed_unavailable"); } });
    return () => { active = false; };
  }, []);

  if (wishes.length === 0) return (
    <section className="py-12 text-center" aria-label="Wedding wishes">
      <h2 className="font-heading text-3xl md:text-4xl text-[#865467] mb-3">♡ {language === "viet" ? "Lời Chúc Từ Người Thân" : "Wishes From Our Loved Ones"} ♡</h2>
      <p className="text-sm text-[#997982]">{status === "loading" ? "Loading wedding wishes…" : status === "no_approved_messages" ? "No approved wishes are available yet." : "Wedding wishes are temporarily unavailable in Preview."}</p>
    </section>
  );
  const displayWishes = wishes.length === 1 ? [...wishes, ...wishes, ...wishes] : wishes.length === 2 ? [...wishes, ...wishes] : wishes;
  return (
    <section aria-label={language === "viet" ? "Lời chúc từ người thân" : "Wishes from our loved ones"} className="relative overflow-hidden bg-transparent pt-5 pb-14">
      <div className="mx-auto mb-7 flex max-w-[220px] items-center justify-center gap-3 text-[#B88A70]/80" aria-hidden="true"><span className="h-px flex-1 bg-[#B88A70]/45" /><span className="text-lg">❀</span><span className="h-px flex-1 bg-[#B88A70]/45" /></div>
      <h2 className="font-heading text-[1.65rem] md:text-4xl text-center text-[#773F45] mb-2 px-4">
        ♡ {language === "viet" ? "Lời Chúc Từ Người Thân" : "Wishes From Our Loved Ones"} ♡
      </h2>
      <p className="text-center text-xs md:text-sm text-[#885F5D] mb-8 px-5">
        {language === "viet" ? "Yêu thương từ gia đình và bạn bè" : "A little love from our family and friends"}
      </p>
      {isDemo && <p className="text-center text-xs text-[#865467] mb-4">Preview sample messages · Tin nhắn mẫu</p>}
      <div className="w-full">
        <div className="mb-3 flex justify-end px-4">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          aria-label={paused ? (language === "viet" ? "Tiếp tục chạy lời chúc" : "Resume wedding wishes") : (language === "viet" ? "Tạm dừng lời chúc" : "Pause wedding wishes")}
          title={paused ? (language === "viet" ? "Tiếp tục" : "Resume") : (language === "viet" ? "Tạm dừng" : "Pause")}
          className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#CFAF99]/70 bg-[#FFF5EE]/90 text-[#773F45] shadow-sm backdrop-blur-sm transition hover:bg-[#FFF5EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#773F45]"
        >
          <span aria-hidden="true" className="text-sm">{paused ? "▶" : "Ⅱ"}</span>
        </button>
        </div>
        <div className="w-full overflow-hidden group" tabIndex={0} aria-label="Wedding wishes, pause on hover or focus">
        <div className="flex w-max min-w-max gap-4 animate-[weddingWishesScroll_35s_linear_infinite] group-hover:[animation-play-state:paused] group-focus:[animation-play-state:paused] motion-reduce:animate-none" style={{ animationPlayState: paused ? "paused" : undefined }}>
          {[...displayWishes, ...displayWishes].map((wish, index) => (
            <div key={index} aria-hidden={index >= displayWishes.length} className="w-[218px] md:w-[270px] shrink-0 min-h-36 rounded-xl border border-[#CFAF99]/45 bg-[#FFF5EE]/40 backdrop-blur-[2px] px-4 py-5 text-center shadow-[0_3px_12px_rgba(100,55,65,0.035)]">
              <p className="font-heading text-lg text-[#773F45] mb-2">{wish.name} ♡</p>
              <p className="font-heading italic text-sm md:text-base text-[#785653] leading-relaxed break-words">{wish.message}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
      <style jsx global>{`@keyframes weddingWishesScroll { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
