// Shows the product thumbnail, or a grey box if the product has none.
export default function ProductImage({ product, className = "" }) {
  if (product.thumbnail) {
    return <img className={`product-img ${className}`} src={product.thumbnail} alt={product.name} />;
  }
  return <div className={`product-img placeholder ${className}`}>No image</div>;
}
