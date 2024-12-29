const StateSelector = ({ states, handleStateChange }) => {
  const allStates = ["State 1", "State 2", "State 3"]; // Example states, replace with your dynamic data

  const handleToggle = (state) => {
    const updatedStates = states.includes(state)
      ? states.filter((s) => s !== state)
      : [...states, state];
    handleStateChange(updatedStates);
  };

  return (
    <div>
      <h3>Select States</h3>
      {allStates.map((state) => (
        <div key={state}>
          <input
            type="checkbox"
            checked={states.includes(state)}
            onChange={() => handleToggle(state)}
          />
          <label>{state}</label>
        </div>
      ))}
    </div>
  );
};

export default StateSelector;
