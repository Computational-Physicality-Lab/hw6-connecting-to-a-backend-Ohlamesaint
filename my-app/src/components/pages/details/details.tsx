import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./details.module.scss";
import ShirtData from "../../../asset/shared/shirts";
import ShirtDataInterface from "../../../interface/ShirtDataInterface";
import CartItemInterface from "../../../interface/CartItemInterface";

import { v4 as uuidv4 } from 'uuid';

interface DetailsProps {
  onCartAdd: Function;
  userImpl: any
}

const shrits: ShirtDataInterface[] = ShirtData;

const Details: FC<DetailsProps> = ({onCartAdd, userImpl}) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Size");

  const [color, setColor] = useState("white");
  const [side, setSide] = useState("front");
  const [disabled, setDisabled] = useState(true);

  let { productName } = useParams();


  const targetProduct: ShirtDataInterface | undefined = shrits.filter(
    (shirt) => shirt.name.replaceAll(" ", "_") === productName
  )[0];

  const sizeList: string[] = [
    "Size",
    "Women’s XS",
    "Women’s S",
    "Women’s M",
    "Women’s L",
    "Women’s XL",
    "Women’s 2XL",
    "Men’s XS",
    "Men’s S",
    "Men’s M",
    "Men’s L",
    "Men’s XL",
    "Men’s 2XL",
  ];
  
  const handleAddCartClick = () => {
    let addedCartItem: CartItemInterface = {
      name: targetProduct.name,
      quantity: quantity,
      size: size,
      img: targetProduct.colors[color]["front"],
      price: targetProduct.price,
      color: color,
      id: uuidv4(),
      uid: userImpl?userImpl.uid:"",
      userCreated: false
    }


    onCartAdd(addedCartItem);
  }

  useEffect(() => {
    let shirtImage = document.getElementById("img") as HTMLImageElement;
    shirtImage.src = targetProduct.colors[color][side];
  }, [color, side]);

  useEffect(() => {
    if(size!=="Size") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [size]);


  return (
    <div className={styles.Details}>
      <div className={styles.body_wrapper}>
        <div id={styles.details_page_title}>{targetProduct.name}</div>
        <div className={styles.details_wrapper}>
          <div className={styles.details_image}>
            <img id="img" src="" alt="" />
          </div>
          <div className={styles.details_details}>
            <h2 className={styles.details_price}>{targetProduct.price}</h2>
            <p className={styles.details_description}>
              {targetProduct.description}
            </p>
            <div className={styles.details_side_wrapper}>
              Side:
              <button className={styles.details_button} onClick={() => setSide("front")}>front</button>
              <button className={styles.details_button} onClick={() => setSide("back")}>back</button>
            </div>
            <div className={styles.details_color_wrapper}>Color:
              {
                Object.keys(targetProduct.colors).map(color => {
                  return (
                  <button key={color} className={styles.details_button}  onClick={() => setColor(color)} style={{backgroundColor: color, color: "black"}}>{color}</button>
                  )
                })
              }
            </div>
            <div className={styles.details_quantity}>
              Quantity:
              <select
                id="quantity"
                name="quantitySelector"
                className={styles.details_button}
                style={{ backgroundColor: "white", color: "black" }}
                defaultValue={quantity}
                onChange={(e) => setQuantity(Number(e.currentTarget.value))}
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((id) => {
                  return (
                    <option
                      key={id}
                      value={id}
                    >
                      {id}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.details_size}>
              Size:
              <select
                id="size"
                name="sizeSelector"
                className={styles.details_button}
                style={{ backgroundColor: "white", color: "black" }}
                defaultValue={quantity}
                onChange={(e) => setSize(e.currentTarget.value)}
              >
                {sizeList.map((sizeValue) => {
                  return (
                    <option
                      key={sizeValue}
                      
                      value={sizeValue}
                    >
                      {sizeValue}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.details_addToCart}>
              <button className={styles.details_button} id="addToCart" disabled={disabled} onClick={() => handleAddCartClick()}>Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
