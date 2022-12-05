import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../useStore";
import { Client, Account } from "appwrite";
import config from "../config";
import { useEffect } from "react";

function Nav() {
  const navigate = useNavigate();
  const userstate = useUserStore((state) => state.setuser);
  const user = useUserStore((state) => state.username);
  const clearuser = useUserStore((state) => state.logout);

  const client = new Client();
  const account = new Account(client);
  client.setEndpoint(config.endpoint).setProject(config.projectID);

  useEffect(() => {
    const promise = account.get();

    promise.then(
      function (response) {
        userstate(response.name, response.$id);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    const promise = account.deleteSessions();
    promise.then(
      function (response) {
        clearuser();
        navigate("/login");
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  return (
    <header>
      <nav className="container mx-auto max-w-5xl py-2">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <NavLink
              to="/"
              className="text-2xl normal-case text-neutral-content tracking-wider font-mono font-bold"
            >
              TASK MASTER
            </NavLink>
          </div>
          <div className="navbar-end gap-4">
            {user ? (
              <>
                <div className="placeholder avatar">
                  <div className="w-10 rounded-full bg-neutral-content text-neutral-content ring ring-primary ring-offset-2 ring-offset-base-100">
                    <span className="text-md font-bold text-neutral">
                      {user.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>
                <NavLink to="todos" className="btn-primary btn">
                  My Todos
                </NavLink>

                <button className="btn-secondary btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="signup" className="btn-primary btn">
                  Create Account
                </NavLink>
                <NavLink to="login" className="btn-accent btn">
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
