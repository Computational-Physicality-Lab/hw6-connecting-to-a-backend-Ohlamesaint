import React, { FC } from "react";
import styles from "./navbar.module.scss";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  userImpl: any;
}

const Navbar: FC<NavbarProps> = ({ userImpl }) => (
  <div className={styles.Navbar}>
    <input id={styles.collapsible} className={styles.toggle} type="checkbox" />
    <label className={styles.lbl_toggle}>
      {/* <i className="styles.fa-solid fa-bars"> Tool Bar </i> */}
    </label>
    <nav className={styles.togContent}>
      <NavLink to={`products`}>
        <span>T-SHIRTS</span>
      </NavLink>
      <NavLink to={`create-from-picture`}>
        <span>CREATE FROM PICTURE</span>
      </NavLink>
      <NavLink to={`not-implemented`}>
        <span>CREATE YOUR OWN</span>
      </NavLink>
      <NavLink to={`not-implemented`}>
        <span>ABOUT US</span>
      </NavLink>
      <NavLink to={`login`}>
        {userImpl === undefined || userImpl===null ? (
          <span>LOG IN</span>
        ) : (
          <>
            <img src={userImpl.photoURL} alt="" />
            <span>&nbsp; {userImpl.displayName}</span>
          </>
        )}
      </NavLink>
    </nav>
  </div>
);

export default Navbar;
