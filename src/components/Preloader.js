import React from "react";
import { Image } from "@themesberg/react-bootstrap";

import ReactLogo from "../assets/img/technologies/react-logo-transparent.svg";
import Logo from "../assets/img/logoColored.png";

export default (props) => {
  const { show } = props;

  return (
    <div
      className={`preloader bg-soft flex-column justify-content-center align-items-center ${
        show ? "" : "show"
      }`}
    >
      <Image hidden={!show} src={Logo} />
      <div hidden={!show} className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  );
};
