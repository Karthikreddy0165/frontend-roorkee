import React, { useState, useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";

const SchemeVerifiedStatus = () => {
  const { authState } = useAuth();

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const checkEmailVerification = async () => {
      if (!authState.token) {
        console.log("No token available");
        return;
      }

      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          redirect: "follow",
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/me/`,
          requestOptions
        );
        const data = await response.json();
        // console.log("API Response: ", data);

        if (data && !data.is_email_verified) {
          console.log("Email not verified");
          setShowMessage(true);
        } else {
          console.log("Email is verified");
          setShowMessage(false);
        }
      } catch (error) {
        console.error("Failed to check email verification", error);
      }
    };

    checkEmailVerification();
  }, [authState.token]);

  const handleClose = () => {
    setShowMessage(false);
  };

  return (
    showMessage && (
      <div className="relative  flex items-center justify-between p-4 bg-violet-100 text-black border border-violet-800 rounded mx-auto  ">
        <span className="ml-4  text-sm">
          Email has been sent to your mail, Please Verify
        </span>
        <button
          onClick={handleClose}
          className="bg-transparent border-none text-2xl font-bold leading-none cursor-pointer text-violet-800 sm:text-xl"
        >
          &times;
        </button>
      </div>
    )
  );
};

export default SchemeVerifiedStatus;
