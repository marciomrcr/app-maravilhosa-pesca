import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/Button";
import { CurrencyInput } from "../../components/ui/CurrencyInput";
import { Input } from "../../components/ui/Input";
import { useProdutosSelect } from "./useProdutosSelect";

const promocaoSchema = z.object({
  produtoId: z.string().min(1, "Produto obrigatório"),
  diaSemana: z.number().min(0).max(6, "Dia da semana inválido"),
  precoPromocional: z.number().min(0, "Preço obrigatório"),
});

export type PromocaoFormValues = z.infer<typeof promocaoSchema>;

interface PromocaoFormProps {
  onSubmit: (values: PromocaoFormValues) => void;
  defaultValues?: PromocaoFormValues;
}

export function PromocaoForm({ onSubmit, defaultValues }: PromocaoFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PromocaoFormValues>({
    resolver: zodResolver(promocaoSchema),
    defaultValues,
  });
  const { data: produtos, isLoading } = useProdutosSelect();

  type Produto = {
    id: string;
    nome: string;
  };

  if (isLoading) {
    return <div>Carregando produtos...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <label className="block mb-1 font-medium">Produto</label>
        <select
          {...register("produtoId")}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Selecione...</option>
          {produtos?.map((p: Produto) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
        {errors.produtoId && (
          <span className="text-red-500 text-xs">
            {errors.produtoId.message}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Dia da Semana</label>
        <Input
          type="number"
          min={0}
          max={6}
          {...register("diaSemana", { valueAsNumber: true })}
          placeholder="0=Domingo, 1=Segunda..."
        />
        {errors.diaSemana && (
          <span className="text-red-500 text-xs">
            {errors.diaSemana.message}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Preço Promocional</label>
        <Controller
          name="precoPromocional"
          control={control}
          render={({ field }) => (
            <CurrencyInput
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSubmitting}
            />
          )}
        />
        {errors.precoPromocional && (
          <span className="text-red-500 text-xs">
            {errors.precoPromocional.message}
          </span>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        Salvar
      </Button>
    </form>
  );
}
