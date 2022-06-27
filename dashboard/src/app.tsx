import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './redux/store';

import Routes from "./routes";

const App = () => {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <Routes />
         </PersistGate>
      </Provider>
   )
}


export default App;