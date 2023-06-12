import { useContext } from "react";
import { ThemeContext } from "../App";

export const Header = ({ switchTheme }) => {

   const theme = useContext(ThemeContext);

   return (
         <header className={'Header ' + theme } onClick={switchTheme}>
            <h1>World Atlas</h1>
         </header>
   );
}