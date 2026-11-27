import './SzallasKartya.css'

// A kedvezményes ár 100 Ft-ra kerekítve. Az App is használja (legolcsóbb szállás).
export function kedvezmenyesAr(szallas) {
    return Math.round((szallas.ar * (1 - szallas.kedvezmeny / 100)) / 100) * 100;
}

// Ezres tagolás: 45900 -> "45 900 Ft"
export function formazAr(ar) {
    return ar.toLocaleString('hu-HU') + ' Ft';
}

// Egy tizedes, tizedesvesszővel: 8 -> "8,0"
export function formazErtekeles(ertekeles) {
    return ertekeles.toLocaleString('hu-HU', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function ertekelesCimke(ertekeles) {
    if (ertekeles >= 9) return { szoveg: 'Kiváló', osztaly: 'kivalo' };
    if (ertekeles >= 8) return { szoveg: 'Nagyon jó', osztaly: 'nagyonJo' };
    return { szoveg: 'Jó', osztaly: 'jo' };
}

export default function SzallasKartya({ nev, ar, kedvezmeny, szabad, csillag, ertekeles }) {
    const teltHaz = szabad === 0;
    const cimke = ertekelesCimke(ertekeles);

    let keszlet;
    if (teltHaz) {
        keszlet = <p className='teltHaz'>Telt ház</p>;
    } else if (szabad <= 2) {
        keszlet = <p className='keves'>Már csak {szabad} szoba!</p>;
    } else {
        keszlet = <p className='van'>Van szabad szoba</p>;
    }

    return (
        <div className={teltHaz ? 'kartya halvany' : 'kartya'}>
            {kedvezmeny > 0 && <span className='lastMinute'>Last minute −{kedvezmeny}%</span>}

            <h3>{nev} <span className='csillag'>{'★'.repeat(csillag)}</span></h3>

            <span className={'ertekeles ' + cimke.osztaly}>
                {formazErtekeles(ertekeles)} {cimke.szoveg}
            </span>

            {kedvezmeny > 0 ? (
                <p>
                    <s>{formazAr(ar)}</s>{' '}
                    <span className='ujAr'>{formazAr(kedvezmenyesAr({ ar, kedvezmeny }))}</span> / éj
                </p>
            ) : (
                <p><strong>{formazAr(ar)}</strong> / éj</p>
            )}

            {keszlet}

            <button className='gomb' disabled={teltHaz}>Foglalás</button>
        </div>
    );
}
