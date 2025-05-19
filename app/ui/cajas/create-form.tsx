"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createBoxSchema } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../text-input";
import FileInput from "../file-input";
import {
  PersonOutlined,
  BadgeOutlined,
  StraightenOutlined,
  LooksOneOutlined,
  LooksTwoOutlined,
  Looks3Outlined,
  TypeSpecimenOutlined,
  RadioButtonCheckedOutlined,
  AttachFileOutlined,
  ScaleOutlined,
} from "@mui/icons-material";
import { createBox } from "@/app/lib/data";
import { Toast } from "@/app/lib/alerts";
import clsx from "clsx";
import { useState } from "react";
import { tintas } from "@/app/lib/placeholder-data";

export default function BoxForm() {
  const [numberOfInks, setNumberOfInks] = useState(1);

  const form = useForm<z.infer<typeof createBoxSchema>>({
    resolver: zodResolver(createBoxSchema),
    defaultValues: {
      client: "",
      symbol: "",
      ect: undefined,
      flute: "",
      length: undefined,
      width: undefined,
      liner: "",
      pdf_link: [] as File[],
      status: "APPROVED",
      creases: {
        r1: 0,
        r2: 0,
        r3: 0,
      },
      inks: {
        gcmi_1: "",
        gcmi_2: "",
        gcmi_3: "",
        gcmi_4: "",
      },
      weight: undefined,
      treatment: undefined,
      type: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof createBoxSchema>) => {
    const response = await createBox(values);

    if (response.status === 201) {
      form.reset();
      Toast.fire({
        icon: "success",
        title: "Caja creada correctamente",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error al crear la caja",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 mb-3">
        <TextInput
          label="Cliente"
          iconLeft={<PersonOutlined />}
          placeholder="Ingresa el nombre del cliente"
          type="text"
          {...form.register("client")}
          error={form.formState.errors.client?.message}
        />

        <TextInput
          label="Símbolo"
          iconLeft={<BadgeOutlined />}
          placeholder="Ingresa el símbolo"
          type="text"
          {...form.register("symbol")}
          error={form.formState.errors.symbol?.message}
        />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 xl:grid-cols-6 mb-5">
        <TextInput
          label="Largo (cm)"
          iconLeft={<StraightenOutlined />}
          placeholder="Ingresa el largo"
          type="number"
          step={0.01}
          {...form.register("length", { valueAsNumber: true })}
          error={form.formState.errors.length?.message}
          iconRight={<span className="text-gray-500 text-sm">cm</span>}
        />

        <TextInput
          label="Ancho (cm)"
          iconLeft={<StraightenOutlined />}
          placeholder="Ingresa el ancho"
          type="number"
          step={0.01}
          {...form.register("width", { valueAsNumber: true })}
          error={form.formState.errors.width?.message}
          iconRight={<span className="text-gray-500 text-sm">cm</span>}
        />

        <TextInput
          label="Peso (kg)"
          iconLeft={<ScaleOutlined />}
          placeholder="Ingresa el peso"
          type="number"
          step={0.001}
          {...form.register("weight", { valueAsNumber: true })}
          error={form.formState.errors.weight?.message}
          iconRight={<span className="text-gray-500 text-sm">kg</span>}
        />

        <TextInput
          label="R1"
          iconLeft={<LooksOneOutlined />}
          placeholder="Valor R1"
          type="number"
          step={0.01}
          {...form.register("creases.r1", { valueAsNumber: true })}
          error={form.formState.errors.creases?.r1?.message}
        />

        <TextInput
          label="R2"
          iconLeft={<LooksTwoOutlined />}
          placeholder="Valor R2"
          type="number"
          step={0.01}
          {...form.register("creases.r2", { valueAsNumber: true })}
          error={form.formState.errors.creases?.r2?.message}
        />

        <TextInput
          label="R3"
          iconLeft={<Looks3Outlined />}
          placeholder="Valor R3"
          type="number"
          step={0.01}
          {...form.register("creases.r3", { valueAsNumber: true })}
          error={form.formState.errors.creases?.r3?.message}
        />

        <TextInput
          label="ECT"
          iconLeft={<RadioButtonCheckedOutlined />}
          placeholder="Ingresa el ECT"
          type="number"
          {...form.register("ect", { valueAsNumber: true })}
          error={form.formState.errors.ect?.message}
        />

        <TextInput
          label="Tipo"
          iconLeft={<TypeSpecimenOutlined />}
          placeholder="Ingresa el tipo de caja"
          type="text"
          {...form.register("type")}
          error={form.formState.errors.type?.message}
        />

        {Array.from({ length: numberOfInks }).map((_, index) => {
          const inkNumber = index + 1;
          const key =
            `gcmi_${inkNumber}` as keyof typeof form.formState.errors.inks;
          const error = (form.formState.errors.inks as Record<string, { message?: string }> | undefined)?.[key]?.message;

          return (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-primary mb-1 font-medium"
              >
                GCMI {inkNumber}
              </label>
              <select
                id={key}
                {...form.register(`inks.${key}` as const)}
                className={
                  clsx("block w-full rounded-md border-gray-300 px-3 py-2", {
                    "border-red-500":
                      error !== undefined,
                    "border-gray-300 focus:border-primary focus:ring-primary":
                      error === undefined,
                  }) + " focus:outline-none"
                }
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="">Ninguno</option>
                {tintas.map((tinta) => (
                  <option key={tinta.value} value={tinta.value}>
                    {tinta.label}
                  </option>
                ))}
                {/* Agrega más opciones según necesites */}
              </select>
              {error && (
                <p className="text-red-500 text-sm mt-1">
                  {error}
                </p>
              )}
            </div>
          );
        })}

        {/* Botón para agregar más tintas */}
        {numberOfInks < 4 && (
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setNumberOfInks((prev) => Math.min(prev + 1, 4))}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              + Agregar otro color
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 mb-5">
        <div>
          <label
            htmlFor="flute"
            className="block text-primary mb-1 font-medium"
          >
            Flauta
          </label>
          <select
            id="flute"
            {...form.register("flute")}
            className={
              clsx("block w-full rounded-md border-gray-300 px-3 py-2", {
                "border-red-500":
                  form.formState.errors.flute?.message !== undefined,
                "border-gray-300 focus:border-primary focus:ring-primary":
                  form.formState.errors.flute?.message === undefined,
              }) + " focus:outline-none"
            }
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
          {form.formState.errors.flute && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.flute.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="liner"
            className="block text-primary mb-1 font-medium"
          >
            Liner
          </label>
          <select
            id="liner"
            {...form.register("liner")}
            className={
              clsx("block w-full rounded-md border-gray-300 px-3 py-2", {
                "border-red-500":
                  form.formState.errors.liner?.message !== undefined,
                "border-gray-300 focus:border-primary focus:ring-primary":
                  form.formState.errors.liner?.message === undefined,
              }) + " focus:outline-none"
            }
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="KRAFT">Kraft</option>
            <option value="BLANCO">Blanco</option>
          </select>
          {form.formState.errors.liner && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.liner.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 mb-5">
        <div className="col-span-full">
          <FileInput
            label="Adjuntar PDF"
            placeholder="Selecciona un archivo..."
            {...form.register("pdf_link")}
            icon={<AttachFileOutlined />}
            onChange={(newFiles: File[]) => {
              // Solo permite un archivo
              if (newFiles.length > 0) {
                form.clearErrors("pdf_link");
                form.setValue("pdf_link", [newFiles[0]]);
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
              </div>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="treatment"
            className="block text-primary mb-1 font-medium"
          >
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

        <div>
          <label
            htmlFor="status"
            className="block text-primary mb-1 font-medium"
          >
            Estado
          </label>
          <select
            id="status"
            {...form.register("status")}
            className="block w-full rounded-md border-gray-300 px-3 py-2"
          >
            <option value="APPROVED">Aprobada</option>
            <option value="PENDING">Pendiente</option>
            <option value="DISABLED">Deshabilitada</option>
          </select>
          {form.formState.errors.status && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.status.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-end border-t border-gray-900/10 pt-12">
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
    </form>
  );
}
