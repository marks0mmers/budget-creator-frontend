interface HttpResponse<T> extends Response {
    parsedBody?: T;
  }

export const http = async <ResponseType, BodyType = unknown>(url: string, method: "GET" | "POST" | "PUT" | "DELETE" = "GET", body?: BodyType) => {
    const response: HttpResponse<ResponseType> = await fetch(url, {
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
