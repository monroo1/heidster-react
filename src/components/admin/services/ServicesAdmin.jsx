import { useEffect } from "react";
import { useFetchMainPageQuery } from "../../../services/mainPage.service";

const ServicesAdmin = () => {
  const { data, isLoading } = useFetchMainPageQuery();

  useEffect(() => {
    !isLoading && console.log(data);
  }, [isLoading, data]);

  return <div>услуги</div>;
};

export default ServicesAdmin;
