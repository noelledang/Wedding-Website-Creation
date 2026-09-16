export default function AdminPage() {
    return (
        <main className="min-h-screen bg-[#FDEFE8] px-6 py-16">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-14">
                    <p className="font-body text-sm uppercase tracking-[0.25em] text-[#916A63]">
                        Noelle & Nathan
                    </p>

                    <h1 className="font-heading text-5xl md:text-6xl text-[#622825] mt-3">
                        Admin Dashboard
                    </h1>

                    <p className="font-body text-[#916A63] mt-4">
                        Manage your wedding website.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="bg-white/70 rounded-2xl p-6 border border-[#916A63]/20">
                        <h2 className="font-heading text-3xl text-[#622825]">
                            Home
                        </h2>
                        <button className="mt-5 px-5 py-2 rounded-full bg-[#622825] text-white font-body text-sm">
                            Edit
                        </button>
                    </div>

                    <div className="bg-white/70 rounded-2xl p-6 border border-[#916A63]/20">
                        <h2 className="font-heading text-3xl text-[#622825]">
                            Our Story
                        </h2>
                        <button className="mt-5 px-5 py-2 rounded-full bg-[#622825] text-white font-body text-sm">
                            Edit
                        </button>
                    </div>

                    <div className="bg-white/70 rounded-2xl p-6 border border-[#916A63]/20">
                        <h2 className="font-heading text-3xl text-[#622825]">
                            Wedding Day
                        </h2>
                        <button className="mt-5 px-5 py-2 rounded-full bg-[#622825] text-white font-body text-sm">
                            Edit
                        </button>
                    </div>

                    <div className="bg-white/70 rounded-2xl p-6 border border-[#916A63]/20">
                        <h2 className="font-heading text-3xl text-[#622825]">
                            Venue
                        </h2>
                        <button className="mt-5 px-5 py-2 rounded-full bg-[#622825] text-white font-body text-sm">
                            Edit
                        </button>
                    </div>

                    <div className="bg-white/70 rounded-2xl p-6 border border-[#916A63]/20">
                        <h2 className="font-heading text-3xl text-[#622825]">
                            Travel
                        </h2>
                        <button className="mt-5 px-5 py-2 rounded-full bg-[#622825] text-white font-body text-sm">
                            Edit
                        </button>
                    </div>

                    <div className="bg-white/70 rounded-2xl p-6 border border-[#916A63]/20">
                        <h2 className="font-heading text-3xl text-[#622825]">
                            RSVP
                        </h2>
                        <button className="mt-5 px-5 py-2 rounded-full bg-[#622825] text-white font-body text-sm">
                            Edit
                        </button>
                    </div>

                    <div className="bg-white/70 rounded-2xl p-6 border border-[#916A63]/20">
                        <h2 className="font-heading text-3xl text-[#622825]">
                            Gallery
                        </h2>

                        <div className="flex gap-3 mt-5">
                            <a
                                href="/admin/gallery"
                                className="px-5 py-2 rounded-full bg-[#622825] text-white font-body text-sm"
                            >
                                Edit Gallery
                            </a>

                            <a
                                href="/admin/gallery"
                                className="px-5 py-2 rounded-full border border-[#622825] text-[#622825] font-body text-sm"
                            >
                                Upload Photos
                            </a>
                        </div>
                    </div>

                    <div className="bg-white/70 rounded-2xl p-6 border border-[#916A63]/20">
                        <h2 className="font-heading text-3xl text-[#622825]">
                            Music
                        </h2>
                        <button className="mt-5 px-5 py-2 rounded-full bg-[#622825] text-white font-body text-sm">
                            Edit
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
  }