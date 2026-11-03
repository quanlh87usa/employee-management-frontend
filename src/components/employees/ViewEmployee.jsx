import { useEffect, useState } from "react";
import { getEmployeeById } from "../../services/employeeService";

function ViewEmployee({viewingEmployee, onClose}) {

    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        getEmployeeById(viewingEmployee.id)
            .then((data) => {
                setName(data.name);
                setSalary(data.salary);
            })
            .catch(error => {
                if (error instanceof TypeError) {
                    setError("Cannot connect to server. Please try again later.");
                } else if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unexpected error occurred.");
                }
            console.error(error);
            });
    }, [viewingEmployee.id]);
    

    return (
        <>
            <h2>Employee Detail</h2>
            <form className="view-employee-form">
                <label>Employee Name</label>
                <input
                    className="text-input" 
                    disabled
                    type="text"
                    value={name}
                />
                <label>Employee Salary</label>
                <input
                    className="text-input"
                    disabled
                    type="text"
                    value={salary}
                />
                <button className="btn-secondary" type="button" onClick={onClose}>Close</button>
            </form>
            {error && <p role="alert">{error}</p>}
        </>
    );

}

export default ViewEmployee;