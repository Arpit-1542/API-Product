import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletecart } from "../Redux/Actions/CartAction";


function Cart() {

    let [cart, setCart] = useState([]);
    let dispatch = useDispatch()
    let sum = 0

    useEffect(() => {
        let cartdata = JSON.parse(localStorage.getItem('cart'));
        if (cartdata === null) {
            cartdata = [];
        }
        else {
            setCart(cartdata);
        }
    }, setCart);

    console.log(cart);

    let setDelete = (pos) => {
        // alert("Product has been removed");
        let localdata = JSON.parse(localStorage.getItem('cart'));
        localdata.splice(pos, 1);
        localStorage.setItem('cart', JSON.stringify(localdata));
        setCart(localdata);
        dispatch(deletecart())
    }

    return (
        <div className="container">
            {cart.map((v, i) => {
                return (
                    <div className="Cart-items">
                        <div className="Cart-Image w-30">
                            <img src={v.image} alt="Image" />
                        </div>
                        <div className="Cart-Name w-70">
                            <h3>{v.name}.</h3>
                            <p><b>Price:</b> ₹{Math.round(v.price)}/-</p>
                            <input type="number" value={v.productQuantity} />
                            <div className="function">
                                <Link onClick={() => setDelete(i)}><p>Delete</p></Link>
                                <Link to={"/"}><p>See More Like This</p></Link>
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* <span className="line">-----------------------------------------------------</span> */}
            <div className="Total" style={{ textAlign: "right" }}>

                {cart.map((v, i) => {
                    sum = sum + v.price * v.productQuantity
                    console.log(sum);
                })}
                <h3>Total : ₹{Math.round(sum)}/-</h3>
            </div>
        </div>
    )
}

export default Cart;