import { useState, useEffect, SyntheticEvent } from "react";

export default function Settings() {
  interface settingsItem {
    id: string;
    className: string;
    innerText: string;
    visible: boolean;
  }

  const initialState: Pick<
    settingsItem,
    "className" | "innerText" | "visible"
  >[] = [
    { className: "time", innerText: "Time", visible: true },
    { className: "date", innerText: "Date", visible: true },
    {
      className: "greeting-wrapper",
      innerText: "Greeting",
      visible: true,
    },
    { className: "quote", innerText: "Quote", visible: true },
    { className: "weather", innerText: "Weather", visible: true },
    { className: "todo", innerText: "ToDo", visible: true },
    { className: "search", innerText: "Search", visible: true },
  ];
  const [settingsState, setsettingsState] = useState<settingsItem[]>(
    applyInitialState(initialState)
  );
  function applyInitialState(
    state: Pick<settingsItem, "className" | "innerText" | "visible">[]
  ) {
    const list = [];
    for (let i = 0; i < state.length; i++) {
      const uuid = crypto.randomUUID();
      list.push({
        id: uuid,
        className: state[i].className,
        innerText: state[i].innerText,
        visible: state[i].visible,
      });
    }
    return list;
  }

  function toggleElement(event: SyntheticEvent) {
    const target: HTMLElement = event.target as HTMLElement;
    const parent = target.closest("li")!;
    const elementToChange = document.querySelector(
      // any way to get rid of this selector?
      "." + parent.dataset.element
    ) as HTMLElement;
    elementToChange?.classList.toggle("opaque");
    if (
      parent.dataset.element === "time" ||
      parent.dataset.element === "date" ||
      parent.dataset.element === "greeting-container"
    )
      setTimeout(() => {
        if (elementToChange?.style.display == "none") {
          elementToChange.style.display = "block";
        } else {
          elementToChange.style.display = "none";
        }
      }, 500);
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
                onChange={toggleElement}
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
          <ul className="menu-list">{renderSettingsItems(settingsState)}</ul>
          <div className="show"></div>
        </div>
      </div>
    </>
  );
}
