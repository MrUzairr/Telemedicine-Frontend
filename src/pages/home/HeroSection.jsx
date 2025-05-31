import React from 'react';
import { useTranslation } from '../../context/provider/TranslationContext';

const HeroSection = () => {
  const { t, language } = useTranslation();

  return (
    <div className={`home-body ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <h2 className="home-body-top-content">
        {t("hero.baseText")}
        <a href="#" style={{ color: "#17AF2D" }}>{t("hero.mentalHealth")}</a>. {t("hero.forWord")}{" "}
        <a href="#" style={{ color: "#008CAF" }}>{t("hero.clinicians")}</a>. {t("hero.forWord")}{" "}
        <a href="#" style={{ color: "#6240E8" }}>{t("hero.hospitals")}</a>
        {t("hero.ending")}
      </h2>
    </div>
  );
};

export default HeroSection;







// import React from 'react';
// import { useTranslation } from '../../context/provider/TranslationContext'; // adjust path if needed

// const HeroSection = () => {
//   const { t, language } = useTranslation();

//   console.log(`${t("mentalHealth")}`)
//   return (
//     <div className={`home-body ${language === 'ar' ? 'rtl' : 'ltr'}`}>
//       <h2 className="home-body-top-content">
//         {t("hero.baseText")}
//         <a href="#" style={{ color: "#17AF2D" }}>{t("hero.mentalHealth")}</a>. {t("hero.forWord")}{" "}
//         <a href="#" style={{ color: "#008CAF" }}>{t("hero.clinicians")}</a>. {t("hero.forWord")}{" "}
//         <a href="#" style={{ color: "#6240E8" }}>{t("hero.hospitals")}</a>
//         {t("hero.ending")}
//       </h2>
//     </div>
//   );
// };

// export default HeroSection;



// const HeroSection = () => (
//     <div className="home-body">
//       <h2 className="home-body-top-content">
//         For your physical health. For your{" "}
//         <a href="#" style={{ color: "#17AF2D" }}>mental health</a>. For{" "}
//         <a href="#" style={{ color: "#008CAF" }}>clinicians</a>. For{" "}
//         <a href="#" style={{ color: "#6240E8" }}>hospitals</a>. For all of it in one place. For life.
//       </h2>
//     </div>
//   );
//   export default HeroSection;
  