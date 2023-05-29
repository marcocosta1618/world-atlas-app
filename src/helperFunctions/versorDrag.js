import versor from "versor";

export const versorDrag = (
   projection,
   setRotation,
   setTopology, 
   loResCountries, 
   hiResCountries) => {
      
   let q0, v0, r0;
   const dragStart = e => {
      if (e.type === 'start') {
         v0 = versor.cartesian(projection.invert([e.x, e.y]));
         r0 = projection.rotate();
         q0 = versor(r0);
      }
   }
   const dragged = e => {
      if (e.type === 'drag') {
         const v1 = versor.cartesian(projection.invert([e.x, e.y])),
         q1 = versor.multiply(q0, versor.delta(v0, v1)),
         r1 = versor.rotation(q1);
         setTopology(loResCountries);
         setRotation(r1);
      }
   }
   const dragEnd = e => {
      if (e.type === 'end') {
         setTopology(hiResCountries);
      } 
   }
   return {
      dragStart,
      dragged,
      dragEnd
   }
}