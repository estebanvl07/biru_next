import DashboardLayout from "~/modules/Layouts/Dashboard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@heroui/react";
import { Calendar, DollarSignIcon, InfoIcon } from "lucide-react";
import esLocale from "@fullcalendar/core/locales/es";
import { addDays, addMonths, format } from "date-fns";
import { es } from "date-fns/locale";
import { sliceEvents } from "@fullcalendar/core/index.js";
import EventsCalendar from "./EventsCalendar";

// Datos de ejemplo para el calendario
const data = [
  {
    id: "1",
    title: "Pago de Hipoteca",
    start: new Date(),
    end: new Date(),
    allDay: true,
    extendedProps: {
      tipo: "prestamo",
      monto: "$1,200.00",
      descripcion: "Pago mensual de hipoteca",
      cuenta: "Banco Principal",
    },
  },
  {
    id: "2",
    title: "Depósito de Ahorro",
    start: addDays(new Date(), 2),
    end: addDays(new Date(), 2),
    allDay: true,
    extendedProps: {
      tipo: "ahorro",
      monto: "$500.00",
      descripcion: "Depósito automático para fondo de emergencia",
      cuenta: "Cuenta de Ahorros",
    },
  },
  {
    id: "3",
    title: "Pago de Servicios",
    start: addDays(new Date(), 5),
    end: addDays(new Date(), 5),
    allDay: true,
    extendedProps: {
      tipo: "transaccion",
      monto: "$150.00",
      descripcion: "Pago de electricidad y agua",
      cuenta: "Cuenta Corriente",
    },
  },
  {
    id: "4",
    title: "Meta: Nuevo Computador",
    start: addMonths(new Date(), 1),
    end: addMonths(new Date(), 1),
    allDay: true,
    extendedProps: {
      tipo: "meta",
      monto: "$1,500.00",
      descripcion: "Fecha objetivo para comprar nuevo computador",
      progreso: "80%",
    },
  },
  {
    id: "5",
    title: "Límite de Presupuesto Mensual",
    start: addDays(new Date(), 15),
    end: addDays(new Date(), 15),
    allDay: true,
    extendedProps: {
      tipo: "presupuesto",
      monto: "$2,000.00",
      descripcion: "Revisión de presupuesto mensual",
      categoria: "General",
    },
  },
];

const CalendarPage = () => {
  return (
    <DashboardLayout title="Calendario de Eventos">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <EventsCalendar />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
