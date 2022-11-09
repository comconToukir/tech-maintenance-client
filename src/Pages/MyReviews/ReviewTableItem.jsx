import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import RatingStars from "../Shared/RatingStars/RatingStars";

const ReviewTableItem = ({
  reviewData: { serviceName, serviceId, review, updatedDate, _id, rating },
  idx,
  setEditModal,
  setDeleteModal,
}) => {
  const handleEditModal = () => {
    setEditModal((editModal) => ({
      ...editModal,
      showEditModal: true,
      editModalData: {
        id: _id,
        review,
        rating,
      },
    }));
  };

  const handleDeleteModal = () => {
    setDeleteModal((deleteModal) => ({
      ...deleteModal,
      showDeleteModal: true,
      deleteModalData: {
        id: _id,
      },
    }));
  };

  const ratingDumArr = new Array(5).fill();

  return (
    <tr className="h-auto">
      <td>{idx}</td>
      <td className="max-w-xs whitespace-normal">
        <Link className="link" to={`/service/${serviceId}`}>
          {serviceName}
        </Link>
      </td>
      <td>
        <div className="rating rating-xs">
          {ratingDumArr.map((_, i) => (
            <RatingStars key={i} rating={rating} idx={i + 1} />
          ))}
        </div>
      </td>
      <td className="max-w-md">
        <p className="overflow-ellipsis whitespace-normal">{review}</p>
      </td>
      <td className="whitespace-normal">{updatedDate.split("T").join(" ")}</td>
      <td>
        <div className="flex gap-7">
          <FaEdit
            onClick={handleEditModal}
            className="p-2 h-9 w-9 bg-base-200 hover:bg-base-300 cursor-pointer rounded-md"
          />
          <FaTrashAlt
            onClick={handleDeleteModal}
            className="p-2 h-9 w-9 bg-base-200 hover:bg-base-300 cursor-pointer rounded-md"
          />
        </div>
      </td>
    </tr>
  );
};

export default ReviewTableItem;
