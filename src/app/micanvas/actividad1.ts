
import {Panel} from '../milib/views/panels/panel';
import {Label} from '../milib/views/labels/label';
import {Button, ButtonListener} from '../milib/views/buttons/button';
import {EventsAdmin, EventsAdminListener} from '../milib/events/eventsadmin';
import {DataHolder} from '../milib/dataholder/dataholder';
import {Motor} from '../milib/engines/motor';
import {Imagen} from '../milib/views/imgs/imagen';
import {Window} from '../milib/views/windows/window';




export class Actividad1 implements EventsAdminListener, ButtonListener {
    private motor: Motor;
    private panelMenu: Panel;
    private imgFondo: Imagen;
    
    //IMAGENES

    private imagenTrans: Imagen;
    
    //WINDOWS
    private window1: Window;
    private wGanar: Window;
    private wPerder: Imagen;
    
    //LABELS
    private lblPregunta: Label;
    
    //PREGUNTAS RESPUESTAS
    private indicePreguntas: number;
    private arrPr:Array<string>;
    private arrRes:Array<string[]>;
    private arrResOk:Array<number>;
    
    //BOTONES
    private btnEmpezar:Button;
    private btnContinuar:Button;
    private btnFin:Button;
    private btn1:Button;
    private btn2:Button;
    private btn3:Button;
    private btn4:Button;


    constructor(vMotor:Motor){
        this.motor=vMotor;
        this.imgFondo=new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.imgFondo.setImg('./assets/imgFondo.jpg');
        this.motor.setRaiz(this.imgFondo);
        EventsAdmin.instance.addListener(this);
        this.crearEscenarioMenu();
        this.crearEscenarioJuego();
    }
//-----------ESCENARIOS-----------


//ESCENARIO MENU
    private crearEscenarioMenu():void{
        let pmw=DataHolder.instance.nScreenWidth*0.6;
        let pmh=DataHolder.instance.nScreenHeight*0.6;
        let pmx=DataHolder.instance.nScreenWidth2-(pmw>>1);
        let pmy=DataHolder.instance.nScreenHeight2-(pmh>>1);

//-BOTON COMENZAR
        this.btnEmpezar = new Button(this.motor, this.imgFondo.w*0.333, this.imgFondo.w*0.12, this.imgFondo.w/5, this.imgFondo.w*0.05);
        this.btnEmpezar.setTexto("Empezar");
        this.btnEmpezar.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imgFondo,this.btnEmpezar);
        this.btnEmpezar.setListener(this);

//-BOTON CONTINUAR
        this.btnContinuar = new Button(this.motor,this.imgFondo.w*0.333,this.imgFondo.w*0.20,this.imgFondo.w/5,this.imgFondo.w*0.05);
        this.btnContinuar.setTexto("Continuar");
        this.btnContinuar.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imgFondo,this.btnContinuar);
        this.btnContinuar.setListener(this);
//-BOTON FIN
        this.btnFin = new Button(this.motor,this.imgFondo.w*0.333,this.imgFondo.w*0.28,this.imgFondo.w/5,this.imgFondo.w*0.05);
        this.btnFin.setTexto("Salir");
        this.btnFin.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imgFondo,this.btnFin);
        this.btnFin.setListener(this);       
    }
    
//ESCENARIO JUEGO
    
/*
Ayudado por Sergio Redondo
*/
    private crearEscenarioJuego():void{
//-ARRAY PREGUNTAS
        this.arrPr = [
            "¿STAR WARS:'UNA NUEVA ESPERANZA'CUÁNDO TUVO SU ESTRENO EN ESPAÑA?",
            "¿A QUÉ ESPECIE DE CRIATURA PERTENECE EL MAESTRO YODA?",
            "¿QUÉ LE CONTESTA HAN SOLO A LA PRINCESA LEIA CUANDO ÉSTA LE DICE QUE LE AMA?",
            "¿QUIÉN ES EL PADRE DE ANAKIN SKYWALKER/DARTH VADER?",
            "¿CUÁL ES LA PRIMERA NAVE REBELDE QUE APARECE EN LA PELÍCULA UNA NUEVA ESPERANZA?"
        ];
//-ARRAY RESPUESTAS
        this.arrRes = [
            ["23 de agosto de 1977","19 de octubre de 1977","7 de noviembre de 1977","11 de septiembre de 1977"],
            ["Es una raza desconocida","Es un Yaddle","Es un Gasgano","Es un duende"],
            ["Y yo a ti más","Lo sé","Yo tambien te amo","Me da igual"],
            ["Sólo George Lucas lo sabe","Un campesino de Tatooine","Jabba","El senador Palpatine/Darth Sidious"],
            ["El Halcón Milenario","Un Destructor de la República","El Tantive IV"," X-Wing"]
            
        ];
//-ARRAY RELACION PREGUNTAS-RESPUESTAS
        this.arrResOk = [2,0,1,3,2];
        this.indicePreguntas=0;
        
//-VENTANA Quiz
        this.window1= new Window(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.motor.addViewToParentView(this.imgFondo,this.window1);
        this.window1.btnSalir.setListener(this);

    //-Imagen transparente para tener como hijo a los botones, de esta manera ocultamos la imagen y podemos mostrar el window final de victoria o derrota
        this.imagenTrans =new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight);
        this.motor.addViewToParentView(this.window1,this.imagenTrans);

    //--PREGUNTA
            this.lblPregunta = new Label (this.motor,DataHolder.instance.nScreenWidth*0.1,DataHolder.instance.nScreenHeight*0.2,DataHolder.instance.nScreenWidth>>1.2,DataHolder.instance.nScreenHeight>>4);
            this.lblPregunta.setColor("Silver");
            this.lblPregunta.setTexto("Pregunta");
            this.motor.addViewToParentView(this.imagenTrans,this.lblPregunta);

        //-primera
            this.btn1 = new Button(this.motor,DataHolder.instance.nScreenWidth*0.22,DataHolder.instance.nScreenHeight*0.4,DataHolder.instance.nScreenWidth>>2.0,DataHolder.instance.nScreenHeight>>4);
            this.btn1.setTexto("Respuesta 1");
            this.btn1.setImagePath('./assets/botonMenu.png');
            this.motor.addViewToParentView(this.imagenTrans,this.btn1);
            this.btn1.setListener(this);

        //-segunda
            this.btn2 = new Button(this.motor,DataHolder.instance.nScreenWidth*0.220,DataHolder.instance.nScreenHeight*0.5,DataHolder.instance.nScreenWidth>>2.0,DataHolder.instance.nScreenHeight>>4);
            this.btn2.setTexto("Respuesta 2");
            this.btn2.setImagePath('./assets/botonMenu.png');
            this.motor.addViewToParentView(this.imagenTrans,this.btn2);
            this.btn2.setListener(this);

        //-tercera
            this.btn3 = new Button(this.motor,DataHolder.instance.nScreenWidth*0.22,DataHolder.instance.nScreenHeight*0.6,DataHolder.instance.nScreenWidth>>2.0,DataHolder.instance.nScreenHeight>>4);
            this.btn3.setTexto("Respuesta 3");
            this.btn3.setImagePath('./assets/botonMenu.png');
            this.motor.addViewToParentView(this.imagenTrans,this.btn3);
            this.btn3.setListener(this);

        //-cuarta
            this.btn4 = new Button(this.motor,DataHolder.instance.nScreenWidth*0.22,DataHolder.instance.nScreenHeight*0.7,DataHolder.instance.nScreenWidth>>2.0,DataHolder.instance.nScreenHeight>>4);
            this.btn4.setTexto("Respuesta 4");
            this.btn4.setImagePath('./assets/botonMenu.png');
            this.motor.addViewToParentView(this.imagenTrans,this.btn4);
            this.btn4.setListener(this);

        }
        
        
        

//ESCENARIO GANAR
    private crearEscenarioGanar():void{
        if(this.indicePreguntas>=this.arrPr.length){
            this.window1.setImagePath('./assets/FondoWin.jpg');
            this.motor.setViewVisibility(this.imagenTrans.uid, false);
            this.indicePreguntas = 0;
        }
        
    }

//ESCENARIO PERDER
    private crearEscenarioPerder():void{
        this.window1.setImagePath('./assets/fondoFin.jpg');
        this.motor.setViewVisibility(this.imagenTrans.uid, false);
        this.indicePreguntas = 0;
    }

//---------SCREEN RESIZE-----------



/*
Ayudado por Sergio Redondo
*/
    screenSizeChanged?(vWidth:number,vHeight:number):void{
//MENU
        this.imgFondo.setSize(DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.btnEmpezar.setSize(this.imgFondo.w/4,this.imgFondo.w*0.15);
        this.btnEmpezar.setPosition(this.imgFondo.w*0.7,this.imgFondo.w*0.12);
        this.btnContinuar.setSize(this.imgFondo.w/4,this.imgFondo.w*0.15);
        this.btnContinuar.setPosition(this.imgFondo.w*0.7,this.imgFondo.w*0.22);
        this.btnFin.setSize(this.imgFondo.w/4,this.imgFondo.w*0.15);
        this.btnFin.setPosition(this.imgFondo.w*0.7,this.imgFondo.w*0.32);
        

//JUEGO
        this.window1.setSize(DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.imagenTrans.setSize(DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.lblPregunta.setSize(DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.btn1.setSize(DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.btn2.setSize(DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.btn3.setSize(DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.btn4.setSize(DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
      }





//----------LISENER BUTTON -----------
      
      buttonListenerOnClick?(btn:Button):void{     
    //--MENU--    
        //-BOTON EMPEZAR
              if (this.btnEmpezar==btn) {
                    this.indicePreguntas=0;
                    this.window1.setImagePath("./assets/imgFondo.jpg");
                    this.motor.setViewVisibility(this.window1.uid,true);
                    this.setTextPreguntasRespuestas();

        //-BOTON CONTINUAR            
              }else if(this.btnContinuar==btn){
                    this.motor.setViewVisibility(this.window1.uid,true);
                    this.motor.setViewVisibility(this.imagenTrans.uid,true);
                    this.window1.setImagePath("./assets/imgFondo.jpg");
                    this.setTextPreguntasRespuestas();
        //-BOTON FIN               
               }else if(this.btnFin ==btn){
                    this.motor.setViewVisibility(this.window1.uid,false);
                    this.motor.setViewVisibility(this.imagenTrans.uid,false);
                    this.motor.setViewVisibility(this.btnEmpezar.uid,false);
                    this.motor.setViewVisibility(this.btnContinuar.uid,false);
                    this.motor.setViewVisibility(this.btnFin.uid,false);


    //--WINDOW--
        //-BOTON SALIR
              }else if (this.window1.btnSalir==btn) {
                    this.motor.setViewVisibility(this.window1.uid,false);
                    this.motor.setViewVisibility(this.imagenTrans.uid,false);

    //--QUIZ--
        //-BOTON1
              }else if (this.btn1==btn) {
                    if (this.btn1.texto === this.arrRes[this.indicePreguntas][this.arrResOk[this.indicePreguntas]]) {
                        this.indicePreguntas=this.indicePreguntas+1;
                        this.setTextPreguntasRespuestas();
                    }else{
                        this.crearEscenarioPerder();
                }
        //-BOTON2            
              }else if (this.btn2==btn) {
                    if (this.btn2.texto === this.arrRes[this.indicePreguntas][this.arrResOk[this.indicePreguntas]]) {
                    this.indicePreguntas=this.indicePreguntas+1;
                    this.setTextPreguntasRespuestas();
                }else{
                    this.crearEscenarioPerder();    
                }
        //-BOTON3          
            }else if (this.btn3==btn) {
                if (this.btn3.texto === this.arrRes[this.indicePreguntas][this.arrResOk[this.indicePreguntas]]) {
                    this.indicePreguntas=this.indicePreguntas+1;
                    this.setTextPreguntasRespuestas();     
                }else{
                    this.crearEscenarioPerder();
                }
        //-BOTON4            
            }else if (this.btn4==btn){
                if (this.btn4.texto === this.arrRes[this.indicePreguntas][this.arrResOk[this.indicePreguntas]]) {
                    this.indicePreguntas=this.indicePreguntas+1;
                    this.setTextPreguntasRespuestas();  
                }else{
                    this.crearEscenarioPerder();
                }
            }

          
      }
      
      
//SETTERS   
    
    
    private setTextPreguntasRespuestas():void{
        if(this.indicePreguntas >= this.arrPr.length){
            this.crearEscenarioGanar();
        }else{
            this.lblPregunta.setTexto(this.arrPr[this.indicePreguntas]); 
            for(var i = 0; i < this.arrRes[this.indicePreguntas].length; i++){
                if (i==0) {
                    this.btn1.setTexto(this.arrRes[this.indicePreguntas][i]); 
                }else if (i==1) {
                    this.btn2.setTexto(this.arrRes[this.indicePreguntas][i]);
                } else if(i==2){
                    this.btn3.setTexto(this.arrRes[this.indicePreguntas][i]);
                }else if(i==3){
                    this.btn4.setTexto(this.arrRes[this.indicePreguntas][i]);
                }
            }  
        }
    }
      
}



