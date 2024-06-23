import { useState, useRef } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import AppRouter from "./../routes/AppRoutes";

function App() {

    return (
        <HelmetProvider>
            <RouterProvider router={createBrowserRouter(AppRouter)} />
            <ToastContainer 
                position="top-right"
                autoClose={8000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="colored"
            />
        </HelmetProvider>
    )
}

export default App