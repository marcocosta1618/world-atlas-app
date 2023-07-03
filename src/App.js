import { useState } from "react";
import { Header } from "./components/Header";
import { WorldAtlas } from "./components/WorldAtlas";
import { Footer } from "./components/Footer";

const dim = {
  w: 640,
  h: 640
};


const App = () => {

  const [theme, setTheme] = useState('light');
  const switchTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
      <div className={'App ' + theme}>
        <Header theme={theme} switchTheme={switchTheme}></Header>
        <WorldAtlas dim={dim}></WorldAtlas>
        <Footer />
      </div>
  );
}

export default App;