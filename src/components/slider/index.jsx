import React, { useEffect } from "react";
import Slider from "react-slick"; // ✅ Correct import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "../../context/provider/TranslationContext";

const ImageSlider = () => {
  const { t, language, changeLanguage } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage && storedLanguage !== language) {
      changeLanguage(storedLanguage);
    } else if (!storedLanguage) {
      localStorage.setItem("selectedLanguage", "en");
      changeLanguage("en");
    }
  }, [changeLanguage, language]);
  console.log(t("slider.slide1.title"));
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const slides = [
    {
      image: "https://images.pexels.com/photos/8376275/pexels-photo-8376275.jpeg?auto=compress&cs=tinysrgb&w=800",
      titleKey: "slider.slide1.title",
      descriptionKey: "slider.slide1.description",
    },
    {
      image: "https://images.pexels.com/photos/6129680/pexels-photo-6129680.jpeg?auto=compress&cs=tinysrgb&w=800",
      titleKey: "slider.slide2.title",
      descriptionKey: "slider.slide2.description",
    },
    {
      image: "https://images.pexels.com/photos/5998476/pexels-photo-5998476.jpeg?auto=compress&cs=tinysrgb&w=800",
      titleKey: "slider.slide3.title",
      descriptionKey: "slider.slide3.description",
    },
    {
      image: "https://images.pexels.com/photos/8460156/pexels-photo-8460156.jpeg?auto=compress&cs=tinysrgb&w=800",
      titleKey: "slider.slide4.title",
      descriptionKey: "slider.slide4.description",
    },
    {
      image: "https://images.pexels.com/photos/8867237/pexels-photo-8867237.jpeg?auto=compress&cs=tinysrgb&w=800",
      titleKey: "slider.slide5.title",
      descriptionKey: "slider.slide5.description",
    },
  ];

  return (
    <div className={`w-11/12 mx-auto my-10 ${language === "ar" ? "rtl" : "ltr"}`}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="px-3">
            <img
              src={slide.image}
              alt={t(slide.titleKey)}
              className="w-full h-72 object-cover rounded-lg shadow-md"
            />
            <h3 className="mt-3 text-xl font-semibold text-center">{t(slide.titleKey)}</h3>
            <p className="text-gray-600 text-center">{t(slide.descriptionKey)}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;






// import React from "react";
// import ReactCardSlider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const slides = [
//   {
//     image: "https://images.pexels.com/photos/8376275/pexels-photo-8376275.jpeg?auto=compress&cs=tinysrgb&w=800",
//     title: "Online Health Consultation",
//     description: "Doctor talking to a patient via video call.",
//   },
//   {
//     image: "https://images.pexels.com/photos/6129680/pexels-photo-6129680.jpeg?auto=compress&cs=tinysrgb&w=800",
//     title: "Medical Discussion",
//     description: "Medical team collaborating virtually.",
//   },
//   {
//     image: "https://images.pexels.com/photos/5998476/pexels-photo-5998476.jpeg?auto=compress&cs=tinysrgb&w=800",
//     title: "Telemedicine Setup",
//     description: "Doctor preparing for online appointment.",
//   },
//   {
//     image: "https://images.pexels.com/photos/8460156/pexels-photo-8460156.jpeg?auto=compress&cs=tinysrgb&w=800",
//     title: "Nurse Monitoring",
//     description: "Remote health monitoring and data input.",
//   },
//   {
//     image: "https://images.pexels.com/photos/8867237/pexels-photo-8867237.jpeg?auto=compress&cs=tinysrgb&w=800",
//     title: "E-Health System",
//     description: "Modern software interface for patients.",
//   },
// ];
// const Slider = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="w-11/12 mx-auto my-10">
//       <ReactCardSlider {...settings}>
//         {slides.map((slide, index) => (
//           <div key={index} className="p-4">
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-72 object-cover rounded-lg shadow-md"
//             />
//             <h3 className="mt-3 text-xl font-semibold">{slide.title}</h3>
//             <p className="text-gray-600">{slide.description}</p>
//           </div>
//         ))}
//       </ReactCardSlider>
//     </div>
//   );
// };

// export default Slider;






// import React from "react";
// import ReactCardSlider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// // a slide object contains the image link, title and function/click event for when a user clicks on a card
// const slides = [
//     {image:"https://picsum.photos/200/300",title:"This is a title",description:"This is a description"},
//     {image:"https://picsum.photos/600/500",title:"This is a second title",description:"This is a second description"},
//     {image:"https://picsum.photos/700/600",title:"This is a third title",description:"This is a third description"},
//     {image:"https://picsum.photos/500/400",title:"This is a fourth title",description:"This is a fourth description"},
//     {image:"https://picsum.photos/200/300",title:"This is a fifth title",description:"This is a fifth description"},
//     {image:"https://picsum.photos/800/700",title:"This is a sixth title",description:"This is a sixth description"},
//     {image:"https://picsum.photos/300/400",title:"This is a seventh title",description:"This is a seventh description"},
// ]



// const Slider = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//   };

//   return (
//     <div style={{ width: "90%", margin: "auto" }}>
//       <ReactCardSlider {...settings}>
//         {slides.map((slide, index) => (
//           <div key={index}>
//             <img src={slide.image} alt={slide.title} style={{ width: "100%", height: 300 }} />
//             <h3>{slide.title}</h3>
//             <p>{slide.description}</p>
//           </div>
//         ))}
//       </ReactCardSlider>
//     </div>
//   );
// };

// export default Slider;

