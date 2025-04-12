import DashboardLayout from "~/modules/Layouts/Dashboard";
import { Tab, Tabs } from "@heroui/tabs";
import EventList from "./EventList";
import { Button, Card, CardBody } from "@heroui/react";
import { useResize } from "~/lib/hooks/useResize";
import dynamic from "next/dynamic";

const EventsCalendar = dynamic(() => import("./EventsCalendar"), {
  ssr: false,
});

const CalendarPage = () => {
  const { isMobile } = useResize();

  return (
    <DashboardLayout title="Calendario de Eventos">
      <div className="mb-4 flex flex-col items-center justify-between pt-0 md:flex-row">
        <aside>
          <h2>Eventos</h2>
          <p>Conoce los movimientos que tienes programado para este mes.</p>
        </aside>
        <div className="flex items-center gap-x-2">
          <Button className="border border-divider">Nueva Transacción</Button>
          <Button color="primary">Nuevo Movimiento</Button>
        </div>
      </div>

      <Card className="relative">
        <CardBody>
          <Tabs
            variant={isMobile ? "underlined" : "solid"}
            fullWidth={isMobile}
            color="primary"
          >
            <Tab title="Calendario" key="calendar">
              <EventsCalendar />
            </Tab>
            <Tab title="Lista de Eventos" key="list">
              <EventList orientation="horizontal" />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
};

export default CalendarPage;
