import { Client, Account } from "appwrite";
import { useEffect } from "react";
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
      (response) => {
        user(response.name); // Success
      },
      (error) => {
        navigate("/login");
      }
    );
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <section>
        <div className="container max-w-5xl mx-auto">
          <div className="form-control float-right mt-4">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
              />
              <button className="btn btn-square">
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
      </section>
    </main>
  );
}

export default Todo;
