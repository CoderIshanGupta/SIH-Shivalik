import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi" | "pa";

type TranslationKey =
  | "appName" | "tagline" | "start" | "from" | "to"
  | "selectStop" | "selectStops" | "find" | "routesAvailable"
  | "noData" | "offline" | "loading" | "lastUpdated"
  | "searchRoutes" | "assistant" | "aiAssistant" | "pressToSpeak"
  // stops
  | "ludhiana" | "jalandhar" | "phagwara"
  | "amritsar" | "tarnTaran" | "patti"
  | "patiala" | "rajpura" | "zirakpur"
  | "bathinda" | "mansa" | "barnala"
  | "hoshiarpur"
  // offline special keys
  | "ludhianaBusStand" | "amritsarGoldenGate" | "patialaSheranWalaGate";

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    appName: "BusEase",
    tagline: "Your smart bus travel companion",
    start: "Start",
    from: "From",
    to: "To",
    selectStop: "Select Stop",
    selectStops: "Please select both stops",
    find: "Find",
    routesAvailable: "Routes Available",
    noData: "No data found",
    offline: "Offline Routes",
    loading: "Loading...",
    lastUpdated: "Last Updated",
    searchRoutes: "Search Routes",
    assistant: "Assistant",
    aiAssistant: "AI Assistant",
    pressToSpeak: "Press to Speak",
    ludhiana: "Ludhiana",
    jalandhar: "Jalandhar",
    phagwara: "Phagwara",
    amritsar: "Amritsar",
    tarnTaran: "Tarn Taran",
    patti: "Patti",
    patiala: "Patiala",
    rajpura: "Rajpura",
    zirakpur: "Zirakpur",
    bathinda: "Bathinda",
    mansa: "Mansa",
    barnala: "Barnala",
    hoshiarpur: "Hoshiarpur",
    ludhianaBusStand: "Ludhiana Bus Stand",
    amritsarGoldenGate: "Amritsar Golden Gate",
    patialaSheranWalaGate: "Patiala Sheran Wala Gate",
  },
  hi: {
    appName: "बसईज़",
    tagline: "आपकी स्मार्ट बस यात्रा सहायक",
    start: "शुरू करें",
    from: "से",
    to: "तक",
    selectStop: "स्टॉप चुनें",
    selectStops: "कृपया दोनों स्टॉप चुनें",
    find: "खोजें",
    routesAvailable: "उपलब्ध मार्ग",
    noData: "कोई डेटा नहीं मिला",
    offline: "ऑफ़लाइन मार्ग",
    loading: "लोड हो रहा है...",
    lastUpdated: "अंतिम अपडेट",
    searchRoutes: "मार्ग खोजें",
    assistant: "सहायक",
    aiAssistant: "एआई सहायक",
    pressToSpeak: "बोलने के लिए दबाएँ",
    ludhiana: "लुधियाना",
    jalandhar: "जालंधर",
    phagwara: "फगवाड़ा",
    amritsar: "अमृतसर",
    tarnTaran: "तरण तारन",
    patti: "पट्टी",
    patiala: "पटियाला",
    rajpura: "राजपुरा",
    zirakpur: "ज़ीरकपुर",
    bathinda: "बठिंडा",
    mansa: "मानसा",
    barnala: "बरनाला",
    hoshiarpur: "होशियारपुर",
    ludhianaBusStand: "लुधियाना बस स्टैंड",
    amritsarGoldenGate: "अमृतसर गोल्डन गेट",
    patialaSheranWalaGate: "पटियाला शेरां वाला गेट",
  },
  pa: {
    appName: "ਬਸਈਜ਼",
    tagline: "ਤੁਹਾਡਾ ਸਮਾਰਟ ਬਸ ਯਾਤਰਾ ਸਾਥੀ",
    start: "ਸ਼ੁਰੂ ਕਰੋ",
    from: "ਤੋਂ",
    to: "ਵੱਲ",
    selectStop: "ਸਟਾਪ ਚੁਣੋ",
    selectStops: "ਕਿਰਪਾ ਕਰਕੇ ਦੋਵੇਂ ਸਟਾਪ ਚੁਣੋ",
    find: "ਖੋਜੋ",
    routesAvailable: "ਉਪਲਬਧ ਰੂਟ",
    noData: "ਕੋਈ ਡੇਟਾ ਨਹੀਂ ਮਿਲਿਆ",
    offline: "ਆਫਲਾਈਨ ਰੂਟ",
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    lastUpdated: "ਅਖੀਰਲਾ ਅਪਡੇਟ",
    searchRoutes: "ਰੂਟ ਖੋਜੋ",
    assistant: "ਸਹਾਇਕ",
    aiAssistant: "ਏਆਈ ਸਹਾਇਕ",
    pressToSpeak: "ਗੱਲ ਕਰਨ ਲਈ ਦਬਾਓ",
    ludhiana: "ਲੁਧਿਆਣਾ",
    jalandhar: "ਜਲੰਧਰ",
    phagwara: "ਫਗਵਾੜਾ",
    amritsar: "ਅੰਮ੍ਰਿਤਸਰ",
    tarnTaran: "ਤਰਨ ਤਾਰਨ",
    patti: "ਪੱਟੀ",
    patiala: "ਪਟਿਆਲਾ",
    rajpura: "ਰਾਜਪੁਰਾ",
    zirakpur: "ਜ਼ੀਰਕਪੁਰ",
    bathinda: "ਬਠਿੰਡਾ",
    mansa: "ਮਾਨਸਾ",
    barnala: "ਬਰਨਾਲਾ",
    hoshiarpur: "ਹੋਸ਼ਿਆਰਪੁਰ",
    ludhianaBusStand: "ਲੁਧਿਆਣਾ ਬਸ ਸਟੈਂਡ",
    amritsarGoldenGate: "ਅੰਮ੍ਰਿਤਸਰ ਗੋਲਡਨ ਗੇਟ",
    patialaSheranWalaGate: "ਪਟਿਆਲਾ ਸ਼ੇਰਾਂ ਵਾਲਾ ਗੇਟ",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: TranslationKey) => translations[language][key];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);