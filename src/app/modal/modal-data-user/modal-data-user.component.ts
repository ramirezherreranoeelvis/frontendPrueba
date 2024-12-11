import { Component, Input, Output, EventEmitter, Type, OnInit } from '@angular/core';
import { EmpleadosService } from '../../empleados/empleados.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empleado } from '../../model/empleado';
import e from 'express';

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
        @Output() active = new EventEmitter<boolean>();
        @Input() nombres!: string;
        @Input() apellidoPrimero!: string;
        @Input() apellidoSegundo!: string;
        @Input() numeroIdentificacion!: string;
        @Input() pais!: string;
        @Input() identificacion!: string;
        @Input() area!: string;
        @Output() finalizado = new EventEmitter<void>();
        @Output() result = new EventEmitter<Empleado>();

        profileForm = new FormGroup({
                nombres: new FormControl(''),
                numeroIdentificacion: new FormControl(''),
                primerApellido: new FormControl(''),
                segundoApellido: new FormControl(''),
                pais: new FormControl(''),
                identificacion: new FormControl(''),
                dominio: new FormControl(''),
                area: new FormControl('')
        })

        constructor(private empleadoService: EmpleadosService) { }

        ngOnInit(): void {
                this.profileForm.get('nombres')?.setValidators(Validators.required);
                this.profileForm.get('primerApellido')?.setValidators(Validators.required);
                this.profileForm.get('segundoApellido')?.setValidators(Validators.required);
                this.profileForm.get('pais')?.setValidators(Validators.required);
                this.profileForm.get('identificacion')?.setValidators(Validators.required);
                this.profileForm.get('dominio')?.setValidators(Validators.required);
                this.profileForm.get('numeroIdentificacion')?.setValidators(Validators.required);
                this.profileForm.get('area')?.setValidators(Validators.required);
                if (!this.create) {
                        this.profileForm.get('nombres')?.setValue(this.nombres);
                        this.profileForm.get('primerApellido')?.setValue(this.apellidoPrimero);
                        this.profileForm.get('segundoApellido')?.setValue(this.apellidoSegundo);
                        this.profileForm.get('numeroIdentificacion')?.setValue(this.numeroIdentificacion);
                        this.profileForm.get('pais')?.setValue(this.pais);
                        this.profileForm.get('identificacion')?.setValue(this.identificacion);
                        this.profileForm.get('area')?.setValue(this.area);
                }
        }


        enviarDatos() {
                if (this.profileForm.invalid) {
                        return
                }

                if (this.create) {
                        var empleado = {
                                nombres: this.profileForm.value.nombres ?? '',
                                numeroIdentificacion: this.profileForm.value.numeroIdentificacion ?? '',
                                primerApellido: this.profileForm.value.primerApellido ?? '',
                                segundoApellido: this.profileForm.value.segundoApellido ?? '',
                                pais: this.profileForm.value.pais ?? '',
                                identificacion: this.profileForm.value.identificacion ?? '',
                                dominio: this.profileForm.value.dominio ?? '',
                                area: this.profileForm.value.area ?? ''
                        } as Empleado;

                        this.empleadoService.registrarEmpleado(empleado).subscribe({
                                next: (response: Empleado) => {
                                        alert('Empleado registrado correctamente')
                                        this.result.emit(response)
                                        this.active.emit(false);
                                },
                                error: (error) => {
                                        alert(error.error)
                                }
                        })
                } else {
                        var empleado = {
                                nombres: this.profileForm.value.nombres ?? '',
                                numeroIdentificacion: this.profileForm.value.numeroIdentificacion ?? '',
                                primerApellido: this.profileForm.value.primerApellido ?? '',
                                segundoApellido: this.profileForm.value.segundoApellido ?? '',
                                pais: this.profileForm.value.pais ?? '',
                                identificacion: this.profileForm.value.identificacion ?? '',
                                dominio: this.profileForm.value.dominio ?? '',
                                area: this.profileForm.value.area ?? ''
                        } as Empleado;
                        this.empleadoService.actualizarEmpleado(empleado)
                        this.finalizado.emit();
                        this.active.emit(false);
                }

        }

        salir() {
                this.active.emit(false);
        }
}
