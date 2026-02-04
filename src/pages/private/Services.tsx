import { useState } from "react";
import { Layout } from "../../components/layout/private/Layout";
import { PageHeader } from "../../components/ui/pageHeader";
import { DataTable } from "../../components/ui/dataTable";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Plus, Clock, DollarSign } from "lucide-react";
import type { Service } from "../../types";
import { toast } from "sonner";

const initialServices: Service[] = [
  { id: 1, name: "Massagem Relaxante", duration: 60, price: "180", active: true },
  { id: 2, name: "Shiatsu", duration: 45, price: "150", active: true },
  { id: 3, name: "Massagem Longa", duration: 75, price: "250", active: true },
  { id: 4, name: "Drenagem Linfática", duration: 60, price: "200", active: true },
  { id: 5, name: "Pedras Quentes", duration: 90, price: "300", active: false },
];

const Services = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    price: "",
    active: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newService: Service = {
      id: services.length + 1,
      name: formData.name,
      duration: Number(formData.duration),
      price: formData.price,
      active: formData.active,
    };

    setServices([...services, newService]);
    setFormData({ name: "", duration: "", price: "", active: true });
    setOpen(false);
    toast.success("Serviço cadastrado com sucesso!");
  };

  const columns = [
    { key: "name", header: "Serviço" },
    {
      key: "duration",
      header: "Duração",
      render: (service: Service) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          {service.duration} min
        </div>
      ),
    },
    {
      key: "price",
      header: "Preço",
      render: (service: Service) => (
        <div className="flex items-center gap-1 font-medium">
          <DollarSign className="w-4 h-4 text-success" />
          R$ {service.price}
        </div>
      ),
    },
    {
      key: "active",
      header: "Status",
      render: (service: Service) =>
        service.active ? (
          <span className="badge-success">Ativo</span>
        ) : (
          <span className="badge-warning">Inativo</span>
        ),
    },
  ];

  return (
    <Layout>
      <PageHeader
        title="Serviços"
        description="Catálogo de serviços de massagem"
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Novo Serviço
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Novo Serviço</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Serviço</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Massagem Relaxante"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (min)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="60"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="180"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <Label htmlFor="active">Serviço ativo</Label>
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, active: checked })
                    }
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Cadastrar Serviço</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <DataTable data={services} columns={columns} />
    </Layout>
  );
};

export default Services;
