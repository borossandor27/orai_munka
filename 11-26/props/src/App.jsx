import './App.css'
import Header from './components/Header'
function App() {

  const osztaly = {
    "iskola": "Logiker",
    "osztalynev": "8.A",
    "tanulok": ["Ádám", "Éva", "Boldizsár"]
  }

  return (
    <>
    <Header iskola={osztaly.iskola} />
    <main>
      <h2>{osztaly.osztalynev} osztály</h2>
      <ul>
        {
          osztaly.tanulok.map((tanulonev, index) =>  {
            return <li key={index}>{tanulonev}</li>
          })
        }
      </ul>
    </main>
    </>
  )
}

export default App
