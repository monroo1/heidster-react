import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/reducers/auth.slice";
import { Admin } from "../components/admin";

const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  useEffect(() => {
    !localStorage.getItem("token")
      ? navigate("/login")
      : dispatch(setUser(localStorage.getItem("token")));
  }, []);

  return isAuth && <Admin />;
};

export default AdminPage;
