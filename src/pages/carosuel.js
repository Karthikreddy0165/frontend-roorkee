'use client';
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";
import Image from "next/image";
import bannerfirst from "../assets/bannerfirst.jpeg";
import image2 from "../assets/cnext.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerthird from "../assets/csecond.jpeg";
import { useAuth } from "@/Context/AuthContext";

const Carousel = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [displayText, setDisplayText] = useState("");
    const { authState, logout } = useAuth();
    const [activeIndex, setActiveIndex] = useState(0);



    // Fetch announcement data from the API
    useEffect(() => {
        const fetchAnnouncements = async () => {
          try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/announcements/`);
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
              setAnnouncements(data);
            }
          } catch (error) {
            console.error("Error fetching announcements:", error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchAnnouncements();
      }, []);
      
    useEffect(() => {
        async function fetchCategories() {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/layout-items/`
            );
            const data = await response.json();
    
            if (Array.isArray(data)) {
              const sortedCategories = data.sort((a, b) => a.order - b.order);
              const availableCategories = sortedCategories.map((item) => item.column_name);
    
              
              setDisplayText(availableCategories)
              setCategories(sortedCategories.map((item) => ({
                name: item.column_name,
                label: item.column_name.toUpperCase(),
              
              })));
         
            }
          } catch (error) {
            console.error("Error fetching category data:", error);
          }
        }
    
        fetchCategories();
      }, [router.query, setCategories ]);

      useEffect(() => {
        if (announcements.length > 1) {
          const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % announcements.length);
          }, 9000); // rotate every 5 sec
      
          return () => clearInterval(interval);
        }
      }, [announcements]);
      
      const handleClickGetStarted = () => {
        router.push("/login");
      };
      const handleClickAfterLogin = () => {
        router.push("/AllSchemes");
      };

      const firstCategory = categories.length > 0 ? categories[0]?.name : "opportunity";

        

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div className="relative w-full max-w-[1200px] mt-5 mx-auto">
            <Slider {...settings}>
                {/* Slide 1 */}
                <div className="relative">
  <Image 
    src={bannerfirst} 
    alt="Banner" 
    className="w-full object-contain"
    priority
  />
  
  <div className="absolute inset-0 flex flex-col items-start  justify-center text- px-4">
    <h1 className="text-[#3330BA] text-3xl md:text-5xl font-semibold ">
      Empowering the  marginalized <br /> community
    </h1>
    <p className="text-[#3330BA] text-base md:text-lg mt-4 max-w-2xl drop-shadow-lg">
      Helping all communities across India find personalized scholarships based on eligibility.
    </p>
  </div>
</div>


                {/* Slide 2 with Announcement */}
                <div className="relative">
  <Image 
    src={image2} 
    alt="Banner" 
    className="w-full object-contain"
  />

  {isLoading ? (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="animate-pulse bg-white bg-opacity-80 p-6 rounded-xl shadow-xl max-w-md w-full h-40"></div>
    </div>
  ) : announcements.length > 0 && (
    <>
      {/* Announcement Box */}
      <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out">
        <div
          key={activeIndex}
          className="relative p-6 rounded-xl shadow-xl max-w-md w-full bg-white border border-opacity-20 border-blue-300"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-1 bg-[#9576DB] mb-4 rounded-full"></div>
            <div className="flex items-center gap-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-8 h-8 text-[#9576DB]"
                fill="currentColor"
              >
                <path d="..." />
              </svg>
              <h2 className="text-2xl font-bold text-[#9576DB] text-center">
                {announcements[activeIndex].title}
              </h2>
            </div>

            <p className="text-gray-700 mb-4 text-center leading-relaxed">
              {announcements[activeIndex].description}
            </p>
          </div>

          {/* Decorative Bottom Arrow */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#EEEEFF] rotate-45"></div>
        </div>
      </div>

      {/* Image outside to the right */}
      <div className="absolute bottom-[8%] left-[50%] transform translate-x-[-5%] translate-y-4 w-1/2 h-1/2 rounded-xl overflow-hidden ">
  <img
    src={announcements[activeIndex].image}
    alt={announcements[activeIndex].title}
    className="w-full h-full object-cover"
  />
</div>

    </>
  )}
</div>


                
                {/* Slide 3 */}
                <div className="relative">
  <Image 
    src={bannerthird} 
    alt="Banner" 
    className="w-full object-contain"
  />

  {/* Positioned container holding both text and button */}
  <div className="absolute bottom-1/4 left-6 transform -translate-y-1/2 flex flex-col items-start gap-4">

  <h1 className="text-[#3330BA] text-xl md:text-xl font-semibold">
  " Strengthening India by supporting dreams from every corner of the nation. "   </h1>
    {/* Text Box */}
    <div className="bg-white px-6 py-4 rounded-[16px] shadow-[0px_3px_8px_rgba(0,0,0,0.1),_0px_-2px_6px_rgba(0,0,0,0.1)] flex flex-row items-center gap-4">
      {displayText.includes("schemes") && (
        <div className="text-[#000000] font-inter text-[14px] sm:text-[16px] font-bold pr-4 border-r border-[#808080]">
          Thousands of schemes
        </div>
      )}

      {displayText.includes("jobs") && (
        <div className={`text-[#000000] font-inter text-[14px] sm:text-[16px] font-bold px-4 ${displayText.includes("scholarships") ? 'border-r border-[#808080]' : ''}`}>
          100+ job postings
        </div>
      )}

      {displayText.includes("scholarships") && (
        <div className="text-[#000000] font-inter text-[14px] sm:text-[16px] font-bold pl-4">
          Multiple scholarships
        </div>
      )}
    </div>

    {/* Button */}
    {authState.token ? (
      <button
        className="flex h-[44px] px-[44px] ml-[10px] py-[10px] justify-center items-center gap-[10px] rounded-[8px] bg-[#F58220] text-white hidden sm:flex"
        onClick={handleClickAfterLogin}
      >
        My {firstCategory}
      </button>
    ) : (
      <button
        className="flex h-[44px] px-[44px] py-[10px] justify-center items-center gap-[10px] rounded-[8px] bg-[#F58220] text-white hidden sm:flex"
        onClick={handleClickGetStarted}
      >
        Get Started
      </button>
    )}
  </div>
</div>


            </Slider>
        </div>
    );
};

export default Carousel;