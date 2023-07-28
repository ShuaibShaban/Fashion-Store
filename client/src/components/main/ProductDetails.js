import React from 'react'
import './productDetails.css'
import { useSelector } from 'react-redux'


function ProductDetails() {
    const productDetail = useSelector((state)=>state.cart.productDetail)
    console.log(productDetail)
  return (
    <>
    <div> 
        <div class="containers">
    <div class="single-product">
        <div class="row">
            <div class="col-6">
                <div class="product-image">
                    <div class="product-image-main">
                        <img src={productDetail.image_url} alt="" id="product-main-image"/>
                    </div>
                    <div class="product-image-slider">
                        <img src={productDetail.image_url} alt="Loading img..."  class="image-list"/>
                        <img src={productDetail.image_url} alt="Loading img..."  class="image-list"/>
                        <img src={productDetail.image_url} alt="Loading img..."  class="image-list"/>
                        <img src={productDetail.image_url} alt="Loading img..."  class="image-list"/>
                    </div>
                </div>
            </div>
            <div class="col-6">
             

                <div class="product">
                    <div class="product-title">
                        <h2>{productDetail.name}</h2>
                    </div>
                    <div class="product-rating">
                        <span><i class="bx bxs-star"></i></span>
                        <span><i class="bx bxs-star"></i></span>
                        <span><i class="bx bxs-star"></i></span>
                        <span><i class="bx bxs-star"></i></span>
                        <span><i class="bx bxs-star"></i></span>
                        <span class="review">( {productDetail.reviews.length} reviews )</span>
                    </div>
                    <div class="product-price">
                        <span class="offer-price">{productDetail.price - 3}</span>
                        <span class="sale-price">${productDetail.price}</span>
                    </div>

                    <div class="product-details">
                        <h3>Description</h3>
                        <p>{productDetail.description}</p>
                    </div>
                    <div class="product-size">
                        <h4>Size</h4>
                        <div class="size-layout">
                            <input type="radio" name="size" value="S" id="1" class="size-input"/>
                            <label for="1" class="size">S</label>

                            <input type="radio" name="size" value="M" id="2" class="size-input"/>
                            <label for="2" class="size">M</label>

                            <input type="radio" name="size" value="L" id="3" class="size-input"/>
                            <label for="3" class="size">L</label>

                            <input type="radio" name="size" value="XL" id="4" class="size-input"/>
                            <label for="4" class="size">XL</label>

                            <input type="radio" name="size" value="XXL" id="5" class="size-input"/>
                            <label for="5" class="size">XXL</label>
                        </div>
                    </div>
                    <div class="product-color">
                        <h4>Colors</h4>
                        <div class="color-layout">
                            <input type="radio" name="color"  value="black" class="color-input"/>
                            <label for="black" class="black"></label>
                            <input type="radio" name="color"  value="red" class="color-input"/>
                            <label for="red" class="red"></label>

                            <input type="radio" name="color"  value="blue" class="color-input"/>
                            <label for="blue" class="blue"></label>
                            <input type="radio" name="color"  value="green" class="color-input"/>
                            <label for="green" class="green"></label>
                            <input type="radio" name="color"  value="brown" class="color-input"/>
                            <label for="brown" class="brown"></label>
                            <input type="radio" name="color"  value="grey" class="color-input"/>
                            <label for="grey" class="grey"></label>
                        </div>
                    </div>
                    <span class="divider"></span>

                    <div class="product-btn-group">
                       
                        {/* <div class="button add-cart"><i class='bx bxs-cart' ></i> Add to Cart</div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</>
  )
}

export default ProductDetails