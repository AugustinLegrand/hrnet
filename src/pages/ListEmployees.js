import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux"

function ListEmployees(props) {

    const employees = props.employees
    console.log("LISTS EMPLOYEES :", props.employees);

    const FilterComponent = ({ filterText, onFilter, onClear }) => (
        <>
            <input
        		id="search"
        			type="text"
        			placeholder="Filter By Name"
        			aria-label="Search Input"
        			value={filterText}
        			onChange={onFilter}
        		/>
        		<button type="button" onClick={onClear}>
        			X
        		</button>
        	</>
        );

    const columns = [
        {
            name: 'Prénom',
            selector: row => row.firstName
        },
        {
            name: 'Nom',
            selector: row => row.lastName
        },
        {
            name: 'Date of Birth',
            selector: row => row.dateOfBirth
        },
        {
            name: 'Start Date',
            selector: row => row.startDate
        },
        {
            name: 'Street',
            selector: row => row.street
        },
        {
            name: 'Ville',
            selector: row => row.city
        },
        {
            name: 'State',
            selector: row => row.state
        },
        {
            name: 'Zip Code',
            selector: row => row.zipCode
        },
        {
            name: 'Department',
            selector: row => row.department
        }
    ]

    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = employees.filter(
		item => item.firstName && item.firstName.toLowerCase().includes(filterText.toLowerCase()),
	);

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);

    return (
        <div>
            <h1>LIST EMPLOYEES</h1>
            <DataTable title="Contact List"
			columns={columns}
			data={filteredItems}
            
			pagination
			paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			selectableRows
			persistTableHead />
            <a href='/'>HOME</a>
        </div>
    )

}

export default connect(
    (state) => ({
        employees: state.employees
    })
)(ListEmployees)
