const RatingStars = ({ rating, idx }) => {
  if (parseInt(rating) === idx) {
    return (
      <input
        type="radio"
        name="rating-5"
        checked
        className="mask mask-star-2 bg-orange-400"
        disabled
      />
    );
  }

  return (
    <input
      type="radio"
      name="rating-5"
      className="mask mask-star-2 bg-orange-400"
      disabled
    />
  );
};

export default RatingStars;