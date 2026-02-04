import { useState } from "react";
import { Layout } from "../../components/layout/public/Layout";
import { User } from "lucide-react";

// Mock data - será substituído por chamadas à API
const mockTherapists = [
  {
    id: 1,
    name: "Ana Silva",
    phone: "14996285337",
    bio: "Especialista em massagem relaxante com mais de 8 anos de experiência. Formada em fisioterapia com especialização em técnicas orientais.",
    specialty: "Massagem Relaxante e Shiatsu",
  },
  {
    id: 2,
    name: "Carlos Santos",
    phone: "14996285338",
    bio: "Terapeuta esportivo certificado, trabalha com atletas profissionais há 5 anos. Expert em recuperação muscular.",
    specialty: "Massagem Desportiva e Terapêutica",
  },
  {
    id: 3,
    name: "Marina Costa",
    phone: "14996285339",
    bio: "Apaixonada por técnicas holísticas, Marina combina conhecimentos de aromaterapia e massagem com pedras quentes.",
    specialty: "Pedras Quentes e Aromaterapia",
  },
  {
    id: 4,
    name: "Roberto Lima",
    phone: "14996285340",
    bio: "Com formação internacional, Roberto é especialista em técnicas de relaxamento profundo e meditação guiada.",
    specialty: "Relaxamento Profundo",
  },
];

const Therapists = () => {
  const [therapists] = useState(mockTherapists);

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="section-heading mb-4">Nossos Terapeutas</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conheça nossa equipe de profissionais altamente qualificados,
              dedicados ao seu bem-estar e relaxamento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {therapists.map((therapist, index) => (
              <div
                key={therapist.id}
                className="card-spa p-8 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-1">
                      {therapist.name}
                    </h3>
                    <p className="text-accent font-medium text-sm mb-3">
                      {therapist.specialty}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {therapist.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Therapists;
