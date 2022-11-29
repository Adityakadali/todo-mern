import { NavLink } from "react-router-dom";
function Nav() {
  return (
    <header>
      <nav className="container mx-auto">
        <NavLink to="/">Home</NavLink>
        <NavLink to="about">about</NavLink>
      </nav>
    </header>
  );
}

export default Nav;
