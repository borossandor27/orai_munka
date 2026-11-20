import jwt from 'jsonwebtoken'


function hitelesites(req, res, next){

    // a kapott fejléc kiolvasása
    const authHeader = req.headers.authorization;
console.log(req.headers);
    // tartalom ellenőrzése
    if(!authHeader){
        return res.status(401).json({error: "Hiányzó hitelesítési adatok"});
    }
    const [type, token] = authHeader.split(" ");

    // Bearer token
    if(type!=="Bearer" || !token){
        return res.status(401).json({error: "Hiás formátum"});
    }
    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        //console.log(decoded);
        req.user={
            role:decoded.role,
            userid:decoded.userid,
            username:decoded.username
        }
        next();
    } catch (error) {
        return res.status(401).json(
            {
                error: "Érvénytelen vagy lejárt token"
            }
        )
    }
}

export default hitelesites;