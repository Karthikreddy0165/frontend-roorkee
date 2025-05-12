import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { authState } = useAuth();
  const [profileData, setProfileData] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileFields = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dynamic-fields/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch fields: ${response.statusText}`);
        }
        const data = await response.json();
        const fields = Object.fromEntries(data.profile_fields.map(it=>[it.name.toLowerCase(),'']))
        fields.name = ''
        fields.email = ''
        setProfileData(fields);
        console.log("I am profile fields", fields)
      } catch (error) {
        console.error("Failed to fetch profile fields", error);
      }
    };

    fetchProfileFields();
  }, []);

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

  const getLocalPrivacyPreferences = () => {
    const prefs = localStorage.getItem("privacyPreferences");
    if (!prefs) return null;
    return JSON.parse(prefs);
  };
  
  return (
    <ProfileContext.Provider value={{ profileData, setProfileData, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
