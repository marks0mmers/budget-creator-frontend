import { useCallback, useEffect, useState } from "react";

interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

export const http = async <ResType, BodyType = unknown>(url: string, method: HttpMethod = "GET", body?: BodyType) => {
    const response: HttpResponse<ResType> = await fetch(url, {
        method,
        headers: localStorage.getItem("jwtToken")
            ? new Headers([
                ["Content-Type", "application/json"],
                ["Authorization", `Bearer ${localStorage.getItem("jwtToken")}`],
            ])
            : new Headers([
                ["Content-Type", "application/json"],
            ]),
        body: JSON.stringify(body),
    });

    try {
        response.parsedBody = await response.json();
    } catch (ex) {
        throw new Error("Failed to parse JSON");
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response;
};

export const useHttp = <ResType, BodyType = unknown>(url: string, method: HttpMethod) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | undefined>(undefined);

    const handler = useCallback(async (body?: BodyType) => {
        try {
            setLoading(true);
            const data = await http<ResType>(url, method, body);
            return data.parsedBody;
        } catch(error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [url, method]);
    return [handler, loading, error] as const;
};

export const useFetch = <ResType>(url: string, deps: unknown[], shouldRun?: () => boolean) => {
    const [response, setResponse] = useState<ResType | undefined>(undefined);
    const [request, isLoading, error] = useHttp<ResType>(url, "GET");
    useEffect(() => {
        if (!shouldRun || shouldRun?.()) {
            request()
                .then(response => setResponse(response));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps]);
    return [response, isLoading, error] as const;
};
