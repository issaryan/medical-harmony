import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Shield, Stethoscope, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const navigate = useNavigate();

  const portals = [
    {
      id: "admin",
      title: "Administrateur",
      icon: Shield,
      color: "primary",
    },
    {
      id: "hospital",
      title: "Administration Hospitalière",
      icon: Building2,
      color: "accent",
    },
    {
      id: "doctor",
      title: "Médecin",
      icon: Stethoscope,
      color: "success",
    },
    {
      id: "patient",
      title: "Patient",
      icon: User,
      color: "warning",
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur-sm mb-6">
              <span className="text-2xl font-bold text-primary-foreground">M</span>
            </div>
            <h1 className="font-display text-4xl xl:text-5xl font-bold text-primary-foreground mb-4">
              MediPlan
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-md">
              Système de gestion des rendez-vous médicaux pour hôpitaux et cliniques
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Gestion centralisée des rendez-vous",
              "Planning multi-échelle",
              "Notifications multicanales",
              "Sécurité des données garantie",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-primary-foreground/70"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/20">
                  <svg
                    className="h-3.5 w-3.5 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-primary mb-4">
              <span className="text-xl font-bold text-primary-foreground">M</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              MediPlan
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Connexion
            </h2>
            <p className="mt-2 text-muted-foreground">
              Accédez à votre espace personnel
            </p>
          </div>

          {/* Portal Selection */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-foreground">
              Sélectionnez votre portail
            </label>
            <div className="grid grid-cols-2 gap-3">
              {portals.map((portal) => (
                <button
                  key={portal.id}
                  type="button"
                  onClick={() => setSelectedPortal(portal.id)}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 ${
                    selectedPortal === portal.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30 hover:bg-muted/50"
                  }`}
                >
                  <portal.icon
                    className={`h-6 w-6 ${
                      selectedPortal === portal.id
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium text-center ${
                      selectedPortal === portal.id
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {portal.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="input-medical pl-11"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-medical pl-11 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                />
                <span className="text-muted-foreground">Se souvenir de moi</span>
              </label>
              <a
                href="#"
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                Mot de passe oublié?
              </a>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!selectedPortal}
            >
              Se connecter
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Besoin d'aide?{" "}
            <a href="#" className="font-medium text-primary hover:text-primary-hover">
              Contactez le support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
