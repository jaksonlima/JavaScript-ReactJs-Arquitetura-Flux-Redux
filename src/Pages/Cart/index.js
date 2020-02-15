import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { ProductTable, Container, Total } from './styles';
import * as CartsActions from '../../store/modules/cart/actions';

export default function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subTotal: product.price * product.amount,
    }))
  );

  const total = useSelector(state =>
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  );

  function incremente(product) {
    dispatch(CartsActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decremente(product) {
    dispatch(CartsActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function remove(product) {
    dispatch(CartsActions.removeToCart(product));
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
            <tr key={product.id}>
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
                <button type="button" onClick={() => remove(product)}>
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
