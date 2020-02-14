import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart, Img } from './styles';
import logoShoes from '../../assests/imagem/logoShoes.svg';

function Header({ cart }) {
  const { cartuser } = useSelector(state => state);

  return (
    <Container>
      <Link to="/">
        <Img src={logoShoes} alt="Rocketshoes" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>{cart.length}</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}

export default connect(state => ({ cart: state.cart }))(Header);
