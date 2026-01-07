import { useState } from "react";
import {
  User,
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  Bell,
  FileText,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  Phone,
  Mail,
  History,
} from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/cards/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Simulated patient data
const patientInfo = {
  name: "Marie Dupont",
  dateOfBirth: "15/03/1980",
  age: 44,
  email: "marie.dupont@email.com",
  phone: "+33 6 12 34 56 78",
  address: "15 Rue de la Paix, 75002 Paris",
  bloodType: "A+",
  insuranceId: "1 80 03 75 108 042 35",
};

// Upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    date: addDays(new Date(), 3),
    time: "09:30",
    doctor: "Dr. Jean Martin",
    specialty: "Cardiologie",
    location: "CHU Central - Bâtiment A",
    room: "Salle 105",
    status: "confirmed",
    notes: "Apporter les résultats d'analyses récents",
  },
  {
    id: 2,
    date: addDays(new Date(), 10),
    time: "14:00",
    doctor: "Dr. Sophie Lambert",
    specialty: "Dermatologie",
    location: "Clinique Nord",
    room: "Salle 203",
    status: "pending",
    notes: "",
  },
  {
    id: 3,
    date: addDays(new Date(), 25),
    time: "11:00",
    doctor: "Dr. Marc Dubois",
    specialty: "Ophtalmologie",
    location: "CHU Central - Bâtiment B",
    room: "Salle 412",
    status: "confirmed",
    notes: "Contrôle annuel de la vue",
  },
];

// Appointment history
const appointmentHistory = [
  {
    id: 101,
    date: subDays(new Date(), 15),
    time: "10:00",
    doctor: "Dr. Jean Martin",
    specialty: "Cardiologie",
    status: "completed",
    diagnosis: "Bilan cardiaque satisfaisant",
  },
  {
    id: 102,
    date: subDays(new Date(), 45),
    time: "15:30",
    doctor: "Dr. Anne Richard",
    specialty: "Médecine générale",
    status: "completed",
    diagnosis: "Renouvellement ordonnance",
  },
  {
    id: 103,
    date: subDays(new Date(), 60),
    time: "09:00",
    doctor: "Dr. Paul Moreau",
    specialty: "Radiologie",
    status: "completed",
    diagnosis: "Radio thoracique - RAS",
  },
  {
    id: 104,
    date: subDays(new Date(), 90),
    time: "11:30",
    doctor: "Dr. Jean Martin",
    specialty: "Cardiologie",
    status: "cancelled",
    diagnosis: "-",
  },
  {
    id: 105,
    date: subDays(new Date(), 120),
    time: "14:00",
    doctor: "Dr. Claire Bernard",
    specialty: "Endocrinologie",
    status: "completed",
    diagnosis: "Contrôle thyroïde normal",
  },
];

// Notifications
const notifications = [
  {
    id: 1,
    type: "reminder",
    title: "Rappel de rendez-vous",
    message: "Votre rendez-vous avec Dr. Jean Martin est dans 3 jours",
    time: "Il y a 2 heures",
    read: false,
  },
  {
    id: 2,
    type: "confirmation",
    title: "Rendez-vous confirmé",
    message: "Votre rendez-vous du 20 janvier a été confirmé",
    time: "Hier",
    read: true,
  },
  {
    id: 3,
    type: "info",
    title: "Nouveau document disponible",
    message: "Les résultats de vos analyses sont disponibles",
    time: "Il y a 3 jours",
    read: true,
  },
];

const PatientPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: "Prochain RDV",
      value: format(upcomingAppointments[0].date, "d MMM", { locale: fr }),
      subtitle: upcomingAppointments[0].doctor,
      icon: Calendar,
      color: "primary" as const,
    },
    {
      title: "RDV à venir",
      value: upcomingAppointments.length,
      subtitle: "Dans les 30 jours",
      icon: Clock,
      color: "accent" as const,
    },
    {
      title: "Historique",
      value: appointmentHistory.filter((a) => a.status === "completed").length,
      subtitle: "Cette année",
      icon: History,
      color: "success" as const,
    },
    {
      title: "Notifications",
      value: notifications.filter((n) => !n.read).length,
      subtitle: "Non lues",
      icon: Bell,
      color: "warning" as const,
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: "bg-success/10 text-success border-success/20",
      pending: "bg-warning/10 text-warning border-warning/20",
      cancelled: "bg-destructive/10 text-destructive border-destructive/20",
      completed: "bg-primary/10 text-primary border-primary/20",
    };
    const labels = {
      confirmed: "Confirmé",
      pending: "En attente",
      cancelled: "Annulé",
      completed: "Effectué",
    };
    return (
      <Badge variant="outline" className={styles[status as keyof typeof styles]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Bell className="h-5 w-5 text-warning" />;
      case "confirmation":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "info":
        return <FileText className="h-5 w-5 text-primary" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole="patient" />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
            {/* Page Header with Patient Info */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <Avatar className="h-16 w-16 border-2 border-warning/20">
                  <AvatarFallback className="bg-warning/10 text-warning text-xl font-semibold">
                    MD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                    Bonjour, {patientInfo.name.split(" ")[0]} 👋
                  </h1>
                  <p className="text-muted-foreground">
                    Bienvenue sur votre espace patient
                  </p>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="card-medical p-4 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Né(e) le:</span>
                    <span className="font-medium">{patientInfo.dateOfBirth}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{patientInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium truncate">{patientInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">N° Sécu:</span>
                    <span className="font-medium font-mono text-xs">{patientInfo.insuranceId}</span>
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
            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList className="bg-muted">
                <TabsTrigger value="upcoming" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Mes rendez-vous
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                  <History className="h-4 w-4" />
                  Historique
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Upcoming Appointments Tab */}
              <TabsContent value="upcoming" className="space-y-4">
                <div className="grid gap-4">
                  {upcomingAppointments.map((apt, index) => (
                    <Card
                      key={apt.id}
                      className="animate-slide-up opacity-0 overflow-hidden"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Date Section */}
                          <div className="flex-shrink-0 bg-primary/5 p-6 text-center md:w-32">
                            <p className="text-sm text-muted-foreground uppercase">
                              {format(apt.date, "EEE", { locale: fr })}
                            </p>
                            <p className="text-3xl font-bold text-primary">
                              {format(apt.date, "d")}
                            </p>
                            <p className="text-sm text-muted-foreground capitalize">
                              {format(apt.date, "MMM", { locale: fr })}
                            </p>
                            <p className="mt-2 text-lg font-semibold">{apt.time}</p>
                          </div>

                          {/* Details Section */}
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-lg text-foreground">
                                  {apt.doctor}
                                </h3>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Stethoscope className="h-4 w-4" />
                                  <span>{apt.specialty}</span>
                                </div>
                              </div>
                              {getStatusBadge(apt.status)}
                            </div>

                            <div className="space-y-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{apt.location} - {apt.room}</span>
                              </div>
                              {apt.notes && (
                                <div className="flex items-start gap-2 mt-3 p-3 rounded-lg bg-warning/10">
                                  <AlertCircle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                                  <span className="text-warning">{apt.notes}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-3 mt-4">
                              <Button variant="outline" size="sm">
                                Modifier
                              </Button>
                              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                Annuler
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-4">
                <div className="card-medical p-6">
                  <h2 className="font-display text-lg font-semibold mb-4">
                    Historique des rendez-vous
                  </h2>
                  <div className="space-y-4">
                    {appointmentHistory.map((apt) => (
                      <div
                        key={apt.id}
                        className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex-shrink-0 text-center w-16">
                          <p className="text-lg font-bold text-foreground">
                            {format(apt.date, "d")}
                          </p>
                          <p className="text-xs text-muted-foreground uppercase">
                            {format(apt.date, "MMM", { locale: fr })}
                          </p>
                        </div>
                        <div className="h-10 w-px bg-border" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-foreground">{apt.doctor}</p>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{apt.specialty}</span>
                          </div>
                          {apt.diagnosis !== "-" && (
                            <p className="text-sm text-muted-foreground">{apt.diagnosis}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(apt.status)}
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-4">
                <div className="card-medical p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-lg font-semibold">Notifications</h2>
                    <Button variant="ghost" size="sm">
                      Tout marquer comme lu
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                          notification.read ? "bg-card" : "bg-primary/5 border-primary/20"
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-foreground">{notification.title}</p>
                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
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

export default PatientPortal;
