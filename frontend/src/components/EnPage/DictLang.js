import "../style/base.css";
import "../style/main.css";
import "../style/responsive.css";
// import "../style/dictlang.css";

import React from "react";

function DictLang(props) {
  return (
    <div className="header__dictlang">
      <div className="header__dictlang-item">
        {props.language === "en" ? (
          props.fromEng ? (
            <h6
              className="header__dictlang-item-title"
              id="header__dictlang-en"
            >
              {props.getTranslation("en", props.language)}
            </h6>
          ) : (
            <h6
              className="header__dictlang-item-title"
              id="header__dictlang-vn"
            >
              {props.getTranslation("vn", props.language)}
            </h6>
          )
        ) : props.fromEng ? (
          <h6
            className="header__dictlang-item-title margin-top"
            id="header__dictlang-en"
          >
            {props.getTranslation("en", props.language)}
          </h6>
        ) : (
          <h6
            className="header__dictlang-item-title margin-top"
            id="header__dictlang-vn"
          >
            {props.getTranslation("vn", props.language)}
          </h6>
        )}
      </div>
      <div className="header__dictlang-item">
        {props.language === "en" ? (
          props.fromEng ? (
            <h6
              className="header__dictlang-item-title"
              id="header__dictlang-vn"
            >
              {props.getTranslation("vn", props.language)}
            </h6>
          ) : (
            <h6
              className="header__dictlang-item-title"
              id="header__dictlang-en"
            >
              {props.getTranslation("en", props.language)}
            </h6>
          )
        ) : props.fromEng ? (
          <h6
            className="header__dictlang-item-title margin-top"
            id="header__dictlang-vn"
          >
            {props.getTranslation("vn", props.language)}
          </h6>
        ) : (
          <h6
            className="header__dictlang-item-title margin-top"
            id="header__dictlang-en"
          >
            {props.getTranslation("en", props.language)}
          </h6>
        )}
      </div>

      <button
        className="header__dictlang-btn"
        href="javascript:SwapDivsWithClick()"
        onClick={props.handleClick}
      >
        <i className="header__dictlang-btn-icon fas fa-right-left" />
      </button>
    </div>
  );
}

export default DictLang;
