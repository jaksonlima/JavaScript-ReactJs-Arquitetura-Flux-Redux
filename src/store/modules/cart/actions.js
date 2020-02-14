export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

export function addToCartSucess(product) {
  return {
    type: '@cart/ADD_SUCESS',
    product,
  };
}

export function removeToCart(product) {
  return {
    type: '@cart/REMOVE_TO_CART',
    id: product.id,
  };
}

export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  };
}

export function updateAmountSucess(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCESS',
    id,
    amount,
  };
}
