import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EmpleadosService } from '../../empleados/empleados.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
      selector: 'app-modal-delete-user',
      standalone: true,
      imports: [],
      templateUrl: './modal-delete-user.component.html',
      styleUrl: './modal-delete-user.component.scss'
})
export class ModalDeleteUserComponent implements OnInit {

      @Input() numeroIdentificacion!: string;
      @Output() finalizado = new EventEmitter<string>();
      profileForm = new FormGroup({
            numeroIdentificacion: new FormControl(''),
      })

      constructor(private empleadoService: EmpleadosService) { }

      ngOnInit(): void {
      }

      eliminarEmpleado() {
            this.empleadoService.eliminarEmpleado(this.numeroIdentificacion);
            this.finalizado.emit(this.numeroIdentificacion);
      }

      cerrarModal() {
            this.finalizado.emit("");
      }

}
