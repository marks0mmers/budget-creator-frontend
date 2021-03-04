export const constructAjaxHeaders = () => {
    return localStorage.getItem("jwtToken")
        ? ({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
        })
        : ({
            "Content-Type": "application/json",
        });
};
