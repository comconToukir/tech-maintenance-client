import axios from "axios";
import { useState } from "react";
import {
  useQueryClient
} from '@tanstack/react-query'
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlinePicture } from "react-icons/ai";

const axiosHeader = {
  headers: { "Content-Type": "application/json" },
};

const AddService = () => {
  const [previewSource, setPreviewSource] = useState("");

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleImageChange = (event) => {
    const image = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onSubmit = (data) => {
    const imageString = previewSource;
    const serviceName = data.serviceName;
    const price = data.price;
    const description = data.description;

    const formData = {
      imageString,
      serviceName,
      price,
      description,
    };

    axios
      .post("http://localhost:5000/add-service", { formData }, axiosHeader)
      .then((res) => {
        toast.success("Successfully added the new service.");
        setPreviewSource("")
        reset();
        queryClient.invalidateQueries({ queryKey: ['three-services'] });
      })
      .catch((err) => console.error(err))
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control grid grid-cols-1 lg:grid-cols-2">
        <div className="p-10">
          <div className="mb-7 border border-accent">
            {previewSource ? (
              <img src={previewSource} alt="preview" />
            ) : (
              <AiOutlinePicture className="h-16 w-16 m-10" />
            )}
          </div>
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            aria-label="upload photo"
            required
          />
          {errors?.image?.type === "required" && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>
        <div className="p-10">
          <label className="label">
            <span className="label-text">Service name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-md h-9 rounded-sm"
            placeholder="name"
            aria-label="name"
            {...register("serviceName", {
              required: true,
            })}
          />
          {errors?.serviceName?.type === "required" && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="label">
            <span className="label-text">Service price</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full max-w-md h-9 rounded-sm"
            placeholder="price"
            aria-label="price"
            {...register("price", {
              required: true,
            })}
          />
          {errors?.price?.type === "required" && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="label">
            <span className="label-text">Service description</span>
          </label>
          <textarea
            rows="4"
            type="number"
            className="input input-bordered w-full max-w-md h-36 rounded-sm"
            placeholder="description"
            aria-label="description"
            {...register("description", {
              required: true,
            })}
          />
          {errors?.description?.type === "required" && (
            <p className="text-red-500">This field is required</p>
          )}
          <input
            type="submit"
            className="btn btn-outline w-full max-w-md cursor-pointer mt-9 rounded-sm"
            value="Submit"
            aria-label="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default AddService;
