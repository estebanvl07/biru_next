import DashboardLayout from "~/modules/Layouts/Dashboard";
import { Tab, Tabs } from "@heroui/tabs";
import { Button, Card, CardBody } from "@heroui/react";
import { useResize } from "~/lib/hooks/useResize";
import EventsCalendar from "~/modules/Calendar/EventsCalendar";
import EventList from "~/modules/Calendar/EventList";

const CalendarPage = () => {
  const { isMobile } = useResize();

  return (
    <DashboardLayout
      title="Calendario de Eventos"
      activityContent={
        <div className="flex items-center gap-x-2">
          <Button className="border border-divider">Nueva Transacción</Button>
          <Button color="primary">Nuevo Movimiento</Button>
        </div>
      }
    >
      <Card className="relative">
        <CardBody>
          <Tabs variant={"underlined"} fullWidth={isMobile} color="primary">
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
