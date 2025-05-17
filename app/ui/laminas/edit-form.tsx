"use client";
import { createSheetSchema } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextInput from "../text-input";
import {
  ScaleOutlined,
  StraightenOutlined,
  LooksOneOutlined,
  LooksTwoOutlined,
  Looks3Outlined,
} from "@mui/icons-material";
import Link from "next/link";
import { editSheet } from "@/app/lib/data";
import { Toast } from "@/app/lib/alerts";
import { Sheet } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

export default function EditSheetForm({
  sheet,
  boxes,
  _id,
}: {
  sheet: Sheet;
  boxes: string[];
  _id: string;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof createSheetSchema>>({
    resolver: zodResolver(createSheetSchema),
    defaultValues: {
      boxes: sheet.boxes,
      description: sheet.description,
      ect: sheet.ect.map(String),
      grams: sheet.grams,
      p1: sheet.p1,
      p2: sheet.p2,
      p3: sheet.p3,
      roll_width: sheet.roll_width,
      speed: sheet.speed,
    },
  });

  const handleSubmit = async (data: z.infer<typeof createSheetSchema>) => {
    const response = await editSheet(data, _id);

    if (response.status === 200) {
      router.push(`/dashboard/laminas/${_id}`);
      Toast.fire({
        icon: "success",
        title: "Lámina editada correctamente",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error al editar la lámina",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="mb-6">
        <label className="block text-primary mb-1 font-medium">
          Cajas relacionadas
        </label>

        <div
          className={clsx("border rounded-md overflow-hidden", {
            "border-red-500": form.formState.errors.boxes,
            "border-gray-300": !form.formState.errors.boxes,
          })}
        >
          <div className="max-h-64 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
            {boxes.map((box, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
              >
                <input
                  type="checkbox"
                  value={box}
                  {...form.register("boxes")}
                  className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <span className="text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                  {box}
                </span>
              </label>
            ))}
          </div>
        </div>

        {form.formState.errors.boxes && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.boxes.message}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 mb-6">
        <div>
          <label className="block text-primary mb-1 font-medium">
            Descripción
          </label>
          <textarea
            rows={4}
            {...form.register("description")}
            placeholder="Ingrese una descripción"
            className={clsx(
              "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary",
              {
                "border-red-500": form.formState.errors.description,
                "border-gray-300": !form.formState.errors.description,
              }
            )}
          />
          {form.formState.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-primary mb-1 font-medium">ECT</label>

          <div
            className={clsx(
              "border rounded-md focus-within:ring-1 focus-within:border-primary",
              {
                "border-red-500": form.formState.errors.ect,
                "border-gray-300": !form.formState.errors.ect,
              }
            )}
          >
            <input
              type="number"
              placeholder="Escribe y presiona Enter..."
              className="w-full px-3 py-2 border-0 focus:ring-0"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = (e.target as HTMLInputElement).value.trim();
                  if (value) {
                    form.setValue("ect", [...form.watch("ect"), value]);
                    (e.target as HTMLInputElement).value = "";
                  }
                }
              }}
            />

            <div className="p-2 border-t">
              <div className="flex flex-wrap gap-2">
                {form.watch("ect")?.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 px-2 py-1 rounded-md"
                  >
                    <span className="text-sm mr-2">{tag}</span>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => {
                        const newTags = form
                          .getValues("ect")
                          .filter((_, i) => i !== index);
                        form.setValue("ect", newTags);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {form.formState.errors.ect && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.ect.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 mb-6">
        <TextInput
          label="Gramaje"
          type="number"
          iconLeft={<ScaleOutlined />}
          placeholder="Gramaje"
          {...form.register("grams", { valueAsNumber: true })}
          error={form.formState.errors.grams?.message}
          iconRight={<span className="text-sm text-gray-500">g</span>}
        />
        <TextInput
          label="Ancho de rollo"
          type="number"
          iconLeft={<StraightenOutlined />}
          placeholder="Ancho de rollo"
          {...form.register("roll_width", { valueAsNumber: true })}
          error={form.formState.errors.roll_width?.message}
          iconRight={<span className="text-sm text-gray-500">cm</span>}
        />
        <TextInput
          label="Velocidad"
          type="number"
          iconLeft={<StraightenOutlined />}
          placeholder="Velocidad"
          {...form.register("speed", { valueAsNumber: true })}
          error={form.formState.errors.speed?.message}
          iconRight={<span className="text-sm text-gray-500">m/min</span>}
        />
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
        <TextInput
          label="P1"
          type="number"
          iconLeft={<LooksOneOutlined />}
          placeholder="P1"
          {...form.register("p1", { valueAsNumber: true })}
          error={form.formState.errors.p1?.message}
        />
        <TextInput
          label="P2"
          type="number"
          iconLeft={<LooksTwoOutlined />}
          placeholder="P2"
          {...form.register("p2", { valueAsNumber: true })}
          error={form.formState.errors.p2?.message}
        />
        <TextInput
          label="P3"
          type="number"
          iconLeft={<Looks3Outlined />}
          placeholder="P3"
          {...form.register("p3", { valueAsNumber: true })}
          error={form.formState.errors.p3?.message}
        />
      </div>
      <div className="mt-12 flex items-center justify-end border-t border-gray-900/10 pt-12">
        <Link href="/dashboard/laminas" className="text-sm font-semibold">
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="ml-4 rounded-md bg-indigo-600 px-4 py-2 text-white"
        >
          {form.formState.isSubmitting ? "Creando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}
