import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './empleados.service';
import { Empleado } from '../model/empleado';
import { ModalDataUserComponent } from '../modal/modal-data-user/modal-data-user.component';

@Component({
    selector: 'app-empleados',
    standalone: true,
    imports: [ModalDataUserComponent],
    templateUrl: './empleados.component.html',
    styleUrl: './empleados.component.scss'
})
export class EmpleadosComponent implements OnInit {

    empleados: Empleado[] = []

    empleadosMostrar = {
        empleados: [] as Empleado[],
        inicio: 0,
        fin: 10
    }

    constructor(private empleadoService: EmpleadosService) { }

    ngOnInit(): void {
        this.empleadoService.obtenerEmpleados().subscribe(
            (data: Empleado[]) => {
                this.empleados = data;
                if (this.empleados.length <= 10) {
                    this.empleadosMostrar.empleados = data
                } else {
                    this.empleadosMostrar.empleados = []
                    let inicio = this.empleadosMostrar.inicio;
                    let fin = this.empleadosMostrar.fin
                    this.empleadosMostrar.empleados = this.empleados.slice(inicio, fin)
                }
            },
            (error) => {
                console.error('Error fetching students', error);
            }
        )
    }

    activeModalDataUser = false;
    title: string = "";
    isCreate: boolean = false;
    nombres: string | null = ""
    apellidoPrimero: string | null = ""
    apellidoSegundo: string | null = ""
    numeroIdentificacion: string | null = ""

    public viewDialog(title: string, isCreate: boolean) {
        this.isCreate = isCreate;
        this.activeModalDataUser = true;
        this.title = title;
        this.nombres = ""
        this.apellidoPrimero = "";
        this.apellidoSegundo = ""
    }

    public update(title: string, isCreate: boolean, empleado: Empleado) {
        this.isCreate = isCreate;
        this.activeModalDataUser = true;
        this.title = title;
        this.nombres = empleado.nombres
        this.apellidoPrimero = empleado.primerApellido;
        this.apellidoSegundo = empleado.segundoApellido
        this.numeroIdentificacion = empleado.numeroIdentificacion
    }

    public cerrarModal(isActive: boolean) {
        this.activeModalDataUser = isActive;
    }

    public registrarSalida(empleado: Empleado) {
        this.empleadoService.registrarSalida(empleado.numeroIdentificacion || '');
    }

    public registrarIngreso(empleado: Empleado) {
        this.empleadoService.registrarEntrada(empleado.numeroIdentificacion || '');
    }

    actualizarTabla() {
        this.empleadoService.obtenerEmpleados().subscribe(
            (data: Empleado[]) => {
                this.empleados = data;
                console.log(data);

            },
            (error) => {
                console.error('Error fetching students', error);
            }
        )

    }

    btnSiguiente() {
        var inicio = this.empleadosMostrar.inicio;
        var fin = this.empleadosMostrar.fin;
        if (fin + 10 > this.empleados.length) {
            fin = this.empleados.length
        } else {
            fin = fin + 10
        }
        inicio = fin - 10;
        this.empleadosMostrar.inicio = inicio;
        this.empleadosMostrar.fin = fin;
        this.empleadosMostrar.empleados = this.empleados.slice(inicio, fin)

    }

    btnAnterior() {
        var inicio = this.empleadosMostrar.inicio;
        var fin = this.empleadosMostrar.fin;
        if (inicio - 10 < 0) {
            inicio = 0;
        } else {
            inicio = inicio - 10
        }
        fin = inicio + 10
        this.empleadosMostrar.inicio = inicio;
        this.empleadosMostrar.fin = fin;
        this.empleadosMostrar.empleados = this.empleados.slice(inicio, fin)
    }

    addNewEmpleado(empleado: Empleado) {
        this.empleados.push(empleado)
    }
}
