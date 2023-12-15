import { Link } from 'react-router-dom';
import Style from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={Style.navbarWrapper}>
      <div className={Style.linksWrapper}>
        <Link to='/'>
          <h3>Home</h3>
        </Link>
        <Link to='/drivers'>
          <h3>Drivers</h3>
        </Link>
        <Link to='/create'>
          <h3>Add a Driver</h3>
        </Link>
        <Link to='/about'>
          <h3>About</h3>
        </Link>
      </div>
    </nav>
  );
};
