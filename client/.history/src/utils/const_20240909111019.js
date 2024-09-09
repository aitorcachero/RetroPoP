const categoryNav = [
    {
        path: '/search/?category=audio',
        img: '/icons/audio.png',
        alt: 'audio',
    },
    {
        path: '/search/?category=camaras',
        img: '/icons/camaras.png',
        alt: 'camaras',
    },
    {
        path: '/search/?category=consolas',
        img: '/icons/consolas.png',
        alt: 'consolas',
    },
    {
        path: '/search/?category=juguetes',
        img: '/icons/juguetes.png',
        alt: 'juguetes',
    },
    {
        path: '/search/?category=Maquinas de escribir',
        img: '/icons/maquinas-escribir.png',
        alt: 'maquinas-escribir',
    },
    {
        path: '/search/?category=Ordenadores',
        img: '/icons/ordenadores.png',
        alt: 'ordenadores',
    },
    {
        path: '/search/?category=Relojes',
        img: '/icons/relojes.png',
        alt: 'relojes',
    },
    {
        path: '/search/?category=Telefonos',
        img: '/icons/telefonos.png',
        alt: 'teléfonos',
    },
    {
        path: '/search/?category=Televisores',
        img: '/icons/televisores.png',
        alt: 'televisores',
    },
    {
        path: '/search/?category=Video',
        img: '/icons/video.png',
        alt: 'video',
    },
    {
        path: '/search/?category=Otros',
        img: '/icons/otros.png',
        alt: 'otros',
    },
];

const footerSocialMedia = [
    {
        path: 'https://www.linkedin.com/groups/9509612/',
        img: '/icons/linkedin-icon.png',
        alt: 'Linkedin link',
    },
    {
        path: 'https://github.com/FlorPManzano/RetroPoP',
        img: '/icons/github-icon.png',
        alt: 'GitHub link',
    },
    {
        path: 'https://www.instagram.com/',
        img: '/icons/instagram.png',
        alt: 'Instagram link',
    },
    {
        path: 'https://www.facebook.com/',
        img: '/icons/facebook.png',
        alt: 'Facebook link',
    },
    {
        path: 'https://twitter.com/',
        img: '/icons/twitter.png',
        alt: 'Twitter link',
    },
];

const lateralBarProfile = [
    {
        path: '/profile',
        name: 'Editar Perfil',
    },
    {
        path: '/profile/products',
        name: 'Productos en venta',
    },
    {
        path: '/profile/sold',
        name: 'Productos vendidos',
    },
    {
        path: '/profile/favs',
        name: 'Favoritos',
    },
    {
        path: '/profile/bookings',
        name: 'Solicitudes',
    },
    {
        path: '/profile/reviews',
        name: 'Valoraciones pendientes',
    },
];

const categorys = [
    {
        value: 'Audio',
        selectedValue: 'audio',
    },
    {
        value: 'Camaras de fotos',
        selectedValue: 'camaras',
    },
    {
        value: 'Consolas',
        selectedValue: 'consolas',
    },
    {
        value: 'Juguetes',
        selectedValue: 'audjuguetesio',
    },
    {
        value: 'Maquinas de escribir',
        selectedValue: 'Maquinas%20de%20escribir',
    },
    {
        value: 'Ordenadores',
        selectedValue: 'Ordenadores',
    },
    {
        value: 'Relojes',
        selectedValue: 'Relojes',
    },
    {
        value: 'Telefonos',
        selectedValue: 'Telefonos',
    },
    {
        value: 'Televisores',
        selectedValue: 'Televisores',
    },
    {
        value: 'Video',
        selectedValue: 'Video',
    },
    {
        value: 'Otros',
        selectedValue: 'Otros',
    },
];

const productsState = [
    'Nuevo',
    'Como nuevo',
    'En buen estado',
    'En condiciones aceptables',
    'No funciona',
];

const buttonStyle =
    'rounded-lg bg-slate-800 cursor pointer text-white font-bold  md:p-4 border border-slate-600 hover:bg-slate-700 w-full min-h-12';

const profileBarStyle =
    'w-full mb-8 text-center font-extrabold text-2xl md:text-6xl text-slate-300 border-y border-slate-600 bg-slate-900 p-4';

export {
    categoryNav,
    footerSocialMedia,
    lateralBarProfile,
    categorys,
    productsState,
    buttonStyle,
    profileBarStyle,
};
