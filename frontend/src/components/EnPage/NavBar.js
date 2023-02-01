import "../style/base.css";
import "../style/main.css";
import "../style/responsive.css";
// import "../style/navbar.css";
import logo from "../img/logo_vinuni_white.png";

import React from "react";

function NavBar(props) {
  return (
    <div className="header-top">
      <div className="wide">
        <div className="main-header">
          <div className="header__logo">
            <img src={logo} alt="" className="header_logo-img" />
            <p className="header_logo-name">Softcon</p>
          </div>
          <div className="header__navbar">
            <div className="header__navbar-normal">
              <a
                href="#searching"
                className="header__navbar-item border-choosen"
              >
                {props.getTranslation("title", props.language)}
              </a>
              {/* <a class="header__navbar-item">HISTORY</a>          */}
            </div>
          </div>
          <div
            className="header__weblang"
            onClick={() => {
              props.setShowWebLang(!props.showWebLang);
              console.log(props.showWebLang);
            }}
          >
            <div className="header__weblang-item header__weblang-menu">
              <i className="header__weblang-menu-icon fas fa-bars" />
              <i className="header__weblang-globe-icon fas fa-globe" />
            </div>

            {props.showWebLang && (
              <div className="header__weblang-sub">
                <div className="header__weblang-sub-list">
                  <ul>
                    {props.languages.map((language) => {
                      if (props.language === language) {
                        return (
                          <li key={props.language}>
                            <input
                              type="radio"
                              id="lang1"
                              name="selection"
                              hidden="true"
                            />
                            <label
                              htmlFor="lang1"
                              className="header__weblang-sub-button red-background"
                            >
                              <a className="text-white">
                                {props.getTranslation(language, props.language)}
                              </a>
                            </label>
                          </li>
                        );
                      }
                      return (
                        <li
                          key={props.language}
                          onClick={() => {
                            props.setLanguage(language);
                            console.log(props.language);
                          }}
                        >
                          <input
                            type="radio"
                            id="lang1"
                            name="selection"
                            hidden="true"
                          />
                          <label
                            htmlFor="lang1"
                            className="header__weblang-sub-button"
                          >
                            <a>
                              {props.getTranslation(language, props.language)}
                            </a>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
