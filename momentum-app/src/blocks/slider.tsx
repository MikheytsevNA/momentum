import { useState, useEffect } from "react";
import { debounce } from "./debounce";
import { useDebounce } from "./use-debounce";
import {
  fetchBackground,
  BackgroundResponse,
  BackgroundResponseSuccess,
  BackgroundResponseFail,
} from "./apiBg";
type SlideProps = { setBackground: (url: string) => void };
export default function Slider(props: SlideProps) {
  const [change, setChange] = useState<boolean | null>(null);
  const debouncedChange = useDebounce(change, 1000); //debouncing change
  useEffect(() => {
    const tags = ["nature", "evening"];
    const getUrl = async (tags: string[]) => {
      const response = await fetchBackground(tags);
      if (response?.succes) {
        //setImgLoaded(background.url);
        const img = new Image();
        img.src = response.url;
        img.onload = () => {
          props.setBackground(img.src);
        };
      }
    };
    if (debouncedChange !== null) getUrl(tags);
  }, [debouncedChange]);

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
