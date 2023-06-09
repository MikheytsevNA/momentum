import { useState, useEffect, useRef, SyntheticEvent } from "react";

export default function ToDO() {
  interface toDoObject {
    id: string;
    task: string;
    edit: string;
  }

  const incompleteListJSONFromStorage = localStorage.getItem("incompleteList");
  const completeListJSONFromStorage = localStorage.getItem("completeList");

  let incompleteListFromStorage: [];
  let completeListFromStorage: [];

  if (!incompleteListJSONFromStorage) {
    incompleteListFromStorage = [];
  } else {
    incompleteListFromStorage = JSON.parse(incompleteListJSONFromStorage);
  }

  if (!completeListJSONFromStorage) {
    completeListFromStorage = [];
  } else {
    completeListFromStorage = JSON.parse(completeListJSONFromStorage);
  }

  const [addTask, SetAddTask] = useState("");

  const [incompleteList, setIncompleteList] = useState<toDoObject[]>(
    incompleteListFromStorage
  );
  const [completeList, setCompleteList] = useState<toDoObject[]>(
    completeListFromStorage
  );
  const refNewTask = useRef(null);

  function addTaskHandler(event: SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    SetAddTask(target.value);
  }

  function addNewTask() {
    const target = refNewTask.current as HTMLInputElement | null;
    if (!target?.value) {
      return;
    }
    const uuid = crypto.randomUUID();
    setIncompleteList((current) => [
      ...current,
      { id: uuid, task: target.value, edit: "" },
    ]);
    SetAddTask("");
  }

  function deleteButtonHandler(event: SyntheticEvent) {
    const target: HTMLElement = event.target as HTMLElement;
    const parentKey = target.closest("li")?.dataset.key;
    if (!parentKey) {
      return;
    }
    const usedIncompleteKeys = incompleteList.map(({ id }) => id);
    if (usedIncompleteKeys.includes(parentKey)) {
      const index = usedIncompleteKeys.indexOf(parentKey);
      setIncompleteList(
        incompleteList
          .slice(0, index)
          .concat(...incompleteList.slice(index + 1))
      );
    }
    const usedCompleteKeys = completeList.map(({ id }) => id);
    if (usedCompleteKeys.includes(parentKey)) {
      const index = usedCompleteKeys.indexOf(parentKey);
      setCompleteList(
        completeList.slice(0, index).concat(...completeList.slice(index + 1))
      );
    }
  }

  function editButtonHandler(event: SyntheticEvent) {
    const target: HTMLElement = event.target as HTMLElement;
    const parent = target.closest("li");
    const parentKey = parent?.dataset.key;
    if (!parentKey) {
      return;
    }
    const isInEditMode = parent.classList.contains("edit-mode");
    const usedIncompleteKeys = incompleteList.map(({ id }) => id);
    const usedCompleteKeys = completeList.map(({ id }) => id);
    if (isInEditMode) {
      const correspondingInput = parent.querySelector(
        ".task__text-inputs"
      ) as HTMLInputElement;
      if (usedIncompleteKeys.includes(parentKey)) {
        const index = usedIncompleteKeys.indexOf(parentKey);
        setIncompleteList(
          incompleteList.slice(0, index).concat(
            [
              {
                task: correspondingInput.value,
                id: incompleteList[index].id,
                edit: "",
              },
            ],
            ...incompleteList.slice(index + 1)
          )
        );
      }
      if (usedCompleteKeys.includes(parentKey)) {
        const index = usedCompleteKeys.indexOf(parentKey);
        setCompleteList(
          completeList.slice(0, index).concat(
            [
              {
                task: correspondingInput.value,
                id: completeList[index].id,
                edit: "",
              },
            ],
            ...completeList.slice(index + 1)
          )
        );
      }
    } else {
      if (usedIncompleteKeys.includes(parentKey)) {
        const index = usedIncompleteKeys.indexOf(parentKey);
        setIncompleteList(
          incompleteList.slice(0, index).concat(
            [
              {
                task: incompleteList[index].task,
                id: incompleteList[index].id,
                edit: incompleteList[index].task,
              },
            ],
            ...incompleteList.slice(index + 1)
          )
        );
        incompleteList[index].edit = incompleteList[index].task;
      }
      if (usedCompleteKeys.includes(parentKey)) {
        const index = usedCompleteKeys.indexOf(parentKey);
        setCompleteList(
          completeList.slice(0, index).concat(
            [
              {
                task: completeList[index].task,
                id: completeList[index].id,
                edit: completeList[index].task,
              },
            ],
            ...completeList.slice(index + 1)
          )
        );
      }
    }
    target.closest("li")?.classList.toggle("edit-mode");
  }

  function completionHandle(event: SyntheticEvent) {
    const target: HTMLElement = event.target as HTMLElement;
    const parent = target.closest("li");
    const parentKey = parent?.dataset.key;
    if (!parentKey) {
      return;
    }
    const usedIncompleteKeys = incompleteList.map(({ id }) => id);
    const usedCompleteKeys = completeList.map(({ id }) => id);
    if (usedIncompleteKeys.includes(parentKey)) {
      const index = usedIncompleteKeys.indexOf(parentKey);
      setCompleteList((current) => [...current, incompleteList[index]]);
      setIncompleteList(
        incompleteList
          .slice(0, index)
          .concat(...incompleteList.slice(index + 1))
      );
    }
    if (usedCompleteKeys.includes(parentKey)) {
      const index = usedCompleteKeys.indexOf(parentKey);
      setIncompleteList((current) => [...current, completeList[index]]);
      setCompleteList(
        completeList.slice(0, index).concat(...completeList.slice(index + 1))
      );
    }
  }

  function renderIncompleteTasks(isComplete: boolean, list: toDoObject[]) {
    const listItems = list.map((item) => {
      return (
        <li
          key={item.id}
          data-key={item.id}
          className="list-item lists__content"
        >
          <input
            type="checkbox"
            className="list-item__checkbox-inputs"
            onChange={completionHandle}
            checked={isComplete}
          ></input>
          <div className="task list-item__main">
            <label className="task__text-labels">{item.task}</label>
            <input
              type="text"
              className="task__text-inputs"
              defaultValue={item.edit}
            ></input>
          </div>
          <button
            className="list-item__buttons list-item__buttons_edit"
            onClick={editButtonHandler}
          >
            {item.edit === "" ? "Edit" : "Save"}
          </button>
          <button
            className="list-item__buttons list-item__buttons_delete"
            onClick={deleteButtonHandler}
          >
            <img
              src="/src/assets/svg/remove.svg"
              className="remove-button-img"
              alt="Remove"
            ></img>
          </button>
        </li>
      );
    });
    return <>{listItems}</>;
  }

  //toggle menu on click
  const [toggleMenu, setToggleMenu] = useState(false);

  function toggleHandler() {
    setToggleMenu(!toggleMenu);
  }

  addEventListener("beforeunload", (): void => {
    localStorage.setItem("incompleteList", JSON.stringify(incompleteList));
    localStorage.setItem("completeList", JSON.stringify(completeList));
  });

  return (
    <>
      <div className="toggle-todo" onClick={toggleHandler}>
        ToDo
      </div>
      <div className={`todo-menu${toggleMenu ? " todo-menu_active" : ""}`}>
        <div className="new-task">
          <label className="new-task__titles" htmlFor="new-task">
            Add Item
          </label>
          <div className="new-task__wrapper">
            <input
              id="new-task"
              className="new-task__text-inputs"
              type="text"
              ref={refNewTask}
              value={addTask}
              onChange={addTaskHandler}
            ></input>
            <button className="new-task__buttons" onClick={addNewTask}>
              Add
            </button>
          </div>
        </div>
        <h3 className="section-titles">Todo</h3>
        <ul id="incomplete-tasks" className="lists">
          {renderIncompleteTasks(false, incompleteList)}
        </ul>
        <h3 className="section-titles">Completed</h3>
        <ul id="completed-tasks" className="lists">
          {renderIncompleteTasks(true, completeList)}
        </ul>
      </div>
    </>
  );
}
