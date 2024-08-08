import { useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleTabChange = (e) => {
    setActiveIndex(e.index === activeIndex ? null : e.index);
  };

  const renderHeader = (title, isExpanded) => (
    <div className="flex items-center justify-between  p-4 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors">
      <div className="not-italic text-black font-inter text-base font-normal leading-normal">
        {title}
      </div>
      {isExpanded ? (
        <FaMinus className="text-black text-sm" />
      ) : (
        <FaPlus className="text-black text-sm" />
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full bg-gradient-to-b mt-8">
      <div className="flex justify-center">
        <h1 className="text-black text-center font-inter text-4xl text-[32px] font-semibold leading-[150%] mb-6">
          Frequently Asked Questions
        </h1>
      </div>

      <Accordion
        className="mt-4 w-full max-w-4xl mx-auto"
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      >
        <AccordionTab
          header={renderHeader("What is the product name?", activeIndex === 0)}
        >
          <div className="p-4 max-h-40 h-32 overflow-y-auto">
            <p>
              The product is an all-inclusive platform that provides tailored
              information on various government schemes, job opportunities, and
              scholarships for individuals across India.
            </p>
          </div>
        </AccordionTab>
        <AccordionTab
          header={renderHeader("How will this help me?", activeIndex === 1)}
        >
          <div className="p-4 max-h-40 h-32 overflow-y-auto">
            <p>
              By using our platform, you can easily discover relevant schemes,
              job listings, and scholarships that match your qualifications and
              needs. This can help you access opportunities and resources that
              you might not have found otherwise.
            </p>
          </div>
        </AccordionTab>
        <AccordionTab
          header={renderHeader(
            "Can I get all information regarding Govt and State?",
            activeIndex === 2
          )}
        >
          <div className="p-4 max-h-40 h-32 overflow-y-auto">
            <p>
              Yes, our platform aggregates information from both central and
              state government sources to provide comprehensive details on
              schemes and benefits available across different regions.
            </p>
          </div>
        </AccordionTab>
        <AccordionTab
          header={renderHeader(
            "How can I apply for schemes, jobs, or scholarships?",
            activeIndex === 3
          )}
        >
          <div className="p-4 max-h-40 h-32 overflow-y-auto">
            <p>
              You can apply by following the application instructions provided
              for each scheme, job, or scholarship. This usually involves
              submitting your details through an online portal or contacting the
              relevant office directly.
            </p>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  );
};

export default FAQSection;
