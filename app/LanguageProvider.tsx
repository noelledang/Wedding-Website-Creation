"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "eng" | "viet";

type LanguageContextType = {
    language: Language;
    setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export function LanguageProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [language, setLanguageState] = useState<Language>("eng");

    useEffect(() => {
        const savedLanguage = localStorage.getItem("wedding-language");

        if (savedLanguage === "eng" || savedLanguage === "viet") {
            setLanguageState(savedLanguage);
        }
    }, []);

    const setLanguage = (language: Language) => {
        setLanguageState(language);
        localStorage.setItem("wedding-language", language);
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used inside LanguageProvider");
    }

    return context;
}