import { useState } from "react";
import "./applications.scss";
import { TextareaAutosize, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUpdateFeedbackMutation } from "../../../services/feedback.service";

const ApplicationItem = ({ props, handleRemove }) => {
  const id = props.id;
  const [isPatch, setIsPatch] = useState(false);
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const [text, setText] = useState(props.text);

  const [patchData] = useUpdateFeedbackMutation();

  const updateHandler = async () => {
    const res = await patchData({ id, body: { name, email, phone, text } });
    console.log(res);
    setIsPatch(false);
  };

  const handleBack = () => {
    setName(props.name);
    setEmail(props.email);
    setPhone(props.phone);
    setText(props.text);
    setIsPatch(false);
  };

  return (
    <div className="applications-list__item">
      <div>
        <input
          disabled={!isPatch}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          disabled={!isPatch}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          disabled={!isPatch}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextareaAutosize
          disabled={!isPatch}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></TextareaAutosize>
      </div>
      <div>
        {!isPatch ? (
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                setIsPatch(true);
              }}
            >
              Изменить
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleRemove(props.id)}
            >
              Удалить
            </Button>
          </div>
        ) : (
          <div>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                updateHandler();
              }}
            >
              Сохранить
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                handleBack();
              }}
            >
              Отменить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationItem;
