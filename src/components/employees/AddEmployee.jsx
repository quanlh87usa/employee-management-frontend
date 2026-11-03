import { useState } from "react";

import { ApiError } from "../../services/ApiError";
import { createEmployee } from "../../services/employeeService";

function AddEmployee({setRefresh}) {

    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    // general error
    const [error, setError] = useState(null);
    // error for each field
    const [fieldErrors, setFieldErrors] = useState({});

    function handleSubmit(event) {
        // Ngăn form tải lại trang
        event.preventDefault();
        setError(null);
        setFieldErrors({});

        const employee = {
            name,
            salary: Number(salary)
        };

        createEmployee(employee)
            .then(() => {
                setName("");
                setSalary("");
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
        <>  
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit} className="add-employee-form">
                <label htmlFor="employee-name">Employee Name</label>
                <input
                    className="text-input"
                    id="employee-name"
                    aria-invalid={Boolean(fieldErrors.name)}
                    type="text"
                    required
                    placeholder="Enter employee name"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        setFieldErrors(prev => ({ ...prev, name: undefined }));
                    }}
                />
                {fieldErrors.name && (
                    <p role="alert">{fieldErrors.name}</p>
                )}
                <label htmlFor="employee-salary">Employee Salary</label>
                <input
                    className="text-input"
                    id="employee-salary"
                    aria-invalid={Boolean(fieldErrors.salary)}
                    type="number"
                    required
                    placeholder="Enter employee salary"
                    value={salary}
                    onChange={(event) => {
                        setSalary(event.target.value);
                        setFieldErrors(prev => ({ ...prev, salary: undefined }));
                    }}
                />
                {fieldErrors.salary && (
                    <p role="alert">{fieldErrors.salary}</p>
                )}
                <button className="btn-primary" type="submit">Add Employee</button>
            </form>
            {error && <p role="alert">{error}</p>}
        </>
    );

}

export default AddEmployee;