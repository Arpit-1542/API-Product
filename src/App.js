import './App.css';
import Product from './Components/Product';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductD from './Components/ProductD';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import Header from './Components/Header';
import Cart from './Components/Cart';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Product />} />
            <Route path='/productD/:id' element={<ProductD />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
