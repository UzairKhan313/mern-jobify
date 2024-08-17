import React from "react";

const FormRowSelect = ({ name, label, list, defaultValue = "" }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
      >
        {list.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
