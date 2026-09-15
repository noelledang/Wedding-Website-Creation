"use client";

import { useState, useEffect } from "react";

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2027-03-13T16:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            (difference % (1000 * 60 * 60)) /
            (1000 * 60)
          ),
          seconds: Math.floor(
            (difference % (1000 * 60)) / 1000
          ),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center border border-[#916A63]/40 bg-[#FDEFE8] text-[#622825] hover:text-[#D4AF37] transition"
      >
        <span className="text-2xl">
          {menuOpen ? "✕" : "☰"}
        </span>
      </button>

      {menuOpen && (
        <div className="fixed top-0 right-0 h-screen w-80 bg-[#FDEFE8] shadow-xl border-l border-[#916A63]/30 p-10 z-40">
          <nav className="flex flex-col gap-8 mt-16 font-body text-sm uppercase tracking-[0.2em]">

            <a
              href="#details"
              onClick={() => setMenuOpen(false)}
              className="text-[#622825] hover:text-[#916A63] transition"            >
              Details
            </a>

            <a
              href="#schedule"
              onClick={() => setMenuOpen(false)}
              className="text-[#622825] hover:text-[#D4AF37] transition"            >
              Schedule
            </a>

            <a
              href="#venue"
              onClick={() => setMenuOpen(false)}
              className="text-[#622825] hover:text-[#D4AF37] transition"
            >
              Venue
            </a>

            <a
              href="#rsvp"
              onClick={() => setMenuOpen(false)}
              className="hover:opacity-50 transition"
            >
              RSVP
            </a>

            <a
              href="#gallery"
              onClick={() => setMenuOpen(false)}
              className="hover:opacity-50 transition"
            >
              Gallery
            </a>
          <div className="text-center mt-4 mb-8">

              <p className="font-heading text-3xl text-[#D4AF37]">
              Happily Ever After
            </p>

  <span className="text-xl text-[#916A63]">
    ♥
  </span>

</div>
          </nav>

        </div>
      )}

      <main>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="text-center">

          <p className="font-body text-sm uppercase tracking-[0.35em] mb-3">
            Together with their families
            </p>

          <p className="font-body text-sm uppercase tracking-[0.15em] mb-6">
            We invite you to celebrate the wedding of
            </p>

            <h1 className="font-great-vibes text-7xl md:text-9xl text-[var(--color-gold-accent)]">            
              Noelle & Nathan
          </h1>

            <div className="flex items-center justify-center gap-4 mt-8">
              <span className="h-px w-16 bg-[#916A63]/50"></span>
              <span className="text-lg text-[#916A63]">♥</span>
              <span className="h-px w-16 bg-[#916A63]/50"></span>
            </div>
            <div className="mt-8">

              <p className="font-body text-sm uppercase tracking-[0.3em] text-[#622825]">
                MARCH 13, 2027
              </p>

              {/* COUNTDOWN */}
              <div className="grid grid-cols-4 gap-3 md:gap-5 max-w-lg mx-auto mt-10">

                <div className="border border-[#916A63]/30 py-5 px-2">
                  <p className="font-heading text-4xl md:text-5xl text-[var(--color-gold-accent)]">
                    {timeLeft.days}
                  </p>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                    Days
                  </p>
                </div>

                <div className="border border-[#916A63]/30 py-5 px-2">
                  <p className="font-heading text-4xl md:text-5xl text-[var(--color-gold-accent)]">
                    {timeLeft.hours}
                  </p>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                    Hours
                  </p>
                </div>

                <div className="border border-[#916A63]/30 py-5 px-2">
                  <p className="font-heading text-4xl md:text-5xl text-[var(--color-gold-accent)]">
                    {timeLeft.minutes}
                  </p>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                    Minutes
                  </p>
                </div>

                <div className="border border-[#916A63]/30 py-5 px-2">
                  <p className="font-heading text-4xl md:text-5xl text-[var(--color-gold-accent)]">
                    {timeLeft.seconds}
                  </p>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] mt-2 text-[#916A63]">
                    Seconds
                  </p>
                </div>

              </div>

              <p className="font-script text-3xl md:text-4xl mt-10 text-[#916A63]">
                Please join us as we celebrate our love
              </p>

              <div className="mt-10">
                <a
                  href="#rsvp"
                  className="inline-block border border-[#622825] text-[#622825] px-8 py-3 font-body text-xs uppercase tracking-[0.25em] hover:bg-[#622825] hover:text-[#FDEFE8] transition"
                >
                  RSVP
                </a>
              </div>

              <div className="mt-12">
                <span className="font-body text-xs uppercase tracking-[0.3em]">
                  Scroll to explore
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* WEDDING DETAILS SECTION */}
        <section id="details" className="py-28 px-6 bg-[#FDEFE8]">

          <div className="max-w-5xl mx-auto">

            {/* SECTION HEADER */}
            <div className="text-center mb-20">

              <p className="font-body text-xs uppercase tracking-[0.35em] text-[#916A63] mb-5">
                The beginning of forever
              </p>

              <h2 className="font-heading text-5xl md:text-7xl text-[#622825]">
                Our Wedding
              </h2>
  

              <p className="font-script text-4xl md:text-5xl mt-5 text-[#916A63]">
              Join us as we celebrate
              </p>

            </div>


            {/* DETAILS */}
            <div className="grid md:grid-cols-3 gap-0 border-y border-[#916A63]/30">

              {/* WHEN */}
              <div className="text-center px-8 py-12 md:border-r border-[#916A63]/30">

                <p className="font-body text-xs uppercase tracking-[0.3em] text-[var(--color-gold-accent)] mb-5">
                  When
                </p>

                <h3 className="font-heading text-4xl text-[#622825]">
                The Date
                </h3>

                <div className="w-8 h-px bg-[#916A63]/50 mx-auto my-6"></div>

                <p className="font-body text-sm tracking-[0.2em] text-[#622825]">
                  March 13, 2027
                </p>

              </div>


              {/* WHERE */}
              <div className="text-center px-8 py-12 md:border-r border-[#916A63]/30">

                <p className="font-body text-xs uppercase tracking-[0.3em] text-[var(--color-gold-accent)] mb-5">
                  Where
                </p>

                <h3 className="font-heading text-4xl text-[#622825]">
                The Venue
                </h3>

                <div className="w-8 h-px bg-[#916A63]/50 mx-auto my-6"></div>
                
                <p className="font-body text-sm leading-7 text-[#622825]">
                  The Ocean Villas Resort
                  <br />
                  Da Nang, Viet Nam
                </p>

              </div>


              {/* ATTIRE */}
              <div className="text-center px-8 py-12">

                <p className="font-body text-xs uppercase tracking-[0.3em] text-[var(--color-gold-accent)] mb-5">
                  Attire
                </p>

                <h3 className="font-heading text-4xl text-[#622825]">
                Dress Code
                </h3>

                <div className="w-8 h-px bg-[#916A63]/50 mx-auto my-6"></div>

                <p className="font-body text-sm leading-7">
                  Formal / Garden Elegant
                  <br />
                  No white, jeans, shorts, or sneakers
                </p>

              </div>

            </div>

          </div>

        </section>
    
        {/* WEDDING DAY SCHEDULE */}
        <section id="schedule" className="py-28 px-6">

          <div className="max-w-4xl mx-auto">

            {/* SECTION HEADER */}
            <div className="text-center mb-20">

              <p className="font-body text-xs uppercase tracking-[0.35em] text-[#916A63] mb-5">
                The day we've been waiting for
              </p>

              <h2 className="font-heading text-5xl md:text-7xl text-[#622825]">
            Wedding Day
              </h2>

              <p className="font-script text-4xl md:text-5xl mt-5 text-[#916A63]">
          A day to remember
              </p>

            </div>


            {/* TIMELINE */}
            <div className="relative">

              {/* VERTICAL LINE */}
              <div className="absolute left-[7px] md:left-[150px] top-2 bottom-2 w-px bg-[#916A63]/40"></div>

              <div className="space-y-14">


                {/* GUEST ARRIVAL */}
                <div className="relative flex items-start gap-8 md:gap-12">

                  <div className="w-4 md:w-32 shrink-0 md:text-right">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
                  3:30 PM
                    </p>
                  </div>

                  <div className="relative z-10 mt-1 w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] shrink-0 flex items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">♥</span>                  </div>

                  <div className="pt-0">
                    <h3 className="font-heading text-3xl md:text-4xl">
                      Guest Arrival
                    </h3>

                    <p className="font-body text-sm mt-2 text-[#916A63]">
                      Check in, grab a drink & find your seat
                    </p>
                  </div>

                </div>


                {/* CEREMONY */}
                <div className="relative flex items-start gap-8 md:gap-12">

                  <div className="w-4 md:w-32 shrink-0 md:text-right">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
                4:00 PM
                    </p>
                  </div>

                  <div className="relative z-10 mt-1 w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] shrink-0 flex items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">♥</span>
                  </div>

                  <div>
                    <h3 className="font-heading text-3xl md:text-4xl">
                      Ceremony
                    </h3>

                    <p className="font-body text-sm mt-2 text-[#916A63]">
                      Join us as we say &quot;I do&quot;
                    </p>
                  </div>

                </div>


                {/* COCKTAIL HOUR */}
                <div className="relative flex items-start gap-8 md:gap-12">

                  <div className="w-4 md:w-32 shrink-0 md:text-right">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
                5:00 PM
                    </p>
                  </div>

                  <div className="relative z-10 mt-1 w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] shrink-0 flex items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">♥</span>
                  </div>

                  <div>
                    <h3 className="font-heading text-3xl md:text-4xl">
                      Cocktail Hour
                    </h3>

                    <p className="font-body text-sm mt-2 text-[#916A63]">
                      Mingle, sip & celebrate
                    </p>
                  </div>

                </div>


                {/* RECEPTION */}
                <div className="relative flex items-start gap-8 md:gap-12">

                  <div className="w-4 md:w-32 shrink-0 md:text-right">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
                      6:00 PM
                    </p>
                  </div>

                  <div className="relative z-10 mt-1 w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] shrink-0 flex items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">♥</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl md:text-4xl">
                      Reception
                    </h3>

                    <p className="font-body text-sm mt-2 text-[#916A63]">
                      Dinner, dancing & good vibes
                    </p>
                  </div>

                </div>


                {/* FIRST DANCE */}
                <div className="relative flex items-start gap-8 md:gap-12">

                  <div className="w-4 md:w-32 shrink-0 md:text-right">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
                  8:00 PM
                    </p>
                  </div>

                  <div className="relative z-10 mt-1 w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] shrink-0 flex items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">♥</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl md:text-4xl">
                      First Dance
                    </h3>

                    <p className="font-body text-sm mt-2 text-[#916A63]">
                      A special moment for the newlyweds
                    </p>
                  </div>

                </div>


                {/* SEND OFF */}
                <div className="relative flex items-start gap-8 md:gap-12">

                  <div className="w-4 md:w-32 shrink-0 md:text-right">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-gold-accent)]">
                      9:30 PM
                    </p>
                  </div>

                  <div className="relative z-10 mt-1 w-7 h-7 rounded-full border border-[#916A63] bg-[#FDEFE8] shrink-0 flex items-center justify-center">
                    <span className="text-[16px] leading-none text-[#916A63]">♥</span>                  </div>
                  <div>
                    <h3 className="font-heading text-3xl md:text-4xl">
                      Bride & Groom Send Off
                    </h3>

                    <p className="font-body text-sm mt-2 text-[#916A63]">
                      Send us off in style!
                    </p>
                  </div>

                </div>


              </div>

            </div>

          </div>

        </section>
  

        {/* VENUE SECTION */}
        <section id="venue" className="py-28 px-6 bg-[#FDEFE8]">

          <div className="max-w-5xl mx-auto text-center">

            {/* SECTION HEADER */}
            <div className="mb-16">

              <p className="font-body text-xs uppercase tracking-[0.35em] text-[#916A63] mb-5">
                Where we will celebrate
              </p>

              <h2 className="font-heading text-5xl md:text-7xl text-[#622825]">
                The Venue
              </h2>

              <p className="font-script text-4xl md:text-5xl mt-5 text-[#916A63]">
                Where We Say I Do
              </p>

            </div>


            {/* VENUE CARD */}
            <div className="border-y border-[#916A63]/30 py-14">

              <span className="font-heading text-2xl text-[var(--color-gold-accent)]">
                ♥
              </span>

              <h3 className="font-heading text-4xl md:text-5xl text-[#622825]">
                The Ocean Villas Resort
              </h3>

              <p className="font-body text-xs uppercase tracking-[0.3em] mt-5 text-[#916A63]">
                Da Nang, Viet Nam
              </p>

              <p className="font-body text-sm leading-7 max-w-xl mx-auto mt-8 text-[#622825]">
                A beautiful seaside setting where we will gather
                with our favorite people to celebrate this special day.
              </p>

              <div className="mt-10">

                <a
                  href="https://www.google.com/maps/search/?api=1&query=The+Ocean+Villas+Resort+Da+Nang+Vietnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-[#622825] text-[#622825] px-10 py-4 font-body text-xs uppercase tracking-[0.3em] hover:bg-[#622825] hover:text-[#FDEFE8] transition"                >
                  View Directions
                </a>

              </div>

            </div>

          </div>

        </section>
  

        {/* RSVP SECTION */}
        <section id="rsvp" className="py-28 px-6">

          <div className="max-w-3xl mx-auto text-center">

            {/* DECORATIVE HEART */}
            <div className="mb-8">
              <span className="font-heading text-3xl text-[var(--color-gold-accent)]">
                ♥
              </span>
            </div>


            {/* SECTION HEADER */}
            <p className="font-body text-xs uppercase tracking-[0.35em] text-[#916A63] mb-5">
              We hope you can join us
            </p>

            <h2 className="font-heading text-5xl md:text-7xl text-[#622825]">
              RSVP
            </h2>

            <p className="font-script text-4xl md:text-5xl mt-5 text-[#916A63]">
              Celebrate with us
            </p>


            {/* MESSAGE */}
            <p className="font-body text-sm leading-7 max-w-xl mx-auto mt-10 text-[#916A63]">
              Your presence would mean so much to us.
              <br />
              Please let us know if you'll be joining us
              <br />
              for our special day.
            </p>


            {/* RSVP BUTTON */}
            <div className="mt-10">

              <a
                href="https://forms.gle/acJ9i9A2xHR5p3yP8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-[#622825] text-[#622825] px-10 py-4 font-body text-xs uppercase tracking-[0.3em] hover:bg-[#622825] hover:text-[#FDEFE8] transition"
              >
                RSVP Now
              </a>

            </div>


            <p className="font-body text-xs mt-7 tracking-[0.2em] text-[#916A63]">
              Formal invitation to follow
            </p>

          </div>

        </section>
    


        {/* PHOTO GALLERY SECTION */}
        <section id="gallery" className="py-28 px-6 bg-[#FDEFE8]">

          <div className="max-w-6xl mx-auto">

            {/* SECTION HEADER */}
            <div className="text-center mb-20">

              <p className="font-body text-xs uppercase tracking-[0.35em] text-[#916A63] mb-5">
                A little glimpse of our love
              </p>

              <h2 className="font-heading text-5xl md:text-7xl text-[#622825]">
                Our Memories
              </h2>

              <p className="font-script text-4xl md:text-5xl mt-5 text-[#916A63]">
                Moments worth remembering
              </p>

            </div>


            {/* PHOTO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* PHOTO 1 */}
              <div className="aspect-[4/5] bg-white border border-[#916A63]/20 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center transition duration-500 group-hover:scale-[1.02]">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63]">
                    Photo coming soon
                  </p>
                </div>
              </div>

              {/* PHOTO 2 */}
              <div className="aspect-[4/5] bg-white border border-[#916A63]/20 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center transition duration-500 group-hover:scale-[1.02]">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63]">
                    Photo coming soon
                  </p>
                </div>
              </div>

              {/* PHOTO 3 */}
              <div className="aspect-[4/5] bg-white border border-[#916A63]/20 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center transition duration-500 group-hover:scale-[1.02]">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63]">
                    Photo coming soon
                  </p>
                </div>
              </div>

              {/* PHOTO 4 */}
              <div className="aspect-[4/5] bg-white border border-[#916A63]/20 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center transition duration-500 group-hover:scale-[1.02]">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63]">
                    Photo coming soon
                  </p>
                </div>
              </div>

              {/* PHOTO 5 */}
              <div className="aspect-[4/5] bg-white border border-[#916A63]/20 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center transition duration-500 group-hover:scale-[1.02]">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63]">
                    Photo coming soon
                  </p>
                </div>
              </div>

              {/* PHOTO 6 */}
              <div className="aspect-[4/5] bg-white border border-[#916A63]/20 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center transition duration-500 group-hover:scale-[1.02]">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-[#916A63]">
                    Photo coming soon
                  </p>
                </div>
              </div>

            </div>

            <div className="text-center mt-16">
              <span className="font-heading text-2xl text-[#916A63]">
                ♥
              </span>

              <p className="font-script text-3xl mt-3 text-[#916A63]">
                More memories to come
              </p>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-28 px-6 bg-[#FDEFE8]">
          <div className="max-w-4xl mx-auto">

            <h2 className="font-heading text-5xl md:text-7xl text-[var(--color-gold-accent)]">
                Frequently Asked Questions
              </h2>

              <p className="font-script text-3xl mt-4 text-[#916A63]">
                A few helpful details
              </p>
            </div>

            <div className="space-y-8">

              <div className="border-b border-[#916A63]/20 pb-6">
                <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-gold-accent)]">
                  What should I wear?
                </h3>
                <p className="font-body text-sm leading-7 mt-3 text-[#622825]">
                  Our dress code is Formal / Garden Elegant. 
                  <br  />
                Please no white, jeans, shorts, or sneakers.
                <br />
                <span className="text-[var(--color-gold-accent)]">Ladies:</span>{" "}
                No white or cream dresses, and please avoid wearing anything that could be mistaken for a wedding dress.
                <br />
                <span className="text-[var(--color-gold-accent)]">Gentlemen:</span>{" "}
                A suit or dress pants with a button-up shirt is appropriate. Feeling fancy? Add a tie or bowtie for a polished look.
                <br />
                If you are unsure about what to wear, you are welcome to reach out to us directly for guidance.
                </p>
              </div>

              <div className="border-b border-[#916A63]/20 pb-6">
                <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-gold-accent)]">
                  Can I bring my children?
                </h3>
                <p className="font-body text-sm leading-7 mt-3 text-[#622825]">
                  While we love your little ones, we have decided to make our wedding an adult-only celebration. Only family members and friends who have been specifically invited to bring children are welcome to do so.
                  <br />
                  If there are any questions or concerns, please reach out to us directly.
                </p>
              </div>

              <div className="border-b border-[#916A63]/20 pb-6">
                <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-gold-accent)]">
                  What time should I arrive?
                </h3>
                <p className="font-body text-sm leading-7 mt-3 text-[#622825]">
                  Guest arrival begins at 3:30 PM, with the ceremony beginning at 4:00 PM. 
                  <br />
                  Late arrivals will not be permitted to enter the ceremony once it has started, so please plan to arrive on time.
                </p>
              </div>

              <div className="border-b border-[#916A63]/20 pb-6">
              <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-gold-accent)]">
                  Why is there a Vow Ceremony and a Reception?
                </h3>
                <p className="font-body text-sm leading-7 mt-3 text-[#622825]">
                  The ceremony is a traditional wedding service reserved for family as the bride and groom declare their vows.
                  <br />
                  The reception is a celebration where guests can socialize, dance, and enjoy a meal.
                  <br />
                  Your invitation will specify which events you are invited to attend. 
                  <br />
                  If you have any questions, please reach out to us directly.
                </p>
              </div>

              <div className="border-b border-[#916A63]/20 pb-6">
              <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-gold-accent)]">
                  Can I bring a plus-one?
                </h3>
                <p className="font-body text-sm leading-7 mt-3 text-[#622825]">
                  Only spouses are invited to attend. If you have a significant other, please reach out to us directly to discuss your invitation.
                </p>
              </div>

            </div>

        </section>
    
        {/* FOOTER */}
        <footer className="bg-[#FDEFE8] border-t border-[#916A63]/20 py-20 px-6">

          <div className="max-w-4xl mx-auto text-center">

            {/* DECORATIVE HEART */}
            <div className="mb-8">
              <span className="font-heading text-3xl text-[var(--color-gold-accent)]">
                ♥
              </span>
            </div>

            {/* THANK YOU MESSAGE */}
            <h2 className="font-heading text-5xl md:text-7xl text-[#622825]">
              Thank you for celebrating with us!
            </h2>

            {/* DATE */}
            <p className="font-body text-xs uppercase tracking-[0.35em] mt-6 text-[#916A63]">
              March 13, 2027
            </p>

            {/* CLOSING MESSAGE */}
            <p className="font-script text-4xl md:text-5xl mt-10 text-[var(--color-gold-accent)]">
              With love, Noelle & Nathan
            </p>

          </div>

        </footer>

      </main>

    </>
  );
}