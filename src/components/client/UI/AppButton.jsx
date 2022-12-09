import React from "react";

const AppButton = ({ value, style }) => {
  return (
    <div className={style ? "application application-true" : "application"}>
      <div className="application__btn">{value}</div>
    </div>
  );
};

export default AppButton;
