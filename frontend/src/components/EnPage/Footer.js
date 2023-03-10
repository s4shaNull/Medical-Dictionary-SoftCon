/* eslint-disable jsx-a11y/anchor-is-valid */
import "../style/base.css";
import "../style/main.css";
import "../style/responsive.css";
// import "../style/footer.css";

import React from "react";

export default function Footer(props) {
  return (
    <footer className="footer-bot">
      <div className="footer-navbar">
        <div className="col-xs-9 footer-navbar-menu">
          <ul>
            <li>
              <a href="#searching">
                {props.getTranslation("back-to-top", props.language)}
              </a>
            </li>
          </ul>
        </div>
        <div className="copy-right">
          <div className="footer-connection">
            <p>{props.getTranslation("feedback", props.language)}</p>
            <a
              className="email footer-social-icon"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdkyfjztFYCfyXXu2UGEXvLIowQXgjtFDNuqDyYUFfV6mfhkA/viewform"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-regular fa-envelope" />
            </a>
          </div>
          <p>© 2022 SoftCon.</p>
        </div>
      </div>
    </footer>
  );
}
