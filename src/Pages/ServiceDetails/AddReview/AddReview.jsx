import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Spinner from "../../Shared/Spinner/Spinner";
import { useContext } from "react";
import { UserContext } from "./../../../Contexts/UserContext";
import toast from "react-hot-toast";

const AddReview = ({ id }) => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const postReview = (reviewData) =>
    axios.post(`http://localhost:5000/reviews/${id}`, reviewData);

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
    const userPhoto = user.photoURL;

    const doc = { review, rating, email, userPhoto };

    mutation.mutate(doc);
  };

  return (
    <>
      {user ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="rating mt-5">
            <input
              type="radio"
              name="rating-2"
              value="1"
              className="mask mask-star-2 bg-orange-400"
              {...register("reviewRating", {
                required: true,
              })}
            />
            <input
              type="radio"
              name="rating-2"
              value="2"
              className="mask mask-star-2 bg-orange-400"
              {...register("reviewRating", {
                required: true,
              })}
            />
            <input
              type="radio"
              name="rating-2"
              value="3"
              className="mask mask-star-2 bg-orange-400"
              {...register("reviewRating", {
                required: true,
              })}
            />
            <input
              type="radio"
              name="rating-2"
              value="4"
              className="mask mask-star-2 bg-orange-400"
              {...register("reviewRating", {
                required: true,
              })}
            />
            <input
              type="radio"
              name="rating-2"
              value="5"
              className="mask mask-star-2 bg-orange-400"
              {...register("reviewRating", {
                required: true,
              })}
            />
            <span className="ml-3 text-sm">(Add Rating)</span>
            <br />
          </div>
          {errors?.reviewRating?.type === "required" && (
            <p className="text-red-500 mt-2">Please give a rating</p>
          )}
          <textarea
            name=""
            className="input input-bordered w-full max-w-md h-24 mt-5 rounded-sm"
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
        <h2 className="p-3 my-3 bg-base-300 rounded-md">Please log in to add review</h2>
      )}
    </>
  );
};

export default AddReview;
