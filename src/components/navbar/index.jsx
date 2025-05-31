import React, { useState, useEffect } from "react";
import { PiSignInBold } from "react-icons/pi";
import { IoLanguage } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { CgLogOut } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../api";
import { toast } from "react-toastify";
import { useTranslation } from "../../context/provider/TranslationContext";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    doctors: false,
    organizations: false,
    clinicians: false,
    dermatologist: false,
    gynecologist: false,
    neurologist: false,
  });
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); 

  const navigate = useNavigate();
  const isAuthenticated =
    localStorage.getItem("userAuth") ||
    localStorage.getItem("adminAuth") ||
    localStorage.getItem("doctorAuth");

  const { t, language, changeLanguage } = useTranslation();

  useEffect(() => {
    try {
      const storedLanguage = localStorage.getItem("selectedLanguage");
      const defaultLanguage = storedLanguage || "en";
      changeLanguage(defaultLanguage);
      if (!storedLanguage) {
        localStorage.setItem("selectedLanguage", defaultLanguage);
      }
      setIsInitialized(true);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      changeLanguage("en");
      setIsInitialized(true);
    }
  }, [changeLanguage]);

  const handleSignout = async () => {
    try {
      await signout();
      localStorage.removeItem("userAuth");
      localStorage.removeItem("adminAuth");
      localStorage.removeItem("doctorAuth");
      toast.success(t("logout_success"));
      navigate("/");
    } catch (err) {
      toast.error(t("logout_error"));
    }
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  const handleSymptoms = () => {
    navigate("/symptoms");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNav = () => {
    setDropdownVisible((prev) => !prev);
  };

  const closeNav = () => {
    setDropdownVisible(false);
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    localStorage.setItem("selectedLanguage", lang); // Store selected language
    setShowLanguageDropdown(false);
  };

  useEffect(() => {
    if (!dropdownVisible) {
      setMobileDropdowns({
        doctors: false,
        organizations: false,
        clinicians: false,
        dermatologist: false,
        gynecologist: false,
        neurologist: false,
      });
    }
  }, [dropdownVisible]);

  if (!isInitialized) {
    return null; // or return a loading spinner
  }

  return (
    <div className={`flex justify-center items-center font-sans py-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="nav-body bg-white h-[65px] w-full max-w-[1200px] rounded-3xl shadow-lg flex items-center px-4 sm:px-6">
        <div className="flex items-center w-full relative">
          {/* Left Section: Menu Icon (Mobile) and Navigation Links (Desktop) */}
          <div className="flex items-center">
            <div className="md:hidden">
              <FontAwesomeIcon
                icon={faBars}
                className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300"
                onClick={handleNav}
              />
            </div>
            <div
              className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-full h-screen bg-[#f5f6fe] pt-16 px-6 flex flex-col items-start transition-transform duration-700 transform ${
                dropdownVisible
                  ? "translate-x-0"
                  : language === 'ar'
                  ? "translate-x-full"
                  : "-translate-x-full"
              } md:static md:flex md:flex-row md:items-center md:space-x-4 md:bg-transparent md:pt-0 md:px-0 md:transform-none md:h-auto md:w-auto z-40`}
            >
              {/* Close Button (Mobile Only) */}
              <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} md:hidden`}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"
                  onClick={closeNav}
                />
              </div>

              {/* Doctors Dropdown */}
              <div className="relative w-full group">
                <button
                  className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
                  onClick={() => toggleMobileDropdown("doctors")}
                >
                  {t("doctors")}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`ms-2 text-sm transition-transform duration-300 ${
                      mobileDropdowns.doctors ? "rotate-180" : ""
                    } md:hidden`}
                  />
                </button>
                <div
                  className={`${
                    mobileDropdowns.doctors ? "block" : "hidden"
                  } md:block md:absolute ${language === 'ar' ? 'end-0' : 'start-0'} text-start md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 ps-4 mt-2 w-full md:ps-0 md:mt-0`}
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    {t("find_doctor")}
                  </a>
                  <div className="relative w-full group/sub">
                    <button
                      className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
                      onClick={() => toggleMobileDropdown("dermatologist")}
                    >
                      {t("dermatologist")}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`ms-2 text-sm transition-transform duration-300 ${
                          mobileDropdowns.dermatologist ? "rotate-180" : ""
                        } md:hidden`}
                      />
                    </button>
                    <div
                      className={`${
                        mobileDropdowns.dermatologist ? "block" : "hidden"
                      } md:block md:absolute ${language === 'ar' ? 'end-full' : 'start-full'} md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 ps-4 mt-2 md:ps-0 md:mt-0`}
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      >
                        {t("dermatologist")} {t("lahore")}
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      >
                        {t("dermatologist")} {t("islamabad")}
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      >
                        {t("dermatologist")} {t("karachi")}
                      </a>
                    </div>
                  </div>
                  <div className="relative w-full group/sub">
                    <button
                      className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
                      onClick={() => toggleMobileDropdown("gynecologist")}
                    >
                      {t("gynecologist")}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`ms-2 text-sm transition-transform duration-300 ${
                          mobileDropdowns.gynecologist ? "rotate-180" : ""
                        } md:hidden`}
                      />
                    </button>
                    <div
                      className={`${
                        mobileDropdowns.gynecologist ? "block" : "hidden"
                      } md:block md:absolute ${language === 'ar' ? 'end-full' : 'start-full'} md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 ps-4 mt-2 md:ps-0 md:mt-0`}
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      >
                        {t("gynecologist")} {t("lahore")}
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      >
                        {t("gynecologist")} {t("islamabad")}
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      >
                        {t("gynecologist")} {t("karachi")}
                      </a>
                    </div>
                  </div>
                  <div className="relative w-full group/sub">
                    <button
                      className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
                      onClick={() => toggleMobileDropdown("neurologist")}
                    >
                      {t("neurologist")}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`ms-2 text-sm transition-transform duration-300 ${
                          mobileDropdowns.neurologist ? "rotate-180" : ""
                        } md:hidden`}
                      />
                    </button>
                    <div
                      className={`${
                        mobileDropdowns.neurologist ? "block" : "hidden"
                      } md:block md:absolute ${language === 'ar' ? 'end-full' : 'start-full'} md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 ps-4 mt-2 md:ps-0 md:mt-0`}
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      >
                        {t("neurologist")} {t("lahore")}
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      >
                        {t("neurologist")} {t("islamabad")}
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      >
                        {t("neurologist")} {t("karachi")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organizations Dropdown */}
              <div className="relative w-full group">
                <button
                  className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
                  onClick={() => toggleMobileDropdown("organizations")}
                >
                  {t("organizations")}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`ms-2 text-sm transition-transform duration-300 ${
                      mobileDropdowns.organizations ? "rotate-180" : ""
                    } md:hidden`}
                  />
                </button>
                <div
                  className={`${
                    mobileDropdowns.organizations ? "block" : "hidden"
                  } md:block md:absolute ${language === 'ar' ? 'end-0' : 'start-0'} text-start md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 ps-4 mt-2 w-full md:ps-0 md:mt-0`}
                >
                  <a
                    href="https://www.teladoc.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    {t("teladoc")}
                  </a>
                  <a
                    href="https://www.amwell.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    {t("amwell")}
                  </a>
                  <a
                    href="https://www.mdlive.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    {t("mdlive")}
                  </a>
                  <a
                    href="https://www.doctorondemand.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    {t("doctor_on_demand")}
                  </a>
                  <a
                    href="https://www.plushcare.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    {t("plushcare")}
                  </a>
                </div>
              </div>

              {/* Clinicians Dropdown */}
              <div className="relative w-full group">
                <button
                  className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
                  onClick={() => toggleMobileDropdown("clinicians")}
                >
                  {t("clinicians")}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`ms-2 text-sm transition-transform duration-300 ${
                      mobileDropdowns.clinicians ? "rotate-180" : ""
                    } md:hidden`}
                  />
                </button>
                <div
                  className={`${
                    mobileDropdowns.clinicians ? "block" : "hidden"
                  } md:block md:absolute ${language === 'ar' ? 'end-0' : 'start-0'} text-start md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 ps-4 mt-2 w-full md:ps-0 md:mt-0`}
                >
                  <a
                    href="https://www.who.int/health-topics/clinical-guidelines"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    {t("who_guidelines")}
                  </a>
                  <a
                    href="https://www.cdc.gov/training/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    {t("cdc_training")}
                  </a>
                  <a
                    href="https://www.uptodate.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    {t("uptodate_resources")}
                  </a>
                  <a
                    href="https://www.abim.org/certification/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    {t("abim_certification")}
                  </a>
                  <a
                    href="https://www.sermo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    {t("physician_network")}
                  </a>
                </div>
              </div>

              {/* Talk to a Doctor Button (Mobile Only) */}
              <div className="flex justify-center mt-6 w-full md:hidden">
                <button
                  className="px-8 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 w-full max-w-xs"
                  onClick={handleRegister}
                >
                  {t("talk_to_doctor")}
                </button>
              </div>
            </div>
          </div>

          {/* Center Section: Logo */}
          <div
            className={`flex-1 flex justify-center items-center absolute left-1/2 transform -translate-x-1/2`}
          >
            <Link to={"/"}>
              <h4 className="nav-logo text-2xl font-bold cursor-pointer bg-gradient-to-r from-[#5fefff] via-[#7b7dfe] to-[#7116df] bg-clip-text text-transparent animate-fade-in-down">
                {t("telemedicine")}
              </h4>
            </Link>
          </div>

          {/* Right Section: Authentication Buttons and Language Selector */}
          <div className="flex items-center ms-auto space-x-4 space-x-reverse min-w-[200px]">
            {isAuthenticated ? (
              <div className="flex space-x-4 space-x-reverse max-[550px]:space-x-2">
                <button
                  className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
                  onClick={handleSignout}
                >
                  <CgLogOut className="text-teal-600 text-xl max-[550px]:me-0" />
                  <span
                    className={`max-[550px]:hidden ms-1 text-gray-700 font-medium`}
                  >
                    {t("logout")}
                  </span>
                </button>
                <button
                  className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
                  onClick={handleSymptoms}
                >
                  <img
                    src="/images/generative.png"
                    className="w-6 h-6 max-[550px]:me-0"
                    alt="AI Search"
                  />
                  <span
                    className={`max-[550px]:hidden ms-1 text-gray-700 font-medium`}
                  >
                    {t("search_with_ai")}
                  </span>
                </button>
              </div>
            ) : (
              <>
                <button
                  className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
                  onClick={handleSignIn}
                >
                  <PiSignInBold className="text-teal-600 text-xl max-[550px]:me-0" />
                  <span
                    className={`max-[550px]:hidden ms-1 text-gray-700 font-medium`}
                  >
                    {t("sign_in")}
                  </span>
                </button>
                <button
                  className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 max-md:hidden"
                  onClick={handleRegister}
                >
                  {t("register_now")}
                </button>
              </>
            )}

            {/* Language Selector */}
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-teal-100 transition-colors duration-300 flex items-center"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <IoLanguage className="text-teal-600 text-xl" />
                <span
                  className={`ms-1 text-sm font-medium text-gray-700 max-[550px]:hidden`}
                >
                  {language === "en" ? "English" : language === "ur" ? "اردو" : "العربية"}
                </span>
              </button>
              {showLanguageDropdown && (
                <div
                  className={`absolute ${language === 'ar' ? 'start-0' : 'end-0'} mt-2 w-32 bg-white rounded-md shadow-lg z-50`}
                >
                  <button
                    className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    onClick={() => handleLanguageChange("en")}
                  >
                    English
                  </button>
                  <button
                    className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    onClick={() => handleLanguageChange("ur")}
                  >
                    اردو
                  </button>
                  <button
                    className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    onClick={() => handleLanguageChange("ar")}
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS for Additional Stability */}
      <style jsx>{`
        .nav-body {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .nav-body > div {
          flex: 1;
        }
        .nav-body > div:last-child {
          flex: 0 0 auto;
          min-width: 200px;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};

export default Navbar;







// import React, { useState, useEffect } from "react";
// import { PiSignInBold } from "react-icons/pi";
// import { IoLanguage } from "react-icons/io5";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { CgLogOut } from "react-icons/cg";
// import { Link, useNavigate } from "react-router-dom";
// import { signout } from "../../api";
// import { toast } from "react-toastify";
// import { useTranslation } from "../../context/provider/TranslationContext";

// const Navbar = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [mobileDropdowns, setMobileDropdowns] = useState({
//     doctors: false,
//     organizations: false,
//     clinicians: false,
//     dermatologist: false,
//     gynecologist: false,
//     neurologist: false,
//   });
//   const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

//   const navigate = useNavigate();
//   const isAuthenticated =
//     localStorage.getItem("userAuth") ||
//     localStorage.getItem("adminAuth") ||
//     localStorage.getItem("doctorAuth");

//   const { t, language, changeLanguage } = useTranslation();

//   const handleSignout = async () => {
//     try {
//       await signout();
//       localStorage.removeItem("userAuth");
//       localStorage.removeItem("adminAuth");
//       localStorage.removeItem("doctorAuth");
//       toast.success(t("logout_success"));
//       navigate("/");
//     } catch (err) {
//       toast.error(t("logout_error"));
//     }
//   };

//   const handleRegister = () => {
//     navigate("/signup");
//   };

//   const handleSymptoms = () => {
//     navigate("/symptoms");
//   };

//   const handleSignIn = () => {
//     navigate("/signin");
//   };

//   const toggleMobileDropdown = (key) => {
//     setMobileDropdowns((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const handleNav = () => {
//     setDropdownVisible((prev) => !prev);
//   };

//   const closeNav = () => {
//     setDropdownVisible(false);
//   };

//   const handleLanguageChange = (lang) => {
//     changeLanguage(lang);
//     setShowLanguageDropdown(false);
//   };

//   useEffect(() => {
//     if (!dropdownVisible) {
//       setMobileDropdowns({
//         doctors: false,
//         organizations: false,
//         clinicians: false,
//         dermatologist: false,
//         gynecologist: false,
//         neurologist: false,
//       });
//     }
//   }, [dropdownVisible]);

//   return (
//     <div className={`flex justify-center items-center font-sans py-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
//       <div className="nav-body bg-white h-[65px] w-full max-w-[1200px] rounded-3xl shadow-lg flex items-center px-4 sm:px-6">
//         <div className="flex items-center w-full relative">
//           {/* Left Section: Menu Icon (Mobile) and Navigation Links (Desktop) */}
//           <div className="flex items-center">
//             <div className="md:hidden">
//               <FontAwesomeIcon
//                 icon={faBars}
//                 className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300"
//                 onClick={handleNav}
//               />
//             </div>
//             <div
//               className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-full h-screen bg-[#f5f6fe] pt-16 px-6 flex flex-col items-start transition-transform duration-700 transform ${
//                 dropdownVisible
//                   ? "translate-x-0"
//                   : language === 'ar'
//                   ? "translate-x-full"
//                   : "-translate-x-full"
//               } md:static md:flex md:flex-row md:items-center md:space-x-4 md:bg-transparent md:pt-0 md:px-0 md:transform-none md:h-auto md:w-auto z-40`}
//             >
//               {/* Close Button (Mobile Only) */}
//               <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} md:hidden`}>
//                 <FontAwesomeIcon
//                   icon={faTimes}
//                   className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"
//                   onClick={closeNav}
//                 />
//               </div>

//               {/* Doctors Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("doctors")}
//                 >
//                   {t("doctors")}
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ms-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.doctors ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.doctors ? "block" : "hidden"
//                   } md:block md:absolute ${language === 'ar' ? 'end-0' : 'start-0'} text-start md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 ps-4 mt-2 w-full md:ps-0 md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t("find_doctor")}
//                   </a>
//                   <div className="relative w-full group/sub">
//                     <button
//                       className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("dermatologist")}
//                     >
//                       {t("dermatologist")}
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ms-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.dermatologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.dermatologist ? "block" : "hidden"
//                       } md:block md:absolute ${language === 'ar' ? 'end-full' : 'start-full'} md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 ps-4 mt-2 md:ps-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t("dermatologist")} {t("lahore")}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t("dermatologist")} {t("islamabad")}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t("dermatologist")} {t("karachi")}
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full group/sub">
//                     <button
//                       className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("gynecologist")}
//                     >
//                       {t("gynecologist")}
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ms-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.gynecologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.gynecologist ? "block" : "hidden"
//                       } md:block md:absolute ${language === 'ar' ? 'end-full' : 'start-full'} md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 ps-4 mt-2 md:ps-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t("gynecologist")} {t("lahore")}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t("gynecologist")} {t("islamabad")}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t("gynecologist")} {t("karachi")}
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full group/sub">
//                     <button
//                       className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("neurologist")}
//                     >
//                       {t("neurologist")}
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ms-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.neurologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.neurologist ? "block" : "hidden"
//                       } md:block md:absolute ${language === 'ar' ? 'end-full' : 'start-full'} md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 ps-4 mt-2 md:ps-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t("neurologist")} {t("lahore")}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t("neurologist")} {t("islamabad")}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t("neurologist")} {t("karachi")}
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Organizations Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("organizations")}
//                 >
//                   {t("organizations")}
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ms-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.organizations ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.organizations ? "block" : "hidden"
//                   } md:block md:absolute ${language === 'ar' ? 'end-0' : 'start-0'} text-start md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 ps-4 mt-2 w-full md:ps-0 md:mt-0`}
//                 >
//                   <a
//                     href="https://www.teladoc.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t("teladoc")}
//                   </a>
//                   <a
//                     href="https://www.amwell.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t("amwell")}
//                   </a>
//                   <a
//                     href="https://www.mdlive.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t("mdlive")}
//                   </a>
//                   <a
//                     href="https://www.doctorondemand.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t("doctor_on_demand")}
//                   </a>
//                   <a
//                     href="https://www.plushcare.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t("plushcare")}
//                   </a>
//                 </div>
//               </div>

//               {/* Clinicians Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("clinicians")}
//                 >
//                   {t("clinicians")}
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ms-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.clinicians ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.clinicians ? "block" : "hidden"
//                   } md:block md:absolute ${language === 'ar' ? 'end-0' : 'start-0'} text-start md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 ps-4 mt-2 w-full md:ps-0 md:mt-0`}
//                 >
//                   <a
//                     href="https://www.who.int/health-topics/clinical-guidelines"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t("who_guidelines")}
//                   </a>
//                   <a
//                     href="https://www.cdc.gov/training/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t("cdc_training")}
//                   </a>
//                   <a
//                     href="https://www.uptodate.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t("uptodate_resources")}
//                   </a>
//                   <a
//                     href="https://www.abim.org/certification/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t("abim_certification")}
//                   </a>
//                   <a
//                     href="https://www.sermo.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t("physician_network")}
//                   </a>
//                 </div>
//               </div>

//               {/* Talk to a Doctor Button (Mobile Only) */}
//               <div className="flex justify-center mt-6 w-full md:hidden">
//                 <button
//                   className="px-8 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 w-full max-w-xs"
//                   onClick={handleRegister}
//                 >
//                   {t("talk_to_doctor")}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Center Section: Logo */}
//           <div
//             className={`flex-1 flex justify-center items-center absolute left-1/2 transform -translate-x-1/2`}
//           >
//             <Link to={"/"}>
//               <h4 className="nav-logo text-2xl font-bold cursor-pointer bg-gradient-to-r from-[#5fefff] via-[#7b7dfe] to-[#7116df] bg-clip-text text-transparent animate-fade-in-down">
//                 {t("telemedicine")}
//               </h4>
//             </Link>
//           </div>

//           {/* Right Section: Authentication Buttons and Language Selector */}
//           <div className="flex items-center ms-auto space-x-4 space-x-reverse min-w-[200px]">
//             {isAuthenticated ? (
//               <div className="flex space-x-4 space-x-reverse max-[550px]:space-x-2">
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignout}
//                 >
//                   <CgLogOut className="text-teal-600 text-xl max-[550px]:me-0" />
//                   <span
//                     className={`max-[550px]:hidden ms-1 text-gray-700 font-medium`}
//                   >
//                     {t("logout")}
//                   </span>
//                 </button>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSymptoms}
//                 >
//                   <img
//                     src="/images/generative.png"
//                     className="w-6 h-6 max-[550px]:me-0"
//                     alt="AI Search"
//                   />
//                   <span
//                     className={`max-[550px]:hidden ms-1 text-gray-700 font-medium`}
//                   >
//                     {t("search_with_ai")}
//                   </span>
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignIn}
//                 >
//                   <PiSignInBold className="text-teal-600 text-xl max-[550px]:me-0" />
//                   <span
//                     className={`max-[550px]:hidden ms-1 text-gray-700 font-medium`}
//                   >
//                     {t("sign_in")}
//                   </span>
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 max-md:hidden"
//                   onClick={handleRegister}
//                 >
//                   {t("register_now")}
//                 </button>
//               </>
//             )}

//             {/* Language Selector */}
//             <div className="relative">
//               <button
//                 className="p-2 rounded-full hover:bg-teal-100 transition-colors duration-300 flex items-center"
//                 onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
//               >
//                 <IoLanguage className="text-teal-600 text-xl" />
//                 <span
//                   className={`ms-1 text-sm font-medium text-gray-700 max-[550px]:hidden`}
//                 >
//                   {t("show")}
//                 </span>
//               </button>
//               {showLanguageDropdown && (
//                 <div
//                   className={`absolute ${language === 'ar' ? 'start-0' : 'end-0'} mt-2 w-32 bg-white rounded-md shadow-lg z-50`}
//                 >
//                   <button
//                     className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                     onClick={() => handleLanguageChange("en")}
//                   >
//                     English
//                   </button>
//                   <button
//                     className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                     onClick={() => handleLanguageChange("ur")}
//                   >
//                     اردو
//                   </button>
//                   <button
//                     className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                     onClick={() => handleLanguageChange("ar")}
//                   >
//                     العربية
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Inline CSS for Additional Stability */}
//       <style jsx>{`
//         .nav-body {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           width: 100%;
//         }
//         .nav-body > div {
//           flex: 1;
//         }
//         .nav-body > div:last-child {
//           flex: 0 0 auto;
//           min-width: 200px;
//           display: flex;
//           justify-content: flex-end;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Navbar;









// import React, { useState, useEffect } from "react";
// import { PiSignInBold } from "react-icons/pi";
// import { IoLanguage } from "react-icons/io5";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { CgLogOut } from "react-icons/cg";
// import { Link, useNavigate } from "react-router-dom";
// import { signout } from "../../api";
// import { toast } from "react-toastify";
// import { useTranslation } from "../../context/provider/TranslationContext"; // Import the translation context

// const Navbar = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [mobileDropdowns, setMobileDropdowns] = useState({
//     doctors: false,
//     organizations: false,
//     clinicians: false,
//     dermatologist: false,
//     gynecologist: false,
//     neurologist: false,
//   });
//   const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
//   const navigate = useNavigate();
//   const isAuthenticated = localStorage.getItem("userAuth") || 
//                         localStorage.getItem("adminAuth") || 
//                         localStorage.getItem("doctorAuth");

//   // Use the translation context
//   const { t, language, changeLanguage } = useTranslation();

//   const handleSignout = async () => {
//     try {
//       await signout();
//       localStorage.removeItem("userAuth");
//       localStorage.removeItem("adminAuth");
//       localStorage.removeItem("doctorAuth");
//       toast.success(t('logout_success'));
//       navigate("/");
//     } catch (err) {
//       toast.error(t('logout_error'));
//     }
//   };

//   const handleRegister = () => {
//     navigate("/signup");
//   };

//   const handleSymptoms = () => {
//     navigate("/symptoms");
//   };

//   const handleSignIn = () => {
//     navigate("/signin");
//   };

//   const toggleMobileDropdown = (key) => {
//     setMobileDropdowns((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const handleNav = () => {
//     setDropdownVisible((prev) => !prev);
//   };

//   const closeNav = () => {
//     setDropdownVisible(false);
//   };

//   const handleLanguageChange = (lang) => {
//     changeLanguage(lang);
//     setShowLanguageDropdown(false);
//   };

//   useEffect(() => {
//     if (!dropdownVisible) {
//       setMobileDropdowns({
//         doctors: false,
//         organizations: false,
//         clinicians: false,
//         dermatologist: false,
//         gynecologist: false,
//         neurologist: false,
//       });
//     }
//   }, [dropdownVisible]);

//   return (
//     <div className={`flex justify-center items-center font-sans py-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
//       <div className="nav-body bg-white h-[65px] w-full max-w-[1200px] rounded-3xl shadow-lg flex items-center px-4 sm:px-6">
//         <div className="flex items-center w-full relative">
//           {/* Left Section: Menu Icon (Mobile) and Navigation Links (Desktop) */}
//           <div className="flex items-center">
//             <div className="md:hidden">
//               <FontAwesomeIcon
//                 icon={faBars}
//                 className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300"
//                 onClick={handleNav}
//               />
//             </div>
//             <div
//               className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-full h-screen bg-[#f5f6fe] pt-16 px-6 flex flex-col items-start transition-transform duration-700 transform ${
//                 dropdownVisible ? "translate-x-0" : 
//                 language === 'ar' ? "translate-x-full" : "-translate-x-full"
//               } md:static md:flex md:flex-row md:items-center md:space-x-4 md:bg-transparent md:pt-0 md:px-0 md:transform-none md:h-auto md:w-auto z-40`}
//             >
//               {/* Close Button (Mobile Only) */}
//               <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} md:hidden`}>
//                 <FontAwesomeIcon
//                   icon={faTimes}
//                   className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"
//                   onClick={closeNav}
//                 />
//               </div>

//               {/* Doctors Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("doctors")}
//                 >
//                   {t('doctors')}
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm transition-transform duration-300 ${
//                       mobileDropdowns.doctors ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.doctors ? "block" : "hidden"
//                   } md:block md:absolute ${language === 'ar' ? 'md:right-0' : 'md:left-0'} text-left md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 ${language === 'ar' ? 'pr-4' : 'pl-4'} mt-2 w-full md:${language === 'ar' ? 'pr-0' : 'pl-0'} md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('find_doctor')}
//                   </a>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("dermatologist")}
//                     >
//                       {t('dermatologist')}
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm transition-transform duration-300 ${
//                           mobileDropdowns.dermatologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.dermatologist ? "block" : "hidden"
//                       } md:block md:absolute ${language === 'ar' ? 'md:right-full' : 'md:left-full'} md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 ${language === 'ar' ? 'pr-4' : 'pl-4'} mt-2 md:${language === 'ar' ? 'pr-0' : 'pl-0'} md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('dermatologist')} {t('lahore')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('dermatologist')} {t('islamabad')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('dermatologist')} {t('karachi')}
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("gynecologist")}
//                     >
//                       {t('gynecologist')}
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm transition-transform duration-300 ${
//                           mobileDropdowns.gynecologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.gynecologist ? "block" : "hidden"
//                       } md:block md:absolute ${language === 'ar' ? 'md:right-full' : 'md:left-full'} md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 ${language === 'ar' ? 'pr-4' : 'pl-4'} mt-2 md:${language === 'ar' ? 'pr-0' : 'pl-0'} md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('gynecologist')} {t('lahore')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('gynecologist')} {t('islamabad')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('gynecologist')} {t('karachi')}
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("neurologist")}
//                     >
//                       {t('neurologist')}
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm transition-transform duration-300 ${
//                           mobileDropdowns.neurologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.neurologist ? "block" : "hidden"
//                       } md:block md:absolute ${language === 'ar' ? 'md:right-full' : 'md:left-full'} md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 ${language === 'ar' ? 'pr-4' : 'pl-4'} mt-2 md:${language === 'ar' ? 'pr-0' : 'pl-0'} md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('neurologist')} {t('lahore')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('neurologist')} {t('islamabad')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('neurologist')} {t('karachi')}
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Organizations Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("organizations")}
//                 >
//                   {t('organizations')}
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm transition-transform duration-300 ${
//                       mobileDropdowns.organizations ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.organizations ? "block" : "hidden"
//                   } md:block md:absolute ${language === 'ar' ? 'md:right-0' : 'md:left-0'} text-left md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 ${language === 'ar' ? 'pr-4' : 'pl-4'} mt-2 w-full md:${language === 'ar' ? 'pr-0' : 'pl-0'} md:mt-0`}
//                 >
//                   <a
//                     href="https://www.teladoc.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('teladoc')}
//                   </a>
//                   <a
//                     href="https://www.amwell.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('amwell')}
//                   </a>
//                   <a
//                     href="https://www.mdlive.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('mdlive')}
//                   </a>
//                   <a
//                     href="https://www.doctorondemand.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('doctor_on_demand')}
//                   </a>
//                   <a
//                     href="https://www.plushcare.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('plushcare')}
//                   </a>
//                 </div>
//               </div>

//               {/* Clinicians Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("clinicians")}
//                 >
//                   {t('clinicians')}
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm transition-transform duration-300 ${
//                       mobileDropdowns.clinicians ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.clinicians ? "block" : "hidden"
//                   } md:block md:absolute ${language === 'ar' ? 'md:right-0' : 'md:left-0'} text-left md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 ${language === 'ar' ? 'pr-4' : 'pl-4'} mt-2 w-full md:${language === 'ar' ? 'pr-0' : 'pl-0'} md:mt-0`}
//                 >
//                   <a
//                     href="https://www.who.int/health-topics/clinical-guidelines"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('who_guidelines')}
//                   </a>
//                   <a
//                     href="https://www.cdc.gov/training/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('cdc_training')}
//                   </a>
//                   <a
//                     href="https://www.uptodate.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('uptodate_resources')}
//                   </a>
//                   <a
//                     href="https://www.abim.org/certification/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('abim_certification')}
//                   </a>
//                   <a
//                     href="https://www.sermo.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('physician_network')}
//                   </a>
//                 </div>
//               </div>

//               {/* Talk to a Doctor Button (Mobile Only) */}
//               <div className="flex justify-center mt-6 w-full md:hidden">
//                 <button
//                   className="px-8 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 w-full max-w-xs"
//                   onClick={handleRegister}
//                 >
//                   {t('talk_to_doctor')}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Center Section: Logo */}
//           <div className={`flex-1 flex justify-center items-center absolute ${language === 'ar' ? 'right-1/2' : 'left-1/2'} transform ${language === 'ar' ? 'translate-x-1/2' : '-translate-x-1/2'}`}>
//             <Link to={'/'}>
//               <h4 className="nav-logo text-2xl font-bold cursor-pointer bg-gradient-to-r from-[#5fefff] via-[#7b7dfe] to-[#7116df] bg-clip-text text-transparent animate-fade-in-down">
//                 {t('telemedicine')}
//               </h4>
//             </Link>
//           </div>

//           {/* Right Section: Authentication Buttons and Language Selector */}
//           <div className={`flex items-center space-x-4 ${language === 'ar' ? 'mr-auto' : 'ml-auto'}`}>
//             {isAuthenticated ? (
//               <div className="flex space-x-4 max-[550px]:space-x-2">
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignout}
//                 >
//                   <CgLogOut className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ${language === 'ar' ? 'mr-1' : 'ml-1'} text-gray-700 font-medium">
//                     {t('logout')}
//                   </span>
//                 </button>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSymptoms}
//                 >
//                   <img
//                     src="/images/generative.png"
//                     className="w-6 h-6 max-[550px]:mr-0"
//                     alt="AI Search"
//                   />
//                   <span className="max-[550px]:hidden ${language === 'ar' ? 'mr-1' : 'ml-1'} text-gray-700 font-medium">
//                     {t('search_with_ai')}
//                   </span>
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignIn}
//                 >
//                   <PiSignInBold className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ${language === 'ar' ? 'mr-1' : 'ml-1'} text-gray-700 font-medium">
//                     {t('sign_in')}
//                   </span>
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 max-md:hidden"
//                   onClick={handleRegister}
//                 >
//                   {t('register_now')}
//                 </button>
//               </>
//             )}
            
//             {/* Language Selector */}
//             <div className="relative">
//               <button
//                 className="p-2 rounded-full hover:bg-teal-100 transition-colors duration-300 flex items-center"
//                 onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
//               >
//                 <IoLanguage className="text-teal-600 text-xl" />
//                 <span className="${language === 'ar' ? 'mr-1' : 'ml-1'} text-sm font-medium text-gray-700 max-[550px]:hidden">
//                   {t('show')}
//                 </span>
//               </button>
//               {showLanguageDropdown && (
//                 <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-32 bg-white rounded-md shadow-lg z-50`}>
//                   <button
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                     onClick={() => handleLanguageChange('en')}
//                   >
//                     English
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                     onClick={() => handleLanguageChange('ur')}
//                   >
//                     اردو
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                     onClick={() => handleLanguageChange('ar')}
//                   >
//                     العربية
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;







// import React, { useState, useEffect } from "react";
// import { PiSignInBold } from "react-icons/pi";
// import { IoLanguage } from "react-icons/io5";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { CgLogOut } from "react-icons/cg";
// import { Link, useNavigate } from "react-router-dom";
// import { signout } from "../../api";
// import { toast } from "react-toastify";

// // Language translations
// const translations = {
//   en: {
//     doctors: "Doctors",
//     organizations: "Organizations",
//     clinicians: "Clinicians",
//     findDoctor: "Find doctor by specialty",
//     dermatologist: "Dermatologist",
//     gynecologist: "Gynecologist",
//     neurologist: "Neurologist",
//     lahore: "in Lahore",
//     islamabad: "in Islamabad",
//     karachi: "in Karachi",
//     action: "Action",
//     anotherAction: "Another action",
//     somethingElse: "Something else here",
//     talkToDoctor: "Talk to a doctor",
//     telemedicine: "Telemedicine",
//     logout: "Logout",
//     searchWithAI: "Search with AI",
//     signIn: "Sign in",
//     registerNow: "Register now",
//     show: "Show"
//   },
//   ur: {
//     doctors: "ڈاکٹرز",
//     organizations: "تنظیمیں",
//     clinicians: "کلینیشنز",
//     findDoctor: "خصوصیت کے لحاظ سے ڈاکٹر تلاش کریں",
//     dermatologist: "جلد کے ڈاکٹر",
//     gynecologist: "ماہر امراض نسواں",
//     neurologist: "نیورولوجسٹ",
//     lahore: "لاہور میں",
//     islamabad: "اسلام آباد میں",
//     karachi: "کراچی میں",
//     action: "عمل",
//     anotherAction: "ایک اور عمل",
//     somethingElse: "کچھ اور یہاں",
//     talkToDoctor: "ڈاکٹر سے بات کریں",
//     telemedicine: "ٹیلی میڈیسن",
//     logout: "لاگ آؤٹ",
//     searchWithAI: "AI کے ساتھ تلاش کریں",
//     signIn: "سائن ان",
//     registerNow: "ابھی رجسٹر کریں",
//     show: "دکھائیں"
//   },
//   ar: {
//     doctors: "الأطباء",
//     organizations: "المنظمات",
//     clinicians: "الأطباء السريريون",
//     findDoctor: "ابحث عن طبيب حسب التخصص",
//     dermatologist: "طبيب أمراض جلدية",
//     gynecologist: "طبيب نساء وتوليد",
//     neurologist: "طبيب أعصاب",
//     lahore: "في لاهور",
//     islamabad: "في إسلام أباد",
//     karachi: "في كراتشي",
//     action: "إجراء",
//     anotherAction: "إجراء آخر",
//     somethingElse: "شيء آخر هنا",
//     talkToDoctor: "تحدث مع طبيب",
//     telemedicine: "الطب عن بعد",
//     logout: "تسجيل الخروج",
//     searchWithAI: "البحث بالذكاء الاصطناعي",
//     signIn: "تسجيل الدخول",
//     registerNow: "سجل الآن",
//     show: "عرض"
//   }
// };

// const Navbar = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [mobileDropdowns, setMobileDropdowns] = useState({
//     doctors: false,
//     organizations: false,
//     clinicians: false,
//     dermatologist: false,
//     gynecologist: false,
//     neurologist: false,
//   });
//   const [language, setLanguage] = useState('en');
//   const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
//   const navigate = useNavigate();
//   const isAuthenticated = localStorage.getItem("userAuth") || 
//                         localStorage.getItem("adminAuth") || 
//                         localStorage.getItem("doctorAuth");

//   const t = (key) => translations[language][key] || key;

//   const handleSignout = async () => {
//     try {
//       await signout();
//       localStorage.removeItem("userAuth");
//       localStorage.removeItem("adminAuth");
//       localStorage.removeItem("doctorAuth");
//       toast.success(language === 'en' ? "Logged out successfully!" : 
//                    language === 'ur' ? "لاگ آؤٹ کامیابی سے ہو گیا!" : 
//                    "تم تسجيل الخروج بنجاح!");
//       navigate("/");
//     } catch (err) {
//       toast.error(language === 'en' ? "Failed to logout. Please try again." : 
//                  language === 'ur' ? "لاگ آؤٹ کرنے میں ناکامی۔ دوبارہ کوشش کریں۔" : 
//                  "فشل تسجيل الخروج. يرجى المحاولة مرة أخرى.");
//     }
//   };

//   const handleRegister = () => {
//     navigate("/signup");
//   };

//   const handleSymptoms = () => {
//     navigate("/symptoms");
//   };

//   const handleSignIn = () => {
//     navigate("/signin");
//   };

//   const toggleMobileDropdown = (key) => {
//     setMobileDropdowns((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const handleNav = () => {
//     setDropdownVisible((prev) => !prev);
//   };

//   const closeNav = () => {
//     setDropdownVisible(false);
//   };

//   const changeLanguage = (lang) => {
//     setLanguage(lang);
//     setShowLanguageDropdown(false);
//     document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
//     document.documentElement.lang = lang;
//   };

//   useEffect(() => {
//     if (!dropdownVisible) {
//       setMobileDropdowns({
//         doctors: false,
//         organizations: false,
//         clinicians: false,
//         dermatologist: false,
//         gynecologist: false,
//         neurologist: false,
//       });
//     }
//   }, [dropdownVisible]);

//   return (
//     <div className={`flex justify-center items-center font-sans py-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
//       <div className="nav-body bg-white h-[65px] w-full max-w-[1200px] rounded-3xl shadow-lg flex items-center px-4 sm:px-6">
//         <div className="flex items-center w-full relative">
//           {/* Left Section: Menu Icon (Mobile) and Navigation Links (Desktop) */}
//           <div className="flex items-center">
//             <div className="md:hidden">
//               <FontAwesomeIcon
//                 icon={faBars}
//                 className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300"
//                 onClick={handleNav}
//               />
//             </div>
//             <div
//               className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-full h-screen bg-[#f5f6fe] pt-16 px-6 flex flex-col items-start transition-transform duration-700 transform ${
//                 dropdownVisible ? "translate-x-0" : 
//                 language === 'ar' ? "translate-x-full" : "-translate-x-full"
//               } md:static md:flex md:flex-row md:items-center md:space-x-4 md:bg-transparent md:pt-0 md:px-0 md:transform-none md:h-auto md:w-auto z-40`}
//             >
//               {/* Close Button (Mobile Only) */}
//               <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} md:hidden`}>
//                 <FontAwesomeIcon
//                   icon={faTimes}
//                   className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"
//                   onClick={closeNav}
//                 />
//               </div>

//               {/* Doctors Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("doctors")}
//                 >
//                   {t('doctors')}
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm transition-transform duration-300 ${
//                       mobileDropdowns.doctors ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.doctors ? "block" : "hidden"
//                   } md:block md:absolute ${language === 'ar' ? 'md:right-0' : 'md:left-0'} text-left md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 ${language === 'ar' ? 'pr-4' : 'pl-4'} mt-2 w-full md:${language === 'ar' ? 'pr-0' : 'pl-0'} md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('findDoctor')}
//                   </a>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("dermatologist")}
//                     >
//                       {t('dermatologist')}
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm transition-transform duration-300 ${
//                           mobileDropdowns.dermatologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.dermatologist ? "block" : "hidden"
//                       } md:block md:absolute ${language === 'ar' ? 'md:right-full' : 'md:left-full'} md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 ${language === 'ar' ? 'pr-4' : 'pl-4'} mt-2 md:${language === 'ar' ? 'pr-0' : 'pl-0'} md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('dermatologist')} {t('lahore')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('dermatologist')} {t('islamabad')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('dermatologist')} {t('karachi')}
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("gynecologist")}
//                     >
//                       {t('gynecologist')}
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm transition-transform duration-300 ${
//                           mobileDropdowns.gynecologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.gynecologist ? "block" : "hidden"
//                       } md:block md:absolute ${language === 'ar' ? 'md:right-full' : 'md:left-full'} md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 ${language === 'ar' ? 'pr-4' : 'pl-4'} mt-2 md:${language === 'ar' ? 'pr-0' : 'pl-0'} md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('gynecologist')} {t('lahore')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('gynecologist')} {t('islamabad')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('gynecologist')} {t('karachi')}
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("neurologist")}
//                     >
//                       {t('neurologist')}
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm transition-transform duration-300 ${
//                           mobileDropdowns.neurologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.neurologist ? "block" : "hidden"
//                       } md:block md:absolute ${language === 'ar' ? 'md:right-full' : 'md:left-full'} md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 ${language === 'ar' ? 'pr-4' : 'pl-4'} mt-2 md:${language === 'ar' ? 'pr-0' : 'pl-0'} md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('neurologist')} {t('lahore')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('neurologist')} {t('islamabad')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('neurologist')} {t('karachi')}
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Organizations Dropdown */}
//               <div className="relative w-full group">
//   <button
//     className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center  justify-between w-full md:w-auto"
//     onClick={() => toggleMobileDropdown("organizations")}
//   >
//     {t('organizations')}
//     <FontAwesomeIcon
//       icon={faChevronDown}
//       className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm transition-transform duration-300 ${
//         mobileDropdowns.organizations ? "rotate-180" : ""
//       } md:hidden`}
//     />
//   </button>
//   <div
//     className={`${
//       mobileDropdowns.organizations ? "block" : "hidden"
//     } md:block md:absolute ${language === 'ar' ? 'md:right-0' : 'md:left-0'} text-left md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 ${language === 'ar' ? 'pr-4' : 'pl-4'} mt-2 w-full md:${language === 'ar' ? 'pr-0' : 'pl-0'} md:mt-0`}
//   >
//     <a
//       href="https://www.teladoc.com/"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//     >
//       {language === 'en' && "Teladoc Health"}
//       {language === 'ur' && "ٹیلی ڈاک ہیلتھ"}
//       {language === 'ar' && "تيلادوك الصحة"}
//     </a>
//     <a
//       href="https://www.amwell.com/"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//     >
//       {language === 'en' && "Amwell"}
//       {language === 'ur' && "ایم ویل"}
//       {language === 'ar' && "أم ويل"}
//     </a>
//     <a
//       href="https://www.mdlive.com/"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//     >
//       {language === 'en' && "MDLIVE"}
//       {language === 'ur' && "ایم ڈی لائیو"}
//       {language === 'ar' && "إم دي لايف"}
//     </a>
//     <a
//       href="https://www.doctorondemand.com/"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//     >
//       {language === 'en' && "Doctor On Demand"}
//       {language === 'ur' && "ڈاکٹر آن ڈیمانڈ"}
//       {language === 'ar' && "طبيب عند الطلب"}
//     </a>
//     <a
//       href="https://www.plushcare.com/"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//     >
//       {language === 'en' && "PlushCare"}
//       {language === 'ur' && "پلش کیئر"}
//       {language === 'ar' && "بلوش كير"}
//     </a>
//   </div>
// </div>
//               {/* Clinicians Dropdown */}
//               <div className="relative w-full group">
//   <button
//     className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//     onClick={() => toggleMobileDropdown("clinicians")}
//   >
//     {t('clinicians')}
//     <FontAwesomeIcon
//       icon={faChevronDown}
//       className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm transition-transform duration-300 ${
//         mobileDropdowns.clinicians ? "rotate-180" : ""
//       } md:hidden`}
//     />
//   </button>
//   <div
//     className={`${
//       mobileDropdowns.clinicians ? "block" : "hidden"
//     } md:block md:absolute ${language === 'ar' ? 'md:right-0' : 'md:left-0'} text-left md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 ${language === 'ar' ? 'pr-4' : 'pl-4'} mt-2 w-full md:${language === 'ar' ? 'pr-0' : 'pl-0'} md:mt-0`}
//   >
//     <a
//       href="https://www.who.int/health-topics/clinical-guidelines"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//     >
//       {language === 'en' && "WHO Guidelines"}
//       {language === 'ur' && "ڈبلیو ایچ او گائیڈ لائنز"}
//       {language === 'ar' && "إرشادات منظمة الصحة العالمية"}
//     </a>
//     <a
//       href="https://www.cdc.gov/training/"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//     >
//       {language === 'en' && "CDC Training"}
//       {language === 'ur' && "سی ڈی سی ٹریننگ"}
//       {language === 'ar' && "تدريب مراكز مكافحة الأمراض"}
//     </a>
//     <a
//       href="https://www.uptodate.com/"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//     >
//       {language === 'en' && "UpToDate Resources"}
//       {language === 'ur' && "اپ ٹو ڈیٹ وسائل"}
//       {language === 'ar' && "موارد أب تو ديت"}
//     </a>
//     <a
//       href="https://www.abim.org/certification/"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//     >
//       {language === 'en' && "ABIM Certification"}
//       {language === 'ur' && "اے بی آئی ایم سرٹیفیکیشن"}
//       {language === 'ar' && "شهادة المجلس الأمريكي للطب الباطني"}
//     </a>
//     <a
//       href="https://www.sermo.com/"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//     >
//       {language === 'en' && "Physician Network"}
//       {language === 'ur' && "فزیشن نیٹ ورک"}
//       {language === 'ar' && "شبكة الأطباء"}
//     </a>
//   </div>
// </div>
//               {/* Talk to a Doctor Button (Mobile Only) */}
//               <div className="flex justify-center mt-6 w-full md:hidden">
//                 <button
//                   className="px-8 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 w-full max-w-xs"
//                   onClick={handleRegister}
//                 >
//                   {t('talkToDoctor')}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Center Section: Logo */}
//           <div className={`flex-1 flex justify-center items-center absolute ${language === 'ar' ? 'right-1/2' : 'left-1/2'} transform ${language === 'ar' ? 'translate-x-1/2' : '-translate-x-1/2'}`}>
//             <Link to={'/'}>
//               <h4 className="nav-logo text-2xl font-bold cursor-pointer bg-gradient-to-r from-[#5fefff] via-[#7b7dfe] to-[#7116df] bg-clip-text text-transparent animate-fade-in-down">
//                 {t('telemedicine')}
//               </h4>
//             </Link>
//           </div>

//           {/* Right Section: Authentication Buttons and Language Selector */}
//           <div className={`flex items-center space-x-4 ${language === 'ar' ? 'mr-auto' : 'ml-auto'}`}>
//             {isAuthenticated ? (
//               <div className="flex space-x-4 max-[550px]:space-x-2">
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignout}
//                 >
//                   <CgLogOut className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ${language === 'ar' ? 'mr-1' : 'ml-1'} text-gray-700 font-medium">
//                     {t('logout')}
//                   </span>
//                 </button>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSymptoms}
//                 >
//                   <img
//                     src="/images/generative.png"
//                     className="w-6 h-6 max-[550px]:mr-0"
//                     alt="AI Search"
//                   />
//                   <span className="max-[550px]:hidden ${language === 'ar' ? 'mr-1' : 'ml-1'} text-gray-700 font-medium">
//                     {t('searchWithAI')}
//                   </span>
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignIn}
//                 >
//                   <PiSignInBold className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ${language === 'ar' ? 'mr-1' : 'ml-1'} text-gray-700 font-medium">
//                     {t('signIn')}
//                   </span>
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 max-md:hidden"
//                   onClick={handleRegister}
//                 >
//                   {t('registerNow')}
//                 </button>
//               </>
//             )}
            
//             {/* Language Selector */}
//             <div className="relative">
//               <button
//                 className="p-2 rounded-full hover:bg-teal-100 transition-colors duration-300 flex items-center"
//                 onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
//               >
//                 <IoLanguage className="text-teal-600 text-xl" />
//                 <span className="${language === 'ar' ? 'mr-1' : 'ml-1'} text-sm font-medium text-gray-700 max-[550px]:hidden">
//                   {t('show')}
//                 </span>
//               </button>
//               {showLanguageDropdown && (
//                 <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-32 bg-white rounded-md shadow-lg z-50`}>
//                   <button
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                     onClick={() => changeLanguage('en')}
//                   >
//                     English
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                     onClick={() => changeLanguage('ur')}
//                   >
//                     اردو
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                     onClick={() => changeLanguage('ar')}
//                   >
//                     العربية
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;









// import React, { useState, useEffect } from "react";
// import { PiSignInBold } from "react-icons/pi";
// import { IoLanguage } from "react-icons/io5";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { CgLogOut } from "react-icons/cg";
// import { Link, useNavigate } from "react-router-dom";
// import { signout } from "../../api";
// import { toast } from "react-toastify";

// // Language translations
// const translations = {
//   en: {
//     doctors: "Doctors",
//     organizations: "Organizations",
//     clinicians: "Clinicians",
//     findDoctor: "Find doctor by specialty",
//     dermatologist: "Dermatologist",
//     gynecologist: "Gynecologist",
//     neurologist: "Neurologist",
//     lahore: "in Lahore",
//     islamabad: "in Islamabad",
//     karachi: "in Karachi",
//     action: "Action",
//     anotherAction: "Another action",
//     somethingElse: "Something else here",
//     talkToDoctor: "Talk to a doctor",
//     telemedicine: "Telemedicine",
//     logout: "Logout",
//     searchWithAI: "Search with AI",
//     signIn: "Sign in",
//     registerNow: "Register now",
//     show: "Show"
//   },
//   ur: {
//     doctors: "ڈاکٹرز",
//     organizations: "تنظیمیں",
//     clinicians: "کلینیشنز",
//     findDoctor: "خصوصیت کے لحاظ سے ڈاکٹر تلاش کریں",
//     dermatologist: "جلد کے ڈاکٹر",
//     gynecologist: "ماہر امراض نسواں",
//     neurologist: "نیورولوجسٹ",
//     lahore: "لاہور میں",
//     islamabad: "اسلام آباد میں",
//     karachi: "کراچی میں",
//     action: "عمل",
//     anotherAction: "ایک اور عمل",
//     somethingElse: "کچھ اور یہاں",
//     talkToDoctor: "ڈاکٹر سے بات کریں",
//     telemedicine: "ٹیلی میڈیسن",
//     logout: "لاگ آؤٹ",
//     searchWithAI: "AI کے ساتھ تلاش کریں",
//     signIn: "سائن ان",
//     registerNow: "ابھی رجسٹر کریں",
//     show: "دکھائیں"
//   },
//   ar: {
//     doctors: "الأطباء",
//     organizations: "المنظمات",
//     clinicians: "الأطباء السريريون",
//     findDoctor: "ابحث عن طبيب حسب التخصص",
//     dermatologist: "طبيب أمراض جلدية",
//     gynecologist: "طبيب نساء وتوليد",
//     neurologist: "طبيب أعصاب",
//     lahore: "في لاهور",
//     islamabad: "في إسلام أباد",
//     karachi: "في كراتشي",
//     action: "إجراء",
//     anotherAction: "إجراء آخر",
//     somethingElse: "شيء آخر هنا",
//     talkToDoctor: "تحدث مع طبيب",
//     telemedicine: "الطب عن بعد",
//     logout: "تسجيل الخروج",
//     searchWithAI: "البحث بالذكاء الاصطناعي",
//     signIn: "تسجيل الدخول",
//     registerNow: "سجل الآن",
//     show: "عرض"
//   }
// };

// const Navbar = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [mobileDropdowns, setMobileDropdowns] = useState({
//     doctors: false,
//     organizations: false,
//     clinicians: false,
//     dermatologist: false,
//     gynecologist: false,
//     neurologist: false,
//   });
//   const [language, setLanguage] = useState('en');
//   const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
//   const navigate = useNavigate();
//   const isAuthenticated = localStorage.getItem("userAuth") || 
//                         localStorage.getItem("adminAuth") || 
//                         localStorage.getItem("doctorAuth");

//   const t = (key) => translations[language][key] || key;

//   const handleSignout = async () => {
//     try {
//       await signout();
//       localStorage.removeItem("userAuth");
//       localStorage.removeItem("adminAuth");
//       localStorage.removeItem("doctorAuth");
//       toast.success(language === 'en' ? "Logged out successfully!" : 
//                    language === 'ur' ? "لاگ آؤٹ کامیابی سے ہو گیا!" : 
//                    "تم تسجيل الخروج بنجاح!");
//       navigate("/");
//     } catch (err) {
//       toast.error(language === 'en' ? "Failed to logout. Please try again." : 
//                  language === 'ur' ? "لاگ آؤٹ کرنے میں ناکامی۔ دوبارہ کوشش کریں۔" : 
//                  "فشل تسجيل الخروج. يرجى المحاولة مرة أخرى.");
//     }
//   };

//   const handleRegister = () => {
//     navigate("/signup");
//   };

//   const handleSymptoms = () => {
//     navigate("/symptoms");
//   };

//   const handleSignIn = () => {
//     navigate("/signin");
//   };

//   const toggleMobileDropdown = (key) => {
//     setMobileDropdowns((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const handleNav = () => {
//     setDropdownVisible((prev) => !prev);
//   };

//   const closeNav = () => {
//     setDropdownVisible(false);
//   };

//   const changeLanguage = (lang) => {
//     setLanguage(lang);
//     setShowLanguageDropdown(false);
//     document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
//   };

//   useEffect(() => {
//     if (!dropdownVisible) {
//       setMobileDropdowns({
//         doctors: false,
//         organizations: false,
//         clinicians: false,
//         dermatologist: false,
//         gynecologist: false,
//         neurologist: false,
//       });
//     }
//   }, [dropdownVisible]);

//   return (
//     <div className="flex justify-center items-center font-sans py-4">
//       <div className="nav-body bg-white h-[65px] w-full max-w-[1200px] rounded-3xl shadow-lg flex items-center px-4 sm:px-6">
//         <div className="flex items-center w-full relative">
//           {/* Left Section: Menu Icon (Mobile) and Navigation Links (Desktop) */}
//           <div className="flex items-center">
//             <div className="md:hidden">
//               <FontAwesomeIcon
//                 icon={faBars}
//                 className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300"
//                 onClick={handleNav}
//               />
//             </div>
//             <div
//               className={`fixed top-0 left-0 w-full h-screen bg-[#f5f6fe] pt-16 px-6 flex flex-col items-start transition-transform duration-700 transform ${
//                 dropdownVisible ? "translate-x-0" : "-translate-x-full"
//               } md:static md:flex md:flex-row md:items-center md:space-x-4 md:bg-transparent md:pt-0 md:px-0 md:transform-none md:h-auto md:w-auto z-40`}
//             >
//               {/* Close Button (Mobile Only) */}
//               <div className="absolute top-4 right-4 md:hidden">
//                 <FontAwesomeIcon
//                   icon={faTimes}
//                   className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"
//                   onClick={closeNav}
//                 />
//               </div>

//               {/* Doctors Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("doctors")}
//                 >
//                   {t('doctors')}
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ml-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.doctors ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.doctors ? "block" : "hidden"
//                   } md:block md:absolute md:left-0 md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 pl-4 mt-2 w-full md:pl-0 md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('findDoctor')}
//                   </a>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("dermatologist")}
//                     >
//                       {t('dermatologist')}
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ml-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.dermatologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.dermatologist ? "block" : "hidden"
//                       } md:block md:absolute md:left-full md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 pl-4 mt-2 md:pl-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('dermatologist')} {t('lahore')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('dermatologist')} {t('islamabad')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('dermatologist')} {t('karachi')}
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("gynecologist")}
//                     >
//                       {t('gynecologist')}
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ml-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.gynecologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.gynecologist ? "block" : "hidden"
//                       } md:block md:absolute md:left-full md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 pl-4 mt-2 md:pl-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('gynecologist')} {t('lahore')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('gynecologist')} {t('islamabad')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('gynecologist')} {t('karachi')}
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("neurologist")}
//                     >
//                       {t('neurologist')}
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ml-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.neurologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.neurologist ? "block" : "hidden"
//                       } md:block md:absolute md:left-full md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 pl-4 mt-2 md:pl-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('neurologist')} {t('lahore')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('neurologist')} {t('islamabad')}
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         {t('neurologist')} {t('karachi')}
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Organizations Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("organizations")}
//                 >
//                   {t('organizations')}
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ml-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.organizations ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.organizations ? "block" : "hidden"
//                   } md:block md:absolute md:left-0 md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 pl-4 mt-2 w-full md:pl-0 md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('action')}
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('anotherAction')}
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('somethingElse')}
//                   </a>
//                 </div>
//               </div>

//               {/* Clinicians Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("clinicians")}
//                 >
//                   {t('clinicians')}
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ml-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.clinicians ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.clinicians ? "block" : "hidden"
//                   } md:block md:absolute md:left-0 md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 pl-4 mt-2 w-full md:pl-0 md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('action')}
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('anotherAction')}
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     {t('somethingElse')}
//                   </a>
//                 </div>
//               </div>

//               {/* Talk to a Doctor Button (Mobile Only) */}
//               <div className="flex justify-center mt-6 w-full md:hidden">
//                 <button
//                   className="px-8 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 w-full max-w-xs"
//                   onClick={handleRegister}
//                 >
//                   {t('talkToDoctor')}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Center Section: Logo */}
//           <div className="flex-1 flex justify-center items-center absolute left-1/2 transform -translate-x-1/2">
//             <Link to={'/'}>
//               <h4 className="nav-logo text-2xl font-bold cursor-pointer bg-gradient-to-r from-[#5fefff] via-[#7b7dfe] to-[#7116df] bg-clip-text text-transparent animate-fade-in-down">
//                 {t('telemedicine')}
//               </h4>
//             </Link>
//           </div>

//           {/* Right Section: Authentication Buttons and Language Selector */}
//           <div className="flex items-center space-x-4 ml-auto">
//             {isAuthenticated ? (
//               <div className="flex space-x-4 max-[550px]:space-x-2">
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignout}
//                 >
//                   <CgLogOut className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     {t('logout')}
//                   </span>
//                 </button>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSymptoms}
//                 >
//                   <img
//                     src="/images/generative.png"
//                     className="w-6 h-6 max-[550px]:mr-0"
//                     alt="AI Search"
//                   />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     {t('searchWithAI')}
//                   </span>
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignIn}
//                 >
//                   <PiSignInBold className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     {t('signIn')}
//                   </span>
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 max-md:hidden"
//                   onClick={handleRegister}
//                 >
//                   {t('registerNow')}
//                 </button>
//               </>
//             )}
            
//             {/* Language Selector */}
//             <div className="relative">
//               <button
//                 className="p-2 rounded-full hover:bg-teal-100 transition-colors duration-300 flex items-center"
//                 onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
//               >
//                 <IoLanguage className="text-teal-600 text-xl" />
//                 <span className="ml-1 text-sm font-medium text-gray-700 max-[550px]:hidden">
//                   {t('show')}
//                 </span>
//               </button>
//               {showLanguageDropdown && (
//                 <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50">
//                   <button
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                     onClick={() => changeLanguage('en')}
//                   >
//                     English
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                     onClick={() => changeLanguage('ur')}
//                   >
//                     اردو
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                     onClick={() => changeLanguage('ar')}
//                   >
//                     العربية
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;







// import React, { useState, useEffect } from "react";
// import { PiSignInBold } from "react-icons/pi";
// import { IoSearch } from "react-icons/io5";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { CgLogOut } from "react-icons/cg";
// import { Link, useNavigate } from "react-router-dom";
// import { signout } from "../../api";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [mobileDropdowns, setMobileDropdowns] = useState({
//     doctors: false,
//     organizations: false,
//     clinicians: false,
//     dermatologist: false,
//     gynecologist: false,
//     neurologist: false,
//   });
  
//   const navigate = useNavigate();
//   const isAuthenticated = localStorage.getItem("userAuth") || 
//                         localStorage.getItem("adminAuth") || 
//                         localStorage.getItem("doctorAuth");

//   const handleSignout = async () => {
//     try {
//       await signout();
//       localStorage.removeItem("userAuth");
//       localStorage.removeItem("adminAuth");
//       localStorage.removeItem("doctorAuth");
//       toast.success("Logged out successfully!");
//       navigate("/");
//     } catch (err) {
//       toast.error("Failed to logout. Please try again.");
//     }
//   };

//   const handleRegister = () => {
//     navigate("/signup");
//   };

//   const handleSymptoms = () => {
//     navigate("/symptoms");
//   };

//   const handleSignIn = () => {
//     navigate("/signin");
//   };

//   const toggleMobileDropdown = (key) => {
//     setMobileDropdowns((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const handleNav = () => {
//     setDropdownVisible((prev) => !prev);
//   };

//   const closeNav = () => {
//     setDropdownVisible(false);
//   };

//   useEffect(() => {
//     if (!dropdownVisible) {
//       setMobileDropdowns({
//         doctors: false,
//         organizations: false,
//         clinicians: false,
//         dermatologist: false,
//         gynecologist: false,
//         neurologist: false,
//       });
//     }
//   }, [dropdownVisible]);

//   return (
//     <div className="flex justify-center items-center font-sans py-4">
//       <div className="nav-body bg-white h-[65px] w-full max-w-[1200px] rounded-3xl shadow-lg flex items-center px-4 sm:px-6">
//         <div className="flex items-center w-full relative">
//           {/* Left Section: Menu Icon (Mobile) and Navigation Links (Desktop) */}
//           <div className="flex items-center">
//             <div className="md:hidden">
//               <FontAwesomeIcon
//                 icon={faBars}
//                 className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300"
//                 onClick={handleNav}
//               />
//             </div>
//             <div
//               className={`fixed top-0 left-0 w-full h-screen bg-[#f5f6fe] pt-16 px-6 flex flex-col items-start transition-transform duration-700 transform ${
//                 dropdownVisible ? "translate-x-0" : "-translate-x-full"
//               } md:static md:flex md:flex-row md:items-center md:space-x-4 md:bg-transparent md:pt-0 md:px-0 md:transform-none md:h-auto md:w-auto z-40`}
//             >
//               {/* Close Button (Mobile Only) */}
//               <div className="absolute top-4 right-4 md:hidden">
//                 <FontAwesomeIcon
//                   icon={faTimes}
//                   className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"
//                   onClick={closeNav}
//                 />
//               </div>

//               {/* Doctors Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("doctors")}
//                 >
//                   Doctors
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ml-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.doctors ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.doctors ? "block" : "hidden"
//                   } md:block md:absolute md:left-0 md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 pl-4 mt-2 w-full md:pl-0 md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Find doctor by specialty
//                   </a>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("dermatologist")}
//                     >
//                       Dermatologist
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ml-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.dermatologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.dermatologist ? "block" : "hidden"
//                       } md:block md:absolute md:left-full md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 pl-4 mt-2 md:pl-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Dermatologist in Lahore
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Dermatologist in Islamabad
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Dermatologist in Karachi
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("gynecologist")}
//                     >
//                       Gynecologist
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ml-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.gynecologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.gynecologist ? "block" : "hidden"
//                       } md:block md:absolute md:left-full md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 pl-4 mt-2 md:pl-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Gynecologist in Lahore
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Gynecologist in Islamabad
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Gynecologist in Karachi
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("neurologist")}
//                     >
//                       Neurologist
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ml-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.neurologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.neurologist ? "block" : "hidden"
//                       } md:block md:absolute md:left-full md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 pl-4 mt-2 md:pl-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Neurologist in Lahore
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Neurologist in Islamabad
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Neurologist in Karachi
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Organizations Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("organizations")}
//                 >
//                   Organizations
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ml-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.organizations ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.organizations ? "block" : "hidden"
//                   } md:block md:absolute md:left-0 md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 pl-4 mt-2 w-full md:pl-0 md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Action
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Another action
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Something else here
//                   </a>
//                 </div>
//               </div>

//               {/* Clinicians Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("clinicians")}
//                 >
//                   Clinicians
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ml-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.clinicians ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.clinicians ? "block" : "hidden"
//                   } md:block md:absolute md:left-0 md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 pl-4 mt-2 w-full md:pl-0 md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Action
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Another action
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Something else here
//                   </a>
//                 </div>
//               </div>

//               {/* Talk to a Doctor Button (Mobile Only) */}
//               <div className="flex justify-center mt-6 w-full md:hidden">
//                 <button
//                   className="px-8 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 w-full max-w-xs"
//                   onClick={handleRegister}
//                 >
//                   Talk to a doctor
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Center Section: Logo */}
//           <div className="flex-1 flex justify-center items-center absolute left-1/2 transform -translate-x-1/2">
//             <Link to={'/'}>
//               <h4 className="nav-logo text-2xl font-bold cursor-pointer bg-gradient-to-r from-[#5fefff] via-[#7b7dfe] to-[#7116df] bg-clip-text text-transparent animate-fade-in-down">
//                 Telemedicine
//               </h4>
//             </Link>
//           </div>

//           {/* Right Section: Authentication Buttons and Search */}
//           <div className="flex items-center space-x-4 ml-auto">
//             {isAuthenticated ? (
//               <div className="flex space-x-4 max-[550px]:space-x-2">
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignout}
//                 >
//                   <CgLogOut className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     Logout
//                   </span>
//                 </button>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSymptoms}
//                 >
//                   <img
//                     src="/images/generative.png"
//                     className="w-6 h-6 max-[550px]:mr-0"
//                     alt="AI Search"
//                   />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     Search with AI
//                   </span>
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignIn}
//                 >
//                   <PiSignInBold className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     Sign in
//                   </span>
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 max-md:hidden"
//                   onClick={handleRegister}
//                 >
//                   Register now
//                 </button>
//               </>
//             )}
//             <button
//               className="p-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//               data-bs-toggle="offcanvas"
//               data-bs-target="#offcanvasWithBothOptions"
//               aria-controls="offcanvasWithBothOptions"
//             >
//               <IoSearch className="text-teal-600 text-xl" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;






// import React, { useState, useEffect } from "react";
// import { PiSignInBold } from "react-icons/pi";
// import { IoSearch } from "react-icons/io5";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { CgLogOut } from "react-icons/cg";
// import { Link, useNavigate } from "react-router-dom";
// import { signout } from "../../api";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [mobileDropdowns, setMobileDropdowns] = useState({
//     doctors: false,
//     organizations: false,
//     clinicians: false,
//     dermatologist: false,
//     gynecologist: false,
//     neurologist: false,
//   });
  
//   const navigate = useNavigate();
//   const isAuthenticated = localStorage.getItem("userAuth") || localStorage.getItem("adminAuth") || localStorage.getItem("doctorAuth");
//   const isAdmin = localStorage.getItem("adminAuth");
//   const doctorData = localStorage.getItem("doctorAuth");

//   const handleSignout = async () => {
//     try {
//       await signout();
//       localStorage.removeItem("userAuth");
//       localStorage.removeItem("adminAuth");
//       localStorage.removeItem("doctorAuth");
//       toast.success("Logged out successfully!");
//       navigate("/");
//     } catch (err) {
//       toast.error("Failed to logout. Please try again.");
//     }
//   };

//   const handleRegister = () => {
//     navigate("/signup");
//   };

//   const handleSymptoms = () => {
//     navigate("/symptoms");
//   };

//   const handleSignIn = () => {
//     navigate("/signin");
//   };

//   const toggleMobileDropdown = (key) => {
//     setMobileDropdowns((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const handleNav = () => {
//     setDropdownVisible((prev) => !prev);
//   };

//   const closeNav = () => {
//     setDropdownVisible(false);
//   };

//   useEffect(() => {
//     if (!dropdownVisible) {
//       setMobileDropdowns({
//         doctors: false,
//         organizations: false,
//         clinicians: false,
//         dermatologist: false,
//         gynecologist: false,
//         neurologist: false,
//       });
//     }
//   }, [dropdownVisible]);

//   return (
//     <div className="flex justify-center items-center font-sans py-4">
//       <div className="nav-body bg-white h-[65px] w-full max-w-[1200px] rounded-3xl shadow-lg flex items-center px-4 sm:px-6">
//         <div className="flex items-center w-full relative">
//           {/* Left Section: Menu Icon (Mobile) and Navigation Links (Desktop) */}
//           <div className="flex items-center">
//             <div className="md:hidden">
//               <FontAwesomeIcon
//                 icon={faBars}
//                 className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300"
//                 onClick={handleNav}
//               />
//             </div>
//             <div
//               className={`fixed top-0 left-0 w-full h-screen bg-[#f5f6fe] pt-16 px-6 flex flex-col items-start transition-transform duration-700 transform ${
//                 dropdownVisible ? "translate-x-0" : "-translate-x-full"
//               } md:static md:flex md:flex-row md:items-center md:space-x-4 md:bg-transparent md:pt-0 md:px-0 md:transform-none md:h-auto md:w-auto z-40`}
//             >
//               {/* Close Button (Mobile Only) */}
//               <div className="absolute top-4 right-4 md:hidden">
//                 <FontAwesomeIcon
//                   icon={faTimes}
//                   className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"
//                   onClick={closeNav}
//                 />
//               </div>

//               {/* Doctors Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("doctors")}
//                 >
//                   Doctors
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ml-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.doctors ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.doctors ? "block" : "hidden"
//                   } md:block md:absolute md:left-0 md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 pl-4 mt-2 w-full md:pl-0 md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Find doctor by specialty
//                   </a>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("dermatologist")}
//                     >
//                       Dermatologist
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ml-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.dermatologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.dermatologist ? "block" : "hidden"
//                       } md:block md:absolute md:left-full md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 pl-4 mt-2 md:pl-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Dermatologist in Lahore
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Dermatologist in Islamabad
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Dermatologist in Karachi
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("gynecologist")}
//                     >
//                       Gynecologist
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ml-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.gynecologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.gynecologist ? "block" : "hidden"
//                       } md:block md:absolute md:left-full md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 pl-4 mt-2 md:pl-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Gynecologist in Lahore
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Gynecologist in Islamabad
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Gynecologist in Karachi
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("neurologist")}
//                     >
//                       Neurologist
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ml-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.neurologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.neurologist ? "block" : "hidden"
//                       } md:block md:absolute md:left-full md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 pl-4 mt-2 md:pl-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Neurologist in Lahore
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Neurologist in Islamabad
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Neurologist in Karachi
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Organizations Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("organizations")}
//                 >
//                   Organizations
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ml-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.organizations ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.organizations ? "block" : "hidden"
//                   } md:block md:absolute md:left-0 md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 pl-4 mt-2 w-full md:pl-0 md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Action
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Another action
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Something else here
//                   </a>
//                 </div>
//               </div>

//               {/* Clinicians Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("clinicians")}
//                 >
//                   Clinicians
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ml-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.clinicians ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.clinicians ? "block" : "hidden"
//                   } md:block md:absolute md:left-0 md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 pl-4 mt-2 w-full md:pl-0 md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Action
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Another action
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Something else here
//                   </a>
//                 </div>
//               </div>

//               {/* Talk to a Doctor Button (Mobile Only) */}
//               <div className="flex justify-center mt-6 w-full md:hidden">
//                 <button
//                   className="px-8 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 w-full max-w-xs"
//                   onClick={handleRegister}
//                 >
//                   Talk to a doctor
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Center Section: Logo */}
//           <div className="flex-1 flex justify-center items-center absolute left-1/2 transform -translate-x-1/2">
//             <Link to={'/'}>
//               <h4 className="nav-logo text-2xl font-bold cursor-pointer bg-gradient-to-r from-[#5fefff] via-[#7b7dfe] to-[#7116df] bg-clip-text text-transparent animate-fade-in-down">
//                 Telemedicine
//               </h4>
//             </Link>
//           </div>

//           {/* Right Section: Authentication Buttons and Search */}
//           <div className="flex items-center space-x-4 ml-auto">
//             {isAuthenticated ? (
//               <div className="flex space-x-4 max-[550px]:space-x-2">
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignout}
//                 >
//                   <CgLogOut className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     Logout
//                   </span>
//                 </button>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSymptoms}
//                 >
//                   <img
//                     src="/images/generative.png"
//                     className="w-6 h-6 max-[550px]:mr-0"
//                     alt="AI Search"
//                   />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     Search with AI
//                   </span>
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignIn}
//                 >
//                   <PiSignInBold className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     Sign in
//                   </span>
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 max-md:hidden"
//                   onClick={handleRegister}
//                 >
//                   Register now
//                 </button>
//               </>
//             )}
//             <button
//               className="p-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//               data-bs-toggle="offcanvas"
//               data-bs-target="#offcanvasWithBothOptions"
//               aria-controls="offcanvasWithBothOptions"
//             >
//               <IoSearch className="text-teal-600 text-xl" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;









// import React, { useState, useEffect } from "react";
// import { PiSignInBold } from "react-icons/pi";
// import { IoSearch } from "react-icons/io5";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { CgLogOut } from "react-icons/cg";
// // import { useSelector, useDispatch } from "react-redux";
// import { signout } from "../../api";
// // import { resetUser } from "../../store/userSlice";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [mobileDropdowns, setMobileDropdowns] = useState({
//     doctors: false,
//     organizations: false,
//     clinicians: false,
//     dermatologist: false,
//     gynecologist: false,
//     neurologist: false,
//   });
//   // const dispatch = useDispatch();
//   // const isAuthenticated = useSelector((state) => state.user.auth);

//   const handleSignout = async () => {
//     await signout();
//     const userAuth = localStorage.getItem("userAuth");
//     if (userAuth) {
//       // dispatch(resetUser());
//       localStorage.removeItem("userAuth");
//     }
//   };

//   const handleRegister = () => {
//     window.location.href = "/signup";
//   };

//   const handleSymptoms = () => {
//     window.location.href = "/symptoms";
//   };

//   const handleSignIn = () => {
//     window.location.href = "/signin";
//   };

//   const toggleMobileDropdown = (key) => {
//     setMobileDropdowns((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const handleNav = () => {
//     setDropdownVisible((prev) => !prev);
//   };

//   const closeNav = () => {
//     setDropdownVisible(false);
//   };

//   useEffect(() => {
//     if (!dropdownVisible) {
//       setMobileDropdowns({
//         doctors: false,
//         organizations: false,
//         clinicians: false,
//         dermatologist: false,
//         gynecologist: false,
//         neurologist: false,
//       });
//     }
//   }, [dropdownVisible]);

//   return (
//     <div className="flex justify-center items-center font-sans py-4">
//       <div className="nav-body bg-white h-[65px] w-full max-w-[1200px] rounded-3xl shadow-lg flex items-center px-4 sm:px-6">
//         <div className="flex items-center w-full relative">
//           {/* Left Section: Menu Icon (Mobile) and Navigation Links (Desktop) */}
//           <div className="flex items-center">
//             <div className="md:hidden">
//               <FontAwesomeIcon
//                 icon={faBars}
//                 className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300"
//                 onClick={handleNav}
//               />
//             </div>
//             <div
//               className={`fixed top-0 left-0 w-full h-screen bg-[#f5f6fe] pt-16 px-6 flex flex-col items-start transition-transform duration-700 transform ${
//                 dropdownVisible ? "translate-x-0" : "-translate-x-full"
//               } md:static md:flex md:flex-row md:items-center md:space-x-4 md:bg-transparent md:pt-0 md:px-0 md:transform-none md:h-auto md:w-auto z-40`}
//             >
//               {/* Close Button (Mobile Only) */}
//               <div className="absolute top-4 right-4 md:hidden">
//                 <FontAwesomeIcon
//                   icon={faTimes}
//                   className="text-teal-600 text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"
//                   onClick={closeNav}
//                 />
//               </div>

//               {/* Doctors Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("doctors")}
//                 >
//                   Doctors
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ml-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.doctors ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.doctors ? "block" : "hidden"
//                   } md:block md:absolute md:left-0 md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 pl-4 mt-2 w-full md:pl-0 md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Find doctor by specialty
//                   </a>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("dermatologist")}
//                     >
//                       Dermatologist
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ml-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.dermatologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.dermatologist ? "block" : "hidden"
//                       } md:block md:absolute md:left-full md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 pl-4 mt-2 md:pl-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Dermatologist in Lahore
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Dermatologist in Islamabad
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Dermatologist in Karachi
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("gynecologist")}
//                     >
//                       Gynecologist
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ml-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.gynecologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.gynecologist ? "block" : "hidden"
//                       } md:block md:absolute md:left-full md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 pl-4 mt-2 md:pl-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Gynecologist in Lahore
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Gynecologist in Islamabad
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Gynecologist in Karachi
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative w-full">
//                     <button
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-between"
//                       onClick={() => toggleMobileDropdown("neurologist")}
//                     >
//                       Neurologist
//                       <FontAwesomeIcon
//                         icon={faChevronDown}
//                         className={`ml-2 text-sm transition-transform duration-300 ${
//                           mobileDropdowns.neurologist ? "rotate-180" : ""
//                         } md:hidden`}
//                       />
//                     </button>
//                     <div
//                       className={`${
//                         mobileDropdowns.neurologist ? "block" : "hidden"
//                       } md:block md:absolute md:left-full md:top-0 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover/sub:opacity-100 md:group-hover/sub:visible md:invisible md:transition-all md:duration-300 pl-4 mt-2 md:pl-0 md:mt-0`}
//                     >
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Neurologist in Lahore
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Neurologist in Islamabad
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                       >
//                         Neurologist in Karachi
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Organizations Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("organizations")}
//                 >
//                   Organizations
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ml-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.organizations ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.organizations ? "block" : "hidden"
//                   } md:block md:absolute md:left-0 md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 pl-4 mt-2 w-full md:pl-0 md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Action
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Another action
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Something else here
//                   </a>
//                 </div>
//               </div>

//               {/* Clinicians Dropdown */}
//               <div className="relative w-full group">
//                 <button
//                   className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 flex items-center justify-between w-full md:w-auto"
//                   onClick={() => toggleMobileDropdown("clinicians")}
//                 >
//                   Clinicians
//                   <FontAwesomeIcon
//                     icon={faChevronDown}
//                     className={`ml-2 text-sm transition-transform duration-300 ${
//                       mobileDropdowns.clinicians ? "rotate-180" : ""
//                     } md:hidden`}
//                   />
//                 </button>
//                 <div
//                   className={`${
//                     mobileDropdowns.clinicians ? "block" : "hidden"
//                   } md:block md:absolute md:left-0 md:mt-2 md:w-48 md:bg-white md:rounded-md md:shadow-lg md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:invisible md:transition-all md:duration-300 md:z-50 pl-4 mt-2 w-full md:pl-0 md:mt-0`}
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Action
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Another action
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
//                   >
//                     Something else here
//                   </a>
//                 </div>
//               </div>

//               {/* Talk to a Doctor Button (Mobile Only) */}
//               <div className="flex justify-center mt-6 w-full md:hidden">
//                 <button
//                   className="px-8 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 w-full max-w-xs"
//                   onClick={handleRegister}
//                 >
//                   Talk to a doctor
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Center Section: Logo */}
//           <div className="flex-1 flex justify-center items-center absolute left-1/2 transform -translate-x-1/2">
//               <Link to={'/'}>
//             <h4 className="nav-logo text-2xl font-bold cursor-pointer bg-gradient-to-r from-[#5fefff] via-[#7b7dfe] to-[#7116df] bg-clip-text text-transparent animate-fade-in-down">
//               Telemedicine
//             </h4>
//               </Link>
//           </div>

//           {/* Right Section: Authentication Buttons and Search */}
//           <div className="flex items-center space-x-4 ml-auto">
//             {isAuthenticated ? (
//               <div className="flex space-x-4 max-[550px]:space-x-2">
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignout}
//                 >
//                   <CgLogOut className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     Logout
//                   </span>
//                 </button>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSymptoms}
//                 >
//                   <img
//                     src="/images/generative.png"
//                     className="w-6 h-6 max-[550px]:mr-0"
//                     alt="AI Search"
//                   />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     Search with AI
//                   </span>
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignIn}
//                 >
//                   <PiSignInBold className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     Sign in
//                   </span>
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 max-md:hidden"
//                   onClick={handleRegister}
//                 >
//                   Register now
//                 </button>
//               </>
//             )}
//             <button
//               className="p-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//               data-bs-toggle="offcanvas"
//               data-bs-target="#offcanvasWithBothOptions"
//               aria-controls="offcanvasWithBothOptions"
//             >
//               <IoSearch className="text-teal-600 text-xl" />
//             </button>
//             <div
//               className="offcanvas offcanvas-top"
//               data-bs-scroll="true"
//               tabIndex="-1"
//               id="offcanvasWithBothOptions"
//               aria-labelledby="offcanvasWithBothOptionsLabel"
//             >
//               <div className="offcanvas-header">
//                 <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
//                   Search
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="offcanvas"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="offcanvas-body">
//                 <p>Try scrolling the rest of the page to see this option in action.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;




// import React, { useState, useEffect } from "react";
// import { PiSignInBold } from "react-icons/pi";
// import { IoSearch } from "react-icons/io5";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { CgLogOut } from "react-icons/cg";
// import { useSelector, useDispatch } from "react-redux";
// import { signout } from "../../api";
// import { resetUser } from "../../store/userSlice";

// const Navbar = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [showCross, setShowCross] = useState(false);
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.user.auth);

//   const handleSignout = async () => {
//     await signout();
//     const userAuth = localStorage.getItem("userAuth");
//     if (userAuth) {
//       dispatch(resetUser());
//       localStorage.removeItem("userAuth");
//     }
//   };

//   const handleRegister = () => {
//     window.location.href = "/signup";
//   };

//   const handleSymptoms = () => {
//     window.location.href = "/symptoms";
//   };

//   const handleSignIn = () => {
//     window.location.href = "/signin";
//   };

//   useEffect(() => {
//     if (dropdownVisible) {
//       const timer = setTimeout(() => setShowCross(true), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setShowCross(false);
//     }
//   }, [dropdownVisible]);

//   const handleNav = () => {
//     if (window.innerWidth <= 768) {
//       setDropdownVisible(!dropdownVisible);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center font-sans py-4">
//       <div className="nav-body bg-white h-[65px] w-full max-w-[1200px] rounded-3xl shadow-lg flex items-center px-4 sm:px-6">
//         <div className="flex items-center w-full relative">
//           {/* Left Section: Menu Icon (Mobile) and Navigation Links (Desktop) */}
//           <div className="flex items-center">
//             <div className="hidden max-md:block">
//               <FontAwesomeIcon
//                 icon={dropdownVisible ? faTimes : faBars}
//                 className={`text-teal-600 text-3xl cursor-pointer transition-transform duration-300 ${showCross ? "rotate-180 fixed top-10 left-10 z-50" : ""}`}
//                 onClick={handleNav}
//               />
//             </div>
//             <div
//               className={`hidden md:flex items-center space-x-4 max-md:fixed max-md:top-0 max-md:left-[-100%] max-md:w-full max-md:h-screen max-md:bg-[#f5f6fe] max-md:pt-24 max-md:flex-col max-md:items-center max-md:transition-all max-md:duration-700 max-md:z-40 ${dropdownVisible ? "max-md:left-0" : ""}`}
//             >
//               {/* Doctors Dropdown */}
//               <div className="relative group">
//                 <button className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2">
//                   Doctors
//                 </button>
//                 <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-50">
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                     Find doctor by specialty
//                   </a>
//                   <div className="relative group/sub">
//                     <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                       Dermatologist
//                     </button>
//                     <div className="absolute left-full top-0 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover/sub:opacity-100 group-hover/sub:visible invisible transition-all duration-300">
//                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                         Dermatologist in Lahore
//                       </a>
//                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                         Dermatologist in Islamabad
//                       </a>
//                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                         Dermatologist in Karachi
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative group/sub">
//                     <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                       Gynecologist
//                     </button>
//                     <div className="absolute left-full top-0 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover/sub:opacity-100 group-hover/sub:visible invisible transition-all duration-300">
//                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                         Gynecologist in Lahore
//                       </a>
//                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                         Gynecologist in Islamabad
//                       </a>
//                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                         Gynecologist in Karachi
//                       </a>
//                     </div>
//                   </div>
//                   <div className="relative group/sub">
//                     <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                       Neurologist
//                     </button>
//                     <div className="absolute left-full top-0 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover/sub:opacity-100 group-hover/sub:visible invisible transition-all duration-300">
//                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                         Neurologist in Lahore
//                       </a>
//                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                         Neurologist in Islamabad
//                       </a>
//                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                         Neurologist in Karachi
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Organizations Dropdown */}
//               <div className="relative group">
//                 <button className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2">
//                   Organizations
//                 </button>
//                 <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-50">
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                     Action
//                   </a>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                     Another action
//                   </a>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                     Something else here
//                   </a>
//                 </div>
//               </div>

//               {/* Clinicians Dropdown */}
//               <div className="relative group">
//                 <button className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2">
//                   Clinicians
//                 </button>
//                 <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-50">
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                     Action
//                   </a>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                     Another action
//                   </a>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">
//                     Something else here
//                   </a>
//                 </div>
//               </div>

//               {/* Talk to a Doctor Button (Mobile Only) */}
//               <div className="hidden max-md:flex justify-center mt-10">
//                 <button
//                   className="px-8 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300"
//                   onClick={handleRegister}
//                 >
//                   Talk to a doctor
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Center Section: Logo */}
//           <div className="flex-1 flex justify-center items-center absolute left-1/2 transform -translate-x-1/2">
//             <h4 className="nav-logo text-2xl font-bold bg-gradient-to-r from-[#5fefff] via-[#7b7dfe] to-[#7116df] bg-clip-text text-transparent animate-fade-in-down">
//               Telemedicine
//             </h4>
//           </div>

//           {/* Right Section: Authentication Buttons and Search */}
//           <div className="flex items-center space-x-4 ml-auto">
//             {isAuthenticated ? (
//               <div className="flex space-x-4 max-[550px]:space-x-2">
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignout}
//                 >
//                   <CgLogOut className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     Logout
//                   </span>
//                 </button>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSymptoms}
//                 >
//                   <img
//                     src="/images/icon.png"
//                     className="w-6 h-6 max-[550px]:mr-0"
//                     alt="AI Search"
//                   />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     Search with AI
//                   </span>
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <button
//                   className="flex items-center px-3 py-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//                   onClick={handleSignIn}
//                 >
//                   <PiSignInBold className="text-teal-600 text-xl max-[550px]:mr-0" />
//                   <span className="max-[550px]:hidden ml-1 text-gray-700 font-medium">
//                     Sign in
//                   </span>
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 max-md:hidden"
//                   onClick={handleRegister}
//                 >
//                   Register now
//                 </button>
//               </>
//             )}
//             <button
//               className="p-2 rounded-full hover:bg-teal-100 transition-colors duration-300"
//               data-bs-toggle="offcanvas"
//               data-bs-target="#offcanvasWithBothOptions"
//               aria-controls="offcanvasWithBothOptions"
//             >
//               <IoSearch className="text-teal-600 text-xl" />
//             </button>
//             <div
//               className="offcanvas offcanvas-top"
//               data-bs-scroll="true"
//               tabIndex="-1"
//               id="offcanvasWithBothOptions"
//               aria-labelledby="offcanvasWithBothOptionsLabel"
//             >
//               <div className="offcanvas-header">
//                 <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
//                   Search
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="offcanvas"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="offcanvas-body">
//                 <p>Try scrolling the rest of the page to see this option in action.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;




// import React,{useState,useEffect} from "react";
// import "./index.css";
// import { PiSignInBold } from "react-icons/pi";
// import { IoSearch } from "react-icons/io5";
// import { IoMenu } from "react-icons/io5";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faBars,faTimes  } from '@fortawesome/free-solid-svg-icons'
// import { CgLogOut } from "react-icons/cg";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { signout } from "../../api";
// import { resetUser } from "../../store/userSlice";


// const Navbar = () => {
//     const [dropdownVisible, setDropdownVisible] = useState(false);
//     const [showCross, setShowCross] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

//     const dispatch = useDispatch();
//     const handleSignout = async() => {
//       await signout();
//       const userAuth = localStorage.getItem("userAuth");
//       if(userAuth){
//         dispatch(resetUser());
//         localStorage.removeItem("userAuth")
//       }
//     }

//     const isAuthenticated = useSelector(state => state.user.auth);
//   const handleRegister = () => {
//     window.location.href = "/signup";
//   };
//   const handleSymptoms = () => {
//     window.location.href = "/symptoms";
//   };

//   const handleSignIn = () => {
//     window.location.href = "/signin";
//   };

//     useEffect(() => {

//     // Cleanup interval when component unmounts
//       if (dropdownVisible) {
//         // Delay showing the cross icon by 1 second (1000ms)
//         const timer = setTimeout(() => {
//           setShowCross(true);
//         }, 1000); // Adjust the timeout value as needed (1 second delay)
//         return () => clearTimeout(timer); // Cleanup on unmount
//       } else {
//         setShowCross(false); // Hide the cross icon when dropdown is closed
//       }

//     }, [dropdownVisible]);
//     const handleNav = () => {
//       if (window.innerWidth <= 768) { // Check for mobile view
//         setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
//       }
//     };
//   return (
//     <div>
//       <div className="nav-container">
//         <div className="nav-body">
//           <div className="nav-data">
//             <div className="nav-dropdowns">
//                 <div className="nav-offcanvas">
//                 <FontAwesomeIcon  icon={dropdownVisible ? faTimes : faBars} className={`menu-icon ${showCross ? "menu-icon1" : ""}`} onClick={handleNav} />
//                 </div>
//               <div className={`dropdowns ${dropdownVisible ? "show" : ""}`}>
//               <div className="dropdown">
//                 <button
//                   className="btn dropdown-toggle"
//                   type="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Doctors
//                 </button>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <span className="dropdown-item">
//                       Find doctor by specialty
//                     </span>
//                   </li>
//                   <li className="dropdown-submenu">
//                     <button
//                       className="btn btn-primary dropdown-toggle"
//                       type="button"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       Dermatologist
//                     </button>
//                     <ul className="dropdown-menu">
//                       <li>
//                         <a className="dropdown-item" href="#">
//                           Dermatologist in Lahore
//                         </a>
//                       </li>
//                       <li>
//                         <a className="dropdown-item" href="#">
//                           Dermatologist in Islamabad
//                         </a>
//                       </li>
//                       <li>
//                         <a className="dropdown-item" href="#">
//                           Dermatologist in Karachi
//                         </a>
//                       </li>
//                     </ul>
//                   </li>
//                   <li className="dropdown-submenu">
//                     <button
//                       className="btn btn-primary dropdown-toggle"
//                       type="button"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       Gynecologist
//                     </button>
//                     <ul className="dropdown-menu">
//                       <li>
//                         <a className="dropdown-item" href="#">
//                           Gynecologist in Lahore
//                         </a>
//                       </li>
//                       <li>
//                         <a className="dropdown-item" href="#">
//                           Gynecologist in Islamabad
//                         </a>
//                       </li>
//                       <li>
//                         <a className="dropdown-item" href="#">
//                           Gynecologist in Karachi
//                         </a>
//                       </li>
//                     </ul>
//                   </li>
//                   <li className="dropdown-submenu">
//                     <button
//                       className="btn btn-primary dropdown-toggle"
//                       type="button"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       Neurologist
//                     </button>
//                     <ul className="dropdown-menu">
//                       <li>
//                         <a className="dropdown-item" href="#">
//                           Neurologist in Lahore
//                         </a>
//                       </li>
//                       <li>
//                         <a className="dropdown-item" href="#">
//                           Neurologist in Islamabad
//                         </a>
//                       </li>
//                       <li>
//                         <a className="dropdown-item" href="#">
//                           Neurologist in Karachi
//                         </a>
//                       </li>
//                     </ul>
//                   </li>
//                 </ul>
//               </div>
//               <div class="dropdown">
//                 <button
//                   class="btn dropdown-toggle"
//                   type="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Organizations
//                 </button>
//                 <ul class="dropdown-menu">
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Action
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Another action
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <div class="dropdown">
//                 <button
//                   class="btn dropdown-toggle"
//                   type="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Clinicians
//                 </button>
//                 <ul class="dropdown-menu">
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Action
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Another action
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <div className="nav-sign">
//                 <button className="nav-register nav-register1" onClick={handleRegister}>Talk to a doctor</button>
//               </div>
//               </div>
             
//             </div>

//             <div className={`nav-logo-div ${isAuthenticated ? 'authenticated' : 'unauthenticated'}`}>
//               <h4 className="nav-logo">Telemedicine</h4>
//             </div>
//             <div className="nav-functions">
//               {isAuthenticated ? (
//                 // Render Logout button when logged in
//                  <div className="nav-sign nav-sign3">
//                  <button className="nav-logout" onClick={handleSignout}>
//                     <CgLogOut className="logout-icon nav-signin-logo" />
//                     <span className="logout-text">Logout</span>
//                   </button>
//                   <button className="nav-logout" onClick={handleSymptoms}>
//                     <img src="/images/generative.png" className="logout-icon nav-signin-logo ai-icon" />
//                     <span className="logout-text">Search with AI</span>
//                   </button>

//                </div>
//               ) : (
               
//                 // Render Sign in and Register buttons when not logged in
//                 <>
//                   <a
//                     className="nav-sign nav-sign1"
//                     style={{ color: "#000", textDecoration: "none" }}
//                     onClick={handleSignIn}
//                   >
//                     <span className="nav-signin-logo">
//                       <PiSignInBold />
//                     </span>{" "}
//                     Sign in
//                   </a>
//                   <div className="nav-sign">
//                     <button className="nav-register" onClick={handleRegister}>
//                       Register now
//                     </button>
//                   </div>
//                 </>
//               )}
//               <div className="nav-sign nav-sign2">
//                 <button
//                   className="btn nav-search"
//                   style={{ fontSize: "20px" }}
//                   type="button"
//                   data-bs-toggle="offcanvas"
//                   data-bs-target="#offcanvasWithBothOptions"
//                   aria-controls="offcanvasWithBothOptions"
//                 >
//                   <IoSearch />
//                 </button>

//                 <div
//                   className="offcanvas offcanvas-top"
//                   data-bs-scroll="true"
//                   tabIndex="-1"
//                   id="offcanvasWithBothOptions"
//                   aria-labelledby="offcanvasWithBothOptionsLabel"
//                 >
//                   <div className="offcanvas-header">
//                     <h5
//                       className="offcanvas-title"
//                       id="offcanvasWithBothOptionsLabel"
//                     >
//                       Backdrop with scrolling
//                     </h5>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       data-bs-dismiss="offcanvas"
//                       aria-label="Close"
//                     ></button>
//                   </div>
//                   <div className="offcanvas-body">
//                     <p>
//                       Try scrolling the rest of the page to see this option in
//                       action.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
