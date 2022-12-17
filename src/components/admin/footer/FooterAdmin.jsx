import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import {
  useFetchFooterQuery,
  usePatchFooterElementMutation,
} from "../../../services/footer.service";
import { usePatchMenuItemMutation } from "../../../services/header.service";

const FooterAdmin = ({ downloadImage }) => {
  const [footerData, setFooterData] = useState([]);
  const [element, setElement] = useState({});
  const [defaultValue, setDefaultValue] = useState("");

  const { data, isLoading } = useFetchFooterQuery();
  const [patchFooterElement] = usePatchFooterElementMutation();
  const [patchMenuItem] = usePatchMenuItemMutation();

  const handleOpenChange = (event) => {
    setElement(footerData[event.target.id]);
    setDefaultValue(footerData[event.target.id].value);
    !!footerData[event.target.id].menu_id &&
      setDefaultValue(footerData[event.target.id].name);
  };

  const handleImage = async (event) => {
    const res = await downloadImage(event);
    const resPatch = await patchFooterElement({
      id: element.id,
      body: { file_id: res.data.id },
    });
    console.log(resPatch);
  };

  const handleSocailLink = async (event) => {
    event.preventDefault();
    if (event.target[0].files.length === 0) {
      const resPatch = await patchFooterElement({
        id: element.id,
        body: { value: defaultValue },
      });
      console.log(resPatch);
    } else {
      const resImage = await downloadImage(event);
      const resPatch = await patchFooterElement({
        id: element.id,
        body: { file_id: resImage.data.id, value: defaultValue },
      });
      console.log(resPatch);
    }
    setDefaultValue("");
  };

  const handleChangeFootnote = async (event) => {
    event.preventDefault();
    const res = await patchFooterElement({
      id: element.id,
      body: { value: defaultValue },
    });
    console.log(res);
    setDefaultValue("");
  };

  const handleChangeMenuItem = async (event) => {
    event.preventDefault();
    const res = await patchMenuItem({ id: element.id, name: defaultValue });
    console.log(res);
    setDefaultValue("");
  };

  useEffect(() => {
    !isLoading &&
      data.map((element) =>
        element.type === "menu"
          ? element.menu.elements.map((el) =>
              setFooterData((prev) => [...prev, el])
            )
          : setFooterData((prev) => [...prev, element])
      );
  }, [isLoading]);

  return (
    <div className="change-window">
      <div className="change-window__nav">
        {footerData.length > 0 &&
          footerData.map((el, i) => {
            if (el.name === "logo") {
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
            } else if (el.name === "social-link") {
              return (
                <div
                  key={i}
                  className="button-admin__nav"
                  id={i}
                  onClick={handleOpenChange}
                >
                  {el.file.original_name}
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
      {element.name === "logo" && (
        <form className="admin-content__patch" onSubmit={handleImage}>
          <label className="text">Изменить логотип:</label>
          <input type="file" />
          <button className="button-admin__submit">Сохранить</button>
        </form>
      )}
      {element.name === "social-link" && (
        <form className="admin-content__patch" onSubmit={handleSocailLink}>
          <label className="text">Изменить логотип:</label>
          <input type="file" />
          <TextField
            id="filled-basic"
            label="Новое название"
            variant="filled"
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
          />
          <button className="button-admin__submit">Сохранить</button>
        </form>
      )}
      {element.name === "footnote" && (
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
            onClick={handleChangeFootnote}
          >
            Сохранить
          </button>
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
            onClick={handleChangeMenuItem}
          >
            Сохранить
          </button>
        </form>
      )}
    </div>
  );
};

export default FooterAdmin;
