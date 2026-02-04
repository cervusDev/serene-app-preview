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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Plus, Clock } from "lucide-react";
import type { Slot, Therapist } from "../../types";
import { toast } from "sonner";

const mockTherapists: Therapist[] = [
  { id: 1, name: "Ana Paula", phone: "11998776655", bio: "", specialty: "Massagem Relaxante" },
  { id: 2, name: "Carlos Mendes", phone: "11977665544", bio: "", specialty: "Shiatsu" },
  { id: 3, name: "Fernanda Lima", phone: "11966554433", bio: "", specialty: "Drenagem Linfática" },
];

type SlotWithTherapist = Slot & { therapist?: Therapist };

const initialSlots: SlotWithTherapist[] = [
  { id: 1, date: "2025-02-04", startTime: "08:00", endTime: "12:00", therapistId: 1, therapist: mockTherapists[0] },
  { id: 2, date: "2025-02-04", startTime: "13:00", endTime: "18:00", therapistId: 1, therapist: mockTherapists[0] },
  { id: 3, date: "2025-02-04", startTime: "09:00", endTime: "13:00", therapistId: 2, therapist: mockTherapists[1] },
  { id: 4, date: "2025-02-04", startTime: "14:00", endTime: "19:00", therapistId: 2, therapist: mockTherapists[1] },
  { id: 5, date: "2025-02-05", startTime: "08:00", endTime: "14:00", therapistId: 3, therapist: mockTherapists[2] },
];

const Slots = () => {
  const [slots, setSlots] = useState<SlotWithTherapist[]>(initialSlots);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    therapistId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const therapist = mockTherapists.find(t => t.id === Number(formData.therapistId));

    const newSlot: SlotWithTherapist = {
      id: slots.length + 1,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      therapistId: Number(formData.therapistId),
      therapist,
    };

    setSlots([...slots, newSlot]);
    setFormData({ date: "", startTime: "", endTime: "", therapistId: "" });
    setOpen(false);
    toast.success("Horário cadastrado com sucesso!");
  };

  const columns = [
    { key: "date", header: "Data" },
    {
      key: "time",
      header: "Período",
      render: (slot: SlotWithTherapist) => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{slot.startTime} - {slot.endTime}</span>
        </div>
      ),
    },
    { key: "therapist.name", header: "Terapeuta" },
    {
      key: "specialty",
      header: "Especialidade",
      render: (slot: SlotWithTherapist) => (
        <span className="badge-info">{slot.therapist?.specialty}</span>
      ),
    },
  ];

  return (
    <Layout>
      <PageHeader
        title="Horários"
        description="Gerencie a disponibilidade dos terapeutas"
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Novo Horário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Novo Horário</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Início</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Fim</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      required
                    />
                  </div>
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
                  <Button type="submit">Cadastrar Horário</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <DataTable data={slots} columns={columns} />
    </Layout>
  );
};

export default Slots;
