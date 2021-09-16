import { useState } from 'react';
import { useEffect } from 'react';
import { doFetch } from '../../Helpers/Fetching';
import Style from './EmployeesList.module.scss';
import { EmployeesItem } from '../../Components/EmployeesItem/EmployeesItem';

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);

    const getEmployees = async () => {
        const url = `https://api.mediehuset.net/homelands/staff`;
        const response = await doFetch(url);
        setEmployees(response);
    }

    useEffect(() => {
        getEmployees();
    }, [])

    return (
        <ul className={Style.employeesList}>
            {employees.length ? employees.map((employee, index) => {
                return (
                    <li key={index}>
                        <EmployeesItem data={employee} />
                    </li>
                )
            }): null}
        </ul>
    )
}

export { EmployeesList };