import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActividadQuery, EspecialidadQuery } from 'src/app/models/consultas.model';
import { Catalogo } from '../models/actividades.model';

@Injectable({
  providedIn: 'root',
})
export class ActividadesService {


  constructor(
    private _afs: AngularFirestore,
  ) {}

  searchByActividad(actividad: string) {
    this._afs.collectionGroup('')
  }

  get allActividades(): ActividadQuery[] {
    let actividades:ActividadQuery[] = []
    this.Catalogos.forEach((cat => {
      let catalogo = cat.nombre
      cat.especialidades.forEach(esp => {
        let especialidad = esp.nombre
        esp.actividades.forEach(act =>
          actividades.push({...act, especialidad, catalogo})
        )
      })
    }))
    return actividades
  }

  get allEspecialidades() {
    let especialidades: EspecialidadQuery[] = []
    this.Catalogos.forEach(cat => {
      let catalogo = cat.nombre
      cat.especialidades.forEach(esp => {
        especialidades.push({...esp, catalogo})
      })
    })
    return especialidades
  }

  getEspecialidadByCode(code: string) {
    return this.allActividades.find(act => act.codigo === code)?.especialidad
  }



  Catalogos: Catalogo[] = [
    {
      id: 'tipos_de_obra',
      nombre: 'Especialidades y Tipos de Obra',
      instrucciones:
        'Enumere por orden de importancia del 1 al 3 los principales tipos de obra que realiza',
      especialidades: [
        {
          nombre: 'Sector Energía',
          actividades: [
            {
              nombre: 'Plantas Hidroeléctricas',
              codigo: '1.1.1',
              expansion: false,
              subespecialidad: 'Generación y Conducción de Energía Eléctrica',
            },
            {
              nombre: 'Plantas Termoeléctricas',
              codigo: '1.1.2',
              expansion: false,
              subespecialidad: 'Generación y Conducción de Energía Eléctrica',
            },
            {
              nombre: 'Plantas Nucleoeléctricas',
              codigo: '1.1.3',
              expansion: false,
              subespecialidad: 'Generación y Conducción de Energía Eléctrica',
            },
            {
              nombre: 'Plantas Carboeléctricas',
              codigo: '1.1.4',
              expansion: false,
              subespecialidad: 'Generación y Conducción de Energía Eléctrica',
            },
            {
              nombre: 'Plantas Geotérmicas',
              codigo: '1.1.5',
              expansion: false,
              subespecialidad: 'Generación y Conducción de Energía Eléctrica',
            },
            {
              nombre: 'Plantas Solares',
              codigo: '1.1.6',
              expansion: false,
              subespecialidad: 'Generación y Conducción de Energía Eléctrica',
            },
            {
              nombre: 'Plantas Eólicas',
              codigo: '1.1.7',
              expansion: false,
              subespecialidad: 'Generación y Conducción de Energía Eléctrica',
            },
            {
              nombre: 'Plantas de Cogeneración de Energía',
              codigo: '1.1.8',
              expansion: false,
              subespecialidad: 'Generación y Conducción de Energía Eléctrica',
            },
            {
              nombre: 'Tendido de Líneas y Redes de Conducción Eléctrica',
              codigo: '1.1.9',
              expansion: false,
              subespecialidad: 'Generación y Conducción de Energía Eléctrica',
            },
            {
              nombre: 'Subestaciones Eléctricas y Electromecánicas',
              codigo: '1.1.10',
              expansion: false,
              subespecialidad: 'Generación y Conducción de Energía Eléctrica',
            },
            {
              nombre: 'Torres de Transmisión de Energía',
              codigo: '1.1.11',
              expansion: false,
              subespecialidad: 'Generación y Conducción de Energía Eléctrica',
            },
            // Obras Relacionadas con el Petróleo y Gas

            {
              nombre: 'Perforación de Pozos Petroleros',
              codigo: '1.2.1',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
            {
              nombre: 'Perforación de Pozos de Gas',
              codigo: '1.2.2',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
            {
              nombre: 'Plantas Petroquímicas',
              codigo: '1.2.3',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
            {
              nombre: 'Plantas de Refinación de Petróleo',
              codigo: '1.2.4',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
            {
              nombre: 'Plantas de Almacenamiento y Distribución de Petróleo',
              codigo: '1.2.5',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
            {
              nombre: 'Plantas de Almacenamiento y Distribución de Gas',
              codigo: '1.2.6',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
            {
              nombre: 'Sistemas de Conducción de Petróleo (Oleoductos)',
              codigo: '1.2.7',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
            {
              nombre: 'Sistemas de Conducción de Gas (Gasoductos)',
              codigo: '1.2.8',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
            {
              nombre: 'Plataformas Marinas',
              codigo: '1.2.9',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
            {
              nombre: 'Baterías de Recolección',
              codigo: '1.2.10',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
            {
              nombre: 'Baterías de Separación',
              codigo: '1.2.11',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
            {
              nombre: 'Estaciones de Compresión',
              codigo: '1.2.12',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
            {
              nombre: 'Plataformas Terrestres',
              codigo: '1.2.13',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
            {
              nombre:
                'Proyectos Integrales de Ingeniería, Procura y Construcción',
              codigo: '1.2.14',
              expansion: false,
              subespecialidad: 'Obras Relacionadas con el Petróleo y Gas',
            },
          ],
        },
        {
          nombre: 'Sector Comunicaciones y Transportes',
          actividades: [
            {
              nombre: 'Autopistas, Carreteras y Caminos',
              codigo: '2.1.1',
              expansion: false,
              subespecialidad: 'Transporte Terrestre y Aéreo',
            },
            {
              nombre: 'Terracerías para Obras Viales',
              codigo: '2.1.2',
              expansion: false,
              subespecialidad: 'Transporte Terrestre y Aéreo',
            },
            {
              nombre: 'Obras de Drenaje en Carreteras y Caminos',
              codigo: '2.1.3',
              expansion: false,
              subespecialidad: 'Transporte Terrestre y Aéreo',
            },
            {
              nombre:
                'Obras de Conservación y Mantenimiento de Carreteras y Caminos',
              codigo: '2.1.4',
              expansion: false,
              subespecialidad: 'Transporte Terrestre y Aéreo',
            },
            {
              nombre: 'Puentes',
              codigo: '2.1.5',
              expansion: false,
              subespecialidad: 'Transporte Terrestre y Aéreo',
            },
            {
              nombre: 'Túneles',
              codigo: '2.1.6',
              expansion: false,
              subespecialidad: 'Transporte Terrestre y Aéreo',
            },
            {
              nombre: 'Metro y Tren Ligero',
              codigo: '2.1.7',
              expansion: false,
              subespecialidad: 'Transporte Terrestre y Aéreo',
            },
            {
              nombre: 'Ferrocarriles y Vías Férreas',
              codigo: '2.1.8',
              expansion: false,
              subespecialidad: 'Transporte Terrestre y Aéreo',
            },
            {
              nombre: 'Aeropistas',
              codigo: '2.1.9',
              expansion: false,
              subespecialidad: 'Transporte Terrestre y Aéreo',
            },
            {
              nombre: 'Terminales Aéreas',
              codigo: '2.1.10',
              expansion: false,
              subespecialidad: 'Transporte Terrestre y Aéreo',
            },
            {
              nombre: 'Terminales de Autotransporte',
              codigo: '2.1.11',
              expansion: false,
              subespecialidad: 'Transporte Terrestre y Aéreo',
            },
            {
              nombre: 'Señalamiento y Protección',
              codigo: '2.1.12',
              expansion: false,
              subespecialidad: 'Transporte Terrestre y Aéreo',
            },
            // Transporte Marítimo y Fluvial
            {
              nombre: 'Puertos',
              codigo: '2.2.1',
              expansion: false,
              subespecialidad: 'Transporte Marítimo y Fluvial',
            },
            {
              nombre: 'Rompeolas y Escolleras',
              codigo: '2.2.2',
              expansion: false,
              subespecialidad: 'Transporte Marítimo y Fluvial',
            },
            {
              nombre: 'Muelles y Atracaderos',
              codigo: '2.2.3',
              expansion: false,
              subespecialidad: 'Transporte Marítimo y Fluvial',
            },
            {
              nombre: 'Muros de Contención y Diques',
              codigo: '2.2.4',
              expansion: false,
              subespecialidad: 'Transporte Marítimo y Fluvial',
            },
            {
              nombre: 'Astilleros',
              codigo: '2.2.5',
              expansion: false,
              subespecialidad: 'Transporte Marítimo y Fluvial',
            },
            {
              nombre: 'Señalamientos de Navegación',
              codigo: '2.2.6',
              expansion: false,
              subespecialidad: 'Transporte Marítimo y Fluvial',
            },
            {
              nombre: 'Dragados',
              codigo: '2.2.7',
              expansion: false,
              subespecialidad: 'Transporte Marítimo y Fluvial',
            },
            // Obras para Telecomunicaciones
            {
              nombre: 'Tendido de Líneas de Comunicación',
              codigo: '2.3.1',
              expansion: false,
              subespecialidad: 'Obras para Telecomunicaciones',
            },
            {
              nombre: 'Centrales Telefónicas',
              codigo: '2.3.2',
              expansion: false,
              subespecialidad: 'Obras para Telecomunicaciones',
            },
            {
              nombre: 'Obras para Radio y Televisión',
              codigo: '2.3.3',
              expansion: false,
              subespecialidad: 'Obras para Telecomunicaciones',
            },
            {
              nombre: 'Instalación de Antenas',
              codigo: '2.3.4',
              expansion: false,
              subespecialidad: 'Obras para Telecomunicaciones',
            },
          ],
        },
        {
          nombre: 'Sector Vivienda y Desarrollo Urbano',
          actividades: [
            {
              nombre: 'Vivienda Unifamiliar de Interés Social',
              codigo: '3.1.1',
              expansion: false,
              subespecialidad: 'Vivienda',
            },
            {
              nombre: 'Vivienda Multifamiliar de Interés Social',
              codigo: '3.1.2',
              expansion: false,
              subespecialidad: 'Vivienda',
            },
            {
              nombre: 'Vivienda Media Unifamiliar',
              codigo: '3.1.3',
              expansion: false,
              subespecialidad: 'Vivienda',
            },
            {
              nombre: 'Vivienda Media Multifamiliar',
              codigo: '3.1.4',
              expansion: false,
              subespecialidad: 'Vivienda',
            },
            {
              nombre: 'Vivienda Residencial',
              codigo: '3.1.5',
              expansion: false,
              subespecialidad: 'Vivienda',
            },
            {
              nombre: 'Vivienda Prefabricada o Industrializada',
              codigo: '3.1.6',
              expansion: false,
              subespecialidad: 'Vivienda',
            },
            //Desarrollo Urbano
            {
              nombre: 'Puentes Vehiculares',
              codigo: '3.2.1',
              expansion: false,
              subespecialidad: 'Desarrollo Urbano',
            },
            {
              nombre: 'Pasos a Desnivel',
              codigo: '3.2.2',
              expansion: false,
              subespecialidad: 'Desarrollo Urbano',
            },
            {
              nombre: 'Banquetas y Guarniciones',
              codigo: '3.2.3',
              expansion: false,
              subespecialidad: 'Desarrollo Urbano',
            },
            {
              nombre: 'Pavimentación de Calles y Avenidas',
              codigo: '3.2.4',
              expansion: false,
              subespecialidad: 'Desarrollo Urbano',
            },
            {
              nombre: 'Redes de Agua y Drenaje',
              codigo: '3.2.5',
              expansion: false,
              subespecialidad: 'Desarrollo Urbano',
            },
            {
              nombre: 'Redes de Distribución de Gas',
              codigo: '3.2.6',
              expansion: false,
              subespecialidad: 'Desarrollo Urbano',
            },
            {
              nombre: 'Alumbrado Público',
              codigo: '3.2.7',
              expansion: false,
              subespecialidad: 'Desarrollo Urbano',
            },
            {
              nombre: 'Canalizaciones Telefónicas',
              codigo: '3.2.8',
              expansion: false,
              subespecialidad: 'Desarrollo Urbano',
            },
            {
              nombre: 'Parques y Jardines',
              codigo: '3.2.9',
              expansion: false,
              subespecialidad: 'Desarrollo Urbano',
            },
            {
              nombre: 'Señalamientos y Protección',
              codigo: '3.2.10',
              expansion: false,
              subespecialidad: 'Desarrollo Urbano',
            },
          ],
        },
        {
          nombre: 'Sector Agua y Medio Ambiente',
          actividades: [
            {
              nombre: 'Presas',
              codigo: '4.1',
              expansion: false,
            },
            {
              nombre: 'Canales y Zonas de Riego',
              codigo: '4.2',
              expansion: false,
            },
            {
              nombre: 'Pozos de Agua',
              codigo: '4.3',
              expansion: false,
            },
            {
              nombre: 'Obras de Protección para Obras Hidráulicas',
              codigo: '4.4',
              expansion: false,
            },
            {
              nombre: 'Obras de Conducción de Agua',
              codigo: '4.5',
              expansion: false,
            },
            {
              nombre: 'Tanques de Almacenamiento de Agua',
              codigo: '4.6',
              expansion: false,
            },
            {
              nombre:
                'Plantas de Potabilización y Tratamiento de Aguas Residuales',
              codigo: '4.7',
              expansion: false,
            },
            {
              nombre: 'Obras de Saneamiento',
              codigo: '4.8',
              expansion: false,
            },
            {
              nombre: 'Desazolves de Canales y Ríos',
              codigo: '4.9',
              expansion: false,
            },
            {
              nombre: 'Instalación de Tuberías',
              codigo: '4.10',
              expansion: false,
            },
            {
              nombre: 'Rellenos Sanitarios',
              codigo: '4.11',
              expansion: false,
            },
            {
              nombre:
                'Plantas de Tratamiento de Residuos Sólidos, Peligrosos y de Manejo Especial',
              codigo: '4.12',
              expansion: false,
            },
            {
              nombre: 'Remediación de Suelos Contaminados',
              codigo: '4.13',
              expansion: false,
            },
            {
              nombre: 'Obras de Restitución del Medio Ambiente',
              codigo: '4.14',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Sector Salud',
          actividades: [
            {
              nombre: 'Hospitales',
              codigo: '5.1',
              expansion: false,
            },
            {
              nombre: 'Clínicas',
              codigo: '5.2',
              expansion: false,
            },
            {
              nombre: 'Centros de Rehabilitación',
              codigo: '5.3',
              expansion: false,
            },
            {
              nombre: 'Consultorios',
              codigo: '5.4',
              expansion: false,
            },
            {
              nombre: 'Laboratorios Químicos',
              codigo: '5.5',
              expansion: false,
            },
            {
              nombre: 'Laboratorios Clínicos',
              codigo: '5.6',
              expansion: false,
            },
            {
              nombre: 'Farmacias',
              codigo: '5.7',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Sector Educación y Cultura',
          actividades: [
            {
              nombre: 'Escuela Educación Básica',
              codigo: '6.1',
              expansion: false,
            },
            {
              nombre: 'Escuela Educación Media',
              codigo: '6.2',
              expansion: false,
            },
            {
              nombre: 'Educación Superior',
              codigo: '6.3',
              expansion: false,
            },
            {
              nombre: 'Aulas Rurales',
              codigo: '6.4',
              expansion: false,
            },
            {
              nombre: 'Centros de Capacitación',
              codigo: '6.5',
              expansion: false,
            },
            {
              nombre: 'Centros de Investigación',
              codigo: '6.6',
              expansion: false,
            },
            {
              nombre: 'Auditorios',
              codigo: '6.7',
              expansion: false,
            },
            {
              nombre: 'Bibliotecas',
              codigo: '6.8',
              expansion: false,
            },
            {
              nombre: 'Videotecas',
              codigo: '6.9',
              expansion: false,
            },
            {
              nombre: 'Museos y Galerías',
              codigo: '6.10',
              expansion: false,
            },
            {
              nombre: 'Teatros',
              codigo: '6.11',
              expansion: false,
            },
            {
              nombre:
                'Elaboración Conservación y Restauración de Obras Artísticas',
              codigo: '6.12',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Sector Industria, Comercio y Turismo',
          actividades: [
            {
              nombre: 'Parques Industriales',
              codigo: '7.1.1',
              expansion: true,
              subespecialidad: 'Industria',
            },
            {
              nombre: 'Plantas Automotrices',
              codigo: '7.1.2',
              expansion: true,
              subespecialidad: 'Industria',
            },
            {
              nombre: 'Plantas Alimenticias',
              codigo: '7.1.3',
              expansion: true,
              subespecialidad: 'Industria',
            },
            {
              nombre: 'Plantas Textiles',
              codigo: '7.1.4',
              expansion: true,
              subespecialidad: 'Industria',
            },
            {
              nombre: 'Maquiladoras',
              codigo: '7.1.5',
              expansion: true,
              subespecialidad: 'Industria',
            },
            {
              nombre: 'Naves Industriales',
              codigo: '7.1.6',
              expansion: true,
              subespecialidad: 'Industria',
            },
            {
              nombre: 'Talleres',
              codigo: '7.1.7',
              expansion: true,
              subespecialidad: 'Industria',
            },
            {
              nombre: 'Ingenios',
              codigo: '7.1.9',
              expansion: true,
              subespecialidad: 'Industria',
            },
            {
              nombre: 'Plantas de Concreto',
              codigo: '7.1.10',
              expansion: true,
              subespecialidad: 'Industria',
            },
            {
              nombre: 'Otras Plantas Industriales (especificar):',
              codigo: '7.1.11',
              expansion: true,
              subespecialidad: 'Industria',
            },
            //Obras para el Comercio y Servicios
            {
              nombre: 'Hipermercado / Megamercado / Supermercado',
              codigo: '7.2.1',
              expansion: false,
              subespecialidad: 'Obras para el Comercio y Servicios',
            },
            {
              nombre: 'Tiendas Departamentales',
              codigo: '7.2.2',
              expansion: false,
              subespecialidad: 'Obras para el Comercio y Servicios',
            },
            {
              nombre: 'Tienda de Conveniencia',
              codigo: '7.2.3',
              expansion: false,
              subespecialidad: 'Obras para el Comercio y Servicios',
            },
            {
              nombre: 'Bancos',
              codigo: '7.2.4',
              expansion: false,
              subespecialidad: 'Obras para el Comercio y Servicios',
            },
            {
              nombre: 'Oficinas',
              codigo: '7.2.5',
              expansion: false,
              subespecialidad: 'Obras para el Comercio y Servicios',
            },
            {
              nombre: 'Cines',
              codigo: '7.2.6',
              expansion: false,
              subespecialidad: 'Obras para el Comercio y Servicios',
            },
            {
              nombre: 'Restaurantes',
              codigo: '7.2.7',
              expansion: false,
              subespecialidad: 'Obras para el Comercio y Servicios',
            },
            {
              nombre: 'Bares',
              codigo: '7.2.8',
              expansion: false,
              subespecialidad: 'Obras para el Comercio y Servicios',
            },
            {
              nombre: 'Agencias Automotrices',
              codigo: '7.2.9',
              expansion: false,
              subespecialidad: 'Obras para el Comercio y Servicios',
            },
            {
              nombre: 'Estacionamientos',
              codigo: '7.2.10',
              expansion: false,
              subespecialidad: 'Obras para el Comercio y Servicios',
            },
            {
              nombre: 'Gasolinerías',
              codigo: '7.2.11',
              expansion: false,
              subespecialidad: 'Obras para el Comercio y Servicios',
            },
            {
              nombre: 'Centrales de Autobuses',
              codigo: '7.2.12',
              expansion: false,
              subespecialidad: 'Obras para el Comercio y Servicios',
            },
            //Turismo
            {
              nombre: 'Hoteles',
              codigo: '7.3.1',
              expansion: false,
              subespecialidad: 'Turismo',
            },
            {
              nombre: 'Condominios Turísticos',
              codigo: '7.3.2',
              expansion: false,
              subespecialidad: 'Turismo',
            },
            {
              nombre: 'Centro de Convenciones',
              codigo: '7.3.3',
              expansion: false,
              subespecialidad: 'Turismo',
            },
            {
              nombre: 'Centros vacacionales / Diversión / Entretenimiento',
              codigo: '7.3.4',
              expansion: false,
              subespecialidad: 'Turismo',
            },
            {
              nombre: 'Clubes de Playa',
              codigo: '7.3.5',
              expansion: false,
              subespecialidad: 'Turismo',
            },
            {
              nombre: 'Villas',
              codigo: '7.3.6',
              expansion: false,
              subespecialidad: 'Turismo',
            },
            {
              nombre: 'Marinas',
              codigo: '7.3.7',
              expansion: false,
              subespecialidad: 'Turismo',
            },
            {
              nombre: 'SPA ́s',
              codigo: '7.3.8',
              expansion: false,
              subespecialidad: 'Turismo',
            },
            {
              nombre: 'Ecoturismo de Aventura',
              codigo: '7.3.9',
              expansion: false,
              subespecialidad: 'Turismo',
            },
            {
              nombre: 'Casinos',
              codigo: '7.3.10',
              expansion: false,
              subespecialidad: 'Turismo',
            },
            {
              nombre: 'Campos de Golf',
              codigo: '7.3.11',
              expansion: false,
              subespecialidad: 'Turismo',
            },
            {
              nombre: 'Central de Autobuses',
              codigo: '7.3.12',
              expansion: false,
              subespecialidad: 'Turismo',
            },
            {
              nombre: 'Restaurantes /bares/Centros Nocturnos',
              codigo: '7.3.13',
              expansion: false,
              subespecialidad: 'Turismo',
            },
            {
              nombre: 'Fracc. Residencial con vocación turistica',
              codigo: '7.3.14',
              expansion: false,
              subespecialidad: 'Turismo',
            },
          ],
        },
        {
          nombre: 'Sector Seguridad Pública',
          actividades: [
            {
              nombre: 'Reclusorios',
              codigo: '8.1',
              expansion: false,
            },
            {
              nombre: 'Centros de Readaptación',
              codigo: '8.2',
              expansion: false,
            },
            {
              nombre: 'Campos Militares',
              codigo: '8.3',
              expansion: false,
            },
            {
              nombre: 'Centros de Adiestramiento',
              codigo: '8.4',
              expansion: false,
            },
            {
              nombre: 'Tribunales',
              codigo: '8.5',
              expansion: false,
            },
            {
              nombre: 'Aduanas',
              codigo: '8.6',
              expansion: false,
            },
            {
              nombre: 'Cuarteles y Estaciones de Policía',
              codigo: '8.7',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Especialidades diversas',
          actividades: [
            {
              nombre: 'Estadios',
              codigo: '9.1',
              expansion: true,
            },
            {
              nombre: 'Centros Deportivos',
              codigo: '9.2',
              expansion: true,
            },
            {
              nombre: 'Iglesias',
              codigo: '9.3',
              expansion: true,
            },
            {
              nombre: 'Excavaciones',
              codigo: '9.4',
              expansion: true,
            },
            {
              nombre: 'Movimientos de Tierra',
              codigo: '9.5',
              expansion: true,
            },
            {
              nombre: 'Acarreos',
              codigo: '9.6',
              expansion: true,
            },
            {
              nombre: 'Contención de Tierras',
              codigo: '9.7',
              expansion: true,
            },
            {
              nombre: 'Demoliciones',
              codigo: '9.8',
              expansion: true,
            },
            {
              nombre: 'Cimentaciones Profundas en Edificios',
              codigo: '9.9',
              expansion: true,
            },
            {
              nombre: 'Cimentaciones Profundas en Puentes',
              codigo: '9.10',
              expansion: true,
            },
            {
              nombre: 'Cimentaciones Profundas en Obras Marítimas',
              codigo: '9.11',
              expansion: true,
            },
            {
              nombre: 'Cimentaciones Profundas en Obras Petroleras',
              codigo: '9.12',
              expansion: true,
            },
            {
              nombre: 'Estructuras Metálicas',
              codigo: '9.13',
              expansion: true,
            },
            {
              nombre: 'Pailería y Soldadura',
              codigo: '9.14',
              expansion: true,
            },
            {
              nombre: 'Herrería',
              codigo: '9.15',
              expansion: true,
            },
            {
              nombre: 'Cancelería y Aluminio',
              codigo: '9.16',
              expansion: true,
            },
            {
              nombre: 'Albañilería',
              codigo: '9.17',
              expansion: true,
            },
            {
              nombre: 'Carpintería',
              codigo: '9.18',
              expansion: true,
            },
            {
              nombre: 'Plafones',
              codigo: '9.19',
              expansion: true,
            },
            {
              nombre: 'Pisos y Recubrimientos',
              codigo: '9.20',
              expansion: true,
            },
            {
              nombre: 'Pintura',
              codigo: '9.21',
              expansion: true,
            },
            {
              nombre: 'Impermeabilización',
              codigo: '9.22',
              expansion: true,
            },
            {
              nombre: 'Aislamientos y Recubrimientos Especiales',
              codigo: '9.23',
              expansion: true,
            },
            {
              nombre: 'Jardinería',
              codigo: '9.24',
              expansion: true,
            },
            {
              nombre: 'Limpieza y Mantenimiento a Edificios',
              codigo: '9.25',
              expansion: true,
            },
            {
              nombre: 'Adecuación de Espacios',
              codigo: '9.26',
              expansion: true,
            },
            {
              nombre: 'Remodelación de Oficinas',
              codigo: '9.27',
              expansion: true,
            },
            {
              nombre: 'Mantenimiento Industrial',
              codigo: '9.28',
              expansion: true,
            },
            {
              nombre: 'Pavimentos de Concreto Hidráulico',
              codigo: '9.29',
              expansion: true,
            },
            {
              nombre: 'Pavimentos de Concreto Asfáltico',
              codigo: '9.30',
              expansion: true,
            },
            {
              nombre: 'Venta y Renta de Maquinaria',
              codigo: '9.31',
              expansion: true,
            },
            {
              nombre: 'Lumbreras',
              codigo: '9.32',
              expansion: true,
            },
            {
              nombre: 'Otras Cimentaciones Profundas (especificar):',
              codigo: '9.33',
              expansion: true,
            },
            {
              nombre: 'Perforación Direccional Horizontal',
              codigo: '9.34',
              expansion: true,
            },
          ],
        },
        {
          nombre: 'Instalaciones',
          actividades: [
            {
              nombre: 'Hidráulicas y Sanitarias',
              codigo: '10.1',
              expansion: false,
            },
            {
              nombre: 'Eléctricas',
              codigo: '10.2',
              expansion: false,
            },
            {
              nombre: 'Gas',
              codigo: '10.3',
              expansion: false,
            },
            {
              nombre: 'Aire acondicionado y Refrigeración',
              codigo: '10.4',
              expansion: false,
            },
            {
              nombre: 'Sistemas Contra Incendio',
              codigo: '10.5',
              expansion: false,
            },
            {
              nombre: 'Intercomunicación y Sonido',
              codigo: '10.6',
              expansion: false,
            },
            {
              nombre: 'Elevadores',
              codigo: '10.7',
              expansion: false,
            },
            {
              nombre: 'Electromecánicas',
              codigo: '10.8',
              expansion: false,
            },
            {
              nombre: 'Térmicas, Refractarias y Acústicas',
              codigo: '10.9',
              expansion: false,
            },
            {
              nombre: 'Pararrayos',
              codigo: '10.10',
              expansion: false,
            },
            {
              nombre: 'Aire Comprimido y al Vacío',
              codigo: '10.11',
              expansion: false,
            },
            {
              nombre: 'Control Automático',
              codigo: '10.12',
              expansion: false,
            },
            {
              nombre: 'Gases Medicinales',
              codigo: '10.13',
              expansion: false,
            },
            {
              nombre: 'Redes de Cómputo',
              codigo: '10.14',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Proyectos de Asociación Público-Privada',
          actividades: [
            {
              nombre: 'Concesiones',
              codigo: '11.1',
              expansion: true,
            },
            {
              nombre: 'Aprovechamiento de Activos',
              codigo: '11.2',
              expansion: true,
            },
            {
              nombre: 'Proyectos de Prestación de Servicios',
              codigo: '11.3',
              expansion: true,
            },
            {
              nombre: 'Proyectos Financiados',
              codigo: '11.4',
              expansion: true,
            },
            {
              nombre: 'Otros (especificar):',
              codigo: '11.5',
              expansion: true,
            },
          ],
        },
        {
          nombre: 'Minería',
          actividades: [
            {
              nombre: 'Construcción del Tajo y Polvorines',
              codigo: '12.1',
              expansion: false,
            },
            {
              nombre: 'Perforación de Túneles',
              codigo: '12.2',
              expansion: false,
            },
            {
              nombre:
                'Construcción de Oficinas, Talleres, Almacenes y Servicios para la Mina',
              codigo: '12.3',
              expansion: false,
            },
            {
              nombre:
                'Construcción de Patios de Lixiviación, Adsorción, Lavado y Recuperación',
              codigo: '12.4',
              expansion: false,
            },
            {
              nombre: 'Construcción de Caminos de Acceso y de Comunicación',
              codigo: '12.5',
              expansion: false,
            },
            {
              nombre: 'Construcción Sistema de Abastecimiento de Agua',
              codigo: '12.6',
              expansion: false,
            },
            {
              nombre:
                'Construcción de Plantas para Fundición y Laboratorios - Metalúrgicos',
              codigo: '12.7',
              expansion: false,
            },
          ],
        },
      ],
    },
    {
      id: 'servicios_profesionales',
      nombre: 'Servicios profesionales',
      instrucciones:
        'Enumere por orden de importancia del 1 al 3 los principales tipos de obra que realiza',
      especialidades: [
        {
          nombre: 'Estudios Técnicos',
          actividades: [
            {
              nombre:
                'Estudios de Aerofotogrametría,Cartografía y Fotointerpretación',
              codigo: 'A.1',
              expansion: false,
            },
            {
              nombre: 'Levantamientos Topográficos y Batimétricos',
              codigo: 'A.2',
              expansion: false,
            },
            {
              nombre: 'Estudios Fluvio-Marítimos y Oceanográficos',
              codigo: 'A.3',
              expansion: false,
            },
            {
              nombre: 'Estudios Hidrológicos y Meteorológicos',
              codigo: 'A.4',
              expansion: false,
            },
            {
              nombre: 'Estudios de Geotecnia y Mecánica de Suelos',
              codigo: 'A.5',
              expansion: false,
            },
            {
              nombre: 'Estudios Agrológicos y Agropecuarios',
              codigo: 'A.6',
              expansion: false,
            },
            {
              nombre: 'Cálculo y Diseño',
              codigo: 'A.7',
              expansion: false,
            },
            {
              nombre: 'Dictámenes y Peritajes',
              codigo: 'A.8',
              expansion: false,
            },
            {
              nombre: 'Avalúos',
              codigo: 'A.9',
              expansion: false,
            },
            {
              nombre: 'Geológicos, Hidrogeológicos y Geofísicos',
              codigo: 'A.10',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Estudios Ambientales',
          actividades: [
            {
              nombre: 'Auditorias ambientales',
              codigo: 'B.1',
              expansion: false,
            },
            {
              nombre: 'Manejo de residuos peligrosos',
              codigo: 'B.2',
              expansion: false,
            },
            {
              nombre: 'Estudio de impacto ambiental',
              codigo: 'B.3',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Estudios Estratégicos',
          actividades: [
            {
              nombre: 'Estudios de Infraestructura Sectorial y Regional',
              codigo: 'C.1',
              expansion: false,
            },
            {
              nombre: 'Planes Maestros',
              codigo: 'C.2',
              expansion: false,
            },
            {
              nombre: 'Desarrollo Regional Urbano',
              codigo: 'C.3',
              expansion: false,
            },
            {
              nombre: 'Desarrollo Regional Rural',
              codigo: 'C.4',
              expansion: false,
            },
            {
              nombre: 'Catastro',
              codigo: 'C.5',
              expansion: false,
            },
            {
              nombre: 'Planeación de Proyecto de Conjuntos Urbanos y Rurales',
              codigo: 'C.6',
              expansion: false,
            },
            {
              nombre: 'Estudios de Inversión',
              codigo: 'C.7',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Proyectos de Ingeniería Civil',
          actividades: [
            {
              nombre: 'Vías Terrestres',
              codigo: 'D.1',
              expansion: false,
            },
            {
              nombre: 'Obras Hidráulicas',
              codigo: 'D.2',
              expansion: false,
            },
            {
              nombre: 'Edificaciones',
              codigo: 'D.3',
              expansion: false,
            },
            {
              nombre: 'Urbanización',
              codigo: 'D.4',
              expansion: false,
            },
            {
              nombre: 'Estructuras',
              codigo: 'D.5',
              expansion: false,
            },
            {
              nombre: 'Proyectos Integrales',
              codigo: 'D.6',
              expansion: false,
            },
            {
              nombre: 'Arquitectónicos',
              codigo: 'D.7',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Proyectos de Ingeniería Industrial',
          actividades: [
            {
              nombre: 'Ingeniería Básica',
              codigo: 'E.1',
              expansion: false,
            },
            {
              nombre: 'Diseño de Equipo',
              codigo: 'E.2',
              expansion: false,
            },
            {
              nombre: 'Ingeniería de Detalle',
              codigo: 'E.3',
              expansion: false,
            },
            {
              nombre: 'Instalaciones Industriales',
              codigo: 'E.4',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Proyecto de instalaciones Electromecánicas',
          actividades: [
            {
              nombre: 'Hidráulico-Sanitarias',
              codigo: 'F.1',
              expansion: false,
            },
            {
              nombre: 'Eléctrico-Mecánicas',
              codigo: 'F.2',
              expansion: false,
            },
            {
              nombre: 'Telecomunicaciones',
              codigo: 'F.3',
              expansion: false,
            },
            {
              nombre: 'Aire acondicionado y Refrigeración',
              codigo: 'F.4',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Ingeniería de Proyecto para la Industria Petrolera',
          actividades: [
            {
              nombre: 'Diseño de Instalaciones de ductos Terrestres y Marinos',
              codigo: 'G.1',
              expansion: false,
            },
            {
              nombre: 'Diseño de Refinerías',
              codigo: 'G.2',
              expansion: false,
            },
            {
              nombre: 'Diseño de Plantas Petroquímicas',
              codigo: 'G.3',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Supervisión',
          actividades: [
            {
              nombre: 'Supervisión',
              codigo: 'H',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Auditoría de Obras',
          actividades: [
            {
              nombre: 'Auditoría de Obras',
              codigo: 'I',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Gerencia de Proyectos',
          actividades: [
            {
              nombre: 'Gerencia de Proyectos',
              codigo: 'J',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Director Responsable de Obra',
          actividades: [
            {
              nombre: 'Director Responsable de Obra',
              codigo: 'K',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Corresponsable de Obra',
          actividades: [
            {
              nombre: 'Corresponsable de Obra',
              codigo: 'L',
              expansion: false,
            },
          ],
        },
      ],
    },
    {
      id: 'fuentes_de_trabajo',
      nombre: 'Fuentes de Trabajo',
      instrucciones:
        'Enumere por orden de importancia del 1 al 6 las principales fuentes de trabajo',
      especialidades: [
        {
          nombre: 'Sector Energía',
          actividades: [
            //Sector Energía
            {
              nombre: 'Comisión Federal de Electricidad (CFE)',
              codigo: '101',
              expansion: false,
            },
            {
              nombre: 'PEMEX Corporativo',
              codigo: '102',
              expansion: false,
            },
            {
              nombre: 'PEMEX Exploración y Producción',
              codigo: '103',
              expansion: false,
            },
            {
              nombre: 'PEMEX Refinación',
              codigo: '104',
              expansion: false,
            },
            {
              nombre: 'PEMEX Gas y Petroquímica Básica',
              codigo: '105',
              expansion: false,
            },
            {
              nombre: 'Petroquímica',
              codigo: '106',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Sector Comunicaciones y Transportes',
          actividades: [
            {
              nombre: 'Secretaría de Comunicaciones y Transportes (SCT)',
              codigo: '201',
              expansion: false,
            },
            {
              nombre: 'Secretaria de Marina',
              codigo: '202',
              expansion: false,
            },
            {
              nombre: 'Aeropuertos y Servicios Auxiliares (ASA)',
              codigo: '203',
              expansion: false,
            },
            {
              nombre: 'Aeropuerto Internacional de la Ciudad de México (AICM)',
              codigo: '204',
              expansion: false,
            },
            {
              nombre: 'Coordinación General de Puertos y Marina Mercante',
              codigo: '205',
              expansion: false,
            },
            {
              nombre: 'Administraciones Portuarias Integrales (API)',
              codigo: '206',
              expansion: false,
            },
            {
              nombre: 'Transportaciones Marítimas Mexicanas',
              codigo: '207',
              expansion: false,
            },
            {
              nombre: 'Transportaciones Ferroviarias Mexicanas',
              codigo: '208',
              expansion: false,
            },
            {
              nombre:
                'Caminos y Puentes Federales de Ingresos y- Servicios Conexos (CAPUFE)',
              codigo: '209',
              expansion: false,
            },
            {
              nombre: 'Servicio Postal Mexicano (SEPOMEX)',
              codigo: '210',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Sector Vivienda y Desarrollo Urbano',
          actividades: [
            {
              nombre:
                'Secretaría de Desarrollo Agrario, Territorial y Urbano(SEDATU)',
              codigo: '301',
              expansion: false,
            },
            {
              nombre:
                'Instituto del Fondo Nacional de la Vivienda para los Trabajadores (INFONAVIT)',
              codigo: '302',
              expansion: false,
            },
            {
              nombre: 'Fondo de la Vivienda del ISSSTE (FOVISSSTE)',
              codigo: '303',
              expansion: false,
            },
            {
              nombre: 'Fondo Nacional de Habitaciones Populares (FONHAPO)',
              codigo: '304',
              expansion: false,
            },
            {
              nombre: 'Institutos Estatales de Vivienda',
              codigo: '305',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Sector Agua y Medio Ambiente',
          actividades: [
            {
              nombre:
                'Secretaría del Medio Ambiente y Recursos Naturales (SEMARNAT)',
              codigo: '401',
              expansion: false,
            },
            {
              nombre: 'Secretaría de la Reforma Agraria (SRA)',
              codigo: '402',
              expansion: false,
            },
            {
              nombre: 'Comisión Nacional del Agua (CONAGUA)',
              codigo: '403',
              expansion: false,
            },
            {
              nombre: 'Instituto Nacional de Ecología (INE)',
              codigo: '404',
              expansion: false,
            },
            {
              nombre:
                'Procuraduría Federal de Protección al Ambiente (PROFEPA)',
              codigo: '405',
              expansion: false,
            },
            {
              nombre: 'Comisiones Estatales de Agua y Saneamiento (CEAS)',
              codigo: '406',
              expansion: false,
            },
            {
              nombre: 'Secretaría de Agricultura y Desarrollo Rural (SADER)',
              codigo: '407',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Sector Salud',
          actividades: [
            {
              nombre: 'Secretaría de Salud (SS)',
              codigo: '501',
              expansion: false,
            },
            {
              nombre: 'Instituto Mexicano del Seguro Social (IMSS)',
              codigo: '502',
              expansion: false,
            },
            {
              nombre:
                'Instituto de Seguridad y Servicios Sociales para los Trabajadores del Estado (ISSSTE)',
              codigo: '503',
              expansion: false,
            },
            {
              nombre:
                'Sistema Nacional para el Desarrollo Integral de la Familia (DIF)',
              codigo: '505',
              expansion: false,
            },
            {
              nombre: 'Institutos de Especialidades Médicas',
              codigo: '506',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Sector Educación',
          actividades: [
            {
              nombre: 'Secretaría de Educación Pública (SEP)',
              codigo: '601',
              expansion: false,
            },
            {
              nombre: 'Universidad Nacional Autónoma de México (UNAM)',
              codigo: '602',
              expansion: false,
            },
            {
              nombre: 'Universidad Autónoma Metropolitana (UAM)',
              codigo: '603',
              expansion: false,
            },
            {
              nombre: 'Colegio de Bachilleres',
              codigo: '604',
              expansion: false,
            },
            {
              nombre:
                'Instituto Nacional de la Infraestructura Física Educativa (INIFED)',
              codigo: '605',
              expansion: false,
            },
            {
              nombre:
                'Patronato de Obras e Instalaciones del Instituto, Politécnico Nacional (POI-IPN)',
              codigo: '606',
              expansion: false,
            },
            {
              nombre: 'Universidad Autónoma de Chapingo',
              codigo: '607',
              expansion: false,
            },
            {
              nombre: 'Otras Instituciones Públicas y Privadas',
              codigo: '608',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Sector Industria Comercio y Turismo',
          actividades: [
            {
              nombre: 'Pronósticos para la Asistencia Pública',
              codigo: '701',
              expansion: true,
            },
            {
              nombre: 'Lotería Nacional para la Asistencia Pública',
              codigo: '702',
              expansion: true,
            },
            {
              nombre: 'Sociedades Nacionales de Crédito',
              codigo: '703',
              expansion: true,
            },
            {
              nombre: 'Secretaría de Turismo (SECTUR)',
              codigo: '704',
              expansion: true,
            },
            {
              nombre: 'Fondo Nacional de Fomento al Turismo (FONATUR)',
              codigo: '705',
              expansion: true,
            },
            {
              nombre: 'Diconsa, Liconsa',
              codigo: '706',
              expansion: true,
            },
            {
              nombre: 'Otros del Sector Público Federal (especificar)',
              codigo: '707',
              expansion: true,
            },
          ],
        },
        {
          nombre: 'Sector Seguridad Pública',
          actividades: [
            {
              nombre: 'Secretaría de la Defensa Nacional (SEDENA)',
              codigo: '801',
              expansion: false,
            },
            {
              nombre:
                'Instituto de Seguridad Social para las Fuerzas Armadas Mexicanas (ISFAM)',
              codigo: '802',
              expansion: false,
            },
            {
              nombre: 'Procuraduría General de la República (PGR)',
              codigo: '803',
              expansion: false,
            },
            {
              nombre: 'Secretaría de Seguridad Pública (SSP)',
              codigo: '804',
              expansion: false,
            },
            {
              nombre: 'Consejo de la Judicatura Federal (CJF)',
              codigo: '805',
              expansion: false,
            },
            {
              nombre:
                'Tribunal Federal de Justicia Fiscal y Administrativa (TFJFA)',
              codigo: '806',
              expansion: false,
            },
          ],
        },

        {
          nombre: 'Gobiernos locales',
          actividades: [
            {
              nombre: 'Gobierno del Distrito Federal',
              codigo: '901',
              expansion: false,
            },
            {
              nombre: 'Gobiernos Estatales',
              codigo: '902',
              expansion: false,
            },
            {
              nombre: 'Gobiernos Municipales',
              codigo: '903',
              expansion: false,
            },
            {
              nombre: 'Gobiernos Municipales',
              codigo: '904',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Banca',
          actividades: [
            {
              nombre: 'Banca',
              codigo: '1001',
              expansion: false,
            },
            {
              nombre: 'Sociedades Financieras de Objeto Limitado (SOFOLES)',
              codigo: '1002',
              expansion: false,
            },
          ],
        },
        {
          nombre: 'Sector Privado',
          actividades: [
            {
              nombre: 'Obra Industrial',
              codigo: '2001',
              expansion: true,
            },
            {
              nombre: 'Obra Comercial',
              codigo: '2002',
              expansion: true,
            },
            {
              nombre: 'Obra Hotelera',
              codigo: '2003',
              expansion: true,
            },
            {
              nombre: 'Obra Residencial',
              codigo: '2004',
              expansion: true,
            },
            {
              nombre: 'Otros (especificar)',
              codigo: '2005',
              expansion: true,
            },
            {
              nombre: 'Obras en el Extranjero',
              codigo: '2006',
              expansion: true,
            },
          ],
        },
      ],
    },
  ];

  ListaDeIntereses: string[] = [
    'Licitaciones de obra pública.',
    'Oportunidades de negocio en obra privada.',
    'Fallos de obra pública como oportunidades de negocio.',
    'Financiamiento para empresas constructoras.',
    'Centro de estudios económicos del sector de la construcción.',
    'Asesoría jurídica de la normatividad,institucional.',
    'Subsidios para tecnologías de información y comunicación INADEM.',
    'Subsidios para formación y fortalecimiento de capacidades empresariales.',
    'Participación en eventos empresariales y de emprendimiento.',
    'Centro de ingeniería de costos.',
    'Corporativo de seguros y fianzas.',
    'Orientación al afiliado para la solución de problemas de orden legal, fiscal, laboral y/o de seguridad social.',
    'Convenios comerciales',
    'Orientación y gestión en trámites,relacionados con la vivienda.',
    'Capacitación.',
    'Maestrías.',
    'Especialidades.',
    'Diplomados.',
    'Cursos Virtuales.',
    'Licenciaturas.',
    'Certificación de competencias laborales.',
    'DNC. Diagnóstico de necesidades de capacitación.',
    'Consultoría en la formación de comisiones mixtas de capacitación.',
    'Consultoría en el desarrollo de programas de capacitación.',
  ];
}
