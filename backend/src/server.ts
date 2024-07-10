import fastify from "fastify";
import cors from "@fastify/cors";
import { prisma } from "./lib/prisma";
import { createTrip } from "./routes/trips/create-trip";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/trips/confirm-trip";
import { confirmParticipant } from "./routes/participants/confirm-participant";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, { origin: "*" });
app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipant);

app.listen({ port: 3333 }).then(() => {
  console.log("Server running");
});
