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
  tags: string[]
): Promise<BackgroundResponse> {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags.join(
    ","
  )}&client_id=H78x--JRWchCa9VEOaZTgrfEcOUILiBDe-y7KKhJprg&fm=jpg&w=400`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) {
      return { succes: false, url: "./assets/img/bg.jpg" };
    }
    return { succes: true, url: result.urls.small };
  } catch {
    return { succes: false, url: "./assets/img/bg.jpg" };
  }
}
