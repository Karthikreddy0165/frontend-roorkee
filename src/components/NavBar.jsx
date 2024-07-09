import React, { use } from "react";
import { MdExpandMore } from "react-icons/md";
import { useRouter } from "next/router";

const NavBar = () => {
  const router= useRouter();
  const handGotoLoginpage =() =>{
    router.push("/loginpage")
  }
  return (
    <div style={{ maxWidth: '80%', margin: '0 auto' }} className="flex justify-between items-center py-4 z-10 relative ">
      {/* LogoImage */}
      <div className="">
        {/* <img className="h-16 w-16 text-white" alt="logo" /> */}
        Logo 
      </div>

      {/* English Button */}
      <div className="flex gap-5">
            <div className="border border-2 border-black rounded-[13px]">
              <button className="bg-none text-black px-4 py-1 rounded-lg flex items-center  hover:bg-white hover:text-black">
                English <MdExpandMore className="font-semibold" />
              </button>
            </div>

            <div className="border border-2 border-black rounded-[13px]">
              <button className="bg-none text-black px-4 py-1 rounded-lg flex items-center hover:bg-[#3431BB] hover:text-white"
              onClick={handGotoLoginpage}
              >
                Login
              </button>
            </div>
      </div>
    </div>
  );
};

export default NavBar;