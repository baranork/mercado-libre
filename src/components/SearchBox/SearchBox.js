import React, { useEffect, useState } from 'react';
import './SearchBox.scss'
import { useNavigate } from 'react-router-dom';
import Logo from '../../styles/assets/Logo_ML.png'
import SearchIcon from '../../styles/assets/ic_Search.png'
function SearchBox() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnClick = () => {
    if (inputValue !== '') {
      navigate('/items?search=' + inputValue);
    }
  }

  const handleOnClickLogo = () => {
    navigate('/')
  }

  return (
    <div className='header'>
      <div className='areaContainer'>
        <img className='logo' onClick={handleOnClickLogo} style={{ cursor: 'pointer' }} src={Logo} alt="Mercado Libre logo" />
        <div className='searchBox'>
          <input
            placeholder='Nunca dejes de buscar'
            className='input'
            value={inputValue}
            onChange={handleInputChange} />
          <button className='button' onClick={handleOnClick}>
            <img src={SearchIcon} alt="Mercado Libre logo" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
