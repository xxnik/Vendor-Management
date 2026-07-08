import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export function NavbarProvider({ children }) {
  const [navbarTitle, setNavbarTitle] = useState(null);

  return (
    <NavbarContext.Provider value={{ navbarTitle, setNavbarTitle }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  return useContext(NavbarContext);
}
