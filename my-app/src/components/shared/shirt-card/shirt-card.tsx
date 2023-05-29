import React, { FC } from "react";
import styles from "./shirt-card.module.scss";
import { useNavigate } from "react-router-dom";
import notFoundPNG from '../../../asset/assets/images/not-found.png'

interface ShirtCardProps {
  name: string;
  img: any;
  colors: {
    [propName: string]: {
      front: string;
      back: string;
    };
  };
}

const ShirtCard: FC<ShirtCardProps> = (ShirtCardProps) => {
  const navigate = useNavigate();
  const handleSeePage = () => {
    let name = ShirtCardProps.name.replaceAll(" ", "_");
    navigate(`/details/${name}`);
  };
  return (
    <div className={styles.ShirtCard}>
      <div
        className={styles.product_image}
      >
        <img src={ShirtCardProps.img===undefined?notFoundPNG:ShirtCardProps.img} alt="" />
      </div>

      <div className={styles.product_description_wrapper}>
        <div className={styles.product_title}>{ShirtCardProps.name}</div>
        <div className={styles.product_description}>
          Available in {Object.keys(ShirtCardProps.colors).length} colors
        </div>
        <div className={styles.product_button_wrapper}>
          <button
            onClick={() => handleSeePage()}
            className={styles.card_button + " " + styles.view_detail}
          >
            See Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShirtCard;
