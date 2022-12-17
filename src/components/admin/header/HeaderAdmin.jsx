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

  const handleChangeButton = async (event) => {
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
        <form onSubmit={handleImage} className="admin-content__patch">
          <label className="text">Изменить логотип:</label>
          <input type="file" />
          <button className="button-admin__submit">Сохранить</button>
        </form>
      )}
      {!!element.menu_id && (
        <form className="admin-content__patch">
          <label className="text">Изменить текст:</label>
          <div className="button-admin__submit-dop">
            <TextField
              id="filled-basic"
              label="Новое название"
              variant="filled"
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
            />
          </div>
          <button
            className="button-admin__submit"
            onClick={handleChageMenuItem}
          >
            Сохранить
          </button>
        </form>
      )}
      {element.type === "button" && (
        <form className="admin-content__patch">
          <label className="text">Изменить текст:</label>
          <div className="button-admin__submit-dop">
            <TextField
              id="filled-basic"
              label="Новое название"
              variant="filled"
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
            />
          </div>
          <button className="button-admin__submit" onClick={handleChangeButton}>
            Сохранить
          </button>
        </form>
      )}
    </div>
  );
};

export default HeaderAdmin;
