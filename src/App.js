import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Error from './components/Error/Error';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';

import OrderReview from './components/OrderReview/OrderReview';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import Shop from './components/Shop/Shop';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <OrderReview></OrderReview>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route path="/placeorder">
            <PlaceOrder></PlaceOrder>
          </Route>
          <Route path="*">
            <Error></Error>
          </Route>
        </Switch>


      </BrowserRouter>


    </div>
  );
}

export default App;
