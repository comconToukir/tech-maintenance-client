import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../../Shared/Spinner/Spinner";
import AddReview from "../AddReview/AddReview";
import ReviewCard from "../ReviewCard/ReviewCard";

const ServiceReviews = ({ id }) => {
  const { isLoading, data, isError } = useQuery([`reviews-${id}`], () => {
    return axios.get(`http://localhost:5000/reviews/${id}`);
  });

  if (!!isLoading) return <Spinner />;

  if (!!isError) return "error";

  const reviews = data.data;

  return (
    <div className="mt-16">
      <h2 className="text-2xl border-b-2 border-base-100 pb-3">All Reviews</h2>
      <AddReview id={id} />
      {reviews.length === 0 ? (
        "No reviews found"
      ) : (
        <>
          {reviews.map((reviewData) => (
            <ReviewCard key={reviewData._id} reviewData={reviewData} />
          ))}
        </>
      )}
    </div>
  );
};

export default ServiceReviews;
