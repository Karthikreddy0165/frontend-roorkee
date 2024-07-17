import React, { useState, useEffect } from "react";
import Image from "next/image";
import IndialImg from "../assets/ind2.png";
import { Formik } from "formik";
import loginperson from "../assets/image.png";
import { FaAngleDown, FaSpinner } from "react-icons/fa";
import { useRouter } from "next/router";
import { useFormData } from "../Context/FormContext";
import { useAuth } from "../Context/AuthContext";

const CreateAcc02 = () => {
  const router = useRouter();
  const { updateFormData } = useFormData();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("User token:", token);
  }, [token]);

  const handleSubmit = (values, { setSubmitting }) => {
    setIsLoading(true);

    const requestBody = {};
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        requestBody[key] = values[key];
      }
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
      redirect: "follow",
    };

    fetch("http://54.79.141.24:8000/api/profile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        router.push("/proffesionalDetails");
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setSubmitting(false);
        setIsLoading(false);
      });
  };

  const handleSkip = () => {
    router.push("/proffesionalDetails");
  };


  return (
    <div className="flex h-screen overflow-hidden -mb-6">
      <div className="w-1/2 bg-[#151280] relative flex items-center justify-center">
        <div className="absolute top-0 text-white mt-20 ml-8 mr-8">
          <h1 className="text-purple-400 font-inter italic font-bold text-3xl mb-4 w-[500px]">
            “For the Indians by the Indians”
          </h1>
          <p className="text-white font-inter text-[22px] text-base font-medium w-[500px]">
            Find all the details about government schemes, scholarships, and job
            openings for all states in one place.
          </p>
        </div>
        <div className="absolute bottom-0 right-0">
          <Image
            className="z-10 image-opacity transform -scale-x-100"
            src={loginperson}
            alt="Login Person Image"
            width={400}
            height={200}
          />
        </div>
        <div className="absolute bottom-8">
          <Image
            className="z-0 image-opacity opacity-20"
            src={IndialImg}
            alt="India Image"
            width={600}
            height={200}
          />
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <Formik
          initialValues={{
            name: "",
            age: "",
            gender: "",
            community: "",
            state: "",
          }}
          onSubmit={handleSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Name is required.";
            }
            if (!values.age) {
              errors.age = "Age is required.";
            }
            if (!values.gender) {
              errors.gender = "Gender is required.";
            }
            if (!values.community) {
              errors.community = "Community is required.";
            }
            if (!values.state) {
              errors.state = "State is required.";
            }
            return errors;
          }}
        >
          {(formik) => (
            <form
              className="w-full h-full ml-20 mr-24 relative mt-60"
              onSubmit={formik.handleSubmit}
            >
              <h1 className="text-2xl font-bold mb-4">
                Tell us a little about yourself
              </h1>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name && (
                  <div className="text-red-500 text-xs mt-2">{formik.errors.name}</div>
                )}
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 mr-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="age"
                  >
                    Age
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="age"
                    type="text"
                    placeholder="Enter your age"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.age}
                  />
                  {formik.errors.age && formik.touched.age && (
                    <div className="text-red-500 text-xs mt-2">{formik.errors.age}</div>
                  )}
                </div>
                <div className="w-1/2 relative">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="gender"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.gender}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <FaAngleDown className="absolute right-3 top-3 pointer-events-none" />
                    {formik.errors.gender && formik.touched.gender && (
                      <div className="text-red-500 text-xs mt-2">{formik.errors.gender}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 mr-4 relative">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="community"
                  >
                    Community
                  </label>
                  <div className="relative">
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="community"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.community}
                    >
                      <option value="">Select Community</option>
                      <option value="gen">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                    </select>
                    <FaAngleDown className="absolute right-3 top-3 pointer-events-none" />
                    {formik.errors.community && formik.touched.community && (
                      <div className="text-red-500 text-xs mt-2">{formik.errors.community}</div>
                    )}
                  </div>
                </div>
                <div className="w-1/2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="state"
                    type="text"
                    placeholder="Enter your state"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.state}
                  />
                  {formik.errors.state && formik.touched.state && (
                    <div className="text-red-500 text-xs mt-2">{formik.errors.state}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between absolute bottom-[200px] w-full px-4">
                <span className="text-gray-600">2/3</span>
                <div className="flex items-center gap-4">
                  <button
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    type="button"
                    onClick={handleSkip}
                  >
                    Skip
                  </button>
                  <button
                    className="bg-[#3431BB] hover:bg text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    {isLoading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAcc02;
