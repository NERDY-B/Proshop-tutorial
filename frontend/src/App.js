import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './component/Header';
import Footer from './component/Footer';
import HomeScreen from './screens/HomeScreen';
import Test from './screens/Test';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          {/* ask abiola or nedu how does route connect with component props used in 
          the component definition, seeing that <Route> doesnt specify props */}
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/test' component={Test} exact />
          <Route path='/product/:id' component={ProductScreen} exact />
          <Route path='/cart/:id?' component={CartScreen} exact />
          <Route path='/admin/userlist' component={UserListScreen} exact />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} exact />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} exact />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
          <Route path='/admin/orderlist' component={OrderListScreen} exact />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          {/* ask nedu: brad said this is a query string, so means query in react route is different for backend */}
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
