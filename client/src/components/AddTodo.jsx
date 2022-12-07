import { useState } from "react";
import axios from "axios";
import useUserStore from "../store/useStore";

const AddTodo = () => {
  const userid = useUserStore((state) => state.userid);
  const setTodos = useUserStore((state) => state.setTodos);
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    setTasks([...tasks, task]);
    setTask("");
  };

  const handleTodo = async () => {
    await axios.post("/todo", {
      userid: userid,
      title: title,
      task: tasks,
    });
    setTitle("");
    setTask("");
    setTasks([]);
    const { data } = await axios.get(`/todo/${userid}`);
    setTodos(data);
  };

  return (
    <>
      {/* The button to open modal */}
      <label htmlFor="my-modal-1" className="btn btn-secondary">
        <span className="normal-case tracking-wider">Add Todo</span>
      </label>
      {/* Modal part */}
      <input type="checkbox" id="my-modal-1" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {/* Title group */}
          <div className="ml-10">
            <label className="label">
              <span className="label-text text-lg font-bold text-neutral-content">
                Title
              </span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full max-w-sm text-neutral-content"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            {/* Tasks Group */}
            <label className="label mt-4">
              <span className="label-text text-lg font-bold text-neutral-content">
                Tasks
              </span>
            </label>
            <div className="input-group w-full max-w-sm">
              <input
                type="text"
                placeholder="Tasks"
                className="input input-bordered w-full text-neutral-content"
                onChange={(e) => setTask(e.target.value)}
                value={task}
              />
              <button className="btn btn-square" onClick={addTask}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
            {tasks.length !== 0 ? (
              <div>
                <ul className="list-inside list-disc mt-4">
                  <span className="text-neutral-content">
                    Tasks to be added
                  </span>
                  {tasks.map((e, i) => (
                    <li className="text-base-content list-item" key={i}>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <></>
            )}
            <button
              className="btn btn-secondary btn-block max-w-sm mt-4 mx-auto"
              onClick={handleTodo}
            >
              Add todo
            </button>
          </div>
          <div className="modal-action">
            <label
              htmlFor="my-modal-1"
              className="btn btn-error btn-sm btn-circle absolute right-3 top-2 font-bold"
            >
              X
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
