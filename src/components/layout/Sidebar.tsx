import { 
  Calendar, 
  ChevronLeft, 
  Home, 
  Settings, 
  Users, 
  Stethoscope, 
  Building2,
  BarChart3,
  Bell,
  LogOut,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: "admin" | "hospital" | "doctor" | "patient";
}

const Sidebar = ({ isOpen, onClose, userRole = "hospital" }: SidebarProps) => {
  const getMenuItems = () => {
    const baseItems = [
      { icon: Home, label: "Tableau de bord", href: "/", active: true },
      { icon: Calendar, label: "Rendez-vous", href: "/appointments" },
      { icon: Bell, label: "Notifications", href: "/notifications" },
    ];

    switch (userRole) {
      case "admin":
        return [
          ...baseItems,
          { icon: Users, label: "Utilisateurs", href: "/users" },
          { icon: Building2, label: "Hôpitaux", href: "/hospitals" },
          { icon: BarChart3, label: "Statistiques", href: "/stats" },
          { icon: Settings, label: "Paramètres", href: "/settings" },
        ];
      case "hospital":
        return [
          ...baseItems,
          { icon: Stethoscope, label: "Médecins", href: "/doctors" },
          { icon: Users, label: "Patients", href: "/patients" },
          { icon: BarChart3, label: "Statistiques", href: "/stats" },
          { icon: Settings, label: "Paramètres", href: "/settings" },
        ];
      case "doctor":
        return [
          ...baseItems,
          { icon: Users, label: "Mes patients", href: "/patients" },
          { icon: Settings, label: "Mon profil", href: "/profile" },
        ];
      case "patient":
        return [
          ...baseItems,
          { icon: Stethoscope, label: "Mes médecins", href: "/doctors" },
          { icon: Settings, label: "Mon profil", href: "/profile" },
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
              <span className="text-lg font-bold text-sidebar-primary-foreground">M</span>
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold text-sidebar-foreground">
                MediPlan
              </h1>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-sidebar-foreground hover:bg-sidebar-accent md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-all duration-200",
                    item.active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-sidebar-foreground/80 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground">
            <LogOut className="h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
