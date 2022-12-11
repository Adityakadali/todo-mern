import axios from "axios";
import { useState } from "react";
import useUserStore from "../store/useStore";
import AddTodo from "./AddTodo";

const Search = () => {
  const [query, setQuery] = useState("");
  const userid = useUserStore((state) => state.userid);
  const setTodos = useUserStore((state) => state.setTodos);

  const handleQuery = async () => {
    console.log(userid, query);
    const { data } = await axios.get("/search", {
      params: {
        userid,
        query,
      },
    });
    setTodos(data);
  };
  return (
    <div className="flex justify-between mt-4">
      <AddTodo />
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-square" onClick={handleQuery}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
