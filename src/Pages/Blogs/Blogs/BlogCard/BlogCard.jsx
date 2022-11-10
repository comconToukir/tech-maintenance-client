import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog: { imageURL, title, blogData, _id }, blog }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/blog/${_id}`, { state: blog });

  return (
    <div onClick={handleClick} className="card bg-base-100 shadow-xl cursor-pointer">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{blogData.slice(0, 100)}...</p>
      </div>
      <figure>
        <img className="h-80 w-full object-cover" src={imageURL} alt="blog_image" />
      </figure>
    </div>
  );
};

export default BlogCard;
