import React, { useEffect, useState } from 'react';

  const BeneficiariesDropdownMenu = React.forwardRef(({ selectedBeneficiaries, setSelectedBeneficiaries, setBeneficiaryName, data }, ref) => {
    const [isShow, setIsShow] = useState(false);
    const categories = data
  .flatMap(item => item.beneficiaries ? item.beneficiaries.flatMap(beneficiary => beneficiary.beneficiary_type.split(', ').map(type => type.trim())) : [])
  .filter(beneficiary => beneficiary !== null && beneficiary !== undefined);
  const uniqueCategories = [...new Set(categories)];
  
    const toggleShow = () => {
      setIsShow(!isShow);
    };
  
    const handleOptionChange = (event) => {
      const { checked, value } = event.target;
      setSelectedBeneficiaries(prevOptions => {
        if (checked) {
          return [...prevOptions, value];
        } else {
          return prevOptions.filter(option => option !== value);
        }
      });
    };
  
    const handleItemClick = (value) => {
      setSelectedBeneficiaries(prevOptions => {
        if (prevOptions.includes(value)) {
          return prevOptions.filter(option => option !== value);
        } else {
          return [...prevOptions, value];
        }
      });
    };
  
    const calculateInitialPosition = () => {
      const beneficiaryBtn = document.getElementById('beneficiaryBtn');
      if (beneficiaryBtn) {
        const { top, left } = beneficiaryBtn.getBoundingClientRect();
        return {
          top: `${top + window.scrollY + 31}px`,
          left: `${left + window.scrollX}px`,
        };
      }
      return {}; // Return a default position or an empty object if the button is not found
    };
  
    const [dropdownStyle, setDropdownStyle] = useState(calculateInitialPosition);
    useEffect(() => {
        const updatePosition = () => {
          const newPosition = calculateInitialPosition(); // Use the same function to calculate the new position
          setDropdownStyle(newPosition);
        };
  
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
      }, []);
  
    useEffect(() => {
      console.log(selectedBeneficiaries);
    }, [selectedBeneficiaries]);
    useEffect(()=>{
      if(selectedBeneficiaries.length == 0){
        setBeneficiaryName("")
      }else{
      const maxLength = 8;
      const stateName = selectedBeneficiaries[0];
      setBeneficiaryName(`${selectedBeneficiaries.length}`);
      }
    }, [selectedBeneficiaries])
  
      return (
        <div style={dropdownStyle} className="text-[#616161] bg-[rgb(255,255,255)] w-[200] max-w-[600px] flex flex-col whitespace-wrap z-50 text-[14px] mt-0" ref={ref}>
          <ul className="flex flex-col font-sans list-none p-0 m-0 gap-0 pb-[18px]">
            {uniqueCategories.map((item, index) => (
              <li key={item + index} className="flex items-center justify-between hover:bg-gray-100 h-9 p-[8px] cursor-pointer hover:rounded-[8px]" onClick={() => handleItemClick(item)}>
                {item}
                <input type="checkbox" value={item} onChange={handleOptionChange} checked={selectedBeneficiaries.includes(item)} className="ml-10 custom-checkbox pointer-events-none" />
              </li>
            ))}
          </ul>
          </div>
      );
  
    }
  );
  
  export default BeneficiariesDropdownMenu;