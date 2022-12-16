import React from "react";

const AppButton = ({ value, style, margin }) => {
  return (
    <div
      className={style ? "application application-true" : "application"}
      style={margin && { padding: 16 + "px " + 0 }}
    >
      <div className="application__btn">{value}</div>
    </div>
  );
};

export default AppButton;
