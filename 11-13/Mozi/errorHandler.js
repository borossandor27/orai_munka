function errorHandler(err, req, res, next) {
    console.error('Szerverhiba:', err);

    res.status(500).json({
        success: false,
        message: 'Szerverhiba! Az adatbázis jelenleg nem elérhető.'
    });
}

export default errorHandler;