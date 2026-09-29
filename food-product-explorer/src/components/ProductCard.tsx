import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { formatCategory, formatPrice, formatRating } from "../utils/format";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link
        to={`/products/${product.id}`}
        className="product-image-link"
        aria-label={`View ${product.title} details`}
      >
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        <span className="badge">{formatCategory(product.tags[0] ?? product.category)}</span>
      </Link>
      <div className="product-card-body">
        <h2>{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span className="price">{formatPrice(product.price)}</span>
          <span className="rating">&#9733; {formatRating(product.rating)}</span>
        </div>
        <Link to={`/products/${product.id}`} className="btn">
          View Details
        </Link>
      </div>
    </article>
  );
}
