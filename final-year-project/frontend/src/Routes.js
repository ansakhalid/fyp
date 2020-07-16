import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './customer/Signup';
import Signin from './customer/Signin';
import Home from './Components/homepage';
import PrivateRoute from './path/Privatepath';
import Dashboard from './customer/UserDashboard';
import AdminRoute from './path/Adminpath';
import DesignerRoute from './path/Designerpath';
import AdminDashboard from './admin/AdminDashboard';
import AddCategory from './admin/addcategory';
import AddProduct from './designer/addproduct';
import Shop from './Components/shoppage';
import ShopHome from './Components/shophome';
import Product from './Components/product';
import Cart from './Components/shopping';
import Orders from './admin/ordermanagement';
import Record from './admin/record';
import Profile from './customer/Profile';
import ManageProducts from './designer/handleproduct';
import UpdateProduct from './designer/editproduct';
import UpdateCategory from './admin/editcategory';
import DesignerDashboard from './designer/DesignerDashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/shop' exact component={Shop} />
        <Route path='/shophome' exact component={ShopHome} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/signup' exact component={Signup} />
        <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        <DesignerRoute
          path='/designer/dashboard'
          exact
          component={DesignerDashboard}
        />
        <AdminRoute path='/create/category' exact component={AddCategory} />
        <DesignerRoute path='/create/product' exact component={AddProduct} />
        <Route path='/product/:productId' exact component={Product} />
        <Route path='/cart' exact component={Cart} />
        <AdminRoute path='/admin/orders' exact component={Orders} />
        <AdminRoute path='/admin/record' exact component={Record} />
        <PrivateRoute path='/profile/:userId' exact component={Profile} />
        <PrivateRoute
          path='/designer/products'
          exact
          component={ManageProducts}
        />
        <DesignerRoute
          path='/designer/product/update/:productId'
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path='/design/category/update/:categoryId'
          exact
          component={UpdateCategory}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
