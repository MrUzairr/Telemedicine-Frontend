import React from "react";
import { useTranslation } from "../../context/provider/TranslationContext";

const AboutSection = () => {
  const { t, language } = useTranslation();

  return (
    <div className={`home-body-about ${language === "ar" ? "rtl" : "ltr"}`}>
      <h2>{t("about.title")}</h2>
      <p>{t("about.description")}</p>
      <a href="">{t("about.link")}</a>
    </div>
  );
};

export default AboutSection;






// const AboutSection = () => (
//     <div className="home-body-about">
//       <h2>A high-quality care experience—anywhere, anytime</h2>
//       <p>
//         It started with a simple yet revolutionary idea. That everyone should have access to the best healthcare anywhere in the world on their terms. That includes you.
//       </p>
//       <a href="">About us</a>
//     </div>
//   );
//   export default AboutSection;
  