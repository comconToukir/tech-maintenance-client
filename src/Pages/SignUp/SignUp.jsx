import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

import {
  createUser,
  signInWithGooglePopup,
  updateUserProfile,
} from "../../utils/firebase.utils";
import { UserContext } from "../../Contexts/UserContext";
import MetaData from "../../Layout/MetaData";

const SignUp = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(UserContext);

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleUpdateProfile = (profile) => {
    updateUserProfile(profile)
      .then(() => toast.success("Welcome to Tech Maintenance"))
      .then(() => {
        reset();
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
      .then(() => handleUpdateProfile({ displayName, photoURL }))
      .catch((error) => {
        toast.error(error.code);
        console.error(error);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGooglePopup().then(() => {
      navigate(from);
    });
  };

  return (
    <>
      <MetaData title="Sign Up" />

      <div className="my-20 px-4 py-6 bg-base-300 max-w-md mx-auto rounded-md shadow-sm">
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
              <p className="text-red-500">
                Please provide a valid email address
              </p>
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
              <p className="text-red-500">
                Password must be 6 characters long.
              </p>
            )}
            <input
              className="btn btn-outline capitalize font-semibold py-3 mt-7 rounded-md cursor-pointer"
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
        <div className="flex flex-col justify-center items-center mt-5">
          <FaGoogle
            onClick={handleGoogleSignIn}
            className="bg-base-100 text-white w-10 h-10 p-2 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
