
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Page non trouvée:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oups ! La page que vous recherchez n'existe pas.
        </p>
        <p className="text-gray-500 mb-8">
          Il semble que vous ayez suivi un lien cassé ou entré une URL qui n'existe pas sur ce site.
        </p>
        <Button asChild>
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Retour à l'accueil</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
