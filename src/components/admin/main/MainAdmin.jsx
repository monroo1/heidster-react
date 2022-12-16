import { useEffect, useState } from "react";
import { TextField, TextareaAutosize } from "@mui/material";
import {
  useFetchMainPageQuery,
  usePatchMainPageElementMutation,
} from "../../../services/mainPage.service";

const MainAdmin = ({ downloadImage }) => {
  const [headerData, setHeaderData] = useState([]);
  const [element, setElement] = useState({});
  const [defaultValue, setDefaultValue] = useState({ name: "", value: "" });

  const { data, isLoading } = useFetchMainPageQuery();
  const [patchData] = usePatchMainPageElementMutation();

  const handleOpenChange = (event) => {
    setElement(headerData[event.target.id]);
    if (
      headerData[event.target.id].type === "first_slider_element" ||
      headerData[event.target.id].type === "second_slider_element" ||
      headerData[event.target.id].type === "third_slider_element"
    ) {
      setDefaultValue({
        name: headerData[event.target.id].name,
        value: headerData[event.target.id].value,
      });
    } else if (headerData[event.target.id].type === "logo") {
      setDefaultValue({});
    } else {
      setDefaultValue({ value: headerData[event.target.id].value });
    }
  };

  const handleChangeValue = async (event) => {
    event.preventDefault();
    const res = await patchData({
      id: element.id,
      body: { value: defaultValue.value },
    });
    console.log(res);
  };

  const handleChangeCard = async (event) => {
    event.preventDefault();
    const res = await patchData({
      id: element.id,
      body: { name: defaultValue.name, value: defaultValue.value },
    });
    console.log(res);
  };

  const handleImage = async (event) => {
    const res = await downloadImage(event);
    const resPatch = await patchData({
      id: element.id,
      body: { file_id: res.data.id },
    });
    console.log(resPatch);
  };

  useEffect(() => {
    if (!isLoading) {
      let arr = data.slice();
      setHeaderData(arr.sort((a, b) => a.id - b.id));
    }
  }, [isLoading]);

  return (
    <div className="change-window">
      <div className="change-window__nav">
        {headerData.length > 0 &&
          headerData.map((el, i) => {
            if (
              el.type === "first_slider_element" ||
              el.type === "second_slider_element" ||
              el.type === "third_slider_element"
            ) {
              return (
                <div
                  key={i}
                  className="button-admin__nav"
                  id={i}
                  onClick={handleOpenChange}
                >
                  Карточка - {el.name}
                </div>
              );
            } else if (el.name === "logo") {
              return (
                <div
                  key={i}
                  className="button-admin__nav"
                  id={i}
                  onClick={handleOpenChange}
                >
                  Картинка
                </div>
              );
            } else {
              return (
                <div
                  key={i}
                  className="button-admin__nav"
                  id={i}
                  onClick={handleOpenChange}
                >
                  {el.value.slice(0, 20) + "..."}
                </div>
              );
            }
          })}
      </div>
      {(element.type === "first_slider_element" ||
        element.type === "second_slider_element" ||
        element.type === "third_slider_element") && (
        <form className="flex flex-col items-start gap-y-4">
          <label className="text-lg">Изменить текст:</label>
          <div className="min-w-[350px] flex flex-col gap-y-4">
            <TextField
              id="filled-basic"
              label="Заголовок"
              variant="filled"
              value={defaultValue.name}
              onChange={(e) => {
                setDefaultValue({ ...defaultValue, name: e.target.value });
              }}
            />
            <TextareaAutosize
              id="filled-basic"
              className="border-b-2"
              label="Текст"
              variant="filled"
              value={defaultValue.value}
              onChange={(e) =>
                setDefaultValue({ ...defaultValue, value: e.target.value })
              }
            />
          </div>
          <button
            className="bg-sky-400 no-underline py-3 px-5 text-slate-100 rounded-lg pointer-events-auto hover:bg-sky-600"
            onClick={handleChangeCard}
          >
            Сохранить
          </button>
        </form>
      )}
      {(element.type === "main_header" ||
        element.type === "description" ||
        element.type === "main_description" ||
        element.type === "button") &&
        !element.file && (
          <form className="flex flex-col items-start gap-y-4">
            <label className="text-lg">Изменить текст:</label>
            <div className="min-w-[350px] flex flex-col">
              <TextField
                id="filled-basic"
                label="Новое название"
                variant="filled"
                value={defaultValue.value}
                onChange={(e) => setDefaultValue({ value: e.target.value })}
              />
            </div>
            <button
              className="bg-sky-400 no-underline py-3 px-5 text-slate-100 rounded-lg pointer-events-auto hover:bg-sky-600"
              onClick={handleChangeValue}
            >
              Сохранить
            </button>
          </form>
        )}
      {element.name === "logo" && (
        <form
          onSubmit={handleImage}
          className="flex flex-col items-start gap-y-4"
        >
          <label className="text-lg">Изменить картинку:</label>
          <input type="file" />
          <button className="bg-sky-400 no-underline py-3 px-5 text-slate-100 rounded-lg pointer-events-auto hover:bg-sky-600">
            Сохранить
          </button>
        </form>
      )}
    </div>
  );
};

export default MainAdmin;
