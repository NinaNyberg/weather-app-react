import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEODB_URL, geoOptions } from './autocompleteApi';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const handleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    setSearch(null);
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEODB_URL}/cities?limit=10&namePrefix=${inputValue}&sort=-population`,
        geoOptions
      );
      const result = await response.json();
      console.log(result);
      return {
        options: result.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`
          };
        })
      };
    } catch (error) {
      console.error(error);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '10px',
      backGroundColor: 'none',
      width: '300px',
      height: '50px',
      textAlign: 'left',
      fontSize: '1.2rem'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'beige' : 'white',
      color: 'black',
      width: '300px',
      height: '50px'
    })
  };

  return (
    <AsyncPaginate
      placeholder="Enter location..."
      debounceTimeout={600}
      value={search}
      onChange={handleChange}
      loadOptions={loadOptions}
      loadOptionsOnMenuOpen={false}
      styles={customStyles}
    />
  );
};

export default Search;
