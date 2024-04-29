import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root.jsx";
import HomePage from "./pages/HomePage.jsx";
import SettingPage from "./pages/SettingPage.jsx";
import { ThemeProvider } from "./components/theme-provider.jsx";
import Ticket, { loader as modelLoader } from "./pages/Ticket.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: "/",
        element: <HomePage />,
      },
      {
        path: "/ticket",
        element: <Ticket />,
        loader: modelLoader,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
