# World Atlas App 🌍

An interactive map of the Earth made with [D3](https://d3js.org/) and [React](https://reactjs.org/).


Clicking on a country will retrive the corresponding Wikipedia page's summary about the country, along with the geographical coordinates and flag.
A selection of images from the country's page is also returned.
In doing that, the App uses the [Wikipedia npm package](https://www.npmjs.com/package/wikipedia).


The globe map is freely and naturally draggable thanks to the [versor package](https://www.npmjs.com/package/versor).

This App is deployed on [Github pages](https://marcocosta1618.github.io/world-atlas-app/). 

![REACT](https://img.shields.io/badge/REACT-grey.svg?&logo=react&logoColor=blue)&nbsp;
![D3.js](https://img.shields.io/badge/D3.js-fff.svg?&logo=d3.js&logoColor=f5854b)&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e.svg?&logo=javascript&logoColor=black)&nbsp;
![SASS](https://img.shields.io/badge/SASS-cc6699.svg?&logo=sass&logoColor=white)&nbsp;

---

### TODO:
+ render geographical coordinates on the screen when hovering cursor over the globe;
+ use Unsplash api to get countries images;
+ add support for touch gestures;
+ ~~render the globe with a higher resolution topojson file and use a smaller resolution file while dragging the globe;~~
+ ~~mobile layout and optimizations;~~
+ ~~add light/dark mode;~~
+ ~~fix tooltip width in Safari;~~

---

![screenshoot(100%)](https://user-images.githubusercontent.com/78434326/170222207-106b6beb-e145-401d-bfaf-4bec6a43857f.png)

---
