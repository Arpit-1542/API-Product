import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
    let dataCount = useSelector(state => state.count);
    return (
        <div className="header container">
            <div className="Logo">
                <img src={require("../img/Logo.png")} alt="Logo" width={150} />
            </div>
            {/* <div className="Search-Bar">
                <input type="text" name="Search" placeholder="Search-Product" />
                <button>Search</button>
            </div> */}
            {/* <div className="Filter">
                <button onClick={(e) => sortingData()}>Filter</button>
            </div> */}
            <Link to={"/cart"} className="a">
                <div className="Cart">
                    <h3 >Cart</h3><FaCartPlus className="icon" /><span>{dataCount}</span>
                </div>
            </Link>
        </div>
    )
}

export default Header;