import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";

export default function PrivacyPolicy() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <>
      <NavBar />
      <div className="bg-[#e8e6e6] min-h-screen flex flex-col">
        <div className="flex justify-center px-8 flex-grow">
          <div className="w-full max-w-7xl bg-white shadow-lg rounded-xl p-8 sm:p-10 m-[5rem]">
            <div className="flex items-center justify-center relative mb-6">
              <h1 className="text-3xl text-[#2B3E80] font-extrabold text-center w-full">
                Privacy Policy
              </h1>
              <button
                type="button"
                className=" absolute left-0 flex gap-[8px] text-sm font-inter  items-center justify-between"
                onClick={() => router.back()}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5005 10.0003C17.5005 10.1661 17.4346 10.3251 17.3174 10.4423C17.2002 10.5595 17.0413 10.6253 16.8755 10.6253H4.63409L9.19268 15.1832C9.25075 15.2412 9.29681 15.3102 9.32824 15.386C9.35966 15.4619 9.37584 15.5432 9.37584 15.6253C9.37584 15.7075 9.35966 15.7888 9.32824 15.8647C9.29681 15.9405 9.25075 16.0095 9.19268 16.0675C9.13461 16.1256 9.06567 16.1717 8.9898 16.2031C8.91393 16.2345 8.83261 16.2507 8.75049 16.2507C8.66837 16.2507 8.58705 16.2345 8.51118 16.2031C8.43531 16.1717 8.36637 16.1256 8.3083 16.0675L2.6833 10.4425C2.62519 10.3845 2.57909 10.3156 2.54764 10.2397C2.51619 10.1638 2.5 10.0825 2.5 10.0003C2.5 9.91821 2.51619 9.83688 2.54764 9.76101C2.57909 9.68514 2.62519 9.61621 2.6833 9.55816L8.3083 3.93316C8.42558 3.81588 8.58464 3.75 8.75049 3.75C8.91634 3.75 9.0754 3.81588 9.19268 3.93316C9.30996 4.05044 9.37584 4.2095 9.37584 4.37535C9.37584 4.5412 9.30996 4.70026 9.19268 4.81753L4.63409 9.37535H16.8755C17.0413 9.37535 17.2002 9.4412 17.3174 9.55841C17.4346 9.67562 17.5005 9.83459 17.5005 10.0003Z" fill="black"/>
            </svg>

                Back
              </button>
            </div>

            <div className="text-gray-700 space-y-6 text-sm sm:text-base leading-relaxed">
              <p>
                At Empower Hub, we are committed to protecting and respecting your privacy. This Privacy Policy outlines the information we collect from you, how we use it, and the steps we take to ensure your data is protected.
              </p>
              <p>
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>

              <section>
                <h2 className="font-semibold text-[#2B3E80]">1. Information We Collect</h2>
                <p><strong>a) Personal Information</strong></p>
                <ul className="list-disc pl-6">
                  <li><strong>Account Registration:</strong> When you register an account, we collect your email address and other details you provide to create your profile.</li>
                  <li><strong>Profile Information:</strong> You may choose to add personal details such as your name, demographic details, professional background, and preferences related to schemes, jobs, or scholarships.</li>
                </ul>

                <p className="mt-4"><strong>b) Activity Data</strong></p>
                <ul className="list-disc pl-6">
                  <li><strong>User Behavior:</strong> We track the schemes, jobs, and scholarships you view, apply for, and save in your profile. This helps us improve recommendations and your experience.</li>
                  <li><strong>Interaction with Content:</strong> Data such as shares, reports, and feedback on content helps us further personalize your experience.</li>
                </ul>

                <p className="mt-4"><strong>c) Device and Usage Information</strong></p>
                <ul className="list-disc pl-6">
                  <li><strong>Device Information:</strong> Information such as your device type, browser, OS, and IP address is collected to ensure the platform performs well.</li>
                  <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar tools to personalize your experience, including remembering logins and preferences.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-semibold text-[#2B3E80]">2. How We Use Your Information</h2>
                <ul className="list-disc pl-6">
                  <li><strong>Personalization:</strong> To offer personalized recommendations based on your activity.</li>
                  <li><strong>Improvement of Services:</strong> To enhance platform performance based on usage and feedback.</li>
                  <li><strong>Communication:</strong> To send you updates about your account, or relevant schemes and jobs.</li>
                  <li><strong>Feedback:</strong> To resolve issues and improve your experience using reporting tools.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-semibold text-[#2B3E80]">3. Data Sharing and Disclosure</h2>
                <p>
                  We do not sell, rent, or trade your personal information. We do not share data with external sites, except:
                </p>
                <ul className="list-disc pl-6">
                  <li><strong>Legal Compliance:</strong> To comply with legal obligations or protect our rights, safety, and property.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-semibold text-[#2B3E80]">4. Third-Party Recommendations and Analytics</h2>
                <p>
                  We do not share your data with third-party providers for recommendations or analytics. All data is processed internally.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-[#2B3E80]">5. Security of Your Information</h2>
                <p>
                  We use industry-standard measures to secure your data. However, no system is entirely secure, and we cannot guarantee absolute protection.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-[#2B3E80]">6. Your Rights</h2>
                <ul className="list-disc pl-6">
                  <li><strong>Access and Update:</strong> You can view and edit your personal info via your account.</li>
                  <li><strong>Delete Your Account:</strong> You may request account deletion at any time, unless otherwise required by law.</li>
                  <li><strong>Opt-out of Communication:</strong> Manage non-essential communications via account settings or unsubscribe links.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-semibold text-[#2B3E80]">7. Cookies</h2>
                <p>
                  Cookies help us enhance your experience. You can manage cookies through your browser, but disabling them may limit functionality.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-[#2B3E80]">8. Data Retention</h2>
                <p>
                  We retain personal data as needed for our purposes or legal obligations. You may request deletion subject to applicable laws.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-[#2B3E80]">9. Changes to This Privacy Policy</h2>
                <p>
                  We may modify this policy anytime. Changes will be posted here, and significant updates will be communicated.
                </p>
              </section>

             
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
