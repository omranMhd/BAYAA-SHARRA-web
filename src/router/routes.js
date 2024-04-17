import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import NewAd from "../Pages/NewAd";
import AdDetails from "../Pages/AdDetails";
import Profile from "../Pages/Profile";
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
      <ProtectedRoute>
        <NewAd />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ad-details/:adId",
    element: <AdDetails />,
  },
  {
    path: "/verevication-code",
    element: <VerevicationCode length={4} />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
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
