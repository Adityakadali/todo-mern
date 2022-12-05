import { useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../useStore";

const Todos = ({ data }) => {
  const [editindex, setEditindex] = useState(undefined);
  const [todoTitle, setTodoTitle] = useState(undefined);
  const handleEdit = (index, title) => {
    setEditindex(index);
    setTodoTitle(title);
  };

  const handleSave = () => {
    setEditindex(undefined);
  };
  return (
    <>
      <div className="mt-4">
        {data.map((e, i) => (
          <div className="grid grid-cols-6 gap-2 mb-2 items-center" key={i}>
            {editindex === i ? (
              <input
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                className="input input-bordered input-primary w-full col-span-4 text-neutral-content"
              />
            ) : (
              <Link
                to={e._id}
                className="col-span-4 text-neutral-content text-lg"
              >
                {e.title}
              </Link>
            )}
            {editindex === i ? (
              <button className="btn col-span-1" onClick={() => handleSave()}>
                Save
              </button>
            ) : (
              <button
                className="btn col-span-1"
                onClick={() => handleEdit(i, e.title)}
              >
                Edit
              </button>
            )}

            <button className="btn col-span-1">Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todos;
