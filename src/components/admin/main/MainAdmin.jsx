import { useEffect } from "react";
import { useFetchMainPageQuery } from "../../../services/mainPage.service";

const MainAdmin = () => {
  const { data, isLoading } = useFetchMainPageQuery();

  useEffect(() => {
    !isLoading && console.log(data);
  }, [isLoading, data]);

  return <div>Главная</div>;
};

export default MainAdmin;
