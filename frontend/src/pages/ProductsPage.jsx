import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';


import allProductsData from '../data/products.json';
const CATEGORIES = [
{ id: 'all', label: 'All Fabrics' },
{ id: 'net', label: 'Net' },
{ id: 'cancan', label: 'Cancan' },
{ id: 'organza', label: 'Organza' },
{ id: 'viscose', label: 'Viscose' },
{ id: 'georgette', label: 'Georgette' },
{ id: 'satin', label: 'Satin' }
];



export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [allProducts, setAllProducts] = useState(allProductsData);

  

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return allProducts;
    return allProducts.filter(p => p.category === activeCategory);
  }, [activeCategory, allProducts]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') { setSearchParams({}); } else { setSearchParams({ cat: catId }); }
  };

  return (
    <main data-testid="products-page">
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-teal-dark mb-4 font-body animate-fade-in">Our Collection</p>
          <h1 className="font-heading text-5xl sm:text-6xl font-light tracking-tight text-[#2D2D2D] mb-4 animate-fade-up" data-testid="products-hero-title">
            Premium Fabrics
          </h1>
          <p className="text-base text-[#2D2D2D]/50 font-body font-light max-w-xl mx-auto animate-fade-up stagger-2">
            Explore our extensive collection of wholesale textiles, curated for quality and crafted for excellence.
          </p>
        </div>
      </section>

      <section className="px-6 pb-8" data-testid="category-filter">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id} data-testid={`filter-btn-${cat.id}`}
                onClick={() => handleCategoryChange(cat.id)}
                className={`text-xs uppercase tracking-[0.15em] font-medium font-body px-4 sm:px-5 py-2 border transition-all duration-300 rounded-sm ${
                  activeCategory === cat.id
                    ? 'border-teal bg-teal text-white'
                    : 'border-[#E5E0D8] text-[#2D2D2D]/50 hover:border-teal/40 hover:text-teal-dark'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24" data-testid="products-grid">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.05}>
                <ProductCard product={product} index={index} />
              </ScrollReveal>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#2D2D2D]/30 font-body font-light">No products found in this category.</p>
            </div>
          )}
          <div className="text-center mt-10">
            <p className="text-xs text-[#2D2D2D]/30 font-body font-light uppercase tracking-[0.2em]">
              Showing {filteredProducts.length} of {allProducts.length} products
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
