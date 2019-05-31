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
import { AntrosComponent } from "./antros/antros.component";
import { BaresComponent } from "./bares/bares.component";
import { RestaurantesComponent } from "./restaurantes/restaurantes.component";
import { MuseosComponent } from "./museos/museos.component";
import { ParquesComponent } from "./parques/parques.component";
import { PuestosComponent } from "./puestos/puestos.component";
import { CentroComponent } from "./centro/centro.component";
import { PlazasComponent } from "./plazas/plazas.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { ContactoComponent } from "./contacto/contacto.component";
import { AboutComponent } from "./about/about.component";
import { CrearComponent } from "./crear/crear.component";
import { InicioComponent } from "./Inicio/inicio.component";
import { FooterComponent } from "./footer/footer.component";

import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
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
import { UsuarioComponent } from "./usuario/usuario.component";
import { FilterPipe } from "./pipes/filter.pipe";
import { FiltroPipe } from "./pipe.events/filtro.pipe";
import { CrearArticulosComponent } from "./articulos.crear/articulos.crear.component";
import { ArticulosService } from "./services/articulos.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ArticuloDetalleComponent } from "./articulos.detalle/articulos.detalle.component";
import { OnCreate } from "./directives/onCreate.directive";
import { ReporteComponent } from "./reporte/reporte.component";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";
import { ReporteAtraccionComponent } from "./reporte.atraccion/reporte.atraccion.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { CrearSucursalComponent } from "./crear.sucursal/crear.sucursal.component";
import { ContraComponent } from "./cambiar.contraseña/cambiar.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { GeoLocationService } from "./services/geolocation.service";
import { MessagingService } from "./services/messaging.service";

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
    path: "antros",
    component: AntrosComponent
  },
  {
    path: "bares",
    component: BaresComponent
  },
  {
    path: "restaurantes",
    component: RestaurantesComponent
  },
  {
    path: "museos",
    component: MuseosComponent
  },
  {
    path: "parques",
    component: ParquesComponent
  },
  {
    path: "puestos",
    component: PuestosComponent
  },
  {
    path: "centro",
    component: CentroComponent
  },
  {
    path: "plazas",
    component: PlazasComponent
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
    path: "crear/:id",
    component: CrearComponent,
    canActivate: [GuardiaService]
  },
  {
    path: "crearArticulos/:id",
    component: CrearArticulosComponent,
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
  },
  {
    path: "footer",
    component: AboutComponent
  },
  {
    path: "usuario",
    component: UsuarioComponent,
    canActivate: [GuardiaService]
  },
  {
    path: "articulo/:idlugar/:id",
    component: ArticuloDetalleComponent
  },
  {
    path: "reporte",
    component: ReporteComponent
  },
  {
    path: "reporteAtraccion/:id/:p",
    component: ReporteAtraccionComponent
  },
  {
    path: "forgot",
    component: ForgotComponent
  },
  {
    path: "crear-sucursal",
    component: CrearSucursalComponent,
    canActivate: [GuardiaService]
  },
  {
    path: "cambiarContra",
    component: ContraComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    OnCreate,
    DetalleComponent,
    LugaresComponent,
    AntrosComponent,
    BaresComponent,
    RestaurantesComponent,
    MuseosComponent,
    ParquesComponent,
    PuestosComponent,
    CentroComponent,
    PlazasComponent,
    ContactoComponent,
    AboutComponent,
    CrearComponent,
    InicioComponent,
    DestacadosComponent,
    InicioSesionComponent,
    RegistroComponent,
    FooterComponent,
    UsuarioComponent,
    FilterPipe,
    FiltroPipe,
    CrearArticulosComponent,
    ArticuloDetalleComponent,
    ReporteComponent,
    ReporteAtraccionComponent,
    ForgotComponent,
    CrearSucursalComponent,
    ContraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    AngularFireModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB2JEN5BecGIXzKVY697OXtB90xvoeGfuE"
    }),
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    HttpClientModule,
    FontAwesomeModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    LugaresService,
    AutorizacionService,
    GuardiaService,
    ArticulosService,
    GeoLocationService,
    MessagingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
