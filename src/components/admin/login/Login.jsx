import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../../../services/auth.service";
import { setLogout, setUser } from "../../../store/reducers/auth.slice";
import { TextField, Button } from "@mui/material";

import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  const [login] = useLoginMutation();

  const handleClickLogin = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      if (res === "Неверный логин или пароль") {
        return setError(true);
      }
      dispatch(setUser(res));
      navigate("/admin");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    !!localStorage.getItem("token")
      ? navigate("/admin")
      : dispatch(setLogout());
  }, []);

  return (
    !isAuth && (
      <div id="login">
        <div>
          <h3>Авторизация</h3>
          {error && <p>Неверный пароль или логин</p>}
          <div className="container">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />
            <TextField
              id="outlined-basic"
              label="Пароль"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
            />
            <div className="form-sign">
              <p>Зарегестрироваться: </p>
              <Link to="/reg">Sing Up</Link>
            </div>
          </div>
          <Button variant="contained" onClick={handleClickLogin}>
            Войти
          </Button>
        </div>
      </div>
    )
  );
};

export default Login;
