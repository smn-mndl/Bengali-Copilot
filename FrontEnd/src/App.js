import { useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import Navbar from "./js/scenes/navbar/Navbar";
import FormComponent from "./form";
import PageToast from "./js/components/page-toast/PageToast";

import {
  pageToastSelector,
  serviceLoaderSelector,
} from "./js/redux/selectors/appSelectors";
import LoadingPage from "./js/components/loading-page/LoadingPage";

const LazyServiceLoader = lazy(() =>
  import("./js/components/service-loader/ServiceLoader")
);

const LazyLandingPage = lazy(() => import("./js/scenes/homepage/HomePage"));
const LazyLoginPage = lazy(() => import("./js/scenes/signin/SignIn"));
const LazyRegisterPage = lazy(() => import("./js/scenes/signup/SignUp"));
const LazyExplorePage = lazy(() => import("./js/scenes/explore/Explore"));
const LazyDisplayPage = lazy(() => import("./js/scenes/display/Display"));
const LazyProfile = lazy(() => import("./js/scenes/profile/Profile"));
const LazyAbout = lazy(() => import("./js/scenes/about/About"));

function App() {
  const serviceLoader = useSelector(serviceLoaderSelector);
  const pageToast = useSelector(pageToastSelector);
  const [currentTab, setCurrentTab] = useState("");

  const url = window.location.href;
  const route = url.split("/")[3];

  return (
    <>
      <Suspense fallback={<LoadingPage text="Loading..." />}>
        {serviceLoader ? <LazyServiceLoader /> : null}
        {pageToast.show && (
          <PageToast
            toastType={pageToast.toastType}
            toastMsg={pageToast.toastMsg}
          />
        )}
        <Suspense fallback={<LoadingPage text="Loading..." />}>
          <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <main className={`app-content app-content-${route}`}>
            <Routes>
              <Route path="/" element={<LazyLandingPage />}></Route>
              <Route path="/login" element={<LazyLoginPage />}></Route>
              <Route path="/signup" element={<LazyRegisterPage />}></Route>
              <Route path="/explore" element={<LazyExplorePage />}></Route>
              <Route path="/form" element={<FormComponent />}></Route>
              <Route path="/display" element={<LazyDisplayPage />}></Route>
              <Route path="/profile" element={<LazyProfile />}></Route>
              <Route path="/about" element={<LazyAbout />}></Route>
            </Routes>
          </main>
          <footer>© 2024 Bengali Copilot. All rights reserved.</footer>
        </Suspense>
      </Suspense>
    </>
  );
}

export default App;
