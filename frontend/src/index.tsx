import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import {persistor, store} from './app/store';
import {BrowserRouter} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import {addInterceptors} from './axios-api';
import {GOOGLE_CLIENT_ID} from './constants';
import {GoogleOAuthProvider} from '@react-oauth/google';

addInterceptors(store);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<BrowserRouter>
					<App/>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</GoogleOAuthProvider>,
);