import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs/operators';

import { Course } from '../model/course';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private httpCliente: HttpClient) {}

  list(page = 0, pageSize = 10) {
    return this.httpCliente
      .get<CoursePage>(this.API, { params: { page, pageSize } })
      .pipe(
        first()
        //delay(1000),
      );
  }

  save(record: Partial<Course>) {
    if (record._id) return this.update(record);
    return this.create(record);
  }

  loadById(id: string) {
    return this.httpCliente.get<Course>(`${this.API}/${id}`);
  }

  private create(record: Partial<Course>) {
    return this.httpCliente.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>) {
    return this.httpCliente
      .put<Course>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }

  remove(id: string) {
    return this.httpCliente.delete<Course>(`${this.API}/${id}`).pipe(first());
  }
}
