"use client";

import React from "react";
import { useTranslation } from "../../context/provider/TranslationContext";

const CmpSection = () => {
  const { t, language } = useTranslation();

  return (
    <div
      className={`relative mt-24 h-[500px] bg-cover bg-center bg-no-repeat ${language === "ar" ? "rtl" : "ltr"}`}
      style={{ backgroundImage: "url('/flat-lay-medical-composition.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Content */}
      <div
        className={`absolute top-1/2 ${
          language === "ar" ? "right-[200px]" : "left-[200px]"
        } -translate-y-1/2 z-10 text-white`}
      >
        <h2 className="text-4xl font-bold">{t("cmpSection.title")}</h2>
        <a
          href="#"
          className="mt-6 inline-block rounded-full bg-blue-600 text-white text-lg px-6 py-2 hover:bg-blue-800 transition-all duration-500"
        >
          {t("cmpSection.button")}
        </a>
      </div>
    </div>
  );
};

export default CmpSection;







// "use client";

// import React from "react";

// const CmpSection = () => (
//   <div className="relative mt-24 h-[500px] bg-cover bg-center bg-no-repeat "  style={{ backgroundImage: "url('/flat-lay-medical-composition.jpg')" }}>
//     {/* Overlay */}
//     <div className="absolute inset-0 bg-black/30 z-0" />

//     {/* Content */}
//     <div className="absolute top-1/2 left-[200px] -translate-y-1/2 z-10 text-white">
//       <h2 className="text-4xl font-bold">This is whole-person care.</h2>
//       <a
//         href="#"
//         className="mt-6 inline-block rounded-full bg-blue-600 text-white text-lg px-6 py-2 hover:bg-blue-800 transition-all duration-500"
//       >
//         Get started
//       </a>
//     </div>
//   </div>
// );

// export default CmpSection;


// const CmpSection = () => (
//     <div className="home-body-cmp-container">
//       <h2>This is whole-person care.</h2>
//       <a href="">Get started</a>
//     </div>
//   );
//   export default CmpSection;
  