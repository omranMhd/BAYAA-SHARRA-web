import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import NewAd from "../Pages/NewAd";
import AdDetails from "../Pages/AdDetails";
import UserAdDetails from "../Pages/UserAdDetails";
import Profile from "../Pages/Profile";
import FavoriteAds from "../Pages/FavoriteAds";
import VerevicationCode from "../Pages/VerevicationCode";
import NoMatch from "../Pages/NoMatch";
import ProtectedRoute from "../Components/ProtectedRoute";
import UserInfo from "../Components/UserInfo";
import UserAdvertisements from "../Components/UserAdvertisements";

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
        path: "user-info",
        element: <UserInfo />,
        index: true,
      },
      {
        path: "user-advertisements",
        element: <UserAdvertisements />,
      },
      {
        path: "user-ad-details/:adId",
        element: <UserAdDetails />,
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
