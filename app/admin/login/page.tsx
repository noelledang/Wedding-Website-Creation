"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleLogin() {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
        });

        if (response.ok) {
            router.push("/admin");
        } else {
            alert("Incorrect password");
        }
    }

    return (
        <main className="min-h-screen bg-[#FDEFE8] flex items-center justify-center px-6">
            <div className="w-full max-w-md bg-white/80 rounded-2xl p-8 border border-[#916A63]/20">

                <div className="text-center mb-8">
                    <p className="font-body text-sm uppercase tracking-[0.25em] text-[#916A63]">
                        Noelle & Nathan
                    </p>

                    <h1 className="font-heading text-5xl text-[#622825] mt-3">
                        Admin Login
                    </h1>

                    <p className="font-body text-sm text-[#916A63] mt-4">
                        Enter your password to manage your wedding website.
                    </p>
                </div>

                <div>
                    <label className="font-body text-sm text-[#916A63]">
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-2 px-4 py-3 rounded-xl border border-[#916A63]/30 bg-white font-body text-[#622825] outline-none"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full mt-6 px-6 py-3 rounded-full bg-[#622825] text-white font-body text-sm"
                >
                    Login
                </button>

            </div>
        </main>
    );
}