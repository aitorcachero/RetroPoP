import './BookingCard.css';
import { APIUrl } from '../../config';
import { bookingPropTypes } from '../../utils/customPropTypes';
import { useState } from 'react';
// import BookingForm from '../../forms/BookingForm/BookingForm';
import { useProducts } from '../../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

export default function BookingCard({ booking }) {
    const [showModal, setShowModal] = useState(false);
    const { confirmBooking, cancelBooking } = useProducts();

    const [deliveryPlace, setDeliveryPlace] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');

    const dateNow = new Date(booking.createdAt)
        .toDateString()
        .split(' ')
        .splice(1);

    const dateNowFormatted = `${dateNow[1]} ${dateNow[0]} ${dateNow[2]}`;

    const navigate = useNavigate();

    const acceptBooking = (e) => {
        e.preventDefault();
        setShowModal(true);
    };
    const rejectBooking = (e) => {
        e.preventDefault();
        cancelBooking(booking.resno);
        navigate(`/`);
    };

    const bookingSubmit = async (e) => {
        e.preventDefault();
        const deliveryTimeFormatted = formatDate(deliveryTime);

        await confirmBooking(
            booking.resno,
            deliveryTimeFormatted,
            deliveryPlace
        );
        setShowModal(false);

        navigate(`/`);
    };

    return (
        <div className="booking-container">
            <img
                src={`${APIUrl}/images/${booking.image}`}
                alt=""
                className="booking-container-img"
            />
            <div className="booking-container-info">
                <header className="booking-container-info-header">
                    <h3 className="booking-container-info-productname">
                        {booking.productName}
                    </h3>
                    <p className="booking-container-info-price">
                        {booking.price} €
                    </p>
                </header>
                <main className="booking-container-info-main">
                    <p className="booking-container-info-description">
                        {booking.description}
                    </p>
                </main>
                <footer className="booking-container-info-footer">
                    <p className="booking-container-info-buyer">
                        Por {booking.userBuyer} el {dateNowFormatted}
                    </p>
                    <div className="booking-container-info-buttons mb-4">
                        <button className="btn-reject" onClick={rejectBooking}>
                            Rechazar
                        </button>
                        <button className="btn-accept" onClick={acceptBooking}>
                            Aceptar
                        </button>
                        {showModal && (
                            <div className="popup-booking">
                                <h2>Datos de la entrega</h2>
                                <form
                                    action=""
                                    onSubmit={bookingSubmit}
                                    className="form-popup"
                                >
                                    <input
                                        className="input-delivery-place"
                                        type="text"
                                        value={deliveryPlace}
                                        onChange={(e) =>
                                            setDeliveryPlace(e.target.value)
                                        }
                                        maxLength="30"
                                        autoFocus
                                        required
                                        placeholder="Lugar de entrega"
                                    />
                                    <input
                                        className="input-delivery-time"
                                        type="datetime-local"
                                        value={deliveryTime}
                                        onChange={(e) =>
                                            setDeliveryTime(e.target.value)
                                        }
                                        required
                                        placeholder="Fecha y hora de entrega"
                                    />
                                    <footer className="footer-popup">
                                        <button
                                            className="btn-cancel-booking"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="btn-confirm-booking"
                                            type="submit"
                                        >
                                            Confirmar
                                        </button>
                                    </footer>
                                </form>
                            </div>
                        )}
                    </div>
                </footer>
            </div>
        </div>
    );
}

BookingCard.propTypes = {
    booking: bookingPropTypes,
};
