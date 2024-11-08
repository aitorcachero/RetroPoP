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
        <section className="list-reviews">
            <div className="w-full h-12">
                <LateralBar />
            </div>
            <h2 className="title-review">Reseñas pendientes</h2>
            <div className="review-page-container">
                <ul className="review-page-list">
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
