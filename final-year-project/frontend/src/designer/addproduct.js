import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Components/deafaultdesign';
import { isAuthenticated } from '../path/fetchprofiling';

import { createProduct } from './fetchdesigner';
import { getCategories } from '../admin/fetchadmin';

// Shirts
import WhiteShirt from '../images/Shirts/White.png';
import YellowShirt from '../images/Shirts/Yellow.png';
import GreenShirt from '../images/Shirts/Green.png';
import BlueShirt from '../images/Shirts/Blue.png';
import PurpleShirt from '../images/Shirts/Purple.png';
import RedShirt from '../images/Shirts/Red.png';
import GreyShirt from '../images/Shirts/bright-grey.png';
import DarkPinkShirt from '../images/Shirts/dark-pink.png';
import LightBlueShirt from '../images/Shirts/light-blue.png';
import LightPinkShirt from '../images/Shirts/light-pink.png';
import OrangeShirt from '../images/Shirts/orange.png';
import PeachShirt from '../images/Shirts/peach.png';

// Hoodies
import WhiteHoodie from '../images/Hoodies/White.png';
import YellowHoodie from '../images/Hoodies/Yellow.png';
import GreenHoodie from '../images/Hoodies/Green.png';
import BlueHoodie from '../images/Hoodies/Blue.png';
import PurpleHoodie from '../images/Hoodies/Purple.png';
import RedHoodie from '../images/Hoodies/Red.png';
import GreyHoodie from '../images/Hoodies/grey.png';
import DarkPinkHoodie from '../images/Hoodies/dark-pink.png';
import LightBlueHoodie from '../images/Hoodies/light-blue.png';
import LightPinkHoodie from '../images/Hoodies/light-pink.png';
import OrangeHoodie from '../images/Hoodies/orange.png';
import PeachHoodie from '../images/Hoodies/peach.png';

// Sweaters
import WhiteSweater from '../images/Sweaters/White.png';
import YellowSweater from '../images/Sweaters/Yellow.png';
import GreenSweater from '../images/Sweaters/Green.png';
import BlueSweater from '../images/Sweaters/Blue.png';
import PurpleSweater from '../images/Sweaters/Purple.png';
import RedSweater from '../images/Sweaters/Red.png';
import GreySweater from '../images/Sweaters/grey.png';
import DarkPinkSweater from '../images/Sweaters/dark-pink.png';
import LightBlueSweater from '../images/Sweaters/light-blue.png';
import LightPinkSweater from '../images/Sweaters/light-pink.png';
import OrangeSweater from '../images/Sweaters/orange.png';
import PeachSweater from '../images/Sweaters/peach.png';

// Trousers
import WhiteTrouser from '../images/Trousers/White.png';
import YellowTrouser from '../images/Trousers/Yellow.png';
import GreenTrouser from '../images/Trousers/Green.png';
import BlueTrouser from '../images/Trousers/Blue.png';
import PurpleTrouser from '../images/Trousers/Purple.png';
import RedTrouser from '../images/Trousers/Red.png';
import GreyTrouser from '../images/Trousers/grey.png';
import DarkPinkTrouser from '../images/Trousers/dark-pink.png';
import LightBlueTrouser from '../images/Trousers/light-blue.png';
import LightPinkTrouser from '../images/Trousers/light-pink.png';
import OrangeTrouser from '../images/Trousers/orange.png';
import PeachTrouser from '../images/Trousers/peach.png';

const AddProduct = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const imagePhotoRef = useRef(null);

  const [previewData, setPreviewData] = useState({
    text: '',
    textSize: '30',
    xPosition: '100',
    yPosition: '100',
    maxWidth: '0',
    rotationDegrees: '0',
    textColor: 'black',
    imageXPosition: '100',
    imageYPosition: '100',
    imageWidth: '100',
    imageHeight: '100',
  });

  const {
    text,
    textSize,
    xPosition,
    yPosition,
    maxWidth,
    rotationDegrees,
    textColor,
    imageXPosition,
    imageYPosition,
    imageWidth,
    imageHeight,
  } = previewData;

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '1',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
    imageURL: '',
    imagePhotoURL: '',
    productType: '',
    productColor: '',
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    designername,
    quantity,
    shipping,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
    imageURL,
    imagePhotoURL,
    productType,
    productColor,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  const [initCalled, setInitCalled] = useState(false);

  useEffect(() => {
    if (!initCalled) {
      init();
      setInitCalled(true);
    }

    // Update the image URL
    updateImageURL();
    // setImageDataURL();

    // Regenrate the image on canvas when image or customization property changes
    // previewImage();
  }, [imageURL, imagePhotoURL, previewData, productType, productColor]);

  const [disableMoreColors, setDisableMoreColors] = useState(true);

  const handleChange = (name) => (event) => {
    let value = name === 'photo' ? event.target.files[0] : event.target.value;
    if (name === 'productColor') {
      if (value < 6) {
        setDisableMoreColors(true);
      } else {
        setDisableMoreColors(false);
      }
    }
    formData.set('shipping', shipping);
    formData.set(name, value);
    setValues({ ...values, [name]: value });

    // if (name === 'photo') {
    //   const reader = new FileReader();

    //   reader.onload = (e) => {
    //     setValues({ ...values, imageURL: e.target.result });
    //   };

    //   if (event.target.files[0] !== undefined) {
    //     reader.readAsDataURL(event.target.files[0]);
    //   }
    // }

    if (name === 'imagePhoto') {
      const reader = new FileReader();

      reader.onload = (e) => {
        setValues({ ...values, imagePhotoURL: e.target.result });
      };

      if (event.target.files[0] !== undefined) {
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  };

  const setImageDataURL = (image) => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, 500, 500);

    const newImage = new Image();
    newImage.src = image;
    newImage.onload = () => {
      context.drawImage(newImage, 0, 0, 500, 500);
      previewImage();
    };
  };

  // This function will update the image url
  const updateImageURL = () => {
    switch (productType) {
      case '0':
        switch (productColor) {
          case '0':
            setImageDataURL(RedShirt);
            break;
          case '1':
            setImageDataURL(BlueShirt);
            break;
          case '2':
            setImageDataURL(GreenShirt);
            break;
          case '3':
            setImageDataURL(YellowShirt);
            break;
          case '4':
            setImageDataURL(WhiteShirt);
            break;
          case '5':
            setImageDataURL(PurpleShirt);
            break;
          case '7':
            setImageDataURL(GreyShirt);
            break;
          case '8':
            setImageDataURL(DarkPinkShirt);
            break;
          case '9':
            setImageDataURL(LightBlueShirt);
            break;
          case '10':
            setImageDataURL(LightPinkShirt);
            break;
          case '11':
            setImageDataURL(OrangeShirt);
            break;
          case '12':
            setImageDataURL(PeachShirt);
            break;
          default:
            break;
        }
        break;
      case '1':
        switch (productColor) {
          case '0':
            setImageDataURL(RedHoodie);
            break;
          case '1':
            setImageDataURL(BlueHoodie);
            break;
          case '2':
            setImageDataURL(GreenHoodie);
            break;
          case '3':
            setImageDataURL(YellowHoodie);
            break;
          case '4':
            setImageDataURL(WhiteHoodie);
            break;
          case '5':
            setImageDataURL(PurpleHoodie);
            break;
          case '7':
            setImageDataURL(GreyHoodie);
            break;
          case '8':
            setImageDataURL(DarkPinkHoodie);
            break;
          case '9':
            setImageDataURL(LightBlueHoodie);
            break;
          case '10':
            setImageDataURL(LightPinkHoodie);
            break;
          case '11':
            setImageDataURL(OrangeHoodie);
            break;
          case '12':
            setImageDataURL(PeachHoodie);
            break;
          default:
            break;
        }
        break;
      case '2':
        switch (productColor) {
          case '0':
            setImageDataURL(RedSweater);
            break;
          case '1':
            setImageDataURL(BlueSweater);
            break;
          case '2':
            setImageDataURL(GreenSweater);
            break;
          case '3':
            setImageDataURL(YellowSweater);
            break;
          case '4':
            setImageDataURL(WhiteSweater);
            break;
          case '5':
            setImageDataURL(PurpleSweater);
            break;
          case '7':
            setImageDataURL(GreySweater);
            break;
          case '8':
            setImageDataURL(DarkPinkSweater);
            break;
          case '9':
            setImageDataURL(LightBlueSweater);
            break;
          case '10':
            setImageDataURL(LightPinkSweater);
            break;
          case '11':
            setImageDataURL(OrangeSweater);
            break;
          case '12':
            setImageDataURL(PeachSweater);
            break;
          default:
            break;
        }
        break;
      case '3':
        switch (productColor) {
          case '0':
            setImageDataURL(RedTrouser);
            break;
          case '1':
            setImageDataURL(BlueTrouser);
            break;
          case '2':
            setImageDataURL(GreenTrouser);
            break;
          case '3':
            setImageDataURL(YellowTrouser);
            break;
          case '4':
            setImageDataURL(WhiteTrouser);
            break;
          case '5':
            setImageDataURL(PurpleTrouser);
            break;
          case '7':
            setImageDataURL(GreyTrouser);
            break;
          case '8':
            setImageDataURL(DarkPinkTrouser);
            break;
          case '9':
            setImageDataURL(LightBlueTrouser);
            break;
          case '10':
            setImageDataURL(LightPinkTrouser);
            break;
          case '11':
            setImageDataURL(OrangeTrouser);
            break;
          case '12':
            setImageDataURL(PeachTrouser);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  const handlePreviewDataChange = (e) => {
    setPreviewData({ ...previewData, [e.target.name]: e.target.value });
  };

  // This function will handle the previewing of image
  const previewImage = () => {
    const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
      var words = text.split(' ');
      var line = '';

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, x, y);
    };

    const context = canvasRef.current.getContext('2d');
    // context.clearRect(0, 0, 500, 500);

    switch (textColor) {
      case 'black':
        context.fillStyle = '#000000';
        break;
      case 'white':
        context.fillStyle = '#ffffff';
        break;
      case 'red':
        context.fillStyle = '#ff0000';
        break;
      case 'blue':
        context.fillStyle = '#0000ff';
        break;
      case 'green':
        context.fillStyle = '#00ff00';
        break;
      case 'yellow':
        context.fillStyle = '#ffff00';
        break;
      case 'purple':
        context.fillStyle = '#800080';
        break;
      default:
        break;
    }

    context.font = `normal normal bold ${textSize}px arial`;

    if (maxWidth !== '0' && rotationDegrees === '0') {
      wrapText(
        context,
        text,
        parseInt(xPosition),
        parseInt(yPosition),
        parseInt(maxWidth),
        parseInt(textSize)
      );
    } else if (maxWidth !== '0' && rotationDegrees !== '0') {
      context.save();
      context.rotate((parseInt(rotationDegrees) * Math.PI) / 180);
      wrapText(
        context,
        text,
        parseInt(xPosition),
        parseInt(yPosition),
        parseInt(maxWidth),
        parseInt(textSize)
      );
      context.restore();
    } else if (maxWidth === '0' && rotationDegrees !== '0') {
      context.save();
      context.rotate((parseInt(rotationDegrees) * Math.PI) / 180);
      context.fillText(text, parseInt(xPosition), parseInt(yPosition));
      context.restore();
    } else {
      context.fillText(text, parseInt(xPosition), parseInt(yPosition));
    }

    context.drawImage(
      imagePhotoRef.current,
      imageXPosition,
      imageYPosition,
      imageWidth,
      imageHeight
    );
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    formData.set('finalImageURL', canvasRef.current.toDataURL());

    setValues({ ...values, error: '', loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          designername: '',
          quantity: '',
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <h2>Product details</h2>
      <div className='form-group'>
        <label>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>

      <div className='form-group'>
        <label>Description</label>
        <textarea
          onChange={handleChange('description')}
          className='form-control'
          value={description}
        />
      </div>

      <div className='form-group'>
        <label>Designer Name</label>
        <input
          onChange={handleChange('designername')}
          type='text'
          className='form-control'
          value={designername}
        />
      </div>

      <div className='form-group'>
        <label>Price</label>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          value={price}
        />
      </div>

      {/* <div className='form-group'>
        <label>Shipping</label>
        <select
          onChange={handleChange('shipping')}
          className='form-control'
          value={shipping}
        >
          <option>Please select</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div> */}

      <div className='form-group'>
        <label>Category</label>
        <select
          onChange={handleChange('category')}
          className='form-control'
          value={category}
        >
          <option value=''>Please select</option>
          {categories.map((category) => (
            <option value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Quantity</label>
        <input
          onChange={handleChange('quantity')}
          type='number'
          className='form-control'
          value={quantity}
        />
      </div>

      {/* <div className='form-group'>
        <label>Image</label>
        <input
          onChange={handleChange('photo')}
          type='file'
          name='photo'
          accept='image/*'
          className='form-control'
        />
      </div> */}

      <div className='form-row'>
        <div className='col'>
          <label>Product type</label>
          <select
            onChange={handleChange('productType')}
            className='form-control'
            value={productType}
          >
            <option value=''>Please select</option>
            <option value='0'>Shirt</option>
            <option value='1'>Hoodie</option>
            <option value='2'>Sweater</option>
            <option value='3'>Trouser</option>
          </select>
        </div>

        <div className='col'>
          <label>Product color</label>
          <select
            onChange={handleChange('productColor')}
            className='form-control'
            value={productColor}
          >
            <option value=''>Please select</option>
            <option value='0'>Red</option>
            <option value='1'>Blue</option>
            <option value='2'>Green</option>
            <option value='3'>Yellow</option>
            <option value='4'>White</option>
            <option value='5'>Purple</option>
            <option value='6'>More colors</option>
          </select>
        </div>

        <div className='col'>
          <label>Product color</label>
          <select
            onChange={handleChange('productColor')}
            className='form-control'
            value={productColor}
            disabled={disableMoreColors}
          >
            <option value=''>Please select</option>
            <option value='7'>Grey</option>
            <option value='8'>Dark Pink</option>
            <option value='9'>Light Blue</option>
            <option value='10'>Light Pink</option>
            <option value='11'>Orange</option>
            <option value='12'>Peach</option>
          </select>
        </div>
      </div>

      <h2>Product customization</h2>
      <div className='form-group'>
        <label>Text</label>
        <input
          onChange={(e) => handlePreviewDataChange(e)}
          type='text'
          className='form-control'
          name='text'
          value={text}
        />
      </div>

      <div className='form-row mb-3'>
        <div className='col'>
          <label>Text size</label>
          <input
            onChange={(e) => handlePreviewDataChange(e)}
            type='number'
            className='form-control'
            name='textSize'
            value={textSize}
          />
        </div>
        <div className='col'>
          <label>X Position</label>
          <input
            onChange={(e) => handlePreviewDataChange(e)}
            type='number'
            className='form-control'
            name='xPosition'
            value={xPosition}
          />
        </div>
        <div className='col'>
          <label>Y Position</label>
          <input
            onChange={(e) => handlePreviewDataChange(e)}
            type='number'
            className='form-control'
            name='yPosition'
            value={yPosition}
          />
        </div>
      </div>

      <div className='form-row mb-3'>
        <div className='col'>
          <label>Max width</label>
          <input
            onChange={(e) => handlePreviewDataChange(e)}
            type='number'
            className='form-control'
            name='maxWidth'
            value={maxWidth}
          />
        </div>
        <div className='col'>
          <label>Rotation degrees</label>
          <input
            onChange={(e) => handlePreviewDataChange(e)}
            type='number'
            className='form-control'
            name='rotationDegrees'
            value={rotationDegrees}
          />
        </div>
        <div className='col'>
          <label>Text color</label>
          <select
            onChange={(e) => handlePreviewDataChange(e)}
            className='form-control'
            name='textColor'
            value={textColor}
          >
            <option value='black'>Black</option>
            <option value='white'>White</option>
            <option value='red'>Red</option>
            <option value='blue'>Blue</option>
            <option value='yellow'>Yellow</option>
            <option value='green'>Green</option>
            <option value='purple'>Purple</option>
          </select>
        </div>
      </div>

      <div className='form-group'>
        <label>Logo</label>
        <input
          onChange={handleChange('imagePhoto')}
          type='file'
          name='photo'
          accept='image/*'
          className='form-control'
        />
      </div>

      <div className='form-row mb-3'>
        <div className='col'>
          <label>Image X Position</label>
          <input
            onChange={(e) => handlePreviewDataChange(e)}
            type='number'
            className='form-control'
            name='imageXPosition'
            value={imageXPosition}
          />
        </div>
        <div className='col'>
          <label>Image Y Position</label>
          <input
            onChange={(e) => handlePreviewDataChange(e)}
            type='number'
            className='form-control'
            name='imageYPosition'
            value={imageYPosition}
          />
        </div>
        <div className='col'>
          <label>Image Width</label>
          <input
            onChange={(e) => handlePreviewDataChange(e)}
            type='number'
            className='form-control'
            name='imageWidth'
            value={imageWidth}
          />
        </div>
        <div className='col'>
          <label>Image Height</label>
          <input
            onChange={(e) => handlePreviewDataChange(e)}
            type='number'
            className='form-control'
            name='imageHeight'
            value={imageHeight}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '1rem auto' }}>
        {/* Loading the canvas */}
        <canvas
          ref={canvasRef}
          width='500px'
          height='500px'
          style={{ backgroundColor: 'lightgray' }}
        ></canvas>
        <img ref={imageRef} src={imageURL} alt='' />
        <img
          ref={imagePhotoRef}
          src={imagePhotoURL}
          alt=''
          style={{ display: 'none' }}
        />
      </div>

      <button className='btn btn-primary'>Create Product</button>
    </form>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h2>{`${createdProduct}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <>
      <Layout
        title='Add New Product'
        description='You can add new products by filling the form below.'
      />
      <section className='ftco-section bg-light'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              {showLoading()}
              {showError()}
              {showSuccess()}
              {newPostForm()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
