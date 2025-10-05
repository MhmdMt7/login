import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import car from "../assets/car.jpg"; //
import logo from "../assets/logo.png"; //
import { loader } from "../store";

export default function LoginPage() {
  const {  openLoader, closeLoader } = loader();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    let domain = "http://82.112.241.233:1993";
    let endPoint = "/api/auth/local";
    let url = domain + endPoint;
    let data = {
      identifier: values.email,
      password: values.password,
    };

    openLoader();

    axios
      .post(url, data)
      .then((res) => {
        sessionStorage.setItem("jwt", res.data.jwt);
        setTimeout(() => {
          toast.success("Success Login");
          closeLoader();
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data.error.message);
      });
  };

  return (
    <section className="flex w-full h-screen bg-[#111418]">
      {/* Left side with image */}
      <div
        className="w-[35%] h-full bg-cover bg-center relative flex flex-col  p-8 text-white"
        style={{ backgroundImage: `url(${car})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* المحتوى فوق الـ overlay */}
        <div className="relative z-10 flex flex-col h-full gap-10 p-5 ">
          <img src={logo} alt="logo" className="w-28" />
          <div className="">
            <h1 className="text-3xl font-bold">Welcome,</h1>
            <p className="text-2xl">We are glad to see you again!</p>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-[75%] flex items-center justify-center px-8">
        <div className="w-full max-w-md bg-[#111418] p-8 rounded-xl shadow-lg">
          <p className="text-gray-400 text-sm text-right">
            Not a member?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>

          <h1 className="text-2xl font-bold text-white mt-2 mb-6">
            Log In to Your Account
          </h1>

          {/* Social login */}
          <div className="flex gap-2 mb-6">
            <button className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
              <span className="bg-white text-blue-600 rounded px-2 font-bold">
                G
              </span>
              Log in with Google
            </button>
            <button className="flex items-center justify-center w-12 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition">
              
            </button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="h-px bg-gray-700 flex-grow"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="h-px bg-gray-700 flex-grow"></div>
          </div>

          {/* Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border rounded px-3 py-2 bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Your Email"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border rounded px-3 py-2 bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition mt-2"
              >
                Log in
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
}
