import fastify from "fastify";
import { prisma } from "./lib/prisma";
import { createTrip } from "./routes/trips/create-trip";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/trips/confirm-trip";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);
app.register(confirmTrip);

// app.get("/cadastrar", async () => {
//   await prisma.trip.create({
//     data: {
//       destination: "Santiago, CL",
//       starts_at: new Date(),
//       ends_at: new Date(),
//     },
//   });

//   return "Registro cadastrado com sucesso";
// });

// app.get("/listar", async () => {
//   return await prisma.trip.findMany();
// });

app.listen({ port: 3333 }).then(() => {
  console.log("Server running");
});
