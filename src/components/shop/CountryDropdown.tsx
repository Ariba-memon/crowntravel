import { COUNTRIES } from '@/lib/Countries';
import  CountrySelector  from '@/components/shop/CountrySelector';
import { SelectMenuOption } from '@/lib/types';
import React, {useState} from 'react';

const CountryDropdown = () => {
  const myRef = React.createRef<HTMLDivElement>();

  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState('AF');

  return (
    <CountrySelector
      id={'countries'}
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      onChange={val => setCountry(val)}

      selectedValue={COUNTRIES.find(option => option.value === country) as SelectMenuOption} 
    />
  );
}

export default CountryDropdown;