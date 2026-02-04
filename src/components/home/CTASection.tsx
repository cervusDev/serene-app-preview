import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "../ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <Calendar className="h-12 w-12 text-primary-foreground/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
            Pronto para relaxar?
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Agende sua sessão agora e comece sua jornada de bem-estar. 
            Nossos terapeutas estão prontos para cuidar de você.
          </p>
          <Link to="/agendar">
            <Button
              size="lg"
              variant="secondary"
              className="font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Agendar Agora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
