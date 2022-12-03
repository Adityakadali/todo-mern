import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../useStore";
import { Client, Account } from "appwrite";
import config from "../config";

function Nav() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.username);
  const clearuser = useUserStore((state) => state.logout);
  const client = new Client();

  const account = new Account(client);

  client
    .setEndpoint(config.endpoint) // Your API Endpoint
    .setProject(config.projectID); // Your project ID

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
      <nav className="container mx-auto max-w-5xl">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <NavLink to="/" className="btn btn-ghost normal-case text-xl">
              Task Master
            </NavLink>
          </div>
          <div className="navbar-end gap-4">
            {user ? (
              <>
                <div className="avatar placeholder">
                  <div className="bg-primary text-neutral-content rounded-full w-11">
                    <span className="text-md text-neutral font-bold">
                      {user.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>

                <button className="btn btn-secondary" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="signup" className="btn btn-primary">
                  Create Account
                </NavLink>
                <NavLink to="login" className="btn btn-accent">
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
