import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from "@chakra-ui/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { url } from './Global/URL';
import axios from 'axios';

const theme = extendTheme({
  colors: {
    dark: {
      100: "#18497a",
      200: "#15406b",
      300: "#12375c",
      400: "#0f2e4d",
      500: "#0c243c",
      600: "#091a2b",
      700: "#06121f",
      800: "#05111f",
      900: "#020e1c"
    },
    font: {
      100: "#e8e8e8",
      200: "#cfcfcf",
      300: "#b8b8b8",
      400: "#9e9e9e",
      500: "#878787",
      600: "#727273",
      700: "#595959",
      800: "#424242",
      900: "#262626"
    },
    brand: {
      pink: "#f65164",
      orange: "#f46e68",
      violet: "#7033ff",
      blue: "#4e7cff",
      cyan: "#22c0ff",
      green: "#7ccc3a",
      font1: "#ce06ff",
      font2: "#9700ee"
    }
  },
})

const BASE_URL = url;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey, type = 'get' }) => {
        if (type === 'get') {
          return axios.get(`${BASE_URL}${queryKey}`).then(response => response.data);
        }
      }
    }
  }
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.unregister();

reportWebVitals();
