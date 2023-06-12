import { useState, createContext } from "react";
import { Header } from "./components/Header";
import { WorldAtlas } from "./components/WorldAtlas";
import { Footer } from "./components/Footer";

const dim = {
  w: 640,
  h: 640
};

export const ThemeContext = createContext('light');

const App = () => {

  const [theme, setTheme] = useState('light');
  const switchTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={theme}>
      <div className={'App ' + theme}>
        <Header switchTheme={switchTheme}></Header>
        <WorldAtlas dim={dim}></WorldAtlas>
        <Footer />
      </div>
    </ThemeContext.Provider>);
}

export default App;