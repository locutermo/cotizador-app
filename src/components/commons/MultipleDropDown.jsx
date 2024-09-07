"use client";

import { useState, useEffect, useRef } from "react";

export default function MultiSelectDropdown({
  formFieldName,
  optionsSelected=[],
  options,
  onChange,
  prompt = "Selecciona una o más opciones",
}) {
  const [isJsEnabled, setIsJsEnabled] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const optionsListRef = useRef();

  useEffect(() => {
    if (selectedOptions.length === 0) {
      const optionsInputs = optionsListRef.current.querySelectorAll("input");
      optionsInputs.forEach((input) => {
        if(optionsSelected.find(e => e.id === parseInt(input.value)))
          input.checked = true;
      });
  
      const newOptions = [...optionsSelected.map(e => ({value:e.id,label:e.name}))]
      console.log({newOptions})
      setSelectedOptions(newOptions);
      onChange(newOptions);
      
    }


  }, [optionsSelected])

  useEffect(() => {
    setIsJsEnabled(true);
  }, []);

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    const optionId = parseInt(e.target.value)
    const selectedOptionsFormatted = selectedOptions.map(e => e?.value)
    const selectedOptionSet = new Set(selectedOptionsFormatted);

    if (isChecked) {
      selectedOptionSet.add(optionId);
    } else {
      selectedOptionSet.delete(optionId);
    }

    let newSelectedOptions = Array.from(selectedOptionSet);
    newSelectedOptions = newSelectedOptions.map( idSelected => {
      const found = options.find(e => e?.value === idSelected)
      return found
    })
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const isSelectAllEnabled = selectedOptions.length < options.length;

  const handleSelectAllClick = (e) => {
    e.preventDefault();

    const optionsInputs = optionsListRef.current.querySelectorAll("input");
    optionsInputs.forEach((input) => {
      input.checked = true;
    });

    setSelectedOptions([...options]);
    onChange([...options]);
  };

  const isClearSelectionEnabled = selectedOptions.length > 0;

  const handleClearSelectionClick = (e) => {
    e.preventDefault();

    const optionsInputs = optionsListRef.current.querySelectorAll("input");
    optionsInputs.forEach((input) => {
      input.checked = false;
    });

    setSelectedOptions([]);
    onChange([]);
  };

  return (
    <label className="relative">
      <input type="checkbox" className="hidden peer" />

      <div className="w-full cursor-pointer after:absolute after:right-3  after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform inline-flex border rounded px-5 py-2">
        {prompt}
        {isJsEnabled && selectedOptions.length > 0 && (
          <span className="ml-1 text-blue-500">{`(${selectedOptions.length} selected)`}</span>
        )}
      </div>

      <div className="absolute z-50 transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto w-full max-h-60 overflow-y-scroll border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        {isJsEnabled && (
          <ul>
            <li>
              <button
                onClick={handleSelectAllClick}
                disabled={!isSelectAllEnabled}
                className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50 dark:text-yellow-200"
              >
                {"Seleccionar todos"}
              </button>
            </li>
            <li>
              <button
                onClick={handleClearSelectionClick}
                disabled={!isClearSelectionEnabled}
                className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50 dark:text-yellow-200"
              >
                {"Limpiar"}
              </button>
            </li>
          </ul>
        )}
        <ul ref={optionsListRef}>
          {options?.map((option, i) => {
            return (
              <li key={option.value}>
                <label
                  className={`flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 dark:hover:bg-yellow-50 dark:[&:has(input:checked)]:bg-yellow-50 [&:has(input:checked)]:bg-blue-200`}
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.find(e => e === option.label)}
                    name={option.label}
                    value={option.value}
                    className="cursor-pointer dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={handleChange}
                  />
                  <span className="ml-1">{option.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </label>
  );
}