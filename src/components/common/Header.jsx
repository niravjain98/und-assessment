import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import "./Header.css";
import useMenu from "../../hooks/useMenu";

export default function Header() {
  const { isMenuOpen, toggleMenu } = useMenu();

  return (
    <header className='header'>
      <div className='nav-burger-icon' onClick={toggleMenu}>
        {!isMenuOpen ? <GiHamburgerMenu /> : <IoMdClose />}
      </div>
      <div className='header-title'>
        <img src='und-logo.png' alt='UND Logo' className='header-logo' />
      </div>
      <nav className='header-nav-link-container'>
        <a href='https://und.edu/academics/index.html' className='nav-link'>
          Academics
        </a>
        <a href='https://und.edu/about/index.html' className='nav-link'>
          About UND
        </a>
        <a href='https://und.edu/programs/index.html' className='nav-link'>
          Programs
        </a>
        <a href='https://und.edu/research/index.html' className='nav-link'>
          Research
        </a>
        <a href='https://und.edu/admissions/index.html' className='nav-link'>
          Admissions
        </a>
      </nav>
    </header>
  );
}
