import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  afterLabel = "Después",
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  //measured width stored in state (so React re-renders when it's ready)
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const handleMove = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;

    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  // Measure after layout + keep updated on resize
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      // Using getBoundingClientRect is generally safer than offsetWidth inside transformed layouts
      const w = Math.round(el.getBoundingClientRect().width);
      if (w > 0) setContainerWidth(w);
    };

    // measure now + after a couple frames
    measure();
    const raf1 = requestAnimationFrame(() => {
      measure();
      requestAnimationFrame(measure);
    });

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf1);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto select-none">
      <div
        ref={containerRef}
        className="relative aspect-square w-full overflow-hidden rounded-xl border shadow-lg cursor-ew-resize touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
        onDragStart={(e) => e.preventDefault()}
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
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
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="absolute inset-0 h-full w-full object-cover max-w-none pointer-events-none select-none"
            style={{ width: containerWidth ? `${containerWidth}px` : "100%" }}
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
