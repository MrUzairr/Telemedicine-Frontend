import React from "react";
import ReactStars from "react-rating-stars-component";
import { useTranslation } from "../../context/provider/TranslationContext";

const reviews = [
  {
    nameKey: "reviews.review1.name",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    textKey: "reviews.review1.text",
  },
  {
    nameKey: "reviews.review2.name",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    textKey: "reviews.review2.text",
  },
  {
    nameKey: "reviews.review3.name",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4.5,
    textKey: "reviews.review3.text",
  },
];

const ReviewSection = () => {
  const { t, language } = useTranslation();

  return (
    <section className={`py-24 bg-gray-50 ${language === "ar" ? "rtl" : "ltr"}`}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          {t("reviews.title")}
        </h2>
        <p className="text-gray-600 text-lg">{t("reviews.subtitle")}</p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
            >
              <img
                src={review.image}
                alt={t(review.nameKey)}
                className="w-20 h-20 object-cover rounded-full shadow-md mb-4"
              />
              <h5 className="text-lg font-semibold text-gray-900">
                {t(review.nameKey)}
              </h5>

              <div className="mt-2 flex items-center space-x-2">
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={24}
                  isHalf={true}
                  edit={false}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#facc15"
                />
                <span className="text-sm font-medium text-yellow-600">
                  {review.rating.toFixed(1)}
                </span>
              </div>

              <p className="text-gray-600 text-sm mt-4 text-center leading-relaxed">
                “{t(review.textKey)}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;









// import ReactStars from "react-rating-stars-component";

// const reviews = [
//   {
//     name: "Dr. Ayesha Khan",
//     image: "https://randomuser.me/api/portraits/women/44.jpg",
//     rating: 5,
//     text: "Amazing telemedicine experience! Booking and consulting were seamless and fast.",
//   },
//   {
//     name: "Ali Raza",
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//     rating: 4,
//     text: "I love how easy it was to speak to a specialist without waiting in a queue.",
//   },
//   {
//     name: "Sana Malik",
//     image: "https://randomuser.me/api/portraits/women/65.jpg",
//     rating: 4.5,
//     text: "Efficient and user-friendly platform. Highly recommended for quick consultations.",
//   },
// ];

// const ReviewSection = () => {
//   return (
//     <section className="py-24 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 text-center">
//         <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Our Customers Love Us</h2>
//         <p className="text-gray-600 text-lg">
//           Hear from our happy clients who trust our telemedicine platform.
//         </p>

//         <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {reviews.map((review, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
//             >
//               <img
//                 src={review.image}
//                 alt={review.name}
//                 className="w-20 h-20 object-cover rounded-full shadow-md mb-4"
//               />
//               <h5 className="text-lg font-semibold text-gray-900">{review.name}</h5>

//               <div className="mt-2 flex items-center space-x-2">
//                 <ReactStars
//                   count={5}
//                   value={review.rating}
//                   size={24}
//                   isHalf={true}
//                   edit={false}
//                   emptyIcon={<i className="far fa-star"></i>}
//                   halfIcon={<i className="fa fa-star-half-alt"></i>}
//                   fullIcon={<i className="fa fa-star"></i>}
//                   activeColor="#facc15" // yellow-400
//                 />
//                 <span className="text-sm font-medium text-yellow-600">{review.rating.toFixed(1)}</span>
//               </div>

//               <p className="text-gray-600 text-sm mt-4 text-center leading-relaxed">
//                 “{review.text}”
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewSection;







// import ReactStars from "react-rating-stars-component";

// const ReviewSection = () => {
//   const reviews = [1, 2, 3];
//   return (
//     <div className="home-body-review">
//       <div className="home-body-review-heading">
//         <h2>Our Customers love us</h2>
//         <p>Check out the reviews from our satisfied customers</p>
//       </div>
//       <div className="home-body-review-card">
//         {reviews.map((_, index) => (
//           <div className="home-body-review-card-data" key={index}>
//             <ReactStars
//               count={5}
//               value={4.5}
//               size={32}
//               isHalf={true}
//               emptyIcon={<i className="far fa-star"></i>}
//               halfIcon={<i className="fa fa-star-half-alt"></i>}
//               fullIcon={<i className="fa fa-star"></i>}
//               activeColor="#ffd700"
//             />
//             <p>
//               "Great platform, very efficient and works really well on both phone and web..."
//             </p>
//             <img src="doctor-card-pic.jpg" alt="review" />
//             <h5>Umar</h5>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default ReviewSection;
