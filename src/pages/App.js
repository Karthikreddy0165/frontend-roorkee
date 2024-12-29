import { useRouter } from "next/router";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa6";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { PiNotepadBold } from "react-icons/pi";
import { useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import '../styles/app.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleRoof,faArrowUpRightDots,faHandsHoldingChild } from '@fortawesome/free-solid-svg-icons';
import image01 from "../assets/Image001.png";
import image02 from "../assets/Image002.png";
import image03 from "../assets/Image003.png";

// import preferencesModal from "../pages/Modals/PreferencesModal";
import image04 from "../assets/Image004.png";

import Image from "next/image";

import { useTabContext } from "@/Context/TabContext";
import NavBar from '../components/NavBar';
import VerifiedStatus from "@/components/isVerfiedComponent";
import FAQSection from "src/Context/FAQSection.js"; // Import FAQSection
const App = () => {
  const { authState, logout } = useAuth();
  const router = useRouter();
  const { activeTab, setActiveTab } = useTabContext();

  const handleClickGetStarted = () => {
    router.push("/login");
  };

  const handleClickAfterLogin =() =>{
    router.push("/AllSchemes")
  }

  const handleClickFindrightSchemeForYOu = () => {
    router.push("/Modals/PreferencesModal");
  };

  const handleSchemesClick = () => {
    setActiveTab("Schemes");
    router.push("/AllSchemes?tab=Schemes");
  };

  const handleJobsClick = () => {
    setActiveTab("Job Openings");
    router.push("/AllSchemes?tab=Job Openings");
  };

  const handleScholarshipsClick = () => {
    setActiveTab("Scholarships");
    router.push("/AllSchemes?tab=Scholarships");
  };

  return (
    <div>
      <NavBar />
      <VerifiedStatus />
      

      <div className="sm:w-full w-[482px] mx-auto">
        {/* Main Container */}
        <div className=" p-[50px_0]">
          {/* First Row */}
          <div className="flex flex-col items-center lg:flex-row justify-center gap-8 p-4">
            {/* Left Div */}
            <div className="flex flex-col w-full lg:w-[482px]  items-start gap-[20px] lg:text-left">
              <h1 className="text-[#3F3BE1] font-inter text-[1.5rem] lg:text-[40px] font-semibold">
                Empowering the marginalized community
              </h1>
              <p className="text-[#424242]  text-[16px] font-start leading-[180%]">
                Helping all communities across India find personalized schemes, jobs, and scholarships based on eligibility.
              </p>

              {authState.token ? (
                <button
                  className="flex h-[44px] px-[44px] py-[10px] justify-center items-center gap-[10px] rounded-[8px] bg-[#3431BB] text-white mt-[12px] hover:bg-blue-700 hidden sm:block"
                  onClick={handleClickAfterLogin}
                >
                  My Schemes
                </button>
              ) : (
                <button
                  className="flex h-[44px] px-[44px] py-[10px] justify-center items-center gap-[10px] hidden sm:block rounded-[8px] bg-[#3431BB] text-white mt-[12px] hover:bg-blue-700"
                  onClick={handleClickGetStarted}
                >
                  Get Started
                </button>
              )}

            <div className="hidden sm:flex w-full max-w-[472px] h-auto items-center gap-[40px] sm:justify-between sm:flex-row">
              <div className="flex flex-col justify-center items-center flex-1 border-r-[1px] border-[#EDEDED] sm:border-r">
                <div className="text-center text-[#000] font-inter text-[14px] font-semibold">
                  Thousands of schemes
                </div>
              </div>
              <div className="flex flex-col justify-center items-center flex-1 border-r-[1px] border-[#EDEDED] sm:border-r">
                <div className="text-center text-[#000] font-inter text-[14px] font-semibold">
                  Hundred+ job postings
                </div>
              </div>
              <div className="flex flex-col justify-center items-center flex-1 sm:border-none">
                <div className="text-center text-[#000] font-inter text-[14px] font-semibold">
                  Multiple scholarships
                </div>
              </div>
            </div>



            </div>

            {/* Right Div */}
            <div className="w-[482px] h-[300px] mr-[30px] mb-[20px]">
              {/* Right Modals here */}
              <Image
                className="relative h-[334px] w-[258px] rounded-tl-[10rem] -right-[190px] pb-8"
                src={image01}
                alt="Image loading..."
              />
              <Image
                className="relative h-[120.7px] w-[120px] rounded-tl-[10rem] rounded-tr-[10rem] rounded-bl-[10rem] -right-[60px] bottom-[280px]"
                src={image02}
                alt="Image loading..."
              />
              <Image
                className="relative bg-white h-[160px] w-[155px] rounded-tl-[4rem] -right-[70px] bottom-[260px] p-2"
                src={image03}
                alt="Image loading..."
              />
              <Image
                className="relative bg-white h-[120px] w-[112px] rounded-br-[4rem] -right-[380px] bottom-[380px] p-2"
                src={image04}
                alt="Image loading..."
              />
            </div>
            {authState.token ? (
                <button
                  className="flex h-[44px] px-[44px] py-[10px] justify-center items-center  gap-[20px] rounded-[8px] bg-[#3431BB] text-white mt-[12px] hover:bg-blue-700 block sm:hidden"
                  onClick={handleClickAfterLogin}
                >
                  My Schemes
                </button>
              ) : (
                <button
                  className="flex h-[44px] px-[44px] py-[10px] justify-center items-center gap-[10px] rounded-[8px] bg-[#3431BB] text-white mt-[12px] hover:bg-blue-700 block sm:hidden"
                  onClick={handleClickGetStarted}
                >
                  Get Started
                </button>
              )}

              <div className="flex w-[472px] h-[59px] items-start gap-[40px]  block sm:hidden">
                <div className="flex flex-col justify-center items-start  flex-1 border-r-[1px] border-[#EDEDED]">
                  <div className="text-center text-[#000] font-inter text-[14px] font-semibold">
                    Thousands of schemes
                  </div>
                </div>
                <div className="flex flex-col justify-center items-start  flex-1 border-r-[1px] border-[#EDEDED]">
                  <div className="text-center text-[#000] font-inter text-[14px] font-semibold">
                    Hundred+ job posting
                  </div>
                </div>
                <div className="flex flex-col justify-center items-start  flex-1">
                  <div className="text-center text-[#000] font-inter text-[14px] font-semibold">
                    Multiple scholarships
                  </div>
                </div>
              </div>

          </div>
        </div>

          {/* Second Row */}
        <div className="flex flex-col items-center w-full bg-gradient-to-b from-white to-[#FBFBFE] mt-[16px]">
            <div className="self-stretch flex justify-center">
              <p className="text-center text-[#3431BB] font-semibold text-[16px] font-normal leading-normal">
                HOW IT WORKS
              </p>
            </div>
            <div className="self-stretch flex justify-center mt-4">
              <h1 className="text-center text-black font-inter text-[24px] font-semibold leading-[150%]">
                Easy and Simple steps to find right resource
              </h1>
            </div>

            <div className="steps grid gap-4 sm:grid-cols-1 lg:grid-cols-3 items-center mt-4">
           {/* Step 1 */}
                <div className="flex flex-col gap-4  lg:items-start">
                  <p className="text-[#3F3BE1] font-inter text-[14px] font-semibold leading-normal">
                    Step 1
                  </p>
                  <div className="flex h-[160px] w-[318px] items-start lg:w-[318px] justify-center items-center gap-4 rounded-[8px] border border-[#3F3BE1] p-4">
                    <div className="flex w-[60px] h-[60px] justify-center items-center rounded-full bg-[#3F3BE1] bg-opacity-[10%]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-check"><path d="M11 18H3"/><path d="m15 18 2 2 4-4"/><path d="M16 12H3"/><path d="M16 6H3"/></svg>
                    </div>
                    <div className="text-[#424242] text-center lg:text-left w-[8rem] font-inter text-base font-normal leading-normal">
                      Tell Us About Yourself
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col gap-4  lg:items-start">
                  <p className="text-[#3F3BE1] font-inter text-[14px] font-semibold leading-normal">
                    Step 2
                  </p>
                  <div className="flex h-[160px] w-full lg:w-[318px] justify-center items-center gap-4 rounded-[8px] border border-[#3F3BE1] p-4">
                    <div className="flex w-[60px] h-[60px] justify-center items-center rounded-full bg-[#3F3BE1] bg-opacity-[10%]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>      </div>
                    <div className="text-[#424242] text-center lg:text-left w-[8rem] font-inter text-base font-normal leading-normal">
                      We will find the best results for you.
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col gap-4  lg:items-start">
                  <p className="text-[#3F3BE1] font-inter text-[14px] font-semibold leading-normal">
                    Step 3
                  </p>
                  <div className="flex h-[160px] w-full lg:w-[318px] justify-center items-center gap-4 rounded-[8px] border border-[#3F3BE1] p-4">
                    <div className="flex w-[60px] h-[60px] justify-center items-center rounded-full bg-[#3F3BE1] bg-opacity-[10%]">
                      <HiOutlineClipboardDocumentList className="h-[31.5px] w-[31.5px]" />
                    </div>
                    <div className="text-[#424242] text-center lg:text-left w-[8rem] font-inter text-base font-normal leading-normal">
                      Apply to best-suited results.
                    </div>
                  </div>
                </div>
              </div>

            <div className="self-stretch flex justify-center mt-8 ">
              <button
                className="text-center text-white font-inter text-[16px] font-normal leading-normal bg-[#3431BB] pt-[10px] pr-[44px] pb-[10px] pl-[44px] rounded-[8px] hover:bg-blue-700"
                onClick={handleClickFindrightSchemeForYOu}
              >
                Find the Right scheme for me
              </button>
            </div>

          </div>
          {/* Third row */}
          <div
              className=""
              style={{
                marginTop: "3vw",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="flex justify-center mt-[16px] sm:mt-[32px]">
                <h1 className="font-semibold relative sm:text-3xl text-xl text-center ">
                  Discover Opportunities Below
                </h1>
              </div>

              <div
                className="grid grid-cols-3 gap-4 items-center justify-center mt-10 sm:flex sm:flex-wrap sm:flex-nowrap sm:gap-4 font-semibold hover:text-white"
              >
                {/* SCHEMES */}
                <div
                  className="group w-full sm:w-[22vw] h-[100px] sm:h-[17.46vw] rounded-[8px] bg-[#EEF] p-4 sm:p-[3.48vw] hover:text-white hover:bg-[#3431BB] hover:cursor-pointer flex flex-col justify-center items-center"
                  onClick={handleSchemesClick}
                >
                  <p className="text-xs sm:text-base text-center text-[#3330BA] hover:text-white">SCHEMES</p>
                  <PiNotepadBold className="text-[#3F3BE1] opacity-[20%] h-[40px] sm:h-[6.80vw] w-[40px] sm:w-[5.76vw] group-hover:text-[#FFFFFF] mt-2" />
                </div>

                {/* JOBS */}
                <div
                  className="group w-full sm:w-[22vw] h-[100px] sm:h-[17.46vw] rounded-[8px] bg-[#EEF] p-4 sm:p-[3.48vw] hover:text-white hover:bg-[#3431BB] hover:cursor-pointer flex flex-col justify-center items-center"
                  onClick={handleJobsClick}
                >
                  <p className="text-xs sm:text-base text-center text-[#3330BA] hover:text-white">JOBS</p>
                  <FaBriefcase className="text-[#3F3BE1] opacity-[20%] h-[40px] sm:h-[6.80vw] w-[40px] sm:w-[5.76vw] group-hover:text-[#FFFFFF] mt-2" />
                </div>

                {/* SCHOLARSHIPS */}
                <div
                  className="group w-full sm:w-[22vw] h-[100px] sm:h-[17.46vw] rounded-[8px] bg-[#EEF] p-4 sm:p-[3.48vw] hover:text-white hover:bg-[#3431BB] hover:cursor-pointer flex flex-col justify-center items-center"
                  onClick={handleScholarshipsClick}
                >
                  <p className="text-xs sm:text-base text-center text-[#3330BA] hover:text-white">SCHOLARSHIPS</p>
                  <FaGraduationCap className="text-[#3F3BE1] opacity-[20%] h-[40px] sm:h-[6.80vw] w-[40px] sm:w-[5.76vw] group-hover:text-[#FFFFFF] mt-2" />
                </div>
              </div>


              {/* Mission, Vision, and Values Section */}
              
              <div className="relative flex flex-col lg:flex-row justify-between gap-6 mt-[32px] px-6 sm:mt-[100px]">
                {/* Mission Section */}
                <div className=" flex flex-col gap-2 p-6 border border-[#3F3BE1] rounded-lg h-[250px] sm:w-[550px] sm:h-[266px]  relative">
                  <p className="font-semibold text-lg lg:text-left">Mission</p>
                  <p className="text-[#616161] lg:text-left">
                    Spread the feeling of harmony and build a strong, discrimination-free nation.
                  </p>
                  <div className="absolute bottom-4 right-4 text-4xl sm:text-3xl md:text-4xl lg:text-4xl text-gray-400">
                  <svg width="100" height="100" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24.982 17.3751C24.781 19.3228 23.918 21.1426 22.537 22.5306C21.156 23.9186 19.3406 24.7908 17.394 25.0016C17.3548 25.0012 17.3159 25.0085 17.2796 25.0233C17.2433 25.0381 17.2103 25.06 17.1826 25.0877C17.1548 25.1154 17.1329 25.1484 17.1182 25.1847C17.1034 25.221 17.096 25.2599 17.0965 25.2991V31.6656C17.0965 31.8234 17.0338 31.9748 16.9222 32.0864C16.8106 32.1979 16.6593 32.2606 16.5015 32.2606C16.3437 32.2606 16.1923 32.1979 16.0807 32.0864C15.9692 31.9748 15.9065 31.8234 15.9065 31.6656V29.3556C15.9008 29.2786 15.8676 29.2062 15.813 29.1516C15.7584 29.097 15.686 29.0638 15.609 29.0581C12.9627 28.844 10.4525 27.7957 8.4399 26.0642C6.42726 24.3327 5.0159 22.0073 4.40896 19.4226C4.38637 19.346 4.37942 19.2657 4.38853 19.1864C4.39764 19.1071 4.42262 19.0304 4.46198 18.9609C4.50134 18.8915 4.55428 18.8306 4.61765 18.782C4.68101 18.7335 4.75351 18.6981 4.83081 18.6782C4.90811 18.6582 4.98865 18.654 5.06761 18.6658C5.14657 18.6776 5.22236 18.7052 5.29044 18.7469C5.35852 18.7886 5.41752 18.8436 5.46391 18.9085C5.5103 18.9735 5.54314 19.0472 5.56046 19.1251C6.10005 21.4452 7.35821 23.5357 9.15563 25.0987C10.9531 26.6617 13.198 27.6174 15.5705 27.8296C15.6475 27.8681 15.721 27.8296 15.7945 27.7561C15.8333 27.7342 15.8647 27.7011 15.8847 27.6612C15.9046 27.6213 15.9122 27.5764 15.9065 27.5321V25.2991C15.9069 25.2599 15.8996 25.221 15.8848 25.1847C15.87 25.1484 15.8481 25.1154 15.8204 25.0877C15.7927 25.06 15.7597 25.0381 15.7234 25.0233C15.6871 25.0085 15.6482 25.0012 15.609 25.0016C13.6716 24.7858 11.8638 23.9226 10.478 22.5516C9.09244 21.1591 8.22749 19.3328 8.02796 17.3786C8.01661 17.3071 7.9807 17.2418 7.92641 17.1939C7.87212 17.146 7.80283 17.1185 7.73046 17.1161H1.36396C1.20152 17.1161 1.04573 17.0516 0.930862 16.9367C0.815996 16.8219 0.751465 16.6661 0.751465 16.5036C0.751465 16.3412 0.815996 16.1854 0.930862 16.0705C1.04573 15.9557 1.20152 15.8911 1.36396 15.8911H3.78246C3.85463 15.8881 3.92357 15.8604 3.97774 15.8126C4.0319 15.7648 4.06799 15.6999 4.07996 15.6286C4.23878 12.9863 5.22056 10.4598 6.88765 8.4036C8.55474 6.34736 10.8235 4.86439 13.376 4.16262C13.5305 4.13328 13.6905 4.1642 13.823 4.24903C13.9555 4.33386 14.0505 4.46617 14.0885 4.61883C14.1266 4.77149 14.1048 4.93292 14.0276 5.07002C13.9504 5.20711 13.8237 5.30948 13.6735 5.35612C11.3899 5.97189 9.3557 7.28538 7.85478 9.1132C6.35387 10.941 5.46122 13.1919 5.30146 15.5516C5.29159 15.5951 5.29199 15.6403 5.30261 15.6836C5.31323 15.7269 5.3338 15.7671 5.36267 15.801C5.39154 15.835 5.42792 15.8618 5.46894 15.8792C5.50995 15.8967 5.55447 15.9044 5.59896 15.9016H7.71646C7.78883 15.8993 7.85812 15.8718 7.91241 15.8239C7.9667 15.776 8.00261 15.7106 8.01396 15.6391C8.21216 13.6879 9.07486 11.864 10.4575 10.473C11.8402 9.08205 13.6589 8.20847 15.609 7.99862C15.6482 7.99909 15.6871 7.99172 15.7234 7.97693C15.7597 7.96215 15.7927 7.94025 15.8204 7.91253C15.8481 7.88481 15.87 7.85183 15.8848 7.81553C15.8996 7.77922 15.9069 7.74032 15.9065 7.70112V1.33462C15.9065 1.17682 15.9692 1.02548 16.0807 0.913896C16.1923 0.802311 16.3437 0.739624 16.5015 0.739624C16.6593 0.739624 16.8106 0.802311 16.9222 0.913896C17.0338 1.02548 17.0965 1.17682 17.0965 1.33462V8.55512C17.1005 8.63938 17.0868 8.72353 17.0564 8.8022C17.026 8.88087 16.9794 8.95231 16.9198 9.01196C16.8602 9.0716 16.7887 9.11812 16.71 9.14854C16.6314 9.17897 16.5472 9.19262 16.463 9.18862C9.99146 9.18862 6.75746 17.1126 11.332 21.6906C15.9065 26.2686 23.715 22.9926 23.827 16.5001C23.826 16.4217 23.8408 16.3439 23.8703 16.2713C23.8999 16.1987 23.9437 16.1327 23.9991 16.0773C24.0546 16.0219 24.1205 15.9781 24.1932 15.9485C24.2658 15.9189 24.3436 15.9042 24.422 15.9051H31.639C31.8014 15.9051 31.9572 15.9697 32.0721 16.0845C32.1869 16.1994 32.2515 16.3552 32.2515 16.5176C32.2515 16.6801 32.1869 16.8359 32.0721 16.9507C31.9572 17.0656 31.8014 17.1301 31.639 17.1301H29.259C29.1851 17.1272 29.113 17.1528 29.0575 17.2017C29.0021 17.2506 28.9677 17.319 28.9615 17.3926C28.7683 20.0515 27.74 22.5813 26.0235 24.621C24.3069 26.6606 21.9898 28.1058 19.403 28.7501C18.6225 28.9356 18.353 27.7456 19.1405 27.5601C21.4506 26.9857 23.5224 25.7011 25.0639 23.8871C26.6053 22.0731 27.5389 19.8212 27.733 17.4486C27.7428 17.4052 27.7424 17.36 27.7318 17.3167C27.7212 17.2734 27.7006 17.2332 27.6718 17.1992C27.6429 17.1652 27.6065 17.1385 27.5655 17.121C27.5245 17.1035 27.48 17.0959 27.4355 17.0986H25.2795C25.2071 17.101 25.1378 17.1285 25.0835 17.1764C25.0292 17.2243 24.9933 17.2896 24.982 17.3611V17.3751ZM29.8015 7.47712L25.5 11.7541C25.3949 11.8682 25.2489 11.9361 25.094 11.9431H22.2275C22.1492 11.95 22.0737 11.9752 22.007 12.0166L16.911 17.1511C16.7964 17.2582 16.6447 17.3166 16.4879 17.3141C16.3311 17.3116 16.1814 17.2484 16.0703 17.1377C15.9592 17.0271 15.8954 16.8776 15.8922 16.7208C15.8891 16.564 15.9469 16.4121 16.0535 16.2971L21.1495 11.1591C21.1837 11.1419 21.2125 11.1154 21.2323 11.0826C21.2521 11.0497 21.2622 11.012 21.2615 10.9736V8.10012C21.2607 8.01734 21.2768 7.93527 21.3087 7.85887C21.3406 7.78248 21.3876 7.71333 21.447 7.65562L25.724 3.38212C25.8065 3.29284 25.9141 3.23049 26.0326 3.20321C26.1512 3.17593 26.2752 3.18497 26.3885 3.22916C26.5018 3.27335 26.5992 3.35065 26.6679 3.45097C26.7367 3.55129 26.7736 3.67 26.774 3.79162V6.13662C26.7789 6.2139 26.8118 6.28673 26.8666 6.34149C26.9214 6.39624 26.9942 6.42918 27.0715 6.43412H29.378C29.501 6.4309 29.6221 6.46481 29.7256 6.53143C29.8291 6.59806 29.9101 6.69431 29.9581 6.80764C30.006 6.92097 30.0188 7.04612 29.9946 7.16679C29.9704 7.28746 29.9104 7.39804 29.8225 7.48412L29.8015 7.47712ZM24.9015 10.6271L27.3935 8.13512C27.4368 8.09512 27.4674 8.04329 27.4815 7.98605C27.4956 7.92882 27.4925 7.8687 27.4728 7.81316C27.453 7.75763 27.4174 7.70911 27.3703 7.67364C27.3233 7.63817 27.2668 7.6173 27.208 7.61362H26.158C25.9954 7.61742 25.8379 7.55717 25.7194 7.44585C25.6009 7.33454 25.5308 7.18109 25.5245 7.01862V6.00012C25.5242 5.93985 25.5062 5.88098 25.4728 5.83082C25.4393 5.78066 25.3919 5.74141 25.3364 5.71793C25.2809 5.69446 25.2197 5.68779 25.1604 5.69876C25.1012 5.70972 25.0464 5.73784 25.003 5.77962L22.553 8.27162C22.4876 8.32861 22.4473 8.40911 22.441 8.49562V10.4311C22.4405 10.4703 22.4479 10.5092 22.4627 10.5455C22.4774 10.5818 22.4993 10.6148 22.5271 10.6425C22.5548 10.6703 22.5878 10.6921 22.6241 10.7069C22.6604 10.7217 22.6993 10.7291 22.7385 10.7286H24.709C24.786 10.7286 24.8595 10.7286 24.8945 10.6516L24.9015 10.6271ZM21.5555 16.5071C21.5568 17.5078 21.2613 18.4865 20.7063 19.3192C20.1512 20.1519 19.3617 20.8012 18.4374 21.185C17.5132 21.5687 16.4959 21.6697 15.5143 21.475C14.5327 21.2804 13.6309 20.7989 12.923 20.0916C12.2151 19.3842 11.7331 18.4827 11.5377 17.5012C11.3424 16.5197 11.4427 15.5024 11.8258 14.5779C12.2089 13.6534 12.8577 12.8634 13.69 12.3078C14.5223 11.7521 15.5007 11.4559 16.5015 11.4566C16.6518 11.4681 16.7923 11.536 16.8948 11.6467C16.9973 11.7573 17.0542 11.9026 17.0542 12.0534C17.0542 12.2042 16.9973 12.3494 16.8948 12.4601C16.7923 12.5707 16.6518 12.6386 16.5015 12.6501C15.4804 12.6501 14.5011 13.0557 13.7791 13.7778C13.0571 14.4998 12.6515 15.479 12.6515 16.5001C12.6515 17.5212 13.0571 18.5005 13.7791 19.2225C14.5011 19.9445 15.4804 20.3501 16.5015 20.3501C18.7345 20.3501 20.222 18.6771 20.3305 16.5001C20.327 16.4157 20.3409 16.3314 20.3714 16.2526C20.4018 16.1738 20.4482 16.102 20.5076 16.0419C20.5669 15.9818 20.6381 15.9345 20.7165 15.903C20.7949 15.8715 20.879 15.8565 20.9635 15.8589C21.048 15.8613 21.131 15.8811 21.2076 15.917C21.2841 15.9529 21.3524 16.0041 21.4082 16.0676C21.4641 16.131 21.5063 16.2052 21.5322 16.2857C21.5582 16.3661 21.5673 16.451 21.559 16.5351L21.5555 16.5071Z" fill="black"/>
              </svg>
              </div>
                </div>

                {/* Vision Section */}
                <div className="flex flex-col gap-2 p-6 border border-[#3F3BE1] rounded-lg sm:w-[550px] sm:h-[266px]  h-[250px] relative">
                  <p className="font-semibold text-lg lg:text-left">Vision</p>
                  <p className="text-[#616161] lg:text-left">
                    To be a significant contributor in the building of a discrimination-free and harmonious society.
                  </p>
                  <div className="absolute bottom-4 right-4 ">
                  <svg width="100" height="100" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.74525 28.468V26.7162L6.63831 24.9733V30.1338C6.63831 30.395 6.42647 30.6068 6.16533 30.6068C5.9042 30.6068 5.69235 30.395 5.69235 30.1338V24.1657C5.69233 24.0831 5.71391 24.0021 5.75497 23.9305C5.79602 23.8589 5.85511 23.7993 5.92635 23.7577C5.9975 23.7158 6.07841 23.6933 6.16099 23.6924C6.24356 23.6916 6.3249 23.7125 6.39687 23.753L10.4495 26.0267C10.5228 26.0678 10.5839 26.1277 10.6263 26.2002C10.6688 26.2728 10.6912 26.3553 10.6912 26.4394V28.468C10.6912 28.7291 10.4794 28.941 10.2182 28.941C9.95709 28.941 9.74525 28.7291 9.74525 28.468ZM1.04569 23.6502V18.0124C1.04569 16.4048 2.63334 15.6852 4.20684 15.6852H4.60011C3.97202 15.1056 3.56173 14.1736 3.56173 13.1212C3.56173 11.5065 4.53168 10.5034 6.09287 10.5034C7.65434 10.5034 8.62436 11.5065 8.62436 13.1212C8.62436 14.1736 8.21406 15.1056 7.58591 15.6852H11.2978C11.4487 15.6852 11.5685 15.6655 11.7117 15.6172L13.4789 15.0203L14.6724 14.6036L17.2549 13.6914C17.4843 13.6104 17.6567 13.4912 17.8135 13.3049L18.6422 12.3197C19.5773 11.2072 20.3157 10.3284 21.6937 10.3284L22.9331 10.315C22.2076 9.74019 21.723 8.72628 21.723 7.57025C21.723 5.92519 22.7111 4.90314 24.3016 4.90314C25.8923 4.90314 26.8804 5.92512 26.8804 7.57025C26.8804 8.70563 26.4135 9.70505 25.7096 10.2849H28.5861L28.5934 7.48897C28.5934 6.74673 29.0881 6.14373 29.778 5.95137V0.472979C29.778 0.347542 29.8279 0.227249 29.9166 0.138552C30.0053 0.0498555 30.1256 1.81257e-05 30.251 3.68025e-10L34.5272 3.68025e-10C34.6084 -3.20641e-06 34.6883 0.0209503 34.7592 0.0608372C34.83 0.100724 34.8893 0.158197 34.9314 0.227705C34.9736 0.297173 34.9972 0.376356 34.9999 0.457597C35.0025 0.538838 34.9841 0.619388 34.9465 0.691455L34.4492 1.6465L34.9465 2.60155C34.9841 2.67362 35.0025 2.75417 34.9999 2.83541C34.9972 2.91665 34.9736 2.99584 34.9314 3.0653C34.8893 3.13482 34.83 3.1923 34.7592 3.23219C34.6884 3.27208 34.6084 3.29302 34.5272 3.29301H30.724V5.96258C31.3752 6.16827 31.8519 6.77079 31.8519 7.48911V11.8769C31.8519 12.7747 31.1221 13.5051 30.2254 13.5051L28.2427 13.5842C27.8605 13.5847 27.5166 13.7285 27.2558 13.9897C26.995 14.251 26.8512 14.5958 26.8512 14.9603V18.1122L30.7714 20.3785C30.8432 20.4201 30.9028 20.4798 30.9443 20.5517C30.9857 20.6236 31.0075 20.7051 31.0075 20.7881V24.7431C31.0075 25.0042 30.7957 25.2161 30.5346 25.2161C30.2734 25.2161 30.0616 25.0042 30.0616 24.7431V21.0608L26.1414 18.7945C26.0696 18.753 26.0099 18.6932 25.9685 18.6214C25.927 18.5495 25.9052 18.468 25.9052 18.385V14.9602C25.9052 14.3433 26.1473 13.7614 26.5863 13.3213C27.026 12.881 27.6077 12.6387 28.2239 12.6387L30.2066 12.5595C30.6008 12.5591 30.906 12.253 30.906 11.8769V7.48911C30.906 7.12407 30.6088 6.82705 30.2436 6.82705C29.8357 6.82705 29.5394 7.10541 29.5394 7.48911L29.5332 10.3782C29.5332 10.867 29.1354 11.269 28.6461 11.2742L21.699 11.2744C20.7962 11.2744 20.3054 11.8113 19.3665 12.9285L18.5372 13.914C18.2693 14.2324 17.962 14.445 17.57 14.5836L15.8376 15.1956C15.9707 15.3344 16.0833 15.4967 16.1616 15.6844C16.2695 15.9433 16.2999 16.2189 16.267 16.4899L18.7414 15.7257C18.9772 15.6529 19.1562 15.5387 19.3212 15.355L20.6333 13.8955C20.6972 13.8242 20.7813 13.7741 20.8743 13.7517C20.9674 13.7293 21.0651 13.7358 21.1544 13.7702C21.2437 13.8044 21.3205 13.8649 21.3747 13.9438C21.4289 14.0226 21.458 14.116 21.4579 14.2117V26.5757C21.4579 26.8368 21.2461 27.0486 20.985 27.0486C20.7238 27.0486 20.512 26.8368 20.512 26.5757V15.445L20.0245 15.9873C19.7425 16.301 19.4234 16.505 19.0204 16.6293L15.259 17.7908L15.2578 17.791L12.5548 18.7554C12.3033 18.845 12.0714 18.885 11.8032 18.885H10.5299C10.1786 18.885 9.84601 19.0241 9.59356 19.2773C9.34104 19.5301 9.20186 19.8636 9.20186 20.2159V22.6186L13.0288 24.8311C13.1006 24.8726 13.1602 24.9324 13.2016 25.0042C13.2431 25.0761 13.2649 25.1576 13.2649 25.2406V28.468C13.2649 28.7291 13.0531 28.941 12.792 28.941C12.5308 28.941 12.319 28.7291 12.319 28.468V25.5134L8.49208 23.301C8.42027 23.2594 8.36064 23.1997 8.31919 23.1278C8.27773 23.0559 8.25591 22.9744 8.2559 22.8914V20.2159C8.2559 19.6111 8.49331 19.0405 8.92411 18.6088C9.35553 18.1768 9.92578 17.9391 10.5299 17.9391H11.8032C11.9624 17.9391 12.0881 17.9175 12.2371 17.8642L14.9607 16.8933C15.0986 16.8353 15.2236 16.7098 15.2898 16.5486C15.3226 16.4692 15.3394 16.3841 15.3391 16.2982C15.3389 16.2123 15.3216 16.1273 15.2882 16.0482C15.1493 15.7149 14.766 15.5567 14.4341 15.6947C14.4242 15.6989 12.0144 16.5133 12.0144 16.5133C11.773 16.5947 11.5519 16.6311 11.2979 16.6311H4.2069C3.98029 16.6311 1.99172 16.6699 1.99172 18.0123V23.6501C1.99172 24.2549 2.40871 24.7644 2.98389 24.951V18.7202C2.98389 18.4591 3.19573 18.2472 3.45687 18.2472C3.718 18.2472 3.92984 18.4591 3.92984 18.7202V25.5013C3.92984 25.5024 3.93019 25.5034 3.93019 25.5044C3.93019 25.5054 3.92984 25.5064 3.92984 25.5075V30.1338C3.92984 30.3949 3.718 30.6067 3.45687 30.6067C3.19573 30.6067 2.98389 30.3949 2.98389 30.1338V25.9319C1.88009 25.7189 1.04569 24.777 1.04569 23.6502ZM30.7239 2.34698H33.7474L33.4964 1.86491C33.4612 1.79747 33.4429 1.72251 33.4429 1.64644C33.4429 1.57036 33.4612 1.49541 33.4964 1.42796L33.7474 0.945889H30.7239V2.34698ZM22.6689 7.57032C22.6689 8.83757 23.4011 9.8687 24.3015 9.8687C25.2018 9.8687 25.9344 8.83764 25.9344 7.57032C25.9344 6.0727 24.9115 5.84917 24.3015 5.84917C23.6918 5.84917 22.6689 6.07277 22.6689 7.57032ZM4.50769 13.1213C4.50769 14.3544 5.21869 15.3575 6.09287 15.3575C6.96705 15.3575 7.6784 14.3544 7.6784 13.1213C7.6784 11.6667 6.685 11.4494 6.09287 11.4494C5.50074 11.4494 4.50769 11.6667 4.50769 13.1213ZM27.9017 25.216C28.0271 25.216 28.1474 25.1661 28.2361 25.0774C28.3248 24.9887 28.3747 24.8685 28.3747 24.743V22.0142C28.3747 21.9301 28.3523 21.8476 28.3098 21.7751C28.2673 21.7025 28.2063 21.6426 28.133 21.6016L23.9868 19.2758C23.9149 19.2352 23.8336 19.2143 23.7511 19.2151C23.6685 19.216 23.5877 19.2385 23.5166 19.2804C23.4454 19.3221 23.3863 19.3816 23.3452 19.4532C23.3042 19.5248 23.2826 19.6059 23.2826 19.6884V26.5755C23.2826 26.8366 23.4944 27.0484 23.7556 27.0484C24.0167 27.0484 24.2285 26.8366 24.2285 26.5755V20.4961L27.4288 22.2913V24.743C27.4288 24.8684 27.4786 24.9887 27.5673 25.0774C27.656 25.1661 27.7763 25.216 27.9017 25.216ZM34.527 27.0001H26.0135C25.8881 27.0001 25.7678 27.05 25.6791 27.1387C25.5904 27.2274 25.5406 27.3477 25.5406 27.4731V28.8969H17.5C17.3746 28.897 17.2543 28.9468 17.1656 29.0355C17.0769 29.1242 17.027 29.2445 17.027 29.3699V30.4794H8.98646C8.86102 30.4794 8.74073 30.5292 8.65203 30.6179C8.56333 30.7066 8.5135 30.8269 8.51348 30.9524V32.2666H0.472979C0.347542 32.2666 0.227249 32.3164 0.138552 32.4051C0.0498555 32.4938 1.81253e-05 32.6141 0 32.7396L0 34.5271C0 34.7882 0.211846 35 0.472979 35C0.734111 35 0.945957 34.7882 0.945957 34.527V33.2125H8.51355V34.527C8.51355 34.7882 8.72539 35 8.98652 35C9.24766 35 9.4595 34.7882 9.4595 34.527V31.4253H17.0271V34.527C17.0271 34.7882 17.2389 35 17.5001 35C17.7612 35 17.973 34.7882 17.973 34.527V29.8428H25.5406V34.527C25.5406 34.7882 25.7525 35 26.0136 35C26.2747 35 26.4866 34.7882 26.4866 34.527V27.9461H34.0542V34.527C34.0542 34.7882 34.266 35 34.5272 35C34.7883 35 35.0001 34.7882 35.0001 34.527V27.4731C35 27.3476 34.9502 27.2274 34.8615 27.1387C34.7728 27.05 34.6525 27.0002 34.527 27.0001Z" fill="black"/>
              </svg>
              </div>

                  
                </div>
              </div>

              {/* Values Section - New Row, Full Width */}
              <div className="mt-8 p-6">
              <div className="flex flex-col gap-2 p-4 sm:p-6 border h-[350px] border-[#3F3BE1] rounded-lg w-full sm:w-[550px] lg:w-[1130px]  sm:h-[250px] relative">
                <p className="font-semibold text-lg">Our Values</p>
                <p className="text-[#616161]">1. Commitment to the Ideology.</p>
                <p className="text-[#616161]">2. Positivity in every action.</p>
                <p className="text-[#616161]">3. Transparency in all the activities.</p>
                <p className="text-[#616161]">4. Being unbiased in our studies and research.</p>
                <p className="text-[#616161]">5. Meaningful contribution in eradicating the feeling of inequality.</p>



                  <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 lg:bottom-6 lg:right-6 text-2xl sm:text-3xl lg:text-4xl text-gray-400" >
                  <svg width="100" height="100" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.5982 17.0726C34.1984 16.3537 33.5502 15.8388 32.773 15.6226C31.9958 15.4065 31.1864 15.516 30.4937 15.9311L22.2953 20.843C22.1992 19.4469 21.2695 18.1994 19.8962 17.8115L10.7452 15.2267C10.7216 15.22 10.6975 15.215 10.6731 15.2117C9.31092 15.0246 8.06751 15.3691 6.97734 16.2357L4.44907 18.2449L4.31991 17.7449C4.28314 17.6013 4.21931 17.4667 4.13211 17.349C4.04491 17.2312 3.93607 17.1325 3.81189 17.0586C3.68817 16.9839 3.55141 16.9354 3.40952 16.916C3.26763 16.8965 3.12342 16.9063 2.98523 16.945L0.807837 17.5504C0.227409 17.7119 -0.118254 18.3333 0.0372496 18.9357L3.19392 31.1613C3.23068 31.3049 3.29451 31.4395 3.38173 31.5573C3.46894 31.6751 3.57781 31.7737 3.70202 31.8476C3.86722 31.9472 4.05486 31.9998 4.24594 32C4.3403 32 4.4352 31.9871 4.52867 31.9612L6.706 31.3558C7.28643 31.1943 7.63209 30.573 7.47658 29.9706L7.34318 29.4539C8.67374 28.4056 9.89341 28.1086 11.3759 28.4614L16.6174 29.7084C17.077 29.8177 17.5189 29.8726 17.9457 29.8726C18.8163 29.8726 19.6242 29.6444 20.3906 29.1853L33.4984 21.3319C34.933 20.4724 35.4263 18.5616 34.5982 17.0726ZM4.25239 30.8584L1.0999 18.649L3.26145 18.0479L6.41393 30.2573L4.25239 30.8584ZM32.9494 20.345L19.8416 28.1985C18.9509 28.7322 17.9764 28.8629 16.8628 28.5978L11.6213 27.3508C9.94728 26.9526 8.50836 27.2381 7.03931 28.2771L4.75651 19.4358L7.64492 17.1402C8.49806 16.462 9.43012 16.1988 10.4935 16.3365L19.6078 18.9109C20.761 19.2367 21.4438 20.4754 21.13 21.6721C20.8161 22.8687 19.6229 23.5773 18.4694 23.2517L13.5812 21.871C13.4408 21.8314 13.2909 21.8513 13.1645 21.9263C13.0382 22.0013 12.9457 22.1253 12.9074 22.2711C12.8885 22.3433 12.8834 22.4186 12.8925 22.4929C12.9016 22.5671 12.9248 22.6387 12.9606 22.7036C12.9964 22.7686 13.0441 22.8256 13.1012 22.8714C13.1582 22.9171 13.2234 22.9508 13.2929 22.9704L18.1811 24.3511C18.4603 24.4302 18.7483 24.4703 19.0377 24.4704C20.3736 24.4704 21.6081 23.6115 22.0924 22.2802L31.0427 16.9178C31.4814 16.655 31.9947 16.5858 32.4888 16.7231C32.9826 16.8605 33.394 17.1868 33.6472 17.642C34.1728 18.5871 33.8598 19.7997 32.9494 20.345ZM7.50458 12.3728H15.1841C15.0904 12.803 15.0429 13.2427 15.0426 13.6838C15.0426 13.8349 15.1004 13.9798 15.2034 14.0867C15.3064 14.1935 15.446 14.2536 15.5916 14.2536H25.9952C26.1409 14.2536 26.2805 14.1935 26.3834 14.0867C26.4864 13.9798 26.5442 13.8349 26.5442 13.6838C26.5442 13.2333 26.4943 12.795 26.4027 12.3728H34.0823C34.2279 12.3728 34.3675 12.3128 34.4705 12.2059C34.5734 12.0991 34.6313 11.9542 34.6313 11.8031C34.6313 9.26779 33.0993 7.09812 30.946 6.23491C31.7333 5.5961 32.2409 4.60235 32.2409 3.48731C32.2409 1.56441 30.7333 0 28.8804 0C27.0274 0 25.52 1.56441 25.52 3.48731C25.52 4.60377 26.0287 5.59859 26.8176 6.23733C25.6455 6.70892 24.6357 7.57334 23.9675 8.7106C23.62 8.47107 23.2483 8.2716 22.859 8.11573C23.6462 7.47692 24.1538 6.48317 24.1538 5.36813C24.1538 3.44523 22.6463 1.88082 20.7934 1.88082C18.9404 1.88082 17.4329 3.44523 17.4329 5.36813C17.4329 6.48317 17.9404 7.47692 18.7277 8.11573C18.3385 8.27163 17.9668 8.4711 17.6192 8.7106C16.9511 7.57327 15.9412 6.70892 14.7691 6.23726C15.558 5.59852 16.0668 4.6037 16.0668 3.48731C16.0668 1.56441 14.5593 0 12.7063 0C10.8534 0 9.34599 1.56434 9.34599 3.48724C9.34599 4.60235 9.85354 5.59603 10.6407 6.23484C8.48756 7.09805 6.95559 9.26772 6.95559 11.803C6.95558 11.8778 6.96977 11.9519 6.99736 12.0211C7.02494 12.0902 7.06538 12.153 7.11636 12.2059C7.16734 12.2588 7.22786 12.3008 7.29448 12.3294C7.36109 12.3581 7.43248 12.3728 7.50458 12.3728ZM26.6179 3.48724C26.6179 2.1926 27.6328 1.13939 28.8803 1.13939C30.1278 1.13939 31.1428 2.19268 31.1428 3.48724C31.1428 4.78181 30.1278 5.8351 28.8803 5.8351C27.6328 5.8351 26.6179 4.78188 26.6179 3.48724ZM28.8803 6.97456C31.2602 6.97456 33.2285 8.83836 33.501 11.2334H26.035C25.7427 10.563 25.334 9.95416 24.8292 9.43743C25.6524 7.92914 27.2018 6.97456 28.8803 6.97456ZM18.5309 5.36799C18.5309 4.07335 19.5459 3.02014 20.7934 3.02014C22.041 3.02014 23.0558 4.07342 23.0558 5.36799C23.0558 6.66256 22.041 7.71585 20.7934 7.71585C19.5459 7.71585 18.5309 6.66263 18.5309 5.36799ZM25.414 13.1141H16.1727C16.4452 10.7192 18.4134 8.85531 20.7934 8.85531C23.1733 8.85531 25.1416 10.7192 25.414 13.1141ZM12.7064 1.13939C13.9539 1.13939 14.9688 2.19268 14.9688 3.48724C14.9688 4.78181 13.9539 5.8351 12.7064 5.8351C11.4589 5.8351 10.444 4.78188 10.444 3.48724C10.444 2.1926 11.4589 1.13939 12.7064 1.13939ZM12.7065 6.97456C14.385 6.97456 15.9344 7.92914 16.7575 9.43743C16.2528 9.95417 15.844 10.563 15.5518 11.2334H8.08577C8.35821 8.83836 10.3266 6.97456 12.7065 6.97456Z" fill="black"/>
              </svg>

                  </div>
                </div>
              </div>

          </div>
          <div>
              <FAQSection />
            </div>

          </div>
            
        </div>

  );
};

export default App;
