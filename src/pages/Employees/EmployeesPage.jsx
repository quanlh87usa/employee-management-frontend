import { useState, useEffect } from "react";

import AddEmployee from "../../components/employees/AddEmployee";
import EditEmployee from "../../components/employees/EditEmployee";
import DeleteEmployee from "../../components/employees/DeleteEmployee";
import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeSearch from "../../components/employees/EmployeeSearch";

import { getEmployees } from "../../services/employeeService";
import ViewEmployee from "../../components/employees/ViewEmployee";

function EmployeesPage() {

    const [searchTerm, setSearchTerm] = useState("");
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const [viewingEmployee, setViewingEmployee] = useState(null);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [deletingEmployee, setDeletingEmployee] = useState(null);
    

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    useEffect(() => {
        setLoading(true);
        setError(null);

        getEmployees()
            .then((data) => {
                setEmployees(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [refresh]);
    
    return (
    <div className="app">
        <div className="employee-card">
            <h1>Employee Management</h1>
            <p>Employee List</p>

            <EmployeeSearch 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm}
            />
            {loading ? (
                <p>Loading employees...</p>
                ) : error ? (
                  <p role="alert">Failed to load employees, please try again later.</p>
                ) : (
                    <EmployeeTable 
                        employees={filteredEmployees} 
                        onView={setViewingEmployee}
                        onEdit={setEditingEmployee}
                        onDelete={setDeletingEmployee} 
                    />
                )
            }
            {viewingEmployee !== null && (
                <ViewEmployee
                    viewingEmployee={viewingEmployee}
                    onClose={() => setViewingEmployee(null)}
                />
            )}
            {editingEmployee !== null && (
                <EditEmployee
                    employee={editingEmployee}
                    onCancel={() => setEditingEmployee(null)}
                    setRefresh={setRefresh}
                />
            )}
            {deletingEmployee !== null && (
                <DeleteEmployee
                    employee={deletingEmployee}
                    onCancel={() => setDeletingEmployee(null)}
                    setRefresh={setRefresh}
                />
            )}
            <AddEmployee setRefresh={setRefresh}  />
        </div>
    </div>
    );
}

export default EmployeesPage;