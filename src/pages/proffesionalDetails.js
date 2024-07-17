import React, { useState } from "react";
import Image from "next/image";
import IndialImg from "../assets/ind2.png";
import { Formik } from "formik";
import loginperson from "../assets/image.png";
import { FaAngleDown, FaSpinner } from "react-icons/fa";
import { useRouter } from "next/router";
import { useFormData } from "../Context/FormContext";
import { useAuth } from "../Context/AuthContext";

const CreateAcc03 = () => {
  const router = useRouter();
  const { formData, updateFormData } = useFormData();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    updateFormData(values);
    const completeData = { ...formData, ...values };

    try {
      const response = await fetch("http://54.79.141.24:8000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(completeData),
      });

      if (response.ok) {
        router.push("/accCreatedsucc");
        setTimeout(() => {
          router.push("/HeroPageLoginsucc");
        }, 2000);
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    if (token) {
      router.push("/HeroPageLoginsucc");
    } else {
      console.error("User token not available.");
      // Handle case where token is not available
    }
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
            qualification: formData.qualification || "",
            occupation: formData.occupation || "",
            income: formData.income || "",
            minority: false,
            disability: false,
            bpl_card_holder: false,
          }}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <form
              className="w-full h-full ml-20 mr-24 relative mt-60"
              onSubmit={formik.handleSubmit}
            >
              <h1 className="text-2xl font-bold">
                Tell us a little about yourself
              </h1>
              <p>Knowing about you will help us find the right schemes for you.</p>
              <div className="mt-12">
                <div className="flex mb-4">
                  <div className="w-1/2 mr-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="qualification"
                    >
                      Highest education qualification
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                        id="qualification"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.qualification}
                      >
                        <option value="">Education qualification</option>
                        <option value="occupation01">Matriculate</option>
                        <option value="occupation02">Intermediate</option>
                        <option value="occupation03">Under Graduate</option>
                        <option value="occupation04">Post Graduate</option>
                        <option value="occupation05">P.H.D</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <FaAngleDown />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 relative">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="occupation"
                    >
                      Occupation
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                        id="occupation"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.occupation}
                      >
                        <option value="">Select your occupation</option>
                        <option value="occupation01">Farmer</option>
                        <option value="occupation02">HouseWife</option>
                        <option value="occupation03">Student</option>
                        {/* <option value="occupation04">occupation04</option>
                        <option value="occupation05">occupation05</option> */}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <FaAngleDown />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex mb-4">
                  <div className="w-1/2 mr-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="income"
                    >
                      Annual income
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                        id="income"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.income}
                      >
                        <option value="">Select your income range</option>
                        <option value="income01">0 - 1 lakh</option>
                        <option value="income02">1 - 2 lakhs</option>
                        <option value="income03">2 - 4 lakhs</option>
                        <option value="income04">4 - 6 lakhs</option>
                        <option value="income05">6 lakhs and above</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <FaAngleDown />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="minority"
                    >
                      Minority
                    </label>
                    <select
                      className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                      id="minority"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.minority}
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
                <div className="flex mb-4">
                  <div className="w-1/2 mr-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="disability"
                    >
                      Disability
                    </label>
                    <select
                      className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                      id="disability"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.disability}
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="bpl_card_holder"
                    >
                      BPL Card Holder
                    </label>
                    <select
                      className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                      id="bpl_card_holder"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.bpl_card_holder}
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between absolute bottom-[200px] w-full px-4">
                <span className="text-gray-600">3/3</span>
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

export default CreateAcc03;
