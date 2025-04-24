"use client";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPurchaseSchema } from "@/app/lib/zod";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { z } from "zod";
import TextInput from "../text-input";
import {
  AttachMoneyOutlined,
  BallotOutlined,
  CalendarMonthOutlined,
  NumbersOutlined,
  PersonOutline,
  RadioButtonCheckedOutlined,
  RequestQuoteOutlined,
  ScaleOutlined,
  TypeSpecimenOutlined,
} from "@mui/icons-material";
import clsx from "clsx";
import Link from "next/link";
import { createPurchase, fetchBoxBySymbol } from "@/app/lib/data";
import { Toast } from "@/app/lib/alerts";

const steps = [
  "Detalles de orden",
  "Especificaciones técnicas",
  "Producción y envío",
  "Información financiera",
  "Seguimiento",
];

export default function PurchaseStepperForm({
  symbols,
}: {
  symbols: string[];
}) {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm<z.infer<typeof createPurchaseSchema>>({
    resolver: zodResolver(createPurchaseSchema),
    defaultValues: {
      receipt_date: new Date().toISOString().split("T")[0],
      order_number: "",
      client: "",
      symbol: "",
      repetition_new: "",
      type: "",
      flute: "",
      liner: "",
      ect: undefined,
      number_of_inks: undefined,
      quantity: undefined,
      estimated_delivery_date: undefined,
      unit_cost: undefined,
      arapack_lot: "",
      subtotal: 0,
      total_invoice: 0,
      weight: undefined,
      total_kilograms: 0,
      status: "",
      comments: "",
    },
  });

  const { handleSubmit, trigger, watch, setValue } = methods;

  const stepFields = [
    ["receipt_date", "order_number", "client", "symbol", "repetition_new"],
    ["type", "flute", "liner", "ect", "number_of_inks"],
    ["quantity", "estimated_delivery_date"],
    ["unit_cost", "arapack_lot", "subtotal", "total_invoice"],
    ["weight", "total_kilograms", "status", "comments"],
  ];

  const unit_cost = watch("unit_cost");
  const quantity = watch("quantity");
  const weight = watch("weight");
  const symbol = watch("symbol");

  useEffect(() => {
    const currentUnitCost = Number(unit_cost || 0);
    const currentQuantity = Number(quantity || 0);
    const currentWeight = Number(weight || 0);

    if (currentUnitCost > 0 && currentQuantity > 0) {
      const subtotal = currentUnitCost * currentQuantity;
      const totalInvoice = subtotal * 1.16;

      setValue("subtotal", parseFloat(subtotal.toFixed(2)));
      setValue("total_invoice", parseFloat(totalInvoice.toFixed(2)));
    }

    if (currentWeight > 0 && currentQuantity > 0) {
      const totalKg = currentWeight * currentQuantity;
      setValue("total_kilograms", parseFloat(totalKg.toFixed(2)));
    }
  }, [unit_cost, quantity, weight, setValue]);

  useEffect(() => {
    if (symbol) {
      const fecthBox = async () => {
        const box = await fetchBoxBySymbol(symbol);

        if (box) {
          setValue("type", box.type);
          setValue("flute", box.flute);
          setValue("liner", box.liner);
          setValue("ect", box.ect);
          const inkCount = Object.values(box.inks).filter(
            (ink) => ink !== ""
          ).length;
          setValue("number_of_inks", inkCount);
          setValue("client", box.client);
          setValue("weight", box.weight);
        }
      };
      fecthBox();
    }
  }, [symbol, setValue]);

  const handleNext = async () => {
    const fields = stepFields[activeStep];
    const isValid = await trigger(fields as any);

    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (values: z.infer<typeof createPurchaseSchema>) => {
    const response = await createPurchase(values);

    if (response.status === 201) {
      methods.reset();
      setActiveStep(0);
      Toast.fire({
        icon: "success",
        title: "Órden creada correctamente",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error al crear la órden",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          {activeStep === 0 && <OrderDetailsStep symbols={symbols} />}
          {activeStep === 1 && <TechnicalSpecsStep />}
          {activeStep === 2 && <ProductionShippingStep />}
          {activeStep === 3 && <FinancialInfoStep />}
          {activeStep === 4 && <TrackingStep />}

          <div className="mt-12 flex items-center justify-end border-t border-gray-900/10 pt-12">
            {activeStep === 0 ? (
              <Link
                href="/dashboard/ordenes"
                className="text-sm font-semibold text-gray-900 hover:text-gray-700"
              >
                Cancelar
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleBack}
                className="text-sm font-semibold text-gray-900 hover:text-gray-700"
              >
                Anterior
              </button>
            )}
            {activeStep === steps.length - 1 ? (
              <button
                type="submit" // Corregido aquí
                className="ml-4 rounded-md bg-indigo-600 px-4 py-2 text-white"
              >
                Guardar
              </button>
            ) : (
              <button
                type="button"
                className="ml-4 rounded-md bg-indigo-600 px-4 py-2 text-white"
                onClick={handleNext}
              >
                Siguiente
              </button>
            )}
          </div>
        </form>
      </Box>
    </FormProvider>
  );
}

// Componentes para cada paso
const OrderDetailsStep = ({ symbols }: { symbols: string[] }) => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <InputField
      name="receipt_date"
      label="Fecha de recibo"
      type="date"
      iconLeft={<CalendarMonthOutlined />}
    />
    <InputField
      name="symbol"
      label="Símbolo"
      type="select"
      placeholder="Ingresa el símbolo"
      options={symbols.map((symbol) => symbol)}
    />
    <InputField
      name="order_number"
      label="Número de orden"
      iconLeft={<NumbersOutlined />}
      placeholder="Ingresa el número de orden"
    />
    <InputField
      name="client"
      label="Cliente"
      iconLeft={<PersonOutline />}
      placeholder="Ingresa el nombre del cliente"
    />
    {/* <InputField
      name="symbol"
      label="Símbolo"
      iconLeft={<BadgeOutlined />}
      placeholder="Ingresa el símbolo"
    /> */}
    <InputField
      name="repetition_new"
      label="Repetición/Nuevo"
      type="select"
      placeholder="Ingresa la repetición/nuevo"
      options={["Repetición", "Nuevo"]}
    />
  </div>
);

const TechnicalSpecsStep = () => (
  <div className="grid grid-cols-2 gap-6">
    <InputField
      name="type"
      label="Tipo"
      iconLeft={<TypeSpecimenOutlined />}
      placeholder="Ingresa el tipo"
    />
    <InputField
      name="flute"
      label="Flauta"
      type="select"
      placeholder="Selecciona la flauta"
      options={["A", "B", "C", "E", "F"]}
    />
    <InputField
      name="liner"
      label="Liner"
      type="select"
      options={["Kraft", "Blanco"]}
    />
    <InputField
      name="ect"
      label="ECT"
      type="number"
      iconLeft={<RadioButtonCheckedOutlined />}
      placeholder="Ingresa el ECT"
      isNumber
    />
    <InputField
      name="number_of_inks"
      label="Número de tintas"
      type="number"
      iconLeft={<NumbersOutlined />}
      placeholder="Ingresa el número de tintas"
      isNumber
    />
  </div>
);

const ProductionShippingStep = () => (
  <div className="grid grid-cols-2 gap-6">
    <InputField
      name="quantity"
      label="Cantidad"
      type="number"
      iconLeft={<NumbersOutlined />}
      iconRight={<span className="text-sm text-gray-500">pzs.</span>}
      placeholder="Ingresa la cantidad a producir"
      isNumber
    />
    <InputField
      name="estimated_delivery_date"
      label="Fecha estimada de entrega"
      type="date"
      iconLeft={<CalendarMonthOutlined />}
    />
  </div>
);

const FinancialInfoStep = () => (
  <div className="grid grid-cols-2 gap-6">
    <InputField
      name="unit_cost"
      label="Costo unitario"
      type="number"
      iconLeft={<AttachMoneyOutlined />}
      iconRight={<span className="text-sm text-gray-500">MXN</span>}
      placeholder="Ingresa el costo unitario"
      isNumber
    />
    <InputField
      name="arapack_lot"
      label="Lote Arapack"
      iconLeft={<BallotOutlined />}
      placeholder="Ingresa el lote Arapack"
    />
    <InputField
      name="subtotal"
      label="Subtotal"
      type="number"
      iconLeft={<AttachMoneyOutlined />}
      iconRight={<span className="text-sm text-gray-500">MXN</span>}
      placeholder="El subtotal se calcula automáticamente"
      isNumber
      readonly
    />
    <InputField
      name="total_invoice"
      label="Total factura"
      type="number"
      iconLeft={<RequestQuoteOutlined />}
      iconRight={<span className="text-sm text-gray-500">MXN</span>}
      placeholder="El total de la factura se calcula automáticamente"
      isNumber
      readonly
    />
  </div>
);

const TrackingStep = () => (
  <div className="grid grid-cols-2 gap-6">
    <InputField
      name="weight"
      label="Peso"
      type="number"
      iconLeft={<ScaleOutlined />}
      iconRight={<span className="text-sm text-gray-500">kg</span>}
      placeholder="Ingresa el peso"
      isNumber
    />
    <InputField
      name="total_kilograms"
      label="Total kilogramos"
      type="number"
      iconLeft={<ScaleOutlined />}
      iconRight={<span className="text-sm text-gray-500">kg</span>}
      placeholder="Ingresa el total de kilogramos"
      isNumber
      readonly
    />
    <InputField
      name="status"
      label="Estado"
      type="select"
      options={["Aprobado", "Pendiente", "Cancelada"]}
    />
    <InputField
      name="comments"
      label="Comentarios"
      placeholder="Escriba algunos comentarios..."
      multiline
    />
  </div>
);

// Componente InputField genérico
interface InputFieldProps {
  name: string;
  label: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  placeholder?: string;
  type?: string;
  options?: string[];
  multiline?: boolean;
  isNumber?: boolean;
  readonly?: boolean;
}

const InputField = ({
  name,
  label,
  iconLeft,
  iconRight,
  placeholder,
  type = "text",
  options,
  multiline = false,
  isNumber = false,
  readonly = false,
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {multiline ? (
        <div>
          <label htmlFor={name} className="block text-primary mb-1 font-medium">
            {label}
          </label>
          <textarea
            placeholder={placeholder}
            {...register(name)}
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
          />
        </div>
      ) : (
        <>
          {type === "select" ? (
            <div>
              <label
                htmlFor={name}
                className="block text-primary mb-1 font-medium"
              >
                {label}
              </label>
              <select
                id="flute"
                {...register(name)}
                className={
                  clsx("block w-full rounded-md border-gray-300 px-3 py-2", {
                    "border-red-500": errors[name]?.message !== undefined,
                    "border-gray-300 focus:border-primary focus:ring-primary":
                      errors[name]?.message === undefined,
                  }) + " focus:outline-none"
                }
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {options?.map((option) => (
                  <option key={option} value={option.toUpperCase()}>
                    {option}
                  </option>
                ))}
              </select>
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                  {typeof errors[name]?.message === "string" &&
                    errors[name]?.message}
                </p>
              )}
            </div>
          ) : (
            <TextInput
              label={label}
              iconLeft={iconLeft}
              iconRight={iconRight}
              placeholder={placeholder}
              type={type}
              step={isNumber ? 0.001 : undefined}
              {...register(name, isNumber ? { valueAsNumber: true } : {})}
              error={
                typeof errors[name]?.message === "string"
                  ? errors[name]?.message
                  : undefined
              }
              min={
                type === "date"
                  ? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  : undefined
              }
              readOnly={readonly}
            />
          )}
        </>
      )}
    </div>
  );
};
