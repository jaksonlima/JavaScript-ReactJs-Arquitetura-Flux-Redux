import React, { Component } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { connect, useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { formatPrice } from '../../util/format';
import api from '../../services/api';
import { ProductList } from './styles';
import * as CartsActions from '../../store/modules/cart/actions';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const reponse = await api.get('/products');

    this.setState({ products: reponse.data });
  }

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.price}</span>

            <button
              type="button"
              onClick={() =>
                this.props.dispatch(CartsActions.addToCartRequest(product.id))
              }
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
                {amount[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

export default connect(mapStateToProps)(Home);
