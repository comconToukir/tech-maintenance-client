import { useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { UserContext } from "../../Contexts/UserContext";
import Spinner from "../Shared/Spinner/Spinner";
import ErrorPage from "../ErrorPage/ErrorPage";
import ReviewTableItem from "./ReviewTableItem";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const MyReviews = () => {
  const [editModal, setEditModal] = useState({
    showEditModal: false,
    editModalData: null,
  });

  const [deleteModal, setDeleteModal] = useState({
    showDeleteModal: false,
    deleteModalData: null,
  });

  const {
    user: { email, displayName, photoURL },
  } = useContext(UserContext);

  const { isLoading, data, isError } = useQuery(["my-reviews"], () => {
    return axios.get(`http://localhost:5000/my-reviews?email=${email}`);
  });

  if (!!isLoading) return <Spinner />;

  if (!!isError) return <ErrorPage />;

  const myReviews = data.data;

  const closeEditModal = () => {
    setEditModal((editModal) => ({...editModal, showEditModal: false}))
  }

  const closeDeleteModal = () => {
    setDeleteModal((deleteModal) => ({...deleteModal, showDeleteModal: false}))
  }

  return (
    <div className={`p-12`}>
      <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-12">
        <PhotoProvider>
          <PhotoView src={photoURL}>
            <img src={photoURL} alt="" />
          </PhotoView>
        </PhotoProvider>
        <div>
          <h2 className="text-3xl mb-5">Name: {displayName}</h2>
          <h3 className="text-xl">Email: {email}</h3>
        </div>
      </div>
      <div className="overflow-x-auto w-full mt-16">
        {myReviews.length === 0 ? (
          "You have no reviews yet."
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Service Name</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Review Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myReviews.map((review, idx) => (
                <ReviewTableItem
                  key={review._id}
                  reviewData={review}
                  idx={idx + 1}
                  setEditModal={setEditModal}
                  setDeleteModal={setDeleteModal}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <DeleteModal
        show={deleteModal.showDeleteModal}
        closeDeleteModal={closeDeleteModal}
        reviewData={deleteModal.deleteModalData}
      />
      <EditModal
        show={editModal.showEditModal}
        closeEditModal={closeEditModal}
        reviewData={editModal.editModalData}
      />
    </div>
  );
};

export default MyReviews;
