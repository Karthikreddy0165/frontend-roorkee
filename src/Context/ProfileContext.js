import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { authState } = useAuth();
  const [profileData, setProfileData] = useState({});  // Initialize as an empty object
  const [loading, setLoading] = useState(true);

  // Fetch dynamic fields (profile fields) for the profile
  useEffect(() => {
    const fetchProfileFields = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dynamic-fields/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch fields: ${response.statusText}`);
        }
        const data = await response.json();
        const fields = Object.fromEntries(
          data.profile_fields.map(it => [it.name.toLowerCase(), ''])
        );
        fields.name = '';
        fields.email = '';  // We'll update this later
        setProfileData(fields);
        // console.log("Profile fields:", fields);
      } catch (error) {
        console.error("Failed to fetch profile fields:", error);
      }
    };

    fetchProfileFields();
  }, []);

  // Fetch profile data including dynamic fields and email verification status
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

          // Update profile data with fetched data and add email verification status
          setProfileData((prevData) => ({
            ...prevData,
            name: pData.name || "",
            email: pData.email || "",
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
