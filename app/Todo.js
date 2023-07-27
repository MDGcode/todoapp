import React from "react";

const style = {
  normalList: `flex justify-between bg-slate-200 p-4 my-2 capitalize rounded-xl`,
  checkedList: `flex justify-between bg-slate-200 p-4 my-2 capitalize rounded-xl`,
  normalText: `ml-2 cursor-pointer text-slate-900`,
  checkedText: `ml-2 cursor-pointer line-through  text-slate-500`,
};

export default function Todo({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className={todo.completed ? style.checkedList : style.normalList}>
      <div className="flex">
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        <p
          onClick={() => toggleComplete(todo)}
          className={todo.completed ? style.checkedText : style.normalText}
        >
          {todo.text}
        </p>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className=" cursor-pointer flex items-center"
      >
        <i class="fa-solid fa-trash text-slate-900 "></i>
      </button>
    </li>
  );
}
