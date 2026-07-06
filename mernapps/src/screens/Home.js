import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const isLoggedIn = !!localStorage.getItem("authToken");
  const navigate = useNavigate();

  const loadData = async () => {
    let response = await fetch("https://bite-burst-mern.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCategory(response[1]);
    //console.log(response[0],response[1])


  }
  useEffect(() => {
    loadData()
  }, [])





  return (
    <div>

      <div><Navbar /></div>

      <div><div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              {/*<button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/}
            </div>

          </div>
          <div className="carousel-item active">
            <img src="https://unsplash.com/photos/_qxbJUr9RqI/download?force=true&w=640" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://unsplash.com/photos/Vj-J5xNjnxA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8bW9tb3N8ZW58MHx8fHwxNzMwMjYxNTkwfDA&force=true&w=2400" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://unsplash.com/photos/MNtag_eXMKw/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MzB8fHBpenphfGVufDB8fHx8MTczMDI2MzA5OHww&force=true&w=1920" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
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
      <div className='container overflow-hidden'>
        {
          foodCategory !== []
            ?
            foodCategory.map((data) => {
              return (<div className='row mb-3'>
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
               {
  (() => {
    const filteredItems = foodItem.filter(
      (item) =>
        item.CategoryName === data.CategoryName &&
        item.name.toLowerCase().includes(search.toLowerCase())
    );

const previewItems = isLoggedIn
  ? filteredItems
  : filteredItems.slice(0, 4);
    if (filteredItems.length === 0) {
      return <div>No data found</div>;
    }

    return (
      <>
 {previewItems.map((filterItems) => (
  <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
    <Card
      foodItem={filterItems}
      options={filterItems.options[0]}
    />
  </div>
))}

        
      </>
    );
  })()
}

              </div>


              )

            })
: <div>""""""</div>

}

{/* Login Preview Overlay */}

{!isLoggedIn && (
  <div
    className="position-relative mt-5 mb-5"
    style={{ minHeight: "600px" }}
  >

    {/* Blurred Food Cards */}

    <div
      className="row g-4"
      style={{
        filter: "blur(8px)",
        opacity: 0.6,
        pointerEvents: "none",
        userSelect: "none"
      }}
    >
      {foodItem.slice(0, 8).map((item) => (
        <div
          key={item._id}
          className="col-12 col-md-6 col-lg-3"
        >
          <Card
            foodItem={item}
            options={item.options[0]}
          />
        </div>
      ))}
    </div>

    {/* Glassmorphism Card */}

    <div
      className="position-absolute top-50 start-50 translate-middle"
      style={{
        width: "80%",
        maxWidth: "720px",
        padding: "55px",
        borderRadius: "30px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 15px 45px rgba(0,0,0,0.35)",
        textAlign: "center",
        color: "#fff",
        zIndex: 100
      }}
    >

      <div
        style={{
          fontSize: "55px",
          marginBottom: "18px"
        }}
      >
        🔒
      </div>

      <h2
        style={{
          fontWeight: "700"
        }}
      >
        Unlock the Complete Menu
      </h2>

      <p
        style={{
          color: "#f1f1f1",
          marginTop: "18px",
          marginBottom: "30px",
          fontSize: "18px"
        }}
      >
        Browse over <strong>{foodItem.length} delicious dishes</strong>,
        save favourites,
        add them to your cart,
        and enjoy fast delivery.
      </p>

      <button
        className="btn btn-success btn-lg px-5"
        style={{
          borderRadius: "40px",
          fontWeight: "600"
        }}
        onClick={() => navigate("/login")}
      >
        Login Now
      </button>

    </div>

  </div>
)}

</div>

<div>
  <Footer />
</div>

    </div>
  )
}
