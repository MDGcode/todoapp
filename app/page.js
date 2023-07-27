"use client";
import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import {
  query,
  collection,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  console.log(input);
  //Create Todo
  const createTodo = async (event) => {
    event.preventDefault(event);
    if (input === "") {
      alert("Introdu un task valid");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };
  //Read Todo
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubcsribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArray = [];
      QuerySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsubcsribe();
  }, []);

  //Update Todo
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  //Delete Todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className=" h-screen w-screen p-4 bg-gradient-to-r from-sky-600 to-cyan-500">
      <div className="bg-slate-100 max-w-lg w-full m-auto rounded-lg shadow-lg p-4">
        <h3 className="text-slate-950 text-3xl font-bold text-center p-2 tracking-wide">
          Task-uri IT
        </h3>
        <form onSubmit={createTodo} className=" flex">
          <input
            value={input}
            type="text"
            placeholder="Adauga Task"
            className="border rounded-xl p-2 w-full text-xl text-slate-900"
            onChange={(event) => setInput(event.target.value)}
          />
          <button className="text-slate-950 border p-4 ml-2 bg-sky-400 rounded-xl">
            <i className="fa-solid fa-plus text-2xl"></i>
          </button>
        </form>
        <ul>
          {todos.map((todo, todoIndex) => {
            return (
              <Todo
                key={todoIndex}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </ul>
        <p className="text-center p-2 text-slate-900">
          {`Mai ai ${todos.length} task-uri`}
        </p>
      </div>
    </div>
  );
}
