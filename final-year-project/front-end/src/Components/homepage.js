import React from 'react';
import Layout from './deafaultdesign';


import ShopHome from './shophome';


const Home = () => {
   

    return (
        <Layout 
            title="Welcome To Art-Ink"
            description="Custom designed fashionable and trendy clothes brought to you at your home in a click "
            className="container-fluid"
        >
      
    

            <ShopHome />

       
        </Layout>
    );
};

export default Home;