import Carousel from 'react-bootstrap/Carousel';
import { products } from '../../data/portfolioData';
import '../../styles/ProductsSection.css';

const ProductsSection = () => (
  <section id="products">
    <div className="container">
      <h2>Featured Products</h2>
      <div className="row mt-5">
        <div className="col-lg-8 offset-lg-2">
          <Carousel>
            {products.map((product, i) => (
              <Carousel.Item key={i}>
                <img
                  className="d-block w-100"
                  src={product.image}
                  alt={product.alt}
                />
                <div className="product-caption">
                  <h5>{product.title}</h5>
                  <p>{product.description}</p>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  </section>
);

export default ProductsSection;
