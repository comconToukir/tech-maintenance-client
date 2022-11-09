import React from "react";

const ReviewCard = ({
  reviewData: { userPhoto, userName, rating, review, updatedDate },
}) => {
  return (
    <div className="border border-base-100 p-6 rounded-md max-w-lg mb-5">
      <div className="flex gap-5 items-center">
        <img
          className="h-12 w-12 object-cover rounded-full"
          src={userPhoto}
          alt=""
        />
        <div className="flex flex-col flex-1">
          <span className="text-sm">{userName}</span>
          <span className="text-xs">{updatedDate.split("T")[0]}</span>
        </div>
        <div className="rating rating-xs">
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
            />
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
            />
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
          />
        </div>
      </div>
      <p className="p-4">{review}</p>
    </div>
  );
};

export default ReviewCard;
