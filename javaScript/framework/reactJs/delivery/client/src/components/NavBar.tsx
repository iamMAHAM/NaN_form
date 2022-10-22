import "../assets/static/css/navbar.css"
import logo from "../assets/static/images/javascript.svg"

const NavBar = () => {
  return ( 
    <>
      <nav className="navbar">
        <img src={ logo } alt="logo du site" className="logo"/>
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Blog</a>
          </li>
          <li>
            <a href="">Ajouter</a>
          </li>
        </ul>
      </nav>
    </>
   );
}
 
export default NavBar;