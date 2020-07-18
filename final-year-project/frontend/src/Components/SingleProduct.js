import React, { useState } from 'react';
import moment from 'moment';
import { addItem } from './cart';
import { Redirect } from 'react-router-dom';
import Rating from 'react-rating';
import { isAuthenticated } from '../path/fetchprofiling';

function SingleProduct({ product }) {
  const {
    user: { role },
  } = isAuthenticated();

  const [redirect, setRedirect] = useState(false);

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-info badge-pill'>In Stock </span>
    ) : (
      <span className='badge badge-secondary badge-pill'>Out of Stock </span>
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

  return (
    <div class='row'>
      {shouldRedirect(redirect)}

      <div class='col-lg-6 mb-5 ftco-animate fadeInUp ftco-animated'>
        {/* <a href={`${product.photo.data}`} class='image-popup'> */}
        <img
          src={`${product.photo}`}
          class='img-fluid image-popup'
          alt='Image'
        />
        {/* </a> */}
        {/* <a
          href={`${process.env.REACT_APP_API_URL}/product/photo/${product._id}`}
          class="image-popup"
        >
          <img
            src={`${process.env.REACT_APP_API_URL}/product/photo/${product._id}`}
            class="img-fluid"
            alt="Image"
          />
        </a> */}
      </div>
      <div class='col-lg-6 product-details pl-md-5 ftco-animate fadeInUp ftco-animated'>
        <h3>{product.name}</h3>
        <p class='price'>
          <span>${product.price}</span>
        </p>
        <span>{showStock(product.quantity)}</span>

        <p>{product.description}</p>
        <span>
          <Rating
            readonly
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
          />
          {product.rating && product.rating.length > 0 && (
            <>
              <span className='small'>
                (
                {product.rating.reduce((sum, val) => val.rating + sum, 0) /
                  product.rating.length}{' '}
                / 5)
              </span>
              {'  '}
              <span className='small'>({product.rating.length} Ratings)</span>
            </>
          )}
        </span>
        <p className='small'>Added: {moment(product.createdAt).fromNow()}</p>

        {role.toString() !== 'admin' && (
          <button onClick={addToCart} class='btn btn-outline-info py-3 px-5'>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default SingleProduct;
