import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {loginRoutes} from "./routes/login.route"; 
import { mainRoute } from './routes/main.route';
import reduxStore from './store';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import { Provider } from 'react-redux';


const router= createBrowserRouter([...loginRoutes,...mainRoute]);
const queryClient= new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={reduxStore}>
    <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
     </QueryClientProvider>
    </Provider>

     


 
  </React.StrictMode>,
)
