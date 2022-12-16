import { useEffect } from "react";
import { useFetchFooterQuery } from "../../../services/footer.service";

const FooterAdmin = () => {
  const { data, isLoading } = useFetchFooterQuery();

  useEffect(() => {
    !isLoading && console.log(data);
  }, [isLoading, data]);

  return <div>Footer</div>;
};

export default FooterAdmin;
