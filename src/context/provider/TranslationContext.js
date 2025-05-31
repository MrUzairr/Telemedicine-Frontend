// TranslationContext.js
import React, { createContext, useState, useContext } from 'react';
import translations from './translation.json';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value[k];
      if (value === undefined) return key; // fallback to key if not found
    }
    
    return value;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <TranslationContext.Provider value={{ t, language, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  return useContext(TranslationContext);
};







// import React, { createContext, useState, useContext } from 'react';
// import translationEN from '../../locales/en/translation.json';
// import translationUR from '../../locales/ur/translation.json';
// import translationAR from '../../locales/ar/translation.json';

// const translations = {
//   en: translationEN,
//   ur: translationUR,
//   ar: translationAR
// };

// const TranslationContext = createContext();

// export const TranslationProvider = ({ children }) => {
//   const [language, setLanguage] = useState('en');
  
//   const t = (key) => translations[language][key] || key;
  
//   const changeLanguage = (lang) => {
//     setLanguage(lang);
//     document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
//     document.documentElement.lang = lang;
//   };

//   return (
//     <TranslationContext.Provider value={{ t, language, changeLanguage }}>
//       {children}
//     </TranslationContext.Provider>
//   );
// };

// export const useTranslation = () => useContext(TranslationContext);