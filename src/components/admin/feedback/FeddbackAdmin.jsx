import { useEffect } from "react";
import { useFetchFeedbackPageQuery } from "../../../services/projectPages.service";

const FeedbackAdmin = () => {
  const { data, isLoading } = useFetchFeedbackPageQuery();

  useEffect(() => {
    !isLoading && console.log(data);
  }, [isLoading, data]);

  return <div>Отзывы</div>;
};

export default FeedbackAdmin;
