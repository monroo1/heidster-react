import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useCreateReviewMutation,
  useDeleteFeedbackMutation,
  useFetchFeedbackPageQuery,
} from "../../../services/projectPages.service";

const FeedbackAdmin = ({ downloadImage }) => {
  const [feedbackContent, setFeedbackContent] = useState([]);
  const [createFeedbackStatus, setCreateFeedbackStatus] = useState(false);
  const [deleteFeedbackStatus, setDeleteFeedbackStatus] = useState(false);
  const [feedback, setFeedback] = useState({
    author_name: "",
    author_profession: "",
    value: "",
  });

  const { data, isLoading } = useFetchFeedbackPageQuery();
  const [createFeedback] = useCreateReviewMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const handleCreateFeedback = async (event) => {
    event.preventDefault();
    const res = await downloadImage(event);
    const resq = await createFeedback({
      ...feedback,
      author_image: res.data.id,
    });
    console.log(resq);
    setFeedback({
      author_name: "",
      author_profession: "",
      value: "",
    });
  };

  const handlerDeleteFeedback = async (el) => {
    const res = await deleteFeedback(el.id);
    setFeedbackContent(
      feedbackContent.filter((element) => element.id !== el.id)
    );
    console.log(res);
  };

  useEffect(() => {
    !isLoading && setFeedbackContent(data);
  }, [isLoading, data]);

  return (
    <div className="change-window">
      <div className="change-window__nav">
        <div
          className="button-admin__nav"
          onClick={() => {
            setDeleteFeedbackStatus(false);
            setCreateFeedbackStatus(true);
          }}
        >
          Добавить отзыв
        </div>

        <div
          className="button-admin__nav"
          onClick={() => {
            setCreateFeedbackStatus(false);
            setDeleteFeedbackStatus(true);
          }}
        >
          Удалить отзыв
        </div>
      </div>
      {createFeedbackStatus && (
        <form className="admin-content__patch" onSubmit={handleCreateFeedback}>
          <label className="text">Добавить отзыв:</label>
          <div className="button-admin__submit-dop">
            <label className="text-lg">Картинка пользователя</label>
            <input type="file" />
            <TextField
              id="filled-basic"
              label="Имя автора"
              variant="filled"
              value={feedback.author_name}
              onChange={(e) =>
                setFeedback({ ...feedback, author_name: e.target.value })
              }
            />
            <TextField
              id="filled-basic"
              label="Место работы"
              variant="filled"
              value={feedback.author_profession}
              onChange={(e) =>
                setFeedback({ ...feedback, author_profession: e.target.value })
              }
            />
            <TextField
              id="filled-basic"
              label="Текст отзыва"
              variant="filled"
              value={feedback.value}
              onChange={(e) =>
                setFeedback({ ...feedback, value: e.target.value })
              }
            />
          </div>
          <button className="button-admin__submit">Сохранить</button>
        </form>
      )}
      {deleteFeedbackStatus && (
        <div>
          <p className="text">Удалить отзывы:</p>
          {feedbackContent.map((el) => (
            <div key={el.id} className="feddback-item">
              <div className="feddback-item__first">
                <p>{el.author_name}</p>
                <p>{el.author_profession}</p>
              </div>
              <div className="feddback-item__second">{el.value}</div>
              <Button
                variant="outlined"
                onClick={() => handlerDeleteFeedback(el)}
                startIcon={<DeleteIcon />}
                className="feddback-item__button"
              >
                Удалить
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackAdmin;
