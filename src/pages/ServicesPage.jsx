import React from "react";
import {
  Header,
  Footer,
  Services,
  Work,
  Price,
  MobileNav,
} from "../components/client";
import { useFetchServicePageQuery } from "../services/servicePage.service";

const ServicesPage = () => {
  const { data, isLoading } = useFetchServicePageQuery();

  return (
    !isLoading && (
      <>
        <Header />
        <Services props={data.filter((el) => el.component === "services")} />
        <Price
          props={data.filter(
            (el) => el.component !== "services" && el.component !== "work"
          )}
        />
        <Work props={data.filter((el) => el.component === "work")} />
        <Footer />
        <MobileNav />
      </>
    )
  );
};

export default ServicesPage;
