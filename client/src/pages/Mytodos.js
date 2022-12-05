import { Client, Account } from "appwrite";
import { useEffect } from "react";
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
  const userid = useUserStore((state) => state.userid);

  const fetchTodos = async () => {
    const todos = await axios.get(`/todo/${userid}`);
    console.log(todos);
  };

  useEffect(() => {
    const promise = account.get();
    promise.then(
      (response) => {
        user(response.name); // Success
      },
      (error) => {
        navigate("/login");
        console.log(error);
      }
    );
    console.log(userid);
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <section>
        <div className="container max-w-5xl mx-auto">
          <Search />
          <Todos />
        </div>
      </section>
    </main>
  );
}

export default Mytodos;
