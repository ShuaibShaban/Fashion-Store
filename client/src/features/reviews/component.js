// import React from 'react';
// import { useSelector } from 'react-redux';

// const TestReviews = () => {
//   const reviews = useSelector(state => state.reviews.list);

//   if (reviews.length === 0) {
//     return <div>No reviews found.</div>;
//   }

//   return (
//     <div>
//       <h2>Reviews:</h2>
//       <ul>
//         {reviews.map(review => (
//           <li key={review.id}>
//             Product ID: {review.product_id}, User ID: {review.user_id}, Rating: {review.rating}, Date: {review.date}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TestReviews;