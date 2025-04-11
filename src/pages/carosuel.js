'use client';
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";
import Image from "next/image";
import bannerfirst from "../assets/bannerfirst.jpeg";
// import image2 from "../assets/cnext.jpeg";
import bannerthird from "../assets/csecond.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "@/Context/AuthContext";

const Carousel = () => {
    const router = useRouter();
    const { authState } = useAuth();
    const [categories, setCategories] = useState([]);
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/layout-items/`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    const sorted = data.sort((a, b) => a.order - b.order);
                    const names = sorted.map((item) => item.column_name);
                    setDisplayText(names);
                    setCategories(sorted.map((item) => ({
                        name: item.column_name,
                        label: item.column_name.toUpperCase(),
                    })));
                }
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        }
        fetchCategories();
    }, [router.query]);

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
                    <Image src={bannerfirst} alt="Banner" className="w-full object-contain" priority />
                    <div className="absolute inset-0 flex flex-col items-start justify-center px-4">
                        <h1 className="text-[#3330BA] text-3xl md:text-5xl font-semibold">
                            Empowering the marginalized <br /> community
                        </h1>
                        <p className="text-[#3330BA] text-base md:text-lg mt-4 max-w-2xl drop-shadow-lg">
                            Helping all communities across India find personalized scholarships based on eligibility.
                        </p>
                    </div>
                </div>

                {/* Slide 2 (Static Image) */}
                {/* <div className="relative">
                    <Image src={image2} alt="Banner" className="w-full object-contain" />
                </div> */}

                {/* Slide 3 */}
                <div className="relative">
                    <Image src={bannerthird} alt="Banner" className="w-full object-contain" />
                    <div className="absolute bottom-1/4 left-6 transform -translate-y-1/2 flex flex-col items-start gap-4">
                        <h1 className="text-[#3330BA] text-xl md:text-xl font-semibold">
                            "Strengthening India by supporting dreams from every corner of the nation."
                        </h1>
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
