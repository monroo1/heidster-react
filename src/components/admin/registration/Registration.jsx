import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  useRegistrationMutation,
  useLoginMutation,
} from "../../../services/auth.service";
import { setUser, setLogout } from "../../../store/reducers/auth.slice";
import { TextField, Button } from "@mui/material";

import "./registration.scss";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retryPassword, setRetryPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [disabled, setDisabled] = useState(true);
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  const [registration] = useRegistrationMutation();
  const [login] = useLoginMutation();

  useEffect(() => {
    if (name && email && password && secretKey && password === retryPassword) {
      setDisabled(false);
    }
  }, [name, email, password, retryPassword, secretKey]);

  const handleClickRegistration = async () => {
    try {
      const resReg = await registration({
        content: { name, email, password },
        secret: secretKey,
      }).unwrap();
      if (resReg === "ok") {
        const resLogin = await login({ email, password }).unwrap();
        dispatch(setUser({ resLogin }));
      }
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
      <div id="registration">
        <div>
          <h3>Регистрация</h3>
          <div className="container">
            <TextField
              id="outlined-basic"
              label="Имя"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Пароль"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Подтверждение пароля"
              variant="outlined"
              value={retryPassword}
              onChange={(e) => setRetryPassword(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Секретный ключ"
              variant="outlined"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            <div className="form-sign">
              <p>Войти: </p>
              <Link to="/login">Sing In</Link>
            </div>
          </div>
          <Button
            variant="contained"
            disabled={disabled}
            onClick={handleClickRegistration}
          >
            Зарегистрироваться
          </Button>
        </div>
      </div>
    )
  );
};

export default Registration;
