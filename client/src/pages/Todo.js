import { Client, Account } from "appwrite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../useStore";
import config from "../config";

function Todo() {
  const navigate = useNavigate();

  const client = new Client();
  const account = new Account(client);
  client.setEndpoint(config.endpoint).setProject(config.projectID);

  const user = useUserStore((state) => state.setuser);

  useEffect(() => {
    const promise = account.get();
    promise.then(
      function (response) {
        user(response.name); // Success
      },
      function (error) {
        navigate("/login");
      }
    );
  }, []);

  return (
    <div>
      <h1>This is todo</h1>
    </div>
  );
}

export default Todo;
