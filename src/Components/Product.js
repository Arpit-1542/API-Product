import Nav from 'react-bootstrap/Nav';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { DNA } from 'react-loader-spinner'


function Product() {
    let [product, setProduct] = useState([]);
    let [productCat, setProductCat] = useState([]);
    let [visible, setVisible] = useState(true)

    useEffect(() => {
        let getProduct = () => {
            setTimeout(() => {
                fetch("https://fakestoreapi.com/products")
                    .then(async (res) => {
                        let data = await res.json();
                        setProduct(data);
                    })
                    .catch((err) => {
                        console.log("data not found");
                    });
            }, 1000);
        };

        let getProductCat = () => {
            setTimeout(() => {
                fetch("https://fakestoreapi.com/products/categories")
                    .then(async (res) => {
                        let cat = await res.json();
                        setProductCat(cat);
                    })
                    .catch((err) => {
                        console.log('Category Data Not Found');
                    })
            }, 1000)
        }

        let Loader = () => {
            setTimeout(() => {
                setVisible(false)
            }, 2000)
        }

        Loader();
        getProduct();
        getProductCat();
    }, setProduct, setProductCat);

    // let productDetails = (e) => {
    //     console.log(e);
    // }

    let getProductD = (cata) => {
        console.log(cata);
        setTimeout(() => {

            var url = '';
            cata == 'All' ? url = "https://fakestoreapi.com/products" : url = "https://fakestoreapi.com/products/category/" + cata;

            fetch(url)
                .then(async (res) => {
                    let ProD = await res.json();
                    setProduct(ProD);
                })
                .catch((err) => {
                    console.log(err);
                })
        }, 100)
    }

    return (
        <div className="Product">
            {/* <div className='overlay'> */}
            <DNA
                visible={visible}
                height="100"
                width="100"
                ariaLabel="dna-loading"
                wrapperStyle={{ display: "flex", zIndex: "99", position: "fixed", top: "0", left: "0", right: "0", backgroundColor: "rgba(0,0,0,100%)", bottom: "0", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}
                wrapperClass="dna-wrapper"
            />
            {/* </div> */}

            <div className="Categories">
                <Nav variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link onClick={() => getProductD('All')}>All</Nav.Link>
                    </Nav.Item>
                    {productCat.map((v, i) => {
                        return (
                            <Nav.Item>
                                <Nav.Link onClick={(e) => getProductD(v)}>{v}</Nav.Link>
                            </Nav.Item>
                        )
                    })
                    }
                </Nav>
            </div>

            <div className="Product-Show">
                {product.map((v, i) => {
                    return (
                        <div className="Items">
                            <div className="Product-img">
                                <img src={v.image} alt="" />
                            </div>
                            <div className="Product-name">
                                <p>{v.title}</p>
                            </div>
                            <div className="Product-Price">
                                <p style={{ display: "flex" }}>
                                    <del>₹{Math.round(v.price * 83) + 527}</del>
                                    <h5 style={{ marginLeft: "10px" }}>₹{Math.round(v.price * 83)}</h5>
                                </p>
                            </div>
                            <div className="Product-Details">
                                <Link className="btn" to={"/productD/" + v.id}>Product Details</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Product;