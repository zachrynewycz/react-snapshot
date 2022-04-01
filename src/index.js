import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//Lyket
import { Provider } from '@lyket/react';

const likeTheme = { colors: { text: '#444444' }, fonts: { body: 'Pop-M' } }

ReactDOM.render(
    <Provider theme={likeTheme} apiKey='pt_25ee599c30576a6fe2f9b215a6f09a'>
        <App />
    </Provider>,
    document.getElementById('root')
);