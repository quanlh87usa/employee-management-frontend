import { useState } from "react";
import { deleteEmployee } from "../../services/employeeService";

function DeleteEmployee({ employee, onCancel, setRefresh }) {
 
    const [error, setError] = useState(null);

    function handleSubmit(event) {
        // Ngăn form tải lại trang
        event.preventDefault();
        setError(null);

        deleteEmployee(employee)
            .then(() => {
                onCancel();
                setRefresh(prev => !prev);
            })
            .catch(error => {
                if (error instanceof TypeError) {
                    setError("Cannot connect to server. Please try again later.");
                } else if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unexpected error occurred.");
                }
            });

    }

    return (
        <div>
        <h2>Delete Employee</h2>
        {error && <p role="alert">{error}</p>}
        <h3>Are you sure you want to delete {employee.name}?</h3>
        <form onSubmit={handleSubmit}>
            <button type="submit" className="btn-danger">Confirm Delete</button>
            <button type="button" className="btn-secondary" onClick={onCancel}>
                Cancel
            </button>
        </form>
        </div>
    );
}

export default DeleteEmployee;