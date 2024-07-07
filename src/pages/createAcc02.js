import React from "react";
import Image from "next/image";
import IndialImg from "../assets/ind2.png";
import { Formik } from "formik";
import loginperson from "../assets/image.png";
import { FaAngleDown } from "react-icons/fa6";
import { useRouter } from "next/router";
import { createAccount } from "../utils/api";

const CreateAcc02 = () => {
  const router = useRouter();

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
          onSubmit={async (values) => {
            try {
              await createAccount(values); // This should handle the form data submission
              router.push("/createAcc03");
            } catch (error) {
              console.error("Error creating account:", error);
            }
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
                      className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                      id="gender"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.gender}
                    >
                      <option value="">Select your gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FaAngleDown />
                    </div>
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
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="community"
                  type="text"
                  placeholder="Enter your community"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.community}
                />
              </div>
              <div className="relative mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="state"
                >
                  State
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                    id="state"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.state}
                  >
                    <option value="">Select your state</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">
                      Himachal Pradesh
                    </option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">
                      Dadra and Nagar Haveli and Daman and Diu
                    </option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Jammu and Kashmir">
                      Jammu and Kashmir
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FaAngleDown />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[200px]">
                <span className="mr-2 pr-[350px]">2/3</span>
                <button
                  className="bg-[#3431BB] hover:bg-purple-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Continue
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
