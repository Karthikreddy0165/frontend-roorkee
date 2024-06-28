import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/homepage');
  };

  return (
    <div>
      <button className="text-black py-2 rounded flex items-center transition duration-300 ease-in-out hover:font-bold" onClick={handleGoBack}>
        <FaArrowLeftLong className="h-5 w-5 mr-2" />
        Back
      </button>
    </div>
  );
};

export default BackButton;
