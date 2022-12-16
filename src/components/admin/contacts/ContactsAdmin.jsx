import { useEffect } from "react";
import { useFetchContactsPageQuery } from "../../../services/contactsPage.service";

const ContactsAdmin = () => {
  const { data, isLoading } = useFetchContactsPageQuery();

  useEffect(() => {
    !isLoading && console.log(data);
  }, [isLoading, data]);

  return <div>Контакты</div>;
};

export default ContactsAdmin;
