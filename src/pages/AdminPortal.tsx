import { useState } from "react";
import {
  Shield,
  Users,
  Building2,
  Settings,
  Search,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Activity,
  Lock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  UserPlus,
  Filter,
  Download,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/cards/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Simulated users data
const usersData = [
  {
    id: 1,
    name: "Dr. Jean Martin",
    email: "jean.martin@hospital.fr",
    role: "doctor",
    status: "active",
    lastLogin: "2025-01-07 09:30",
    hospital: "CHU Central",
  },
  {
    id: 2,
    name: "Marie Dupont",
    email: "marie.dupont@hospital.fr",
    role: "hospital",
    status: "active",
    lastLogin: "2025-01-07 08:15",
    hospital: "CHU Central",
  },
  {
    id: 3,
    name: "Pierre Bernard",
    email: "pierre.bernard@email.com",
    role: "patient",
    status: "active",
    lastLogin: "2025-01-06 14:20",
    hospital: "-",
  },
  {
    id: 4,
    name: "Dr. Sophie Lambert",
    email: "sophie.lambert@hospital.fr",
    role: "doctor",
    status: "inactive",
    lastLogin: "2024-12-20 11:00",
    hospital: "Clinique Nord",
  },
  {
    id: 5,
    name: "Admin Principal",
    email: "admin@mediplan.fr",
    role: "admin",
    status: "active",
    lastLogin: "2025-01-07 10:00",
    hospital: "Tous",
  },
];

const hospitalsData = [
  {
    id: 1,
    name: "CHU Central",
    city: "Paris",
    doctors: 45,
    patients: 2500,
    status: "active",
  },
  {
    id: 2,
    name: "Clinique Nord",
    city: "Lyon",
    doctors: 28,
    patients: 1200,
    status: "active",
  },
  {
    id: 3,
    name: "Hôpital Saint-Louis",
    city: "Marseille",
    doctors: 32,
    patients: 1800,
    status: "maintenance",
  },
];

const securityLogs = [
  {
    id: 1,
    action: "Connexion",
    user: "admin@mediplan.fr",
    ip: "192.168.1.100",
    time: "2025-01-07 10:00",
    status: "success",
  },
  {
    id: 2,
    action: "Modification utilisateur",
    user: "admin@mediplan.fr",
    ip: "192.168.1.100",
    time: "2025-01-07 09:45",
    status: "success",
  },
  {
    id: 3,
    action: "Tentative de connexion",
    user: "inconnu@test.com",
    ip: "45.23.67.89",
    time: "2025-01-07 03:22",
    status: "failed",
  },
  {
    id: 4,
    action: "Export données",
    user: "marie.dupont@hospital.fr",
    ip: "192.168.1.105",
    time: "2025-01-06 16:30",
    status: "success",
  },
];

const AdminPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const stats = [
    {
      title: "Utilisateurs totaux",
      value: 1847,
      subtitle: "Tous rôles confondus",
      icon: Users,
      color: "primary" as const,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Hôpitaux connectés",
      value: 15,
      subtitle: "3 en maintenance",
      icon: Building2,
      color: "accent" as const,
    },
    {
      title: "Sessions actives",
      value: 234,
      subtitle: "En ce moment",
      icon: Activity,
      color: "success" as const,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Alertes sécurité",
      value: 3,
      subtitle: "Dernières 24h",
      icon: AlertTriangle,
      color: "warning" as const,
    },
  ];

  const getRoleBadge = (role: string) => {
    const styles = {
      admin: "bg-destructive/10 text-destructive border-destructive/20",
      doctor: "bg-success/10 text-success border-success/20",
      hospital: "bg-accent/10 text-accent border-accent/20",
      patient: "bg-primary/10 text-primary border-primary/20",
    };
    const labels = {
      admin: "Admin",
      doctor: "Médecin",
      hospital: "Hôpital",
      patient: "Patient",
    };
    return (
      <Badge variant="outline" className={styles[role as keyof typeof styles]}>
        {labels[role as keyof typeof labels]}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          <CheckCircle className="w-3 h-3 mr-1" />
          Actif
        </Badge>
      );
    }
    if (status === "inactive") {
      return (
        <Badge variant="outline" className="bg-muted text-muted-foreground">
          <XCircle className="w-3 h-3 mr-1" />
          Inactif
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Maintenance
      </Badge>
    );
  };

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole="admin" />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                  <Shield className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                    Portail Administrateur
                  </h1>
                  <p className="text-muted-foreground">
                    Gestion globale du système et des utilisateurs
                  </p>
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

            {/* Main Content Tabs */}
            <Tabs defaultValue="users" className="space-y-6">
              <TabsList className="bg-muted">
                <TabsTrigger value="users" className="gap-2">
                  <Users className="h-4 w-4" />
                  Utilisateurs
                </TabsTrigger>
                <TabsTrigger value="hospitals" className="gap-2">
                  <Building2 className="h-4 w-4" />
                  Hôpitaux
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-2">
                  <Lock className="h-4 w-4" />
                  Sécurité
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Paramètres
                </TabsTrigger>
              </TabsList>

              {/* Users Tab */}
              <TabsContent value="users" className="space-y-4">
                <div className="card-medical p-6">
                  {/* Filters */}
                  <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-1 gap-3">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Rechercher un utilisateur..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                      <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-[160px]">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les rôles</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="hospital">Hôpital</SelectItem>
                          <SelectItem value="doctor">Médecin</SelectItem>
                          <SelectItem value="patient">Patient</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Exporter
                      </Button>
                      <Button>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Nouvel utilisateur
                      </Button>
                    </div>
                  </div>

                  {/* Users Table */}
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Utilisateur</TableHead>
                          <TableHead>Rôle</TableHead>
                          <TableHead>Hôpital</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Dernière connexion</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id} className="hover:bg-muted/30">
                            <TableCell>
                              <div>
                                <p className="font-medium text-foreground">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{getRoleBadge(user.role)}</TableCell>
                            <TableCell className="text-muted-foreground">{user.hospital}</TableCell>
                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {user.lastLogin}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Envoyer email
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Hospitals Tab */}
              <TabsContent value="hospitals" className="space-y-4">
                <div className="card-medical p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-display text-lg font-semibold">Hôpitaux enregistrés</h2>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un hôpital
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {hospitalsData.map((hospital) => (
                      <div key={hospital.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground">{hospital.name}</h3>
                            <p className="text-sm text-muted-foreground">{hospital.city}</p>
                          </div>
                          {getStatusBadge(hospital.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Médecins</p>
                            <p className="font-semibold text-foreground">{hospital.doctors}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Patients</p>
                            <p className="font-semibold text-foreground">{hospital.patients}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-4">
                <div className="card-medical p-6">
                  <h2 className="font-display text-lg font-semibold mb-6">Journal de sécurité</h2>
                  
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Action</TableHead>
                          <TableHead>Utilisateur</TableHead>
                          <TableHead>Adresse IP</TableHead>
                          <TableHead>Date/Heure</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {securityLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="font-medium">{log.action}</TableCell>
                            <TableCell className="text-muted-foreground">{log.user}</TableCell>
                            <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{log.time}</TableCell>
                            <TableCell>
                              {log.status === "success" ? (
                                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                                  Succès
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                                  Échec
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="card-medical p-6">
                    <h2 className="font-display text-lg font-semibold mb-4">Paramètres généraux</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Nom du système</label>
                        <Input defaultValue="MediPlan" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Email administrateur</label>
                        <Input defaultValue="admin@mediplan.fr" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Fuseau horaire</label>
                        <Select defaultValue="europe-paris">
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="europe-paris">Europe/Paris (UTC+1)</SelectItem>
                            <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">Enregistrer les modifications</Button>
                    </div>
                  </div>

                  <div className="card-medical p-6">
                    <h2 className="font-display text-lg font-semibold mb-4">Sécurité</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium text-foreground">Authentification à deux facteurs</p>
                          <p className="text-sm text-muted-foreground">Requis pour les administrateurs</p>
                        </div>
                        <Badge className="bg-success text-success-foreground">Activé</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium text-foreground">Expiration des sessions</p>
                          <p className="text-sm text-muted-foreground">Déconnexion automatique après inactivité</p>
                        </div>
                        <span className="text-sm font-medium">30 min</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium text-foreground">Journalisation des accès</p>
                          <p className="text-sm text-muted-foreground">Traçabilité complète des actions</p>
                        </div>
                        <Badge className="bg-success text-success-foreground">Activé</Badge>
                      </div>
                    </div>
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

export default AdminPortal;
