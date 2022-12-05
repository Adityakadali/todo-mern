import { useState, useEffect } from "react";
import { Client, Account, ID } from "appwrite";
import config from "../config";
import { useNavigate } from "react-router-dom";

function Signup() {
  const client = new Client();
  const account = new Account(client);
  client.setEndpoint(config.endpoint).setProject(config.projectID);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const promise = account.get();
    promise.then(
      function (response) {
        navigate("/todos");
      },
      function (error) {}
    );
    // eslint-disable-next-line
  }, []);

  const Signup = (e) => {
    e.preventDefault();
    const client = new Client()
      .setEndpoint(config.endpoint)
      .setProject(config.projectID);

    const account = new Account(client);

    const promise = account.create(ID.unique(), email, password, username);
    promise.then(
      async function (response) {
        await account.createEmailSession(email, password);
        navigate("/todos");
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
            <span className="label-text text-lg">Username</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setUsername(e.target.value)}
          />

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
            placeholder="Strong Password"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary mt-4" onClick={Signup}>
            Create Account
          </button>
        </div>
      </form>
    </section>
  );
}

export default Signup;
