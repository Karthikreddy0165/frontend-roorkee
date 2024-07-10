import NavBarAfterLogin from "@/components/NavBarLoginsucc";
import Image from "next/image";
import MainPageImage from ".././assets/backgroundimg.png";
import BackButton from "@/components/BackButton";
import { IoIosArrowDown } from "react-icons/io";

import JobOpenings from "@/components/JobOpenings";
import Scholarships from "@/components/Scholarships";
import Tabs from "@/components/Tabs";
import { useEffect, useState } from "react";
import Schemes from "../components/Schemes";

const HeroPageAfterLogin = () => {
  const [component, setComponent] = useState("Schemes"); // Changed default component to "Schemes"
  const [componentToRender, setComponentToRender] = useState(<Schemes />); // Set default component to render here

  useEffect(() => {
    if (component === "Schemes") setComponentToRender(<Schemes />);
    else if (component === "Job Openings") setComponentToRender(<JobOpenings />);
    else if (component === "Scholarships") setComponentToRender(<Scholarships />);
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
          
          <div style={{ flex: "1 0 75%", maxWidth: "100%" }}>
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
