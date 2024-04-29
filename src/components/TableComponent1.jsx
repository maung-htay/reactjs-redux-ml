import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";

function TableComponent1() {
  const datas = useSelector((state) => state.fileColumns.datas);
  const columns = useSelector((state) => state.fileColumns.columns);

  return (
    <Table>
      <TableCaption>File data </TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {datas.map((data, index) => (
          <TableRow key={index}>
            {Object.entries(data).map(([key, value], index) => (
              <TableCell key={index} className="font-medium">
                {value}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableComponent1;
