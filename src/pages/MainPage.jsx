import {
  Header,
  Footer,
  Introduction,
  Benefits,
  Arguments,
  MobileNav,
} from "../components/client";
import { useFetchMainPageQuery } from "../services/mainPage.service";

const MainPage = () => {
  const { data, isLoading } = useFetchMainPageQuery();

  return (
    !isLoading && (
      <>
        <Header />
        <Introduction
          props={data.filter((element) => element.component === "introduction")}
        />
        <Benefits
          props={data.filter((element) => element.component === "benefits")}
        />
        <Arguments
          props={data.filter((element) => element.component === "arguments")}
        />
        <Footer />
        <MobileNav />
      </>
    )
  );
};

export default MainPage;
