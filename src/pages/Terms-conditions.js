import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";

export default function TermsAndConditions() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <>
      <NavBar />
      <div className="bg-[#e8e6e6]">
      <div className="flex justify-center  px-8">
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-xl  p-8 sm:p-10 m-[5rem]">
        <div className="flex items-center justify-center relative mb-6">
          
          <h1 className="text-3xl text-[#2B3E80] font-extrabold text-center w-full">
            Terms and Conditions 
          </h1>
          <button className="absolute left-0 text-gray-600 hover:text-gray-900 transition" onClick={handleClose}>
            <IoClose size={25} />
          </button>
        </div>

          <div className="text-gray-700 space-y-6 text-sm sm:text-base leading-relaxed">
           

            <section>
              <h2 className="font-semibold mb-1 text-[#2B3E80]">1. Acceptance of Terms</h2>
              <p>
                By using our website and services, you agree to comply with and be bound by these
                Terms and Conditions and all applicable laws. If you do not agree, please do not use
                our services.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-1 text-[#2B3E80]">2. Services Provided</h2>
              <p>
                We provide an interface to view and apply for government schemes, jobs, and scholarships.
                We are not responsible for managing or approving these schemes.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-1 text-[#2B3E80]">3. User Account</h2>
              <p>
                You must create an account to access certain features. Provide accurate details and
                safeguard your credentials. Report any unauthorized access immediately.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-1 text-[#2B3E80]">4. Use of the Portal</h2>
              <p>
                We only facilitate access to government schemes. Success or approval is not guaranteed.
                Users must follow official application processes.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-1 text-[#2B3E80]">5. User Responsibilities</h2>
              <p>
                Use the platform lawfully, provide accurate data, and do not disrupt or misuse the portal.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-1 text-[#2B3E80]">6. Privacy and Data Collection</h2>
              <p>
                Your use of the platform is subject to our Privacy Policy, which outlines how your
                data is collected, used, and protected.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-1 text-[#2B3E80]">7. Disclaimers</h2>
              <p>
                We do not guarantee success in applications. Users should verify details on official
                government websites.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-1 text-[#2B3E80]">8. Limitation of Liability</h2>
              <p>
                Empower Hub and partners are not liable for any losses or damages related to the use
                or content of this platform.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-1 text-[#2B3E80]">9. Intellectual Property</h2>
              <p>
                All content on this platform is owned by Empower Hub or its licensors. Do not copy or
                distribute without permission.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-1 text-[#2B3E80]">10. Modification of Terms</h2>
              <p>
                We may change these Terms at any time. Continued use means you accept the updates.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-1 text-[#2B3E80]">11. Termination of Account</h2>
              <p>
                We may suspend or terminate accounts for violations. You may also request account deletion.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-1 text-[#2B3E80]">12. Governing Law</h2>
              <p>
                These terms are governed by the laws of [Insert Jurisdiction]. Disputes will be resolved
                in courts of [Insert Jurisdiction].
              </p>
            </section>

           
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    </>
  );
}
