import React from "react";
import "./footer.css";
import github from "./github.png";
import linkedin from "./linkedin.png";

export const Footer = () => {
  return (
    <>
      <section className="component-footer">
        <footer className="component-footer-main">
          <h2>© 2024 Jean Espinoza</h2>
          <section className="component-footer-links">
            <a
              href="https://github.com/JeanEspinoza10"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={github}
                alt="github"
                className="a-icon"
                width="50"
                height="50"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/jcespinozacdev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedin}
                alt="linkedin"
                className="icon-linkedin"
                width="50"
                height="50"
              />
            </a>
          </section>
        </footer>
      </section>
    </>
  );
};
