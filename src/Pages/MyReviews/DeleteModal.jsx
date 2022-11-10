import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

const DeleteModal = ({ show, closeDeleteModal, reviewData }) => {
  const id = reviewData?.id;

  const queryClient = useQueryClient();

  const deleteReview = (reviewData) =>
    axios.delete(`https://service-review-server-side-omega.vercel.app/delete-review/${id}`, reviewData);

  const mutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      // Invalidate and refetch
      console.log("deleted");
      queryClient.invalidateQueries({ queryKey: [`my-reviews`] });
      toast.success("Review has been successfully deleted.");
      closeDeleteModal();
    },
  });

  const handleDelete = () => {
    console.log("delete");
    mutation.mutate();
  };

  return (
    <div
      onClick={closeDeleteModal}
      className={`fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-30 flex justify-center items-center z-20 overflow-clip ${
        !show ? "hidden" : null
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content min-w-[500px] bg-base-200 rounded-md"
      >
        <div className="modal-header p-3">
          <h1>Delete Review</h1>
        </div>
        <div className="modal-body p-4 border-t-2 border-t-base-100 border-b-2 border-b-base-100">
          <h2>Confirm deletion</h2>
          <p>Warning!!! Deleted data cannot be recovered.</p>
        </div>
        <div className="modal-footer p-3 flex justify-between">
          <button
            onClick={closeDeleteModal}
            className="btn-warning hover:bg-yellow-600 text-sm font-semibold py-2 px-4 rounded-md"
          >
            Close
          </button>

          <button
            onClick={handleDelete}
            className="btn-error hover:bg-red-500 text-sm font-semibold py-2 px-4 rounded-md flex gap-3 items-center"
          >
            <FaTrashAlt /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
