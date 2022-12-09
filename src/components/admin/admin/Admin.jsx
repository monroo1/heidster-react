import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../../store/reducers/auth.slice";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nadleClickLogout = () => {
    dispatch(setLogout());
    return navigate("/");
  };

  return (
    <div>
      <h1>admin</h1>
      <Button variant="outlined" onClick={nadleClickLogout}>
        Выйти
      </Button>
    </div>
  );
};

export default Admin;
