import React from 'react'

export default function Carousel() {
  return (
    <div>
        <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id="carousel">
    <div className="carousel-caption" style={{zIndex:"10"}}>
    <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success text-white bg-success" type="submit">Search</button>
    </form>

    </div>
    <div className="carousel-item active">
      <img src="https://unsplash.com/photos/_qxbJUr9RqI/download?force=true&w=640" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://unsplash.com/photos/Vj-J5xNjnxA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8bW9tb3N8ZW58MHx8fHwxNzMwMjYxNTkwfDA&force=true&w=2400" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://unsplash.com/photos/MNtag_eXMKw/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MzB8fHBpenphfGVufDB8fHx8MTczMDI2MzA5OHww&force=true&w=1920" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}
