import { ThemeSwitchBox } from "./ThemeSwitchBox";

export const Header = ({ theme, switchTheme }) => {

   return (
         <header className={'Header'}>
            <h1>World Atlas</h1>
            <ThemeSwitchBox theme={theme} switchTheme={switchTheme}></ThemeSwitchBox>
         </header>
   );
}