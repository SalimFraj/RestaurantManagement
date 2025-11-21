import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      'nav.home': 'Home',
      'nav.menu': 'Menu',
      'nav.cart': 'Cart',
      'nav.orders': 'Orders',
      'nav.reservations': 'Reservations',
      'nav.admin': 'Admin',
      'nav.login': 'Login',
      'nav.logout': 'Logout',
      'nav.register': 'Register',
      'home.title': 'Welcome to Jr\'s Grill',
      'home.subtitle': 'Experience premium dining with modern flavors',
      'menu.title': 'Our Menu',
      'menu.filter': 'Filters',
      'menu.search': 'Search...',
      'menu.addToCart': 'Add to Cart',
      'cart.title': 'Shopping Cart',
      'cart.empty': 'Your cart is empty',
      'cart.total': 'Total',
      'cart.checkout': 'Checkout',
      'orders.title': 'My Orders',
      'orders.status': 'Status',
      'reservations.title': 'My Reservations',
      'login.title': 'Login',
      'register.title': 'Register',
      'admin.dashboard': 'Dashboard',
      'admin.menu': 'Menu Management',
      'admin.orders': 'Order Management',
      'admin.reservations': 'Reservations',
      'admin.analytics': 'Analytics'
    }
  },
  es: {
    translation: {
      'nav.home': 'Inicio',
      'nav.menu': 'Menú',
      'nav.cart': 'Carrito',
      'nav.orders': 'Pedidos',
      'nav.reservations': 'Reservas',
      'nav.admin': 'Admin',
      'nav.login': 'Iniciar Sesión',
      'nav.logout': 'Cerrar Sesión',
      'nav.register': 'Registrarse',
      'home.title': 'Bienvenido a Jr\'s Grill',
      'home.subtitle': 'Experimenta la alta cocina con sabores modernos',
      'menu.title': 'Nuestro Menú',
      'menu.filter': 'Filtros',
      'menu.search': 'Buscar...',
      'menu.addToCart': 'Agregar al Carrito',
      'cart.title': 'Carrito de Compras',
      'cart.empty': 'Tu carrito está vacío',
      'cart.total': 'Total',
      'cart.checkout': 'Pagar',
      'orders.title': 'Mis Pedidos',
      'orders.status': 'Estado',
      'reservations.title': 'Mis Reservas',
      'login.title': 'Iniciar Sesión',
      'register.title': 'Registrarse',
      'admin.dashboard': 'Panel',
      'admin.menu': 'Gestión de Menú',
      'admin.orders': 'Gestión de Pedidos',
      'admin.reservations': 'Reservas',
      'admin.analytics': 'Análisis'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

