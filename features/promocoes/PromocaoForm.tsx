import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/Button";
import { CurrencyInput } from "../../components/ui/CurrencyInput";
import { useProdutosSelect } from "./useProdutosSelect";

const promocaoSchema = z.object({
  produtoId: z.string().min(1, "Selecione um produto"),
  diaSemana: z
    .number()
    .min(0, "Selecione um dia da semana válido")
    .max(6, "Dia da semana deve ser entre 0 (Domingo) e 6 (Sábado)"),
  precoPromocional: z.number().min(0, "O preço não pode ser negativo"),
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
  } = useForm({
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
      onSubmit={handleSubmit((data) => onSubmit(data as PromocaoFormValues))}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Produto <span className="text-red-500">*</span>
        </label>
        <select
          {...register("produtoId")}
          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-300 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-gray-700"
        >
          <option value="">Selecione um produto</option>
          {produtos?.map((p: Produto) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
        {errors.produtoId && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.produtoId.message}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Dia da Semana
        </label>
        <select
          {...register("diaSemana", { valueAsNumber: true })}
          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-300 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-gray-700"
        >
          <option value="">Selecione o dia da semana</option>
          <option value="0">Domingo</option>
          <option value="1">Segunda-feira</option>
          <option value="2">Terça-feira</option>
          <option value="3">Quarta-feira</option>
          <option value="4">Quinta-feira</option>
          <option value="5">Sexta-feira</option>
          <option value="6">Sábado</option>
        </select>
        {errors.diaSemana ? (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.diaSemana.message}
          </span>
        ) : (
          <span className="text-gray-500 text-xs mt-1 block">
            Escolha o dia da semana para a promoção
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Preço Promocional <span className="text-red-500">*</span>
        </label>
        <Controller
          name="precoPromocional"
          control={control}
          render={({ field }) => (
            <CurrencyInput
              value={Number(field.value) || 0}
              onValueChange={(value) => {
                // Garantimos que o valor seja um número válido com duas casas decimais
                const numericValue = isNaN(value)
                  ? 0
                  : Number(value.toFixed(2));
                field.onChange(numericValue);
              }}
              disabled={isSubmitting}
              className="border-gray-300 focus:border-primary-300 bg-amber-50 text-gray-700 focus:ring focus:ring-primary-100 focus:ring-opacity-50"
              aria-required="true"
            />
          )}
        />
        {errors.precoPromocional ? (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.precoPromocional.message}
          </span>
        ) : (
          <span className="text-gray-500 text-xs mt-1 block">
            Informe o valor com desconto
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 pt-2">
        <p className="text-gray-500 text-xs">
          <span className="text-red-500">*</span> Campos obrigatórios
        </p>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 flex items-center justify-center gap-2"
        >
          {isSubmitting && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {isSubmitting ? "Salvando..." : "Salvar Promoção"}
        </Button>
      </div>
    </form>
  );
}
