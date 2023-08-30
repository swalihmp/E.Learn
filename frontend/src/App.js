import { BrowserRouter as Router} from 'react-router-dom';
import Proutes from './components/Routes';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
        <Router>
           <Proutes/>
       </Router>
    </Provider>
   
  );
}

export default App;
