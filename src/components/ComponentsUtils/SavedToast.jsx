import { useTabContext } from "@/Context/TabContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";

const SaveToast = ({ message, onClose }) => {
  const { activeTab, setActiveTab } = useTabContext();
  const router = useRouter();
  const [isToastVisible, setIsToastVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleViewSavedClick = () => {
    router.push("/AllSchemes?tab=Saved");
    setActiveTab("Saved");
    handleClose();
  };

  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isToastVisible) {
      const timer = setTimeout(() => {
        setIsClosing(true);
        // Remove toast after animation
        setTimeout(() => {
          setIsToastVisible(false);
          onClose(); // Call the parent component's onClose handler
        }, 500); // Duration of the slide-down animation
      }, 2700); // Time before starting close animation

      return () => clearTimeout(timer);
    }
  }, [isToastVisible]);

  if (!isToastVisible) return null;

  return (
    <div
      className={`fixed bottom-0 sm:left-1/2 centre transform   sm:max-w-sm w-full max-w-[300px] p-3 gap-3 rounded-lg bg-[#FAFAFF] shadow-md z-[60] mb-8 flex flex-col sm:flex-row items-center justify-center ${
        isClosing ? "animate-slideDown" : "animate-slideUp"
      }`}
    >
      <CiBookmark className="text-2xl mb-2 sm:mb-0" />
      <div className="text-[#0A0A0A] text-center font-inter text-sm font-medium sm:text-base">
        {message}
        <div className="mt-2 text-center sm:text-left">
          Scheme has been saved
        </div>
      </div>
      <button
        className="flex p-2 justify-center items-center gap-2 rounded-lg bg-[#3431BB] text-white text-xs sm:text-sm mt-2 sm:mt-0 w-full sm:w-auto"
        onClick={handleViewSavedClick}
      >
        View in saved
      </button>
    </div>
  );
};

export default SaveToast;
