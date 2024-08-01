import { useEffect, useState, useRef } from "react";
import Categories from "./Categories";
import PageContext from '@/Context/PageContext';
import { useContext } from "react";
import FilterContext from "@/Context/FilterContext";
import { useTabContext } from "@/Context/TabContext";
export default function Scholarships() {
  const {searchQuery} = useTabContext();
  const { states, setStates, departments, setDepartments, beneficiaries, setBeneficiaries,
  } = useContext(FilterContext);
  const allFilters = useRef({
    statesFilter : [],
    departmentFilter : [],
    beneficiariesFilter : []
  })

  const { currentPage } = useContext(PageContext);
  const [dataOfApi, setDataOfApi] = useState({})
  useEffect(() => {
    const fetchState = async () => {
      try {
        setDataOfApi({});
        // let url = `http://52.65.93.83:8080/api/schemes`;
        // http://65.0.103.91:80/api/schemes/search/?q=agri
        // let url = `http://65.0.103.91:80/api`
        if(true){
          let url = `http://65.0.103.91:80/api/schemes/scholarship`;
          // http://65.0.103.91/api/schemes/scholarship/?limit=5&page=2
          if (searchQuery) {
            url += `/search/?q=${searchQuery}`;
          }
          url += `/?limit=10&page=${currentPage}`;
          const cachedData = localStorage.getItem(url);
          if (cachedData) {
            setDataOfApi(JSON.parse(cachedData));
          }
          else{
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDataOfApi(data);
            localStorage.setItem(url, JSON.stringify(data));

          }
        }
        
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchState();
  }, [searchQuery, currentPage, states,departments,beneficiaries]);
  return (
    <div className="bg-white font-sans">
      <Categories
        ffff={"scholarship"}
        dataFromApi={dataOfApi}
        />
    </div>
  );
}