"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
	Loader2,
	Lock,
	User as UserIcon,
	Eye,
	EyeOff,
	ChevronRight,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { authService } from "@/services/authServices";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const GlobalStyles = () => (
	<style
		dangerouslySetInnerHTML={{
			__html: `
				@import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Inter:wght@300;400;600&display=swap');

				@font-face {
					font-family: 'SpaceAge';
					src: url('/fonts/space age.ttf') format('truetype');
					font-weight: normal;
					font-style: normal;
					font-display: swap;
				}

				body {
					font-family: 'Inter', sans-serif;
					background-color: #0a0a0c;
					margin: 0;
				}

				.font-space-age {
					font-family: 'SpaceAge', sans-serif !important;
					letter-spacing: 0.1em;
					text-transform: uppercase;
				}

				.font-syncopate {
					font-family: 'Syncopate', sans-serif;
				}

				.tech-grid {
					background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0);
					background-size: 32px 32px;
				}

				.glow-border:focus-within {
					box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
				}
			`,
		}}
	/>
);

const loginSchema = z.object({
	login: z.string().min(3, "Usuario o email requerido"),
	password: z.string().min(6, "Minimo 6 caracteres"),
});

type FormData = z.infer<typeof loginSchema>;

type BackendError = {
	message?: string;
};

export default function LoginForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [showPass, setShowPass] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: FormData) => {
		setIsLoading(true);
		try {
			const response = await authService.login(data);

			if (typeof window !== "undefined") {
				window.localStorage.setItem("auth_token", response.data.access_token);
				window.localStorage.setItem("auth_user", JSON.stringify(response.data.user));
			}

			toast.success(response.message || "Acceso autorizado", {
				description: "Bienvenido al nucleo de Boveda Capital",
			});

			router.push("/dashboard");
		} catch (error) {
			const requestError = error as AxiosError<BackendError>;
			toast.error("Fallo de autenticacion", {
				description: requestError.response?.data?.message || "Error de sistema",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center p-0 md:p-6 lg:p-12">
			<GlobalStyles />
			<Toaster position="top-right" richColors theme="dark" />

			<motion.div
				initial={{ opacity: 0, scale: 0.98 }}
				animate={{ opacity: 1, scale: 1 }}
				className="grid h-full w-full max-w-3xl grid-cols-1 overflow-hidden rounded-none border border-slate-800/50 bg-[#0f1115] shadow-[0_0_100px_rgba(0,0,0,0.6)] md:h-150 md:grid-cols-2 md:rounded-[3rem]"
			>
				<div className="tech-grid relative hidden flex-col justify-between overflow-hidden border-r border-slate-800/50 bg-[#07080a] p-9 md:flex">
					<div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-linear-to-br from-blue-600/10 via-transparent to-indigo-600/5" />

					<div className="relative z-10 flex h-full items-center justify-center">
						<motion.div
							initial={{ opacity: 0, scale: 0.92 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6 }}
							className="relative aspect-4/5 w-full max-w-76 overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/40"
						>
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.35),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(29,78,216,0.25),transparent_50%)]" />
							<motion.div
								animate={{ x: ["-15%", "115%"] }}
								transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
								className="absolute -top-1/4 h-[140%] w-1/3 rotate-12 bg-linear-to-r from-transparent via-blue-300/15 to-transparent"
							/>
							<div className="absolute inset-5 rounded-2xl border border-dashed border-slate-600/70" />
						</motion.div>
					</div>
				</div>

				<div className="flex flex-col justify-center bg-[#0a0c10] p-6 md:p-10">
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						className="mx-auto w-full max-w-76"
					>
						<div className="mb-12 flex flex-col items-center gap-1 md:hidden">
							<h1 className="font-space-age text-center text-lg tracking-widest text-white">
								BOVEDA CAPITAL
							</h1>
						</div>

						<Card className="border border-slate-800/70 bg-slate-900/30 ring-1 ring-blue-500/10">
							<CardHeader className="space-y-2">
								<CardTitle className="font-space-age text-2xl tracking-tighter text-white uppercase">
									Bienvenido
								</CardTitle>
								<CardDescription className="text-sm font-medium text-slate-400">
									Ingresa tus credenciales para acceder.
								</CardDescription>
							</CardHeader>

							<CardContent>
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
									<div className="space-y-2">
										<Label htmlFor="login" className="font-syncopate ml-1 text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase">
											Identificador
										</Label>
										<div className="relative">
											<UserIcon size={18} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
											<Input
												id="login"
												{...register("login")}
												placeholder="Usuario | Email"
												className={cn(
													"h-12 border-slate-700/70 bg-slate-900/40 pl-10 text-white placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-blue-500/30",
													errors.login ? "border-red-500" : ""
												)}
											/>
										</div>
										{errors.login?.message ? (
											<p className="ml-1 text-[10px] font-bold uppercase text-red-500">{errors.login.message}</p>
										) : null}
									</div>

									<div className="space-y-2">
										<div className="flex items-center justify-between px-1">
											<Label htmlFor="password" className="font-syncopate text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase">
												Contraseña
											</Label>
											{/* <a href="#" className="font-syncopate text-[10px] font-bold text-blue-500 uppercase transition-colors hover:text-blue-400">
												Recuperar
											</a> */}
										</div>
										<div className="relative">
											<Lock size={18} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
											<Input
												id="password"
												{...register("password")}
												type={showPass ? "text" : "password"}
												placeholder="•••••••••"
												className={cn(
													"h-12 border-slate-700/70 bg-slate-900/40 pl-10 pr-10 text-white placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-blue-500/30",
													errors.password ? "border-red-500" : ""
												)}
											/>
											<button
												type="button"
												onClick={() => setShowPass(!showPass)}
												className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-slate-500 transition-colors hover:text-white"
												tabIndex={-1}
											>
												{showPass ? <EyeOff size={18} /> : <Eye size={18} />}
											</button>
										</div>
										{errors.password?.message ? (
											<p className="ml-1 text-[10px] font-bold uppercase text-red-500">{errors.password.message}</p>
										) : null}
									</div>

									<div className="flex items-center gap-2">
										<Checkbox id="remember" className="border-slate-600 data-checked:border-blue-500 data-checked:bg-blue-500" />
										<Label htmlFor="remember" className="text-xs text-slate-400">
											Recordarme
										</Label>
									</div>

									<button
										type="submit"
										disabled={isLoading}
										className="group relative flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-blue-600 font-bold text-white shadow-[0_10px_30px_rgba(37,99,235,0.25)] transition-all active:scale-[0.98] hover:bg-blue-500 disabled:opacity-50"
									>
										{isLoading ? (
											<Loader2 className="animate-spin" size={20} />
										) : (
											<>
												<span className="font-syncopate text-[11px] font-bold tracking-[0.3em] uppercase">
													Iniciar Sesion
												</span>
												<ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
											</>
										)}
									</button>
								</form>
							</CardContent>
						</Card>

						<div className="mt-10 border-t border-slate-900/50 pt-6 text-center">
							<p className="font-syncopate text-[9px] font-bold tracking-[0.5em] text-slate-700 uppercase">
								Boveda Capital S.A. &copy; {new Date().getFullYear()}
							</p>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
