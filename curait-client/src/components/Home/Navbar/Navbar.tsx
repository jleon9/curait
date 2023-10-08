import React, { FC } from 'react';

const Navbar: FC<Navbar> = () => {
  const menuPages: string[] = ["Story", "Product", "Contact"];
  const Menu: FC<Menu> = ({ logo, pages }) => {
    return (
      <div>
        <img className="curait-logo" src={logo} alt=""/>
        {pages.map((title) => {
          return (
            <span className="menu-page-title">
              {title}
            </span>
          )
        })}
      </div>
    );
  }  

  return (
    <div>
      <h1 className="home-page-title">Curait</h1>
      <Menu 
        className="menu" 
        logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfVVqeswkBBm-OA0JKoGFMJhnQjrgfHOKhEie6mCL2&s" 
        pages={menuPages}/>
    </div>
  )
}

export default Navbar;