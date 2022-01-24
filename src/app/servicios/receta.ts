export class Receta {
    id_receta:Number;
    nom_receta:String;
    tiempo:Number;
    ingredientes:String;
    preparacion:String;
    descripcion:String;
    id_difi:Number;
    id_tipo:Number;
    id_usu:Number;
}

export class FReceta {
    id_receta:Number;
    nom_receta:String;
    tiempo:Number;
    ingredientes:String;
    preparacion:String;
    descripcion:String;
    id_difi:Number;
    id_tipo:Number;
    id_usu:Number;
}

export class Home {
    id_receta:Number;
    nom_receta:String;
    tiempo:Number;
    ingredientes:String;
    preparacion:String;
    descripcion:String;
    id_difi:Number;
    id_tipo:Number;
    id_usu:Number;
    nombre:String;
    apellidos:String;
    imagen:String;
}

export class countReceta {
    CuentaRecetas:Number;
    CuentaComentarios:Number;
}