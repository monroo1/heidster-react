import React, { useEffect, useState } from "react";
import {
  Header,
  Footer,
  Project,
  Feedback,
  MobileNav,
} from "../components/client";
import { useFetchProjectPageQuery } from "../services/projectPages.service";

const ProjectsPage = () => {
  const { data, isLoading } = useFetchProjectPageQuery();
  const [arrProjects, setArrProjects] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      let arr = [];
      arr.push(data.filter((element) => element.component === "project-1"));
      arr.push(data.filter((element) => element.component === "project-2"));
      arr.push(data.filter((element) => element.component === "project-3"));
      setArrProjects(arr);
    }
  }, [data]);

  return (
    !isLoading && (
      <>
        <Header />
        {arrProjects.map((element, i) => {
          return <Project props={element} key={i} />;
        })}
        <Feedback />
        <Footer />
        <MobileNav />
      </>
    )
  );
};

export default ProjectsPage;
