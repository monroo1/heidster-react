import { useEffect } from "react";
import { useFetchProjectPageQuery } from "../../../services/projectPages.service";

const ProjectsAdmin = () => {
  const { data, isLoading } = useFetchProjectPageQuery();

  useEffect(() => {
    !isLoading && console.log(data);
  }, [isLoading, data]);

  return <div>ПРОЕКТЫ</div>;
};

export default ProjectsAdmin;
