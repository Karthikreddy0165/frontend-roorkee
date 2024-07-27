import { useRouter } from "next/router";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { PiNotepadBold } from "react-icons/pi";

import NavBar from "@/components/NavBar";

const HomePage = () => {
  const router = useRouter();

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
        <div className=" p-[50px_0]" style={{
            display:"grid",
            placeItems:"center"
        }}>
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
              <button className="flex h-[44px] px-[44px] py-[10px] justify-center items-center gap-[10px] rounded-[8px] bg-[#3431BB] text-white mb-[12px] mt-[12px]">
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
            <div className="w-[482px] h-[300px] bg-gray-200">
              {/* Right content here */}
              {/* hi this is monu */}
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
                    Tell us a little
                     about yourself.
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
          <div style={{
            marginTop:"3vw",
            width:"70w",
            display:"flex",
            justifyContent:"center",
            flexDirection:"column"
          }}>
            <h1 className=" font-semibold relative left-[27.45vw] w-[15.09vw] text-[2.2vw]">Discover right </h1>
            <div className=" mt-[3vmax] flex " style={{
                width:"70vw",
                justifyContent:"space-between"

            }}>
                <div className="w-[22vw] h-[17.46vw] rounded-[8px] bg-[#EEF] p-[3.48vw]">
                    <p className="">SCHEMES</p>
                    <PiNotepadBold className="relative h-[6.80vw] w-[5.76vw] left-[9.28vw] top-[3.5vw]"/>
                </div>
                <div className="w-[22vw] h-[17.46vw] rounded-[8px] bg-[#EEF] p-[3.48vw]">
                    <p>JOBS</p>
                    <PiNotepadBold className="relative h-[6.80vw] w-[5.76vw] left-[9.28vw] top-[3.5vw]"/>
                </div>
                <div className="w-[22vw] h-[17.46vw] rounded-[8px] bg-[#EEF] p-[3.48vw]">
                    <p>SCHOLARSHIPS</p>
                    <PiNotepadBold className="relative h-[6.80vw] w-[5.76vw] left-[9.28vw] top-[3.5vw] 
                    "/>
                </div>
                
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
