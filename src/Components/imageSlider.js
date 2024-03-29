import { useEffect, useState } from "react";

function ImageSlider(){
    let images = ["https://images.filmibeat.com/webp/wallpapers/desktop/2020/01/soorarai-pottru_4.jpg", "https://images.filmibeat.com/webp/wallpapers/desktop/2022/11/japan_6.jpg", "https://wallpapercave.com/wp/wp9309354.jpg", "https://images.filmibeat.com/webp/wallpapers/desktop/2023/10/leo_4.jpg"];

    let [image, setCurrentImage] = useState(0);

    useEffect(()=>{
        const interval = setInterval(() => {
            setCurrentImage((prevIndex) =>
              prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
          }, 4000);
      
          return () => clearInterval(interval);
    }, [images.length])
    return (
        <div className="img-slider">
                <img src={images[image]}  className="image-slide"/>
        </div>
    )
}
export default ImageSlider;