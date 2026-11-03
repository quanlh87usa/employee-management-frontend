function EmployeeSearch({searchTerm, onSearchChange}) {

    return (
        <div>
            <input
                className="search-input"
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
            />
        </div>
    )

}

export default EmployeeSearch;