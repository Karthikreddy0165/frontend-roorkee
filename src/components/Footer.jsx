import { FeedbackButtonFooter } from "./feedBack";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#ededf2] text-black py-8 px-4 gap-5 mt-[100px] ">
        <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between space-y-8 md:space-y-0 gap-8">
          {/* Logo and Description */}
          <div className="flex-1 md:max-w-[40%]">
            <h1 className="text-lg font-semibold mb-5">LaunchPad</h1>
            <p className="text-sm text-black">
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
                <a href="/" className="text-black hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/AllSchemes" className="text-black hover:text-white">
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
              {/* <li>
                <a
                  onClick={<FeedbackButtonFooter />}
                  className="text-black hover:text-black"
                >
                  FeedBack
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
                  <g>
                    <path
                      d="M12.5 2.25098C15.8398 2.25098 16.2354 2.26562 17.5488 2.32422C18.7695 2.37793 19.4287 2.58301 19.8682 2.75391C20.4492 2.97852 20.8691 3.25195 21.3037 3.68652C21.7432 4.12598 22.0117 4.54102 22.2363 5.12207C22.4072 5.56152 22.6123 6.22559 22.666 7.44141C22.7246 8.75977 22.7393 9.15527 22.7393 12.4902C22.7393 15.8301 22.7246 16.2256 22.666 17.5391C22.6123 18.7598 22.4072 19.4189 22.2363 19.8584C22.0117 20.4395 21.7383 20.8594 21.3037 21.2939C20.8643 21.7334 20.4492 22.002 19.8682 22.2266C19.4287 22.3975 18.7646 22.6025 17.5488 22.6563C16.2305 22.7148 15.835 22.7295 12.5 22.7295C9.16016 22.7295 8.76465 22.7148 7.45117 22.6563C6.23047 22.6025 5.57129 22.3975 5.13184 22.2266C4.55078 22.002 4.13086 21.7285 3.69629 21.2939C3.25684 20.8545 2.98828 20.4395 2.76367 19.8584C2.59277 19.4189 2.3877 18.7549 2.33398 17.5391C2.27539 16.2207 2.26074 15.8252 2.26074 12.4902C2.26074 9.15527 2.27539 8.75977 2.33398 7.44141C2.3877 6.22559 2.59277 5.56152 2.76367 5.12207C2.98828 4.54102 3.25684 4.12598 3.69629 3.68652C4.13086 3.25195 4.55078 2.97852 5.13184 2.75391C5.57129 2.58301 6.23047 2.37793 7.45117 2.32422C8.76465 2.26562 9.16016 2.25098 12.5 2.25098Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-300"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.05469 19.7461C14.8086 19.7461 19.7461 14.8086 19.7461 8.05469C19.7461 1.30078 14.8086 -3.63672 8.05469 -3.63672C1.30078 -3.63672 -3.63672 1.30078 -3.63672 8.05469C-3.63672 14.8086 1.30078 19.7461 8.05469 19.7461ZM8.05469 17.9453C4.08008 17.9453 1.21484 15.0801 1.21484 11.1055C1.21484 10.6406 1.26953 10.1797 1.36328 9.75586C1.27344 9.78906 1.17188 9.79688 1.06641 9.79688C0.875 9.79688 0.691406 9.67969 0.671875 9.44141C0.621094 9.11719 0.736328 8.82422 0.96875 8.82422C0.980469 8.82422 1.08789 8.77344 1.13477 8.74805C1.77148 8.23047 2.62891 7.94336 3.33398 7.94336C4.20703 7.94336 4.89648 8.41113 5.26953 8.93164C5.63477 9.45508 6.01758 9.70703 6.45117 9.70703C6.74219 9.70703 7.03516 9.47656 7.04883 9.14062C7.0625 8.81445 7.25977 8.62109 7.58789 8.62109C8.03125 8.62109 8.41895 8.8457 8.41895 9.1875C8.41895 9.47266 8.34766 9.7793 8.25195 10.0176C8.12109 10.2969 8.05469 10.5889 8.05469 10.8281C8.05469 11.0391 8.11816 11.2295 8.20117 11.416C8.42773 11.6729 8.6748 11.8594 8.96484 11.9648C9.23633 12.0664 9.4707 12.1289 9.72461 12.1289C10.291 12.1289 10.7852 12.0195 11.1172 11.7754C11.4844 11.5049 11.7461 11.0967 11.7461 10.7188C11.7461 10.1914 11.3145 9.77539 10.7793 9.77539C10.3398 9.77539 9.92969 10.0088 9.70703 10.2505C9.5332 10.4541 9.27637 10.707 8.98633 10.7539C8.73828 10.7852 8.49805 10.707 8.31836 10.4824C8.10156 10.2275 8.05469 9.93945 8.05469 9.64648C8.05469 9.30664 8.39648 9.05957 8.71875 9.05957C9.06445 9.05957 9.40039 9.26953 9.40039 9.55469C9.40039 9.86719 9.06641 10.0586 8.82422 10.0586C8.52734 10.0586 8.29297 10.1523 8.29297 10.3906C8.29297 10.5859 8.42969 10.8125 8.69336 10.9336C8.86328 10.998 9.0791 10.8936 9.16797 10.7305C9.21484 10.6348 9.26953 10.5332 9.30859 10.4336C9.39062 10.2666 9.28906 10.0859 9.16797 10.0625C9.06055 10.042 8.97363 9.95117 8.96484 9.8457C8.875 9.38184 9.0293 9.03906 9.28906 8.96289C9.36719 8.94922 9.47461 8.97852 9.57031 9.03516C9.99609 9.1748 10.3145 9.53125 10.4961 9.89062C10.8184 10.4473 10.7344 10.9629 10.0742 11.2451C9.58008 11.4521 9.08008 11.2852 8.84961 10.8457C8.76367 10.6025 8.76172 10.3457 8.80859 10.1172C8.8457 9.87695 9.06543 9.66895 9.31934 9.66992C9.61133 9.66992 9.80078 9.90723 9.80078 10.0957C9.80078 10.374 9.57422 10.5293 9.40234 10.5732C9.12695 10.6357 8.70312 10.6133 8.47461 10.5249C8.1543 10.417 7.9707 10.1475 8.05469 9.78906C8.05469 9.7793 8.05469 9.74609 8.05469 9.74609C8.05469 9.74609 8.05469 9.74609 8.05469 9.74609C8.05469 9.74609 8.05469 9.74609 8.05469 9.74609C8.05469 9.74609 8.05469 9.74609 8.05469 9.74609"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
