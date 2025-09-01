const BASE_URL_CORS = import.meta.env.VITE_API_BASE_URL_CORS;

export async function calculateCORS({ a, b, operation }) {
    const response = await fetch(`${BASE_URL_CORS}/v1/basic-calc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a, b, operation }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API error");
    }
    return response.json();
}

export async function calculateNOCORS({ a, b, operation }) {
    const response = await fetch(`/api/v1/basic-calc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a, b, operation }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API error");
    }
    return response.json();
}