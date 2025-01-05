import React, { useState } from "react";
import step1 from "../../assets/step1.jpeg";
import step2 from "../../assets/step2.jpeg";
import step3 from "../../assets/step3.jpeg";
const HowToApply = ({ closeModal }) => {
  const [currentStep, setCurrentStep] = useState(1);

//   console.log(step1)
//   console.log(step2)
//   console.log(step3)

  const steps = [
    {
      title: "Step 1",
      content:
        "Go to the schemes page and select the preferred scheme.",
      image: "/_next/static/media/step1.7185b336.jpeg", 
    },
    {
      title: "Step 2",
      content:
        "After clicking on the preferred scheme, click on the 'Apply' button on the scheme description page to apply for the scheme.",
      image: "/_next/static/media/step3.64e5a384.jpeg", 
    },
    {
      title: "Step 3",
      content:
        "If you are not currently applying but wish to apply for the scheme in the future, you can use the 'Save for Later' button.",
      image: "/_next/static/media/step3.64e5a384.jpeg", 
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[600px] xl:w-[700px] p-6 max-w-full">
        <h2 className="sm:text-2xl text-[20px] font-semibold text-center mb-6 text-[#3431BB]">
          How to Apply for Schemes
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="border border-[#3431BB] rounded-[6px] p-6 w-full">
              <h3 className="text-[16px] font-semibold text-center">
                {steps[currentStep - 1].title}
              </h3>
              <p className="text-sm text-center mt-2">
                {steps[currentStep - 1].content}
              </p>
            </div>

            {/* Conditional Rendering for Image */}
            {steps[currentStep - 1].image && (
              <div className="mt-4">
                <img
                  src={steps[currentStep - 1].image}
                  alt={`Step ${currentStep}`}
                  className="w-full h-auto object-contain rounded-md shadow-md border-[#3431BB] rounded "
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={prevStep}
            className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3431Bb] text-white hover:bg-blue-700 text-[12px] sm:text-sm"
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3431Bb] text-white hover:bg-blue-700 text-[12px] sm:text-sm"
            disabled={currentStep === steps.length}
          >
            Next
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={closeModal}
            className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3431Bb] text-white hover:bg-blue-700 text-[12px] sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowToApply;
