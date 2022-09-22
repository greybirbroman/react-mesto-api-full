import React from "react";
import { Link, Route } from "react-router-dom";
import logo from "../images/mesto_logo.svg";

function Header({ email, onLogout }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого Место" />

      <Route path="/sign-up">
        <Link to="/sign-in" className="menu__link">
          Войти
        </Link>
      </Route>

      <Route path="/sign-in">
        <Link to="/sign-up" className="menu__link">
          Регистрация
        </Link>
      </Route>

      <Route exact path="/">
        <nav className="menu">
          <span className="menu__text_type_email">{email}</span>
          <Link to="/sign-in" className="menu__link" onClick={onLogout}>
            Выйти
          </Link>
        </nav>
      </Route>
    </header>
  );
}
export default Header;
