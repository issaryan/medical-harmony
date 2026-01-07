import { useState } from "react";
import { 
  Calendar, 
  Users, 
  Stethoscope, 
  Clock, 
  TrendingUp,
  Bell,
  Plus,
  ChevronRight,
  Filter
} from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/cards/StatCard";
import AppointmentCard from "@/components/cards/AppointmentCard";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: "Rendez-vous aujourd'hui",
      value: 24,
      subtitle: "8 confirmés",
      icon: Calendar,
      color: "primary" as const,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Patients actifs",
      value: "1,234",
      subtitle: "Ce mois",
      icon: Users,
      color: "accent" as const,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Médecins disponibles",
      value: 18,
      subtitle: "Sur 25 au total",
      icon: Stethoscope,
      color: "success" as const,
    },
    {
      title: "Temps d'attente moyen",
      value: "15 min",
      subtitle: "Aujourd'hui",
      icon: Clock,
      color: "warning" as const,
      trend: { value: 5, isPositive: false },
    },
  ];

  const upcomingAppointments = [
    {
      patientName: "Marie Dupont",
      doctorName: "Dr. Jean Martin",
      specialty: "Cardiologie",
      date: "15 Jan 2025",
      time: "09:00",
      location: "Salle 101",
      status: "confirmed" as const,
    },
    {
      patientName: "Pierre Bernard",
      doctorName: "Dr. Sophie Lambert",
      specialty: "Dermatologie",
      date: "15 Jan 2025",
      time: "10:30",
      location: "Salle 205",
      status: "pending" as const,
    },
    {
      patientName: "Claire Moreau",
      doctorName: "Dr. Marc Dubois",
      specialty: "Neurologie",
      date: "15 Jan 2025",
      time: "14:00",
      location: "Salle 302",
      status: "confirmed" as const,
    },
    {
      patientName: "Lucas Petit",
      doctorName: "Dr. Anne Richard",
      specialty: "Pédiatrie",
      date: "15 Jan 2025",
      time: "15:30",
      location: "Salle 108",
      status: "cancelled" as const,
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Nouveau rendez-vous",
      message: "Marie Dupont a confirmé son RDV",
      time: "Il y a 5 min",
      type: "success",
    },
    {
      id: 2,
      title: "Rappel",
      message: "3 rendez-vous dans l'heure",
      time: "Il y a 15 min",
      type: "warning",
    },
    {
      id: 3,
      title: "Annulation",
      message: "Lucas Petit a annulé son RDV",
      time: "Il y a 30 min",
      type: "error",
    },
  ];

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
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                  Tableau de bord
                </h1>
                <p className="mt-1 text-muted-foreground">
                  Vue d'ensemble de l'activité hospitalière
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="default">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
                <Button variant="default" size="default">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau RDV
                </Button>
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

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Appointments Section */}
              <div className="lg:col-span-2">
                <div className="card-medical p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-lg font-semibold text-foreground">
                        Rendez-vous à venir
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Aujourd'hui, 15 Janvier 2025
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Voir tout
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {upcomingAppointments.map((appointment, index) => (
                      <div
                        key={index}
                        className="animate-slide-up opacity-0"
                        style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                      >
                        <AppointmentCard {...appointment} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notifications Sidebar */}
              <div className="lg:col-span-1">
                <div className="card-medical p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      <h2 className="font-display text-lg font-semibold text-foreground">
                        Notifications
                      </h2>
                    </div>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      3
                    </span>
                  </div>

                  <div className="space-y-4">
                    {notifications.map((notification, index) => (
                      <div
                        key={notification.id}
                        className="animate-slide-in-right opacity-0 flex gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
                        style={{ animationDelay: `${(index + 8) * 0.1}s` }}
                      >
                        <div
                          className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${
                            notification.type === "success"
                              ? "bg-success"
                              : notification.type === "warning"
                              ? "bg-warning"
                              : "bg-destructive"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    Voir toutes les notifications
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="card-medical mt-6 p-6">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Statistiques rapides
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Taux de confirmation
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        87%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[87%] rounded-full bg-success" />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-muted-foreground">
                        Taux d'annulation
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        8%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[8%] rounded-full bg-destructive" />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-muted-foreground">
                        En attente
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        5%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[5%] rounded-full bg-warning" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
