const API_URL = "/api";

type GenerateRouteData = {
    city: string;
    accommodation: string[];
    company: {
        adults: number;
        children: number;
    };
    preferences: string[];
    dates: {
        day: string;
        month: string;
        year: string;
    };
};

// универсальный helper
async function request(url: string, options: RequestInit) {
    const res = await fetch(`${API_URL}${url}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    return res.json();
}

// 🔐 auth
export const api = {
    register: (email: string, password: string) =>
        request("/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        }),

    login: (email: string, password: string) =>
        request("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        }),

    generateRoute: (data: GenerateRouteData) =>
        request("/routes/generate", {
            method: "POST",
            body: JSON.stringify(data),
        }),
};