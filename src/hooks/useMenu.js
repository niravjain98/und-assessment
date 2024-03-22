import React, { useState } from "react";

const MenuContext = React.createContext({ isMenuOpen: false, toggleMenu: () => {}, setIsMenuOpen: () => {} });

const useMenu = () => {
  const { isMenuOpen, toggleMenu, setIsMenuOpen } = React.useContext(MenuContext);
  return { isMenuOpen, toggleMenu, setIsMenuOpen };
};

const MenuContextProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return <MenuContext.Provider value={{ isMenuOpen, toggleMenu, setIsMenuOpen }}>{children}</MenuContext.Provider>;
};

export { MenuContextProvider };

export default useMenu;
