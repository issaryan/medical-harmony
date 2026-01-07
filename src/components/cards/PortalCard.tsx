import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortalCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: "primary" | "accent" | "success" | "warning";
  onClick?: () => void;
  className?: string;
}

const colorStyles = {
  primary: {
    icon: "bg-primary/10 text-primary",
    hover: "hover:border-primary/40",
    gradient: "from-primary/5 to-transparent",
  },
  accent: {
    icon: "bg-accent/10 text-accent",
    hover: "hover:border-accent/40",
    gradient: "from-accent/5 to-transparent",
  },
  success: {
    icon: "bg-success/10 text-success",
    hover: "hover:border-success/40",
    gradient: "from-success/5 to-transparent",
  },
  warning: {
    icon: "bg-warning/10 text-warning",
    hover: "hover:border-warning/40",
    gradient: "from-warning/5 to-transparent",
  },
};

const PortalCard = ({
  title,
  description,
  icon: Icon,
  color,
  onClick,
  className,
}: PortalCardProps) => {
  const styles = colorStyles[color];

  return (
    <button
      onClick={onClick}
      className={cn(
        "portal-card group w-full text-left",
        styles.hover,
        className
      )}
    >
      {/* Gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          styles.gradient
        )}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={cn(
            "mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
            styles.icon
          )}
        >
          <Icon className="h-7 w-7" />
        </div>

        {/* Content */}
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Arrow indicator */}
        <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
          Accéder
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default PortalCard;
