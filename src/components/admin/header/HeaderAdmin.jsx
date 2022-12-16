import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import {
  useFetchHeaderQuery,
  usePatchHeaderMutation,
  usePatchMenuItemMutation,
} from "../../../services/header.service";

const HeaderAdmin = ({ downloadImage }) => {
  const [defaultValue, setDefaultValue] = useState("");
  const [element, setElement] = useState("");
  const [headerData, setHeaderData] = useState([]);

  const { data, isLoading } = useFetchHeaderQuery();
  const [patchData] = usePatchHeaderMutation();
  const [patchMenuItem] = usePatchMenuItemMutation();

  const handleOpenChange = (event) => {
    setElement(headerData[event.target.id]);
    !!headerData[event.target.id].menu_id &&
      setDefaultValue(headerData[event.target.id].name);
    headerData[event.target.id].type === "button" &&
      setDefaultValue(headerData[event.target.id].value);
  };

  const handleImage = async (event) => {
    const res = await downloadImage(event);
    const resPatch = await patchData({
      id: element.id,
      body: { file_id: res.data.id },
    });
    console.log(resPatch);
  };

  const handleChageMenuItem = async (event) => {
    event.preventDefault();
    const res = await patchMenuItem({ id: element.id, name: defaultValue });
    console.log(res);
  };

  const handleChageButton = async (event) => {
    event.preventDefault();
    const res = await patchData({
      id: element.id,
      body: { value: defaultValue },
    });
    console.log(res);
  };

  useEffect(() => {
    !isLoading &&
      data.map((element) =>
        element.type === "menu"
          ? element.menu.elements.map((el) =>
              setHeaderData((prev) => [...prev, el])
            )
          : setHeaderData((prev) => [...prev, element])
      );
  }, [isLoading]);

  return (
    <div className="change-window">
      <div className="change-window__nav">
        {headerData.length > 0 &&
          headerData.map((el, i) => {
            if (el.type === "logo") {
              return (
                <div
                  key={i}
                  className="button-admin__nav"
                  id={i}
                  onClick={handleOpenChange}
                >
                  Логотип
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
                  {el.name}
                </div>
              );
            }
          })}
      </div>
      {element.type === "logo" && (
        <form
          onSubmit={handleImage}
          className="flex flex-col items-start gap-y-4"
        >
          <label className="text-lg">Изменить логотип:</label>
          <input type="file" />
          <button className="bg-sky-400 no-underline py-3 px-5 text-slate-100 rounded-lg pointer-events-auto hover:bg-sky-600">
            Сохранить
          </button>
        </form>
      )}
      {!!element.menu_id && (
        <form className="flex flex-col items-start gap-y-4">
          <label className="text-lg">Изменить текст:</label>
          <div className="min-w-[350px] flex flex-col">
            <TextField
              id="filled-basic"
              label="Новое название"
              variant="filled"
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
            />
          </div>
          <button
            className="bg-sky-400 no-underline py-3 px-5 text-slate-100 rounded-lg pointer-events-auto hover:bg-sky-600"
            onClick={handleChageMenuItem}
          >
            Сохранить
          </button>
        </form>
      )}
      {element.type === "button" && (
        <form className="flex flex-col items-start gap-y-4">
          <label className="text-lg">Изменить текст:</label>
          <div className="min-w-[350px] flex flex-col">
            <TextField
              id="filled-basic"
              label="Новое название"
              variant="filled"
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
            />
          </div>
          <button
            className="bg-sky-400 no-underline py-3 px-5 text-slate-100 rounded-lg pointer-events-auto hover:bg-sky-600"
            onClick={handleChageButton}
          >
            Сохранить
          </button>
        </form>
      )}
    </div>
  );
};

export default HeaderAdmin;
