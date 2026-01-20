import { useState } from "react";
import { Spinner } from "./ui/spinner";

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export function ImageWithLoading({ src, alt, className = "", style, width, height }: ImageWithLoadingProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative" style={{ width, height, ...style }}>
      {/* Loading state */}
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] rounded-md">
          <Spinner size="sm" className="text-white" />
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a1a] rounded-md p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500 mb-1"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span className="text-xs text-gray-500 text-center">Failed to load</span>
        </div>
      )}
      
      {/* Image */}
      {!error && (
        <img
          alt={alt}
          className={className}
          src={src}
          loading="lazy"
          onLoadStart={() => {
            setLoading(true);
            setError(false);
          }}
          onLoad={() => {
            setLoading(false);
            setError(false);
          }}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}
    </div>
  );
}

