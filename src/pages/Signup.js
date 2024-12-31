import { useAuth } from "@/Context/AuthContext";
import { Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import * as Yup from "yup";

import { useFormData } from "@/Context/FormContext";
import loginperson from "../assets/image.png";
import AccCreatSucc from "@/utils/AccountCreated";  // Success component

const CreateAcc01 = () => {
  const router = useRouter();
  const { updateFormData } = useFormData();
  const { login } = useAuth();
  const [apiErrors, setApiErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSucc, setShowSucc] = useState(false);  // Use state instead of useRef
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/app");
    }
  }, [router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getErrorMessage = (formikErrors, apiErrors) => {
    const formikErrorMessages = Object.values(formikErrors).filter(Boolean);
    const apiErrorMessages = Object.values(apiErrors).filter(Boolean);
    return [...formikErrorMessages, ...apiErrorMessages].join(" ");
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login/`, requestOptions);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      if (result.access) {
        const user = { token: result.access, email: values.email };
        localStorage.setItem("token", result.access);
        login(result.access, user);

        console.log("Login successful. Token received:", result.access);

        // After successful login, show success message and navigate
        setShowSucc(true);
        setTimeout(() => {
          setShowSucc(false);
          router.push("/AllSchemes");  // Redirect after success
        }, 1500);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (showSucc) {
    return <AccCreatSucc />;  // Show success page
  }

  return (
    <div className="flex h-screen overflow-hidden -mb-6">
      <div className="w-1/2 bg-[#FEF6F0] relative flex items-center justify-center">
        {/* Background and content */}
        <div className="absolute top-0 text-[#000] mt-20 ml-8 mr-8">
          <h1 className="text-purple-400 font-inter italic font-bold text-3xl mb-4 w-[500px]">
            “For the Indians by the Indians”
          </h1>
          <p className="text-[#000] font-inter text-[22px] text-base font-medium w-[500px] opacity-0.4">
            Find all the details about government schemes, scholarships, and job openings for all states in one place.
          </p>
        </div>

        <div className="absolute bottom-0 right-4 ">
          <Image className="z-10 image-opacity transform -scale-x-100" src={loginperson} alt="Login Person Image" height={477} />
        </div>
      </div>

      <div className="relative w-1/2 flex items-center justify-center z-80 bg-white">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true); // Start loading
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({ email: values.email, password: values.password });

            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register/`, requestOptions)
              .then((response) => response.json())
              .then((result) => {
                if (result.user) {
                  setApiErrors({ email: "", password: "" });
                  updateFormData(values);
                  login(result.token, result.user);  // Update authState
                  handleAfterLogin(values);  // Proceed with login
                } else {
                  console.error(result);
                  setApiErrors({
                    email: result.email ? result.email[0] : "",
                    password: result.password ? result.password[0] : "",
                  });
                  setTimeout(() => {
                    setApiErrors({ email: "", password: "" });
                  }, 15000);
                }
              })
              .catch((error) => {
                console.error(error);
              })
              .finally(() => {
                setSubmitting(false);
                setIsLoading(false);  // Stop loading
              });
          }}
        >
          {(formik) => {
            let errorMessage = getErrorMessage(formik.errors, apiErrors);

            // Handle specific error case
            if (errorMessage.includes("This password is too common.") && errorMessage.includes("This password is entirely numeric.")) {
              errorMessage = "This password is too common. This password is entirely numeric.";
            }

            return (
              <form className="w-full h-full ml-20 mr-24 relative mt-60" onSubmit={formik.handleSubmit}>
                <button type="button" className="flex gap-[8px] mb-[24px]" onClick={() => router.back()}>
                  <FaArrowLeftLong className="mt-1"/>
                  Back
                </button>
                <h1 className="text-2xl font-bold mb-[32px]">Create an Account</h1>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email Id
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

                <div className="relative mt-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded-[8px] w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-4" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>

                {errorMessage && (
                  <div className="mb-4 mt-4">
                    <div className="bg-[#FFE6E6] text-[#DC0000] py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                      {errorMessage}
                    </div>
                  </div>
                )}

                <div>
                  <button
                    className="bg-[#3431BB] hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-[8px] focus:outline-none focus:shadow-outline w-full mt-[35px]"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <FaSpinner className="animate-spin mr-2" />
                        Loading...
                      </div>
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAcc01;
