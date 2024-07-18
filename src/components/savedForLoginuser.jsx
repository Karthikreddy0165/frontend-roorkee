import React, { useState, useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import Categories from "../components/Categories";

export default function Saved() {
  const { authState } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!authState.token) {
      return;
    }
    console.log("Auth token for saved login:", authState.token);
    const fetchState = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${authState.token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/user/saved_schemes/`, requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data IDs:", data.map(item => item.id)); // Log the IDs of the fetched data
        setData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchState();
  }, [authState.token]);

  if (!authState.token) {
    return <div>Please log in to see your saved data.</div>;
  }

  return (
    <>
      <div className="bg-white font-sans">
        {data ? <Categories data={data} token={authState.token} /> : <div>Loading...</div>}
      </div>
    </>
  );
}
