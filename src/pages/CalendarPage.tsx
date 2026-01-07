import { useState, useMemo } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addMonths, subMonths, addYears, subYears } from "date-fns";
import { fr } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { 
  ChevronLeft, 
  ChevronRight, 
  CalendarDays, 
  CalendarRange, 
  Calendar as CalendarIcon,
  Filter,
  Search
} from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const locales = {
  fr: fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Simulated appointments data for one year
const generateAppointments = () => {
  const appointments = [];
  const specialties = ["Cardiologie", "Dermatologie", "Neurologie", "Pédiatrie", "Orthopédie", "Ophtalmologie"];
  const doctors = [
    "Dr. Jean Martin",
    "Dr. Sophie Lambert",
    "Dr. Marc Dubois",
    "Dr. Anne Richard",
    "Dr. Paul Moreau",
    "Dr. Claire Bernard",
  ];
  const patients = [
    "Marie Dupont",
    "Pierre Bernard",
    "Claire Moreau",
    "Lucas Petit",
    "Emma Leroy",
    "Hugo Martin",
    "Léa Durand",
    "Thomas Robert",
  ];
  const statuses = ["confirmed", "pending", "cancelled"] as const;

  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);
  const endDate = new Date(today.getFullYear(), 11, 31);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const appointmentsPerDay = Math.floor(Math.random() * 8) + 2;
    
    for (let i = 0; i < appointmentsPerDay; i++) {
      const hour = 8 + Math.floor(Math.random() * 10);
      const minute = Math.random() > 0.5 ? 0 : 30;
      const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute);
      const end = new Date(start.getTime() + (30 + Math.floor(Math.random() * 3) * 30) * 60000);
      
      const specialtyIndex = Math.floor(Math.random() * specialties.length);
      
      appointments.push({
        id: appointments.length + 1,
        title: `${patients[Math.floor(Math.random() * patients.length)]}`,
        start,
        end,
        doctor: doctors[specialtyIndex],
        specialty: specialties[specialtyIndex],
        patient: patients[Math.floor(Math.random() * patients.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        room: `Salle ${100 + Math.floor(Math.random() * 300)}`,
      });
    }
  }
  
  return appointments;
};

type CalendarView = "day" | "month" | "year";

const CalendarPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<CalendarView>("month");
  const [bigCalendarView, setBigCalendarView] = useState<View>("month");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const appointments = useMemo(() => generateAppointments(), []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesSpecialty = selectedSpecialty === "all" || apt.specialty === selectedSpecialty;
      const matchesSearch = searchQuery === "" || 
        apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.doctor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSpecialty && matchesSearch;
    });
  }, [appointments, selectedSpecialty, searchQuery]);

  const handleNavigate = (direction: "prev" | "next" | "today") => {
    if (direction === "today") {
      setCurrentDate(new Date());
      return;
    }

    const modifier = direction === "prev" ? -1 : 1;
    
    if (calendarView === "day") {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + modifier)));
    } else if (calendarView === "month") {
      setCurrentDate(modifier === 1 ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
    } else {
      setCurrentDate(modifier === 1 ? addYears(currentDate, 1) : subYears(currentDate, 1));
    }
  };

  const handleViewChange = (view: CalendarView) => {
    setCalendarView(view);
    if (view === "day") {
      setBigCalendarView("day");
    } else if (view === "month") {
      setBigCalendarView("month");
    } else {
      setBigCalendarView("month"); // Year view uses custom rendering
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success text-white";
      case "pending":
        return "bg-warning text-white";
      case "cancelled":
        return "bg-destructive text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const eventStyleGetter = (event: any) => {
    let backgroundColor = "hsl(var(--primary))";
    
    if (event.status === "confirmed") {
      backgroundColor = "hsl(var(--success))";
    } else if (event.status === "pending") {
      backgroundColor = "hsl(var(--warning))";
    } else if (event.status === "cancelled") {
      backgroundColor = "hsl(var(--destructive))";
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        opacity: 0.9,
        color: "white",
        border: "none",
        fontSize: "0.75rem",
        padding: "2px 6px",
      },
    };
  };

  const renderYearView = () => {
    const months = [];
    const year = currentDate.getFullYear();
    
    for (let month = 0; month < 12; month++) {
      const monthDate = new Date(year, month, 1);
      const monthAppointments = filteredAppointments.filter(
        (apt) => apt.start.getMonth() === month && apt.start.getFullYear() === year
      );
      
      const confirmedCount = monthAppointments.filter(a => a.status === "confirmed").length;
      const pendingCount = monthAppointments.filter(a => a.status === "pending").length;
      const cancelledCount = monthAppointments.filter(a => a.status === "cancelled").length;
      
      months.push(
        <div 
          key={month} 
          className="card-medical p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          onClick={() => {
            setCurrentDate(monthDate);
            setCalendarView("month");
          }}
        >
          <h3 className="font-display font-semibold text-foreground mb-3 capitalize">
            {format(monthDate, "MMMM", { locale: fr })}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-medium text-foreground">{monthAppointments.length}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <div className="flex-1 h-2 rounded-full bg-success/20 overflow-hidden">
                <div 
                  className="h-full bg-success rounded-full transition-all duration-500"
                  style={{ width: `${(confirmedCount / Math.max(monthAppointments.length, 1)) * 100}%` }}
                />
              </div>
              <div className="flex-1 h-2 rounded-full bg-warning/20 overflow-hidden">
                <div 
                  className="h-full bg-warning rounded-full transition-all duration-500"
                  style={{ width: `${(pendingCount / Math.max(monthAppointments.length, 1)) * 100}%` }}
                />
              </div>
              <div className="flex-1 h-2 rounded-full bg-destructive/20 overflow-hidden">
                <div 
                  className="h-full bg-destructive rounded-full transition-all duration-500"
                  style={{ width: `${(cancelledCount / Math.max(monthAppointments.length, 1)) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-success" />
                {confirmedCount}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-warning" />
                {pendingCount}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                {cancelledCount}
              </span>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {months}
      </div>
    );
  };

  const messages = {
    today: "Aujourd'hui",
    previous: "Précédent",
    next: "Suivant",
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    agenda: "Agenda",
    date: "Date",
    time: "Heure",
    event: "Rendez-vous",
    noEventsInRange: "Aucun rendez-vous dans cette période.",
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole="hospital"
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                  Calendrier des rendez-vous
                </h1>
                <p className="mt-1 text-muted-foreground">
                  Visualisez et gérez tous les rendez-vous
                </p>
              </div>
              
              {/* View Toggles */}
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                <Button
                  variant={calendarView === "day" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleViewChange("day")}
                  className="gap-2"
                >
                  <CalendarDays className="h-4 w-4" />
                  <span className="hidden sm:inline">Jour</span>
                </Button>
                <Button
                  variant={calendarView === "month" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleViewChange("month")}
                  className="gap-2"
                >
                  <CalendarRange className="h-4 w-4" />
                  <span className="hidden sm:inline">Mois</span>
                </Button>
                <Button
                  variant={calendarView === "year" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleViewChange("year")}
                  className="gap-2"
                >
                  <CalendarIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Année</span>
                </Button>
              </div>
            </div>

            {/* Filters and Navigation */}
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Navigation */}
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => handleNavigate("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => handleNavigate("today")}>
                  Aujourd'hui
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleNavigate("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <h2 className="ml-2 font-display text-lg font-semibold text-foreground capitalize">
                  {calendarView === "year" 
                    ? format(currentDate, "yyyy", { locale: fr })
                    : calendarView === "day"
                    ? format(currentDate, "EEEE d MMMM yyyy", { locale: fr })
                    : format(currentDate, "MMMM yyyy", { locale: fr })
                  }
                </h2>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-[200px]"
                  />
                </div>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les spécialités</SelectItem>
                    <SelectItem value="Cardiologie">Cardiologie</SelectItem>
                    <SelectItem value="Dermatologie">Dermatologie</SelectItem>
                    <SelectItem value="Neurologie">Neurologie</SelectItem>
                    <SelectItem value="Pédiatrie">Pédiatrie</SelectItem>
                    <SelectItem value="Orthopédie">Orthopédie</SelectItem>
                    <SelectItem value="Ophtalmologie">Ophtalmologie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Calendar Legend */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-muted-foreground">Confirmé</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-muted-foreground">En attente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Annulé</span>
              </div>
              <div className="ml-auto text-muted-foreground">
                {filteredAppointments.length} rendez-vous au total
              </div>
            </div>

            {/* Calendar Content */}
            <div className="card-medical p-4 md:p-6">
              {calendarView === "year" ? (
                renderYearView()
              ) : (
                <div className="calendar-container">
                  <BigCalendar
                    localizer={localizer}
                    events={filteredAppointments}
                    startAccessor="start"
                    endAccessor="end"
                    view={bigCalendarView}
                    onView={(view) => setBigCalendarView(view)}
                    date={currentDate}
                    onNavigate={(date) => setCurrentDate(date)}
                    eventPropGetter={eventStyleGetter}
                    messages={messages}
                    culture="fr"
                    style={{ height: calendarView === "day" ? 600 : 700 }}
                    views={["month", "day"]}
                    toolbar={false}
                    popup
                    tooltipAccessor={(event: any) => 
                      `${event.patient}\n${event.doctor}\n${event.specialty}\n${event.room}`
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .calendar-container .rbc-calendar {
          font-family: var(--font-sans);
        }
        
        .calendar-container .rbc-header {
          padding: 12px 4px;
          font-weight: 600;
          color: hsl(var(--foreground));
          background: hsl(var(--muted) / 0.5);
          border-bottom: 1px solid hsl(var(--border));
        }
        
        .calendar-container .rbc-month-view,
        .calendar-container .rbc-time-view {
          border: 1px solid hsl(var(--border));
          border-radius: 8px;
          overflow: hidden;
        }
        
        .calendar-container .rbc-day-bg {
          transition: background-color 0.2s;
        }
        
        .calendar-container .rbc-day-bg:hover {
          background-color: hsl(var(--muted) / 0.3);
        }
        
        .calendar-container .rbc-today {
          background-color: hsl(var(--primary) / 0.1);
        }
        
        .calendar-container .rbc-off-range-bg {
          background-color: hsl(var(--muted) / 0.2);
        }
        
        .calendar-container .rbc-date-cell {
          padding: 4px 8px;
          text-align: right;
          font-size: 0.875rem;
          color: hsl(var(--muted-foreground));
        }
        
        .calendar-container .rbc-date-cell.rbc-now {
          font-weight: 700;
          color: hsl(var(--primary));
        }
        
        .calendar-container .rbc-event {
          border-radius: 4px !important;
        }
        
        .calendar-container .rbc-event:focus {
          outline: 2px solid hsl(var(--primary));
          outline-offset: 2px;
        }
        
        .calendar-container .rbc-show-more {
          color: hsl(var(--primary));
          font-weight: 500;
          font-size: 0.75rem;
        }
        
        .calendar-container .rbc-time-header-cell {
          color: hsl(var(--foreground));
        }
        
        .calendar-container .rbc-timeslot-group {
          border-bottom: 1px solid hsl(var(--border) / 0.5);
        }
        
        .calendar-container .rbc-time-slot {
          color: hsl(var(--muted-foreground));
          font-size: 0.75rem;
        }
        
        .calendar-container .rbc-current-time-indicator {
          background-color: hsl(var(--destructive));
        }
        
        .calendar-container .rbc-overlay {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 8px;
          box-shadow: 0 10px 40px -10px hsl(var(--foreground) / 0.2);
          padding: 8px;
        }
        
        .calendar-container .rbc-overlay-header {
          padding: 8px;
          font-weight: 600;
          color: hsl(var(--foreground));
          border-bottom: 1px solid hsl(var(--border));
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
