"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AxiosError } from "axios";
import { Plus, Search, Pencil, Trash2, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserItem, UserPayload } from "@/types/users";
import { usersService } from "@/services/usersServices";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";

const userFormSchema = z
  .object({
    username: z.string().min(1, "El usuario es obligatorio."),
    name: z.string().min(1, "El nombre es obligatorio."),
    last_name: z.string().min(1, "El apellido es obligatorio."),
    second_last_name: z.string().optional(),
    phone: z.string().min(1, "El telefono es obligatorio."),
    email: z.string().min(1, "El correo es obligatorio.").email("El correo no es valido."),
    address: z.string().min(1, "La direccion es obligatoria."),
    role: z.string().optional(),
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.password && values.password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La contrasena debe tener al menos 8 caracteres.",
        path: ["password"],
      });
    }

    if ((values.password || values.password_confirmation) && values.password !== values.password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La confirmacion de contrasena no coincide.",
        path: ["password_confirmation"],
      });
    }
  });

type UserFormValues = z.infer<typeof userFormSchema>;

const emptyForm: UserFormValues = {
  username: "",
  name: "",
  last_name: "",
  second_last_name: "",
  phone: "",
  email: "",
  address: "",
  role: "",
  password: "",
  password_confirmation: "",
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: emptyForm,
  });

  const isCreateMode = useMemo(() => !editingUser, [editingUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    void loadUsers();
  }, [page, search]);

  useEffect(() => {
    void loadRoles();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);

    try {
      const response = await usersService.getUsers(page, 10, search);
      setUsers(response.data);
      setLastPage(response.meta.last_page);
      setTotal(response.meta.total);
    } catch {
      toast.error("No se pudieron cargar los usuarios.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const roleList = await usersService.getRoles();
      setRoles(roleList);
    } catch {
      toast.warning("No se pudieron cargar los roles.");
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    reset(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserItem) => {
    setEditingUser(user);
    reset({
      username: user.username,
      name: user.name,
      last_name: user.last_name,
      second_last_name: user.second_last_name ?? "",
      phone: user.phone,
      email: user.email,
      address: user.address,
      role: user.roles?.[0]?.name ?? "",
      password: "",
      password_confirmation: "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    reset(emptyForm);
  };

  const onSubmit = async (form: UserFormValues) => {
    if (isCreateMode && !form.password) {
      setError("password", {
        type: "manual",
        message: "La contrasena es obligatoria para crear usuarios.",
      });
      return;
    }

    const payload: UserPayload = {
      username: form.username,
      name: form.name,
      last_name: form.last_name,
      second_last_name: form.second_last_name || "",
      phone: form.phone,
      email: form.email,
      address: form.address,
      role: form.role || "",
    };

    if (form.password) {
      payload.password = form.password;
      payload.password_confirmation = form.password_confirmation;
    }

    setIsSaving(true);
    try {
      if (editingUser) {
        await usersService.updateUser(editingUser.id, payload);
        toast.success("Usuario actualizado correctamente.");
      } else {
        await usersService.createUser(payload);
        toast.success("Usuario creado correctamente.");
      }

      closeModal();
      await loadUsers();
    } catch (error) {
      const backendError = error as AxiosError<{ message?: string; errors?: Record<string, string[]> }>;
      const fieldErrors = backendError.response?.data?.errors;

      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          const formField = field as keyof UserFormValues;
          setError(formField, {
            type: "server",
            message: messages?.[0] || "Dato invalido.",
          });
        });
        toast.error("Revisa los campos marcados en el formulario.");
      } else {
        toast.error(backendError.response?.data?.message || "No se pudo guardar el usuario.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (user: UserItem) => {
    if (!window.confirm(`Deseas eliminar al usuario ${user.username}?`)) {
      return;
    }

    setIsDeleting(user.id);
    try {
      await usersService.deleteUser(user.id);
      toast.success("Usuario eliminado correctamente.");

      if (users.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await loadUsers();
      }
    } catch {
      toast.error("No se pudo eliminar el usuario.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden bg-[#05070d] p-5 text-slate-100 md:p-8">

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(37,99,235,0.18),transparent_38%),radial-gradient(circle_at_90%_4%,rgba(99,102,241,0.15),transparent_42%),linear-gradient(180deg,#04060b_0%,#05070d_60%,#070a12_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-size-[42px_42px] opacity-30" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-mono text-2xl font-semibold tracking-[0.08em] text-slate-100 uppercase md:text-[32px]">
              Gestión de Personal
            </h1>
            <p className="mt-1 font-mono text-[10px] tracking-[0.22em] text-slate-500 uppercase">
              Módulo de usuarios || Administración
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
            <label className="flex min-h-11 flex-1 items-center gap-2 border border-slate-800 bg-black/70 px-3 md:w-[320px] md:flex-none">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="BUSCAR USUARIO..."
                className="w-full bg-transparent font-mono text-xs tracking-[0.14em] text-slate-300 uppercase placeholder:text-slate-600 focus:outline-none"
              />
            </label>

            <Button
              type="button"
              onClick={openCreateModal}
              className="inline-flex min-h-11 rounded-none border border-blue-400/45 bg-blue-700 px-4 font-mono text-[11px] font-semibold tracking-[0.12em] text-white uppercase shadow-[0_0_18px_rgba(37,99,235,0.35)] transition-colors hover:bg-blue-600"
            >
              <Plus className="h-3.5 w-3.5" />
              Nuevo
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden border border-slate-800 bg-[#0b0e14]/85 py-0 ring-0 backdrop-blur-sm">
          <CardContent className="px-0 py-0">
            <Table className="text-slate-200">
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="px-4 py-4 font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">Usuario</TableHead>
                  <TableHead className="px-4 py-4 font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">Nombre completo</TableHead>
                  <TableHead className="px-4 py-4 font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">Email</TableHead>
                  <TableHead className="px-4 py-4 font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">Rol</TableHead>
                  <TableHead className="px-4 py-4 text-right font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">Acciones</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow className="border-slate-900">
                    <TableCell colSpan={5} className="py-8 text-center text-slate-400">
                      <div className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Cargando usuarios...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow className="border-slate-900">
                    <TableCell colSpan={5} className="py-8 text-center text-slate-400">
                      No se encontraron usuarios.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id} className="border-slate-900 hover:bg-white/2">
                      <TableCell className="px-4 py-3 font-mono text-xs tracking-[0.08em] text-blue-400 uppercase">{user.username}</TableCell>
                      <TableCell className="px-4 py-3 text-sm text-slate-100">
                        {`${user.name} ${user.last_name}${user.second_last_name ? ` ${user.second_last_name}` : ""}`}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-slate-300">{user.email}</TableCell>
                      <TableCell className="px-4 py-3">
                        <Badge variant="outline" className="rounded-sm border-slate-700 bg-slate-900 px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase text-slate-300">
                          {user.roles?.[0]?.name || "Sin rol"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openEditModal(user)}
                            className="rounded-none border border-slate-800 text-slate-400 hover:border-amber-400/40 hover:bg-amber-500/10 hover:text-amber-300"
                            aria-label={`Editar ${user.username}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDelete(user)}
                            disabled={isDeleting === user.id}
                            className="rounded-none border border-slate-800 text-slate-400 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300"
                            aria-label={`Eliminar ${user.username}`}
                          >
                            {isDeleting === user.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3">
              <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                Total registros: {total}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className="rounded-none border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                >
                  Anterior
                </Button>
                <span className="font-mono text-xs text-slate-500">{page} / {lastPage}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={page >= lastPage}
                  onClick={() => setPage((prev) => Math.min(lastPage, prev + 1))}
                  className="rounded-none border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <Card className="w-full max-w-2xl border border-slate-700 bg-[#0c1018] py-0">
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
                <div>
                  <h2 className="font-mono text-lg font-semibold tracking-[0.06em] text-slate-100 uppercase">
                    {isCreateMode ? "Crear Usuario" : "Editar Usuario"}
                  </h2>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={closeModal}
                  className="rounded-none border border-slate-800 text-slate-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuario<span className="text-red-500">*</span></Label>
                  <Input id="username" {...register("username")} className={cn("border-slate-700 bg-slate-900/40 text-slate-100", errors.username && "border-red-500 focus-visible:border-red-500")}/>
                  {errors.username ? <p className="text-xs text-red-400">{errors.username.message}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre (s)<span className="text-red-500">*</span></Label>
                  <Input id="name" {...register("name")} className={cn("border-slate-700 bg-slate-900/40 text-slate-100", errors.name && "border-red-500 focus-visible:border-red-500")}/>
                  {errors.name ? <p className="text-xs text-red-400">{errors.name.message}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Apellido paterno<span className="text-red-500">*</span></Label>
                  <Input id="last_name" {...register("last_name")} className={cn("border-slate-700 bg-slate-900/40 text-slate-100", errors.last_name && "border-red-500 focus-visible:border-red-500")}/>
                  {errors.last_name ? <p className="text-xs text-red-400">{errors.last_name.message}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="second_last_name">Apellido materno</Label>
                  <Input id="second_last_name" {...register("second_last_name")} className={cn("border-slate-700 bg-slate-900/40 text-slate-100", errors.second_last_name && "border-red-500 focus-visible:border-red-500")}/>
                  {errors.second_last_name ? <p className="text-xs text-red-400">{errors.second_last_name.message}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono<span className="text-red-500">*</span></Label>
                  <Input id="phone" {...register("phone")} className={cn("border-slate-700 bg-slate-900/40 text-slate-100", errors.phone && "border-red-500 focus-visible:border-red-500")}/>
                  {errors.phone ? <p className="text-xs text-red-400">{errors.phone.message}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico<span className="text-red-500">*</span></Label>
                  <Input id="email" type="email" {...register("email")} className={cn("border-slate-700 bg-slate-900/40 text-slate-100", errors.email && "border-red-500 focus-visible:border-red-500")}/>
                  {errors.email ? <p className="text-xs text-red-400">{errors.email.message}</p> : null}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Dirección<span className="text-red-500">*</span></Label>
                  <Input id="address" {...register("address")} className={cn("border-slate-700 bg-slate-900/40 text-slate-100", errors.address && "border-red-500 focus-visible:border-red-500")}/>
                  {errors.address ? <p className="text-xs text-red-400">{errors.address.message}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label>Rol</Label>
                  <Combobox
                    options={roles.map((r) => ({ value: r, label: r }))}
                    value={watch("role") ?? ""}
                    onChange={(val) => setValue("role", val, { shouldValidate: true })}
                    placeholder="Sin rol"
                    searchPlaceholder="Buscar rol..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña {isCreateMode ? "" : "(opcional)"}</Label>
                  <Input id="password" type="password" {...register("password")} className={cn("border-slate-700 bg-slate-900/40 text-slate-100", errors.password && "border-red-500 focus-visible:border-red-500")}/>
                  {errors.password ? <p className="text-xs text-red-400">{errors.password.message}</p> : null}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="password_confirmation">Confirmar contraseña {isCreateMode ? "": "(si actualizas)"}</Label>
                  <Input id="password_confirmation" type="password" {...register("password_confirmation")} className={cn("border-slate-700 bg-slate-900/40 text-slate-100", errors.password_confirmation && "border-red-500 focus-visible:border-red-500")}/>
                  {errors.password_confirmation ? <p className="text-xs text-red-400">{errors.password_confirmation.message}</p> : null}
                </div>

                <div className="mt-2 flex items-center justify-end gap-2 md:col-span-2">
                  <Button type="button" variant="ghost" onClick={closeModal} className="rounded-none border border-slate-700 text-slate-300">Cancelar</Button>
                  <Button type="submit" disabled={isSaving} className="rounded-none border border-blue-400/50 bg-blue-700 text-white hover:bg-blue-600">
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : isCreateMode ? "Crear" : "Actualizar"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </section>
  );
}