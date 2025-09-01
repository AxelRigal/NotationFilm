import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
const activeProps = {
  style: {
    fontWeight: "bold",
  },
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
                <Link to="/" activeProps={activeProps}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/film" activeProps={activeProps}>
                  Films
                </Link>
              </li>
              <li>
                <Link to="/ajoutFilm" activeProps={activeProps}>
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
