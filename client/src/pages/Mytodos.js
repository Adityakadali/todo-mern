import { Client, Account } from "appwrite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useStore";
import config from "../config";
import Search from "../components/Search";
import Todos from "../components/Todos";

function Mytodos() {
  const navigate = useNavigate();

  const client = new Client();
  const account = new Account(client);
  client.setEndpoint(config.endpoint).setProject(config.projectID);

  const user = useUserStore((state) => state.setuser);

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
