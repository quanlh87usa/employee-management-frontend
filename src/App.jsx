import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Gọi API ở đây
    fetch("http://localhost:8080/employees")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError(error)
      });
  }, []);

  return (
    <>
      <div className="app">
        <div className="employee-card">
          <h1>Employee Management</h1>
          <p>Employee List</p>

          <input
            className="search-input"
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Salary</th>
              </tr>
            </thead>

            <tbody>
              {loading === true ? 
              (
                <tr>
                  <td colSpan={3}>Loading employees...</td>
                </tr>
              )
              :
              (error !== null ? 

                (
                  <tr>
                    <td colSpan={3}>Failed to load employees, please try again later.</td>
                  </tr>
                )
                :
                (
                  filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.department}</td>
                        <td>{employee.salary}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No employees found</td>
                    </tr>
                  )
                )  
              )
              }
              
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
