import { useState, useEffect, useContext } from "react";
import { useData } from "../customHooks/useData";
import { SvgGlobe } from "./SvgGlobe";
import { WikiData } from "./WikiData";
import { ThemeContext } from "../App";

export const WorldAtlas = ({ dim }) => {
   const { loResCountries, hiResCountries, initCountry } = useData();
   const [topology, setTopology] = useState(null);
   const [country, setCountry] = useState(null);
   const theme = useContext(ThemeContext);

   useEffect(() => {
      setTopology(hiResCountries);
      setCountry(initCountry);
   }, [hiResCountries, initCountry]);

   // render
   if (!topology) {
      return (
         <div className='layout'>
            <div className={'svgContainer loading ' + theme}></div>
            <WikiData></WikiData>
         </div>
      )
   }
   return (
      <div className='layout'>
         <SvgGlobe 
            dim={dim} 
            topology={topology}
            setTopology={setTopology}
            loResCountries={loResCountries}
            hiResCountries={hiResCountries}
            setCountry={setCountry}
         >   
         </SvgGlobe>
         <WikiData country={country ?? initCountry}></WikiData>
      </div>
   )
}