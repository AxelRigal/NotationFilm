import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./App.css";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
  defaultNotFoundComponent: () => <div>Global Not Found :(</div>,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;