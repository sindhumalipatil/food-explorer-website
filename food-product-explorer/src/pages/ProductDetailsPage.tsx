import { Link, useParams } from "react-router-dom";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { useProduct } from "../hooks/useProduct";
import {
  formatCategory,
  formatPrice,
  formatRating,
  getDiscountedPrice,
  getStockInfo,
} from "../utils/format";
import { parseProductId } from "../utils/parseProductId";

function BackLink() {
  return (
    <Link to="/products" className="back-link">
      &larr; Back to products
    </Link>
  );
}

interface ProductDetailsProps {
  id: number | null;
}

function ProductDetails({ id }: ProductDetailsProps) {
  const { product, loading, error, notFound, retry } = useProduct(id);

  if (loading) {
    return (
      <>
        <BackLink />
        <LoadingState message="Loading product..." />
      </>
    );
  }

  if (notFound) {
    return (
      <>
        <BackLink />
        <ErrorState message="Product not found." />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <BackLink />
        <ErrorState message="Unable to load product." onRetry={retry} />
      </>
    );
  }

  const stock = getStockInfo(product.stock);
  const finalPrice = getDiscountedPrice(product.price, product.discountPercentage);

  return (
    <>
      <BackLink />
      <article className="details">
        <img src={product.images[0] ?? product.thumbnail} alt={product.title} />
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <dl className="details-list">
            <dt>Price</dt>
            <dd>
              <strong>{formatPrice(finalPrice)}</strong>
              <span className="old-price">{formatPrice(product.price)}</span>
            </dd>
            <dt>Discount</dt>
            <dd>{product.discountPercentage}% off</dd>
            <dt>Brand</dt>
            <dd>{product.brand ?? "Not specified"}</dd>
            <dt>Category</dt>
            <dd>{formatCategory(product.category)}</dd>
            <dt>Rating</dt>
            <dd>&#9733; {formatRating(product.rating)}</dd>
            <dt>Stock</dt>
            <dd className={stock.className}>{stock.label}</dd>
          </dl>
        </div>
      </article>
    </>
  );
}

export function ProductDetailsPage() {
  const { id } = useParams();

  // key={id}: React creates a fresh component (and fresh state) when the URL id changes
  return <ProductDetails key={id} id={parseProductId(id)} />;
}
