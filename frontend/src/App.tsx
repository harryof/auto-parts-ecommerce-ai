import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import ContactUsPage from "./pages/ContactUsPage";
import NewsPage from "./pages/NewsPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import HowToBuyPage from "./pages/HowToBuyPage";
import AutoServicePage from "./pages/AutoServicePage";
import OriginalCatalogsPage from "./pages/OriginalCatalogsPage";
import NotFoundPage from "./pages/NotFoundPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import SearchPage from "./pages/SearchPage";
import DeliveryPage from "./pages/DeliveryPage";

import AdminPage from "./pages/AdminPage";
import AIChatWidget from "./components/common/AIChatWidget";

function App() {
  return (
    <ThemeProvider>
      <CategoriesProvider>
        <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:categoryId" element={<CatalogPage />} />
          <Route
            path="catalog/:categoryId/:subCategoryId"
            element={<CatalogPage />}
          />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="contact-us" element={<ContactUsPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<NewsDetailPage />} />
          <Route path="how-to-buy" element={<HowToBuyPage />} />
          <Route path="autoservice" element={<AutoServicePage />} />
          <Route path="original-catalogs" element={<OriginalCatalogsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="delivery" element={<DeliveryPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <AIChatWidget />
      </Router>
      </CategoriesProvider>
    </ThemeProvider>
  );
}

export default App;
