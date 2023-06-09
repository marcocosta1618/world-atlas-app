import { Header } from "./components/Header";
import { WorldAtlas } from "./components/WorldAtlas";
import { Footer } from "./components/Footer";


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