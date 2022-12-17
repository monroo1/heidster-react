import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import {
  useCreateProjectMutation,
  useCreateProjectPageElementMutation,
  useDeleteProjectMutation,
  useDeleteProjectPageElementMutation,
  useFetchProjectPageQuery,
  usePatchProjectPageMutation,
} from "../../../services/projectPages.service";

const ProjectsAdmin = ({ downloadImage }) => {
  const [projectData, setProjectData] = useState([]);
  const [defaultValue, setDefaultValue] = useState("");
  const [projectsList, setProjectsList] = useState([]);
  const [element, setElement] = useState({});
  const [statusProject, setStatusProject] = useState(false);
  const [statusCreate, setStatusCreate] = useState(false);
  const [statusDelete, setStatusDelete] = useState(false);

  const { data, isLoading } = useFetchProjectPageQuery();
  const [patchData] = usePatchProjectPageMutation();
  const [deleteProjectFetch] = useDeleteProjectMutation();
  const [deleteProjectElementFetch] = useDeleteProjectPageElementMutation();
  const [addProject] = useCreateProjectMutation();
  const [addProjectElement] = useCreateProjectPageElementMutation();

  const handleOpenChange = (event) => {
    setProjectsList([]);
    setStatusProject(false);
    setStatusCreate(false);
    setStatusDelete(false);
    setElement(projectData[event.target.id]);
    setDefaultValue(projectData[event.target.id].value);
    console.log(projectData[event.target.id]);
  };

  const hadleOpenProjects = (event) => {
    setElement({});
    setStatusProject(true);
    if (event.target.id === "project-1") {
      setProjectsList(
        data.filter((el) => el.component === "project-1" && !!el.project)
      );
    } else if (event.target.id === "project-2") {
      setProjectsList(
        data.filter((el) => el.component === "project-2" && !!el.project)
      );
    } else if (event.target.id === "project-3") {
      setProjectsList(
        data.filter((el) => el.component === "project-3" && !!el.project)
      );
    }
  };

  const handleChangeValue = async (event) => {
    event.preventDefault();
    const res = await patchData({
      id: element.id,
      body: { value: defaultValue },
    });
    console.log(res);
  };

  const deleteProject = async (element) => {
    const resDelProjEl = await deleteProjectElementFetch(element.id);
    console.log(resDelProjEl);
    const resDelProj = await deleteProjectFetch(element.project.id);
    console.log(resDelProj);
    setProjectsList(projectsList.filter((el) => el.id !== element.id));
  };

  const handleImage = async (event) => {
    const res = await downloadImage(event);
    const resAddProject = await addProject({
      name: "string",
      description: "string",
      file_id: res.data.id,
    });
    const resAddProjectElement = await addProjectElement({
      name: "project",
      value: "project",
      type: "description",
      component: projectsList[0].component,
      position: 1,
      project_id: resAddProject.data.id,
      file: null,
    });
    console.log(resAddProjectElement);
  };

  useEffect(() => {
    if (!isLoading) {
      let arr = data.slice();
      setProjectData(
        arr.sort((a, b) => a.id - b.id).filter((el) => !el.project)
      );
      console.log(arr.sort((a, b) => a.id - b.id).filter((el) => !el.project));
    }
  }, [isLoading]);

  return (
    <div className="change-window">
      <div className="change-window__nav">
        {projectData.length > 0 &&
          projectData.map((el, i) => (
            <div
              key={i}
              className="button-admin__nav"
              id={i}
              onClick={handleOpenChange}
            >
              {el.value.slice(0, 20) + "..."}
            </div>
          ))}
        <div
          className="button-admin__nav"
          id="project-1"
          onClick={hadleOpenProjects}
        >
          Проекты по "Разработке сайтов"
        </div>
        <div
          className="button-admin__nav"
          id="project-2"
          onClick={hadleOpenProjects}
        >
          Проекты по "Редизайну сайтов"
        </div>
        <div
          id="project-3"
          className="button-admin__nav"
          onClick={hadleOpenProjects}
        >
          Проекты по "Брендингу"
        </div>
      </div>
      {(element.type === "main_description" ||
        element.type === "main_header" ||
        element.type === "description") && (
        <form className="admin-content__patch">
          <label className="text-lg">Изменить текст:</label>
          <div className="button-admin__submit-dop">
            <TextField
              id="filled-basic"
              label="Новое название"
              variant="filled"
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
            />
          </div>
          <button className="button-admin__submit" onClick={handleChangeValue}>
            Сохранить
          </button>
        </form>
      )}
      {statusProject && (
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
              Добавить проект
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setStatusDelete(true);
                setStatusCreate(false);
              }}
            >
              Удалить проект
            </Button>
          </div>
          {statusDelete && (
            <div>
              <p className="text">Удалить</p>
              <div className="project-list-admin">
                {projectsList.map((el, i) => (
                  <div key={i} className="admin-project__img">
                    <img src={"http://80.78.246.20/" + el.project.file.path} />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteProject(el)}
                    >
                      Удалить
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {statusCreate && (
            <div>
              <p className="text">Создать</p>
              <form onSubmit={handleImage} className="admin-content__patch">
                <label className="text-lg">Изменить логотип:</label>
                <input type="file" />
                <button className="button-admin__submit">Сохранить</button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsAdmin;
