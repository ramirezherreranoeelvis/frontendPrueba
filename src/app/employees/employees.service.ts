import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { environments } from '../../environments/environments';

@Injectable({
        providedIn: 'root'
})
export class EmployeeService {
        private urlEmployee: string = environments.baseUrl + '/employees';

        constructor(private httpCLient: HttpClient) { }

        public findAllEmployees(): Observable<Employee[]> {
                return this.httpCLient.get<Employee[]>(this.urlEmployee);
        }

        public createEmployee(empleado: Employee): Observable<Message<void>> {
                return this.httpCLient.post<Message<void>>(this.urlEmployee + '/create', empleado)
        }

        public updateDataEmployed(empleado: Employee, identificationNumber: string): Observable<Message<void>> {
                const params = new HttpParams()
                        .set('identificationNumber', identificationNumber)
                return this.httpCLient.put<Message<void>>(this.urlEmployee + '/update', empleado, { params });
        }

        public registerEntry(identificationNumber: string): Observable<Message<void>> {
                const params = new HttpParams()
                        .set('identificationNumber', identificationNumber)
                return this.httpCLient.post<Message<void>>(this.urlEmployee + '/entry', null, { params })
        }

        public registerExit(identificationNumber: string): Observable<Message<void>> {
                const params = new HttpParams()
                        .set('identificationNumber', identificationNumber)
                return this.httpCLient.post<Message<void>>(this.urlEmployee + '/exit', null, { params })
        }

        public deleteEmployee(identificationNumber: string): Observable<Message<void>> {
                const params = new HttpParams()
                        .set('identificationNumber', identificationNumber)
                return this.httpCLient.delete<Message<void>>(this.urlEmployee + '/delete', { params })

        }

}
