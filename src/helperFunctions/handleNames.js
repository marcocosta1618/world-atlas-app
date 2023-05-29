export const handleNames = (country) => {
   // country names exceptions
   switch (country) {
      case 'Bosnia and Herz.':
         country = 'Bosnia and Herzegovina'
         break;
      case 'Congo':
         country = 'Republic of the Congo'
         break;
      case 'Georgia':
         country = 'Georgia_(country)'
         break;
      case 'Ireland':
         country = 'Republic of Ireland'
         break;
      case 'Macedonia':
         country = 'North Macedonia'
         break;
      case 'Palestine':
         country = 'State of Palestine'
         break;
      case 'W. Sahara':
         country = 'Western Sahara'
         break;
      default: return country;
   }
   return country;
} 