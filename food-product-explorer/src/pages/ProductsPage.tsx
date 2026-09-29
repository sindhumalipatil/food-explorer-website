import { useMemo, useState } from "react";
import { CategoryFilter } from "../components/CategoryFilter";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { ProductList } from "../components/ProductList";
import { RatingFilter } from "../components/RatingFilter";
import { SearchBar } from "../components/SearchBar";
import { useProducts } from "../hooks/useProducts";
import { filterProducts, getCategories } from "../utils/filterProducts";

export function ProductsPage() {
  const { products, loading, error, retry } = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [minRating, setMinRating] = useState(0);

  const categories = useMemo(() => getCategories(products), [products]);
  const visibleProducts = useMemo(
    () => filterProducts(products, { query, category, minRating }),
    [products, query, category, minRating],
  );

  const hasActiveFilters = query !== "" || category !== "all" || minRating !== 0;

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setMinRating(0);
  };

  const renderContent = () => {
    if (loading) return <LoadingState message="Loading products..." />;
    if (error) return <ErrorState message="Unable to load products." onRetry={retry} />;
    if (visibleProducts.length === 0) {
      return (
        <EmptyState
          message="No products found."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      );
    }
    return (
      <>
        <p className="result-count">
          Showing {visibleProducts.length} of {products.length} products
        </p>
        <ProductList products={visibleProducts} />
      </>
    );
  };

  return (
    <section className="market-page">
      <header className="market-intro">
        <div>
          <p className="market-kicker">MARKET BASKET / DAILY FINDS</p>
          <h1 className="page-title">Fresh Groceries</h1>
        </div>
        <p className="market-note">Good things for the everyday table.</p>
      </header>
      <div className="market-layout">
        <aside className="market-sidebar" aria-label="Shop by aisle">
          <h2>Shop by aisle</h2>
          <CategoryFilter categories={categories} value={category} onChange={setCategory} />
          <div className="sidebar-rating">
            <RatingFilter value={minRating} onChange={setMinRating} />
          </div>
          {hasActiveFilters && (
            <button type="button" className="clear-filter" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </aside>
        <div className="market-main">
          <div className="market-toolbar">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          {renderContent()}
        </div>
      </div>
    </section>
  );
}
