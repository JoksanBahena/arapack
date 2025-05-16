"use client";
import { useState } from "react";
import TextInput from "../text-input";
import { CalendarMonthOutlined, NumbersOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createShippingSchema } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createShipping } from "@/app/lib/data";
import { Toast } from "@/app/lib/alerts";
import { useRouter } from "next/navigation";

export default function DeliveryForm({
  missing_quantity,
  arapack_lot,
}: {
  missing_quantity: number;
  arapack_lot: string;
}) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof createShippingSchema>>({
    resolver: zodResolver(createShippingSchema),
    defaultValues: {
      initial_shipping_date: new Date().toISOString().split("T")[0],
      quantity: 0,
      comment: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof createShippingSchema>) => {
    const response = await createShipping(values, arapack_lot);

    if (response.status === 200) {
      form.reset();
      router.refresh();
      Toast.fire({
        icon: "success",
        title: "Envío creado correctamente",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error al crear el envío",
      });
    }
  };

  return (
    <>
      <button
        type="button"
        className="mt-2 mb-2 text-green-700 underline bg-transparent border-none shadow-none px-0 py-0 text-sm font-medium hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-600"
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? "Ocultar formulario de envío" : "Expandir formulario de envío"}
      </button>
      <div
        className={`mt-4 border rounded-lg p-4 bg-gray-50 shadow-sm${
          show ? "" : " hidden"
        }`}
        id="shipping-form"
      >
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <TextInput
            label="Fecha de envío"
            placeholder="Ingresa el largo"
            type="date"
            {...form.register("initial_shipping_date")}
            error={form.formState.errors.initial_shipping_date?.message}
            iconLeft={<CalendarMonthOutlined />}
          />
          <TextInput
            label="Cantidad"
            placeholder="Ingresa la cantidad"
            type="number"
            {...form.register("quantity", {
              valueAsNumber: true,
            })}
            min={1}
            max={missing_quantity}
            error={form.formState.errors.quantity?.message}
            iconLeft={<NumbersOutlined />}
            iconRight={<span className="text-gray-500 text-sm">pzas.</span>}
          />
          <div>
            <label
              htmlFor="comment"
              className="block text-primary mb-1 font-medium"
            >
              Comentarios
            </label>
            <textarea
              placeholder="Escribe un comentario"
              {...form.register("comment")}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>

          <div className="text-right mt-4">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
            >
              Guardar seguimiento
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
