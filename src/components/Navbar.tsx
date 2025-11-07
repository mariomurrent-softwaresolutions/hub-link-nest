import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import configData from "@/data/config.json";

const Navbar = () => {
  const { companyName, companyTagline, welcomeMessage, logo } = configData.config;
  
  const getIcon = (iconName: string): LucideIcon => {
    return (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Building2;
  };
  
  const LogoIcon = getIcon(logo);
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <LogoIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{companyName}</h1>
              <p className="text-xs text-muted-foreground">{companyTagline}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {welcomeMessage}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
