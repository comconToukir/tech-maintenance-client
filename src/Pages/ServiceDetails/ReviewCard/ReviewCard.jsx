import React from 'react';

const ReviewCard = ({ reviewData }) => {
  console.log(reviewData);
  return (
    <div>
      <h1>{reviewData.review}</h1>
    </div>
  );
};

export default ReviewCard;