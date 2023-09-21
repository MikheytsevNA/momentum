import imgUrl from "../assets/img/bg.jpg";

export type BackgroundResponseSuccess = {
  succes: true;
  url: string;
};

export type BackgroundResponseFail = {
  succes: false;
  url: string;
};

export type BackgroundResponse =
  | BackgroundResponseSuccess
  | BackgroundResponseFail;

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export async function fetchBackground(
  host: string,
  tags: string[]
): Promise<BackgroundResponse> {
  let url: string;
  if (host === "unsplash") {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags.join(
      ","
    )}&client_id=${import.meta.env.VITE_UNSPLASH_API}=jpg`;
  } else if (host === "flickr") {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
      import.meta.env.VITE_FLICKR_API
    }&tags=${tags.join(
      ","
    )}&tag-mode=AND&extras=url_o&content_types=0&format=json&nojsoncallback=1`;
  } else {
    throw new Error("Something went wrong");
  }

  try {
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) {
      return { succes: false, url: imgUrl };
    }
    if (host === "unsplash") {
      return { succes: true, url: result.urls.raw };
    } else {
      return {
        succes: true,
        url: result.photos.photo.filter(
          (image: { width_o: string }) => Number.parseInt(image.width_o) >= 1440
        )[getRandomInt(0, 100)].url_o,
      };
    }
  } catch {
    return { succes: false, url: imgUrl };
  }
}
