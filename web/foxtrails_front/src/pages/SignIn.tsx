import React, { useState } from "react";
import { Button } from "../components/button";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Sign in:", { email, password });
    };

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#89995D" }}>

            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 800">
                <path
                    d="M0,520 C150,470 260,560 420,520 C580,480 660,560 820,530 C980,500 1060,560 1200,530"
                    fill="none"
                    stroke="#627430"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.55"
                />
                <path
                    d="M0,610 C180,570 280,660 460,620 C640,580 740,670 940,620 C1080,590 1140,640 1200,620"
                    fill="none"
                    stroke="#6f8040"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.35"
                />
            </svg>

            <div className="max-w-xl min-h-screen grid place-items-center mx-auto px-6 py-16 relative z-10">
                <div className="w-full rounded-3xl p-8 opacity-60" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                    <div className="w-full">
                        <h1 className="text-4xl font-bold text-center mb-4" style={{ color: "#2D2D2D" }}>Вход</h1>
                        <p className="text-center mb-8" style={{ color: "#4A4A4A" }}>Введите свои учетные данные</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-left mb-2 font-medium" style={{ color: "#2D2D2D" }}>Почта</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                                    style={{ backgroundColor: "rgba(39, 46, 19, 0.6)", color: "#FFFFFF", border: "2px solid rgba(39, 46, 19, 0.6)" }}
                                />
                            </div>

                            <div>
                                <label className="block text-left mb-2 font-medium" style={{ color: "#2D2D2D" }}>Пароль</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                                    style={{ backgroundColor: "rgba(39, 46, 19, 0.6)", color: "#FFFFFF", border: "2px solid rgba(39, 46, 19, 0.6)" }}
                                />
                            </div>

                            <div className="text-right">
                                <a href="#" className="text-sm" style={{ color: "#2D2D2D" }}>Забыли пароль?</a>
                            </div>

                            <div className="w-full rounded-xl p-4" style={{ backgroundColor: "rgba(39, 46, 19, 0.2)" }}>
                                <Button type="submit" className="w-full">Вход</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;