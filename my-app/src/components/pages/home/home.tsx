import React, { FC } from "react";
import styles from "./home.module.scss";

import HomePagePNG from "../../../asset/assets/images/banner.png"

interface HomeProps {}

const Home: FC<HomeProps> = () => (
  <div className={styles.Home}>
    <div className={styles.main_picture}>
      <img className={styles.main_image} alt="" src={HomePagePNG} />
    </div>

    <div id={styles.interesting_words}>
      <div id="word1">
        <h2>We don't ship. We're not real.</h2>
        <p>
          We sell shirts. We are passionate about selling shirts. But keep in
          mind we have no infrastructure, supply chain, or mechanism to actually
          produce these shirts or fulfill the orders. But the shirts will always
          be real in your imagination.
        </p>
      </div>
      <div id="word2">
        <h2>Design your own shirt! But help us do that...</h2>
        <p>
          Not only do we not sell shirts, but we let you design your own!
          Eventually. We actually kinda need your help implementing that. If you
          could build an actual paint-style interface that you can make designs
          in that would be great :)
        </p>
      </div>
    </div>
  </div>
);

export default Home;
