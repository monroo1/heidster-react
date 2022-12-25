import { useEffect, useState } from "react";
import {
  useDeleteFeedbackMutation,
  useGetFeedbacksQuery,
} from "../../../services/feedback.service";
import "./applications.scss";
import ApplicationItem from "./ApplicationItem";

const Applications = () => {
  const [list, setList] = useState([]);
  const { data, isLoading } = useGetFeedbacksQuery();
  const [fetchRemove] = useDeleteFeedbackMutation();

  const handleRemove = async (id) => {
    const res = await fetchRemove(id);
    console.log(res);
    setList(list.filter((el) => el.id !== id));
  };

  useEffect(() => {
    !isLoading && setList(data);
  }, [isLoading]);

  return (
    <div className="applications">
      <h3>Список заявок:</h3>
      <div className="applications-list">
        {!isLoading &&
          list.map((el) => (
            <ApplicationItem
              key={el.id}
              props={el}
              handleRemove={handleRemove}
            />
          ))}
      </div>
    </div>
  );
};

export default Applications;
