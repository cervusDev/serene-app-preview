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
import { Plus, Mail, Phone } from "lucide-react";
import type { Client } from "../../types";
import { toast } from "sonner";

const initialClients: Client[] = [
  { id: 1, name: "Maria Silva", phone: "11999887766", email: "maria@email.com" },
  { id: 2, name: "João Santos", phone: "11988776655", email: "joao@email.com" },
  { id: 3, name: "Ana Costa", phone: "11966554433", email: "ana@email.com" },
  { id: 4, name: "Pedro Oliveira", phone: "11955443322", email: "pedro@email.com" },
  { id: 5, name: "Lucia Fernandes", phone: "11944332211", email: "lucia@email.com" },
];

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newClient: Client = {
      id: clients.length + 1,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
    };

    setClients([...clients, newClient]);
    setFormData({ name: "", phone: "", email: "", password: "" });
    setOpen(false);
    toast.success("Cliente cadastrado com sucesso!");
  };

  const columns = [
    { key: "name", header: "Nome" },
    {
      key: "email",
      header: "Email",
      render: (client: Client) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4" />
          {client.email}
        </div>
      ),
    },
    {
      key: "phone",
      header: "Telefone",
      render: (client: Client) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-4 h-4" />
          {client.phone}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <PageHeader
        title="Clientes"
        description="Cadastro e gestão de clientes"
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Novo Cliente</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="11999887766"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Cadastrar Cliente</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <DataTable data={clients} columns={columns} />
    </Layout>
  );
};

export default Clients;
