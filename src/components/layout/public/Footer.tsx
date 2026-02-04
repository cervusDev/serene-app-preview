import { Leaf, Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-semibold text-foreground">
                Serenity Spa
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Seu refúgio de paz e bem-estar. Oferecemos os melhores tratamentos
              para relaxar corpo e mente.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4" />
                <span>(14) 99628-5337</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4" />
                <span>contato@serenityspa.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                <span>Rua das Flores, 123 - Centro</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">
              Horários
            </h4>
            <div className="flex flex-col gap-2 text-muted-foreground text-sm">
              <span>Segunda a Sexta: 8h às 20h</span>
              <span>Sábado: 9h às 18h</span>
              <span>Domingo: Fechado</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2025 Serenity Spa. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
