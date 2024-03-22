import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CampaignPage from "./pages/Campaign-Page";
import RootLayout from "./root-layout";
import "./App.css";
import { MenuContextProvider } from "./hooks/useMenu";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <CampaignPage /> },
      { path: "*", element: <CampaignPage /> },
    ],
  },
]);

function App() {
  return (
    <MenuContextProvider>
      <RouterProvider router={routes} />
    </MenuContextProvider>
  );
}

export default App;
