import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";

export default function TermsAndConditions({handleClose}) {
  const router = useRouter();

  return (
    <>
      {/* <NavBar /> */}
      <div className="">
        <div className="w-full max-w-4xl  p-6 bg-white shadow-lg rounded-lg sm:transform sm:-translate-y-12">
          <div className="flex items-center justify-center relative mb-4">
            <div className="absolute left-0 cursor-pointer" onClick={handleClose}>
              <IoClose size={25}/>
            </div>
            <h1 className="text-xl sm:text-2xl text-[#3330BA] font-bold text-center w-full">
              TERMS AND CONDITIONS
            </h1>
          </div>

          <div className="text-gray-600 space-y-4">
            <p className="border-b pb-3 text-sm sm:text-base">
              <strong>1. Acceptance of Terms</strong>
              <br />
              By accessing and using this website, you agree to comply with and be
              bound by these Terms and Conditions. If you do not agree, please
              refrain from using the website.
            </p>
            <p className="border-b pb-3 text-sm sm:text-base">
              <strong>2. Purpose of the Website</strong>
              <br />
              This website aims to provide users with access to government
              schemes, scholarships, and job opportunities. The information
              displayed is collected from various government sources and is
              intended for informational purposes only.
            </p>
            <p className="border-b pb-3 text-sm sm:text-base">
              <strong>3. Accuracy and Updates</strong>
              <br />
              While we strive to ensure that the information provided is accurate
              and up to date, we do not guarantee its completeness or accuracy.
              Users are encouraged to verify details from official government
              sources before taking any action.
            </p>
            <p className="pb-3 text-sm sm:text-base">
              <strong>4. No Affiliation with Government</strong>
              <br />
              This website is not affiliated with any government entity and
              should not be considered an official source.
            </p>
          </div>

          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button
              className="w-full sm:w-auto bg-[#3330BA] text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all"
              onClick={() => router.push("/")}
            >
              DECLINE
            </button>
            <button
              className="w-full sm:w-auto bg-[#3330BA] text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all"
              onClick={() => router.push("/dashboard")}
            >
              ACCEPT THE TERMS
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
