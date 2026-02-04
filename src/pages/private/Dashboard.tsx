import { Layout } from "../../components/layout/private/Layout";
import { PageHeader } from "../../components/ui/pageHeader";
import { StatCard } from "../../components/ui/statCard";
import { DataTable } from "../../components/ui/dataTable";
import { Calendar, Users, UserCircle, DollarSign } from "lucide-react";
import type { Booking, Client, Therapist } from "../../types";

// Mock data
const mockBookings: (Booking & { client: Client; therapist: Therapist })[] = [
  {
    id: 1,
    date: "2025-02-04",
    start_time: "09:00",
    clientId: 1,
    serviceId: 1,
    therapistId: 1,
    client: { id: 1, name: "Maria Silva", phone: "11999887766", email: "maria@email.com" },
    therapist: { id: 1, name: "Ana Paula", phone: "11998776655", bio: "", specialty: "Massagem Relaxante" },
  },
  {
    id: 2,
    date: "2025-02-04",
    start_time: "10:30",
    clientId: 2,
    serviceId: 2,
    therapistId: 2,
    client: { id: 2, name: "João Santos", phone: "11988776655", email: "joao@email.com" },
    therapist: { id: 2, name: "Carlos Mendes", phone: "11977665544", bio: "", specialty: "Shiatsu" },
  },
  {
    id: 3,
    date: "2025-02-04",
    start_time: "14:00",
    clientId: 3,
    serviceId: 1,
    therapistId: 1,
    client: { id: 3, name: "Ana Costa", phone: "11966554433", email: "ana@email.com" },
    therapist: { id: 1, name: "Ana Paula", phone: "11998776655", bio: "", specialty: "Massagem Relaxante" },
  },
];

const bookingColumns = [
  { key: "start_time", header: "Horário" },
  { key: "client.name", header: "Cliente" },
  { key: "therapist.name", header: "Terapeuta" },
  {
    key: "status",
    header: "Status",
    render: () => <span className="badge-success">Confirmado</span>,
  },
];

const Dashboard = () => {
  return (
    <Layout>
      <PageHeader
        title="Dashboard"
        description="Visão geral do seu negócio"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Agendamentos Hoje"
          value={12}
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Clientes Ativos"
          value={156}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Terapeutas"
          value={8}
          icon={UserCircle}
          description="6 disponíveis hoje"
        />
        <StatCard
          title="Faturamento Mensal"
          value="R$ 24.500"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Today's Appointments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Agendamentos de Hoje
          </h2>
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <DataTable data={mockBookings} columns={bookingColumns} />
      </div>
    </Layout>
  );
};

export default Dashboard;
