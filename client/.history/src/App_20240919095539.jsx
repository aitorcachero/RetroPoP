// //importamos las dependencia React router dom
import { Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importamos los componentes

//importamos las páginas
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import FilteredPage from './pages/FilteredPage/FilteredPage';
import Navbar from './components/Navbar/Navbar';
import ProductPage from './pages/ProductPage/ProductPage';
import ValidateUserPage from './pages/ValidateUserPage/ValidateUserPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProductCreateForm from './forms/ProductCreateForm/ProductCreateForm';
import PrivateRoutes from './components/PrivateRoutes';
import Loader from './components/Loader/Loader';
import BookingsPage from './pages/BookingsPage/BookingsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import StarsReview from './components/StarsReview/StarsReview';
import ReviewsPage from './pages/ReviewsPage/ReviewsPage';
import ProductsActivePage from './pages/ProductsActivePage/ProductsActivePage';
import ProductsSelledPage from './pages/ProductsSelledPage/ProductsSelledPage';
import FavsPage from './pages/FavsPage/FavsPage';
import Footer from './components/Footer/Footer';
import ProductEditPage from './pages/ProductEditPage/ProductEditPage';
import UploadImages from './pages/UploadImages/UploadImages';
import useAuth from './hooks/useAuth';

const App = () => {
    const { authUser } = useAuth();
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="dark"
            />
            <Navbar />
            <Footer />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/login"
                    element={authUser ? <HomePage /> : <LoginPage />}
                />
                <Route path="/search" element={<FilteredPage />} />
                <Route path="/search/:category" element={<FilteredPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/product/" element={<ProductPage />} />
                <Route path="/loader" element={<Loader />} />
                <Route path="/uploadimages" element={<UploadImages />} />
                <Route
                    path="/validate/:regCode"
                    element={<ValidateUserPage />}
                />
                <Route path="/stars/" element={<StarsReview />} />

                <Route path="*" element={<NotFoundPage />} />

                <Route element={<PrivateRoutes />}>
                    <Route path="/profile/reviews" element={<ReviewsPage />} />
                    <Route
                        path="/profile/sold"
                        element={<ProductsSelledPage />}
                    />

                    <Route path="/profile/favs" element={<FavsPage />} />

                    <Route
                        path="/profile/bookings"
                        element={<BookingsPage />}
                    />
                    <Route
                        path="/profile/products"
                        element={<ProductsActivePage />}
                    />
                    <Route
                        path="/product/edit/:id"
                        element={<ProductEditPage />}
                    />
                    <Route path="/profile/" element={<ProfilePage />} />
                    <Route path="/upload/" element={<ProductCreateForm />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
