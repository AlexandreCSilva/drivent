import { prisma } from "@/config";
import { bodyPaymentType } from "@/schemas/payment-schemas";
import { Payment } from "@prisma/client";

async function getPayments(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId
    }
  });
}

async function postPayments(bodyPayment: bodyPaymentType, valor: number) {
  const payment: Omit<Payment, "id"> = {
    ticketId: bodyPayment.ticketId,
    value: valor,
    cardIssuer: bodyPayment.cardData.issuer,
    cardLastDigits: bodyPayment.cardData.number.slice(-4),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return prisma.payment.create({
    data: payment
  });
}

const paymentsRepository = {
  getPayments,
  postPayments
};

export default paymentsRepository;
