import { BrowserRouter } from 'react-router';

import { DataProvider } from './Data/Data';
import LayoutLoader from './Layouts/LayoutLoader';



function App() {


  return (
    <BrowserRouter>
      <DataProvider>

        <LayoutLoader/>

      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
