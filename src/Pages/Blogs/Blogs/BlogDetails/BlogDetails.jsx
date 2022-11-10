import { useLocation } from "react-router-dom";
import MetaData from "../../../../Layout/MetaData";

const BlogDetails = () => {
  const {
    state: { title, imageURL, blogData },
  } = useLocation();

  return (
    <>
      <MetaData title={title} />
      <div className="p-10">
        <img src={imageURL} className="w-full max-w-screen-md mx-auto" alt="" />
        <div className="lg:px-24 md:px-12 py-10">

        <h1 className="text-4xl font-bold mb-10 text-center max-w-screen-md mx-auto">{title}</h1>
        <p className="whitespace-pre-line leading-7">{blogData}</p>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
