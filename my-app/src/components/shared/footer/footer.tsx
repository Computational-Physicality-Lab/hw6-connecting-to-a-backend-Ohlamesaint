import React, { FC } from "react";
import styles from "./footer.module.scss";
import { NavLink } from "react-router-dom";

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <div className={styles.Footer}>
    <div className={styles.footer_wrapper}>
      <input
        id={styles.collapsible_footer}
        className={styles.toggle_footer}
        type="checkbox"
      ></input>
      <label className={styles.lbl_toggle_footer}>
        <i className="fa_solid fa_bars"> Footer</i>
      </label>
      <footer id={styles.footer} className={styles.togContent}>
        <NavLink to={`not-implemented`}>Contact Us</NavLink>
        <NavLink to={`not-implemented`}>Site Map</NavLink>
        <NavLink to={`not-implemented`}>Privacy Policy</NavLink>
        <NavLink to={`not-implemented`}>Careers</NavLink>
        <NavLink to={`not-implemented`}>Reviews</NavLink>
        <a href="#"> Designed by Chen Sam </a>
      </footer>
    </div>
  </div>
);

export default Footer;
