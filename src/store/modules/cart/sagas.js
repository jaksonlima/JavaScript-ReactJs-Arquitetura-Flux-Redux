import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '../../../services/history';

import { addToCartSucess, updateAmountSucess } from './actions';
import api from '../../../services/api';

//async igual * // await igual yeild

function* addToCart({ id, ...action }) {
  const cartProductExists = yield select(state =>
    state.cart.find(cart => cart.id === id)
  );

  const responseStock = yield call(api.get, `/stock/${id}`);

  const stockAmount = responseStock.data.amount;
  const cartStockAmount = cartProductExists ? cartProductExists.amount : 0;

  const amount = cartStockAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitado fora de estoque.');
    return;
  }

  if (cartProductExists) {
    yield put(updateAmountSucess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      price: response.data.price,
    };

    yield put(addToCartSucess(data));

    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);
  const sctockAmount = stock.data.amount;

  if (amount > sctockAmount) {
    toast.error('Quantidade solicitado fora de estoque.');
    return;
  }

  yield put(updateAmountSucess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
