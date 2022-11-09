import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../Shared/Spinner/Spinner";
import { Link, useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();

  const { isLoading, data, isError } = useQuery(["all-services"], () => {
    return axios.get(`http://localhost:5000/service/${id}`);
  });

  if (!!isLoading) return <Spinner />;

  if (!!isError) return "error";

  const {
    _id,
    serviceName,
    imageURL,
    price,
    description,
    rating,
    date_updated,
  } = data.data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] p-10 gap-10 min-h-screen">
      <div className="order-2 lg:order-1">
        <h1 className="text-4xl font-bold tracking-wider">{serviceName}</h1>
        <span>{rating && rating}</span> <br />
        <span>Last Updated: {date_updated && date_updated}</span>
        <h2 className="text-2xl font-semibold tracking-wider my-3">
          What I Offer
        </h2>
        <p>{description}</p>
      </div>
      <div className="order-1 lg:order-2">
        <img src={imageURL} className="w-full" alt="" />
        <h6 className="my-4 text-xl font-medium tracking-wide">
          Service charge: ${price}
        </h6>
        <Link>
          <button className="btn-success py-3 w-full rounded-md font-semibold">Book Service</button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetails;
