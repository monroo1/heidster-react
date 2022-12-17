import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import {
  useFetchContactsPageQuery,
  usePatchContactsPageMutation,
} from "../../../services/contactsPage.service";

const ContactsAdmin = () => {
  const [defaultValue, setDefaultValue] = useState("");
  const [element, setElement] = useState({});

  const { data, isLoading } = useFetchContactsPageQuery();
  const [patchData] = usePatchContactsPageMutation();

  const handleOpenChange = (event) => {
    setElement(data[event.target.id]);
    setDefaultValue(data[event.target.id].value);
  };

  const handleChangeValue = async (event) => {
    event.preventDefault();
    const res = await patchData({
      id: element.id,
      body: { value: defaultValue },
    });
    console.log(res);
  };

  return (
    !isLoading && (
      <div className="change-window">
        <div className="change-window__nav">
          {data.length > 0 &&
            data.map((el, i) => (
              <div
                key={i}
                className="button-admin__nav"
                id={i}
                onClick={handleOpenChange}
              >
                {el.value.slice(0, 20)}
              </div>
            ))}
        </div>
        {(element.type === "main_header" ||
          element.type === "main_description" ||
          element.type === "address") && (
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
              onClick={handleChangeValue}
            >
              Сохранить
            </button>
          </form>
        )}
      </div>
    )
  );
};

export default ContactsAdmin;
