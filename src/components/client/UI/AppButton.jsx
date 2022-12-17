import React, { useState } from "react";
import FormDialog from "./FormDialog";

const AppButton = ({ value, style, margin }) => {
  const [isShowDialod, setIsShowDialog] = useState(false);
  return (
    <div
      className={style ? "application application-true" : "application"}
      style={margin && { padding: 16 + "px " + 0 }}
      onClick={() => setIsShowDialog(true)}
    >
      <div className="application__btn">{value}</div>
      {isShowDialod && <FormDialog handleShow={setIsShowDialog} />}
    </div>
  );
};

export default AppButton;
