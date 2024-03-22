import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Menu from "./components/common/Menu";
import ScrollToTopButton from "./components/common/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Menu/>
      <main>
        <Outlet />
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
};

export default RootLayout;
