/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useThrottle } from "./use-throttle";
import { fetchBackground } from "./apiBg";
type SlideProps = {
  setBackground: (url: string) => void;
  sliderSettings: { host: string; tags: string[] };
};
export default function Slider(props: SlideProps) {
  const [change, setChange] = useState<boolean | null>(null);
  const throttledChange = useThrottle(change, 3000); //throttle change
  useEffect(() => {
    const tags = props.sliderSettings.tags;
    const host = props.sliderSettings.host;
    const getUrl = async (tags: string[]) => {
      const response = await fetchBackground(host, tags);
      if (response?.succes) {
        //setImgLoaded(background.url);
        const img = new Image();
        img.src = response.url;
        img.onload = () => {
          props.setBackground(img.src);
        };
      }
    };
    if (throttledChange !== null) getUrl(tags);
  }, [throttledChange]);

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
