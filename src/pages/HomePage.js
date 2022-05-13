import Select from "react-select";
import { department, state } from "../data/data";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from "react";
import { useDispatch } from "react-redux"
import { Modal } from "@augustindev/modal/dist";

export function HomePage() {

    const [stateForm, setStateForm] = useState({})
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date())
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()

        const form = document.querySelector('#employeeCreate')
        
        if (form.firstName.value 
                && form.lastName.value
                && form.street.value
                && form.city.value
                && form.zipCode.value
                && stateForm.stateAddress
                && stateForm.department) {
            const newEmployee = {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                startDate: startDate.toLocaleDateString('fr'),
                dateOfBirth: dateOfBirth.toLocaleDateString('fr'),
                street: form.street.value,
                city: form.city.value,
                state: stateForm.stateAddress,
                zipCode: form.zipCode.value,
                department: stateForm.department
            }

            form.firstName.value = ''
            form.lastName.value = ''
            form.street.value = ''
            form.city.value = ''
            form.zipCode.value = ''
            
            dispatch({
                type: 'ADD_EMPLOYEE',
                payload: newEmployee
            })

            setShowModal(true)
            
        } else {
            console.log("REMPLIR LES CHAMPS !")
        }
        
    }

    return (
        <div className="homePage">
            <div className="homePage-header">
                <h1>HRnet</h1>
                <a href="/employee-list">View Current Employee</a>
            </div>
            <div className="homePage-content">
                <form id="employeeCreate" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type='text' id="firstName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type='text' id="lastName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <DatePicker id="dateOfBirth" selected={dateOfBirth} onChange={(date) => setDateOfBirth(date)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <DatePicker id="startDate" selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <fieldset>
                        <legend>Address</legend>

                        <div className="form-group">
                            <label htmlFor="street">Street</label>
                            <input type='text' id="street" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type='text' id="city" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <Select id="state" options={state} onChange={(e) => setStateForm({ ...stateForm, stateAddress: e.value })} defaultValue={null} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="zipCode">Zip Code</label>
                            <input type='number' id="zipCode" />
                        </div>
                    </fieldset>
                    <div className="form-group">
                        <label htmlFor="department">Department</label>
                        <Select id="department" options={department} onChange={(e) => setStateForm({ ...stateForm, department: e.value })} defaultValue={null} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="form-btn">Save</button>
                    </div>
                </form>
                <Modal content='Employee created' show={showModal} onClose={() => setShowModal(false)} />
            </div>
        </div>
    )

}