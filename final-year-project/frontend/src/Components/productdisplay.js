import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './image';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cart';
import { FaStar } from 'react-icons/fa';
import Rating from 'react-rating';
import { isAuthenticated } from '../path/fetchprofiling';
import { addRating } from './Componentsfetch';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  isRatingEnabled = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className='my-2'>
          <button className='btn btn-primary my-2'>View Product</button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className='btn btn-info '>
          Add to cart
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-info badge-pill'>In Stock </span>
    ) : (
      <span className='badge badge-secondary badge-pill'>Out of Stock </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className='btn btn-danger my-2'
        >
          Remove Product
        </button>
      )
    );
  };

  const setRating = (rating) => {
    addRating(userId, product._id, token, rating)
      .then((response) => {
        alert('Rating Added!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='product'>
      <span className='img-prod'>
        {product.photo && (
          <img className='img-fluid' src={`${product.photo}`} alt='Image' />
        )}
        {/* <span className='status'>
          {product.category && product.category.name}
        </span> */}
      </span>
      <div className='text py-3 px-3'>
        {shouldRedirect(redirect)}
        <h3>{product.name}</h3>
        <div className='d-flex'>
          <div className='pricing'>
            <p className='price'>
              <span>${product.price}</span>
            </p>
          </div>
        </div>
        <span>{showStock(product.quantity)}</span>
        <p className='small'>{product.description.substring(0, 50)} </p>
        <span>
          <Rating
            readonly={
              !isRatingEnabled ||
              (isRatingEnabled &&
                product.rating &&
                product.rating.length > 0 &&
                product.rating.find((r) => r.user === userId))
            }
            initialRating={
              product.rating && product.rating.length > 0
                ? product.rating.reduce((sum, val) => val.rating + sum, 0) /
                  product.rating.length
                : 0
            }
            stop={5}
            emptySymbol={<i className='fa fa-star-o fa-2x medium'></i>}
            fullSymbol={
              <i
                className='fa fa-star fa-2x medium'
                style={{ color: 'orange' }}
              ></i>
            }
            onChange={setRating}
          />
          {product.rating && product.rating.length > 0 && (
            <>
              <span className='small'>
                (
                {product.rating.reduce((sum, val) => val.rating + sum, 0) /
                  product.rating.length}{' '}
                / 5)
              </span>
              <br />
              <span className='small'>({product.rating.length} Ratings)</span>
            </>
          )}
        </span>
        <p className='small'>Added: {moment(product.createdAt).fromNow()}</p>
        <hr />
        <div style={{ textAlign: 'center' }}>
          {showAddToCartBtn(showAddToCartButton)}
          {showViewButton(showViewProductButton)}
          {showRemoveButton(showRemoveProductButton)}
          {showCartUpdateOptions(cartUpdate)}
        </div>
      </div>
    </div>
  );
};

export default Card;
