import cors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { errorHandler } from "./error-handler";
import { createActivity } from "./routes/activities/create-activity";
import { getActivities } from "./routes/activities/get-activity";
import { createLink } from "./routes/links/create-link";
import { getLinks } from "./routes/links/get-link";
import { confirmParticipant } from "./routes/participants/confirm-participant";
import { getParticipant } from "./routes/participants/get-participant";
import { getParticipants } from "./routes/participants/get-participants";
import { confirmTrip } from "./routes/trips/confirm-trip";
import { createTrip } from "./routes/trips/create-trip";
import { getTripDetails } from "./routes/trips/get-trip-details";
import { inviteToTrip } from "./routes/trips/invite-to-trip";
import { updateTrip } from "./routes/trips/update-trip";
import { env } from "./env";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(cors, { origin: "*" });
app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipant);
app.register(createActivity);
app.register(getActivities);
app.register(createLink);
app.register(getLinks);
app.register(getParticipants);
app.register(inviteToTrip);
app.register(updateTrip);
app.register(getTripDetails);
app.register(getParticipant);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server running");
});
