import { createContext } from "react";
import { useToggle } from "../hooks/useToggle";

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  
  const mode = isDarkMode ? "dark" : "light";

  return (
    <ModeContext.Provider value={{ mode, toggleDarkMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeContext;
