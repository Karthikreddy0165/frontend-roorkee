import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import Categories from "../components/Categories";
import PageContext from "@/Context/PageContext";
import FilterContext from "@/Context/FilterContext";
import { useTabContext } from "@/Context/TabContext";

export default function Saved() {
  const { searchQuery } = useTabContext();
  const { states, departments, beneficiaries, sponseredBy } =
    useContext(FilterContext);
  const { currentPage } = useContext(PageContext);
  const { authState } = useAuth();
  const [data, setData] = useState({ results: [] });
  const [dataOfApi, setDataOfApi] = useState({});
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(0);
  const handleLoginPage = () => {
    router.push("/loginpage");
  };
  useEffect(() => {
    if (!authState.token) {
      return;
    }
    // console.log("Auth token for saved login:", authState.token);
    const fetchState = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${authState.token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
        // console.log(states,"states")
        // console.log(departments,"departmensts")
      
        let idOfStates = states[0].join('&');
        let idOfDepartments = departments[0].join('&')

        console.log(idOfStates,"idofstates")
        // console.log(idOfDepartments,"idofdepartmensts")
        

        // /api/user/saved_schemes/?state_ids=1,2&department_ids=1,2&q=agriculture"
        // http://65.0.103.91:80/api/schemes/multi-state-departments/?limit=10&page=${currentPage}
        const response = await fetch(
          `http://65.0.103.91:80/api/user/saved_schemes`,
          // `http://65.0.103.91:80/api/user/saved_schemes`,
          
          requestOptions
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDataOfApi(data);
        setTotalPages(Math.ceil(data.length / 10));
        // console.log(totalPages, "dataFetched");

      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchState();
  }, [authState.token, states, departments, searchQuery, currentPage]);


  if(authState.token && Object.keys(dataOfApi).length==0 && (states.length != 0 || departments.length != 0)){
    return (
      <div className="flex justify-center items-center mt-8">
       No data found on your preference.
      </div>
    );
  }

  if (!authState.token) {
    return (
      <div className="flex justify-center items-center mt-8">
        Please
        <span
          className="mx-1 text-[#3431BB] hover:text-blue-600 cursor-pointer"
          onClick={handleLoginPage}
        >
          log in
        </span>
        to see your saved data.
      </div>
    );
  }
// console.log(states[0],'selectedstate')
  

  // if (authState.token && Object.keys(dataOfApi).length==0) {
  //   return (
  //     <div className="flex justify-center items-center mt-8">
  //       No Saved data found
  //     </div>
  //   );
  // }

  // console.log(currentPage,'currentpage')
  // console.log(dataOfApi,'dataOfApi')

  return (
    <>
      <div className="bg-white font-sans">
        
          <Categories ffff={"saved"} dataFromApi={dataOfApi} totalPages={totalPages} />
        
      </div>
    </>
  );
}
