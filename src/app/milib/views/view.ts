import {Guid} from '../utils/guid';
import {Motor} from '../engines/motor';

export class View{

    public x:number;
    public y:number;
    public xa:number=0;
    public ya:number=0;
    public w:number;
    public h:number;
    public uid:string;
    public motor:Motor;
    public blVisible:boolean=true;

    /**
     * Constructor del motor.
     * @param vmotor Referencia al motor para poder usarlo en los hijos.
     * @param vX Posicion X RELATIVA
     * @param vY Posicion Y RELATIVA
     * @param vW Ancho del view
     * @param vH Alto del view
     */
    constructor(vmotor:Motor,vX:number,vY:number,vW:number,vH:number){
        this.x=vX;
        this.y=vY;
        this.w=vW;
        this.h=vH;
        this.motor=vmotor;
        this.uid=Guid.newGuid();
        this.initFinish();
    }
    
    /**
     * Metodo que se heredara por los hijos y sobreescribira para poder facilitar a los hijos agregar su propia configuracion
     * despues del contructor.
     */
    public initFinish():void{
    
    }
    
    /**
     * Metodo de pintado que se podra heredar por los hijos.
     * @param vctx 
     */
    paint(vctx:CanvasRenderingContext2D){
    
        
    }
    
    /**
     * Metodo que se ejecuta en cada ciclo del motor para actualizar el view.
     * @param vParent Recibe como parametro la referencia el View Padre de este View.
     */
    update(vParent:View){
        if(vParent!=null){
            this.xa=this.x+vParent.xa;
            this.ya=this.y+vParent.ya;
        }
    }

    /**
     * Metodo que fija el tamaño del View. (Ancho y Alto)
     * @param vWidth Ancho nuevo del view.
     * @param vHeight Alto nuevo del view.
     */
    public setSize(vWidth:number,vHeight:number):void{
            this.w=vWidth;
            this.h=vHeight;
    }

    public setPosition(vX:number,vY:number):void{
        this.x=vX;
        this.y=vY;
}

    /**
     * Metodo que revisa si el pixel en la posicion X e Y (px y py) se encuentran dentro del view. Metodo usado para detectar
     * si se pincho con el raton encima del View.
     * @param px Coordenada X
     * @param py Coordenada Y
     */
    public checkPointInView(px:number,py:number):boolean{
        var blret=false;
        if((this.xa < px) && (px < this.xa+this.w) && (this.ya<py) && (py<this.ya+this.h) && this.blVisible){
            blret=true;
        }
        return blret;
    }

    /**
     * Metodo que se llamara DESDE el EventsAdmin y que el hijo del view sobreescribira. Este metodo se llamara cuando el
     * EventsAdmin quiera notificar al View que hubo un mouseClicked en el View.
     * @param e 
     */
    public mouseClicked(e:MouseEvent):void{

    }

}