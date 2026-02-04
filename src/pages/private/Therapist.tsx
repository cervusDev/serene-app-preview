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
import { Textarea } from "../../components/ui/textarea";
import { Plus, Phone } from "lucide-react";
import type { Therapist } from "../../types";
import { toast } from "sonner";

const initialTherapists: Therapist[] = [
  { id: 1, name: "Ana Paula", phone: "11998776655", bio: "Especialista em técnicas de relaxamento profundo", specialty: "Massagem Relaxante" },
  { id: 2, name: "Carlos Mendes", phone: "11977665544", bio: "Formação em Shiatsu tradicional japonês", specialty: "Shiatsu" },
  { id: 3, name: "Fernanda Lima", phone: "11966554433", bio: "Especialista em drenagem linfática", specialty: "Drenagem Linfática" },
  { id: 4, name: "Roberto Silva", phone: "11955443322", bio: "Terapeuta holístico com foco em bem-estar", specialty: "Terapia Holística" },
];

const Therapists = () => {
  const [therapists, setTherapists] = useState<Therapist[]>(initialTherapists);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
    specialty: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTherapist: Therapist = {
      id: therapists.length + 1,
      name: formData.name,
      phone: formData.phone,
      bio: formData.bio,
      specialty: formData.specialty,
    };

    setTherapists([...therapists, newTherapist]);
    setFormData({ name: "", phone: "", bio: "", specialty: "" });
    setOpen(false);
    toast.success("Terapeuta cadastrado com sucesso!");
  };

  const columns = [
    { key: "name", header: "Nome" },
    {
      key: "specialty",
      header: "Especialidade",
      render: (therapist: Therapist) => (
        <span className="badge-info">{therapist.specialty}</span>
      ),
    },
    {
      key: "phone",
      header: "Telefone",
      render: (therapist: Therapist) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-4 h-4" />
          {therapist.phone}
        </div>
      ),
    },
    {
      key: "bio",
      header: "Sobre",
      render: (therapist: Therapist) => (
        <span className="text-muted-foreground text-sm line-clamp-1 max-w-xs">
          {therapist.bio}
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <PageHeader
        title="Terapeutas"
        description="Gestão da equipe de terapeutas"
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Novo Terapeuta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Novo Terapeuta</DialogTitle>
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
                  <Label htmlFor="specialty">Especialidade</Label>
                  <Input
                    id="specialty"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    placeholder="Ex: Massagem Relaxante, Shiatsu"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Breve descrição sobre o terapeuta"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Cadastrar Terapeuta</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <DataTable data={therapists} columns={columns} />
    </Layout>
  );
};

export default Therapists;
