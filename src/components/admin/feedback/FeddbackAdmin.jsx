import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import {
  useCreateFeddbackMutation,
  useFetchFeedbackPageQuery,
} from "../../../services/projectPages.service";

const FeedbackAdmin = ({ downloadImage }) => {
  const [createFeedbackStatus, setCreateFeedbackStatus] = useState(false);
  const [deleteFeedbackStatus, setDeleteFeedbackStatus] = useState(false);
  const [feedback, setFeedback] = useState({
    author_name: "",
    author_profession: "",
    value: "",
    id: null,
  });

  const { data, isLoading } = useFetchFeedbackPageQuery();
  const [createFeedback] = useCreateFeddbackMutation();

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
      id: null,
    });
  };

  useEffect(() => {
    !isLoading && console.log(data);
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
        <form
          className="flex flex-col items-start gap-y-4"
          onSubmit={handleCreateFeedback}
        >
          <label className="text-lg">Добавить отзыв:</label>
          <div className="min-w-[350px] flex flex-col gap-y-4">
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
          <button className="bg-sky-400 no-underline py-3 px-5 text-slate-100 rounded-lg pointer-events-auto hover:bg-sky-600">
            Сохранить
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackAdmin;
