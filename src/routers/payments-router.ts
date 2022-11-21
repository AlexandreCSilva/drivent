import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPayments, postPayments } from "@/controllers/payments-controller";
import { bodyPaymentSchema } from "@/schemas/payment-schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayments)
  .post("/process",  postPayments);

export { paymentsRouter };
