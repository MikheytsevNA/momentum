import { useState, useEffect, SyntheticEvent } from "react";
type SettingsProps = {
  settings: { [key: string]: boolean };
  setSettings: (timeItem: { [key: string]: boolean }) => void;
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
                checked={settings[item.className]}
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
  //toggle menu on click
  const [toggleSettings, setToggleSettings] = useState(false);

  function toggleHandler() {
    setToggleSettings(!toggleSettings);
  }

  return (
    <>
      <div className="settings-corner">
        <div className="settings-icon" onClick={toggleHandler}></div>
        <div
          className={`settings-container${
            !toggleSettings ? " settings-container_opaque" : ""
          }`}
        >
          <div className="settings-menu">General settings</div>
          <ul className="menu-list">{renderSettingsItems(list)}</ul>
          <div className="show"></div>
        </div>
      </div>
    </>
  );
}
