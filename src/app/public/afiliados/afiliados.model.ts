export class AfiliadoModel {
  constructor(
    public datosGenerales: DatosGeneralesModel,
    public correspondencia: CorrespondenciaModel,
    public contacto: ContactoModel,
    public representateLegal: RepresentanteLegalModel,
    public director: DirectorModel,
    public autorizaciones: AutorizacionesModel,
  ){}
}

export class DatosGeneralesModel {
  constructor(
    public RFC: string,
    public fisica_nombre: string,
    public fisica_apellido_pat: string,
    public fisica_apellido_mat: string,
    public moral_nombre: string,
    public calle: string,
    public num_ext: string,
    public num_int: string,
    public colonia: string,
    public codigo_postal: string,
    public entidad_federativa: string,
    public municipio_alcaldia: string,

  )
  {}
}


export class CorrespondenciaModel {
  constructor(
    public addcorrespondencia: boolean,
    public calle: string,
    public num_ext: string,
    public num_int: string,
    public colonia: string,
    public codigo_postal: string,
    public entidad_federativa: string,
    public municipio_alcaldia: string,
  ){}
}

export class ContactoModel {
  constructor(
    public lada_telefono:string,
    public telefono:string,
    public lada_celular:string,
    public celular:string,
    public email:string,
    public pagina_web:string,
  ){}
}

export class RepresentanteLegalModel {
  constructor(
    public nombre:string,
    public apellido_pat:string,
    public apellido_mat:string,
    public titulo:string,
    public sexo:string,
    public fecha_nacimiento:string,
    public lada_telefono:string,
    public telefono:string,
    public lada_celular:string,
    public celular:string,
    public email:string,
    public director_igual_a_legal: boolean,
  ){}
}

export class DirectorModel {
  constructor(
    public nombre:string,
    public apellido_pat:string,
    public apellido_mat:string,
    public titulo:string,
    public sexo:string,
    public fecha_nacimiento:string,
    public lada_telefono:string,
    public telefono:string,
    public lada_celular:string,
    public celular:string,
    public email:string,
  ){}
}


export class AutorizacionesModel {
  constructor(
    public autoriza_aparezcan_en_directorios: boolean,
    public autoriza_retencion_para_capacitacion: boolean,
    public acepta_aviso_privacidad: boolean
  ){}
}
