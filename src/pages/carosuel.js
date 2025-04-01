'use client';
import { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import bannerfirst from "../assets/bannerfirst.jpeg";
import image2 from "../assets/cnext.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerthird from "../assets/csecond.jpeg";

const Carousel = () => {
    const [announcement, setAnnouncement] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/announcements/`);
                const data = await response.json();
                if (data.length > 0) {
                    setAnnouncement(data[0]); 
                }
            } catch (error) {
                console.error("Error fetching announcements:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

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
        <div className="relative w-full max-w-[1200px] mt-5 mx-auto px-4 sm:px-6 lg:px-8">
            <Slider {...settings}>
                <div className="relative">
                    <Image 
                        src={bannerfirst} 
                        alt="Banner" 
                        className="w-full object-cover md:object-contain"
                        priority
                    />
                </div>
                
                <div className="relative">
                    <Image 
                        src={image2} 
                        alt="Banner" 
                        className="w-full object-cover md:object-contain"
                    />
                    
                    {isLoading ? (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="animate-pulse bg-white bg-opacity-80 p-6 rounded-xl shadow-xl max-w-md w-full h-40"></div>
                        </div>
                    ) : announcement && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#EEEEFF] p-4 md:p-6 rounded-xl shadow-xl max-w-sm sm:max-w-md w-full border border-opacity-20 border-blue-300 backdrop-blur-sm">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-1 bg-[#9576DB] mb-2 md:mb-4 rounded-full"></div>
                                <div className="flex items-center gap-2 mb-2 md:mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 md:w-8 h-6 md:h-8 text-[#9576DB]" fill="currentColor">
                                        <path d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75l-8.7 0-32 0-96 0c-35.3 0-64 28.7-64 64l0 96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-128 8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-147.6c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4L480 32zm-64 76.7L416 240l0 131.3C357.2 317.8 280.5 288 200.7 288l-8.7 0 0-96 8.7 0c79.8 0 156.5-29.8 215.3-83.3z"/>
                                    </svg>
                                    <h2 className="text-lg md:text-2xl font-bold text-[#9576DB] text-center">
                                        {announcement.title}
                                    </h2>
                                </div>
                                <p className="text-gray-700 text-sm md:text-base text-center leading-relaxed">
                                    {announcement.description}
                                </p>
                            </div>
                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-6 md:w-8 h-6 md:h-8 bg-[#EEEEFF] rotate-45"></div>
                        </div>
                    )}
                </div>
                
                <div className="relative">
                    <Image 
                        src={bannerthird} 
                        alt="Banner" 
                        className="w-full object-cover md:object-contain"
                    />
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;