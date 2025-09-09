const BASE_URL_CORS = import.meta.env.VITE_API_BASE_URL_CORS;

const getAccessToken = () => {
    const sessionStoragKeys = Object.keys(sessionStorage);
    const oidcKey = sessionStoragKeys.find(key => key.startsWith("oidc.user:https://cognito-idp."));
    const oidcContext = JSON.parse(sessionStorage.getItem(oidcKey) || "{}");
    const accessToken = oidcContext?.id_token;
    return accessToken;
};

export async function calculateCORS({ a, b, operation }) {
    const response = await fetch(`${BASE_URL_CORS}/v1/basic-calc`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
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
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({ a, b, operation }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API error");
    }
    return response.json();
}