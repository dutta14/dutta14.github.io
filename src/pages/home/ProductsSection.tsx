import { products } from '../../data/portfolioData';
import '../../styles/ProductsSection.css';

const ProductsSection = () => (
  <section id="products">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2>What I've Shipped</h2>
          <div className="products-grid mt-5">
            {products.map((product, i) => (
              <div className="product-card" key={i}>
                <div className="product-card-img-wrap">
                  <img src={product.image} alt={product.alt} />
                </div>
                <div className="product-card-body">
                  <h3>{product.title}</h3>
                  <span className="product-scale-pill">{product.scale}</span>
                  <p>{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProductsSection;
