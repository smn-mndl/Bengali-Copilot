import React from "react";
import "./PageToast.scss";

const PageToast = (props) => {
  const { toastType, toastMsg } = props;
  const getToastIcon = () => {
    let iconHTML = null;
    if (toastType === "error") {
      iconHTML = <span className="icon-cancel"></span>;
    } else if (toastType === "success") {
      iconHTML = <span className="icon-check_circle_outline"></span>;
    } else if (toastType === "warning") {
      iconHTML = <span className="icon-error_outline"></span>;
    }
    return iconHTML;
  };

  return (
    <>
      {/* <div className="toast-cntnr">
        <div className="toast-content">
          {getToastIcon()}
          {toastMsg}
        </div>
      </div> */}
      <div class="ant-message">
        <div>
          <div class="ant-message-notice">
            <div class="ant-message-notice-content">
              <div class="ant-message-custom-content ant-message-success">
                <span>
                  {getToastIcon()}
                  {toastMsg}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageToast;
