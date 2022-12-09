import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  MainPage,
  ServicesPage,
  ProjectsPage,
  ContactsPage,
  AdminPage,
} from "./pages";
import { Login, Registration } from "./components/admin";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/Услуги",
    element: <ServicesPage />,
  },
  {
    path: "/Проекты",
    element: <ProjectsPage />,
  },
  {
    path: "/Контакты",
    element: <ContactsPage />,
  },
  { path: "/login", element: <Login /> },
  { path: "/reg", element: <Registration /> },
  { path: "/admin", element: <AdminPage /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
