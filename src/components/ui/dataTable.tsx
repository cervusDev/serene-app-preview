import type { ReactNode } from "react";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  onRowClick,
}: DataTableProps<T>) {
  const getValue = (item: T, key: string): ReactNode => {
    const keys = key.split(".");
    let value: unknown = item;
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return value as ReactNode;
  };

  return (
    <div className="bg-card rounded-xl border border-border/50">
      <div className="relative w-full overflow-x-auto">
        <table className="data-table min-w-max">
          <thead className="bg-muted/30">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="whitespace-nowrap">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-muted-foreground whitespace-nowrap"
                >
                  Nenhum registro encontrado
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  className={onRowClick ? "cursor-pointer" : ""}
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="whitespace-nowrap"
                    >
                      {column.render
                        ? column.render(item)
                        : getValue(item, String(column.key))}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

