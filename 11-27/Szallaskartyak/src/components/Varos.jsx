import './Varos.css'

export default function Varos({nev, db, children}){

    return (
        <section>
            <h2>{nev} ({db})</h2>
            <div className="racs">{children}</div>
        </section>
    )
}