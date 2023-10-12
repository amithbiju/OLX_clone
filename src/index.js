import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './assets/store/FirebaseContext'
import {Firebase} from './firebase/Config'
import Context from './assets/store/FirebaseContext'
import Post from './assets/store/PostContext';
ReactDOM.render(
    <FirebaseContext.Provider value={{Firebase}}>

        <Context>
            <Post>
        <App />
        </Post>
        </Context>
    </FirebaseContext.Provider>
, document.getElementById('root'));
