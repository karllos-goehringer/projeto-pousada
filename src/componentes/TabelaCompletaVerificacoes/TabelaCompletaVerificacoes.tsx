import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Objeto {
  PK_objID: number;
  objNome: string;
  objMarca: string;
  objUnidades?: number;
  objLink?: string | null;
  objImagem?: string;
}

export interface Verificacao {
  id: number;
  dataVerificacao: string;
  objetosComodo: Objeto[];
  objetosPresentes: Objeto[];
  objetosFaltantes: Objeto[];
}

interface Props {
  verificacao: Verificacao;
}

export default function TabelaCompletaVerificacoes({ verificacao }: Props) {
  const dataFormatada = new Date(verificacao.dataVerificacao).toLocaleString();

  const renderTabela = (objetos: Objeto[]) => (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Marca</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {objetos.map((obj) => (
          <TableRow key={obj.PK_objID}>
            <TableCell>{obj.PK_objID}</TableCell>
            <TableCell>{obj.objNome}</TableCell>
            <TableCell>{obj.objMarca}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card className="w-full space-y-4">
      <CardHeader>
        <CardTitle>Verificação ID: {verificacao.id}</CardTitle>
        <p className="text-sm text-gray-500">Data: {dataFormatada}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Objetos Presentes</h3>
          {verificacao.objetosPresentes.length > 0 ? (
            renderTabela(verificacao.objetosPresentes)
          ) : (
            <p>Nenhum objeto presente.</p>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Objetos Faltantes</h3>
          {verificacao.objetosFaltantes.length > 0 ? (
            renderTabela(verificacao.objetosFaltantes)
          ) : (
            <p>Nenhum objeto faltante.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
