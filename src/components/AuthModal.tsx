
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { X, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const AuthModal: React.FC = () => {
    const { isAuthOpen, toggleAuth } = useStore();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState(''); // For registration only

    if (!isAuthOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                // Successful login handled by auth state listener or reload
                toggleAuth();
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        },
                    },
                });
                if (error) throw error;
                alert('Registro exitoso! Por favor revisa tu correo para confirmar.');
                setIsLogin(true);
            }
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setError(null);
        setEmail('');
        setPassword('');
        toggleAuth();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleClose} />

            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-black text-white mb-1">
                            {isLogin ? 'Bienvenido de nuevo' : 'Únete a TechNova'}
                        </h2>
                        <p className="text-slate-300 text-sm">
                            {isLogin ? 'Accede a tu historial y ofertas exclusivas.' : 'Crea tu cuenta y empieza a comprar.'}
                        </p>
                    </div>
                    <button onClick={handleClose} className="text-white/70 hover:text-white transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-100">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    {!isLogin && (
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">Nombre Completo</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#A3CD39] outline-none transition-all"
                                    placeholder="Ej. Juan Pérez"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Correo Electrónico</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#A3CD39] outline-none transition-all"
                                placeholder="tucorreo@ejemplo.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#A3CD39] outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#A3CD39] hover:bg-[#92b832] text-slate-900 font-black py-4 rounded-xl shadow-lg shadow-lime-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
                        {!loading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                    </button>

                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={() => { setError(null); setIsLogin(!isLogin); }}
                            className="text-sm font-medium text-slate-500 hover:text-[#A3CD39] transition-colors underline"
                        >
                            {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;
