import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { setLogout } from "../../../store/reducers/auth.slice";
import { useDownloadFileMutation } from "../../../services/file.service";
import {
  HeaderAdmin,
  FooterAdmin,
  MainAdmin,
  ServicesAdmin,
  ProjectsAdmin,
  FeedbackAdmin,
  ContactsAdmin,
} from "../index";
import { Button, ListItemButton, ListItemText } from "@mui/material";

import "./admin.scss";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [downloadFile] = useDownloadFileMutation();

  const OnSumbitFile = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", event.target.elements[0].files[0]);
    const res = await downloadFile(formData);
    event.target.elements[0].value = "";
    return res;
  };

  const nadleClickLogout = () => {
    dispatch(setLogout());
    return navigate("/");
  };

  return (
    <div className="admin">
      <div className="admin-header">
        <h2>Admin panel</h2>
        <Button variant="outlined" onClick={nadleClickLogout}>
          Выйти
        </Button>
      </div>
      <div className="admin-main">
        <div className="admin-main__nav">
          <ul>
            <Link to="header">
              <ListItemButton>
                <ListItemText>Хедер</ListItemText>
              </ListItemButton>
            </Link>
            <Link to="footer">
              <ListItemButton>
                <ListItemText>Футер</ListItemText>
              </ListItemButton>
            </Link>
            <Link to="main">
              <ListItemButton>
                <ListItemText>Главная страница</ListItemText>
              </ListItemButton>
            </Link>
            <Link to="services">
              <ListItemButton>
                <ListItemText>Страница услуг</ListItemText>
              </ListItemButton>
            </Link>
            <Link to="projects">
              <ListItemButton>
                <ListItemText>Проекты</ListItemText>
              </ListItemButton>
            </Link>
            <Link to="feedback">
              <ListItemButton>
                <ListItemText>Отзывы</ListItemText>
              </ListItemButton>
            </Link>
            <Link to="contacts">
              <ListItemButton>
                <ListItemText>Страница контактов</ListItemText>
              </ListItemButton>
            </Link>
          </ul>
        </div>
        <div className="admin-main__content">
          <Routes>
            <Route
              path="header"
              element={<HeaderAdmin downloadImage={OnSumbitFile} />}
            />
            <Route path="footer" element={<FooterAdmin />} />
            <Route
              path="main"
              element={<MainAdmin downloadImage={OnSumbitFile} />}
            />
            <Route path="services" element={<ServicesAdmin />} />
            <Route
              path="projects"
              element={<ProjectsAdmin downloadImage={OnSumbitFile} />}
            />
            <Route
              path="feedback"
              element={<FeedbackAdmin downloadImage={OnSumbitFile} />}
            />
            <Route path="contacts" element={<ContactsAdmin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
