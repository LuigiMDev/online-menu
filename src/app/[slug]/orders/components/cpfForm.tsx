"use client";
import React from "react";
import { z } from "zod";
import { isValidCpf, removeCpfPunctuation } from "../../menu/helpers/cpf";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PatternFormat } from "react-number-format";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é Obrigatório!",
    })
    .refine((value) => isValidCpf(value), {
      message: "Digite um CPF válido!",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

const CpfForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter()
  const pathname = usePathname()

  const onSubmit = (data: FormSchema) => {
    router.push(`${pathname}?cpf=${removeCpfPunctuation(data.cpf)}`)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pedidos</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para ver seus pedidos
          </DrawerDescription>
        </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="px-5">
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite o seu CPF..."
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button
                  type="submit"
                  variant="destructive"
                  className="rounded-full"
                >
                  Confirmar
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full rounded-full" onClick={handleCancel}>
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default CpfForm;
