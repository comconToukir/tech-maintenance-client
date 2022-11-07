import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

import { createUser, updateUserProfile } from "../../utils/firebase.utils";
import { UserContext } from "../../Contexts/UserContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(UserContext);

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateProfile = (profile) => {
    updateUserProfile(profile)
      .then(() => {
        navigate(from);
      })
      .catch((error) => console.error(error));
  };

  const onSubmit = (data) => {
    const displayName = data.name;
    const photoURL = data.photoURL;
    const email = data.email;
    const password = data.password;

    setLoading(true);

    createUser(email, password)
      .then((result) => {
        handleUpdateProfile({ displayName, photoURL });
        toast.success("Please verify your email address before continuing.");
      })
      .catch((error) => {
        toast.error(error.code);
        console.error(error);
      });
  };

  return (
    <div className="mt-20 px-4 py-6 bg-base-300 max-w-md mx-auto rounded-md shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your name</span>
          </label>
          <input
            type="text"
            placeholder="Your full name"
            className="input input-bordered w-full max-w-md h-9 rounded-sm"
            {...register("name", {
              required: true,
              maxLength: 30,
              pattern: /^[A-Za-z]/,
            })}
          />
          {errors?.name?.type === "required" && (
            <p className="text-red-500">This field is required</p>
          )}
          {errors?.name?.type === "maxLength" && (
            <p className="text-red-500">
              First name cannot exceed 30 characters
            </p>
          )}
          {errors?.name?.type === "pattern" && (
            <p className="text-red-500">Alphabetical characters only</p>
          )}
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            placeholder="Your photo url"
            className="input input-bordered w-full max-w-md h-9 rounded-sm"
            {...register("photoURL", {
              required: true,
            })}
          />
          {errors?.photoURL?.type === "required" && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Your email address"
            className="input input-bordered w-full max-w-md h-9 rounded-sm"
            {...register("email", {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-500">This field is required</p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className="text-red-500">Please provide a valid email address</p>
          )}
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Your password"
            className="input input-bordered w-full max-w-md h-9 rounded-sm"
            {...register("password", {
              required: true,
            })}
          />
          {errors?.password?.type === "required" && (
            <p className="text-red-500">This field is required</p>
          )}
          {errors?.password?.length < 6 && (
            <p className="text-red-500">Password must be 6 characters long.</p>
          )}
          <input
            className="btn-outline capitalize font-semibold py-3 mt-7 rounded-md cursor-pointer"
            type="submit"
            value="Sign up"
            aria-label="submit"
          />
        </div>
      </form>
      <p className="text-center mt-3">
        Already have an account?{" "}
        <Link className="link" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
