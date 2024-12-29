import { useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleTabChange = (e) => {
    setActiveIndex(e.index === activeIndex ? null : e.index);
  };

  const renderHeader = (title, isExpanded) => (
    <div className="flex items-center justify-between w-full rounded-lg cursor-pointer py-3 px-4">
      <span className="text-black font-inter text-base font-normal leading-normal">{title}</span>
      {/* {isExpanded ? <FaMinus className="text-black text-sm" /> : <FaPlus className="text-black text-sm" />} */}
    </div>
  );

  return (
    <div className="flex flex-col items-center sm:w-full w-[482px] bg-gradient-to-b sm:p-10 p-8 sm:p-12">
      <div className="self-stretch flex justify-center">
        <h1 className="text-black text-center font-inter text-2xl font-semibold leading-[150%] mb-6">
          Frequently Asked Questions
        </h1>
      </div>
      <Accordion
        className="mt-4 w-full max-w-4xl mx-auto"
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      >
        <AccordionTab header={renderHeader("What is the product name?", activeIndex === 0)}>
          <div className="p-4 sm:p-6">
            <p>
              The product is an all-inclusive platform that provides tailored information on various government schemes, job opportunities, and scholarships for individuals across India.
            </p>
          </div>
        </AccordionTab>
        <AccordionTab header={renderHeader("How will this help me?", activeIndex === 1)}>
          <div className="p-4 sm:p-6">
            <p>
              By using our platform, you can easily discover relevant schemes, job listings, and scholarships that match your qualifications and needs. This can help you access opportunities and resources that you might not have found otherwise.
            </p>
          </div>
        </AccordionTab>
        <AccordionTab header={renderHeader("Can I get all information regarding Govt and State?", activeIndex === 2)}>
          <div className="p-4 sm:p-6">
            <p>
              Yes, our platform aggregates information from both central and state government sources to provide comprehensive details on schemes and benefits available across different regions.
            </p>
          </div>
        </AccordionTab>
        <AccordionTab header={renderHeader("How can I apply for schemes, jobs, or scholarships?", activeIndex === 3)}>
          <div className="p-4 sm:p-6">
            <p>
              You can apply by following the application instructions provided for each scheme, job, or scholarship. This usually involves submitting your details through an online portal or contacting the relevant office directly.
            </p>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  );
};

export default FAQSection;
