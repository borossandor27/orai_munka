import { allRoles } from '../index.js'

function szerepkor(...[engedelyezettSzerepkorok]) {

    return (req, res, next) => {

        if (!req.user.role) return res.status(401).json({ error: "hiányzó szerepkör" });

        if (!engedelyezettSzerepkorok.includes(req.user.role)) return res.status(403).json({ error: "Nincs megfelelő jofgosultságod" });

        next();
    }
}

export default szerepkor;