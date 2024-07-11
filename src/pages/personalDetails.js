import React, { useState } from "react";
import Image from "next/image";
import IndialImg from "../assets/ind2.png";
import { Formik } from "formik";
import loginperson from "../assets/image.png";
import { FaAngleDown, FaSpinner } from "react-icons/fa"; // Import loading spinner
import { useRouter } from "next/router";
import { useFormData } from "../Context/FormContext";

const CreateAcc02 = () => {
  const router = useRouter();
  const { updateFormData } = useFormData();
  const [isLoading, setIsLoading] = useState(false); // State for loading

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
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true); // Start loading
            updateFormData(values);
            setTimeout(() => { // Simulate API call delay
              setIsLoading(false); // Stop loading
              router.push("/proffesionalDetails");
              setSubmitting(false);
            }, 2000); // Change this to match the actual API call duration
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
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="community"
                >
                  Community
                </label>
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
              </div>
              <div className="mb-4">
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
              </div>
              <div className="absolute bottom-[200px]">
                <span className="mr-2 pr-[350px]">2/3</span>
                <button
                  className="bg-[#3431BB] hover:bg-purple-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={formik.isSubmitting || isLoading}
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin h-5 w-5 mr-3 inline" />
                  ) : (
                    "Continue"
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

export default CreateAcc02;
