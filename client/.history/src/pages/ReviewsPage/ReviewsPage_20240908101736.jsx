import ReviewCard from '../../components/ReviewCard/ReviewCard';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import { getReviewsService } from '../../services/fetchData';
import './ReviewsPage.css';
import LateralBar from '../../components/LateralBar/LateralBar';

export default function ReviewsPage() {
    const { authToken } = useAuth();

    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        const getReviews = async () => {
            try {
                const reviewsRequest = await getReviewsService(authToken);
                setReviews(reviewsRequest?.reviews);
            } catch (error) {
                console.log(error.message, error);
            }
        };
        getReviews();
    }, [authToken]);

    return (
        <section className="list-reviews flex flex-col  justify-center items-center w-full">
            <div className="w-full h-12">
                <LateralBar />
            </div>
            <h2 className="title-active font-extrabold text-xl md:text-6xl text-slate-300 border-y border-slate-600 bg-slate-900 p-4">
                Reseñas pendientes
            </h2>
            <div className="w-full">
                <ul className="flex flex-1 flex-wrap gap-20 justify-center items-center mb-20">
                    {reviews &&
                        reviews
                            .filter(
                                (review) =>
                                    review.titleRw === null &&
                                    new Date() > new Date(review.deliveryTime)
                            )

                            .map((review) => (
                                <li key={review.id}>
                                    <ReviewCard
                                        image={review.image}
                                        productName={review.productName}
                                        resno={review.resno}
                                    />
                                </li>
                            ))}
                </ul>
                {!reviews && (
                    <p className="reviews-no-pendings">
                        No tienes reseñas pendientes
                    </p>
                )}
            </div>
        </section>
    );
}
