import React, { FC, useState, useEffect } from "react";
import styles from "./create_from_picture.module.scss";
import CartItemInterface from "../../../interface/CartItemInterface";

import { v4 as uuidv4 } from "uuid";

interface CreateFromPictureProps {
  onCartAdd: Function;
  userImpl: any;
}

const CreateFromPicture: FC<CreateFromPictureProps> = ({
  onCartAdd,
  userImpl,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Size");
  const [disabled, setDisabled] = useState(true);
  const [pickedImg, setPickedImg] = useState(undefined);
  const [searchText, setSearchTest] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const [pictureURL, setPictureURL] = useState<string[]>([]);

  useEffect(() => {
    if (size !== "Size") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [size]);

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
      name: searchText,
      quantity: quantity,
      size: size,
      img: pickedImg,
      price: "20.00",
      color: "white",
      id: uuidv4(),
      uid: userImpl?userImpl.uid:"",
      userCreated: true,
    };

    onCartAdd(addedCartItem);
  };

  let handlePictureSelect = (e: any) => {
    setPickedImg(e.target.src);
  };

  let handleDisplayMore = () => {
    fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&query=${searchText}&per_page=10&client_id=Nq_VFzn42ZjtleOddWJ6mv9irTqkOj1j8o8hdYfGEkk`
    ).then(async (res) => {
      console.log(res);
      let data = await res.json();
      let imgURLs = data.results.map((result: any) => {
        return result.urls.small;
      });
      setPictureURL((prev) => {
        return [...prev, ...imgURLs];
      });
      setPageIndex((prev) => prev + 1);
    });
  };

  let handleSearch = (e: any) => {
    e.preventDefault();
    fetch(
      `https://api.unsplash.com/search/photos?page=${1}&query=${searchText}&per_page=10&client_id=Nq_VFzn42ZjtleOddWJ6mv9irTqkOj1j8o8hdYfGEkk`
    ).then(async (res) => {
      console.log(res);
      let data = await res.json();
      let imgURLs = data.results.map((result: any) => {
        return result.urls.small;
      });
      setPictureURL((prev) => {
        return [...imgURLs];
      });
      setPageIndex((prev) => 2);
    });
  };

  return (
    <div className={styles.CreateFromPicture}>
      <div className={styles.CreatePart}>
        <div className={styles.details_wrapper}>
          <div className={styles.details_image}>
            <div className={styles.DefaultShirt}>
              <div
                className={styles.UserSelectedImage}
                style={{ backgroundImage: `url(${pickedImg})` }}
              ></div>
            </div>
          </div>
          <div className={styles.details_details}>
            <h2 className={styles.details_price}>$20.00</h2>
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
                    <option key={id} value={id}>
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
                    <option key={sizeValue} value={sizeValue}>
                      {sizeValue}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.details_addToCart}>
              <button
                className={styles.details_button}
                id="addToCart"
                disabled={
                  disabled || pickedImg === undefined
                }
                onClick={() => handleAddCartClick()}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.SearchPart}>
        <div>
          <form
            className={styles.Search}
            onSubmit={(e) => {
              handleSearch(e);
            }}
          >
            <input
              placeholder="Search for pictures"
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchTest(e.target.value);
              }}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className={styles.SearchResult}>
          {
          pictureURL.length===0?
            <p style={{width: "100%", textAlign: "center"}}>No Result</p>
          :
          pictureURL.map((element, index) => (
            <img
              key={index}
              src={element}
              alt=""
              onClick={(e) => handlePictureSelect(e)}
            />
          ))}
        </div>
        <div className={styles.DisplayMore}>
          <button
            disabled={searchText === ""}
            onClick={() => handleDisplayMore()}
          >
            Display More
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFromPicture;
