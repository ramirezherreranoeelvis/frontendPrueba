import { Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
export const routes: Routes = [
        {
                path: '',
                redirectTo: 'empleados',
                pathMatch: 'full'
        },
        {
                path: 'empleados',
                title: 'empleados',
                component: EmpleadosComponent
        },
];
