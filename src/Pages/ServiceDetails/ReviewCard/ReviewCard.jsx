import RatingStars from "../../Shared/RatingStars/RatingStars";

const ReviewCard = ({
  reviewData: { userPhoto, userName, rating, review, updatedDate },
}) => {
  const ratingDumArr = new Array(5).fill();

  return (
    <div className="border border-base-100 p-6 rounded-md max-w-lg mb-5 shadow-md">
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
          {ratingDumArr.map((_, i) => (
            <RatingStars key={i} rating={rating} idx={i+1} />
          ))}
        </div>
      </div>
      <p className="p-4">{review}</p>
    </div>
  );
};

export default ReviewCard;
