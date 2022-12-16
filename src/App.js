import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  MainPage,
  ServicesPage,
  ProjectsPage,
  ContactsPage,
  AdminPage,
} from "./pages";
import {
  Login,
  Registration,
  HeaderAdmin,
  FooterAdmin,
  MainAdmin,
  ServicesAdmin,
  ProjectsAdmin,
  FeedbackAdmin,
  ContactsAdmin,
} from "./components/admin";

import "./App.css";
import { useCheckAuthMutation } from "./services/auth.service";
import { useDispatch } from "react-redux";
import { setLogout, setUser } from "./store/reducers/auth.slice";

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
  {
    path: "/admin/*",
    element: <AdminPage />,
    children: [
      {
        path: "header",
        element: <HeaderAdmin />,
      },
      {
        path: "footer",
        element: <FooterAdmin />,
      },
      {
        path: "main",
        element: <MainAdmin />,
      },
      {
        path: "services",
        element: <ServicesAdmin />,
      },
      {
        path: "projects",
        element: <ProjectsAdmin />,
      },
      {
        path: "feedback",
        element: <FeedbackAdmin />,
      },
      {
        path: "contacts",
        element: <ContactsAdmin />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const [auth] = useCheckAuthMutation();

  const checkAuth = async () => {
    try {
      const res = await auth().unwrap();
      res.length > 0
        ? dispatch(setUser(localStorage.getItem("token")))
        : dispatch(setLogout());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    !!localStorage.getItem("token") && checkAuth();
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
