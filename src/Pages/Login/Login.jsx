import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

import { signInUser, signInWithGooglePopup } from "../../utils/firebase.utils";
import { UserContext } from "../../Contexts/UserContext";
import MetaData from "../../Layout/MetaData";
import axios from "axios";
import Spinner from "../Shared/Spinner/Spinner";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, setLoading } = useContext(UserContext);

  const getCookie = (email) =>
    fetch(`http://localhost:5000/login?email=${email}`, {
      method: "GET",
      // withCredentials: true,
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Logged in successfully") {
          reset();
          toast.success("Welcome back.");
          navigate(from, { replace: true });
        }
      });

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSignIn = (data) => {
    const email = data.email;
    const password = data.password;

    setLoading(true);

    signInUser(email, password)
      .then(({ user }) => {
        const { email } = user;

        getCookie(email);
      })
      .catch((error) => {
        toast.error(error.code);
        console.error(error);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGooglePopup()
      .then(({ user }) => {
        const { email } = user;

        getCookie(email);
      })
      .then(() => {
        navigate(from, { replace: true });
      });
  };

  return (
    <>
      <MetaData title="Log In" />

      {loading ? (
        <Spinner />
      ) : (
        <div className="my-28 px-4 py-6 bg-base-300 max-w-md mx-auto rounded-md shadow-sm">
          <form onSubmit={handleSubmit(handleSignIn)}>
            <div className="form-control">
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
              <input
                className="btn btn-outline capitalize font-semibold py-3 mt-7 rounded-md cursor-pointer"
                type="submit"
                value="Login"
                aria-label="submit"
              />
            </div>
          </form>
          <p className="text-center mt-3">
            New to Tech Maintenance?{" "}
            <Link className="link" to="/sign-up">
              Sign Up
            </Link>
          </p>
          <div className="flex flex-col justify-center items-center mt-5">
            <FaGoogle
              onClick={handleGoogleSignIn}
              className="bg-base-100 text-blue-500 shadow-md w-10 h-10 p-2 rounded-full cursor-pointer"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
