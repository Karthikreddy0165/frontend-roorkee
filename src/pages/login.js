import { Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAuth } from "@/Context/AuthContext";
import loginperson from "../assets/image.png";

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  // Redirect to Signup page
  const handleCreate01Click = () => {
    router.push("/Signup");
  };

  // Handle forget password click
  const handleClickForgetPass = () => {
    router.push('/ResetEmailPassword');
  };

  // Redirect if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/App");
    }
  }, [router]);

  // Handle login API request
  const handleAfterLogin = async (values) => {
    try {
      setLoading(true);
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
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      if (result.access) {
        const user = { token: result.access, email: values.email };
        localStorage.setItem("token", result.access);
        login(result.access, user);
        router.push("/LoginSuccess");
        setTimeout(() => {
          router.push("/AllSchemes");
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

  return (
    <div className="flex h-screen overflow-hidden flex-col md:flex-row">
      {/* Left Section with Background and Information */}
      <div className="w-1/2 bg-[#FEF6F0] relative flex items-center justify-center">
        <div className="absolute top-0 text-[#000] mt-20 ml-8 mr-8">
          <h1 className="text-purple-400 font-inter italic font-bold text-3xl mb-4 w-[500px]">
            “For the Indians by the Indians”
          </h1>
          <p className="text-[#000] font-inter text-[22px] text-base font-medium w-[500px] opacity-0.4">
            Find all the details about government schemes, scholarships, and job
            openings for all states in one place.
          </p>

          {/* Background Decoration */}
          <div className="absolute w-[446.08px] h-[446.08px] rotate-[-51.369deg] flex-shrink-0 opacity-5 bg-[#DF8317] ml-[530px] mt-[-150px] z-0"></div>
          <div className="absolute w-[446.08px] h-[446.08px] rotate-[-51.369deg] flex-shrink-0 rounded-[55px] bg-[rgba(223,131,23,0.2)] ml-[230px] mt-[300px] z-0"></div>
          <div className="absolute w-[446.08px] h-[446.08px] rotate-[-51.369deg] flex-shrink-0 opacity-5 bg-[#DF8317] rounded-[55px] ml-[-340px] mt-[500px] z-0"></div>

          {/* Card Information */}
          <div className="absolute w-[266px] h-auto p-[10.8px] items-center rounded-[8.102px] border border-[#EEF] bg-[#FFF] shadow-[0px_0px_9.791px_rgba(5,2,160,0.08)] top-[305px] ml-[35px] ">
            <p className="self-stretch text-[#000] mb-[5px] font-inter text-[9.452px] font-semibold leading-normal">
              Opening for bank staff
            </p>
            <p className="self-stretch text-[#616161] font-inter text-[6.751px]  font-normal leading-normal underline">
              Welfare Department
            </p>
          </div>

          {/* Login Image */}
          <div className="absolute bottom-0 right-4 ">
            <Image
              className="z-10 image-opacity transform -scale-x-100"
              src={loginperson}
              alt="Login Person Image"
              height={477}
            />
          </div>
        </div>
      </div>

      {/* Right Section for Login Form */}
      <div className="relative w-1/2 flex items-center justify-center bg-white px-4 sm:px-8">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            setErrorMessage("");
            setLoading(true);
            await handleAfterLogin(values);
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <form className="w-full max-w-md space-y-6" onSubmit={formik.handleSubmit}>
              <button
                type="button"
                className="flex gap-[8px] mb-[24px]"
                onClick={() => router.back()}
              >
                <FaArrowLeftLong className="mt-1" />
                Back
              </button>
              <h1 className="text-2xl font-bold mb-[24px]">
                Login into your existing account
              </h1>

              {/* Email Input */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded-[8px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email.toLowerCase()}
                />
              </div>

              {/* Password Input */}
              <div className="mt-[24px] relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded-[8px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mb-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-sm flex flex-column mb-[20px]">
                <a
                  className="text-[#3431BB] hover:text-blue-700 ml-auto hover:cursor-pointer"
                  onClick={handleClickForgetPass}
                >
                  Forgot password?
                </a>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4 mt-4">
                  <div className="bg-red-100 text-red-700 py-2 px-4 rounded w-full">
                    {errorMessage}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="relative">
                <button
                  type="submit"
                  className="w-full bg-[#2B8CCF] text-white font-bold py-2 px-4 rounded-[8px]"
                  disabled={loading}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin text-xl mx-auto" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
