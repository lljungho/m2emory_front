import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './MosaicMemory/utils/redux/store';

import Wrap from './MosaicMemory/Wrap';
import ScrollToTop from './MosaicMemory/utils/ScrollToTop';

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <ScrollToTop />
        <Wrap />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
