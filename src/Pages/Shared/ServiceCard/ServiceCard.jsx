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
        <span>Service Charge: {price}</span>
        <p>{description.slice(0, 100)}...</p>
        <div className="card-actions justify-end">
          <Link className="btn-success hover:bg-emerald-700 transition-all hover:text-white font-medium py-1 px-4 rounded-md">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
