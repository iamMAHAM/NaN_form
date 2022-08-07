import { Link } from "react-router-dom";

const NavBar = () => {
    return ( 
        <nav className="navbar">
            <div><img id="logo" src="https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg" alt="" /> </div>
            <ul className="liens">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/add">Create</Link>
                </li>
            </ul>
        </nav>
     );
}

export default NavBar;