import './BookingsPage.css';
import { useEffect, useState } from 'react';
import { getBookingsService } from '../../services/fetchData';
import BookingCard from '../../components/BookingCard/BookingCard';
import useAuth from '../../hooks/useAuth';
import LateralBar from '../../components/LateralBar/LateralBar';
import Loader from '../../components/Loader/Loader';
import { profileBarStyle } from '../../utils/const';

export default function BookingPage() {
    const [bookings, setBookings] = useState(null);
    const { authToken, authUser, loading, setLoading } = useAuth();

    useEffect(() => {
        setLoading(true);
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
            } finally {
                setLoading(false);
            }
        };
        getBookings();
    }, [authToken, authUser]);

    return (
        <>
            <section className="list-products-active flex flex-col  justify-center items-center w-full">
                <LateralBar />

                <h2 className={profileBarStyle}>Solicitudes de reserva</h2>

                {loading && <Loader />}
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
                {!bookings && !loading && (
                    <div className="flex justify-center items-center w-[350px] shadow-xl shadow-black">
                        <h2 className="text-white text-xl bg-slate-900 p-6 border border-slate-600 rounded-lg w-[350px] text-center">
                            No tienes ninguna reserva
                        </h2>
                    </div>
                )}
            </section>
        </>
    );
}
