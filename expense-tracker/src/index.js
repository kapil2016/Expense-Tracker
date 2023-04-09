import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ContextProvider from './components/Contexts/AppContext';
import { Provider } from 'react-redux';
import store from './components/States/store';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><ContextProvider><BrowserRouter><App /></BrowserRouter></ContextProvider></Provider>);
