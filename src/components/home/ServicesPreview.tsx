import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const previewServices = [
  {
    id: 1,
    name: "Massagem Relaxante",
    duration: 60,
    price: "180",
    description: "Alívio do estresse e tensões musculares com técnicas suaves.",
  },
  {
    id: 2,
    name: "Massagem Terapêutica",
    duration: 75,
    price: "250",
    description: "Tratamento profundo para dores crônicas e recuperação muscular.",
  },
  {
    id: 3,
    name: "Massagem com Pedras Quentes",
    duration: 90,
    price: "320",
    description: "Experiência única que combina calor terapêutico e relaxamento.",
  },
];

export const ServicesPreview = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Nossos Serviços</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferecemos uma variedade de tratamentos personalizados para atender
            às suas necessidades de bem-estar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {previewServices.map((service, index) => (
            <div
              key={service.id}
              className="card-spa p-6"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {service.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration} min</span>
                </div>
                <p className="text-lg font-semibold text-primary">
                  R$ {service.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/servicos">
            <Button variant="outline" className="btn-outline-hero group">
              Ver Todos os Serviços
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
