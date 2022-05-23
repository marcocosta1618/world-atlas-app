// filter images by extension:
// match jpg|png|webp, other formats seem to be used mostly for maps and graphs

export const filterImages = imgsDataArr => {
   const regex = /.(jpg|png|webp)$/i
   return imgsDataArr.filter(imgData => regex.test(imgData.title))
}