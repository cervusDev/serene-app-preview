import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-slide-up">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Bem-estar & Relaxamento
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
            Descubra a arte do{" "}
            <span className="text-gradient">relaxamento</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            Experimente massagens terapêuticas personalizadas que restauram seu
            equilíbrio físico e mental. Nossos especialistas cuidam de você.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/agendar">
              <Button size="lg" className="btn-hero group">
                Agendar Sessão
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/servicos">
              <Button size="lg" variant="outline" className="btn-outline-hero">
                Ver Serviços
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border/50">
            <div>
              <p className="text-3xl font-serif font-bold text-foreground">5+</p>
              <p className="text-sm text-muted-foreground">Anos de experiência</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-foreground">1000+</p>
              <p className="text-sm text-muted-foreground">Clientes satisfeitos</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-foreground">15+</p>
              <p className="text-sm text-muted-foreground">Tratamentos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
