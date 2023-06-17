import { useContext } from "react";
import { ThemeContext } from "../App";
import { ThemeSwitchBox } from "./ThemeSwitchBox";

export const Header = ({ switchTheme }) => {

   const theme = useContext(ThemeContext);

   return (
         <header className={'Header ' + theme }>
            <h1>World Atlas</h1>
            <ThemeSwitchBox switchTheme={switchTheme}></ThemeSwitchBox>
         </header>
   );
}