import { Link } from "react-router-dom";


const ServiceCard = ({
  service: { _id, serviceName, imageURL, price, description },
}) => {
  return (
    <div className="card card-compact bg-base-100 shadow-md rounded-md">
      <figure>
        <img src={imageURL} alt="Shoes" className="h-[250px] w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title border-b-2 border-base-200 pb-2">{serviceName}</h2>
        <span>Service Charge: ${price}</span>
        <p>{description.slice(0, 100)}...</p>
        <div className="card-actions justify-end mt-5">
          <Link to={`/service/${_id}`} className="btn-success hover:bg-emerald-600 transition-all  font-medium py-1 px-4 rounded-sm">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
