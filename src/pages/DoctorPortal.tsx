import { useState, useMemo } from "react";
import {
  Stethoscope,
  Calendar,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  Search,
  Phone,
  Mail,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  User,
} from "lucide-react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/cards/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Simulated doctor data
const doctorInfo = {
  name: "Dr. Jean Martin",
  specialty: "Cardiologie",
  hospital: "CHU Central",
  email: "jean.martin@hospital.fr",
  phone: "+33 1 23 45 67 89",
};

// Generate appointments for the week
const generateWeekAppointments = (startDate: Date) => {
  const appointments = [];
  const patients = [
    { name: "Marie Dupont", age: 45, condition: "Contrôle annuel" },
    { name: "Pierre Bernard", age: 62, condition: "Suivi hypertension" },
    { name: "Claire Moreau", age: 38, condition: "Consultation initiale" },
    { name: "Lucas Petit", age: 55, condition: "ECG de contrôle" },
    { name: "Emma Leroy", age: 29, condition: "Palpitations" },
    { name: "Hugo Martin", age: 71, condition: "Suivi post-opératoire" },
    { name: "Léa Durand", age: 42, condition: "Bilan cardiaque" },
  ];
  const statuses = ["confirmed", "pending", "cancelled"] as const;
  const times = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

  for (let day = 0; day < 7; day++) {
    const date = addDays(startDate, day);
    if (date.getDay() === 0 || date.getDay() === 6) continue; // Skip weekends

    const appointmentsCount = 4 + Math.floor(Math.random() * 6);
    const usedTimes = new Set<string>();

    for (let i = 0; i < appointmentsCount; i++) {
      let time;
      do {
        time = times[Math.floor(Math.random() * times.length)];
      } while (usedTimes.has(time));
      usedTimes.add(time);

      const patient = patients[Math.floor(Math.random() * patients.length)];
      appointments.push({
        id: `${day}-${i}`,
        date,
        time,
        patient: patient.name,
        age: patient.age,
        condition: patient.condition,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        room: `Salle ${100 + Math.floor(Math.random() * 10)}`,
      });
    }
  }

  return appointments.sort((a, b) => {
    const dateCompare = a.date.getTime() - b.date.getTime();
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });
};

// Simulated patients list
const patientsList = [
  {
    id: 1,
    name: "Marie Dupont",
    age: 45,
    lastVisit: "2025-01-05",
    nextAppointment: "2025-01-15",
    condition: "Hypertension",
    phone: "+33 6 12 34 56 78",
  },
  {
    id: 2,
    name: "Pierre Bernard",
    age: 62,
    lastVisit: "2025-01-03",
    nextAppointment: "2025-01-20",
    condition: "Arythmie cardiaque",
    phone: "+33 6 98 76 54 32",
  },
  {
    id: 3,
    name: "Claire Moreau",
    age: 38,
    lastVisit: "2024-12-28",
    nextAppointment: "2025-02-01",
    condition: "Suivi préventif",
    phone: "+33 6 45 67 89 01",
  },
  {
    id: 4,
    name: "Lucas Petit",
    age: 55,
    lastVisit: "2025-01-06",
    nextAppointment: "-",
    condition: "Post-opératoire",
    phone: "+33 6 23 45 67 89",
  },
];

const DoctorPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  const weekAppointments = useMemo(
    () => generateWeekAppointments(currentWeekStart),
    [currentWeekStart]
  );

  const todayAppointments = weekAppointments.filter((apt) =>
    isSameDay(apt.date, selectedDate)
  );

  const stats = [
    {
      title: "RDV aujourd'hui",
      value: todayAppointments.length,
      subtitle: `${todayAppointments.filter((a) => a.status === "confirmed").length} confirmés`,
      icon: Calendar,
      color: "primary" as const,
    },
    {
      title: "Patients suivis",
      value: 127,
      subtitle: "Ce mois",
      icon: Users,
      color: "accent" as const,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Prochain RDV",
      value: todayAppointments.find((a) => a.status !== "cancelled")?.time || "-",
      subtitle: todayAppointments.find((a) => a.status !== "cancelled")?.patient || "Aucun",
      icon: Clock,
      color: "success" as const,
    },
    {
      title: "En attente",
      value: todayAppointments.filter((a) => a.status === "pending").length,
      subtitle: "À confirmer",
      icon: AlertCircle,
      color: "warning" as const,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: "bg-success/10 text-success border-success/20",
      pending: "bg-warning/10 text-warning border-warning/20",
      cancelled: "bg-destructive/10 text-destructive border-destructive/20",
    };
    const labels = {
      confirmed: "Confirmé",
      pending: "En attente",
      cancelled: "Annulé",
    };
    return (
      <Badge variant="outline" className={styles[status as keyof typeof styles]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentWeekStart((prev) => addDays(prev, direction === "next" ? 7 : -7));
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const filteredPatients = patientsList.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole="doctor" />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <Avatar className="h-14 w-14 border-2 border-success/20">
                  <AvatarFallback className="bg-success/10 text-success text-lg font-semibold">
                    JM
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                    {doctorInfo.name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Stethoscope className="h-4 w-4" />
                    <span>{doctorInfo.specialty}</span>
                    <span className="text-border">•</span>
                    <span>{doctorInfo.hospital}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="animate-slide-up opacity-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <StatCard {...stat} />
                </div>
              ))}
            </div>

            {/* Main Content */}
            <Tabs defaultValue="schedule" className="space-y-6">
              <TabsList className="bg-muted">
                <TabsTrigger value="schedule" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Mon planning
                </TabsTrigger>
                <TabsTrigger value="patients" className="gap-2">
                  <Users className="h-4 w-4" />
                  Mes patients
                </TabsTrigger>
              </TabsList>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-6">
                {/* Week Navigation */}
                <div className="card-medical p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="outline" size="icon" onClick={() => navigateWeek("prev")}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="font-display text-lg font-semibold capitalize">
                      Semaine du {format(currentWeekStart, "d MMMM yyyy", { locale: fr })}
                    </h2>
                    <Button variant="outline" size="icon" onClick={() => navigateWeek("next")}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Week Days Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((day, index) => {
                      const dayAppointments = weekAppointments.filter((apt) =>
                        isSameDay(apt.date, day)
                      );
                      const isSelected = isSameDay(day, selectedDate);
                      const isToday = isSameDay(day, new Date());
                      const isWeekend = day.getDay() === 0 || day.getDay() === 6;

                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(day)}
                          disabled={isWeekend}
                          className={`p-3 rounded-lg text-center transition-all ${
                            isWeekend
                              ? "bg-muted/30 text-muted-foreground/50 cursor-not-allowed"
                              : isSelected
                              ? "bg-primary text-primary-foreground"
                              : isToday
                              ? "bg-primary/10 text-primary border border-primary/30"
                              : "hover:bg-muted"
                          }`}
                        >
                          <p className="text-xs uppercase opacity-70">
                            {format(day, "EEE", { locale: fr })}
                          </p>
                          <p className="text-lg font-semibold">{format(day, "d")}</p>
                          {!isWeekend && (
                            <p className="text-xs mt-1">
                              {dayAppointments.length} RDV
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Day Schedule */}
                <div className="card-medical p-6">
                  <h3 className="font-display text-lg font-semibold mb-4 capitalize">
                    {format(selectedDate, "EEEE d MMMM", { locale: fr })}
                  </h3>

                  {todayAppointments.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Aucun rendez-vous ce jour</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {todayAppointments.map((apt) => (
                        <div
                          key={apt.id}
                          className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
                            apt.status === "cancelled" ? "opacity-50 bg-muted/30" : "bg-card"
                          }`}
                        >
                          <div className="flex-shrink-0 text-center">
                            <p className="text-2xl font-bold text-primary">{apt.time}</p>
                          </div>
                          <div className="h-12 w-px bg-border" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-foreground">{apt.patient}</p>
                              <span className="text-sm text-muted-foreground">({apt.age} ans)</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{apt.condition}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{apt.room}</span>
                            {getStatusBadge(apt.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Patients Tab */}
              <TabsContent value="patients" className="space-y-4">
                <div className="card-medical p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-lg font-semibold">Mes patients</h2>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="p-4 rounded-lg border bg-card hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {patient.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-foreground">{patient.name}</h3>
                              <span className="text-sm text-muted-foreground">{patient.age} ans</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{patient.condition}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {patient.phone}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs">
                              <span className="text-muted-foreground">
                                Dernière visite: {patient.lastVisit}
                              </span>
                              {patient.nextAppointment !== "-" && (
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                  Prochain: {patient.nextAppointment}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <FileText className="h-4 w-4 mr-2" />
                            Dossier
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Calendar className="h-4 w-4 mr-2" />
                            Historique
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorPortal;
