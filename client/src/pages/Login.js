import { useState } from "react";
import { Client, Account } from "appwrite";
import config from "../config";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const client = new Client();
  const account = new Account(client);

  client.setEndpoint(config.endpoint).setProject(config.projectID);

  const handleClick = (e) => {
    e.preventDefault();
    const promise = account.createEmailSession(email, password);
    promise.then(
      function (response) {
        navigate("/todo");
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  return (
    <section className="mt-20">
      <form action="">
        <div className="form-control w-full max-w-xs mx-auto">
          <label className="label">
            <span className="label-text text-lg">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">
            <span className="label-text text-lg">Password</span>
          </label>
          <input
            type="Password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary mt-4" onClick={handleClick}>
            Login
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
