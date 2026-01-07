import { Shield, Building2, Stethoscope, User, ArrowRight, Calendar, Bell, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import PortalCard from "@/components/cards/PortalCard";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const portals = [
    {
      id: "admin",
      title: "Administrateur Système",
      description: "Gestion globale du système, utilisateurs et paramètres de sécurité",
      icon: Shield,
      color: "primary" as const,
    },
    {
      id: "hospital",
      title: "Administration Hospitalière",
      description: "Pilotage opérationnel, gestion des médecins et patients",
      icon: Building2,
      color: "accent" as const,
    },
    {
      id: "doctor",
      title: "Portail Médecin",
      description: "Consultation du planning personnel et gestion des rendez-vous",
      icon: Stethoscope,
      color: "success" as const,
    },
    {
      id: "patient",
      title: "Portail Patient",
      description: "Suivi personnel des rendez-vous et historique médical",
      icon: User,
      color: "warning" as const,
    },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Gestion Multi-échelle",
      description: "Vue journalière, mensuelle et annuelle des rendez-vous",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "SMS, email et notifications internes automatiques",
    },
    {
      icon: Lock,
      title: "Sécurité",
      description: "Protection des données médicales et traçabilité",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            {/* Logo */}
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur-sm mb-8 animate-fade-in">
              <span className="text-3xl font-bold text-primary-foreground">M</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up opacity-0">
              MediPlan
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 animate-slide-up opacity-0 stagger-1">
              Système de gestion des rendez-vous médicaux
            </p>
            <p className="text-lg text-primary-foreground/60 max-w-2xl mx-auto mb-10 animate-slide-up opacity-0 stagger-2">
              Une plateforme centralisée pour organiser, visualiser et coordonner 
              les rendez-vous médicaux de votre établissement de santé.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up opacity-0 stagger-3">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => navigate("/login")}
              >
                Se connecter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="hero-outline" size="xl">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Portals Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Accédez à votre espace
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quatre portails dédiés pour répondre aux besoins de chaque acteur du système de santé
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {portals.map((portal, index) => (
            <div
              key={portal.id}
              className="animate-slide-up opacity-0"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <PortalCard
                title={portal.title}
                description={portal.description}
                icon={portal.icon}
                color={portal.color}
                onClick={() => navigate(`/${portal.id === "hospital" ? "dashboard" : portal.id}`)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Fonctionnalités clés
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des outils puissants pour une gestion optimale de vos rendez-vous
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-medical p-8 text-center animate-slide-up opacity-0"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-6">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                <span className="text-lg font-bold text-primary-foreground">M</span>
              </div>
              <span className="font-display font-semibold text-foreground">
                MediPlan
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 MediPlan. Système de gestion des rendez-vous médicaux.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
