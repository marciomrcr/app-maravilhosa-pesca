import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/Button";
import { CurrencyInput } from "../../components/ui/CurrencyInput";
import { Input } from "../../components/ui/Input";

// Definição do schema do formulário com Zod
// Esquema do formulário
const produtoSchema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  categoria: z.string().min(2, "Categoria obrigatória"),
  unidade: z.string().min(1, "Unidade obrigatória"),
  preco: z.coerce
    .number()
    .min(0, "Preço não pode ser negativo")
    .or(z.literal(0))
    .default(0),
  fornecedor: z.string().optional().nullable(),
  estoque: z.coerce
    .number()
    .int("O estoque deve ser um número inteiro")
    .min(1, "Estoque deve ser pelo menos 1"),
});

// Tipo derivado do schema Zod
export type ProdutoFormValues = z.infer<typeof produtoSchema>;

interface ProdutoFormProps {
  onSubmit: (values: ProdutoFormValues) => void;
  defaultValues?: Partial<ProdutoFormValues>;
}

export function ProdutoForm({ onSubmit, defaultValues }: ProdutoFormProps) {
  // Usando tipagem genérica para evitar erros de compatibilidade com o resolver
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      nome: "",
      categoria: "",
      unidade: "",
      preco: 0,
      fornecedor: "",
      estoque: defaultValues?.estoque || undefined,
      ...defaultValues,
    },
  });

  // Lista de categorias comuns para um estabelecimento de pesca
  const categoriasComuns = [
    "Frutos do Mar",
    "Peixe",
    "Iscas",
    "Equipamentos",
    "Acessórios",
    "Outros",
  ];

  // Lista de unidades comuns
  const unidadesComuns = ["kg", "unidade", "pacote", "dúzia", "litro"];

  // Manipulador tipado para formulário
  // Manipulador para o formulário
  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data as ProdutoFormValues);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5 max-w-md mx-auto">
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Nome <span className="text-blue-500">*</span>
        </label>
        <Input
          {...register("nome")}
          className="border-gray-300 focus:border-primary-300 bg-amber-50 text-gray-700 focus:ring focus:ring-primary-100 focus:ring-opacity-50"
          placeholder="Nome do produto"
          aria-required="true"
        />
        {errors.nome && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.nome.message}
          </span>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Categoria <span className="text-red-500">*</span>
        </label>
        <select
          {...register("categoria")}
          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-300 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-gray-500 "
          aria-required="true"
        >
          <option value="">Selecione uma categoria</option>
          {categoriasComuns.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.categoria && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.categoria.message}
          </span>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Unidade <span className="text-red-500">*</span>
        </label>
        <select
          {...register("unidade")}
          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-300 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-gray-700"
          aria-required="true"
        >
          <option value="">Selecione uma unidade</option>
          {unidadesComuns.map((un) => (
            <option key={un} value={un}>
              {un}
            </option>
          ))}
        </select>
        {errors.unidade && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.unidade.message}
          </span>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Fornecedor
        </label>
        <Input
          {...register("fornecedor")}
          className="border-gray-300 focus:border-primary-100 bg-amber-50 text-gray-700 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Preço (R$) <span className="text-red-500">*</span>
          </label>
          <Controller
            name="preco"
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
          {errors.preco && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.preco.message}
            </span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Estoque <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="Mínimo 1"
            {...register("estoque", {
              // Convertemos string para número, mas garantimos que seja um número válido
              setValueAs: (v: string) => {
                // Se estiver vazio ou for zero, retornamos undefined para acionar validação de campo obrigatório
                if (v === "" || v === "0") return undefined;
                // Converte para inteiro e verifica se é um número válido
                const num = parseInt(v, 10);
                return isNaN(num) ? undefined : num;
              },
              onChange: (e) => {
                // Remover caracteres não numéricos
                const value = e.target.value.replace(/\D/g, "");

                // Impedir zero como único dígito
                if (value === "0") {
                  e.target.value = "";
                  return;
                }

                // Remove zeros à esquerda
                if (value.length > 1 && value.startsWith("0")) {
                  e.target.value = value.replace(/^0+/, "");
                  return;
                }

                // Atualiza com apenas dígitos
                e.target.value = value;
              },
            })}
            className="border-gray-300 focus:border-primary-300 bg-amber-50 text-gray-700 focus:ring focus:ring-primary-100 focus:ring-opacity-50"
            aria-required="true"
            disabled={isSubmitting}
          />

          {errors.estoque ? (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.estoque.type === "invalid_type"
                ? "O campo estoque é obrigatório e deve ser um número válido"
                : errors.estoque.type === "too_small"
                ? "Estoque deve ser pelo menos 1"
                : errors.estoque.message?.includes("NaN")
                ? "O campo estoque é obrigatório e deve conter apenas números"
                : errors.estoque.message || "Valor de estoque inválido"}
            </span>
          ) : (
            <span className="text-gray-500 text-xs mt-1 block">
              Digite apenas números inteiros maiores que zero
            </span>
          )}
        </div>
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
          {isSubmitting ? "Salvando..." : "Salvar Produto"}
        </Button>
      </div>
    </form>
  );
}
