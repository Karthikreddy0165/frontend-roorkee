import { useRouter } from "next/router";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { PiNotepadBold } from "react-icons/pi";
import { FaBriefcase } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";

import image01 from "../assets/Image01.png";
import image02 from "../assets/Image02.png";
import image03 from "../assets/Image03.png";

import Image from "next/image";

import NavBar from "@/components/NavBar";

const HomePage = () => {
  const router = useRouter();

  const handleClickGetStarted =() =>{
    router.push("/HeroPage")
  }

  const handleSchemesClick = () => {
    router.push("/HeroPage?tab=Schemes");
  };

  const handleJobsClick = () => {
    router.push("/HeroPage?tab=Job Openings");
  };

  const handleScholarshipsClick = () => {
    router.push("/HeroPage?tab=Scholarships");
  };

  return (
    <>
      <NavBar />
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-white text-black"
        style={{ maxWidth: "80%", margin: "0 auto" }}
      >
        {/* Main Container */}
        <div
          className=" p-[50px_0]"
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          {/* First Row */}
          <div className="flex justify-center gap-8">
            {/* Left Div */}
            <div className="flex flex-col w-[482px] items-start gap-[20px]">
              <h1 className="text-[#3F3BE1] font-inter text-[40px] font-semibold">
                Discover best Schemes, Jobs and Scholarships
              </h1>
              <p className="text-[#424242] font-inter text-[16px] font-normal leading-[180%]">
                Helping all communities across India find personalized schemes,
                jobs, and scholarships based on eligibility.
              </p>
              <button className="flex h-[44px] px-[44px] py-[10px] justify-center items-center gap-[10px] rounded-[8px] bg-[#3431BB] text-white mb-[12px] mt-[12px] hover:bg-blue-700"
              onClick={handleClickGetStarted}>
                Get Started
              </button>
              <div className="flex w-[472px] h-[59px] items-start gap-[40px]">
                <div className="flex flex-col justify-center items-start gap-[8px] flex-1 border-r-[1px] border-[#EDEDED]">
                  <div className="text-center text-[#000] font-inter text-[14px] font-semibold">
                    Thousand's schemes
                  </div>
                </div>
                <div className="flex flex-col justify-center items-start gap-[8px] flex-1 border-r-[1px] border-[#EDEDED]">
                  <div className="text-center text-[#000] font-inter text-[14px] font-semibold">
                    Hundred's job posting
                  </div>
                </div>
                <div className="flex flex-col justify-center items-start gap-[8px] flex-1">
                  <div className="text-center text-[#000] font-inter text-[14px] font-semibold">
                    Multiple scholarships
                  </div>
                </div>
              </div>
            </div>
            {/* Right Div */}
            <div className="w-[482px] h-[300px]">
              {/* Right content here */}
              <Image
                className="relative h-[344px] w-[258px] rounded-tl-[10rem] -right-[230px] pb-8"
                src={image01}
                alt="Image loading..."
              />
              <Image
                className="relative h-[80.7px] w-[80px] rounded-tl-[10rem] rounded-tr-[10rem] rounded-bl-[10rem] -right-[140px] bottom-[300px]"
                src={image02}
                alt="Image loading..."
              />
              <Image
                className="relative h-[150px] w-[132px] rounded-tl-[4rem] -right-[120px] bottom-[230px]"
                src={image03}
                alt="Image loading..."
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-col items-center w-full p-8 bg-gradient-to-b from-white to-[#FDFBF6] mt-8">
            <div className="self-stretch flex justify-center">
              <p className="text-center text-[#C89456] font-inter text-[16px] font-normal leading-normal">
                HOW IT WORKS
              </p>
            </div>
            <div className="self-stretch flex justify-center mt-4">
              <h1 className="text-center text-black font-inter text-[32px] font-semibold leading-[150%]">
                Easy and Simple steps to find right resource
              </h1>
            </div>

            <div className="steps flex h-[155px] gap-[20px] items-center mt-4 justify-content-center  ">
              <div>
                <p className="text-[#C89456] font-inter text-[14px] font-semibold leading-normal">
                  Step 1
                </p>
                <div className="containt flex h-[140px] w-[318px] justify-center items-center gap-[8px] flex-[1_0_0] self-stretch rounded-[8px] border border-[#C89456]">
                  <div className="flex w-[60px] h-[60px] pt-[12px] pr-[11.5px] pb-[12px] pl-[12.5px] justify-center items-center rounded-full bg-[#F6EEE4]">
                    <HiOutlineClipboardDocumentList className="h-[31.5px] w-[31.5px]" />
                  </div>
                  <div className="text-[#424242] w-[8rem] font-inter text-base font-normal leading-normal">
                    Tell us a little about yourself.
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[#C89456] font-inter text-[14px] font-semibold leading-normal">
                  Step 2
                </p>
                <div className="containt flex h-[140px] w-[318px] justify-center items-center gap-[8px] flex-[1_0_0] self-stretch rounded-[8px] border border-[#C89456]">
                  <div className="flex w-[60px] h-[60px] pt-[12px] pr-[11.5px] pb-[12px] pl-[12.5px] justify-center items-center rounded-full bg-[#F6EEE4]">
                    <HiOutlineClipboardDocumentList className="h-[31.5px] w-[31.5px]" />
                  </div>
                  <div className="text-[#424242] w-[9.5rem] line-clamp-2 font-inter text-[16px] font-normal leading-normal">
                    We will find the best results for you.
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[#C89456] font-inter text-[14px] font-semibold leading-normal">
                  Step 3
                </p>
                <div className="containt flex h-[140px] w-[318px] justify-center items-center gap-[8px] flex-[1_0_0] self-stretch rounded-[8px] border border-[#C89456]">
                  <div className="flex w-[60px] h-[60px] pt-[12px] pr-[11.5px] pb-[12px] pl-[12.5px] justify-center items-center rounded-full bg-[#F6EEE4]">
                    <HiOutlineClipboardDocumentList className="h-[31.5px] w-[31.5px]" />
                  </div>
                  <p className="text-[#424242] w-[7rem] line-clamp-2 font-inter text-[16px] font-normal leading-normal">
                    Apply to best suited results.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Third row */}
          <div
            style={{
              marginTop: "3vw",
              width: "70w",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h1 className=" font-semibold relative left-[27.45vw] w-[15.09vw] text-[2.2vw]">
              Discover right{" "}
            </h1>
            <div
              className=" mt-[3vmax] flex text-[#3431BB] "
              style={{
                width: "70vw",
                justifyContent: "space-between",
              }}
            >
              <div className="group w-[22vw] h-[17.46vw] rounded-[8px] bg-[#EEF] p-[3.48vw] hover:text-white hover:bg-[#3431BB] hover:cursor-pointer" onClick={handleSchemesClick}>
                <p className="">SCHEMES</p>
                <PiNotepadBold className="text-[#3F3BE1] opacity-[20%] relative h-[6.80vw] w-[5.76vw] left-[9.28vw] top-[3.5vw] group-hover:text-[#FFFFFF]" />
              </div>
              <div className="group w-[22vw] h-[17.46vw] rounded-[8px] bg-[#EEF] p-[3.48vw] hover:text-white hover:bg-[#3431BB] hover:cursor-pointer" onClick={handleJobsClick}>
                <p>JOBS</p>
                <FaBriefcase className="text-[#3F3BE1] opacity-[20%] relative h-[6.80vw] w-[5.76vw] left-[9.28vw] top-[3.5vw] group-hover:text-[#FFFFFF]" />
              </div>
              <div className=" group w-[22vw] h-[17.46vw] rounded-[8px] bg-[#EEF] p-[3.48vw] hover:text-white hover:bg-[#3431BB] hover:cursor-pointer" onClick={handleScholarshipsClick}>
                <p>SCHOLARSHIPS</p>
                <FaGraduationCap
                  className="text-[#3F3BE1] opacity-[20%] relative h-[6.80vw] w-[5.76vw] left-[9.28vw] top-[3.5vw] group-hover:text-[#FFFFFF] "/>
              </div>
            </div>
          </div>

          {/* fourth row */}
          <div className="flex flex-col items-center w-full p-8 bg-gradient-to-b from-white to-[#FDFBF6] mt-8">
            <div className="self-stretch flex justify-center mt-4">
              <h1 className="text-center text-black font-inter text-[32px] font-semibold leading-[150%]">
                Frequently Asked Questions
              </h1>
            </div>

            <div className=" items-start self-stretch">
              <div className="flex p-4 justify-between items-center self-stretch">
                <p>What is product name?</p>
                <span>+</span>
              </div>
              <hr />

              <div className="flex p-4 justify-between items-center self-stretch">
                <p>How will this help me?</p>
                <span>+</span>
              </div>
              <hr />

              <div className="flex p-4 justify-between items-center self-stretch">
                <p>Can I get all information regarding Govt and State? </p>
                <span>+</span>
              </div>
              <hr />

              <div className="flex p-4 justify-between items-center self-stretch">
                <p>How can I apply to all schemes, jobs and scholarships?</p>
                <span>+</span>
              </div>
              <hr />
            </div>
          </div>

          {/* fifth row */}
          <div className="flex flex-col items-center w-full p-8 bg-gradient-to-b from-white to-[#FDFBF6] mt-8">
            Made by
            <div className=" mt-7 flex justify-between w-full mb-0">
              <div className="w-20 h-20 rounded-full bg-[#EEF] flex items-center justify-center text-onclick-btnblue hover:bg-onclick-btnblue hover:text-white">NST</div>
              <div className="w-20 h-20 rounded-full bg-[#EEF] flex items-center justify-center text-onclick-btnblue hover:bg-onclick-btnblue hover:text-white">SSF</div>
              <div className="w-20 h-20 rounded-full bg-[#EEF] flex items-center justify-center text-onclick-btnblue hover:bg-onclick-btnblue hover:text-white">IITR</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
