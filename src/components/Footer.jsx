import { FeedbackButtonFooter } from "./feedBack";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#ededf2] text-black py-8 px-4 gap-5 mt-[50px]">
        <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between space-y-8 md:space-y-0 gap-8">
          {/* Logo and Description */}
          <div className="flex-1 md:max-w-[40%]">
            <h1 className="text-lg font-semibold mb-5">LaunchPad</h1>
            <p className="text-sm text-[#212020]">
              This Portal is dedicated to bridging the information gap by
              providing an accessible platform that consolidates scholarships,
              government schemes, and job opportunities. Designed with a focus
              on the Scheduled Castes (SC) community and other underserved
              groups, our goal is to foster equal opportunities in education,
              financial aid, and employment.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 md:max-w-[20%] mr-[5px]">
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-black ">
                  Home
                </a>
              </li>
              <li>
                <a href="/AllSchemes" className="text-black ">
                  Schemes
                </a>
              </li>
              <li>
                <a
                  href="/AllSchemes?tab=Job+Openings"
                  className="text-black hover:text-black"
                >
                  Job openings
                </a>
              </li>
              <li>
                <a
                  href="/AllSchemes?tab=Scholarships"
                  className="text-black hover:text-black"
                >
                  Scholarships
                </a>
              </li>
              <li>
                <a
                  href="/AllSchemes?tab=Saved"
                  className="text-black hover:text-black"
                >
                  Saved
                </a>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div className="flex-1 md:max-w-[20%]">
            <h4 className="text-lg font-semibold mb-4">Important Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/faqs" className="text-black hover:text-black">
                  FAQ’s
                </a>
              </li>
              {/* Uncomment the feedback link once you implement the button */}
              {/* <li>
                <a
                  onClick={<FeedbackButtonFooter />}
                  className="text-black hover:text-black"
                >
                  Feedback
                </a>
              </li> */}
              <li>
                <a
                  href="/privacy-policy"
                  className="text-black hover:text-black"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-conditions"
                  className="text-black hover:text-black"
                >
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information and Social Media */}
          <div className="flex-1 md:max-w-[30%]">
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>

            <p className="text-sm text-black mb-2">
              <strong>Address:</strong> 1234 Street Name, City, Country
            </p>
            <p className="text-sm text-black mb-2">
              <strong>Email Id:</strong> contact@launchpad.com
            </p>
            <p className="text-sm text-black mb-4">
              <strong>Phone No:</strong> +1 (234) 567-890
            </p>

            <h1 className="text-lg font-bold mb-4">Follow Us</h1>

            <div className="flex space-x-4">
              {/* Add social media icons */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-500"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 0C5.5965 0 0 5.5965 0 12.5C0 18.362 4.036 23.281 9.4805 24.632V16.32H6.903V12.5H9.4805V10.854C9.4805 6.5995 11.406 4.6275 15.583 4.6275C16.375 4.6275 17.7415 4.783 18.3005 4.938V8.4005C18.0055 8.3695 17.493 8.354 16.8565 8.354C14.807 8.354 14.015 9.1305 14.015 11.149V12.5H18.098L17.3965 16.32H14.015V24.9085C20.2045 24.161 25.0005 18.891 25.0005 12.5C25 5.5965 19.4035 0 12.5 0Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 2.25098C15.8398 2.25098 16.2354 2.26562 17.5488 2.32422C18.7695 2.37793 19.4287 2.58301 19.8682 2.75391C20.4492 2.97852 20.8691 3.25195 21.3037 3.68652C21.7432 4.12598 22.0117 4.54102 22.2363 5.12207C22.4072 5.56152 22.6123 6.22559 22.666 7.44141C22.7246 8.75977 22.7393 9.15527 22.7393 12.4902C22.7393 15.8301 22.7246 16.2256 22.666 17.5391C22.6123 18.7598 22.4072 19.4189 22.2363 19.8584C22.0117 20.4395 21.7383 20.8594 21.3037 21.2939C20.8643 21.7334 20.4492 22.002 19.8682 22.2266C19.4287 22.3975 18.7646 22.6025 17.5488 22.6563C16.2305 22.7148 15.835 22.7295 12.5 22.7295C9.16016 22.7295 8.76465 22.7148 7.45117 22.6563C6.23047 22.6025 5.57129 22.3975 5.13184 22.2266C4.55078 22.002 4.13086 21.7285 3.69629 21.2939C3.25684 20.8545 2.98828 20.4395 2.76367 19.8584C2.59277 19.4189 2.3877 18.7549 2.33398 17.5391C2.27539 16.2207 2.26074 15.8252 2.26074 12.4902C2.26074 9.15527 2.27539 8.75977 2.33398 7.44141C2.3877 6.22559 2.59277 5.56152 2.76367 5.12207C2.98828 4.54102 3.25684 4.12598 3.69629 3.68652C4.13086 3.25195 4.55078 2.97852 5.13184 2.75391C5.57129 2.58301 6.23047 2.37793 7.45117 2.32422C8.76465 2.26562 9.16016 2.25098 12.5 2.25098ZM12.5 0C5.60742 0 0 5.60742 0 12.5C0 19.3926 5.60742 25 12.5 25C19.3926 25 25 19.3926 25 12.5C25 5.60742 19.3926 0 12.5 0ZM12.5 6.62891C13.3477 6.62891 13.9678 7.24902 13.9678 8.0918C13.9678 8.93945 13.3477 9.55957 12.5 9.55957C11.6523 9.55957 11.0322 8.93945 11.0322 8.0918C11.0322 7.24902 11.6523 6.62891 12.5 6.62891ZM12.5 12.7285C10.8652 12.7285 9.16992 13.1865 7.61914 13.9053C8.75977 14.6465 10.125 15.0938 11.7754 15.0938C13.498 15.0938 14.9072 14.4873 14.9072 13.248C14.9072 12.9292 14.7685 12.6436 14.5508 12.3921C14.133 11.7793 13.4766 11.2759 12.5 11.2759C12.2761 11.2759 12.0577 11.3736 11.875 11.5469C11.5332 11.8789 11.3447 12.299 11.3447 12.7285C11.3447 12.7285 11.3447 12.7285 12.5 12.7285Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-[#3e5c6e] py-4 mt-8 text-center">
          <p className="text-sm text-black">
            &copy; {new Date().getFullYear()} LaunchPad. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
