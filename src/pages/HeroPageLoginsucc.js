import NavBarAfterLogin from "@/components/NavBarLoginsucc";
import Image from "next/image";
import MainPageImage from ".././assets/backgroundimg.png";
import BackButton from "@/components/BackButtonLoginSucc";
import { IoIosArrowDown } from "react-icons/io";

import JobOpenings from "@/components/JobOpenings";
import Scholarships from "@/components/Scholarships";
import Tabs from "@/components/Tabs";
import { useEffect, useState } from "react";
import Schemes from "../components/Schemes";
import Saved from "@/components/SavedForLoginUser";

const HeroPageAfterLogin = () => {
  const [component, setComponent] = useState("Schemes");
  const [componentToRender, setComponentToRender] = useState(<Schemes/>);

  useEffect(() => {
    console.log("Component to render:", component);
    if (component === "Schemes") setComponentToRender(<Schemes />);
    else if (component === "Job Openings") setComponentToRender(<JobOpenings />);
    else if (component === "Scholarships") setComponentToRender(<Scholarships />);
    else if (component === "Saved") setComponentToRender(<Saved />);
  }, [component]);

  return (
    <>
      <NavBarAfterLogin/>
      <BackButton />
      <div
        className="relative w-80vw mx-auto mb-8 flex justify-center items-center "
        style={{ maxWidth: "80%", margin: "0 auto" }}
      >
        <div className="h-60 w-full relative brightness-50 mb-4">
          <Image
            src={MainPageImage}
            alt="Loading Image..."
            layout="fill"
            objectFit="cover"
            objectPosition="center bottom"
            className="rounded-[15px]"
          />
        </div>
      </div>

      <div style={{ maxWidth: "80%", margin: "0 auto" }}>
        <div style={{ display: "flex" }}>
        <div style={{ flex: "1 0 25%", maxWidth: "25%", padding: "1rem" }}
          className="mr-2">
            <div
            className="flex justify-between items-center mb-4"
            >
              <h1 style={{ margin: 0 }}>Filter by</h1>
              <p className="text-[#3431BB]" style={{ margin: 0 }}>
                Clear all filter
              </p>
            </div>
            <hr />

            {/* filter categories */}
            <div className="mt-2">
              {/* Each filter category */}
              <div className="flex justify-between items-center mb-4">
                <span>State</span>
                <IoIosArrowDown className="text-[#000]" /> 
              </div>
              <div className="flex justify-between items-center mb-4">
                <span>Department</span>
                <IoIosArrowDown className="text-[#000]" /> 
              </div>
              <div className="flex justify-between items-center mb-4">
                <span>Funding by</span>
                <IoIosArrowDown className="text-[#000]" /> 
              </div>
              <div className="flex justify-between items-center mb-4">
                <span>Beneficiaries</span>
                <IoIosArrowDown className="text-[#000]" /> 
              </div>
              <div className="flex justify-between items-center mb-4">
                <span>Eligibility criteria</span>
                <IoIosArrowDown className="text-[#000]" /> 
              </div>
              <div className="flex justify-between items-center mb-4">
                <span>Sponsorship</span>
                <IoIosArrowDown className="text-[#000]" /> 
              </div>
              <div className="flex justify-between items-center mb-4">
                <span>Scheme type</span>
                <IoIosArrowDown className="text-[#000]" /> 
              </div>
            </div>
          </div>
          {/* </div> */}

          <div style={{ flex: "1 0 75%", maxWidth: "75%" }}>
            <div>
              <Tabs setComponent={setComponent} />
            </div>
            <div>{componentToRender}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroPageAfterLogin;
