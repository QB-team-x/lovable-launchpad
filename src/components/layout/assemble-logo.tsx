import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * شعار «التجمّع» — حرفا qb مبنيان من مكعبات على شبكة،
 * بأسلوب الخط الكوفي المربّع (وهو نفسه أسلوب البكسل في الألعاب).
 * المكعبات تطير من الخارج وتتراصّ لتبني الشعار عند التحميل.
 *
 * x, y, w, h : موقع وحجم المكعب داخل الشبكة (viewBox 300×240)
 * dx, dy     : من أين يطير المكعب قبل أن يستقر
 * tone       : ink = أبيض (حرف q) | brand = أحمر (حرف b) | dot = ذهبي (النقاط العربية)
 */
const BLOCKS = [
  // حرف q
  { x: 30, y: 40, w: 100, h: 20, dx: -90, dy: -70, tone: "ink" },
  { x: 30, y: 40, w: 20, h: 100, dx: -110, dy: 30, tone: "ink" },
  { x: 110, y: 40, w: 20, h: 160, dx: 60, dy: -90, tone: "ink" },
  { x: 30, y: 120, w: 100, h: 20, dx: -70, dy: 80, tone: "ink" },
  // حرف b
  { x: 150, y: 20, w: 20, h: 180, dx: 40, dy: -100, tone: "brand" },
  { x: 170, y: 100, w: 100, h: 20, dx: 110, dy: -20, tone: "brand" },
  { x: 250, y: 100, w: 20, h: 100, dx: 120, dy: 60, tone: "brand" },
  { x: 150, y: 180, w: 120, h: 20, dx: 20, dy: 110, tone: "brand" },
  // النقاط العربية — تجعل qb تُقرأ «قب»
  { x: 54, y: 10, w: 18, h: 18, dx: -40, dy: -90, tone: "dot" },
  { x: 86, y: 10, w: 18, h: 18, dx: 30, dy: -95, tone: "dot" },
  { x: 200, y: 212, w: 18, h: 18, dx: 0, dy: 100, tone: "dot" },
] as const;

const TONE_CLASS = {
  ink: "fill-foreground",
  brand: "fill-primary",
  dot: "fill-secondary",
} as const;

type AssembleLogoProps = {
  /** العرض بالبكسل. الارتفاع يُحسب تلقائياً (80% من العرض). */
  size?: number;
  /** تعطيل الحركة تماماً (للاستخدام في الهيدر أو الأماكن الصغيرة). */
  animated?: boolean;
  className?: string;
};

export function AssembleLogo({
  size = 200,
  animated = true,
  className,
}: AssembleLogoProps) {
  const ref = useRef<SVGSVGElement>(null);

  /** إعادة تشغيل الحركة عند المرور بالماوس أو اللمس. */
  const replay = useCallback(() => {
    if (!animated) return;
    ref.current?.querySelectorAll<SVGRectElement>(".qb-px").forEach((el) => {
      el.style.animation = "none";
      void el.getBoundingClientRect();
      el.style.animation = "";
    });
  }, [animated]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 300 240"
      width={size}
      height={size * 0.8}
      role="img"
      aria-label="qbLive"
      onMouseEnter={replay}
      onClick={replay}
      className={cn(animated && "cursor-pointer", className)}
    >
      {BLOCKS.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={2}
          className={cn(TONE_CLASS[b.tone], animated && "qb-px")}
          style={
            animated
              ? ({
                  "--qb-dx": `${b.dx}px`,
                  "--qb-dy": `${b.dy}px`,
                  animationDelay: `${0.12 + i * 0.055}s`,
                } as React.CSSProperties)
              : undefined
          }
        />
      ))}
    </svg>
  );
}
