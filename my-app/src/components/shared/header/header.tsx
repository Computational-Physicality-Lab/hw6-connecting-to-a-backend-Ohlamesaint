import React, { FC } from "react";
import styles from "./header.module.scss";
import LogoImage from "../../../asset/assets/images/logo.png"
import { NavLink, useNavigate } from "react-router-dom";
import CartPNG from "../../../asset/assets/images/cart.png";

interface HeaderProps {
  cartNumber: number
}


const Header: FC<HeaderProps> = ({cartNumber}) => {

  const navigate = useNavigate();

  const handleCartClicked = () => {
    navigate("shopping-cart");
  }

  return (
  <React.Fragment>
    <div className={styles.Header}></div>

    <div className={styles.wrapper}>
      <NavLink to={`/`} id={styles.homeLogo}>
        <img id={styles.LogoImage} src={LogoImage} alt="" />
      </NavLink>
      <div id={styles.homeTitle}>
        <h1>Scotty Shirts U Illustrate (SSUI)</h1>
      </div>
      <button id={styles.homeCart} onClick={handleCartClicked}>
        <img
          src={CartPNG}
          alt=""
        />
        <span> &nbsp;{cartNumber}</span>
      </button>
    </div>
  </React.Fragment>
)};

export default Header;
