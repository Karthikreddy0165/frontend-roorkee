import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import BackButton from "@/components/ComponentsUtils/BackButton";
export default function TermsAndConditions() {
  const router = useRouter();

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#EEEEFF]  flex items-center justify-center">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg transform -translate-y-12">
        <div className="flex items-center justify-center relative">
    <div className="absolute left-0">
      <BackButton />
    </div>
    <h1 className="text-2xl text-[#3330BA] font-bold text-center w-full">
      TERMS AND CONDITIONS
    </h1>
  </div>
          <p className="text-gray-600 mt-4 mb-4 border-b pb-3">
            <strong>1. Acceptance of Terms</strong>
            <br />
            By accessing and using this website, you agree to comply with and be
            bound by these Terms and Conditions. If you do not agree, please
            refrain from using the website.
          </p>
          <p className="text-gray-600 mb-4 border-b pb-3">
            <strong>2. Purpose of the Website</strong>
            <br />
            This website aims to provide users with access to government
            schemes, scholarships, and job opportunities. The information
            displayed is collected from various government sources and is
            intended for informational purposes only.
          </p>
          <p className="text-gray-600 mb-4 border-b pb-3">
            <strong>3. Accuracy and Updates</strong>
            <br />
            While we strive to ensure that the information provided is accurate
            and up to date, we do not guarantee its completeness or accuracy.
            Users are encouraged to verify details from official government
            sources before taking any action.
          </p>
          <p className="text-gray-600 mb-4  pb-3">
            <strong>4. No Affiliation with Government</strong>
            <br />
            This website is not affiliated with any government entity and
            should not be considered an official source.
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <button
              className="bg-[#3330BA] text-[16px] text-white px-[12px] py-2 rounded-lg hover:bg-gray-500"
              onClick={() => router.push("/")}
            >
              DECLINE
            </button>
            <button
              className="bg-[#3330BA] text-[16px]  text-white px-[12px] py-2 rounded-lg hover:bg-gray-500"
              onClick={() => router.push("/dashboard")}
            >
              ACCEPT THE TERMS
            </button>
          </div>
        </div>
      </div>
    </>
  );
}