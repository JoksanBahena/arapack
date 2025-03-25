"use client";
import Link from "next/link";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createBoxSchema } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../text-input";
import { UserIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import FileInput from "../file-input";

export default function BoxForm() {
  const form = useForm<z.infer<typeof createBoxSchema>>({
    resolver: zodResolver(createBoxSchema),
    defaultValues: {
      client: "",
      symbol: "",
      ect: 0,
      flute: "",
      length: 0,
      width: 0,
      liner: "",
      pdf_link: [] as File[],
      status: "pending",
      creases: {
        r1: 0,
        r2: 0,
        r3: 0,
      },
      treatment: 0,
      type: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof createBoxSchema>) => {
    console.log("Datos enviados:", values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Crear caja
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Llena el formulario para crear una nueva caja.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
          <TextInput
            label="Cliente"
            iconLeft={<UserIcon className="size-5 text-black" />}
            placeholder="Ingresa el nombre del cliente"
            type="text"
            {...form.register("client")}
            error={form.formState.errors.client?.message}
          />

          <TextInput
            label="Símbolo"
            iconLeft={<DocumentTextIcon className="size-5 text-black" />}
            placeholder="Ingresa el símbolo"
            type="text"
            {...form.register("symbol")}
            error={form.formState.errors.symbol?.message}
          />

          <TextInput
            label="ECT"
            iconLeft={<UserIcon className="size-5 text-black" />}
            placeholder="Ingresa el ECT"
            type="number"
            {...form.register("ect", { valueAsNumber: true })}
            error={form.formState.errors.ect?.message}
          />

          <TextInput
            label="Flauta"
            iconLeft={<UserIcon className="size-5 text-black" />}
            placeholder="Ingresa el tipo de flauta"
            type="text"
            {...form.register("flute")}
            error={form.formState.errors.flute?.message}
          />

          <TextInput
            label="Largo (cm)"
            iconLeft={<UserIcon className="size-5 text-black" />}
            placeholder="Ingresa el largo"
            type="number"
            {...form.register("length", { valueAsNumber: true })}
            error={form.formState.errors.length?.message}
          />

          <TextInput
            label="Ancho (cm)"
            iconLeft={<UserIcon className="size-5 text-black" />}
            placeholder="Ingresa el ancho"
            type="number"
            {...form.register("width", { valueAsNumber: true })}
            error={form.formState.errors.width?.message}
          />

          <TextInput
            label="Liner"
            iconLeft={<UserIcon className="size-5 text-black" />}
            placeholder="Ingresa el tipo de liner"
            type="text"
            {...form.register("liner")}
            error={form.formState.errors.liner?.message}
          />

          {/* Campos para Creases */}
          <TextInput
            label="R1"
            iconLeft={<UserIcon className="size-5 text-black" />}
            placeholder="Valor R1"
            type="number"
            {...form.register("creases.r1", { valueAsNumber: true })}
            error={form.formState.errors.creases?.r1?.message}
          />

          <TextInput
            label="R2"
            iconLeft={<UserIcon className="size-5 text-black" />}
            placeholder="Valor R2"
            type="number"
            {...form.register("creases.r2", { valueAsNumber: true })}
            error={form.formState.errors.creases?.r2?.message}
          />

          <TextInput
            label="R3"
            iconLeft={<UserIcon className="size-5 text-black" />}
            placeholder="Valor R3"
            type="number"
            {...form.register("creases.r3", { valueAsNumber: true })}
            error={form.formState.errors.creases?.r3?.message}
          />

          {/* Tipo */}
          <TextInput
            label="Tipo"
            iconLeft={<UserIcon className="size-5 text-black" />}
            placeholder="Ingresa el tipo de caja"
            type="text"
            {...form.register("type")}
            error={form.formState.errors.type?.message}
          />

          {/* PDF Link */}
          <div className="col-span-full">
            <FileInput
              label="Adjuntar PDF"
              placeholder="Selecciona un archivo..."
              icon={<PhotoIcon className="size-5 text-black" />}
              onChange={(newFiles: File[]) => {
                // Solo permite un archivo
                if (newFiles.length > 0) {
                  form.clearErrors("pdf_link");
                  form.setValue("pdf_link", [newFiles[0]]); // Solo el primer archivo
                }
              }}
              error={form.formState.errors.pdf_link?.message}
            />

            <div className="mt-2 space-y-2">
              {form.watch("pdf_link")?.map((file: File, index: number) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
                >
                  <div className="text-sm text-gray-600">
                    📄 {file.name} - {(file.size / 1024).toFixed(1)}KB
                  </div>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 text-sm ml-4"
                    onClick={() => form.setValue("pdf_link", [])} // Elimina el archivo
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tratamiento (como Select) */}
          <div>
            <label htmlFor="treatment" className="block text-sm font-medium">
              Tratamiento
            </label>
            <select
              id="treatment"
              {...form.register("treatment", { valueAsNumber: true })}
              className="block w-full rounded-md border-gray-300 px-3 py-2"
            >
              <option value={0}>Sin tratamiento</option>
              <option value={1}>Con tratamiento</option>
            </select>
            {form.formState.errors.treatment && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.treatment.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium">
              Estado
            </label>
            <select
              id="status"
              {...form.register("status")}
              className="block w-full rounded-md border-gray-300 px-3 py-2"
            >
              <option value="pending">Pendiente</option>
              <option value="completed">Completado</option>
            </select>
            {form.formState.errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.status.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <Link href="/dashboard/cajas" className="text-sm font-semibold">
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
      </div>
    </form>
  );
}
