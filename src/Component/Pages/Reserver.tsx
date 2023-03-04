import Navigation from "../navigation/Navigation"

function Reserver() {
  document.body.classList.add("theme-light")

  return (
    <div>
      <Navigation />
      <title>Reserver</title>
      <h1>Reserver un restaurant</h1>
      <div className="grid grid-cols-3 gap-4 my-16">
        <div className="card w-96 bg-base-100 shadow-2xl">
          <figure><img src="https://via.placeholder.com/150" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">1er Restaurant</h2>
            <p>4 allée des lilas, 75019 Paris</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Voir plus</button>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <figure><img src="https://via.placeholder.com/150" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">2eme Restaurant</h2>
            <p>1 allee de la plaine, 75006 Paris</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Voir plus</button>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <figure><img src="https://via.placeholder.com/150" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">3eme Restaurant</h2>
            <p>93 Rue des Martyrs, 75002 Paris</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Voir plus</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
  
export default Reserver
  