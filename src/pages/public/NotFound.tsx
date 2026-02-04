import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Compass } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";


const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
   <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <Card className="card-spa max-w-md w-full relative z-10">
        <CardContent className="p-8 text-center">
          {/* Icon */}
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <Compass className="h-10 w-10 text-primary" />
          </div>
          {/* Error number */}
          <h1 className="text-7xl font-serif font-bold text-gradient mb-2">404</h1>
          {/* Title */}
          <h2 className="text-2xl font-serif font-semibold text-foreground mb-3">
            Página não encontrada
          </h2>
          {/* Description */}
          <p className="text-muted-foreground mb-8">
            Parece que você se perdeu no caminho para o relaxamento. 
            A página que você procura não existe ou foi movida.
          </p>
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button className="btn-hero w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </Link>
            <Button
              variant="outline"
              className="btn-outline-hero"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Página Anterior
            </Button>
          </div>
          {/* Path info */}
          <p className="mt-6 text-xs text-muted-foreground">
            Caminho tentado: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
