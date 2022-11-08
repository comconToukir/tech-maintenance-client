import { Oval } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="mt-48 w-full grid place-items-center">
      <Oval
      height={70}
      width={70}
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
    </div>
  );
};

export default Spinner;
