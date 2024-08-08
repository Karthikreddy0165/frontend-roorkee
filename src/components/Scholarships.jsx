import ScholarshipCount from "./ScholarshipCount";
import { useEffect, useState, useContext } from "react";
import Categories from "./Categories";
import PageContext from "@/Context/PageContext";
import FilterContext from "@/Context/FilterContext";
import { useTabContext } from "@/Context/TabContext";
// import Scholarships from "./Scholarships";

export default function Scholarships() {
  const { searchQuery } = useTabContext();
  const {
    states,
    departments,
    beneficiaries,
    sponseredBy,
  } = useContext(FilterContext);
  const { currentPage } = useContext(PageContext);
  const [dataOfApi, setDataOfApi] = useState({});
  const [totalPages, setTotalPages] = useState(0);

  // console.log(states[1],"states")
  useEffect(() => {
    const fetchState = async () => {
      try {
        setDataOfApi({});
        let url = `http://65.0.103.91:80/api/schemes/multi-state-departments/?limit=10&page=${currentPage}`;
        // const cachedData = localStorage.getItem(url);
        
        // if (cachedData) {
        //   setDataOfApi(JSON.parse(cachedData));
        // } else { 
        const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const raw = JSON.stringify({
            state_ids: states.length != 0 ?  states[0] : [],
            department_ids: departments.length != 0 ? departments[0] : [],
            sponsor_ids: sponseredBy.length != 0 ? sponseredBy[0] : [],
            beneficiary_keywords: beneficiaries,
            search_query: searchQuery,
            tag: "scholarship",

          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          const response = await fetch(url, requestOptions);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          let data = await response.json();
          setDataOfApi(data);
          setTotalPages(Math.ceil(data.count/10));
          localStorage.setItem(url, JSON.stringify(data));
        // }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchState();
  }, [searchQuery, currentPage, sponseredBy, states, departments, beneficiaries]);

  if (dataOfApi.count==0 && (states.length != 0 || departments.length != 0)) {
    return (
      <div className="flex justify-center items-center mt-8">
        No scholarship-related schemes found based on your preference
      </div>
    );
  }

  return (
    <div className="bg-white font-sans">
      <ScholarshipCount dataFromApi = {dataOfApi} />
      <Categories ffff={"scholarship"} dataFromApi={dataOfApi} totalPages={totalPages}/>

    </div>
  );
}
