import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { EditEventTypeForm } from "@/app/components/EditEventTypeForm";

type VideoCallSoftware = "Google Meet" | "Zoom" | "Microsoft Teams";

async function getEvent(eventTypeId: string) {
  const event = await prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      title: true,
      description: true,
      duration: true,
      url: true,
      id: true,
      videoCallSoftware: true,
    },
  });

  if (!event) {
    return notFound();
  }

  return event;
}

export default async function EventPage({
  params,
}: {
  params: { eventTypeId: string };
}) {
  const event = await getEvent(params.eventTypeId);
  return (
    <EditEventTypeForm
      eventTypeId={event.id}
      title={event.title}
      url={event.url}
      description={event.description}
      duration={event.duration}
      videoCallSoftware={event.videoCallSoftware as VideoCallSoftware}
    />
  );
}
