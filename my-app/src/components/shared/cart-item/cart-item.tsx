import React, { FC, useState } from "react";
import styles from "./cart-item.module.scss";
import CartItemInterface from "../../../interface/CartItemInterface";
import { useNavigate } from "react-router-dom";


interface CartItemProps {
  cartItem: CartItemInterface;
  onCartItemModify: Function;
  _key: string;
  onCartRemove: Function;
}

const CartItem: FC<CartItemProps> = ({
  _key,
  cartItem,
  onCartItemModify,
  onCartRemove,
}) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const handleCartItemImgClick = () => {
    navigate(`/details/${cartItem.name.replaceAll(" ","_")}`)
  }
  return (
    <div className={styles.CartItem}>
      <div className={styles.cart_item_title}>{cartItem.name}</div>
      <div className={styles.cart_item_content_wrapper}>
      <div className={styles.cart_item_image} onClick={() => handleCartItemImgClick()}>
        {
          cartItem.userCreated?
          <div className={styles.details_image}>
            <div className={styles.DefaultShirt}>
              <div className={styles.UserSelectedImage} style={{backgroundImage: `url(${cartItem.img})`}}></div>
            </div>
          </div>
          :<img
          id="img"
          style={{ maxWidth: "100%", height: "auto" }}
          src={cartItem.img}
          alt=""
        />
        }
        
      </div>
      <div className={styles.cart_item_details}>
        <div className={styles.details_quantity}>
          Quantity:&nbsp;&nbsp; 
          <select
            id="quantity"
            name="quantitySelector"
            className={styles.details_button}
            style={{ backgroundColor: "white", color: "black" }}
            defaultValue={cartItem.quantity}
            onChange={(e) => onCartItemModify(_key, e.currentTarget.value)}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((id) => {
              return (
                <option key={id} value={id}>
                  {id}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.details_size}>Color: {cartItem.color}</div>
        <div className={styles.details_size}>Size: {cartItem.size}</div>
        <h2 className={styles.details_price}>Price (each): {cartItem.price}</h2>
        <div className={styles.details_addToCart}>
          <button
            className={styles.remove_button}
            id="remove"
            onClick={() => onCartRemove(_key)}
          >
            Remove
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CartItem;
