import React, { FC } from "react";
import styles from "./product.module.scss";
import shirtData from "../../../asset/shared/shirts";

import ShirtCard from "../../shared/shirt-card/shirt-card";
import ShirtDataInterface from "../../../interface/ShirtDataInterface";

interface ProductProps {}


const shirts: ShirtDataInterface[] = shirtData;

const Product: FC<ProductProps> = () => (
  <div className={styles.Product}>
    <div className={styles.product_body_wrapper}>
      <div id={styles.product_page_title}>
        <h2>Our T-Shrits</h2>
      </div>
      <div className={styles.products}>
        {shirts.map((shirt) => {
          return <ShirtCard key={shirt.name} name={shirt.name} colors={shirt.colors} img={shirt.colors.white.front}/>
        })}
      </div>
    </div>
  </div>
);

export default Product;
