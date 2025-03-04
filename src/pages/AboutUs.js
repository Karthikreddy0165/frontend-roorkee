import NavBar from "@/components/NavBar";

import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
   <> <NavBar/>
    <div className="flex flex-col items-center bg-gray-50 py-12 px-6 sm:px-12">
      {/* Banner Image */}
     

      {/* About Us Content */}
      <div className="max-w-6xl rounded-[20px] text-center mt-5 bg-[#EEEEFF] p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          About Us
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          At <span className="font-semibold text-[#3330BA]">The Launchpad</span>,
          we are dedicated to bridging the information gap and promoting equal
          opportunities for education, financial aid, and employment. Our
          mission is to create an accessible and user-friendly platform that
          empowers individuals and communities by providing them with the
          resources they need to succeed.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-4xl mt-10 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              📚 Comprehensive Resources
            </h3>
            <p className="text-gray-700">
              We bring together a wide range of opportunities—scholarships,
              government schemes, and job openings—into a single, centralized
              platform.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              🖥️ User-Friendly Interface
            </h3>
            <p className="text-gray-700">
              Our platform is designed to be intuitive and accessible, ensuring
              users of all technical abilities can navigate with ease.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              🔄 Regular Updates
            </h3>
            <p className="text-gray-700">
              Our team ensures the portal is continuously updated with the
              latest opportunities, keeping users informed about new and ongoing
              programs.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              🌍 Accessible Anytime, Anywhere
            </h3>
            <p className="text-gray-700">
              The web application is accessible on multiple devices, allowing
              users to explore opportunities anytime and anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;
