import * as Yup from "yup";
import { Formik } from "formik";
import Image from "next/image";
import leftSide from '../assets/leftSide.jpeg'
import scheme1 from '../assets/scheme1.png'
import scheme2 from '../assets/scheme2.png'
import scheme3 from '../assets/scheme3.png'
import scheme4 from '../assets/scheme4.png'
import scheme5 from '../assets/scheme5.png'
import character1 from '../assets/character1.png'
import character2 from '../assets/character2.png'
import character3 from '../assets/character3.png'
import character4 from '../assets/character4.png'
import character5 from '../assets/character5.png'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { FaAngleRight, FaArrowLeftLong } from "react-icons/fa6";
import LoginSuccess from "@/utils/LoginSuccess";
import { useAuth } from "@/Context/AuthContext";
import DynamicCarousel from "../components/DynamicCarousel";

const login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // State to control success screen
  const { login, authState } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);



  const c1Images = [
    scheme1.src,
    scheme2.src,
    scheme3.src,
    scheme4.src,
    scheme5.src,
  ];
  
  const c2Images = [
    character1.src,
    character2.src,
    character3.src,
    character4.src,
    character5.src,
  ];
  

  

  useEffect(() => {
    if (authState.token && !showSuccess) {
      setIsRedirecting(true);
      router.replace("/").then(() => setIsRedirecting(false)); 
    }
  }, [authState.token, router]); 
  
  if (isRedirecting) {
    return null; 
  }

  const handleCreate01Click = () => {
    router.push("/Signup");
  };

  const handleClickForgetPass = () => {
    router.push("/ResetEmailPassword");
  };

  const handleAfterLogin = async (values) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: values.email,
        password: values.password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login/`,
        requestOptions
      );
      const result = await response.json();

      if (!response.ok) {
        setErrorMessage("Email or password is invalid");
        return;
      }

      // console.log("Login successful. Token received:", result.access);

      if (result.access) {
        const user = { token: result.access, email: values.email };
        localStorage.setItem("token", result.access);
        login(result.access, user); // Save token and user information to the context
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          router.replace("/AllSchemes");
        }, 2000);
      } else {
        setErrorMessage("Email or password is invalid");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Email or password is invalid");
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return <LoginSuccess />;
  }

  
  return (
    <div className="flex h-screen overflow-hidden flex-col lg:flex-row">

<div className="relative w-full lg:w-1/2 min-w-[300px] h-full min-h-screen flex items-center justify-center hidden lg:block">
  {/* Background Image */}
    <Image
      src={leftSide}
      alt="Design Background"
      className="absolute inset-0 w-full h-full object-fit"
    />
<DynamicCarousel c1Images={c1Images} c2Images={c2Images} />;
  </div>

      <div className="relative w-full h-screen lg:w-1/2 flex items-center justify-center bg-white px-4 sm:px-8 z-30">
        <Formik
          initialValues={{
            email: "", // Change username to email
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setErrorMessage("");
            setLoading(true);
            handleAfterLogin(values);
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <form
              className="w-full max-w-md space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <button
                type="button"
                className="flex gap-[8px] text-sm font-inter  items-center justify-between"
                onClick={() => router.back()}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5005 10.0003C17.5005 10.1661 17.4346 10.3251 17.3174 10.4423C17.2002 10.5595 17.0413 10.6253 16.8755 10.6253H4.63409L9.19268 15.1832C9.25075 15.2412 9.29681 15.3102 9.32824 15.386C9.35966 15.4619 9.37584 15.5432 9.37584 15.6253C9.37584 15.7075 9.35966 15.7888 9.32824 15.8647C9.29681 15.9405 9.25075 16.0095 9.19268 16.0675C9.13461 16.1256 9.06567 16.1717 8.9898 16.2031C8.91393 16.2345 8.83261 16.2507 8.75049 16.2507C8.66837 16.2507 8.58705 16.2345 8.51118 16.2031C8.43531 16.1717 8.36637 16.1256 8.3083 16.0675L2.6833 10.4425C2.62519 10.3845 2.57909 10.3156 2.54764 10.2397C2.51619 10.1638 2.5 10.0825 2.5 10.0003C2.5 9.91821 2.51619 9.83688 2.54764 9.76101C2.57909 9.68514 2.62519 9.61621 2.6833 9.55816L8.3083 3.93316C8.42558 3.81588 8.58464 3.75 8.75049 3.75C8.91634 3.75 9.0754 3.81588 9.19268 3.93316C9.30996 4.05044 9.37584 4.2095 9.37584 4.37535C9.37584 4.5412 9.30996 4.70026 9.19268 4.81753L4.63409 9.37535H16.8755C17.0413 9.37535 17.2002 9.4412 17.3174 9.55841C17.4346 9.67562 17.5005 9.83459 17.5005 10.0003Z" fill="black"/>
            </svg>

                Back
              </button>
              <p className=" text-[#2B3E80] text-2xl font-semibold"
              >Welcome Back to Empower Hub</p>


              <h1 className="block text-gray-700 text-sm sm:text-base font-medium mb-2">
              Enter your email and password to continue.
              </h1>
              <div className="">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email Id
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email" // Change type to email
                  placeholder="Enter your email address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email.toLowerCase()}
                />
                {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 text-xs" data-testid="email-error">{formik.errors.email}</p>
        ) : null}
              </div>
              <div className="mt-[24px]">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type={showPassword ? "text" : "password"} // Toggle password visibility
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />

                  <div
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    data-testid="toggle-password-visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>

                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs mt-1" data-testid="password-error">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="text-sm flex flex-column mb-[20px]">
                <a
                  className="text-[#2B3E80]  ml-auto hover:cursor-pointer font-semibold"
                  onClick={handleClickForgetPass}
                >
                  Forgot password?
                </a>
              </div>

              <div>
                <button
                  className="bg-[#F27E17] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Loading...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>

              <div className="flex flex-row sm:flex-row sm:gap-4 mt-6 gap-3">
                <h1 className="text-sm sm:text-base text-center sm:text-left font-medium">
                  Don’t have an account?{" "}
                </h1>

                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span
                    className="text-sm sm:text-base text-[#2B3E80]   font-bold cursor-pointer"
                    onClick={handleCreate01Click}
                  >
                    Create new account
                  </span>
                  <div className="text-[#3431BB]">
                    <FaAngleRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                  </div>
                </div>
              </div>
              {errorMessage && (
                <div className="mb-4 mt-4" data-test-id="login-error">
                  <button
                    className="bg-red-100 text-red-700 py-2 px-4 rounded w-full"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    {errorMessage}
                  </button>
                </div>
              )}
            </form>
          )}
        </Formik>
      </div>


    </div>
  );
};

export default login;