import { useState, useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import NotImplemented from "./components/pages/not_implemented/not_implemented";
import Home from "./components/pages/home/home";
import Product from "./components/pages/product/product";
import Details from "./components/pages/details/details";
import ShoppingCart from "./components/pages/shopping_cart/shopping_cart";
import RootLayout from "./components/shared/root_layout/root_layout";
import CartItemInterface from "./interface/CartItemInterface";

import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  updateDoc,
  deleteDoc,
  where,
  getDocs,
} from "firebase/firestore";
import Login from "./components/pages/login/login";
import CreateFromPicture from "./components/pages/create_from_picture/create_from_picture";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3SiFB0JHMe03nLTHZVU0eDTCd8Qnk7SU",
  authDomain: "ssui-18fae.firebaseapp.com",
  projectId: "ssui-18fae",
  storageBucket: "ssui-18fae.appspot.com",
  messagingSenderId: "446036307748",
  appId: "1:446036307748:web:60d1a3718c0fd2cda40db1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function App() {
  const [user, setUser] = useState<any>(undefined);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(undefined);
  const [cartItem, setCartItem] = useState<CartItemInterface[]>([]);


  const onCartAdd = async (cartItemInterface: CartItemInterface) => {
    await addDoc(collection(db, "cartItems"), {
      ...cartItemInterface,
    });

    setCartItem((prev) => {
      return [cartItemInterface, ...prev];
    });
  };

  const onCartItemModify = async (index: string, modifiedQuantity: number) => {
    const q = query(collection(db, "cartItems"), where("id", "==", index));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs[0].data;
    await updateDoc(querySnapshot.docs[0].ref, {
      ...data,
      quantity: modifiedQuantity,
    });

    setCartItem((cartItemList) => {
      cartItemList.filter((cartItem) => cartItem.id === index)[0].quantity =
        modifiedQuantity;
      return [...cartItemList];
    });
  };
  const onCartRemove = async (index: string) => {
    const q = query(collection(db, "cartItems"), where("id", "==", index));
    const querySnapshot = await getDocs(q);
    await deleteDoc(querySnapshot.docs[0].ref);

    setCartItem((cartItemList) => {
      cartItemList = cartItemList.filter((cartItem) => cartItem.id !== index);
      return [...cartItemList];
    });
  };

  let provider = new GoogleAuthProvider();

  const loginHandle = async () => {
    const auth = getAuth();
    setIsLoading(true);
    if (!isLogin) {    
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;
          onUserLogin(user, token);
          setIsLogin(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          setIsLogin(false);
          const credential = GoogleAuthProvider.credentialFromError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      onUserLogin(undefined, undefined);
      setIsLoading(false);
      setIsLogin(false);
      signOut(auth);
    }
  }

  const onUserLogin = async (user: any, token: any) => {
    setToken(token);
    setUser(user);
    if (user !== undefined && user!==null) {

      if(cartItem.length !== 0) {
        let cartItemIds = cartItem.map(item => item.id);
        const cart = query(
          collection(db, "cartItems"),
          where("id", "in", cartItemIds)
        )
        const cartQuerySnapshot = await getDocs(cart);
        for(let i=0; i<cartQuerySnapshot.docs.length; i++){
          await updateDoc(cartQuerySnapshot.docs[i].ref, {
            ...cartQuerySnapshot.docs[i].data(),
            uid: user.uid,
          });
        }
        
      }

      const q = query(
        collection(db, "cartItems"),
        where("uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      let cartItemArray: any[] = [];
      querySnapshot.docs.forEach((doc) => {
        cartItemArray.push(doc.data());
      });

      setCartItem(cartItemArray);
    } else {
      setCartItem([]);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    (async () => {
      setIsLoading(true);
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setUser(user);
          setIsLogin(true);
        } else {
          setIsLogin(false);
          setUser(undefined);
        }
      });
      setIsLoading(false)
    } )()
  }, []);



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <RootLayout
            cartNumber={cartItem.reduce(function (total, record) {
              return Number(total) + Number(record.quantity);
            }, 0)}
            userImpl={user}
          />
        }
        errorElement={<NotImplemented />}
      >
        <Route index element={<Home />} />
        <Route path="not-implemented" element={<NotImplemented />} />
        <Route path="products" element={<Product />} />
        <Route
          path="details/:productName"
          element={<Details onCartAdd={onCartAdd} userImpl={user} />}
        />
        <Route
          path="shopping-cart"
          element={
            <ShoppingCart
              cartNumber={cartItem.reduce(function (total, record) {
                return Number(total) + Number(record.quantity);
              }, 0)}
              cartItemsList={cartItem}
              onCartItemModify={onCartItemModify}
              onCartRemove={onCartRemove}
            />
          }
        />
        <Route
          path="login"
          element={<Login onUserLogin={onUserLogin} userImpl={user} isLogin={isLogin} isLoading={isLoading} loginHandle={loginHandle}/>}
        />
        <Route
          path="create-from-picture"
          element={<CreateFromPicture onCartAdd={onCartAdd} userImpl={user} />}
        ></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
