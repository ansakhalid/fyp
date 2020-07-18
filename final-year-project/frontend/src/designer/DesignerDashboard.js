import React, { useEffect, useState } from 'react';
import Layout from '../Components/deafaultdesign';
import { isAuthenticated } from '../path/fetchprofiling';
import { Link } from 'react-router-dom';
import { addAppRating, getUserRating } from '../Components/Componentsfetch';
import Rating from 'react-rating';

const DesignerDashboard = () => {
  const {
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();

  const designerLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header  text-dark'>Designer Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/product'>
              CREATE PRODUCT
            </Link>
          </li>

          <li className='list-group-item'>
            <Link className='nav-link' to='/designer/products'>
              MANAGE LISTING
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const designerInfo = () => {
    return (
      <div className='card mb-5'>
        <h4 className='card-header  text-dark'>User Information</h4>
        <ul className='list-group'>
          <li className='list-group-item text-dark'>{name}</li>
          <li className='list-group-item text-dark'>{email}</li>
          <li className='list-group-item text-dark'>
            {role.toString() === 'designer' ? 'Designer' : 'Registered User'}
          </li>
        </ul>
      </div>
    );
  };

  const userId = isAuthenticated() && isAuthenticated().user._id;

  const loadUserRating = () => {
    getUserRating(userId, token).then((data) => {
      if (data.error) {
        console.log('Rating not found');
        // setError(data.error);
      } else {
        console.log('Rating yeh ha:', data);
        if (data.rating !== null) {
          setUserRating(data.rating.rating);
        }
      }
    });
  };

  const [userRating, setUserRating] = useState(0);

  const setRating = (rating) => {
    addAppRating(userId, token, rating)
      .then((response) => {
        // alert('App Rating Added!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadUserRating();
  }, []);

  return (
    <>
      <Layout
        title='Dashboard'
        description={`Welcome  ${name}!`}
        className='container-fluid'
      ></Layout>
      <section className='ftco-section bg-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-3'>
              {designerLinks()}
              <h4>App Rating</h4>
              <Rating
                initialRating={userRating}
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
            </div>
            <div className='col-9'>{designerInfo()}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DesignerDashboard;
