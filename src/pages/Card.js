const Card = ({ title, Icon, onClick }) => {
    return (
      <div
        className="group w-full sm:w-[22vw] h-[20vw] sm:h-[17.46vw] rounded-[8px] bg-[#EEF] p-[5vw] sm:p-[3.48vw] hover:text-white hover:bg-[#3431BB] hover:cursor-pointer flex flex-col justify-center items-center"
        onClick={onClick}
      >
        <p className="text-center sm:text-left">{title}</p>
        {Icon ? (
          <Icon className="text-[#3F3BE1] opacity-[20%] h-[8vw] sm:h-[6.80vw] w-[8vw] sm:w-[5.76vw] group-hover:text-white" />
        ) : (
          <p>Icon not available</p>
        )}
      </div>
    );
  };
export default Card;  