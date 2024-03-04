// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, query, where, deleteDoc, increment} from "firebase/firestore";

function MyFirebase() {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB_2G_Py-CpPi5AZ4b3R2INrtHH4L1hk6c",
    authDomain: "shoppingcart-c4b35.firebaseapp.com",
    projectId: "shoppingcart-c4b35",
    storageBucket: "shoppingcart-c4b35.appspot.com",
    messagingSenderId: "241168604060",
    appId: "1:241168604060:web:ed1f56f8556cbee6394659"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const me = {};

  me.getProducts = async () => {
    const productsRef = collection(db, "Products");
    return (await getDocs(productsRef)).docs.map( (d) => d.data());
  };

  me.addProduct = async(product) => {
    const productRef = await addDoc(collection(db, "Products"), {
      id: +product.id,
      name: product.name,
      price: product.price,
      image: "https://via.placeholder.com/150",
    });
    return productRef.id;
  };

  me.getCart = async () => {
    const cartRef = collection(db, "ProductsToBuy");
    return (await getDocs(cartRef)).docs.map( (d) => d.data());
  };

  me.addProductToCart = async (product) => {
    const productToBuyRef = await addDoc(collection(db, "ProductsToBuy"), {
      id: +product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
    return productToBuyRef.id;
  };

  me.addMultiple = async (product) => {
    const shoppingCartRef = collection(db, "ProductsToBuy");
    const q = query(shoppingCartRef, where("id", "==", product.id));
    const querySnapshot = await getDocs(q);
    const addRef = querySnapshot.docs[0].ref;

    await updateDoc(addRef, {quantity: product.quantity+1});
  };

  me.removeProductFromCart = async (id) => {
    const shoppingCartRef = collection(db, "ProductsToBuy");
    const q = query(shoppingCartRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const updateRef = querySnapshot.docs[0].ref;

    await updateDoc(updateRef, {quantity: increment(-1)});

    me.deleteProductFromCart();
  };

  me.deleteProductFromCart = async() => {
    const shoppingCartRef2 = collection(db, "ProductsToBuy");
    const q2 = query(shoppingCartRef2, where("quantity", "==", 0));
    const querySnapshot2 = await getDocs(q2);
    if (!querySnapshot2.empty) {
      const deleteRef = querySnapshot2.docs[0].ref;

      await deleteDoc(deleteRef);
    }
  };

  me.removeProductFromList = async(product) => {
    const list = collection(db, "Products");
    const q3 = query(list, where("id", "==", product.id));
    const querySnapshot3 = await getDocs(q3);
    const removeRef = querySnapshot3.docs[0].ref;
    await deleteDoc(removeRef);
  };

  me.clearCart = async () => {
    const cart = collection(db, "ProductsToBuy");
    const q_cart = query(cart);
    const querySnapshot_cart = await getDocs(q_cart);
    for (const doc of querySnapshot_cart.docs) {
      await deleteDoc(doc.ref);
    }
  };

  return me;
}

export const myBase = new MyFirebase();