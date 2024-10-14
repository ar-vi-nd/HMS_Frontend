import React from 'react';

const SelectBox = ({ sort, setSort, options, label }) => {
  return (
    <div className="flex items-center space-x-2 border rounded-lg w-full p-2 md:w-1/5">
      <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        name="sort"
        id="sort"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
