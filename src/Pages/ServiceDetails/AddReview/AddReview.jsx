import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useContext } from "react";
import { UserContext } from "./../../../Contexts/UserContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AddReview = ({ id, serviceName }) => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const postReview = (reviewData) =>
    axios.post(`https://service-review-server-side-omega.vercel.app/reviews/${id}`, reviewData);

  const mutation = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`reviews-${id}`] });
      reset();
      toast.success("Thank you for your valuable feedback!");
    },
  });

  const onSubmit = (data) => {
    const review = data.reviewText;
    const rating = data.reviewRating;
    const email = user.email;
    const name = user.displayName;
    const userPhoto = user.photoURL;

    const doc = {
      review,
      rating,
      email,
      userPhoto,
      name,
      serviceName,
    };

    mutation.mutate(doc);
  };

  return (
    <>
      {user ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="rating mt-5">
            {Array(5)
              .fill()
              .map((_, idx) => (
                <input
                  key={idx}
                  type="radio"
                  name="rating-2"
                  value={idx + 1}
                  className="mask mask-star-2 bg-orange-400"
                  {...register("reviewRating", {
                    required: true,
                  })}
                />
              ))}
            <span className="ml-3 text-sm">(Add Rating)</span>
            <br />
          </div>
          {errors?.reviewRating?.type === "required" && (
            <p className="text-red-500 mt-2">Please give a rating</p>
          )}
          <textarea
            name=""
            className="input input-bordered w-full max-w-md h-24 mt-5 px-3 py-2 rounded-sm"
            placeholder="write review here"
            aria-label="Write review here"
            {...register("reviewText", {
              required: true,
            })}
          ></textarea>
          {errors?.reviewText?.type === "required" && (
            <p className="text-red-500">This field is required</p>
          )}
          <br />
          <input
            type="submit"
            className="btn-success w-min py-1 px-5 mt-3 mb-7 rounded-md font-semibold hover:bg-emerald-600 transition-all"
            value="Submit Review"
            aria-label="submit"
          />
        </form>
      ) : (
        <h2 className="p-3 my-3 bg-base-300 rounded-md max-w-lg">
          Please{" "}
          <Link to="/login" className="link">
            log in
          </Link>{" "}
          to add review
        </h2>
      )}
    </>
  );
};

export default AddReview;
