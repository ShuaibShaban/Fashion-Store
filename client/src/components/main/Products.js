import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, setProductDetail } from "../../features/cart/slice";
import { fetchProducts, updateProduct} from "../../features/products/slice";
import "../main/product.css";
import StarRatings from 'react-star-ratings';
import Categories from "./Categories";
import ProductDetails from "./ProductDetails";
import Preloader from "./Preloader";
import Navbar from "../navbar/Navbar";
function Products() {
  const products = useSelector((state) => state.products.list);
  const cartItems = useSelector((state) => state.cart.items);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productDetailss, setProductDetailss] = useState(null)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts())
      .then(() => setIsLoading(false))
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleClick = (product) => {
    dispatch(addToCart(product));
  };

  const handleClose = (product) => {
    console.log("handleClose called with product:", product);
    dispatch(removeFromCart(product.id));
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };
  const handleRatingChange = (product, newRating) => {
    const updatedProduct = {
      ...product,
      rating: newRating
    };
    dispatch(updateProduct(updatedProduct));
  }
  function handleProductDetails(product){
    console.log(product)
    dispatch(setProductDetail(product))
    setProductDetailss(product.id)
    
  }
 // <Navbar setProductDetailss={setProductDetailss} />

 const filteredProducts = selectedCategory && selectedCategory !== 'All products'
 ? products.filter(product =>
     product.categories.some(category => category.name === selectedCategory)
   )
 : products;
  if (isLoading) {
    return (
  <>
  <div
  className="Loader_gigy"
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }}
>
  <img
    src="https://media2.giphy.com/media/jAYUbVXgESSti/200w.webp?cid=ecf05e47e77f8k4szj7dhh7j2prpzucfr61eohkhiffsccd1&ep=v1_gifs_search&rid=200w.webp&ct=g"
    alt="Image"
  />
</div>

  </>
    );
  }
  const filterProductsCat= [
    'All products',
    'Shirts',
    'Pants',
    'Shoes',
    'Dresses',
  ]
  return (
    <>

      {productDetailss === null ? (
      <>
      <Navbar/>
      <div className="product-container">
        <div class="sidebars">
          <div class="sidebar-header">Filter</div>
          <div class="sidebar-content">
            <div class="category-dropdown">
            <ul className="category-dropdown">
        {filterProductsCat.map(category => (
          <li key={category} onClick={() => handleCategoryChange(category)}>
            {category}
          </li>
        ))}
      </ul>
            </div>
          </div>
        </div>

        <div className="card_product_container">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error.message}</p>
          ) : (
            filteredProducts.map((product) => (
              
              <div key={product.id} className="wrapper">
                <div className="container">
                  
                  <div className="top">
                  <p id="price">{`$${product.price}`}</p>
                    <img 
                      className="pdt"
                      src={product.image_url}
                      alt={product.name}
                      
                    />
                    <i className="fas fa-search" onClick={()=>handleProductDetails(product)}></i>
                   
                  </div>
                  <div
                    className={`bottom ${
                      isProductInCart(product.id) ? "clicked" : ""
                    }`}
                  >
                    <div className="left">
                      <div className="star">
                      <StarRatings
            rating={
              product.reviews.length > 0
                ? Math.round(
                    product.reviews.map(review => review.rating).reduce((a, b) => a + b, 0) / product.reviews.length
                  )
                : 0
            }
            starRatedColor="gold"
            starDimension="20px"
            numberOfStars={5}
            name='rating'
            changeRating={(newRating) => handleRatingChange(product, newRating)}
          />
          </div>
                      <div className="details">
                        
                        <h3>{product.name}</h3>
                       
                      </div>
                      {!isProductInCart(product.id) && (
                        <div
                          className="buy"
                          onClick={() => handleClick(product)}
                        >
                          <i className="fas fa-shopping-cart"></i>
                        </div>
                      )}
                    </div>
                    {isProductInCart(product.id) && (
                      <div className="right">
                        <div className="done">
                          <i class="fa-solid fa-check"></i>
                        </div>
                        <div className="details">
                          {/* <h2>{product.title} <br /><span> Added to cart</span></h2> */}

                          <span>
                            {" "}
                            <h3>{product.name.split(' ')[0]}</h3>
                            <p>Added to cart</p>
                          </span>
                        </div>
                        <div
                          className="remove"
                          onClick={() => handleClose(product)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="inside">
                  <div className="icon">
                    <i className="material-icons">details</i>
                  </div>
                  <div className="contents">
                    <h4 style={{color:'white'}}>{`${product.name}`}</h4> <hr /> <br />
                    
                    <p>{product.description}</p> <br />

                    <h3 style={{color:'white'}}>{`Quantity: ${product.quantity + Math.floor(Math.random() * 10)}`}</h3>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div> </>):(

      <>
        <Navbar setProductDetailss={setProductDetailss} />
      <ProductDetails />
      </>
      )}

    </>
  );
}

export default Products;
