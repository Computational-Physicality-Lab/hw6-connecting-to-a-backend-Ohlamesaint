import React, { FC } from "react";
import styles from "./shopping_cart.module.scss";
import CartItemInterface from "../../../interface/CartItemInterface";
import CartItem from "../../shared/cart-item/cart-item";
import { useNavigate } from "react-router-dom";

interface ShoppingCartProps {
  cartItemsList: CartItemInterface[];
  onCartItemModify: Function;
  onCartRemove: Function;
  cartNumber: number;
}

const ShoppingCart: FC<ShoppingCartProps> = ({
  cartItemsList,
  onCartItemModify,
  onCartRemove,
  cartNumber,
}) => {
  let shippingCost = 6.95;
  const navigate = useNavigate();
  const handleSignInAndCheckoutClick = () => {
    navigate("/not-implemented");
  }
  const handleContinueShoppingClick = () => {
    navigate("/products");
  }
  return (
    <div className={styles.ShoppingCart}>
      <div className={styles.body_wrapper}>
        <div id={styles.page_title}>
          <h2>My Cart ({Number(cartNumber)})</h2>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.cart_item_list_wrapper}>
            {cartItemsList.length === 0 ? (
              <p>Your Cart is Empty</p>
            ) : (
              cartItemsList.map((cartItem) => {
                return (
                  <CartItem
                    key={cartItem.id}
                    _key={cartItem.id}
                    cartItem={cartItem}
                    onCartItemModify={onCartItemModify}
                    onCartRemove={onCartRemove}
                  />
                );
              })
            )}
          </div>
          <div className={styles.totalCostWrapper}>
            <div className={styles.cost_block}>
              <h2
                style={{
                  fontWeight: "normal",
                  fontSize: "x-large",
                  margin: ".5rem 0rem",
                }}
              >
                Order Summary
              </h2>
              <div className={styles.calculation_block}>
                <div className={styles.calculation_line}>
                  <p className={styles.left}>Subtotal:</p>
                  <p className={styles.right}>
                    $
                    {cartItemsList
                      .reduce(function (sub, record) {
                        return (
                          sub +
                          Number(record.price.replace("$", "")) *
                            record.quantity
                        );
                      }, 0)
                      .toPrecision(5)}
                  </p>
                </div>
                <div className={styles.calculation_line}>
                  <p className={styles.left}>Est. Shipping:</p>
                  <p className={styles.right}>
                    ${cartItemsList.length === 0 ? 0.0 : shippingCost}
                  </p>
                </div>
                <div className={styles.calculation_line}>
                  <p className={styles.left}>Total:</p>
                  <p className={styles.right} id={styles.sum}>
                    $
                    {cartItemsList.length === 0
                      ? 0.0
                      : (
                          Number(shippingCost) +
                          Number(
                            cartItemsList.reduce(function (sub, record) {
                              return (
                                sub +
                                Number(record.price.replace("$", "")) *
                                  record.quantity
                              );
                            }, 0)
                          )
                        ).toPrecision(5)}
                  </p>
                </div>
              </div>
              <div style={{ justifyContent: "center", display: "flex", marginTop: "10vh" }}>
                <button className={styles.shopping_cart_button} onClick={() => handleSignInAndCheckoutClick()}>
                  Sign in and Checkout
                </button>
              </div>
            </div>
            <div style={{ justifyContent: "center", display: "flex" }}>
              <button className={styles.shopping_cart_button} onClick={() => handleContinueShoppingClick()}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
