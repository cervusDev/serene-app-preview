import { useState } from "react";
import { Layout } from "../../components/layout/public/Layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Calendar as CalendarIcon,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../../components/ui/calendar";
import { toast } from "sonner";

// Mock data
const mockServices = [
  { id: 1, name: "Massagem Relaxante", duration: 60, price: "180", active: true },
  { id: 2, name: "Massagem Terapêutica", duration: 75, price: "250", active: true },
  { id: 3, name: "Massagem com Pedras Quentes", duration: 90, price: "320", active: true },
  { id: 4, name: "Massagem Shiatsu", duration: 60, price: "200", active: true },
];

const mockTherapists = [
  { id: 1, name: "Ana Silva", specialty: "Massagem Relaxante e Shiatsu" },
  { id: 2, name: "Carlos Santos", specialty: "Massagem Desportiva e Terapêutica" },
  { id: 3, name: "Marina Costa", specialty: "Pedras Quentes e Aromaterapia" },
];

const availableTimes = [
  "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00",
];

type Step = 1 | 2 | 3 | 4;

const Booking = () => {
  const [step, setStep] = useState<Step>(1);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleNextStep = () => {
    if (step === 1 && !selectedService) {
      toast.error("Selecione um serviço");
      return;
    }
    if (step === 2 && !selectedTherapist) {
      toast.error("Selecione um terapeuta");
      return;
    }
    if (step === 3 && (!selectedDate || !selectedTime)) {
      toast.error("Selecione data e horário");
      return;
    }
    if (step < 4) {
      setStep((step + 1) as Step);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    if (!clientData.name || !clientData.email || !clientData.phone) {
      toast.error("Preencha todos os campos");
      return;
    }

    // Aqui faria as chamadas POST para o backend
    // 1. Criar cliente se não existir
    // 2. Criar booking

    toast.success("Agendamento realizado com sucesso!");
    
    // Reset form
    setStep(1);
    setSelectedService(null);
    setSelectedTherapist(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setClientData({ name: "", email: "", phone: "" });
  };

  const selectedServiceData = mockServices.find((s) => s.id === selectedService);
  const selectedTherapistData = mockTherapists.find((t) => t.id === selectedTherapist);

  const steps = [
    { number: 1, title: "Serviço" },
    { number: 2, title: "Terapeuta" },
    { number: 3, title: "Data e Hora" },
    { number: 4, title: "Seus Dados" },
  ];

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 animate-fade-in">
              <h1 className="section-heading mb-4">Agendar Sessão</h1>
              <p className="text-muted-foreground">
                Escolha seu tratamento preferido e marque seu horário.
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-10">
              {steps.map((s, index) => (
                <div key={s.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-colors ${
                        step >= s.number
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > s.number ? <Check className="h-5 w-5" /> : s.number}
                    </div>
                    <span className="text-xs mt-2 text-muted-foreground hidden sm:block">
                      {s.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-20 h-0.5 mx-2 transition-colors ${
                        step > s.number ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="card-spa p-8 animate-fade-in">
              {step === 1 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-6">
                    Escolha o Serviço
                  </h2>
                  <div className="grid gap-4">
                    {mockServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          selectedService === service.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">
                              {service.name}
                            </h3>
                            <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {service.duration} min
                              </span>
                            </div>
                          </div>
                          <p className="text-lg font-semibold text-primary">
                            R$ {service.price}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-6">
                    Escolha o Terapeuta
                  </h2>
                  <div className="grid gap-4">
                    {mockTherapists.map((therapist) => (
                      <button
                        key={therapist.id}
                        onClick={() => setSelectedTherapist(therapist.id)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          selectedTherapist === therapist.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">
                              {therapist.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {therapist.specialty}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-6">
                    Escolha Data e Horário
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        <CalendarIcon className="h-4 w-4 inline mr-2" />
                        Data
                      </Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        locale={ptBR}
                        disabled={(date) => date < new Date()}
                        className="rounded-lg border border-border"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        <Clock className="h-4 w-4 inline mr-2" />
                        Horário
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                              selectedTime === time
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-6">
                    Seus Dados
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome"
                        value={clientData.name}
                        onChange={(e) =>
                          setClientData({ ...clientData, name: e.target.value })
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={clientData.email}
                        onChange={(e) =>
                          setClientData({ ...clientData, email: e.target.value })
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        placeholder="(14) 99999-9999"
                        value={clientData.phone}
                        onChange={(e) =>
                          setClientData({ ...clientData, phone: e.target.value })
                        }
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  {/* Resumo */}
                  <div className="mt-8 p-4 bg-secondary/50 rounded-lg">
                    <h3 className="font-serif font-semibold text-foreground mb-3">
                      Resumo do Agendamento
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Serviço:</span>{" "}
                        <span className="font-medium">{selectedServiceData?.name}</span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Terapeuta:</span>{" "}
                        <span className="font-medium">{selectedTherapistData?.name}</span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Data:</span>{" "}
                        <span className="font-medium">
                          {selectedDate && format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Horário:</span>{" "}
                        <span className="font-medium">{selectedTime}</span>
                      </p>
                      <p className="pt-2 border-t border-border">
                        <span className="text-muted-foreground">Total:</span>{" "}
                        <span className="font-bold text-primary text-lg">
                          R$ {selectedServiceData?.price}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={step === 1}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Voltar
                </Button>
                {step < 4 ? (
                  <Button onClick={handleNextStep} className="btn-hero gap-2">
                    Próximo
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="btn-hero gap-2">
                    <Check className="h-4 w-4" />
                    Confirmar Agendamento
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
