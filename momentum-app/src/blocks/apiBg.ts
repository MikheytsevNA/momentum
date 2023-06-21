import "../assets/img/bg.jpg";

export type BackgroundResponseSuccess = {
  succes: true;
  url: string;
};

export type BackgroundResponseFail = {
  succes: false;
  url: "./assets/img/bg.jpg";
};

export type BackgroundResponse =
  | BackgroundResponseSuccess
  | BackgroundResponseFail;

export async function fetchBackground(
  host: string,
  tags: string[]
): Promise<BackgroundResponse> {
  let url: string;
  if (host === "unsplash") {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags.join(
      ","
    )}&client_id=H78x--JRWchCa9VEOaZTgrfEcOUILiBDe-y7KKhJprg&fm=jpg`;
  } else if (host === "flickr") {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c98cf9bd1f00ccb39f492e628064257&tags=${tags.join(
      ","
    )}&extras=url_l&format=json&nojsoncallback=1`;
  } else {
    throw new Error("Something went wrong");
  }

  try {
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) {
      return { succes: false, url: "./assets/img/bg.jpg" };
    }
    if (host === "unsplash") {
      return { succes: true, url: result.urls.raw };
    } else {
      return { succes: true, url: result.photos.photo[0].url_l };
    }
  } catch {
    return { succes: false, url: "./assets/img/bg.jpg" };
  }
}
