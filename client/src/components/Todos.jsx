import { useState } from "react";
import axios from "axios";
import useUserStore from "../store/useStore";
import { useEffect } from "react";
import Title from "./TodoTitle";

const Todos = () => {
  const [todos, setTodos] = useState("");
  const id = useUserStore((state) => state.userid);
  const setStateTodos = useUserStore((state) => state.setTodos);
  const stateTodos = useUserStore((state) => state.todos);
  useEffect(() => {
    setTodos(stateTodos);
    // eslint-disable-next-line
  }, [stateTodos]);

  useEffect(() => {
    if (id) fetchTodos();
    // eslint-disable-next-line
  }, [id]);
  const fetchTodos = async () => {
    const { data } = await axios.get(`/todo/${id}`);
    setStateTodos(data);
  };
  const [editindex, setEditindex] = useState(undefined);
  const [todoTitle, setTodoTitle] = useState(undefined);
  const handleEdit = (index, title) => {
    setEditindex(index);
    setTodoTitle(title);
  };

  const handleSave = async (id) => {
    await axios.put("/todo", {
      id: id,
      newTitle: todoTitle,
    });
    setEditindex(undefined);
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await axios.delete("/todo", { data: { id: id } });
    fetchTodos();
  };
  return (
    <>
      {todos ? (
        <div className="mt-4">
          {todos.map((e, i) => (
            <div className="grid grid-cols-6 gap-4 mb-4 items-center" key={i}>
              {editindex === i ? (
                <input
                  value={todoTitle}
                  onChange={(e) => setTodoTitle(e.target.value)}
                  className="input input-bordered w-full col-span-4 text-neutral-content"
                />
              ) : (
                <Title data={e} />
              )}
              {editindex === i ? (
                <button
                  className="btn btn-success col-span-1"
                  onClick={() => handleSave(e._id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-info col-span-1"
                  onClick={() => handleEdit(i, e.title)}
                >
                  Edit
                </button>
              )}

              <button
                className="btn btn-error col-span-1"
                onClick={() => handleDelete(e._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Todos;
