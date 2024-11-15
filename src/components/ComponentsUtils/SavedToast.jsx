import { useTabContext } from "@/Context/TabContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";

const SaveToast = ({ message, onClose }) => {
  const {activeTab, setActiveTab} = useTabContext();
  const router = useRouter();
  const [isToastVisible, setIsToastVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleViewSavedClick = () => {
    router.push('/AllSchemes?tab=Saved');
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
    <div className={`fixed bottom-0 left-1/2 transform p-2 items-center gap-3 rounded-lg bg-[#FAFAFF] shadow-md z-[60] mb-8 flex ${isClosing ? 'animate-slideDown' : 'animate-slideUp'}`}>
      <CiBookmark />
      <span className="text-[#0A0A0A] text-center font-inter text-sm font-medium">
        {message}
      </span>
      Scheme has been saved
      <button
        className="flex p-3 justify-center items-center gap-2 rounded-lg bg-[#3431BB] text-white"
        onClick={handleViewSavedClick}
      >
        View in saved
      </button>
      {/* <button onClick={handleClose} className="ml-4">Close</button> */}
    </div>
  );
};

export default SaveToast;
