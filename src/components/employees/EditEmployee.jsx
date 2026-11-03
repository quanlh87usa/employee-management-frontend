import { useState } from "react";
import { editEmployee } from "../../services/employeeService";
import { ApiError } from "../../services/ApiError";

function EditEmployee({ employee, onCancel, setRefresh }) {
    // general error
    const [error, setError] = useState(null);
    // error for each field
    const [fieldErrors, setFieldErrors] = useState({});

    const [editName, setEditName] = useState(employee.name);
    const [editSalary, setEditSalary] = useState(employee.salary);

    function handleSubmit(event) {
        // Ngăn form tải lại trang
        event.preventDefault();
        setError(null);
        setFieldErrors({});
        // create object to edit
        const employeeData = {
            id: employee.id,
            name: editName,
            salary: Number(editSalary)
        };

        editEmployee(employeeData)
            .then(() => {
                onCancel();
                setRefresh(prev => !prev);
            })
            .catch(error => {
                if (error instanceof TypeError) {
                    setError("Cannot connect to server. Please try again later.");
                    setFieldErrors({});
                } else if (error instanceof ApiError) {
                    setFieldErrors(error.errors);
                    setError(null);
                } else if (error instanceof Error) {
                    setError(error.message);
                    setFieldErrors({});
                } else {
                    setError("An unexpected error occurred.");
                    setFieldErrors({});
                }

            console.error(error);
            });

    }

    return (
        <div>
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit} className="edit-employee-form">
            <label htmlFor="employee-name">Employee Name</label>
            <input
                id="employee-name"
                className="text-input"
                aria-invalid={Boolean(fieldErrors.name)}
                type="text"
                required
                placeholder="Enter employee name"
                value={editName}
                onChange={(event) => {
                    setEditName(event.target.value);
                    setFieldErrors(prev => ({ ...prev, name: undefined }));
                }}
            />
            {fieldErrors.name && (
                <p role="alert">{fieldErrors.name}</p>
            )}
            
            <label htmlFor="employee-salary">Employee Salary</label>
            <input
                id="employee-salary"
                className="text-input"
                aria-invalid={Boolean(fieldErrors.salary)}
                type="number"
                required
                placeholder="Enter employee salary"
                value={editSalary}
                onChange={(event) => {
                    setEditSalary(event.target.value);
                    setFieldErrors(prev => ({ ...prev, salary: undefined }));
                }}
            />
            {fieldErrors.salary && (
                <p role="alert">{fieldErrors.salary}</p>
            )}
            
            <button type="submit" className="btn-primary">Edit Employee</button>
            <button type="button" className="btn-secondary" onClick={onCancel}>
                Cancel
            </button>
        </form>
        {error && <p role="alert">{error}</p>}
        </div>
    );
}

export default EditEmployee;