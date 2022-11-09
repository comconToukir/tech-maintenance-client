import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../../Shared/ServiceCard/ServiceCard";
import Spinner from "../../Shared/Spinner/Spinner";
import { Link } from "react-router-dom";

const HomePageServices = () => {
  const { isLoading, data, isError } = useQuery(["three-services"], () => {
    return axios.get(`http://localhost:5000/services-limited`);
  });

  // if (!!isLoading) return <Spinner />;

  if (!!isError) return "error";

  // console.log(data.data);

  const services = data?.data;

  return (
    <div className=" mt-36">
      <h1 className="text-center text-4xl font-semibold tracking-wider border-b-2 border-base-100 w-3/4 md:w-1/3 p-3 mx-auto mb-5">
        My Services
      </h1>
      <p className="w-full md:w-2/3 lg:w-1/2 mx-auto text-center mb-16 px-5">
        Increase your business productivity, sales, and scalability to ensure
        significant cost benefits to your business with consistent software
        maintenance and support services. Share your business requirements and I
        will do you the rest!
      </p>
      {!!isLoading && <Spinner />}
      {services && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 p-4">
            {data?.data.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>

          <div className="text-center py-16">
            <Link
              to="/services"
              className="btn-success hover:bg-emerald-600 transition-all  font-medium py-3 px-6 rounded-md"
            >
              More Services
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePageServices;
