"use client";
import { useForm } from "react-hook-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import BoxForm from "@/app/ui/cajas/create-form";
import { createBoxSchema } from "@/app/lib/zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/cajas", label: "Cajas" },
          {
            href: "/dashboard/cajas/crear-caja",
            label: "Crear caja",
            active: true,
          },
        ]}
      />
      <BoxForm/>
    </div>
  );
}
