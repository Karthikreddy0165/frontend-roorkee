import { Carousel } from "primereact/carousel";
import { CiBookmark } from "react-icons/ci";

const schemes = [
  {
    title: "Adi Dravidar and Tribal Welfare Department",
    description:
      "Free education up to 12th Std. to all i.e. tuition fee will not be collected and the amount will be reimbursed by the government",
    department: "Welfare Department",
    tags: ["TamilNadu", "Student", "SC/ ST"],
  },
  {
    title: "Scholarships for Female Students",
    description:
      "Free education up to 12th Std. to all i.e. tuition fee will not be collected and the amount will be reimbursed by the government",
    department: "Education Department",
    tags: ["Scholarship", "Girls", "Education"],
  },
];

const schemeTemplate = (scheme) => (
  <div className="p-[10.802px] w-3/4 border rounded-[8.102px] bg-white shadow-[0px_0px_9.791px_rgba(5,2,160,0.08)] border-[#EEF]">
    <div className="flex justify-between items-center p-2 pt-0 pl-0">
      <p className="text-[10.584px] font-semibold">{scheme.title}</p>
      <CiBookmark />
    </div>

    <p className="text-[#616161] text-[8.274px] font-semibold opacity-60 mb-[9.93px] line-clamp-2">
      <span className="font-bold">Description:</span> {scheme.description}
    </p>

    <p className="text-[#616161] text-[8.274px] font-normal opacity-60 underline mb-[10px]">
      {scheme.department}
    </p>

    <div className="flex mt-[-7px] gap-1">
      {scheme.tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center justify-center px-2 py-[5px] border border-onclick-btnblue rounded bg-white text-onclick-btnblue font-inter text-xs font-medium scale-[.6]"
        >
          {tag}
        </div>
      ))}
    </div>
  </div>
);

const SchemeCarousel = () => {
  return (
    <div className="w-4/6">
      <Carousel
        value={schemes}
        itemTemplate={schemeTemplate}
        numVisible={1}
        numScroll={1}
        circular
        autoplayInterval={3000}
        showNavigators={false}
      />
    </div>
  );
};

export default SchemeCarousel;
