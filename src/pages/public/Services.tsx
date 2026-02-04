import { useState } from "react";
import { Layout } from "../../components/layout/public/Layout";
import { Clock } from "lucide-react";

// Mock data - será substituído por chamadas à API
const mockServices = [
  {
    id: 1,
    name: "Massagem Relaxante",
    duration: 60,
    price: "180",
    active: true,
    description: "Alívio do estresse e tensões musculares com técnicas suaves e óleo essencial.",
  },
  {
    id: 2,
    name: "Massagem Terapêutica",
    duration: 75,
    price: "250",
    active: true,
    description: "Tratamento profundo para dores crônicas, recuperação muscular e lesões.",
  },
  {
    id: 3,
    name: "Massagem com Pedras Quentes",
    duration: 90,
    price: "320",
    active: true,
    description: "Experiência única que combina calor terapêutico e relaxamento profundo.",
  },
  {
    id: 4,
    name: "Massagem Shiatsu",
    duration: 60,
    price: "200",
    active: true,
    description: "Técnica japonesa de pressão em pontos específicos para equilíbrio energético.",
  },
  {
    id: 5,
    name: "Massagem Desportiva",
    duration: 45,
    price: "150",
    active: true,
    description: "Focada em atletas, ajuda na recuperação e prevenção de lesões.",
  },
  {
    id: 6,
    name: "Massagem Longa Premium",
    duration: 120,
    price: "400",
    active: true,
    description: "Nossa sessão mais completa com técnicas combinadas e aromaterapia.",
  },
];

const Services = () => {
  const [services] = useState(mockServices);

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="section-heading mb-4">Nossos Serviços</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubra nossa seleção completa de tratamentos terapêuticos,
              desenvolvidos para proporcionar relaxamento e bem-estar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((s) => s.active)
              .map((service, index) => (
                <div
                  key={service.id}
                  className="card-spa p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {service.name}
                    </h3>
                    <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                      Disponível
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration} minutos</span>
                    </div>
                    <p className="text-xl font-serif font-bold text-primary">
                      R$ {service.price}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
