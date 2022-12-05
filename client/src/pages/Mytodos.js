import { Client, Account } from "appwrite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../useStore";
import config from "../config";
import axios from "axios";
import Search from "../components/Search";
import Todos from "../components/Todos";

function Mytodos() {
  const navigate = useNavigate();

  const client = new Client();
  const account = new Account(client);
  client.setEndpoint(config.endpoint).setProject(config.projectID);

  const user = useUserStore((state) => state.setuser);
  const id = useUserStore((state) => state.userid);
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const { data } = await axios.get(`/todo/${id}`);
    setTodos(data);
  };

  useEffect(() => {
    const promise = account.get();
    promise.then(
      (response) => {
        user(response.name, response.$id); // Success
      },
      (error) => {
        navigate("/login");
        console.log(error);
      }
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (id) fetchTodos();
  }, [id]);

  return (
    <main>
      <section>
        <div className="container max-w-5xl mx-auto">
          <Search />
          <Todos data={todos} />
        </div>
      </section>
    </main>
  );
}

export default Mytodos;
