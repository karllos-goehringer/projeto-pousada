import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DialogRelatorio from "../dialogTabelaCompletaVerificacoes/DialogTabelaCompletaVerificacoes";

type Verificacao = {
  id: number;
  dataVerificacao: string;
  objetosComodo: any[];
  objetosPresentes: any[];
  objetosFaltantes: any[];
  onVerDetalhes: () => void;
};

export default function TabelaVerificacoes({ verificacoes }: { verificacoes: Verificacao[] }) {
  const [verificacaoSelecionada, setVerificacaoSelecionada] = useState<Verificacao | null>(null);

  return (
    <div className="rounded-lg border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Verificação</TableHead>
            <TableHead>Data da Verificação</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {verificacoes.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                Nenhuma verificação encontrada
              </TableCell>
            </TableRow>
          )}

          {verificacoes.map((v) => (
            <TableRow key={v.id}>
              <TableCell className="font-medium">Verificação {v.id}</TableCell>

              <TableCell>
                {new Date(v.dataVerificacao).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  variant="secondary"
                  onClick={() => setVerificacaoSelecionada(v)}
                >
                  Ver detalhes
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog que abre quando um item é selecionado */}
      {verificacaoSelecionada && (
        <DialogRelatorio
          verificacao={verificacaoSelecionada}
          onClose={() => setVerificacaoSelecionada(null)}
        />
      )}
    </div>
  );
}
