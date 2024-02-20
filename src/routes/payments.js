import { Router } from "express";
import { Payment } from "mercadopago";
import client from "../services/mercadopago.js";
import Pago from "../db/models/pago.js";
import Pedido from "../db/models/pedido.js";
import emailjs from "@emailjs/nodejs";

const paymentsRouter = Router();

paymentsRouter.post("/payments/", async (req, res) => {
  console.log(req.query);

  const pago = new Payment(client);

  const pagoData = await pago.get({ id: req.query.id });

  const [pagoDb] = await Pago.findOrCreate({
    where: {
      mp_id: pagoData.id,
    },
    defaults: {
      mpId: pagoData.id,
      fechaAprobacion: pagoData.date_approved,
      status: pagoData.status,
      metodo: pagoData.payment_method_id,
      monto: pagoData.transaction_details.total_paid_amount,
      montoPercibido: pagoData.transaction_details.net_received_amount,
      tarifaMp: pagoData.fee_details[0]?.amount,
    },
  });

  const pedido = await Pedido.findByPk(pagoData.external_reference, {
    include: ["envio", "usuario"],
  });
  await pedido?.update({
    pagoId: pagoDb.id,
  });

  if (pagoData.status === "approved" && process.env.NODE_ENV === "production")
    emailjs
      .send(
        "service_m30ktuu",
        "template_aonanzp",
        {
          to: pedido.usuario.email,
          id: pedido.id,
          nombre: pedido?.usuario.nombres,
          subtotal: pagoDb.monto - (pedido?.envio?.costo ?? 0),
          envio: pedido?.envio?.costo ?? 0,
          total: pagoDb.monto,
        },
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY,
          privateKey: process.env.EMAILJS_PRIVATE_KEY,
        }
      )
      .catch(console.log);

  res.sendStatus(200);
});

export default paymentsRouter;
