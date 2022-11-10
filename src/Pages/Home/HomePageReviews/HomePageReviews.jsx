import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Shared/Spinner/Spinner";
import ReviewCard from "../../ServiceDetails/ReviewCard/ReviewCard";

const HomePageReviews = () => {
  const { isLoading, data, isError } = useQuery(["three-reviews"], () => {
    return axios.get(
      `https://service-review-server-side-omega.vercel.app/reviews-limited`
    );
  });

  if (!!isError) return "error";

  const reviewData = data?.data;

  return (
    <div className=" mt-36">
      <h1 className="text-center text-4xl font-semibold tracking-wider border-b-2 border-base-100 w-3/4 md:w-1/3 p-3 mx-auto mb-5">
        Customer Reviews
      </h1>
      <p className="w-full md:w-2/3 lg:w-1/2 mx-auto text-center mb-16 px-5">
        Increase your business productivity, sales, and scalability to ensure
        significant cost benefits to your business with consistent software
        maintenance and support services. Share your business requirements and I
        will do you the rest!
      </p>
      {!!isLoading && <Spinner />}
      {reviewData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 p-4">
            {data?.data.map((review) => (
              <ReviewCard key={review._id} reviewData={review} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePageReviews;
