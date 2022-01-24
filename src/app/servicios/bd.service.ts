import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { TipoUsuario } from './tipo-usuario';
import { Usuario } from './usuario';
import { countReceta, FReceta, Home, Receta } from './receta'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Valoracion } from './valoracion';
import { Favorito, ListaFavorito} from './favorito';

@Injectable({
  providedIn: 'root'
})
export class BDService {

  public database: SQLiteObject;

  usuario = new BehaviorSubject([]);
  buscaru = new BehaviorSubject([]);
  buscR = new BehaviorSubject([]);
  recetasUsu = new BehaviorSubject([]);
  freceta = new BehaviorSubject([]);
  home1 = new BehaviorSubject([]);
  valoracion = new BehaviorSubject([]);
  count = new BehaviorSubject([]);
  favorito = new BehaviorSubject([]);
  favoritoLista = new BehaviorSubject([]);

  CTipoUsuario: string = "CREATE TABLE IF NOT EXISTS TipoUsuario(id_tipo_usu INTEGER PRIMARY KEY, nom_tipo_usu Varchar(20) NOT NULL);";
  CTipoReceta: string = "CREATE TABLE IF NOT EXISTS TipoReceta(id_tipo INTEGER PRIMARY KEY, tipo Varchar(20) NOT NULL);";
  CDificultad: string = "CREATE TABLE IF NOT EXISTS Dificultad(id_difi INTEGER PRIMARY KEY, dificultad Varchar(20) NOT NULL);";
  CUsuario: string = "CREATE TABLE IF NOT EXISTS Usuario(id_usu INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(30) NOT NULL, apellidos VARCHAR(30) NOT NULL, f_nacimiento DATE NOT NULL" +
    ", email VARCHAR(30) NOT NULL, contrasena VARCHAR(12) NOT NULL, id_tipo_usu INTEGER NOT NULL, imagen TEXT, FOREIGN KEY(id_tipo_usu) references TipoUsuario(id_tipo_usu));";
  CReceta: string = "CREATE TABLE IF NOT EXISTS Receta(id_receta INTEGER PRIMARY KEY autoincrement, nom_receta VARCHAR(30) NOT NULL, tiempo INTEGER NOT NULL, ingredientes TEXT NOT NULL" +
    ", preparacion TEXT NOT NULL, descripcion TEXT NOT NULL, id_difi INTEGER NOT NULL, id_tipo INTEGER NOT NULL, id_usu INTEGER NOT NULL" +
    ", FOREIGN KEY(id_difi) references Dificultad(id_difi), FOREIGN KEY(id_tipo) references TipoReceta(id_tipo), FOREIGN KEY(id_usu) references Usuario(id_usu));";
  CValoracion: string = "CREATE TABLE IF NOT EXISTS Valoracion(id_valor INTEGER PRIMARY KEY autoincrement, comentario VARCHAR(200) NOT NULL, fecha_valor DATE NOT NULL" +
    ", id_usu INTEGER NOT NULL, id_receta INTEGER NOT NULL, FOREIGN KEY(id_usu) references Usuario(id_usu),FOREIGN KEY(id_receta) references Receta(id_receta));";
  CFavorito: string = "CREATE TABLE IF NOT EXISTS Favorito(id_favo INTEGER PRIMARY KEY autoincrement, id_usu INTEGER NOT NULL, id_receta INTEGER NOT NULL" +
    ", FOREIGN KEY(id_usu) references Usuario(id_usu),FOREIGN KEY(id_receta) references Receta(id_receta));";

  rTipoUsuario1: string = "INSERT or IGNORE INTO TipoUsuario(id_tipo_usu, nom_tipo_usu) VALUES (1, 'Administrador');";
  rTipoUsuario2: string = "INSERT or IGNORE INTO TipoUsuario(id_tipo_usu, nom_tipo_usu) VALUES (2, 'Cliente');";

  rTipoReceta1: string = "INSERT or IGNORE INTO TipoReceta(id_tipo, tipo) VALUES (1, 'Desayuno');";
  rTipoReceta2: string = "INSERT or IGNORE INTO TipoReceta(id_tipo, tipo) VALUES (2, 'Ensalada');";
  rTipoReceta3: string = "INSERT or IGNORE INTO TipoReceta(id_tipo, tipo) VALUES (3, 'Almorzar');";
  rTipoReceta4: string = "INSERT or IGNORE INTO TipoReceta(id_tipo, tipo) VALUES (4, 'Postre');";

  rDificultad1: string = "INSERT or IGNORE INTO Dificultad(id_difi, dificultad) VALUES (1, 'Facil');";
  rDificultad2: string = "INSERT or IGNORE INTO Dificultad(id_difi, dificultad) VALUES (2, 'Medio');";
  rDificultad3: string = "INSERT or IGNORE INTO Dificultad(id_difi, dificultad) VALUES (3, 'Dificil');";

  insertUsuario: string = "INSERT or IGNORE INTO Usuario (id_usu, nombre, apellidos, f_nacimiento, email, contrasena, id_tipo_usu) VALUES (1, 'admin', 'X', '', 'admin', '1234', '1')"
  //insertPrueba: string = "INSERT or IGNORE INTO Receta(id_receta, nom_receta, tiempo, ingredientes, preparacion, descripcion, id_difi, id_tipo, id_usu) VALUES (1, 'POTATOES', 25, 'LISTAINGREDIENTES', 'HAGALOUSTEDMISMO' , 'SI', 1, 1, 4);";

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router, private sqlite: SQLite, private platform: Platform, public alertController: AlertController) {
    this.crearBD();
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'ZonaCocina.db',
        location: 'default'

      }).then((db: SQLiteObject) => {
        this.database = db;
        //this.presentAlert("BD Creada");
        this.crearTablas();
      }).catch(e => this.presentAlert(e));
    })

  }

  async crearTablas() {
    try {
      //creacion de tablas
      await this.database.executeSql(this.CTipoUsuario, []);
      await this.database.executeSql(this.CTipoReceta, []);
      await this.database.executeSql(this.CDificultad, []);
      await this.database.executeSql(this.CUsuario, []);
      await this.database.executeSql(this.CReceta, []);
      await this.database.executeSql(this.CValoracion, []);
      await this.database.executeSql(this.CFavorito, []);
      //datos respectivos al tipo de receta, tipo de usuario y dificultad de la receta
      await this.database.executeSql(this.rTipoUsuario1, []);
      await this.database.executeSql(this.rTipoUsuario2, []);
      await this.database.executeSql(this.rTipoReceta1, []);
      await this.database.executeSql(this.rTipoReceta2, []);
      await this.database.executeSql(this.rTipoReceta3, []);
      await this.database.executeSql(this.rTipoReceta4, []);
      await this.database.executeSql(this.rDificultad1, []);
      await this.database.executeSql(this.rDificultad2, []);
      await this.database.executeSql(this.rDificultad3, []);
      await this.database.executeSql(this.insertUsuario, []);
      //this.presentAlert("Creo la Tabla");
      this.buscarUsu();
      this.buscarRec();
      this.isDbReady.next(true);
      this.login("", "");
      this.recetasUsuario("");
      this.fichaReceta("");
      this.home();
    } catch (e) {
      this.presentAlert("error creartabla " + e);
    }
  }

  addUsuario(nombre, apellidos, f_nacimiento, email, contrasena, id_tipo_usu, imagen) {
    let data = [nombre, apellidos, f_nacimiento, email, contrasena, id_tipo_usu, imagen];
    return this.database.executeSql('INSERT INTO Usuario (nombre, apellidos, f_nacimiento, email, contrasena, id_tipo_usu, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)', data)
  }

  cambiarFavoritos(favorito, idUsuario, idReceta) {
    if (favorito) {
      let data = [idUsuario, idReceta];
      return this.database.executeSql('INSERT INTO favorito (id_usu, id_receta) VALUES (?, ?)', data).then(data2 => {
        this.traerFavoritos(idUsuario, idReceta);
      })
    } else {
      return this.database.executeSql('DELETE FROM favorito WHERE id_usu = ? AND id_receta = ?', [idUsuario, idReceta])
        .then(_ => {
          this.traerFavoritos(idUsuario, idReceta);
        });
    }
  }

  traerFavoritos(idUsuario, idReceta) {
    return this.database.executeSql('SELECT id_receta FROM favorito WHERE id_usu = ? AND id_receta = ?', [idUsuario, idReceta]).then(res => {
      let items: Favorito[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_receta: res.rows.item(i).id_receta,
          });
        }
      }
      this.favorito.next(items);
    });
  }

  traerFavoritosLista(idUsuario) {
    return this.database.executeSql('SELECT a.id_receta, a.nom_receta FROM receta AS a INNER JOIN favorito AS b ON a.id_receta=b.id_receta AND b.id_usu = ?', [idUsuario]).then(res => {
      let items: ListaFavorito[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_receta: res.rows.item(i).id_receta,
            nom_receta: res.rows.item(i).nom_receta,
          });
        }
      }
      this.favoritoLista.next(items);
    });
  }

  fetchFavoritosLista(): Observable<ListaFavorito[]> {
    return this.favoritoLista.asObservable();
  }

  fetchFavoritos(): Observable<Favorito[]> {
    return this.favorito.asObservable();
  }

  /*validarUsu(email, contrasena) {
    return this.database.executeSql('SELECT email, contrasena FROM Usuario;', []).then(res => {

      if (res.rows.length > 0) {
        this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          if (email == res.rows.item(i).email && contrasena == res.rows.item(i).contrasena) {
            this.router.navigate(['/folder/Inbox']);
            break;
          }
          else {
            this.presentAlert('El correo (y/o) la contraseña es incorrecta')
          }
        }
      }

    });
  }*/

  login(email, contrasena) {
    let data = [email, contrasena]
    return this.database.executeSql('SELECT * FROM Usuario WHERE email = ? AND contrasena = ? ;', [data[0], data[1]]).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usu: res.rows.item(i).id_usu,
            nombre: res.rows.item(i).nombre,
            apellidos: res.rows.item(i).apellidos,
            f_nacimiento: res.rows.item(i).f_nacimiento,
            email: res.rows.item(i).email,
            contrasena: res.rows.item(i).contrasena,
            id_tipo_usu: res.rows.item(i).id_tipo_usu,
            imagen: res.rows.item(i).imagen,
          });
        }
      }
      this.usuario.next(items);
    });
  }

  recetasUsuario(id) {
    return this.database.executeSql('SELECT * FROM Receta WHERE id_usu = ? ;', [id]).then(res => {
      let items: Receta[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_receta: res.rows.item(i).id_receta,
            nom_receta: res.rows.item(i).nom_receta,
            tiempo: res.rows.item(i).tiempo,
            ingredientes: res.rows.item(i).ingredientes,
            preparacion: res.rows.item(i).preparacion,
            descripcion: res.rows.item(i).descripcion,
            id_difi: res.rows.item(i).id_difi,
            id_tipo: res.rows.item(i).id_tipo,
            id_usu: res.rows.item(i).id_usu,
          });
        }
      }
      this.recetasUsu.next(items);
    });
  }

  fichaReceta(id) {
    return this.database.executeSql('SELECT * FROM Receta WHERE id_receta = ? ;', [id]).then(res => {
      let items: FReceta[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_receta: res.rows.item(i).id_receta,
            nom_receta: res.rows.item(i).nom_receta,
            tiempo: res.rows.item(i).tiempo,
            ingredientes: res.rows.item(i).ingredientes,
            preparacion: res.rows.item(i).preparacion,
            descripcion: res.rows.item(i).descripcion,
            id_difi: res.rows.item(i).id_difi,
            id_tipo: res.rows.item(i).id_tipo,
            id_usu: res.rows.item(i).id_usu,
          });
        }
      }
      this.freceta.next(items);
    });
  }

  listarComentarios(id) {
    return this.database.executeSql('SELECT a.id_valor, a.comentario, a.fecha_valor, a.id_usu, a.id_receta, b.nombre, b.apellidos, b.email, b.imagen FROM valoracion AS a INNER JOIN usuario AS b ON a.id_usu = b.id_usu AND a.id_receta = ? ORDER BY a.fecha_valor DESC', [id]).then(res => {
      let items: Valoracion[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_valor: res.rows.item(i).id_valor,
            comentario: res.rows.item(i).comentario,
            fecha_valor: res.rows.item(i).fecha_valor,
            id_usu: res.rows.item(i).id_usu,
            id_receta: res.rows.item(i).id_receta,
            nombre: res.rows.item(i).nombre,
            apellidos: res.rows.item(i).apellidos,
            email: res.rows.item(i).email,
            imagen: res.rows.item(i).imagen,
          });
        }
      }
      this.valoracion.next(items);
    });
  }

  addComentario(comentario, fecha_valor, id_usu, id_receta) {
    let data = [comentario, fecha_valor, id_usu, id_receta];
    return this.database.executeSql('INSERT INTO Valoracion (comentario, fecha_valor, id_usu, id_receta) VALUES (?, ?, ?, ?)', data).then(data2 => {
      this.listarComentarios(id_receta);
    })
  }

  deleteComentario(idComentario, idReceta) {
    return this.database.executeSql('DELETE FROM Valoracion WHERE id_valor = ?', [idComentario])
      .then(_ => {
        this.listarComentarios(idReceta);
      });
  }

  home() {
    return this.database.executeSql('SELECT a.id_receta, a.nom_receta, a.tiempo, a.ingredientes, a.preparacion, a.descripcion, a.id_difi, a.id_tipo, a.id_usu, b.nombre, b.apellidos, b.imagen FROM Receta AS a INNER JOIN usuario AS b ON b.id_usu = a.id_usu', []).then(res => {
      let items: Home[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_receta: res.rows.item(i).id_receta,
            nom_receta: res.rows.item(i).nom_receta,
            tiempo: res.rows.item(i).tiempo,
            ingredientes: res.rows.item(i).ingredientes,
            preparacion: res.rows.item(i).preparacion,
            descripcion: res.rows.item(i).descripcion,
            id_difi: res.rows.item(i).id_difi,
            id_tipo: res.rows.item(i).id_tipo,
            id_usu: res.rows.item(i).id_usu,
            nombre: res.rows.item(i).nombre,
            apellidos: res.rows.item(i).apellidos,
            imagen: res.rows.item(i).imagen
          });
        }
      }
      this.home1.next(items);
    });
  }

  countReceta(id) {
    return this.database.executeSql('SELECT COUNT(*) as CuentaRecetas, (SELECT COUNT(*) as CuentaComentarios FROM Valoracion WHERE id_usu = ?) as CuentaComentarios FROM Receta WHERE id_usu = ?;', [id, id]).then(res => {
      let items: countReceta[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            CuentaRecetas: res.rows.item(i).CuentaRecetas,
            CuentaComentarios: res.rows.item(i).CuentaComentarios,
          });
        }
      }
      this.count.next(items);
    });
  }

  setImagen(imagen, id, email, contrasena) {
    let data = [imagen, id];
    return this.database.executeSql('UPDATE usuario SET imagen = ? WHERE id_usu = ?', data).then(data2 => {
      this.login(email, contrasena);
    })
  }

  fetchCount(): Observable<countReceta[]> {
    return this.count.asObservable();
  }

  fetchHome(): Observable<Home[]> {
    return this.home1.asObservable();
  }

  fetchValoracion(): Observable<Valoracion[]> {
    return this.valoracion.asObservable();
  }

  fetchFRec(): Observable<FReceta[]> {
    return this.freceta.asObservable();
  }

  fetchRecUsua(): Observable<Receta[]> {
    return this.recetasUsu.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]> {
    return this.usuario.asObservable();
  }

  fetchbuscarU(): Observable<Usuario[]> {
    return this.buscaru.asObservable();
  }

  fetchbuscarR(): Observable<Usuario[]> {
    return this.buscR.asObservable();
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: mensaje,
      buttons: ['Cancel']
    });

    await alert.present();
  }

  buscarUsu() {
    return this.database.executeSql('SELECT * FROM Usuario;', []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usu: res.rows.item(i).id_usu,
            nombre: res.rows.item(i).nombre,
            apellidos: res.rows.item(i).apellidos,
            f_nacimiento: res.rows.item(i).f_nacimiento,
            email: res.rows.item(i).email,
            contrasena: res.rows.item(i).contrasena,
            id_tipo_usu: res.rows.item(i).id_tipo_usu,
            imagen: res.rows.item(i).imagen
          });
        }
      }
      this.buscaru.next(items);

    });
  }

  buscarRec() {
    return this.database.executeSql('SELECT * FROM Receta;', []).then(res => {
      let items: Receta[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_receta: res.rows.item(i).id_receta,
            nom_receta: res.rows.item(i).nom_receta,
            tiempo: res.rows.item(i).tiempo,
            ingredientes: res.rows.item(i).ingredientes,
            preparacion: res.rows.item(i).preparacion,
            descripcion: res.rows.item(i).descripcion,
            id_difi: res.rows.item(i).id_difi,
            id_tipo: res.rows.item(i).id_tipo,
            id_usu: res.rows.item(i).id_usu,
          });
        }
      }
      this.buscR.next(items);
    });
  }

  addReceta(nom_receta, tiempo, ingredientes, preparacion, descripcion, id_difi, id_tipo, id_usu) {
    let data = [nom_receta, tiempo, ingredientes, preparacion, descripcion, id_difi, id_tipo, id_usu];
    return this.database.executeSql('INSERT INTO Receta (nom_receta, tiempo, ingredientes, preparacion, descripcion, id_difi, id_tipo, id_usu) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', data).then(data2 => {
      this.recetasUsuario(id_usu);
    })
  }

  updateUsuario(nombre, apellidos, f_nacimiento, email, contrasena, id_usu) {
    let data = [nombre, apellidos, f_nacimiento, email, contrasena, id_usu];
    return this.database.executeSql('UPDATE usuario SET nombre = ?, apellidos = ?, f_nacimiento = ?, email = ?, contrasena = ? WHERE id_usu = ?', data).then(data2 => {
      this.login(email, contrasena);
    })
  }

  updatContrasena(email,contrasena, id_usu) {
    let data = [contrasena, id_usu];
    return this.database.executeSql('UPDATE usuario SET contrasena = ? WHERE id_usu = ?', data).then(data2 => {
      this.login(email, contrasena);
    })
  }

  updateReceta(nom_receta, tiempo, ingredientes, preparacion, descripcion, id_difi, id_tipo, id_receta, id_usu) {
    let data = [nom_receta, tiempo, ingredientes, preparacion, descripcion, id_difi, id_tipo, id_receta];
    return this.database.executeSql('UPDATE receta SET nom_receta = ?, tiempo = ?, ingredientes = ?, preparacion = ?, descripcion = ?, id_difi = ?, id_tipo = ? WHERE id_receta = ?', data)
      .then(data2 => {
        this.recetasUsuario(id_usu);
      })
  }

  deleteReceta(id, usuario) {
    return this.database.executeSql('DELETE FROM receta WHERE id_receta = ?', [id])
      .then(_ => {
        this.recetasUsuario(usuario);
      });
  }

  borrarUsu(id) {
    return this.database.executeSql('DELETE FROM usuario WHERE id_usu = ?', [id])
      .then(_ => {
        this.buscarUsu();
      });
  }

  borrarRec(id) {
    return this.database.executeSql('DELETE FROM receta WHERE id_receta = ?', [id])
      .then(_ => {
        this.buscarRec();
      });
  }


}

