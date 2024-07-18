import dummyData from '../dummyData.json';
import React, { useEffect } from 'react';

const categories = dummyData.map(item => item.eligibility_criteria.Income);
const uniqueCategories = [...new Set(categories)];

const IncomeDropdownMenu = React.forwardRef(({ selectedIncomes, setSelectedIncomes }, ref) => {
  const incomeTop = document.getElementById('incomeBtn').getBoundingClientRect().top + window.scrollY;
  const incomeLeft = document.getElementById('incomeBtn').getBoundingClientRect().left + window.scrollX;

  const handleOptionChange = (event) => {
    const { checked, value } = event.target;
    setSelectedIncomes(prevOptions => {
      if (checked) {
        return [...prevOptions, value];
      } else {
        return prevOptions.filter(option => option !== value);
      }
    });
  };

  useEffect(() => {
    console.log(selectedIncomes);
  }, [selectedIncomes]);

  return (
    <div  style={{ top: `${incomeTop + 42}px`, left:  `${incomeLeft}px`}} className="absolute bg-[rgb(251,251,251)] rounded-lg w-auto max-w-[600px] flex flex-col whitespace-wrap z-50" ref={ref}>
      <ul className="flex flex-col font-sans list-none p-[0px_23px] text-xs">
        {uniqueCategories.map(item => (
           <li key={item + index} className="flex items-center justify-between hover:bg-gray-100 p-[8px] cursor-pointer hover:rounded-[8px]" onClick={() => handleItemClick(item)}>
           <div>
           <p className="leading-5 overflow-hidden overflow-ellipsis line-clamp-2 max-h-10">
             {item}
           </p>
           </div>
           <div className='w-[16.5] h-[16.5]'>
           <input type="checkbox" value={item} onChange={handleOptionChange} checked={selectedIncomes.includes(item)} className="ml-10 custom-checkbox pointer-events-none w-full h-full" />
           </div>
         </li>
        ))}
      </ul>
    </div>
  );
});

export default IncomeDropdownMenu;
