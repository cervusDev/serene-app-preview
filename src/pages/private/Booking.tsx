import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Plus } from "lucide-react";
import type { Booking, Client, Service, Therapist } from "../../types";
import { toast } from "sonner";
import { Layout } from "../../components/layout/private/Layout";
import { PageHeader } from "../../components/ui/pageHeader";
import { DataTable } from "../../components/ui/dataTable";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

// Mock data
const mockClients: Client[] = [
  { id: 1, name: "Maria Silva", phone: "11999887766", email: "maria@email.com" },
  { id: 2, name: "João Santos", phone: "11988776655", email: "joao@email.com" },
  { id: 3, name: "Ana Costa", phone: "11966554433", email: "ana@email.com" },
];

const mockServices: Service[] = [
  { id: 1, name: "Relaxante", duration: 60, price: "180", active: true },
  { id: 2, name: "Shiatsu", duration: 45, price: "150", active: true },
  { id: 3, name: "Longa", duration: 75, price: "250", active: true },
];

const mockTherapists: Therapist[] = [
  { id: 1, name: "Ana Paula", phone: "11998776655", bio: "Especialista em relaxamento", specialty: "Massagem Relaxante" },
  { id: 2, name: "Carlos Mendes", phone: "11977665544", bio: "Expert em Shiatsu", specialty: "Shiatsu" },
];

type BookingWithRelations = Booking & { client?: Client; service?: Service; therapist?: Therapist };

const initialBookings: BookingWithRelations[] = [
  {
    id: 1,
    date: "2025-02-04",
    start_time: "09:00",
    clientId: 1,
    serviceId: 1,
    therapistId: 1,
    client: mockClients[0],
    service: mockServices[0],
    therapist: mockTherapists[0],
  },
  {
    id: 2,
    date: "2025-02-04",
    start_time: "10:30",
    clientId: 2,
    serviceId: 2,
    therapistId: 2,
    client: mockClients[1],
    service: mockServices[1],
    therapist: mockTherapists[1],
  },
];

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingWithRelations[]>(initialBookings);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    start_time: "",
    clientId: "",
    serviceId: "",
    therapistId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const client = mockClients.find(c => c.id === Number(formData.clientId));
    const service = mockServices.find(s => s.id === Number(formData.serviceId));
    const therapist = mockTherapists.find(t => t.id === Number(formData.therapistId));

    const newBooking: BookingWithRelations = {
      id: bookings.length + 1,
      date: formData.date,
      start_time: formData.start_time,
      clientId: Number(formData.clientId),
      serviceId: Number(formData.serviceId),
      therapistId: Number(formData.therapistId),
      client,
      service,
      therapist,
    };

    setBookings([...bookings, newBooking]);
    setFormData({ date: "", start_time: "", clientId: "", serviceId: "", therapistId: "" });
    setOpen(false);
    toast.success("Agendamento criado com sucesso!");
  };

  const columns = [
    { key: "date", header: "Data" },
    { key: "start_time", header: "Horário" },
    { key: "client.name", header: "Cliente" },
    { key: "service.name", header: "Serviço" },
    { key: "therapist.name", header: "Terapeuta" },
    {
      key: "status",
      header: "Status",
      render: () => <span className="badge-success">Confirmado</span>,
    },
  ];

  return (
    <Layout>
      <PageHeader
        title="Agendamentos"
        description="Gerencie todos os agendamentos de massagens"
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Novo Agendamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Novo Agendamento</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Horário</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.start_time}
                      onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Select
                    value={formData.clientId}
                    onValueChange={(value) => setFormData({ ...formData, clientId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClients.map((client) => (
                        <SelectItem key={client.id} value={String(client.id)}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Serviço</Label>
                  <Select
                    value={formData.serviceId}
                    onValueChange={(value) => setFormData({ ...formData, serviceId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockServices.map((service) => (
                        <SelectItem key={service.id} value={String(service.id)}>
                          {service.name} - R$ {service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Terapeuta</Label>
                  <Select
                    value={formData.therapistId}
                    onValueChange={(value) => setFormData({ ...formData, therapistId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um terapeuta" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTherapists.map((therapist) => (
                        <SelectItem key={therapist.id} value={String(therapist.id)}>
                          {therapist.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Criar Agendamento</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <DataTable data={bookings} columns={columns} />
    </Layout>
  );
};

export default Bookings;
