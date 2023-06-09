import { useContext } from "react";
import { ThemeContext } from "../App";

export const Header = () => {

   const theme = useContext(ThemeContext);

   return (
         <header className={'Header ' + theme }>
            <h1>World Atlas</h1>
         </header>
   );
}