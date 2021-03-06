/**
 * @author Eduardo Acevedo Farje.
 * @link: www.eduardoaf.com
 * @file index.js 
 * @version: 1.0.12
 * @name: 
 * @date: 05-04-2015 14:38 (SPAIN)
 * @observations: core library.
 *      Archivo principal. Equivalente a index.html
 * @repo: https://github.com/eacevedof/prj_nodejs/
 * @requires:
 */

//Variables globales
var _GET = null;
var _POST = null;

//IMPORTACIÓN DE MÓDULOS
//Main Node modules
var oHttp = require("http");
var oUrl = require("url");
//var oFs = require("fs");

//propios
global.oUtils = require("./the_framework/components/component_utils");
var oConfig = require("./the_framework/components/component_config");
var oServer = require("./the_framework/components/component_server");
var oDataBase = require("./the_framework/components/component_database");
var oHelperSelect = require("./the_framework/helpers/helper_select");
var oPage = require("./the_framework/views/theapplication_page");
//prueba sin constructor.
//@TODO Falta hacer prueba de funciton a(){} var b= new a(); var c=new a(); var b = a; var c=a; cual es la diferencia?
//creo que si no aplico el operador new todas las variables apuntan a "a".  Si cambio algo en c tambien se cambia en "a"
oPage = new oPage();
var oPageHead  = require("./the_framework/views/theapplication_page_head");
//var otf= require("./the_framework/main/the_framework");
var oMainHelper = require("./the_framework/main/theframework_helper");
var oMainView = require("./the_framework/main/theframework_view");
var oUser = require("./the_framework/models/model_user");

//Conecta a mongodb de MongoLab. Tendrá el metodo .query() y metodos CRUD
console.log("connect()");
oDataBase.connect();
oUser.set_database(oDataBase);
console.log("user.init()");
oUser.init();

oUtils.bugobj(oMainView,"oMainView");
//Configuro mi objeto servidor
//Objetos iniciales
oServer.set_objhttp(oHttp);
//oServer.set_objurl(oUrl);
//oServer.set_objfs(oFs);
//datos de escucha
oServer.set_ip(oConfig.get_ip());
oServer.set_port(oConfig.get_port());

//Esto devuelve un objeto vacio {}
//oUtils.bug(this,"this principal");
//Función que lee parametros get
//Nota: esta función tiene acceso a oUrl que no es el atributo de oServer sino la variable de módulo definida
//en este archivo. De aqui deduzco que, como todo lo que hay dentro de set_oncreateserer tiene visibilidad sobre
//las variables de este archivo sus argumentos tambien los tienen. Por lo tanto fn_oncreateserver puede trabajar
//con oUrl. @TODO Habría que hacer una prueba empirica
function fn_oncreatesever(oRequest,oResponse)
{ 
    _GET = oUrl.parse(oRequest.url,true).query;
    oUtils.bugobj(_GET,"_GET");
    var sHtml = _GET.module +", "+ _GET.id+", "+ _GET.id_foreign;
    oResponse.writeHead(200, {"Content-Type":"text/html"});
    
    var arOptions = [{"key1":"value1"},{"key2":"value2"},{"key3":"value3"}];
    oHelperSelect.set_id("UnId");
    oHelperSelect.set_name("aName");
    oHelperSelect.set_options(arOptions);
    sHtml += oHelperSelect.get_html();
    oPageHead.add_meta({"yo":"edu","soy":"unmeta"});
    oPage.set_head(oPageHead);
    oPage.set_body(oHelperSelect);
    oResponse.end(oPage.get_html());
}

oServer.set_oncreateserver(fn_oncreatesever);
//inicializa el servidor
oServer.init();

console.log(":0) Your NODE server is running at: "+oServer.get_ip()+":"+oServer.get_port());
console.log("Using processid:"+process.pid);
