import { useRouter } from "next/router";
import { FaArrowLeftLong } from "react-icons/fa6";

const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div style={{ maxWidth: '80%', margin: '0 auto' }} className=" z-100">
      <button className="text-black py-2 rounded flex items-center transition duration-300 ease-in-out hover:font-bold mb-2" onClick={handleGoBack}>
        <FaArrowLeftLong className="h-5 w-5 mr-2" />
        Back
      </button>
    </div>
  );
};

export default BackButton;
