import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Categories from "../components/Categories";

export default function Saved() {
  const { authState } = useAuth();
  const [data, setData] = useState({results:[]});
  const [dataOfApi, setDataOfApi] = useState({})
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
          `http://65.0.103.91:80/api/user/saved_schemes/`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
          
        }
        const data = await response.json();
        // console.log(
        //   "Fetched data IDs:",
        //   data.map((item) => item.id)
        // ); // Log the IDs of the fetched data
        setDataOfApi(data)
        // console.log(data,"dataFetched")
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
          <Categories ffff={"saved"} dataFromApi={dataOfApi} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
