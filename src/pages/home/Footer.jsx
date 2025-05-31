import React from "react";
import { useTranslation } from "../../context/provider/TranslationContext";

const Footer = () => {
  const { t, language } = useTranslation();
  const isRTL = language === "ar";

  return (
    <footer
      className={`bg-[#f9fbfc] text-gray-800 font-sans border-t border-gray-200 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 align-items-start">
        {/* Brand Section */}
        <div className="flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 tracking-tight">
            Telemed
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            {t("footer.brand.description")}
          </p>
          <p className="mt-3 text-xs text-gray-500 italic">
            {t("footer.brand.trusted")}
          </p>
        </div>

        {/* Services Section */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-teal-600 mb-4">
            {t("footer.services.title")}
          </h3>
          <ul className="space-y-2 text-sm pl-0">
            <li className="list-none">
              <a href="/consult" className="text-gray-700 hover:text-teal-700 transition">
                {t("footer.services.consult")}
              </a>
            </li>
            <li className="list-none">
              <a href="/prescriptions" className="text-gray-700 hover:text-teal-700 transition">
                {t("footer.services.prescriptions")}
              </a>
            </li>
            <li className="list-none">
              <a href="/therapy" className="text-gray-700 hover:text-teal-700 transition">
                {t("footer.services.therapy")}
              </a>
            </li>
            <li className="list-none">
              <a href="/wellness" className="text-gray-700 hover:text-teal-700 transition">
                {t("footer.services.wellness")}
              </a>
            </li>
            <li className="list-none">
              <a href="/lab" className="text-gray-700 hover:text-teal-700 transition">
                {t("footer.services.lab")}
              </a>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-teal-600 mb-4">
            {t("footer.company.title")}
          </h3>
          <ul className="space-y-2 text-sm pl-0">
            <li className="list-none">
              <a href="/about" className="text-gray-700 hover:text-teal-700 transition">
                {t("footer.company.about")}
              </a>
            </li>
            <li className="list-none">
              <a href="/careers" className="text-gray-700 hover:text-teal-700 transition">
                {t("footer.company.careers")}
              </a>
            </li>
            <li className="list-none">
              <a href="/blog" className="text-gray-700 hover:text-teal-700 transition">
                {t("footer.company.blog")}
              </a>
            </li>
            <li className="list-none">
              <a href="/privacy" className="text-gray-700 hover:text-teal-700 transition">
                {t("footer.company.privacy")}
              </a>
            </li>
            <li className="list-none">
              <a href="/terms" className="text-gray-700 hover:text-teal-700 transition">
                {t("footer.company.terms")}
              </a>
            </li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-teal-600 mb-4">
            {t("footer.subscribe.title")}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {t("footer.subscribe.desc")}
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <input
              type="email"
              placeholder={t("footer.subscribe.placeholder")}
              className="px-4 py-2 rounded-lg text-sm border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none w-full"
            />
            <button className="bg-teal-600 text-white rounded-lg py-2 text-sm hover:bg-teal-700 transition-all w-full">
              {t("footer.subscribe.button")}
            </button>
          </div>
          <div className="flex gap-4 mt-6 text-xl text-gray-500 items-center">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 text-center py-6 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Telemed Inc. {t("footer.bottom.rights")}</p>
        <p>{t("footer.bottom.compliance")}</p>
      </div>
    </footer>
  );
};

export default Footer;







// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-[#f9fbfc] text-gray-800 font-sans border-t border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 align-items-start">
//         {/* Brand Section */}
//         <div className="text-left flex flex-col">
//           <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 tracking-tight">
//             Telemed
//           </h2>
//           <p className="mt-4 text-sm leading-relaxed text-gray-600">
//             Bridging healthcare and technology. Telemed connects patients with
//             certified professionals for real-time consultations, prescriptions,
//             and expert care—anytime, anywhere.
//           </p>
//           <p className="mt-3 text-xs text-gray-500 italic">
//             Trusted by over 100,000 users nationwide.
//           </p>
//         </div>

//         {/* Services Section */}
//         <div className="text-left flex flex-col">
//           <h3 className="text-lg font-semibold text-teal-600 mb-4">
//             Our Services
//           </h3>
//           <ul className="space-y-2 text-sm pl-0">
//             <li className="list-none">
//               <a
//                 href="/consult"
//                 className="text-gray-700 hover:text-teal-700 transition"
//               >
//                 Virtual Consultations
//               </a>
//             </li>
//             <li className="list-none">
//               <a
//                 href="/prescriptions"
//                 className="text-gray-700 hover:text-teal-700 transition"
//               >
//                 Digital Prescriptions
//               </a>
//             </li>
//             <li className="list-none">
//               <a
//                 href="/therapy"
//                 className="text-gray-700 hover:text-teal-700 transition"
//               >
//                 Mental Health Therapy
//               </a>
//             </li>
//             <li className="list-none">
//               <a
//                 href="/wellness"
//                 className="text-gray-700 hover:text-teal-700 transition"
//               >
//                 Wellness Programs
//               </a>
//             </li>
//             <li className="list-none">
//               <a
//                 href="/lab"
//                 className="text-gray-700 hover:text-teal-700 transition"
//               >
//                 Lab Tests at Home
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Company Section */}
//         <div className="text-left flex flex-col">
//           <h3 className="text-lg font-semibold text-teal-600 mb-4">Company</h3>
//           <ul className="space-y-2 text-sm pl-0">
//             <li className="list-none">
//               <a
//                 href="/about"
//                 className="text-gray-700 hover:text-teal-700 transition"
//               >
//                 About Us
//               </a>
//             </li>
//             <li className="list-none">
//               <a
//                 href="/careers"
//                 className="text-gray-700 hover:text-teal-700 transition"
//               >
//                 Careers
//               </a>
//             </li>
//             <li className="list-none">
//               <a
//                 href="/blog"
//                 className="text-gray-700 hover:text-teal-700 transition"
//               >
//                 Health Insights
//               </a>
//             </li>
//             <li className="list-none">
//               <a
//                 href="/privacy"
//                 className="text-gray-700 hover:text-teal-700 transition"
//               >
//                 Privacy Policy
//               </a>
//             </li>
//             <li className="list-none">
//               <a
//                 href="/terms"
//                 className="text-gray-700 hover:text-teal-700 transition"
//               >
//                 Terms & Conditions
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Subscribe Section */}
//         <div className="text-left flex flex-col">
//           <h3 className="text-lg font-semibold text-teal-600 mb-4">
//             Stay Updated
//           </h3>
//           <p className="text-sm text-gray-600 mb-3">
//             Subscribe for health tips, updates, and offers.
//           </p>
//           <div className="flex flex-col gap-3 w-full max-w-xs">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="px-4 py-2 rounded-lg text-sm border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none w-full"
//             />
//             <button className="bg-teal-600 text-white rounded-lg py-2 text-sm hover:bg-teal-700 transition-all w-full">
//               Subscribe
//             </button>
//           </div>
//           <div className="flex gap-4 mt-6 text-xl text-gray-500 items-center">
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-teal-600"
//             >
//               <i className="fab fa-facebook-f"></i>
//             </a>
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-teal-600"
//             >
//               <i className="fab fa-twitter"></i>
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-teal-600"
//             >
//               <i className="fab fa-instagram"></i>
//             </a>
//             <a
//               href="https://linkedin.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-teal-600"
//             >
//               <i className="fab fa-linkedin-in"></i>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Footer */}
//       <div className="border-t border-gray-200 text-center py-6 text-sm text-gray-500">
//         <p>© {new Date().getFullYear()} Telemed Inc. All rights reserved.</p>
//         <p>HIPAA & GDPR Compliant | Designed for a healthier tomorrow.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-[#f9fbfc] text-gray-800 font-sans border-t border-gray-200">
//       <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
//         {/* Brand */}
//         <div className="text-left">
//           <h2 className="text-3xl font-bold text-teal-600 tracking-tight">Telemed</h2>
//           <p className="mt-4 text-sm leading-relaxed text-gray-600">
//             Bridging healthcare and technology. Telemed connects patients with certified professionals for real-time consultations, prescriptions, and expert care—anytime, anywhere.
//           </p>
//           <p className="mt-3 text-xs text-gray-500 italic">
//             Trusted by over 100,000 users nationwide.
//           </p>
//         </div>

//         {/* Services */}
//         <div className="text-left">
//           <h3 className="text-lg font-semibold text-teal-600 mb-4 ml-8">Our Services</h3>
//           <ul className="space-y-2">
//             <li><a href="/consult" className="text-gray-700 hover:text-teal-700 transition">Virtual Consultations</a></li>
//             <li><a href="/prescriptions" className="text-gray-700 hover:text-teal-700 transition">Digital Prescriptions</a></li>
//             <li><a href="/therapy" className="text-gray-700 hover:text-teal-700 transition">Mental Health Therapy</a></li>
//             <li><a href="/wellness" className="text-gray-700 hover:text-teal-700 transition">Wellness Programs</a></li>
//             <li><a href="/lab" className="text-gray-700 hover:text-teal-700 transition">Lab Tests at Home</a></li>
//           </ul>
//         </div>

//         {/* Company */}
//         <div className="text-left">
//           <h3 className="text-lg font-semibold text-teal-600 mb-4 ml-8">Company</h3>
//           <ul className="space-y-2 text-sm">
//             <li><a href="/about" className="text-gray-700 hover:text-teal-700 transition">About Us</a></li>
//             <li><a href="/careers" className="text-gray-700 hover:text-teal-700 transition">Careers</a></li>
//             <li><a href="/blog" className="text-gray-700 hover:text-teal-700 transition">Health Insights</a></li>
//             <li><a href="/privacy" className="text-gray-700 hover:text-teal-700 transition">Privacy Policy</a></li>
//             <li><a href="/terms" className="text-gray-700 hover:text-teal-700 transition">Terms & Conditions</a></li>
//           </ul>
//         </div>

//         {/* Subscribe */}
//         <div className="text-left">
//           <h3 className="text-lg font-semibold text-teal-600 mb-4">Stay Updated</h3>
//           <p className="text-sm text-gray-600 mb-3">Subscribe for health tips, updates, and offers.</p>
//           <div className="flex flex-col gap-2">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="px-4 py-2 rounded-lg text-sm border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
//             />
//             <button className="bg-teal-600 text-white rounded-lg py-2 text-sm hover:bg-teal-700 transition-all">
//               Subscribe
//             </button>
//           </div>
//           <div className="flex gap-4 mt-6 text-xl text-gray-500">
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600"><i className="fab fa-facebook-f"></i></a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600"><i className="fab fa-twitter"></i></a>
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600"><i className="fab fa-instagram"></i></a>
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600"><i className="fab fa-linkedin-in"></i></a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Footer */}
//       <div className="border-t border-gray-200 text-center py-6 text-sm text-gray-500">
//         <p>&copy; {new Date().getFullYear()} Telemed Inc. All rights reserved.</p>
//         <p>HIPAA & GDPR Compliant | Designed for a healthier tomorrow.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
