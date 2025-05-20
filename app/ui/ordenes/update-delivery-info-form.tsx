"use client";
import { Toast } from "@/app/lib/alerts";
import { updateDeliveryInfo } from "@/app/lib/data";
import { updateDeliveryInfoSchema } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextInput from "../text-input";
import { CalendarMonthOutlined } from "@mui/icons-material";
import { Button } from "../button";

export default function UpdateDeliveryInfoForm({
  arapack_lot,
  data,
}: {
  arapack_lot: string;
  data: {
    estimated_delivery_date: string;
    quantity: number;
  };
}) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof updateDeliveryInfoSchema>>({
    resolver: zodResolver(updateDeliveryInfoSchema),
    defaultValues: {
      new_delivery_date: new Date(data.estimated_delivery_date)
        .toISOString()
        .split("T")[0],
      new_quantity: data.quantity,
    },
  });

  const handleSubmit = async (
    values: z.infer<typeof updateDeliveryInfoSchema>
  ) => {
    const response = await updateDeliveryInfo(arapack_lot, values);

    if (response.status === 200) {
      router.refresh();
      Toast.fire({
        icon: "success",
        title: "Información de entrega actualizada correctamente",
      });
      form.reset();
    } else {
      Toast.fire({
        icon: "error",
        title: "Error al actualizar la información de entrega",
      });
    }
  };

  return (
    <>
      <button
        type="button"
        className="mt-2 mb-2 mr-2 text-blue-700 underline bg-transparent border-none shadow-none px-0 py-0 text-sm font-medium hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
        onClick={() => setShow((prev) => !prev)}
      >
        {show
          ? "Ocultar formulario de actualización"
          : "Expandir formulario de actualización"}
      </button>
      <div
        className={`mt-4 border rounded-lg p-4 bg-gray-50 shadow-sm${
          show ? "" : " hidden"
        }`}
        id="shipping-form"
      >
        <h3 className="text-lg font-semibold mb-4">Actualizar información de entrega</h3>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <TextInput
            label="Nueva fecha de entrega"
            placeholder="Ingresa la nueva fecha de entrega"
            type="date"
            {...form.register("new_delivery_date")}
            error={form.formState.errors.new_delivery_date?.message}
            iconLeft={<CalendarMonthOutlined />}
          />
          <TextInput
            label="Nueva cantidad"
            placeholder="Ingresa la nueva cantidad"
            type="number"
            {...form.register("new_quantity", {
              valueAsNumber: true,
            })}
            min={1}
            error={form.formState.errors.new_quantity?.message}
            iconLeft={<CalendarMonthOutlined />}
            iconRight={<span className="text-gray-500 text-sm">pzas.</span>}
          />

          <div className="text-right mt-4">
            <Button type="submit">Actualizar información de entrega</Button>
          </div>
        </form>
      </div>
    </>
  );
}
