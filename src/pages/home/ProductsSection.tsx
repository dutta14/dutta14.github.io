import { products } from '../../data/portfolioData';
import '../../styles/ProductsSection.css';

const ProductsSection = () => (
  <section id="products">
    <div className="container">
      <h2>Featured Products</h2>
      <div className="row mt-5">
        <div className="col-lg-8 offset-lg-2">
          <div className="products-grid">
            {products.map((product, i) => (
              <div className="product-card" key={i}>
                <img src={product.image} alt={product.alt} />
                <div className="product-card-body">
                  <h3>{product.title}</h3>
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
