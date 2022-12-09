import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Title = ({ data }) => {
  const [tododata, setTodoData] = useState(data);
  const [editindex, setEditindex] = useState("");
  const [task, setTask] = useState("");
  const [newTask, setNewTask] = useState("");

  const handleEdit = (index, task) => {
    setEditindex(index);
    setTask(task);
  };

  useEffect(() => {
    setTodoData(data);
  }, [data]);

  const handleSave = async (index) => {
    const response = await axios.put("/task", {
      id: data._id,
      key: index,
      newTask: task,
    });
    setEditindex("");
    setTask("");
    setTodoData(response.data);
  };

  const handleDelete = async (taskindex) => {
    const response = await axios.delete("/task", {
      data: {
        id: data._id,
        key: taskindex,
      },
    });
    setTodoData(response.data);
  };

  const close = () => {
    setEditindex("");
    setTask("");
  };

  const handleAddTask = async () => {
    const response = await axios.post("/task", {
      id: data._id,
      task: newTask,
    });
    setNewTask("");
    setTodoData(response.data);
  };

  return (
    <>
      {/* The button to open modal */}
      <label
        htmlFor="my-modal-2"
        className="col-span-4 cursor-pointer text-lg text-neutral-content"
      >
        {tododata.title}
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-sm">
          <h3 className="text-center text-2xl font-bold text-neutral-content">
            {tododata.title}
          </h3>
          <ul>
            {tododata.tasks.map((e, i) => (
              <li
                className="mt-4 flex items-center justify-between gap-4"
                key={i}
              >
                {editindex === i ? (
                  <input
                    className="input-bordered input input-sm w-full max-w-xs"
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />
                ) : (
                  <span>{e}</span>
                )}
                <div className="flex gap-4">
                  {/* edit button */}
                  {editindex === i ? (
                    <button
                      className="btn-success btn-square btn-sm btn"
                      onClick={() => handleSave(i)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="btn-info btn-square btn-sm btn"
                      onClick={() => handleEdit(i, e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  )}
                  {/* delete button */}
                  <button
                    className="btn-error btn-square btn-sm btn"
                    onClick={() => handleDelete(i)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-4">
            <input
              type="text"
              className="input-bordered input input-sm"
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
            />
            <button className="btn-accent btn-sm btn" onClick={handleAddTask}>
              Add Task
            </button>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal-2" className="btn" onClick={close}>
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Title;
