import { Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ServiceCard = ({
  service: { _id, serviceName, imageURL, price, description },
}) => {
  return (
    <div className="card card-compact bg-base-100 shadow-md rounded-md">
      <PhotoProvider>
        <PhotoView src={imageURL}>
          <figure>
            <img
              src={imageURL}
              alt="Shoes"
              className="h-[250px] w-full object-cover"
            />
          </figure>
        </PhotoView>
      </PhotoProvider>
      <div className="card-body">
        <h2 className="card-title border-b-2 border-base-200 pb-2">
          {serviceName}
        </h2>
        <span>Service Charge: ${price}</span>
        <p>{description.slice(0, 100)}...</p>
        <div className="card-actions justify-end mt-5">
          <Link
            to={`/service/${_id}`}
            className="btn-success hover:bg-emerald-600 transition-all  font-medium py-1 px-4 rounded-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
