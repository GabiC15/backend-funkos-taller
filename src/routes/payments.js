import { Router } from "express";
import { Payment } from "mercadopago";
import client from "../services/mercadopago.js";
import Pago from "../db/models/pago.js";
import Pedido from "../db/models/pedido.js";

const paymentsRouter = Router();

paymentsRouter.post("/payments/", async (req, res) => {
  console.log(req.query);

  const pago = new Payment(client);

  const pagoData = await pago.get({ id: req.query.id });

  const [pagoDb] = await Pago.findOrCreate({
    where: {
      mpId: pagoData.id,
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

  const pedido = await Pedido.findByPk(pagoData.external_reference);
  await pedido.update({
    pagoId: pagoDb.id,
  });

  res.sendStatus(200);
});

export default paymentsRouter;
