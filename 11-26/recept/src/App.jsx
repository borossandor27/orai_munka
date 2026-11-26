import './App.css'

function App() {

  const recept =
  {
    id: 1,
    name: "Gulyásleves",
    author: "Nagyapa",
    prepTime: 90,
    difficulty: "közepes",
    isVegetarian: false,
    ingredients: ["marhahús", "burgonya", "sárgarépa", "hagyma", "paprika"]
  }

  return (
    <>
      <h2>{recept.name}</h2>
      <p>elkészítési idő: {recept.prepTime} perc</p>
      <p>Hozzávalók:</p>
      <ul>
        {recept.ingredients.map((hozzavalo, index) => {
          return <li key={index}>{hozzavalo}</li>
        })}
      </ul>
    </>
  )
}

export default App
