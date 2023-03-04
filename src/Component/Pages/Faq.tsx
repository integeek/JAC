import Navigation from "../navigation/Navigation"
//page pour voir ses réservations

function Faq() {
  return (
    <div>
      <Navigation />
      <title>Faq</title>
      <br />
      <p className="text-4xl md:text-lg">Foire aux questions</p>     
      <br />
      <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 mr-16 ml-16 mb-4 rounded-box">
        <div className="collapse-title bg-gray-300 text-xl font-medium">
    Question 1 
        </div>
        <div className="collapse-content" style={{ textAlign: "left" }}> 
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et mattis ex, vitae scelerisque ipsum. </p>
        </div>
      </div>
      <br /> 
      <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 mr-16 ml-16  mb-4 rounded-box">
        <div className="collapse-title bg-gray-300 text-xl font-medium">
    Question 2
        </div>
        <div className="collapse-content" style={{ textAlign: "left" }}> 
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et mattis ex, vitae scelerisque ipsum. </p>
        </div>
      </div>

      <br /> 

      <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 mr-16 ml-16 mb-4 rounded-box">
        <div className="collapse-title bg-gray-300 text-xl font-medium">
    Question 3
        </div>
        <div className="collapse-content" style={{ textAlign: "left" }}> 
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et mattis ex, vitae scelerisque ipsum. </p>
        </div>
      </div>

    </div>
  )
}

export default Faq




