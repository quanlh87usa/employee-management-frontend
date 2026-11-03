import { ApiError } from "./ApiError";

const API_URL = "http://localhost:8080";

export async function getEmployees() {
    const response = await fetch(`${API_URL}/employees`);

    if (!response.ok) {
        throw new Error("Failed to fetch employees");
    }

    return await response.json();
}

export async function getEmployeeById(id) {
    const response = await fetch(`${API_URL}/employees/${id}`);
    
    if (response.status === 404) {
        throw new Error("Employee not found");
    }
    
    if (!response.ok) {
        throw new Error("Failed to find employee");
    }

    return await response.json();
}

export async function createEmployee(employee) {
    const response = await fetch(`${API_URL}/employees`,  {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        if (data.errors) {
            throw new ApiError(data.message, data.errors)
        }
        throw new Error(data.message || "Failed to add employee");
    }

    return data;
}

export async function editEmployee(employee) {
    const response = await fetch(`${API_URL}/employees/${employee.id}`,  {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });
    
    if (response.status === 404) {
        throw new Error("Employee not found");
    }

    const data = await response.json();
    
    if (!response.ok) {
        if (data.errors) {
            throw new ApiError(data.message, data.errors)
        }
        throw new Error(data.message || "Failed to edit employee");
    }

    return data;
}

export async function deleteEmployee(employee) {
    const response = await fetch(`${API_URL}/employees/${employee.id}`, {method: "DELETE"});
    
    if (response.status === 404) {
        throw new Error("Employee not found");
    }
    
    if (!response.ok) {
        throw new Error("Failed to delete employee");
    }

    return;
}