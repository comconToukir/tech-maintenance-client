import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import ErrorPage from "../../ErrorPage/ErrorPage";
import Spinner from './../../Shared/Spinner/Spinner';
import MetaData from "../../../Layout/MetaData";
import BlogCard from "./BlogCard/BlogCard";

const Blogs = () => {
  const { isLoading, data, isError } = useQuery(["all-blogs"], () => {
    return axios.get(`https://service-review-server-side-omega.vercel.app/blogs`);
  });

  if (!!isLoading) return <Spinner />;

  if (!!isError) return <ErrorPage />;

  const blogs = data.data;

  return (
    <>
    <MetaData title="Blogs" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">
        {
          blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)
        }
      </div>
    </>
  );
};

export default Blogs;