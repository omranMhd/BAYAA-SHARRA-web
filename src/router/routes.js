import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import NewAd from "../Pages/NewAd";
import TestNav from "../Pages/TestNav";
import AdDetails from "../Pages/AdDetails";
import Profile from "../Pages/Profile";
import FavoriteAds from "../Pages/FavoriteAds";
import VerevicationCode from "../Pages/VerevicationCode";
import NoMatch from "../Pages/NoMatch";
import ProtectedRoute from "../Components/ProtectedRoute";

//we can create routes using array of objects
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: async ({ request, params }) => {
      // return fetch(`/fake/api/teams/${params.teamId}.json`, {
      //   signal: request.signal,
      // });
      console.log(request);
      console.log(params);
      return "this from loader function";
    },
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/new-ad",
    element: (
      <ProtectedRoute userShouldBe="logedin">
        <NewAd />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ad-details/:adId",
    element: (
      <ProtectedRoute userShouldBe="logedin">
        <AdDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/verevication-code",
    element: (
      <ProtectedRoute userShouldBe="registered">
        <VerevicationCode />
      </ProtectedRoute>
    ),
  },
  {
    path: "/favorite-ads",
    element: (
      <ProtectedRoute userShouldBe="logedin">
        <FavoriteAds />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute userShouldBe="logedin">
        <Profile />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "my-info",
        element: <h2>my info</h2>,
      },
      {
        path: "my-ads",
        element: <h2>my Ads</h2>,
      },
      {
        path: "favorates-ads",
        element: <h2>my favorates</h2>,
        index: true,
      },
    ],
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]);

// or this using JSX

export default routes;
