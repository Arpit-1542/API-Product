import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { FaCartPlus } from "react-icons/fa";
// import Spinner from 'react-bootstrap/Spinner';
import { DNA } from 'react-loader-spinner'
import { useDispatch } from "react-redux";
import { addtocart } from "../Redux/Actions/CartAction";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// let Promocode1 = "152535";

function ProductD() {

    let [product, setProduct] = useState({});
    let [rate, setRate] = useState()
    let ProductD = useParams()
    let [Quanti, SetQuanti] = useState(1);
    let [cart, SetCart] = useState([]);
    // let [userPromocode, setPromocode] = useState({})
    let [visible, setVisible] = useState(true)
    // let [discount, setDiscount] = useState({})
    let dispatch = useDispatch();



    useEffect(() => {
        let getProduct = () => {
            setTimeout(() => {
                fetch("https://fakestoreapi.com/products/" + ProductD.id)
                    .then(async (res) => {
                        let data = await res.json();
                        setRate(data.rating.rate)
                        setProduct(data);
                        console.log(data);
                    })
                    .catch((err) => {
                        console.log("data not found");
                    });
            }, 1000);
        };

        let Loader = () => {
            setTimeout(() => {
                setVisible(false)
            }, 2000)
        }

        let getCartProduct = (() => {
            let cartitem = JSON.parse(localStorage.getItem('cart'))
            if (cartitem == null) {
                SetCart([]);
            }
            else {
                SetCart(cartitem);
            }
        })

        getCartProduct();
        Loader();
        getProduct();
    }, setProduct);

    let submitCartData = (e) => {

        e.preventDefault();

        let DataObj = {
            id: ProductD.id,
            productQuantity: e.target.productQuantity.value,
            name: product.title,
            price: product.price * 83,
            image: product.image
        }
        console.log(DataObj);
        // console.log(DataObj.productQuantity);
        // console.log(DataObj.name);
        // console.log(DataObj.price * 83);
        // console.log(DataObj.image);

        let pos = cart.findIndex((v, i) => v.id === ProductD.id);
        console.log(pos);
        if (pos == -1) {
            let datacart = [...cart, DataObj];
            SetCart(datacart);
            localStorage.setItem('cart', JSON.stringify(datacart));
            dispatch(addtocart());
            alert("product Add In Cart Successfuly");
        }
        else {
            alert("product are already in cart");
        }

    }

    let getValue = (e) => {
        let v = parseInt(e.target.value);
        console.log(v);
        SetQuanti(v);
    }

    // let GetInputValue = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;
    //     setPromocode({ ...userPromocode, [name]: value })
    // }

    // let Promocode = (e) => {
    //     e.preventDefault();
    //     console.log(e.name);
    //     console.log(Promocode1);
    //     if (Promocode1 == userPromocode.Promocode) {
    //         alert('Congratulation! You got a discount.');
    //     }
    //     else {
    //         alert('Invalid promo code');
    //     }
    //     let DiscountPrice = Math.round(product.price * 75);
    //     setDiscount({ ...discount, ["Discounte"]: DiscountPrice });
    //     console.log(discount);
    // }



    return (
        <div className="container">
            <div className="back-btn">
                <Link to={"/"}>←</Link>
            </div>
            <DNA
                visible={visible}
                height="100"
                width="100"
                ariaLabel="dna-loading"
                wrapperStyle={{ display: "flex", zIndex: "99", position: "fixed", top: "0", left: "0", right: "0", backgroundColor: "rgba(0,0,0,100%)", bottom: "0", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}
                wrapperClass="dna-wrapper"
            />
            {/* <h1>Product Details</h1> */}

            <div className="ProductD-Items">
                <div className="w-40">
                    <div className="img">
                        <img src={product.image} alt="" />
                    </div>
                </div>
                <div className="w-60">
                    <div className="ProductD-Name">
                        <h2>{product.title}</h2>
                    </div>
                    {/* {product.rating && ( */}
                    <div className="ProductD-Rating">
                        {/* <p>{product.rating.rate}</p>
                        <p>{Math.round(product.rating.rate * 537)} Reviews</p> */}
                        <p>{rate} / 5</p>
                        <p>{Math.round(rate * 537)} Reviews</p>
                        <p>{Math.round(rate * 7)} Selfies</p>
                    </div>
                    {/* )} */}
                    <div className="ProductD-Price">
                        <del>₹ {Math.round(product.price * 83) + 527}</del>
                        <h5>
                            ₹ {Math.round(product.price * 83)}
                            {/* {
                                Promocode1 == userPromocode.Promocode ?
                                    <h5>₹ {Math.round(product.price * 75)}</h5>
                                    :
                                    <h5>₹ {Math.round(product.price * 83)}</h5>
                               } */}
                        </h5>
                        {/* <p>{((Math.round(product.price * 83) + 527) - (Math.round(product.price * 83)) / (Math.round(product.price * 83) + 527) * 100)}</p> */}
                    </div>
                    {/* <div className="ProductD-Promocode">
                        <form method="post" onSubmit={(e) => Promocode(e)}>
                            <input type="text" name="Promocode" placeholder="Apply-Promocode" onChange={(e) => GetInputValue(e)} />
                            <button type="submit">Submit</button>
                        </form>
                    </div> */}
                    <div className="ProductD-Comment">
                        <p>{product.description}</p>
                    </div>
                    <div className="ProductD-Cart">
                        <form method="post" onSubmit={(e) => submitCartData(e)}>
                            <Form.Control name="productQuantity" type="number" min="1" max="5" value={Quanti} onChange={(e) => getValue(e)} id="inputPassword5" aria-describedby="passwordHelpBlock" />
                            <div className="button">
                                <button type="submit">Add To Cart</button>
                                <button>BUY NOW</button>
                            </div>
                        </form>
                        {/* <button onClick={() => dispatch(addtocart())}>ADD TO CART</button> */}
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ProductD;