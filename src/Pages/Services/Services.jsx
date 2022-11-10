import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../Shared/Spinner/Spinner";
import ServiceCard from "../Shared/ServiceCard/ServiceCard";
import MetaData from "../../Layout/MetaData";

const Services = () => {
  const { isLoading, data, isError } = useQuery(["all-services"], () => {
    return axios.get(`https://service-review-server-side-omega.vercel.app/services`);
  });

  if (!!isLoading) return <Spinner />;

  if (!!isError) return "error";

  const services = data.data;
  
  return (
    <>
      <MetaData title="Services" />
      <div className="form-control w-full max-w-md mx-auto my-20">
        <label className="label">
          <span className="label-text">
            Anything specific you are looking for?
          </span>
          <span className="label-text-alt">Try searching</span>
        </label>
        <input
          type="search"
          placeholder="Type here"
          className="input input-bordered w-full max-w-md"
        />
        <button className="btn-success hover:bg-emerald-600 transition-all  font-medium w-min mx-auto mt-5 py-2 px-7 rounded-md">
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 p-4">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </>
  );
};

export default Services;
