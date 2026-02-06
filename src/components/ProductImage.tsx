import React, { useState } from 'react';
import { getPlaceholderImage } from '../utils/imageHelpers';

interface ProductImageProps {
  src: string;
  alt: string;
  category?: string;
  className?: string;
  fallbackSrc?: string;
}

/**
 * ProductImage Component with Fallback Support
 * 
 * Features:
 * - Automatic fallback to category-specific placeholder if image fails to load
 * - Loading state with skeleton
 * - Error handling
 * - Lazy loading support
 */
const ProductImage: React.FC<ProductImageProps> = ({ 
  src, 
  alt, 
  category = 'Product',
  className = '',
  fallbackSrc
}) => {
  const defaultFallback = fallbackSrc || getPlaceholderImage(category);
  const [imgSrc, setImgSrc] = useState(src && src.trim() !== '' ? src : defaultFallback);
  const [isLoading, setIsLoading] = useState(src && src.trim() !== '' ? true : false);
  const [hasError, setHasError] = useState(src && src.trim() !== '' ? false : true);

  const handleError = () => {
    if (imgSrc !== defaultFallback) {
      console.warn(`Image failed to load: ${src}, using fallback for ${category}`);
      setImgSrc(defaultFallback);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <svg 
            className="w-12 h-12 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
      {hasError && (
        <div className="absolute bottom-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded shadow-md">
          Placeholder
        </div>
      )}
    </div>
  );
};

export default ProductImage;
