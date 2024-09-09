import ReviewCard from '../../components/ReviewCard/ReviewCard';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import { getReviewsService } from '../../services/fetchData';
import './ReviewsPage.css';
import LateralBar from '../../components/LateralBar/LateralBar';
import Loader from '../../components/Loader/Loader';
import { profileBarStyle } from '../../utils/const';

export default function ReviewsPage() {
    const { authToken, loading, setLoading } = useAuth();

    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        setLoading(true);
        const getReviews = async () => {
            try {
                const reviewsRequest = await getReviewsService(authToken);
                setReviews(
                    reviewsRequest?.reviews.filter(
                        (review) =>
                            review.titleRw === null &&
                            new Date() > new Date(review.deliveryTime)
                    )
                );
            } catch (error) {
                console.log(error.message, error);
            } finally {
                setLoading(false);
            }
        };
        getReviews();
    }, [authToken]);

    return (
        <section className="list-reviews flex flex-col  justify-center items-center w-full">
            <LateralBar />

            <h2 className={profileBarStyle}>Reseñas pendientes</h2>

            <div className="w-full">
                <ul className="list-bookings__container flex flex-1 flex-wrap gap-20 justify-center items-center w-full mb-20 md:p-10">
                    {reviews &&
                        reviews.map((review) => (
                            <li key={review.id}>
                                <ReviewCard
                                    image={review.image}
                                    productName={review.productName}
                                    resno={review.resno}
                                />
                            </li>
                        ))}
                    {!reviews ||
                        (reviews.length === 0 && !loading && (
                            <div className="flex justify-center items-center w-[350px] shadow-xl shadow-black">
                                <h2 className="text-white text-xl bg-slate-900 p-6 border border-slate-600 rounded-lg w-[350px] text-center">
                                    No tienes ninguna reserva
                                </h2>
                            </div>
                        ))}
                    {loading && !reviews && <Loader />}
                </ul>
            </div>
        </section>
    );
}
