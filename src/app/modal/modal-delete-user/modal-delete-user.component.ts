import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EmployeeService } from '../../employees/employees.service';
import { firstValueFrom } from 'rxjs';

@Component({
      selector: 'app-modal-delete-user',
      standalone: true,
      imports: [],
      templateUrl: './modal-delete-user.component.html',
      styleUrl: './modal-delete-user.component.scss'
})
export class ModalDeleteUserComponent {

      @Input() numeroIdentificacion!: string;
      @Output() finalizarEsto = new EventEmitter<void>();

      constructor(private employeeService: EmployeeService) { }

      protected btnDeleteEmployeeClick = async () => {
            try {
                  const result = await firstValueFrom(this.employeeService.deleteEmployee(this.numeroIdentificacion));
                  alert(result.message);
                  this.finalizarEsto.emit();
            } catch (error) {
                  console.log(error);
            }
      }

      protected btnCloseModalClick = () => {
            this.finalizarEsto.emit();
      }

}
