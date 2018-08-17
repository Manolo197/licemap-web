import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

//servicios
import { AdministradorService } from './administrador.service';

import { AppComponent } from './app.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { CursosComponent } from './cursos/cursos.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { MovieUpComponent } from './movie-up/movie-up.component';
import { SubirCursoComponent } from './subir-curso/subir-curso.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'index', component: IndexComponent},
  {path: 'Acerca_de', component: AcercaDeComponent},
  {path: 'Cursos', component: CursosComponent},
  {path: 'Administrador', component: AdministradorComponent},
  {path: 'Movies', component: MovieUpComponent},
  {path: 'Courses', component: SubirCursoComponent},
  {path: 'Images', component: ImagenesComponent},
  {path: 'Users', component: UsuarioComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    AcercaDeComponent,
    AdministradorComponent,
    CabeceraComponent,
    CursosComponent,
    FooterComponent,
    IndexComponent,
    MovieUpComponent,
    SubirCursoComponent,
    ImagenesComponent,
    UsuarioComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AdministradorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
