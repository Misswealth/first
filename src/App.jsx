import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// Redux
import { signout } from './redux/actions/UserActions';
import { listProductCategories } from './redux/actions/ProductActions';
// Route
import { AdminRoute } from './route/AdminRoute';
import {PrivateRoute} from './route/PrivateRoute';
import {SellerRoute} from './route/SellerRoute';
// Components
import { LoadingBoxComp } from './components/LoadingBoxComp';
import {MessageBox} from './components/MessageBox';
import {SearchBoxComp} from './components/SearchBoxComp';
import ChatBox from './components/ChatBox';
// React-Icons
import {FaBars, FaTimes} from 'react-icons/fa';
import {RiShoppingCartFill} from 'react-icons/ri';

// Pages
import {CartPage} from './pages/CartPage';
import {HomePage} from './pages/HomePage';
import {ProductPage} from './pages/ProductPage';
import {Dashboard} from './pages/Dashboard';
import {MapPage} from './pages/MapPage';
import {SearchPage} from './pages/SearchPage';
import {ProductListPage} from './pages/ProductListPage';
import {ProductEditPage} from './pages/ProductEditPage';
import {OrderListPage} from './pages/OrderListPage';
import {OrderHistoryPage} from './pages/OrderHistoryPage';
import {OrderPage} from './pages/OrderPage';
import {UserListPage} from './pages/UserListPage';
import {UserEditPage} from './pages/UserEditPage';
import {SigninPage} from './pages/SigninPage';
import {RegisterPage} from './pages/RegisterPage';
import {SellerPage} from './pages/SellerPage';
import { SupportPage } from './pages/SupportPage';
import { ProfilePage } from './pages/ProfilePage';
import {PaymentMethodPage} from './pages/PaymentMethodPage';
import {PlaceOrderPage} from './pages/PlaceOrderPage';
import {ShippingAddressPage} from './pages/ShippingAddressPage';







function App() { 
  
  

  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div className="no1">
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              < FaBars/>
            </button>
            <Link className="brand" to="/">
              <img src="/images/logo.jpg" alt="" />
            </Link>
          </div>
          <div className="no2">
            <Route
              render={({ history }) => (
                <SearchBoxComp history={history}></SearchBoxComp>
              )}
            ></Route>
          </div>
          <div>
            <Link to="/cart">
              <RiShoppingCartFill/>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isuser && (
              <div className="dropdown">
                <Link to="#user">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <FaTimes/>
              </button>
            </li>
            <div className="no2a">
              <Route
                render={({ history }) => (
                  <SearchBoxComp history={history}></SearchBoxComp>
                )}
              ></Route>
            </div>
            {loadingCategories ? (
              <LoadingBoxComp></LoadingBoxComp>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/seller/:id" component={SellerPage}></Route>
          <Route path="/cart/:id?" component={CartPage}></Route>
          <Route path="/product/:id" component={ProductPage} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditPage}
            exact
          ></Route>
          <Route path="/signin" component={SigninPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/shipping" component={ShippingAddressPage}></Route>
          <Route path="/payment" component={PaymentMethodPage}></Route>
          <Route path="/placeorder" component={PlaceOrderPage}></Route>
          <Route path="/order/:id" component={OrderPage}></Route>
          <Route path="/orderhistory" component={OrderHistoryPage}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchPage}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchPage}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchPage}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchPage}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfilePage}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapPage}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListPage}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListPage}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListPage}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListPage}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditPage}
          ></AdminRoute>

          <AdminRoute
            path="/dashboard"
            component={Dashboard}
          ></AdminRoute>
          <AdminRoute path="/support" component={SupportPage}></AdminRoute>

          <SellerRoute
            path="/productlist/seller"
            component={ProductListPage}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListPage}
          ></SellerRoute>

          <Route path="/" component={HomePage} exact></Route>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          {' '}
        </footer>
      </div>
    </Router>
  );
}

export default App;
