import { useEffect, useState } from "react";
import "./App.css";

const trimDesc = (description, length = 100) => {
  if (description.length <= length) {
    return description;
  }
  return `${description.substring(0, length)}...`;
};
const trimTittle = (tittle, length = 100) => {
  if (tittle <= length) {
    return tittle;
  }
  return `${tittle.substring(0, length)}...`;
};

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=20"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <>
      <h1 className="heading">API Fetching</h1>
      <div className="product-container">
        {products.map(
          ({ id, category, title, image, description, price, rating }) => (
            <div className="product-card" key={id}>
              <img className="product-image" src={image} alt={title} />
              <h2 className="product-title">{trimTittle(title)}</h2>
              <p className="product-category">Category: {category}</p>
              <p className="product-description">{trimDesc(description)}</p>
              <h3 className="product-price">Price: ${price}</h3>
              <p>
                Rating: {rating?.rate} ({rating?.count} reviews)
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default App;
