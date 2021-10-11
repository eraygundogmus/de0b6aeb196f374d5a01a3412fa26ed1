import React from "react";
import Logo from "../../svg/Logo";
import Button from "../../button/Button";
import "./index.scss";

function Header() {
  return (
    <div className="header">
      <div className="header-inner">
        <Logo />
        <Button> Rezervasyon Yap </Button>
      </div>
    </div>
  );
}

export default Header;
