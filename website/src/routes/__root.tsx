import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import "../App.css";

const activeProps = {
  className: "navbar-link-active",
};

const linkProps = {
  className: "navbar-link",
};

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="header-fixed">
        <div>
          <h1>Site de notation de films</h1>
          <nav className="navbar">
            <ul className="navbar-list">
              <li>
                <Link to="/" {...linkProps} activeProps={activeProps}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/film" {...linkProps} activeProps={activeProps}>
                  Films
                </Link>
              </li>
              <li>
                <Link to="/ajoutFilm" {...linkProps} activeProps={activeProps}>
                  Ajouter un film
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="main-content">
        <Outlet />
      </div>
    </>
  ),
});
