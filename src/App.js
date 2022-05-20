import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WorldAtlas } from "./components/WorldAtlas";

const dim = {
  w: 640,
  h: 640
}

const App = () => (
  <div className='App'>
    <Header/>
    <WorldAtlas dim={dim}></WorldAtlas>
    <Footer/>
  </div>
);

export default App;