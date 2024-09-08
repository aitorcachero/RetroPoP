import './BookingsPage.css';
import { useEffect, useState } from 'react';
import { getBookingsService } from '../../services/fetchData';
import BookingCard from '../../components/BookingCard/BookingCard';
import useAuth from '../../hooks/useAuth';
import LateralBar from '../../components/LateralBar/LateralBar';

export default function BookingPage() {
    const [bookings, setBookings] = useState(null);
    const { authToken, authUser } = useAuth();

    useEffect(() => {
        const getBookings = async () => {
            try {
                const bookingsRequest = await getBookingsService(authToken);

                if (
                    bookingsRequest.userBookings !==
                    'El usuario no tiene ninguna reserva activa'
                )
                    setBookings(bookingsRequest.userBookings);
            } catch (error) {
                console.log(error.message);
            }
        };
        getBookings();
    }, [authToken, authUser]);

    return (
        <>
            <section className="list-reviews flex flex-col  justify-center items-center w-full">
                <div className="w-full h-12">
                    <LateralBar />
                </div>
                {/* {bookings ? (
                <h2 className="main_title">Solicitudes de Reserva</h2>
            ) : (
                <h2 className="main_title">No tienes solicitudes pendientes</h2>
            )} */}
                <h2 className="title-active font-extrabold text-2xl md:text-6xl text-slate-300 border-y border-slate-600 bg-slate-900 p-4">
                    Solicitudes de Reserva
                </h2>
                {bookings && (
                    <section className="list-bookings">
                        <div className="bookings-container w-full">
                            <ul className="list-bookings__container flex flex-1 flex-wrap gap-20 justify-center items-center w-full">
                                {bookings.map((booking) => (
                                    <li key={booking.id}>
                                        <BookingCard booking={booking} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
                {!bookings && (
                    <p className="booking-no-results">
                        No tienes reservas activas
                    </p>
                )}
            </section>
        </>
    );
}
