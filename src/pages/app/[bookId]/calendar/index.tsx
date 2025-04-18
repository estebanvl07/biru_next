import DashboardLayout from "~/modules/Layouts/Dashboard";
import { Tab, Tabs } from "@heroui/tabs";
import { Button, Card, CardBody } from "@heroui/react";
import { useResize } from "~/lib/hooks/useResize";
import EventsCalendar from "~/modules/Calendar/EventsCalendar";
import EventList from "~/modules/Calendar/EventList";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import Link from "next/link";
import { getCurrentBookId } from "~/lib/config/app_variables";

const CalendarPage = () => {
  const { isMobile } = useResize();

  return (
    <DashboardLayout
      title="Calendario de Eventos"
      activityContent={
        <div className="flex items-center gap-x-2">
          <Button
            className="border border-divider"
            as={Link}
            href={`${DASHBOARD_MAIN_PATH}/${getCurrentBookId()}/transactions/new?type=3`}
          >
            Nueva Transacción
          </Button>
          <Button
            color="primary"
            as={Link}
            href={`${DASHBOARD_MAIN_PATH}/${getCurrentBookId()}/movements/new`}
          >
            Nuevo Movimiento
          </Button>
        </div>
      }
    >
      <EventsCalendar />
    </DashboardLayout>
  );
};

export default CalendarPage;
