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
                className="absolute left-0 text-gray-600 hover:text-gray-900 transition"
                onClick={handleClose}
              >
                <IoClose size={25} />
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
