import { useEffect, useState } from "react";
import Categories from "./Categories";
import PageContext from '@/Context/PageContext';
import { useContext } from "react";
import { useTabContext } from "@/Context/TabContext";
export default function JobOpenings() {
  const {searchQuery} = useTabContext();
  const { currentPage} = useContext(PageContext);
  const [dataOfApi, setDataOfApi] = useState({})
  useEffect(() => {
    const fetchState = async () => {
      try {
        setDataOfApi({});
        let url = `http://65.0.103.91:80/api/schemes/job`
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
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchState();
  }, [searchQuery, currentPage]);

  return (
    <div className="bg-white font-sans">
      <Categories
        ffff={"jobopening"}
        dataFromApi={dataOfApi}
      />
    </div>
  );
}