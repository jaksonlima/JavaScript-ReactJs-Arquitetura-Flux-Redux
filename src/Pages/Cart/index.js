import React, { Component } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { ProductTable, Container, Total } from './styles';
import logoShoes from '../../assests/imagem/tenis1.jpg';
import * as CartsActions from '../../store/modules/cart/actions';
import formatPrice from '../../util/format';
import produce from 'immer';

function Cart({ cart, dispatch, total }) {
  const dispatchHookes = useDispatch();

  function incremente(product) {
    dispatchHookes(
      CartsActions.updateAmountRequest(product.id, product.amount + 1)
    );
  }

  function decremente(product) {
    dispatchHookes(
      CartsActions.updateAmountRequest(product.id, product.amount - 1)
    );
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Produto</th>
            <th>Quantidade</th>
            <th>SubTotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.price}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decremente(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="text" readOnly value={product.amount} />
                  <button type="button" onClick={() => incremente(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'REMOVE_CART', id: product.id })
                  }
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button>Continuar</button>
        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subTotal: product.price * product.amount,
  })),

  total: state.cart.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0),
});

export default connect(mapStateToProps)(Cart);
