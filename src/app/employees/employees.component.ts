import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employees.service';
import { Employee } from '../models/employee';
import { ModalDataUserComponent } from '../modal/modal-data-user/modal-data-user.component';
import { ModalDeleteUserComponent } from '../modal/modal-delete-user/modal-delete-user.component';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-employees',
    standalone: true,
    imports: [ModalDataUserComponent, ModalDeleteUserComponent],
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {

    employees: Employee[] = [];

    employeesToShow = {
        employees: [] as Employee[],
        start: 0,
        end: 10
    }

    constructor(private employeeService: EmployeeService) { }

    ngOnInit(): void {
        this.getData();
    }

    async getData() {
        try {
            const employees = await firstValueFrom(this.employeeService.findAllEmployees());
            this.employees = employees;
            if (this.employees.length <= 10) {
                this.employeesToShow.employees = employees;
            } else {
                this.employeesToShow.employees = [];
                let inicio = this.employeesToShow.start;
                let fin = this.employeesToShow.end;
                this.employeesToShow.employees = this.employees.slice(inicio, fin);
            }
        } catch (error) {
            console.error('Error fetching employes', error);
        }
    }
    // empleado enviar para cuando se vaya a actualizarEmpleado
    employeeData?: Employee;
    identificationNumberUpdate?: string;
    activeModalDataUser = false;
    title: string = "";
    isCreate: boolean = false;

    // actions btn
    protected btnCreateEmployeeClick() {
        this.employeeData = null as any;
        this.isCreate = true;
        this.activeModalDataUser = true;
        this.title = "Nuevo Usuario";
    }

    protected btnUpdateEmployeeClick = (employee: Employee, identificationNumberUpdate: string) => {
        this.isCreate = false;
        this.activeModalDataUser = true;
        this.title = "Actualizar Usuario";

        this.employeeData = {
            identificationNumber: employee.identificationNumber,
            names: employee.names,
            firstSurname: employee.firstSurname,
            secondSurname: employee.secondSurname,
            country: employee.country,
            identification: employee.identification,
            department: employee.department
        } as Employee;
        this.identificationNumberUpdate = identificationNumberUpdate;
    }

    protected btnNextClick = () => {
        var start = this.employeesToShow.start;
        var end = this.employeesToShow.end;
        if (end + 10 > this.employees.length) {
            end = this.employees.length;
        } else {
            end = end + 10;
        }
        start = end - 10;
        this.employeesToShow.start = start;
        this.employeesToShow.end = end;
        this.employeesToShow.employees = this.employees.slice(start, end);
    }

    protected btnPreviousClick = () => {
        var start = this.employeesToShow.start;
        var end = this.employeesToShow.end;
        if (start - 10 < 0) {
            start = 0;
        } else {
            start = start - 10;
        }
        end = start + 10;
        this.employeesToShow.start = start;
        this.employeesToShow.end = end;
        this.employeesToShow.employees = this.employees.slice(start, end);
    }

    protected btnRegisterEntryClick = async (identificationNumber: string) => {
        try {
            const result = await firstValueFrom(this.employeeService.registerEntry(identificationNumber));
            alert(result.message);
        } catch (error:any) {
            alert(error.error);
        }
    }

    protected btnRegisterExitClick = async (identificationNumber: string) => {
        try {
            const result = await firstValueFrom(this.employeeService.registerExit(identificationNumber));
            alert(result.message);
        } catch (error:any) {
            alert(error.error);
        }
    }

    activeModalDeleteUser = false;
    protected btnDeleteEmployeeClick = (identificationNumber: string) => {
        this.activeModalDeleteUser = true;
        this.employeeData = {
            identificationNumber: identificationNumber
        } as Employee;
    }
    // close Modals
    public closeCreateUpdateModal() {
        this.activeModalDataUser = false;
        this.updateEmployeesList();
    }

    public closeDeleteModal() {
        this.activeModalDeleteUser = false;
        this.updateEmployeesList();
    }

    private async updateEmployeesList() {
        try {
            const employees = await firstValueFrom(this.employeeService.findAllEmployees());
            this.employees = employees;
            if (this.employees.length <= 10) {
                this.employeesToShow.employees = employees;
            } else {
                this.employeesToShow.employees = [];
                let inicio = this.employeesToShow.start;
                let fin = this.employeesToShow.end;
                this.employeesToShow.employees = this.employees.slice(inicio, fin);
            }
        } catch (error) {
            console.error('Error fetching students', error);
        }
    }
}
