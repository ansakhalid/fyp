import React, { useState, useEffect } from 'react';
import Layout from './deafaultdesign';
import { read, listRelated } from './Componentsfetch';
import Card from './productdisplay';
import SingleProduct from './SingleProduct';

const Product = (props) => {
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <>
      <Layout
        title={product && product.name}
        description={
          product &&
          product.description &&
          product.description.substring(0, 100)
        }
        className='container-fluid'
      />
      <section className='ftco-section bg-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              {/* {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )} */}
              {product && <SingleProduct product={product} />}
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <h4>Related products</h4>
              <div className='container'>
                <div className='row'>
                  {relatedProduct.map((p, i) => (
                    <div className='col-xs-12 col-md-4 col-xl-3' key={i}>
                      <Card product={p} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
