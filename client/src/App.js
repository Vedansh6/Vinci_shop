import Navbar from 'react-bootstrap/Navbar';
import { Link,BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import HomeScreen from './screens/HomeScreen';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import ProductScreen from './screens/ProductScreen';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './Store';
import { useContext } from 'react';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAdressScreen';
import SignupScreen from './screens/SignupScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
  };
  return (
    <BrowserRouter>
      <div>
      <ToastContainer position="bottom-center" limit={1} />
        <header>
        <Navbar variant="dark">
          {/* what is variant? */}
            {/* <Container> */}
              <LinkContainer to="/"> 
                <Navbar.Brand>Vinci</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.length}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            {/* </Container> */}
          </Navbar>
        </header>
        <main>
          {/* xyxxx */}
          {/* <Container> */}
            <Routes>
            <Route path="/" element = {<HomeScreen/>}/> 
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />}/>
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/payment/:id" element={<PaymentScreen />} />
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route
                path="/orderhistory"
                element={<OrderHistoryScreen />}
              ></Route>
          </Routes>
          {/* </Container> */}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
