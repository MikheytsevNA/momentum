import { useState, useRef, SyntheticEvent } from "react";
type SettingsProps = {
  settings: { [key: string]: boolean | { host: string; tags: string[] } };
  setSettings: (setting: {
    [key: string]: boolean | { host: string; tags: string[] };
  }) => void;
};
export default function Settings({ settings, setSettings }: SettingsProps) {
  interface settingsItem {
    id: string;
    className: string;
    innerText: string;
  }

  const initialState: Pick<settingsItem, "className" | "innerText">[] = [
    { className: "time", innerText: "Time" },
    { className: "date", innerText: "Date" },
    {
      className: "greeting",
      innerText: "Greeting",
    },
    { className: "quote", innerText: "Quote" },
    { className: "weather", innerText: "Weather" },
    { className: "todo", innerText: "ToDo" },
    { className: "search", innerText: "Search" },
  ];
  const list = applyInitialState(initialState);
  function applyInitialState(
    state: Pick<settingsItem, "className" | "innerText">[]
  ) {
    const list = [];
    for (let i = 0; i < state.length; i++) {
      const uuid = crypto.randomUUID();
      list.push({
        id: uuid,
        className: state[i].className,
        innerText: state[i].innerText,
      });
    }
    return list;
  }

  function toggleElement(key: string) {
    setSettings(Object.assign({}, settings, { [key]: !settings[key] }));
  }

  function renderSettingsItems(list: settingsItem[]) {
    const listItems = list.map((item) => {
      if (typeof settings[item.className] !== "boolean") {
        return;
      }
      const isChecked = settings[item.className] as boolean;
      return (
        <li
          key={item.id}
          data-key={item.id}
          data-element={item.className}
          className="menu-item"
        >
          <div className="menu-item-style">
            {item.innerText}
            <label className="toggle">
              <input
                type="checkbox"
                className=""
                onChange={() => toggleElement(item.className)}
                checked={isChecked}
              ></input>
              <span className="slider"></span>
              <span className="labels" data-on="" data-off=""></span>
            </label>
          </div>
        </li>
      );
    });
    return <>{listItems}</>;
  }
  const [toggleSettings, setToggleSettings] = useState(false);

  function toggleHandler() {
    setToggleSettings(!toggleSettings);
  }

  // pages of settings
  const initialPageState = useRef({
    general: false,
    photo: false,
  });
  const [pagesState, setPageState] = useState(
    Object.assign({}, initialPageState.current, { general: true })
  );
  function togglePage(target: string): void {
    setPageState(
      Object.assign({}, initialPageState.current, { [target]: true })
    );
  }
  // api choice
  const initialAPI = useRef({
    unsplash: false,
    flickr: false,
  });

  function toggleAPI(target: string): void {
    const apiCurrentSettings = settings.API as { host: string; tags: string[] };
    setSettings({
      ...settings,
      ...{
        API: {
          host: target,
          tags: apiCurrentSettings.tags,
        },
      },
    });
  }

  function tagsChange(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    const apiCurrentSettings = settings.API as { host: string; tags: string[] };
    setSettings({
      ...settings,
      ...{
        API: {
          host: apiCurrentSettings.host,
          tags: target.value.split(","),
        },
      },
    });
  }
  const refTags = useRef(null);

  return (
    <>
      <div className="settings-corner">
        <div className="settings-icon" onClick={toggleHandler}></div>
        <div
          className={`settings-container${
            !toggleSettings ? " settings-container_opaque" : ""
          }`}
        >
          <ul className="settings-pages">
            <li
              className={
                "settings-pages__item" +
                (pagesState.general ? " settings-pages__item_focused" : "")
              }
              onClick={() => togglePage("general")}
            >
              General
            </li>
            <li
              className={
                "settings-pages__item" +
                (pagesState.photo ? " settings-pages__item_focused" : "")
              }
              onClick={() => togglePage("photo")}
            >
              Photos
            </li>
          </ul>
          <div
            className={
              "general-setting" +
              (pagesState.general ? "" : " settings-pages_opaque")
            }
          >
            <div className="settings-title">General settings</div>
            <ul className="menu-list">{renderSettingsItems(list)}</ul>
          </div>
          <div
            className={
              "api-settings" +
              (pagesState.photo ? "" : " settings-pages_opaque")
            }
          >
            <div className="settings-title">Background API Settings</div>
            <div className="api-settings_choices">
              <div
                className={
                  typeof settings.API !== "boolean"
                    ? settings.API.host === "unsplash"
                      ? "api-settings_choice_chosen"
                      : ""
                    : ""
                }
                onClick={() => toggleAPI("unsplash")}
              >
                Unsplash
              </div>
              <div
                className={
                  typeof settings.API !== "boolean"
                    ? settings.API.host === "flickr"
                      ? "api-settings_choice_chosen"
                      : ""
                    : ""
                }
                onClick={() => toggleAPI("flickr")}
              >
                Flickr
              </div>
            </div>
            <div className="api-settings_tags">
              <label htmlFor="tags-input">Enter tags, split by comma</label>
              <input
                id="tags-input"
                type="text"
                className="tags-input"
                ref={refTags}
                onChange={tagsChange}
                value={
                  typeof settings.API !== "boolean"
                    ? settings.API.tags.join(",")
                    : ""
                }
              ></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
