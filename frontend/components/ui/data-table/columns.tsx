import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

interface ColumnConfig {
  accessorKey: string;
  header: string;
  type?: "text" | "currency" | "status" | "date" | "id";
}

const getStatusClassName = (status: string) => {
  const normalized = status.toLowerCase().trim();

  if (["active", "activo", "approved", "ok"].includes(normalized)) {
    return "border-emerald-400/35 bg-emerald-500/10 text-emerald-300";
  }

  if (["pending", "pendiente", "inactivo", "inactive"].includes(normalized)) {
    return "border-amber-400/35 bg-amber-500/10 text-amber-300";
  }

  if (["defaulted", "moroso", "rechazado", "blocked"].includes(normalized)) {
    return "border-rose-500/35 bg-rose-500/10 text-rose-300";
  }

  return "border-slate-500/40 bg-slate-500/10 text-slate-300";
};

const normalizeStatusLabel = (status: string) => status.toUpperCase();

export function createDynamicColumns<T>(config: ColumnConfig[]): ColumnDef<T>[] {
  return config.map((col) => ({
    accessorKey: col.accessorKey,
    header: () => (
      <span className="text-[10px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
        {col.header}
      </span>
    ),
    cell: ({ row }) => {
      const value = row.getValue(col.accessorKey);

      switch (col.type) {
        case "currency":
          return (
            <span className="font-mono text-[13px] font-medium tracking-[0.05em] text-slate-100">
              ${Number(value).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
          );
        case "id":
          return (
            <span className="font-mono text-[12px] tracking-[0.08em] text-blue-400 uppercase">
              {String(value)}
            </span>
          );
        case "status":
          return (
            <Badge
              variant="outline"
              className={`rounded-sm px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.16em] uppercase ${getStatusClassName(String(value))}`}
            >
              {normalizeStatusLabel(String(value))}
            </Badge>
          );
        case "date":
          return (
            <span className="font-mono text-xs text-slate-400">
              {String(value)}
            </span>
          );
        default:
          return (
            <span className="text-sm font-medium tracking-[0.01em] text-slate-200">
              {String(value)}
            </span>
          );
      }
    },
  }));
}