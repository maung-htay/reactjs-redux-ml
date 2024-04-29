export function createColumns(columns) {
  return columns.map((column) => ({
    accessorKey: column,
    header: column.length > 0 ? column.toUpperCase() : column,
  }));
}
