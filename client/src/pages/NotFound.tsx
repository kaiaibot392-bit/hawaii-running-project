import { useLocation, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen pt-16 flex items-center">
      <div className="section-container px-6 lg:px-10 py-24 grid lg:grid-cols-12 gap-10 lg:gap-16 w-full">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">Error 404</p>
          <div className="display-rule mb-8" />
          <h1 className="font-display text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
            Off the route.
          </h1>
        </div>
        <div className="lg:col-span-8 lg:pt-2">
          <p className="text-lg text-muted-foreground leading-relaxed">
            We couldn't find the page you were looking for.
            {location.pathname ? (
              <span className="block mt-2 font-mono text-sm text-muted-foreground/80">
                {location.pathname}
              </span>
            ) : null}
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
