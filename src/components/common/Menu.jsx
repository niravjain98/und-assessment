import React, { useEffect, useMemo } from "react";
import "./Menu.css";
import useMenu from "../../hooks/useMenu";

function Menu() {
  const ref = React.useRef(null);
  const bodyTag = useMemo(() => document.getElementsByTagName("body")[0], []);

  const { isMenuOpen } = useMenu();

  useEffect(() => {
    if (isMenuOpen) {
      bodyTag.style.overflow = "hidden";
      ref.current.classList.remove("hidden");
      ref.current.classList.add("active");
    } else {
      bodyTag.style.overflow = "auto";
      ref.current.classList.remove("active");
      setTimeout(() => {
        ref.current.classList.add("hidden");
      }, 300);
    }
  }, [bodyTag.style, isMenuOpen]);

  return (
    <div id='fullPageMenu' ref={ref} className='hidden'>
      <ul className='menu-list'>
        <li><a href="https://und.edu/academics/index.html">Academics</a></li>
        <li><a href="https://und.edu/admissions/index.html">Admissions</a></li>
        <li><a href="https://und.edu/research/index.html">Research</a></li>
        <li><a href="https://und.edu/programs/index.html">Programs</a></li>
        <li><a href="https://und.edu/about/index.html">About</a></li>
      </ul>
    </div>
  );
}

export default Menu;
