import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ContextProvider from './components/Contexts/AppContext';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ContextProvider><BrowserRouter><App /></BrowserRouter></ContextProvider>);
