import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfter({ 
  beforeImage, 
  afterImage, 
  beforeLabel = "Antes", 
  afterLabel = "Después" 
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto select-none">
      <div 
        ref={containerRef}
        className="relative aspect-square w-full overflow-hidden rounded-xl border shadow-lg cursor-ew-resize touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <img 
          src={afterImage} 
          alt={afterLabel} 
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold backdrop-blur-sm pointer-events-none">
          {afterLabel}
        </div>

        {/* Before Image (Foreground - Clipped) */}
        <div 
          className="absolute inset-0 h-full w-full overflow-hidden border-r-2 border-white bg-background"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt={beforeLabel} 
            className="absolute inset-0 h-full w-full object-cover max-w-none"
            style={{ width: containerRef.current?.offsetWidth || '100%' }}
          />
          <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold backdrop-blur-sm pointer-events-none">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute inset-y-0 w-10 -ml-5 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="h-10 w-10 bg-white rounded-full shadow-xl flex items-center justify-center text-primary">
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-2">
        Desliza para comparar el antes y después
      </p>
    </div>
  );
}
