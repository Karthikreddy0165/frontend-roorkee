import React from "react";
import Image from "next/image";
import IndialImg from "../assets/ind2.png";
import { Formik } from "formik";
import loginperson from "../assets/image.png";
import { FaAngleRight } from "react-icons/fa6";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const handleCreate01Click = () => {
    router.push("/createAcc01");
  };
  return (
    <div className="flex h-screen overflow-hidden -mb-6">
      <div className="w-1/2 bg-[#151280] relative flex items-center justify-center">
        <div className="absolute top-0 text-white mt-20 ml- mr-8">
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
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(formik) => (
            <form
              className="w-full h-full mt-[300px] ml-20 mr-24"
              onSubmit={formik.handleSubmit}
            >
              <h1 className="text-2xl font-bold mb-4">
                Login into your existing account
              </h1>
              <div className="">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email Id
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              <div className="mt-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              <div className="text-sm flex flex-column mb-8 mt-4">
                <div className=" flex items-center">
                  <input
                    className="mr-2 leading-tight"
                    type="checkbox"
                    id="keepLoggedIn"
                  />
                  <label className="text-sm" htmlFor="keepLoggedIn">
                    Keep me logged in
                  </label>
                </div>
                <a
                  className="text-blue-500 hover:text-blue-700 ml-auto"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
              <div>
                <button
                  className="bg-[#3431BB] hover:bg-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                >
                  Continue
                </button>
              </div>

              <div className="flex gap-4 mt-8">
                <h1>Don’t have a account? </h1>

                <div className="flex gap-1">
                  <span
                    className="text-[#3431BB] hover:text-purple-700 cursor-pointer"
                    onClick={handleCreate01Click}
                  >
                    Create new account
                  </span>
                  <div className="mt-1 text-[#3431BB]">
                    <FaAngleRight />
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
