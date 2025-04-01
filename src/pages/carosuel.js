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

    // Fetch announcement data from the API
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/announcements/`);
                const data = await response.json();
                if (data.length > 0) {
                    setAnnouncement(data[0]); 
                }
            } catch (error) {
                console.error("Error fetching announcements:", error);
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
        <div className="relative w-full max-w-[1200px] mt-5 mx-auto">
            <Slider {...settings}>
                {/* Slide 1 */}
                <div>
                    <Image src={bannerfirst} alt="Banner" className="w-full object-contain" />
                </div>

                {/* Slide 2 with Announcement */}
                <div className="relative">
                    <Image src={image2} alt="Banner" className="w-full object-contain mt-5" />
                    
                    {/* Announcement Overlay */}
                    {announcement && (
                        <div className="absolute top-10 left-1/4 transform -translate-x-1/4 mt-[150px] mr-[100px] bg-white bg-opacity-80 p-4 rounded-lg shadow-md max-w-md text-center">
                            <h2 className="text-xl font-bold text-[#3333DD]">{announcement.title}</h2>
                            <p className="mt-2 text-gray-700">{announcement.description}</p>
                        </div>
                    )}
                </div>
                
                <div>
                    <Image src={bannerthird} alt="Banner" className="w-full object-contain" />
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;
