import * as React from 'react';
import { useParams } from 'react-router-dom'; // <= corregido
import { Crud } from '@toolpad/core/Crud';
import { employeesDataSource, Employee, employeesCache } from '../data/employees';

const CrudEmployees = Crud<Employee>; // <= alias sin genérico en el JSX

export default function EmployeesCrudPage() {
  const { employeeId } = useParams();

  return (
    <CrudEmployees
      dataSource={employeesDataSource}
      dataSourceCache={employeesCache}
      rootPath="/employees"
      initialPageSize={25}
      defaultValues={{ itemCount: 1 }}
      pageTitles={{
        show: `Employee ${employeeId}`,
        create: 'New Employee',
        edit: `Employee ${employeeId} - Edit`,
      }}
    />
  );
}