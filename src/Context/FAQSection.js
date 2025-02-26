import { useState, useEffect } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useRouter } from "next/router";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const router = useRouter();

  const handleTabChange = (e) => {
    setActiveIndex(e.index === activeIndex ? null : e.index);
  };

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/faqs/`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setFaqs(data);
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    }

    fetchFAQs();
  }, [router.query]);

  return (
    <div className="flex flex-col items-center bg-gradient-to-b sm:p-10 sm:p-12 overflow-hidden">
      <div className="self-stretch flex justify-center">
        <h1 className="text-black text-center font-inter text-[18px] sm:text-2xl font-semibold leading-[150%] mb-6 py-[10px] mt-[20px]">
          Frequently Asked Questions
        </h1>
      </div>
      <Accordion className="mt-4 w-full sm:w-full mx-auto border-b-1 " activeIndex={activeIndex} onTabChange={handleTabChange}>
        {faqs.map((faq, index) => (
          <AccordionTab key={index} header={faq.question} className="mt-6">
            <div className="p-4 sm:p-4">
              <p className="mx-auto sm:w-[200px]">{faq.answer}</p>
            </div>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;
