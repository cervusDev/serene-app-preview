import { Link } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Leaf className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />
            <span className="font-serif text-xl font-semibold text-foreground">
              Serenity Spa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Início
            </Link>
            <Link
              to="/servicos"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Serviços
            </Link>
            <Link
              to="/terapeutas"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Terapeutas
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              dashboad
            </Link>
            <Link to="/agendar">
              <Button className="btn-hero">Agendar</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                to="/servicos"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link
                to="/terapeutas"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Terapeutas
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                dashboad
              </Link>
              <Link to="/agendar" onClick={() => setIsMenuOpen(false)}>
                <Button className="btn-hero w-full">Agendar</Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
