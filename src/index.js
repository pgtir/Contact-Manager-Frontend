import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../src/theme"
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);


