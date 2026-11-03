function EmployeeTable({employees, onView, onEdit, onDelete}) {
    return (
        <div>
            <h2>Employee Table</h2>
            <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {
                  employees.length > 0 ?
                    (employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.salary}</td>
                        <td>
                          <button className="btn-primary" onClick={() => onView(employee)}>Detail</button>
                          <button className="btn-primary" onClick={() => onEdit(employee)}>Edit</button>
                          <button className="btn-danger" onClick={() => onDelete(employee)}>Delete</button>
                        </td>
                      </tr>
                      ))
                    ) : (
                      <tr><td colSpan={4}>Not found any employee.</td></tr>
                    )
                }
              
            </tbody>
          </table>
        </div>
    );
}

export default EmployeeTable;