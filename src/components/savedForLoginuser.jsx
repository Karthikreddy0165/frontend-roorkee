import React, { useState, useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import Categories from "../components/Categories";
import { useRouter } from "next/router";

export default function Saved() {
  const { authState } = useAuth();
  const [data, setData] = useState(null);
  const router = useRouter();

  const handleLoginPage = () => {
    router.push("/loginpage");
  };

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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/user/saved_schemes/`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(
          "Fetched data IDs:",
          data.map((item) => item.id)
        ); // Log the IDs of the fetched data
        setData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchState();
  }, [authState.token]);

  if (!authState.token) {
    return (
      <div className="flex justify-center items-center mt-8">
  Please
  <span className="mx-1 text-[#3431BB] hover:text-blue-600 cursor-pointer" onClick={handleLoginPage}>
    log in
  </span>
  to see your saved data.
</div>


    );
  }

  return (
    <>
      <div className="bg-white font-sans">
        {data ? (
          <Categories data={data} token={authState.token} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
