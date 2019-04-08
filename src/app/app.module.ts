import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { AgmCoreModule } from "@agm/core";
import { ResaltarDirective } from "./directives/resaltar.directive";
import { ContarClicksDirective } from "./directives/contar-clicks.directive";
import { Routes, RouterModule } from "@angular/router";
import { LugaresService } from "./services/lugares.service";

//Componentes
import { LugaresComponent } from "./lugares/lugares.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { ContactoComponent } from "./contacto/contacto.component";
import { AboutComponent } from "./about/about.component";
import { CrearComponent } from "./crear/crear.component";
import { InicioComponent } from "./inicio/inicio.component";

import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { DestacadosComponent } from "./destacados/destacados.component";
import { InicioSesionComponent } from "./inicio-sesion/inicio-sesion.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { AutorizacionService } from "./services/autorizacion.service";
import { GuardiaService } from "./services/guardia.service";
import { RegistroComponent } from "./registro/registro.component";

const appRoutes: Routes = [
  {
    path: "",
    component: InicioComponent
  },
  {
    path: "inicio",
    component: InicioComponent
  },
  {
    path: "destacados",
    component: DestacadosComponent
  },
  {
    path: "lugares",
    component: LugaresComponent
  },
  {
    path: "detalle/:id",
    component: DetalleComponent
  },
  {
    path: "contacto",
    component: ContactoComponent
  },
  {
    path: "crear",
    component: CrearComponent,
    canActivate: [GuardiaService]
  },
  {
    path: "inicio-sesion",
    component: InicioSesionComponent
  },
  {
    path: "registro",
    component: RegistroComponent
  },
  {
    path: "about",
    component: AboutComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    AboutComponent,
    CrearComponent,
    InicioComponent,
    DestacadosComponent,
    InicioSesionComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAt_e0228SLA3GJe3XFha1CuLOmlLVrvxc"
    }),
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [LugaresService, AutorizacionService, GuardiaService],
  bootstrap: [AppComponent]
})
export class AppModule {}
