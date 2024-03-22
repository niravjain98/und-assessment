import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import './ScrollToTop.css';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className='scroll-to-top'>
          <IoIosArrowUp />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
