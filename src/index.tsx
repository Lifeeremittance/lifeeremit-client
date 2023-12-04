import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mixpanel from 'mixpanel-browser';

const AppRouter = React.lazy(() => import("./routes"));

mixpanel.init('01d17aec77c7449f2b21187a997212c2', {debug: true, track_pageview: true, persistence: 'localStorage'});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="wrapper">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        }
      >
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
