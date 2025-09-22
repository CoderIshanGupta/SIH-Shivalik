// src/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type Languages = "en" | "hi" | "pa";

type LanguageContextType = {
  language: Languages;
  setLanguage: (lang: Languages) => void;
  t: (key: string) => string;
};

const translations: Record<Languages, Record<string, string>> = {
  en: {
    appName: "BusEase",
    tagline: "Track buses in real time and never miss your ride again!",
    start: "Click to Start",
    home: "Home",
    assistant: "AI Assistant",
    offline: "Offline Routes",
    find: "Find",
    selectStops: "Select Stops",
    routesAvailable: "Routes Available",
    lastUpdated: "Last Updated",
    loading: "Updating…",
    noData: "No data",
    searchRoutes: "Search routes",
    from: "From",
    to: "To",
    selectStop: "Select Stop",
  },
  hi: {
    appName: "बसEase",
    tagline: "बसों को रियल टाइम में ट्रैक करें और कभी भी अपनी सवारी न चूकें!",
    start: "क्लिक करके शुरू करें",
    home: "होम",
    assistant: "एआई सहायक",
    offline: "ऑफ़लाइन मार्ग",
    find: "खोजें",
    selectStops: "स्टॉप चुनें",
    routesAvailable: "उपलब्ध मार्ग",
    lastUpdated: "अंतिम अपडेट",
    loading: "अपडेट हो रहा है…",
    noData: "कोई डेटा नहीं",
    searchRoutes: "रूट खोजें",
    from: "से",
    to: "तक",
    selectStop: "स्टॉप चुनें",
  },
  pa: {
    appName: "ਬੱਸEase",
    tagline: "ਬੱਸਾਂ ਨੂੰ ਰੀਅਲ ਟਾਈਮ ਵਿੱਚ ਟ੍ਰੈਕ ਕਰੋ ਅਤੇ ਆਪਣੀ ਸਵਾਰੀ ਕਦੇ ਨਾ ਗੁਆਓ!",
    start: "ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ",
    home: "ਘਰ",
    assistant: "ਏਆਈ ਸਹਾਇਕ",
    offline: "ਆਫਲਾਈਨ ਰਾਹ",
    find: "ਲੱਭੋ",
    selectStops: "ਸਟਾਪ ਚੁਣੋ",
    routesAvailable: "ਉਪਲਬਧ ਰਾਹ",
    lastUpdated: "ਆਖਰੀ ਅਪਡੇਟ",
    loading: "ਅਪਡੇਟ ਹੋ ਰਿਹਾ ਹੈ…",
    noData: "ਕੋਈ ਡਾਟਾ ਨਹੀਂ",
    searchRoutes: "ਰੂਟ ਖੋਜੋ",
    from: "ਤੋਂ",
    to: "ਤੱਕ",
    selectStop: "ਸਟਾਪ ਚੁਣੋ",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: key => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Languages>("en");

  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);