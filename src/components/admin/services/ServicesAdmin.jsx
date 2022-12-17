import { useEffect, useState } from "react";
import { TextField, TextareaAutosize, Button } from "@mui/material";
import {
  useCreateServiscePageElementMutation,
  useDeleteServiscePageElementMutation,
  useFetchServicePageQuery,
  usePatchServicePageElementMutation,
} from "../../../services/servicePage.service";

const ServicesAdmin = ({ downloadImage }) => {
  const [dataPatch, setDataPatch] = useState([]);
  const [dataPrices, setDataPrices] = useState([]);
  const [defaultValue, setDefaultValue] = useState({
    name: "",
    value: "",
    price: 0,
  });
  const [element, setElement] = useState({});
  const [statusPrices, setStatusPrices] = useState(false);
  const [statusCreate, setStatusCreate] = useState(false);
  const [statusDelete, setStatusDelete] = useState(false);

  const { data, isLoading } = useFetchServicePageQuery();
  const [patchData] = usePatchServicePageElementMutation();
  const [deleteServiceElement] = useDeleteServiscePageElementMutation();
  const [createServiceElement] = useCreateServiscePageElementMutation();

  const handleOpenChange = (event) => {
    setDataPrices([]);
    setStatusPrices(false);
    setStatusCreate(false);
    setStatusDelete(false);
    setElement(dataPatch[event.target.id]);
    setDefaultValue({
      name: dataPatch[event.target.id].name,
      value: dataPatch[event.target.id].value,
      price: dataPatch[event.target.id].price,
    });
  };

  const hadleOpenPrices = (event) => {
    setElement({});
    setStatusPrices(true);
    if (event.target.id === "prices-1") {
      setDataPrices(
        data.filter((el) => el.component === "prices-1" && el.price !== 0)
      );
    } else if (event.target.id === "prices-2") {
      setDataPrices(
        data.filter((el) => el.component === "prices-2" && el.price !== 0)
      );
    } else if (event.target.id === "prices-3") {
      setDataPrices(
        data.filter((el) => el.component === "prices-3" && el.price !== 0)
      );
    } else if (event.target.id === "prices-4") {
      setDataPrices(
        data.filter((el) => el.component === "prices-4" && el.price !== 0)
      );
    }
  };

  const handleChangeValue = async (event) => {
    event.preventDefault();
    const res = await patchData({
      id: element.id,
      body: { value: defaultValue.value },
    });
    console.log(res);
    setElement({});
    setDefaultValue({
      name: "",
      value: "",
      price: 0,
    });
  };

  const handleChangeCard = async (event) => {
    event.preventDefault();
    if (event.target[0].files.length === 0) {
      const res = await patchData({
        id: element.id,
        body: { name: defaultValue.name, value: defaultValue.value },
      });
      console.log(res);
    } else {
      const resImage = await downloadImage(event);
      const res = await patchData({
        id: element.id,
        body: {
          name: defaultValue.name,
          value: defaultValue.value,
          file_id: resImage.data.id,
        },
      });
      console.log(res);
    }
    setElement({});
    setDefaultValue({
      name: "",
      value: "",
      price: 0,
    });
  };

  const deleteService = async (element) => {
    const res = await deleteServiceElement(element.id);
    console.log(res);
  };

  const createService = async () => {
    const res = await createServiceElement({
      name: defaultValue.name,
      value: defaultValue.value,
      type: "card",
      price: defaultValue.price,
      component: dataPrices[0].component,
      service_page_element_id: null,
      position: 1,
      file: null,
    });
    console.log(res);
  };

  useEffect(() => {
    if (!isLoading) {
      let arr = data.slice();
      setDataPatch(
        arr.sort((a, b) => a.id - b.id).filter((el) => el.price === 0)
      );
    }
  }, [isLoading]);

  return (
    <div className="change-window">
      <div className="change-window__nav">
        {dataPatch.length > 0 &&
          dataPatch.map((el, i) =>
            el.type === "card" ? (
              <div
                key={i}
                className="button-admin__nav"
                id={i}
                onClick={handleOpenChange}
              >
                Карточка - {el.name}
              </div>
            ) : (
              <div
                key={i}
                className="button-admin__nav"
                id={i}
                onClick={handleOpenChange}
              >
                {el.value.slice(0, 20) + "..."}
              </div>
            )
          )}
        <div
          className="button-admin__nav"
          id="prices-1"
          onClick={hadleOpenPrices}
        >
          Услуги по "Разработке сайтов"
        </div>
        <div
          className="button-admin__nav"
          id="prices-2"
          onClick={hadleOpenPrices}
        >
          Услуги по "Аудиту Редизайну сайтов"
        </div>
        <div
          id="prices-3"
          className="button-admin__nav"
          onClick={hadleOpenPrices}
        >
          Услуги по "Брендингу и ребрендингу"
        </div>
        <div
          id="prices-4"
          className="button-admin__nav"
          onClick={hadleOpenPrices}
        >
          Услуги по "Продвижению и рекламу"
        </div>
      </div>
      {element.type === "card" && (
        <form className="admin-content__patch" onSubmit={handleChangeCard}>
          <label className="text">Изменить содержимое блока:</label>
          <div className="button-admin__submit-dop">
            <label className="text-lg">Изменить картинку</label>
            <input type="file" />
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
          <button className="button-admin__submit">Сохранить</button>
        </form>
      )}
      {(element.type === "main_header" ||
        element.type === "main_description" ||
        element.type === "button") && (
        <form className="admin-content__patch">
          <label className="text">Изменить текст:</label>
          <div className="button-admin__submit-dop">
            <TextField
              id="filled-basic"
              label="Новое название"
              variant="filled"
              value={defaultValue.value}
              onChange={(e) => setDefaultValue({ value: e.target.value })}
            />
          </div>
          <button className="button-admin__submit" onClick={handleChangeValue}>
            Сохранить
          </button>
        </form>
      )}
      {statusPrices && (
        <>
          <div>
            <Button
              variant="contained"
              color="success"
              style={{ marginRight: 12 + "px" }}
              onClick={() => {
                setStatusCreate(true);
                setStatusDelete(false);
              }}
            >
              Добавить услугу
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setStatusDelete(true);
                setStatusCreate(false);
              }}
            >
              Удалить услугу
            </Button>
          </div>
          {statusDelete && (
            <div>
              <p className="text">Удалить</p>
              <div className="project-list-admin">
                {dataPrices.map((el, i) => (
                  <div key={i} className="admin-project__service">
                    <p className="text">{el.name}</p>
                    <p>{el.value}</p>
                    <span>{el.price}</span>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteService(el)}
                    >
                      Удалить
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {statusCreate && (
            <form className="admin-content__patch">
              <label className="text" style={{ marginTop: 24 + "px" }}>
                Создать услугу:
              </label>
              <div className="button-admin__submit-dop">
                <TextField
                  id="filled-basic"
                  label="Заголовок услгуи"
                  variant="filled"
                  value={defaultValue.name}
                  onChange={(e) => {
                    setDefaultValue({ ...defaultValue, name: e.target.value });
                  }}
                />
                <TextField
                  id="filled-basic"
                  label="Описание услуги"
                  variant="filled"
                  value={defaultValue.value}
                  onChange={(e) => {
                    setDefaultValue({ ...defaultValue, value: e.target.value });
                  }}
                />
                <TextField
                  id="filled-basic"
                  label="Цена услуги"
                  variant="filled"
                  type="number"
                  value={defaultValue.price}
                  onChange={(e) => {
                    setDefaultValue({ ...defaultValue, price: e.target.value });
                  }}
                />
              </div>
              <Button
                variant="contained"
                className="button-admin__submit"
                onClick={createService}
              >
                Сохранить
              </Button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default ServicesAdmin;
