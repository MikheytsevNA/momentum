import { useState, useEffect } from "react";
import { debounce } from "./debounce";
import { useDebounce } from "./use-debounce";
import {
  fetchBackground,
  BackgroundResponse,
  BackgroundResponseSuccess,
  BackgroundResponseFail,
} from "./apiBg";

//const debounced = debounce(fetchBackground, 1000);

export default function Slider() {
  const [change, setChange] = useState(false);
  const [background, setBackground] = useState<BackgroundResponse | null>(null);
  const debouncedChange = useDebounce(change, 1000); //debouncing change
  const [imgLoaded, setImgLoaded] = useState("./assets/img/bg.jpg");
  useEffect(() => {
    const tags = ["nature", "evening"];
    const getUrl = async (tags: string[]) => {
      const response = await fetchBackground(tags);
      setBackground(response);
      if (background?.succes) {
        const img = new Image();
        img.src = background.url;
        img.onload = () => {
          console.log("Img is loaded");
          setImgLoaded(img.src);
        };
      }
    };
    getUrl(tags);
  }, [debouncedChange]);

  useEffect(() => {
    if (background) {
      document.body.style.backgroundImage = `url("${imgLoaded}}")`;
      console.log("Background is changed");
    }
  }, [imgLoaded]);

  function handleClick(): void {
    setChange(!change);
  }
  return (
    <>
      <button className="slide-prev slider-icon" onClick={handleClick}></button>
      <button className="slide-next slider-icon" onClick={handleClick}></button>
    </>
  );
}
