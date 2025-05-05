import React from "react";
import { IoClose } from "react-icons/io5";

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      onClick={onClose}
      data-testid="terms-modal-overlay"
    >
      <div 
        className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        data-testid="terms-modal-content"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl md:text-2xl font-bold text-[#2B3E80]">
            Terms and Conditions
          </h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <IoClose size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
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
    </div>
  );
};

export default TermsModal;

