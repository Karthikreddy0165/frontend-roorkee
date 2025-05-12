import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { authState } = useAuth();
  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    gender: "",
    community: "",
    minority: "",
    state: "",
    
    education: "",
    disability: "",
    occupation: "",
    income: "",
    employment_status: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (authState.token) {
        setLoading(true);
        try {
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authState.token}`,
            },
          };

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/profile/`,
            requestOptions
          );

          if (!response.ok) throw new Error("Failed to fetch profile data");

          const pData = await response.json();
          setProfileData((prevData) => ({
            ...prevData,
            name: pData.name || "",
            ...Object.entries(pData.dynamic_fields || {}).reduce((acc, [key, value]) => {
              acc[key.toLowerCase().replace(" ", "_")] = value;
              return acc;
            }, {}),
          }));
        } catch (error) {
          console.error("Error fetching profile data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [authState.token]);

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
