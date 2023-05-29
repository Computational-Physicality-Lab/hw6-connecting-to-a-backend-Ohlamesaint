import React, { FC } from "react";
import styles from "./not_implemented.module.scss";
import { useRouteError } from "react-router-dom";
import NotImplementedPNG from "../../../asset/assets/images/scotty.png";

interface NotImplementedProps {}

const NotImplemented: FC<NotImplementedProps> = () => {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <div className={styles.NotImplemented}>
      <div className={styles.NotFound}>
        <img id={styles.NotFoundImage} src={NotImplementedPNG} alt="" />
        <p>
          Oops, this page doesn't exist yet... how about a shirt from the last
          page?
        </p>
      </div>
    </div>
  );
};

export default NotImplemented;
