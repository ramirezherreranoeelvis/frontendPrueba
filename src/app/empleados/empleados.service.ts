import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../model/empleado';
import { Observable } from 'rxjs';

@Injectable({
        providedIn: 'root'
})
export class EmpleadosService {
        private urlParent: string = "http://localhost:8080/employees";
        constructor(private httpCLient: HttpClient) { }

        public obtenerEmpleados(): Observable<Empleado[]> {
                return this.httpCLient.get<Empleado[]>(this.urlParent);
        }

        public registrarEmpleado(empleado: Empleado) {
                return this.httpCLient.post<Empleado>(this.urlParent + '/create', empleado)
        }

        public actualizarEmpleado(empleado: Empleado) {
                this.httpCLient.put<string>(this.urlParent + '/update', empleado)
                        .subscribe({
                                next: (response) => {
                                        alert('Se actualizo correctamente')
                                },
                                error: (error) => {
                                        alert(error.error)
                                }
                        })
        }

        public registrarEntrada(codigoIdentificacion: string) {
                const params = new HttpParams()
                        .set('numeroIdentificacion', codigoIdentificacion)
                this.httpCLient.post<string>(this.urlParent + '/ingreso', null, { params })
                        .subscribe({
                                next: (response) => {
                                        alert('Se registro la ingreso');
                                },
                                error: (error) => {
                                        alert(error.error)
                                }
                        })
        }
        public eliminarEmpleado(codigoIdentificacion: string) {
                const params = new HttpParams()
                        .set('numeroIdentificacion', codigoIdentificacion)
                this.httpCLient.delete<string>(this.urlParent + '/delete', { params })
                        .subscribe({
                                next: (response) => {
                                        console.log(response);
                                        
                                        alert('Se elimino al Empleado Correctamente');
                                },
                                error: (error) => {
                                        console.log(error);
                                        
                                        alert(error.error)
                                }
                        })
        }
        public registrarSalida(codigoIdentificacion: string) {
                const params = new HttpParams()
                        .set('numeroIdentificacion', codigoIdentificacion)
                this.httpCLient.post<string>(this.urlParent + '/salida', null, { params })
                        .subscribe({
                                next: (response) => {
                                        alert('Se registro la salida');
                                },
                                error: (error) => {
                                        alert(error.error)
                                }
                        })
        }
}
