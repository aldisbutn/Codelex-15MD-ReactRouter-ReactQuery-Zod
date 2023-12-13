import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>Racing driver cards</h1>
      <div className='links'>
        <Link to='/'>Home</Link>
        <Link to='/drivers'>Drivers</Link>
        <Link to='/create'>Add a driver</Link>
        <Link to='/about'>About</Link>
      </div>
    </nav>
  );
};
