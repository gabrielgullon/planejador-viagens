import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";

export async function getParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trip/:tripId/participants/:participantId",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
          participantId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { tripId, participantId } = request.params;

      const participant = await prisma.participant.findUnique({
        where: { id: participantId },
        select: {
          id: true,
          name: true,
          email: true,
          is_confirmed: true,
        },
      });

      if (!participant) throw new ClientError("Participant not found");

      return { participant };
    }
  );
}
