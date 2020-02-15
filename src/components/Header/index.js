import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart, Img } from './styles';
import logoShoes from '../../assests/imagem/logoShoes.svg';

export default function Header() {
  const cartLength = useSelector(state => state.cart.length);

  return (
    <Container>
      <Link to="/">
        <Img src={logoShoes} alt="Rocketshoes" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>{cartLength}</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}
