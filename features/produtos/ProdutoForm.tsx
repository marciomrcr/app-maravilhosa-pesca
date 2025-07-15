import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/Button";
import { CurrencyInput } from "../../components/ui/CurrencyInput";
import { Input } from "../../components/ui/Input";

const produtoSchema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  categoria: z.string().min(2, "Categoria obrigatória"),
  unidade: z.string().min(1, "Unidade obrigatória"),
  preco: z.number().min(0, "Preço obrigatório"),
});

export type ProdutoFormValues = z.infer<typeof produtoSchema>;

interface ProdutoFormProps {
  onSubmit: (values: ProdutoFormValues) => void;
  defaultValues?: ProdutoFormValues;
}

export function ProdutoForm({ onSubmit, defaultValues }: ProdutoFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProdutoFormValues>({
    resolver: zodResolver(produtoSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <label className="block mb-1 font-medium">Nome</label>
        <Input {...register("nome")} />
        {errors.nome && (
          <span className="text-red-500 text-xs">{errors.nome.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Categoria</label>
        <Input {...register("categoria")} />
        {errors.categoria && (
          <span className="text-red-500 text-xs">
            {errors.categoria.message}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Unidade</label>
        <Input {...register("unidade")} placeholder="Ex: unidade, kg, pacote" />
        {errors.unidade && (
          <span className="text-red-500 text-xs">{errors.unidade.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Preço</label>
        <Controller
          name="preco"
          control={control}
          render={({ field }) => (
            <CurrencyInput
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSubmitting}
            />
          )}
        />
        {errors.preco && (
          <span className="text-red-500 text-xs">{errors.preco.message}</span>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        Salvar
      </Button>
    </form>
  );
}
