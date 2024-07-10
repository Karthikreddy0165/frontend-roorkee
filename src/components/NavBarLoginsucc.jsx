import React, { use } from "react";
import { MdExpandMore } from "react-icons/md";
import { useRouter } from "next/router";

const NavBar = () => {
  const router= useRouter();
  const handGotoLoginpage =() =>{
    router.push("/loginpage")
  }
  return (
    <div style={{ maxWidth: '80%', margin: '0 auto' }} className="flex justify-between items-center py-6 z-10 relative ">
      {/* LogoImage */}
      <div className="text-white">
        {/* <img className="h-16 w-16 text-white" alt="logo" /> */}
        Logo 
      </div>

      {/* English Button */}
      <div className="flex gap-5">
      <div className="border border-2 border-white rounded-[13px]">
  <button className="bg-none text-black px-4 py-2 rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-black transition duration-300">
    English <MdExpandMore className="font-semibold" />
  </button>
</div>

<div className="bg-[#3431BB] rounded-[13px]">
  <button className="bg-none text-white px-4 py-2 rounded-lg flex items-center justify-center text-center hover:text-gray-300 transition duration-300"
    onClick={handGotoLoginpage}
  >
    Profile
  </button>
</div>

      </div>
    </div>
  );
};

export default NavBar;