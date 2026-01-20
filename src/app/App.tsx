import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "@/imports/svg-kbzv1ln0jh";
import imgB92F525A0F8546AcA864F29A26Ce8B401105C1 from "figma:asset/ae5250824becf106ac837e68a988c4d0092d1a2f.png";
import imgImage82 from "figma:asset/70b64e347756efd35123625367f064f787b7919e.png";
import imgImage80 from "figma:asset/3e5265eedb98844e2704a93ef621c39910c365d8.png";
import imgImage83 from "figma:asset/be4df26583ff6894b2e534c4d647f2507df30dbd.png";
import imgImage85 from "figma:asset/8236d6e8f9fccc6df5d3dddc47a96072ae6fe24f.png";
import imgImage75 from "figma:asset/dea38407ba9fbc3f3e9b7dec02750ccb5dd809ba.png";
import imgAsciiArt21 from "figma:asset/47eaf2c8363a50116a2826633fdb8762f5f4fc16.png";
import imgScreenshot20260119At1906511 from "figma:asset/a1b1b9b68c35e814047c698f689c077cf125870c.png";
import imgImage79 from "figma:asset/eeadd352072d54c5356c83016225f14eda9f85c1.png";
import imgFd841FbeA7D54F61Abb4580E3E7B01Df1105C1 from "figma:asset/1d275872dfa17b20dc5ac5896adf9d402fd289ca.png";
import img356Dab50Ef144C548C5E3509E1472Bee1105C1 from "figma:asset/ec4ee6ed31dbadac96e7170b995d804e149ce8c4.png";
import imgImage72 from "figma:asset/c8e4092ec62925782d83641eef93b7349f3a1558.png";
import imgImage81 from "figma:asset/a5c624e693fd9da53b8ca002b3d1ffd852e1e3c2.png";

interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const images: ImageData[] = [
  { src: imgB92F525A0F8546AcA864F29A26Ce8B401105C1, alt: "Image 1", width: 84, height: 112 },
  { src: imgImage82, alt: "Image 2", width: 112, height: 112 },
  { src: imgImage80, alt: "Image 3", width: 112, height: 112 },
  { src: imgImage83, alt: "Image 4", width: 112, height: 112 },
  { src: imgImage85, alt: "Image 5", width: 168, height: 112 },
  { src: imgImage75, alt: "Image 6", width: 133, height: 112 },
  { src: imgScreenshot20260119At1906511, alt: "Screenshot", width: 200, height: 95 },
  { src: imgImage79, alt: "Image 7", width: 82, height: 112 },
  { src: imgImage81, alt: "Image 8", width: 200, height: 200 },
  { src: imgFd841FbeA7D54F61Abb4580E3E7B01Df1105C1, alt: "Image 9", width: 84, height: 112 },
  { src: img356Dab50Ef144C548C5E3509E1472Bee1105C1, alt: "Image 10", width: 84, height: 112 },
  { src: imgImage72, alt: "Image 11", width: 133, height: 112 },
];

function LucideIcons16PxPanelRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="lucide-icons/16px/panel-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="lucide-icons/16px/panel-right">
          <path d={svgPaths.p32991b00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const constraintsRef = useRef(null);

  return (
    <div className="bg-[#0a0a0a] size-full overflow-hidden relative" ref={constraintsRef}>
      {/* Draggable Canvas */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        className="absolute cursor-grab active:cursor-grabbing"
        style={{
          x: position.x,
          y: position.y,
        }}
        onDrag={(event, info) => {
          setPosition({ x: info.offset.x, y: info.offset.y });
        }}
      >
        <div className="flex flex-col gap-[200px] items-center p-[100px]">
          {/* Row 1 */}
          <div className="flex gap-[200px] items-start">
            {images.slice(0, 4).map((image, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center size-[200px] cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(image);
                }}
              >
                <div className="relative" style={{ width: image.width, height: image.height }}>
                  <img
                    alt={image.alt}
                    className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-md"
                    src={image.src}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 2 with profile */}
          <div className="flex gap-[200px] items-start">
            {/* Image 5 */}
            <motion.div
              className="flex items-center justify-center size-[200px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(images[4]);
              }}
            >
              <div className="relative" style={{ width: images[4].width, height: images[4].height }}>
                <img
                  alt={images[4].alt}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-md"
                  src={images[4].src}
                />
              </div>
            </motion.div>

            {/* Image 6 */}
            <motion.div
              className="flex items-center justify-center size-[200px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(images[5]);
              }}
            >
              <div className="relative" style={{ width: images[5].width, height: images[5].height }}>
                <img
                  alt={images[5].alt}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-md"
                  src={images[5].src}
                />
              </div>
            </motion.div>

            {/* Profile Section */}
            <div className="flex gap-[10px] items-center h-[200px] justify-center">
              <div className="bg-white overflow-clip relative rounded-full shrink-0 size-[250px]">
                <div className="absolute h-[330px] left-[-55.5px] mix-blend-difference top-0 w-[361px]">
                  <img
                    alt="ASCII Art Profile"
                    className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                    src={imgAsciiArt21}
                  />
                </div>
              </div>
              <div className="flex flex-col font-['Space_Grotesk:Regular',sans-serif] font-normal gap-[8px] items-start justify-center leading-[12px] text-[12px]">
                <p className="css-ew64yg relative shrink-0 text-[#fafafa]">404roy</p>
                <p className="css-ew64yg relative shrink-0 text-[#a3a3a3]">Curating and training taste</p>
              </div>
            </div>

            {/* Screenshot */}
            <motion.div
              className="flex items-center justify-center size-[200px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(images[6]);
              }}
            >
              <div className="relative w-full aspect-[1840/876]">
                <img
                  alt={images[6].alt}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-md"
                  src={images[6].src}
                />
              </div>
            </motion.div>

            {/* Image 7 */}
            <motion.div
              className="flex items-center justify-center size-[200px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(images[7]);
              }}
            >
              <div className="relative" style={{ width: images[7].width, height: images[7].height }}>
                <img
                  alt={images[7].alt}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-md"
                  src={images[7].src}
                />
              </div>
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="flex gap-[200px] items-start">
            {images.slice(8, 12).map((image, index) => (
              <motion.div
                key={index + 8}
                className="flex items-center justify-center size-[200px] cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(image);
                }}
              >
                <div className="relative" style={{ width: image.width, height: image.height }}>
                  <img
                    alt={image.alt}
                    className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-md"
                    src={image.src}
                  />
                </div>
              </motion.div>
            ))}
            <motion.div
              className="flex items-center justify-center size-[200px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(images[3]);
              }}
            >
              <div className="relative" style={{ width: images[3].width, height: images[3].height }}>
                <img
                  alt={images[3].alt}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-md"
                  src={images[3].src}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Fixed UI Elements */}
      <div className="absolute content-stretch flex items-center p-[16px] right-0 top-0 pointer-events-none">
        <LucideIcons16PxPanelRight />
      </div>

      <div className="absolute bottom-0 content-stretch flex items-center left-0 p-[16px]">
        <div className="flex gap-[8px] items-center px-[10px] py-[4px] rounded-full cursor-pointer hover:bg-[#1a1a1a] transition-colors">
          <p className="css-ew64yg font-['Geist:Medium',sans-serif] font-medium leading-[20px] overflow-hidden text-[#a3a3a3] text-[14px] text-ellipsis">
            subscribe
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-[90vw] max-h-[90vh] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2 shadow-lg cursor-pointer"
                onClick={() => setSelectedImage(null)}
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
