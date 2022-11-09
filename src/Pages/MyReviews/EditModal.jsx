import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditModal = ({ show, closeEditModal, reviewData }) => {
  const id = reviewData?.id; 

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // By default, if the 2nd parameter to axios.put() is an object, Axios serializes the object to JSON using the JSON.stringify() function. If the 2nd parameter is an object, Axios also sets the content-type header to application/json
  const editReview = (reviewData) =>
    axios.put(`http://localhost:5000/edit-review/${id}`, reviewData);

  const mutation = useMutation({
    mutationFn: editReview,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`my-reviews`] });
      reset();
      toast.success("Review has been successfully edited.");
      closeEditModal();
    },
  });

  const onSubmit = (data) => {
    const review = data.reviewText;
    const rating = data.reviewRating;

    const doc = {
      review,
      rating,
    };

    mutation.mutate(doc);
  };

  return (
    <div
      onClick={closeEditModal}
      className={`fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-30 flex justify-center items-center z-20 overflow-clip ${
        !show ? "hidden" : null
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content min-w-[500px] bg-base-200 rounded-md"
      >
        <div className="modal-header p-3">
          <h1>Edit Review</h1>
        </div>
        <div className="modal-body p-4 border-t-2 border-t-base-100 border-b-2 border-b-base-100">
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
              defaultValue={reviewData?.review}
              className="input input-bordered w-full max-w-md h-24 mt-5 p-2 rounded-sm"
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
        </div>
        <div className="modal-footer p-3">
          <button
            onClick={closeEditModal}
            className="btn-warning hover:bg-yellow-600 text-sm font-semibold py-2 px-4 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
