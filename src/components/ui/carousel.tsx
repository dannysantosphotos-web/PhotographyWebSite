import * as React from "react";
import Slider, { type Settings } from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SlickArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type CarouselApi = {
  slickNext: () => void;
  slickPrev: () => void;
  slickGoTo: (index: number, dontAnimate?: boolean) => void;
  innerSlider?: {
    state?: {
      currentSlide: number;
      slideCount: number;
    };
  };
} | null;

type CarouselOptions = Settings;

type CarouselProps = {
  opts?: CarouselOptions;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, className, children, ...props }, ref) => {
    const [api, setLocalApi] = React.useState<CarouselApi>(null);

    const scrollPrev = React.useCallback(() => {
      api?.slickPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.slickNext();
    }, [api]);

    const canScrollPrev = Boolean(api?.innerSlider?.state?.currentSlide && api.innerSlider.state.currentSlide > 0);
    const canScrollNext = Boolean(
      api?.innerSlider?.state?.currentSlide != null &&
        api?.innerSlider?.state?.slideCount != null &&
        api.innerSlider.state.currentSlide < api.innerSlider.state.slideCount - 1,
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    return (
      <CarouselContext.Provider
        value={{
          api,
          opts,
          orientation: orientation || "horizontal",
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          setApi: setLocalApi,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const SlickPrevArrow = ({ className, style, onClick }: SlickArrowProps) => (
  <button
    type="button"
    className={cn("inline-flex items-center justify-center rounded-full bg-background shadow-lg", className)}
    style={style}
    onClick={onClick}
  >
    <ArrowLeft className="h-4 w-4" />
    <span className="sr-only">Previous slide</span>
  </button>
);

const SlickNextArrow = ({ className, style, onClick }: SlickArrowProps) => (
  <button
    type="button"
    className={cn("inline-flex items-center justify-center rounded-full bg-background shadow-lg", className)}
    style={style}
    onClick={onClick}
  >
    <ArrowRight className="h-4 w-4" />
    <span className="sr-only">Next slide</span>
  </button>
);

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { opts, setApi } = useCarousel();
    const sliderRef = React.useRef<any>(null);

    React.useLayoutEffect(() => {
      if (!setApi) {
        return;
      }

      if (sliderRef.current) {
        setApi(sliderRef.current as CarouselApi);
      }
    }, [setApi]);

    return (
      <div ref={ref} className={cn("overflow-hidden relative", className)} {...props}>
        <Slider
          ref={sliderRef}
          {...opts}
          arrows={true}
          prevArrow={<SlickPrevArrow />}
          nextArrow={<SlickNextArrow />}
        >
          {children}
        </Slider>
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
