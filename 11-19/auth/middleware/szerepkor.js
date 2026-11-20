// Szerepkör alapú jogosultság ellenőrzés
// Használat: szerepkor("admin")  vagy  szerepkor("user", "admin")  vagy  szerepkor(["user", "admin"])
// FONTOS: mindig a hitelesites middleware UTÁN kell használni, mert az tölti ki a req.user-t!
function szerepkor(...engedelyezettSzerepkorok) {
    const engedelyezett = engedelyezettSzerepkorok.flat();

    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({ error: "Hiányzó szerepkör" });
        }

        if (!engedelyezett.includes(req.user.role)) {
            return res.status(403).json({ error: "Nincs megfelelő jogosultságod" });
        }

        next();
    }
}

export default szerepkor;
