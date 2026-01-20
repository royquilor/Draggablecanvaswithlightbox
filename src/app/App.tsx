import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "@/imports/svg-kbzv1ln0jh";
import { Spinner } from "@/app/components/ui/spinner";
import { ImageWithLoading } from "@/app/components/ImageWithLoading";

// Replaced figma:asset imports with Unsplash image URLs
// Using direct Unsplash image URLs with specific photo IDs for reliable loading
const imgB92F525A0F8546AcA864F29A26Ce8B401105C1 = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=84&h=112&fit=crop";
const imgImage82 = "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=112&h=112&fit=crop";
const imgImage80 = "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=112&h=112&fit=crop";
const imgImage83 = "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=112&h=112&fit=crop";
const imgImage85 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=168&h=112&fit=crop";
const imgImage75 = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=133&h=112&fit=crop";
const imgAsciiArt21 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=361&h=330&fit=crop";
const imgScreenshot20260119At1906511 = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=95&fit=crop";
const imgImage79 = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=82&h=112&fit=crop";
const imgFd841FbeA7D54F61Abb4580E3E7B01Df1105C1 = "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=84&h=112&fit=crop";
const img356Dab50Ef144C548C5E3509E1472Bee1105C1 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=84&h=112&fit=crop";
const imgImage72 = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=133&h=112&fit=crop";
const imgImage81 = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop";

interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Helper function to get a larger version of the image for lightbox
// Converts small thumbnail URLs to high-resolution versions for full-screen display
function getLightboxImageUrl(url: string): string {
  // Extract the base URL (photo ID) and create a high-resolution version
  // Use w=1920 for high quality, or remove size constraints for maximum quality
  const baseUrl = url.split('?')[0];
  // Use high resolution (1920px width) for lightbox display
  // fit=max ensures the image maintains aspect ratio
  return `${baseUrl}?w=1920&auto=format&q=80&fit=max`;
}

// Hook to preload images for better performance
function useImagePreload(url: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) return;
    
    setIsLoading(true);
    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setIsLoading(false);
    };
    
    img.src = url;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [url]);

  return { isLoaded, isLoading };
}

const images: ImageData[] = [
  { src: imgB92F525A0F8546AcA864F29A26Ce8B401105C1, alt: "Mountain landscape with dramatic sky", width: 84, height: 112 },
  { src: imgImage82, alt: "Abstract geometric pattern in vibrant colors", width: 112, height: 112 },
  { src: imgImage80, alt: "Urban cityscape at sunset", width: 112, height: 112 },
  { src: imgImage83, alt: "Nature scene with trees and foliage", width: 112, height: 112 },
  { src: imgImage85, alt: "Portrait photography with natural lighting", width: 168, height: 112 },
  { src: imgImage75, alt: "Architectural detail of modern building", width: 133, height: 112 },
  { src: imgScreenshot20260119At1906511, alt: "Digital interface or application screenshot", width: 200, height: 95 },
  { src: imgImage79, alt: "Close-up of textured surface", width: 82, height: 112 },
  { src: imgImage81, alt: "Artistic composition with bold colors", width: 200, height: 200 },
  { src: imgFd841FbeA7D54F61Abb4580E3E7B01Df1105C1, alt: "Serene landscape with water feature", width: 84, height: 112 },
  { src: img356Dab50Ef144C548C5E3509E1472Bee1105C1, alt: "Portrait with expressive lighting", width: 84, height: 112 },
  { src: imgImage72, alt: "Modern architectural structure", width: 133, height: 112 },
];

function LucideIcons16PxPanelRight() {
  return (
    <div className="relative shrink-0 w-[16px] h-[16px]" data-name="lucide-icons/16px/panel-right">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="lucide-icons/16px/panel-right">
          <path d={svgPaths.p32991b00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

export default function App() {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Check for prefers-reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Preload high-res image when hovering over a thumbnail
  const lightboxUrl = selectedImage ? getLightboxImageUrl(selectedImage.src) : null;
  const { isLoaded: isLightboxImageLoaded, isLoading: isLightboxImageLoading } = useImagePreload(lightboxUrl || '');

  // Preload high-res image on hover for better UX
  const hoveredLightboxUrl = hoveredImage ? getLightboxImageUrl(hoveredImage) : null;
  useImagePreload(hoveredLightboxUrl || '');

  // Focus trapping and keyboard navigation handlers
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Close lightbox with ESC key
      if (event.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
        setSelectedImageIndex(null);
        return;
      }

      // Only handle arrow keys when lightbox is open
      if (!selectedImage || selectedImageIndex === null) return;

      // Navigate between images with arrow keys
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        const prevIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1;
        setSelectedImageIndex(prevIndex);
        setSelectedImage(images[prevIndex]);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        const nextIndex = selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0;
        setSelectedImageIndex(nextIndex);
        setSelectedImage(images[nextIndex]);
      }
    };

    // Add event listener when lightbox is open
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, selectedImageIndex]);

  // Focus trapping: Keep focus within lightbox when open
  useEffect(() => {
    if (!selectedImage || !lightboxRef.current) return;

    // Get all focusable elements within the lightbox
    const focusableElements = lightboxRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus the close button when lightbox opens
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // If only one focusable element, prevent tabbing
      if (focusableElements.length === 1) {
        e.preventDefault();
        return;
      }

      // If shift+tab on first element, move to last
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
      // If tab on last element, move to first
      else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [selectedImage]);

  // Reset zoom when image changes
  useEffect(() => {
    if (selectedImage) {
      setImageScale(1);
      setImagePosition({ x: 0, y: 0 });
      setIsZoomed(false);
    }
  }, [selectedImage]);

  // Pinch-to-zoom and pan functionality for mobile
  useEffect(() => {
    if (!selectedImage || !imageContainerRef.current) return;

    const container = imageContainerRef.current;
    let initialDistance = 0;
    let initialScale = imageScale;
    let initialPosition = { ...imagePosition };
    let lastTouchCenter = { x: 0, y: 0 };
    let isPinching = false;
    let isPanning = false;
    let swipeStartPos: { x: number; y: number } | null = null;

    const getDistance = (touch1: Touch, touch2: Touch) => {
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getCenter = (touch1: Touch, touch2: Touch) => {
      return {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
      };
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch gesture
        isPinching = true;
        isPanning = false;
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = getDistance(touch1, touch2);
        initialScale = imageScale;
        lastTouchCenter = getCenter(touch1, touch2);
        swipeStartPos = null; // Cancel swipe when pinching
        e.preventDefault();
      } else if (e.touches.length === 1) {
        if (isZoomed) {
          // Pan gesture when zoomed
          isPanning = true;
          isPinching = false;
          initialPosition = { ...imagePosition };
          lastTouchCenter = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          swipeStartPos = null; // Cancel swipe when panning
        } else {
          // Track swipe start for navigation (only when not zoomed)
          swipeStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && isPinching) {
        // Pinch zoom
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = getDistance(touch1, touch2);
        const scale = Math.max(1, Math.min(3, (currentDistance / initialDistance) * initialScale));
        setImageScale(scale);
        setIsZoomed(scale > 1);
        e.preventDefault();
      } else if (e.touches.length === 1 && isPanning && isZoomed) {
        // Pan when zoomed
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastTouchCenter.x;
        const deltaY = touch.clientY - lastTouchCenter.y;
        
        // Calculate bounds to prevent panning too far
        const maxPan = (imageScale - 1) * 100;
        const newX = Math.max(-maxPan, Math.min(maxPan, initialPosition.x + deltaX));
        const newY = Math.max(-maxPan, Math.min(maxPan, initialPosition.y + deltaY));
        
        setImagePosition({ x: newX, y: newY });
        lastTouchCenter = { x: touch.clientX, y: touch.clientY };
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        isPinching = false;
      }
      if (e.touches.length === 0) {
        isPanning = false;
        
        // Handle swipe gesture for navigation (only when not zoomed and not pinching)
        if (swipeStartPos && !isZoomed && !isPinching && selectedImageIndex !== null) {
          const touch = e.changedTouches[0];
          const deltaX = touch.clientX - swipeStartPos.x;
          const deltaY = touch.clientY - swipeStartPos.y;
          const absDeltaX = Math.abs(deltaX);
          const absDeltaY = Math.abs(deltaY);
          
          // Swipe threshold: horizontal swipe must be greater than vertical
          if (absDeltaX > 50 && absDeltaX > absDeltaY) {
            if (deltaX > 0) {
              // Swipe right - previous image
              const prevIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1;
              setSelectedImageIndex(prevIndex);
              setSelectedImage(images[prevIndex]);
            } else {
              // Swipe left - next image
              const nextIndex = selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0;
              setSelectedImageIndex(nextIndex);
              setSelectedImage(images[nextIndex]);
            }
          }
        }
        swipeStartPos = null;
      }
    };

    // Double tap to zoom
    let lastTap = 0;
    const handleDoubleTap = (e: TouchEvent) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      
      if (tapLength < 300 && tapLength > 0) {
        // Double tap detected
        if (imageScale === 1) {
          setImageScale(2);
          setIsZoomed(true);
        } else {
          setImageScale(1);
          setImagePosition({ x: 0, y: 0 });
          setIsZoomed(false);
        }
        e.preventDefault();
      }
      lastTap = currentTime;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);
    container.addEventListener('touchend', handleDoubleTap);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
      container.removeEventListener('touchend', handleDoubleTap);
    };
  }, [selectedImage, imageScale, imagePosition, isZoomed, selectedImageIndex]);

  // Debug: Log when component renders (only in development)
  if (import.meta.env.DEV) {
    console.log('App component rendered', { imagesCount: images.length });
  }

  return (
    <div className="bg-[#0a0a0a] w-full h-full overflow-hidden relative" ref={constraintsRef} style={{ width: '100%', height: '100%', minHeight: '100vh' }}>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="absolute -left-[9999px] w-px h-px overflow-hidden focus:left-4 focus:top-4 focus:z-[10000] focus:w-auto focus:h-auto focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:overflow-visible"
        onClick={(e) => {
          e.preventDefault();
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        Skip to main content
      </a>
      
      {/* Main content area */}
      <div id="main-content" tabIndex={-1} className="outline-none">
      {/* Draggable Canvas */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={prefersReducedMotion ? 0 : 0.1}
        dragTransition={prefersReducedMotion ? { duration: 0 } : { bounceStiffness: 300, bounceDamping: 20 }}
        // Enable touch dragging for mobile
        dragPropagation={false}
        dragMomentum={true}
        className={`absolute touch-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          touchAction: 'none', // Prevent default touch behaviors
        }}
        // Prevent text selection while dragging on mobile
        onDragStart={() => {
          document.body.style.userSelect = 'none';
          setIsDragging(true);
        }}
        onDragEnd={() => {
          document.body.style.userSelect = '';
          setIsDragging(false);
        }}
        onMouseEnter={() => {
          if (!isDragging) {
            document.body.style.cursor = 'grab';
          }
        }}
        onMouseLeave={() => {
          if (!isDragging) {
            document.body.style.cursor = '';
          }
        }}
      >
        <div className="flex flex-col gap-[200px] items-center p-[100px]">
          {/* Row 1 */}
          <div className="flex gap-[200px] items-start">
            {images.slice(0, 4).map((image, mapIndex) => {
              const actualIndex = mapIndex; // 0, 1, 2, 3
              return (
              <motion.div
                key={actualIndex}
                className="flex items-center justify-center w-[200px] h-[200px] cursor-pointer"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                onMouseEnter={() => setHoveredImage(image.src)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(image);
                  setSelectedImageIndex(actualIndex);
                }}
                onKeyDown={(e) => {
                  // Allow Enter and Space to open lightbox
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedImage(image);
                    setSelectedImageIndex(actualIndex);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${image.alt} in lightbox`}
              >
                <ImageWithLoading
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full rounded-md"
                />
              </motion.div>
            );
            })}
          </div>

          {/* Row 2 with profile */}
          <div className="flex gap-[200px] items-start">
            {/* Image 5 */}
            <motion.div
              className="flex items-center justify-center w-[200px] h-[200px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredImage(images[4].src)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(images[4]);
                setSelectedImageIndex(4);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedImage(images[4]);
                  setSelectedImageIndex(4);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${images[4].alt} in lightbox`}
            >
              <ImageWithLoading
                src={images[4].src}
                alt={images[4].alt}
                width={images[4].width}
                height={images[4].height}
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full rounded-md"
              />
            </motion.div>

            {/* Image 6 */}
            <motion.div
              className="flex items-center justify-center w-[200px] h-[200px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredImage(images[5].src)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(images[5]);
                setSelectedImageIndex(5);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedImage(images[5]);
                  setSelectedImageIndex(5);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${images[5].alt} in lightbox`}
            >
              <ImageWithLoading
                src={images[5].src}
                alt={images[5].alt}
                width={images[5].width}
                height={images[5].height}
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full rounded-md"
              />
            </motion.div>

            {/* Profile Section */}
            <div className="flex gap-[10px] items-center h-[200px] justify-center">
              <div className="bg-white overflow-clip relative rounded-full shrink-0 w-[250px] h-[250px]">
                <div className="absolute h-[330px] left-[-55.5px] mix-blend-difference top-0 w-[361px]">
                  <ImageWithLoading
                    src={imgAsciiArt21}
                    alt="ASCII Art Profile"
                    className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col font-sans font-normal gap-[8px] items-start justify-center leading-[12px] text-[12px]">
                <p className="relative shrink-0 text-[#fafafa]">404roy</p>
                <p className="relative shrink-0 text-[#a3a3a3]">Curating and training taste</p>
              </div>
            </div>

            {/* Screenshot */}
            <motion.div
              className="flex items-center justify-center w-[200px] h-[200px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredImage(images[6].src)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(images[6]);
                setSelectedImageIndex(6);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedImage(images[6]);
                  setSelectedImageIndex(6);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${images[6].alt} in lightbox`}
            >
              <div className="relative w-full aspect-[1840/876]">
                <ImageWithLoading
                  src={images[6].src}
                  alt={images[6].alt}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full rounded-md"
                />
              </div>
            </motion.div>

            {/* Image 7 */}
            <motion.div
              className="flex items-center justify-center w-[200px] h-[200px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredImage(images[7].src)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(images[7]);
                setSelectedImageIndex(7);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedImage(images[7]);
                  setSelectedImageIndex(7);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${images[7].alt} in lightbox`}
            >
              <ImageWithLoading
                src={images[7].src}
                alt={images[7].alt}
                width={images[7].width}
                height={images[7].height}
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full rounded-md"
              />
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="flex gap-[200px] items-start">
            {images.slice(8, 12).map((image, mapIndex) => {
              const actualIndex = mapIndex + 8; // 8, 9, 10, 11
              return (
              <motion.div
                key={actualIndex}
                className="flex items-center justify-center w-[200px] h-[200px] cursor-pointer"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                onMouseEnter={() => setHoveredImage(image.src)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(image);
                  setSelectedImageIndex(actualIndex);
                }}
                onKeyDown={(e) => {
                  // Allow Enter and Space to open lightbox
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedImage(image);
                    setSelectedImageIndex(actualIndex);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${image.alt} in lightbox`}
              >
                <ImageWithLoading
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full rounded-md"
                />
              </motion.div>
            );
            })}
            <motion.div
              className="flex items-center justify-center w-[200px] h-[200px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredImage(images[3].src)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(images[3]);
                setSelectedImageIndex(3);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedImage(images[3]);
                  setSelectedImageIndex(3);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${images[3].alt} in lightbox`}
            >
              <ImageWithLoading
                src={images[3].src}
                alt={images[3].alt}
                width={images[3].width}
                height={images[3].height}
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full rounded-md"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
      </div>
      {/* End main content area */}

      {/* Fixed UI Elements */}
      <div className="absolute content-stretch flex items-center p-[16px] right-0 top-0 pointer-events-none">
        <LucideIcons16PxPanelRight />
      </div>

      <div className="absolute bottom-0 content-stretch flex items-center left-0 p-[16px]">
        <div className="flex gap-[8px] items-center px-[10px] py-[4px] rounded-full cursor-pointer hover:bg-[#1a1a1a] transition-colors">
          <p className="font-sans font-medium leading-[20px] overflow-hidden text-[#a3a3a3] text-[14px] text-ellipsis">
            subscribe
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            ref={lightboxRef}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8 cursor-pointer"
            onClick={(e) => {
              // Only close if clicking the backdrop (not the image container) and not zoomed
              if (e.target === e.currentTarget && !isZoomed) {
                setSelectedImage(null);
                setSelectedImageIndex(null);
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <motion.div
              ref={imageContainerRef}
              initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-[90vw] max-h-[90vh] cursor-default touch-none"
              onClick={(e) => {
                // Close on tap outside when not zoomed (mobile)
                if (!isZoomed && e.target === e.currentTarget) {
                  setSelectedImage(null);
                  setSelectedImageIndex(null);
                }
                e.stopPropagation();
              }}
              style={{ touchAction: 'none' }}
            >
              {/* Image container with zoom and pan */}
              <div
                className="relative w-full h-full overflow-hidden"
                  style={{
                    transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
                    transformOrigin: 'center center',
                    transition: prefersReducedMotion ? 'none' : (isZoomed ? 'none' : 'transform 0.3s ease-out'),
                  }}
              >
                {/* Thumbnail placeholder - shows while high-res loads */}
                <motion.img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="absolute inset-0 max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl pointer-events-none"
                  style={{ maxWidth: '90vw', maxHeight: '90vh' }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isLightboxImageLoaded ? 0 : 1 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
                />
                
                {/* High-resolution image - fades in when loaded */}
                {isLightboxImageLoaded && (
                  <motion.img
                    src={getLightboxImageUrl(selectedImage.src)}
                    alt={selectedImage.alt}
                    className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl relative pointer-events-none select-none"
                    style={{ maxWidth: '90vw', maxHeight: '90vh', userSelect: 'none' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
                    draggable={false}
                  />
                )}
              </div>
              
              {/* Zoom indicator for mobile */}
              {isZoomed && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                  Pinch to zoom out or double tap to reset
                </div>
              )}
              
              {/* Loading indicator */}
              {isLightboxImageLoading && !isLightboxImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <Spinner size="lg" className="text-white" />
                </div>
              )}
              
              {/* Image counter and navigation hints */}
              {selectedImageIndex !== null && !isZoomed && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  <span className="mr-2">{selectedImageIndex + 1} / {images.length}</span>
                  <span className="text-xs text-gray-300 hidden sm:inline">← → to navigate, ESC to close</span>
                  <span className="text-xs text-gray-300 sm:hidden">Swipe to navigate, tap outside to close</span>
                </div>
              )}
              
              {/* Previous/Next navigation buttons */}
              {selectedImageIndex !== null && (
                <>
                  {/* Previous button */}
                  <motion.button
                    ref={previousButtonRef}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 cursor-pointer backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      const prevIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1;
                      setSelectedImageIndex(prevIndex);
                      setSelectedImage(images[prevIndex]);
                    }}
                    aria-label="Previous image"
                    title="Previous (←)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </motion.button>
                  
                  {/* Next button */}
                  <motion.button
                    ref={nextButtonRef}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 cursor-pointer backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextIndex = selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0;
                      setSelectedImageIndex(nextIndex);
                      setSelectedImage(images[nextIndex]);
                    }}
                    aria-label="Next image"
                    title="Next (→)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </motion.button>
                </>
              )}
              
              <motion.button
                ref={closeButtonRef}
                whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 90 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2 shadow-lg cursor-pointer z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedImageIndex(null);
                }}
                aria-label="Close lightbox"
                title="Close (ESC)"
              >
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
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

