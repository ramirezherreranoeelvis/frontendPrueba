import { Component, Input, Output, EventEmitter, Type, OnInit } from '@angular/core';
import { EmployeeService } from '../../employees/employees.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';
import { firstValueFrom } from 'rxjs';

@Component({
        selector: 'app-modal-data-user',
        standalone: true,
        imports: [ReactiveFormsModule],
        templateUrl: './modal-data-user.component.html',
        styleUrl: './modal-data-user.component.scss'
})

export class ModalDataUserComponent implements OnInit {
        @Input() title!: string;
        @Input() create!: boolean;
        @Output() finalizarEsto = new EventEmitter<void>();
        @Input() employee?: Employee;
        @Input() identificationNumberUpdate?: string;

        profileForm = new FormGroup({
                identificationNumber: new FormControl(''),
                names: new FormControl(''),
                firstSurname: new FormControl(''),
                secondSurname: new FormControl(''),
                country: new FormControl(''),
                identification: new FormControl(''),
                domain: new FormControl(''),
                department: new FormControl('')
        })

        constructor(private empleadoService: EmployeeService) { }

        ngOnInit(): void {
                this.profileForm.get('identificationNumber')?.setValidators(Validators.required);
                this.profileForm.get('names')?.setValidators(Validators.required);
                this.profileForm.get('firstSurname')?.setValidators(Validators.required);
                this.profileForm.get('secondSurname')?.setValidators(Validators.required);
                this.profileForm.get('country')?.setValidators(Validators.required);
                this.profileForm.get('identification')?.setValidators(Validators.required);
                this.profileForm.get('domain')?.setValidators(Validators.required);
                this.profileForm.get('department')?.setValidators(Validators.required);

                if (this.employee) {
                        this.profileForm.get('identificationNumber')?.setValue(this.employee.identificationNumber);
                        this.profileForm.get('names')?.setValue(this.employee.names);
                        this.profileForm.get('firstSurname')?.setValue(this.employee.firstSurname);
                        this.profileForm.get('secondSurname')?.setValue(this.employee.secondSurname);
                        this.profileForm.get('country')?.setValue(this.employee.country);
                        this.profileForm.get('identification')?.setValue(this.employee.identification);
                        this.profileForm.get('department')?.setValue(this.employee.department);

                        this.profileForm.get('domain')?.setValue(this.employee.domain === 'global.com.us' ? 'USA' : 'COLOMBIA');
                        let department = {
                                'Administración': 'ADMINISTRACION',
                                'Financiera': 'FINANCIERA',
                                'Compras': 'COMPRAS',
                                'Infraestructura': 'INFRAESTRUCTURA',
                                'Operación': 'OPERACION',
                                'Talento Humano': 'TALENTO_HUMANO',
                                'Servicio Varios': 'SERVICIO_VARIOS'

                        }[this.employee.department];
                        this.profileForm.get('department')?.setValue(department ?? '');
                }
        }


        async enviarDatos() {
                if (this.profileForm.invalid) {
                        return;
                }
                var employee = {
                        identificationNumber: this.profileForm.value.identificationNumber ?? '',
                        names: this.profileForm.value.names ?? '',
                        firstSurname: this.profileForm.value.firstSurname ?? '',
                        secondSurname: this.profileForm.value.secondSurname ?? '',
                        country: this.profileForm.value.country ?? '',
                        identification: this.profileForm.value.identification ?? '',
                        domain: this.profileForm.value.domain ?? '',
                        department: this.profileForm.value.department ?? ''
                } as Employee;

                try {
                        const result = this.create ?
                                await firstValueFrom(this.empleadoService.createEmployee(employee)) :
                                await firstValueFrom(this.empleadoService.updateDataEmployed(employee, this.identificationNumberUpdate ?? ''));
                        alert(result.message)
                        this.finalizarEsto.emit();
                }
                catch (error) {
                        console.log(error);
                        alert(error)
                }

        }

        salir() {
                this.finalizarEsto.emit();
        }
}
