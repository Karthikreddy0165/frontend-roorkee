import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaAngleDown, FaSpinner } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import * as Yup from "yup";
import { useAuth } from "@/Context/AuthContext";
import { useFormData } from "@/Context/FormContext";
import loginperson from "../assets/image.png";
import IndialImg from "../assets/ind2.png";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required."),
  age: Yup.string().required("Age is required."),
  gender: Yup.string().required("Gender is required."),
  category: Yup.string().required("Category is required."),
  state: Yup.string().required("State is required."),
});

const CreateAcc02 = () => {
  const router = useRouter();
  const { updateFormData } = useFormData();
  const { authState } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log("User token:", authState.token);
  }, [authState.token]);

  const handleSubmit = (values, { setSubmitting }) => {
    setIsLoading(true);
    // console.log("Form values:", values); // Add this line to debug form values

    const requestBody = {
      "name": values.name,
      "gender": values.gender,
      "age": values.age,
      "category": values.category,
      "state_of_residence": values.state
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      body: JSON.stringify(requestBody),
    };

    fetch(`http://65.0.122.213:8000/api/profile/personal/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        router.push("/ProfessionalDetails");
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
    if (authState.token) {
      router.push("/ProfessionalDetails");
    } else {
      console.error("User is not authenticated");
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
            name: "",
            age: "",
            gender: "",
            category: "",
            state: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="w-full h-full ml-20 mr-24 relative mt-60">
              <button type="button" className="flex gap-[8px] mb-[24px]" onClick={() => router.back()}>
                <FaArrowLeftLong className="mt-1"/>
                Back
              </button>
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
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                />
                {/* <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-2" /> */}
              </div>
              {/*  */}
              {/*  */}
              <div className="flex mb-4">
                <div className="w-1/2 mr-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="age"
                  >
                    Age
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="age"
                    type="text"
                    placeholder="Enter your age"
                    name="age"
                  />
                  {/* <ErrorMessage name="age" component="div" className="text-red-500 text-xs mt-2" /> */}
                </div>
                <div className="w-1/2 relative">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <div className="relative">
                    <Field as="select" id="gender" name="gender"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Field>
                    <FaAngleDown className="absolute right-3 top-3 pointer-events-none" />
                    {/* <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-2" /> */}
                  </div>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 mr-4 relative">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <Field as="select" id="category" name="category"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select Category</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </Field>
                    <FaAngleDown className="absolute right-3 top-3 pointer-events-none" />
                    {/* <ErrorMessage name="category" component="div" className="text-red-500 text-xs mt-2" /> */}
                  </div>
                </div>
                <div className="w-1/2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="state"
                    type="text"
                    placeholder="Enter your state"
                    name="state"
                  />
                  {/* <ErrorMessage name="state" component="div" className="text-red-500 text-xs mt-2" /> */}
                </div>
              </div>
              {Object.keys(errors).length > 0 && (
                <div className="mb-4 mt-4">
                  <div className="bg-[#FFE6E6] text-[#DC0000] py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                    All fields are required.
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between absolute bottom-[200px] w-full px-4">
                <span className="text-gray-600">2/3</span>
                <div className="flex items-center gap-4">
                  <button
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    type="button"
                    onClick={handleSkip}
                  >
                    Skip For Now
                  </button>
                  <button
                    className="bg-[#3431BB] hover:bg text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isLoading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAcc02;
