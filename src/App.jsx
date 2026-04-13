import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { NotFound } from "./pages/NotFound";

import './App.css';
import { Header, Footer } from './components/index';
import { Home, GenerateQrCode, Projects, Contact, Privacy, Terms } from './pages/index';

// 🏠 Create a general layout that includes the header and footer.
const Layout = () => (
  <>
    <Header />
    <Outlet /> {/* It will be replaced with the content of each page.*/}
    <Footer />
  </>
);

// 🔄 Define new routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // // 🏠 All pages will be inside Layout
    children: [
      { path: "/", element: <Home /> },
      { path: "/generateQrCode", element: <GenerateQrCode /> },
      { path: "/contact", element: <Contact /> },
      { path: "/projects", element: <Projects /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/terms", element: <Terms /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// 🏠 Main application
function App() {
  return <RouterProvider router={router} />;
}

export default App;
