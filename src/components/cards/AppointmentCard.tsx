import { Calendar, Clock, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentCardProps {
  patientName: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: "confirmed" | "pending" | "cancelled";
  className?: string;
}

const statusConfig = {
  confirmed: {
    label: "Confirmé",
    className: "bg-success-light text-success",
  },
  pending: {
    label: "En attente",
    className: "bg-warning-light text-warning",
  },
  cancelled: {
    label: "Annulé",
    className: "bg-destructive-light text-destructive",
  },
};

const AppointmentCard = ({
  patientName,
  doctorName,
  specialty,
  date,
  time,
  location,
  status,
  className,
}: AppointmentCardProps) => {
  const statusInfo = statusConfig[status];

  return (
    <div
      className={cn(
        "card-medical overflow-hidden p-0 transition-all duration-300",
        className
      )}
    >
      {/* Status indicator bar */}
      <div
        className={cn(
          "h-1 w-full",
          status === "confirmed" && "bg-success",
          status === "pending" && "bg-warning",
          status === "cancelled" && "bg-destructive"
        )}
      />

      <div className="p-4">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{patientName}</h4>
              <p className="text-sm text-muted-foreground">{specialty}</p>
            </div>
          </div>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
              statusInfo.className
            )}
          >
            {statusInfo.label}
          </span>
        </div>

        {/* Doctor info */}
        <div className="mb-3 rounded-lg bg-muted/50 p-3">
          <p className="text-sm text-muted-foreground">Médecin</p>
          <p className="font-medium text-foreground">{doctorName}</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
