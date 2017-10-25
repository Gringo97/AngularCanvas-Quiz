import {View} from '../view';
import {Motor} from '../../engines/motor';

export class Label extends View{

    private sColor:string=null;
    private sTexto:string=null;

    private sFontStyle:string;
    private sFontColor:string='black';
    private sAlign:string= "center";
    private sBaseLine:string="top"; 
    private nXText:number=0;
    private nYText:number=0;
    
    constructor(vmotor:Motor,vX:number,vY:number,vW:number,vH:number){
        super(vmotor,vX,vY,vW,vH);
        this.setTextAttrs("center","middle");

    }

    /*public initFinish():void{
        this.setTextAttrs("center","middle");
    }*/

    /**
     * Setea el color de fondo de label
     * @param vsColor 
     */
    public setColor(vsColor:string):void{
        this.sColor=vsColor;
    }

    /**
     * Setea los atributos del label (alineado en el centro horizontal y centro vertical)
     * @param vsAlign Alineado en horizontal (left, center, right)
     * @param vsBaseLine Alineado en el vertical (top, middle, bottom)
     */
    public setTextAttrs(vsAlign:string,vsBaseLine:string):void{
        this.sAlign=vsAlign;
        this.sBaseLine=vsBaseLine;
        
        if(this.sAlign=="center"){
            this.nXText=(this.w>>1);
        }
        else if(this.sAlign=="right"){
            this.nXText=(this.w);
        }
        
        if(this.sBaseLine=="top"){
            this.nYText=0;
        }else if(this.sBaseLine=="middle"){
            this.nYText=(this.h>>1);
        }else if(this.sBaseLine=="bottom"){
            this.nYText=(this.h);
        }
         
    }

    /**
     * Setea el tipo de fuente de nuestra label.
     * @param vsFontStyle string con el valor de la fuente que vamos a usar. Ej: "30px Comic Sans MS"
     */
    public setFontStyle(vsFontStyle:string):void{
        this.sFontStyle=vsFontStyle;
    
    }
    
    /**
     * Setea el color de la fuente
     * @param vsFontColor El color de la fuente en formato string. Ej: #FF0000
     */
    public setFontColor(vsFontColor:string):void{
        this.sFontColor=vsFontColor;
    
    }
    
    /**
     * Paint del label. Primero revisa si hay un color asignado de fondo y lo pinta, luego si tiene texto asignado.
     * Luego setea el tipo de fuente en el contexto, el color de la fuente en el contexto, la alineacion de la fuente en el contexto
     * y la linea de base en el contexto. Por ultimo pinta el texto en el contexto.
     * @param vctx 
     */
    paint(vctx:CanvasRenderingContext2D){
        
    
        if(this.sColor!=null){
            vctx.fillStyle = this.sColor;  
            vctx.fillRect(this.xa, this.ya, this.w, this.h);
        }
        if(this.sTexto!=null){
            vctx.font = "16px STARWARS";
            //vctx.fillStyle ='#FF0000';
            //vctx.textBaseline='top';
            if(this.sFontStyle!=null)vctx.font = this.sFontStyle;
                
            vctx.fillStyle = this.sFontColor;
            vctx.textAlign = this.sAlign;
            vctx.textBaseline=this.sBaseLine;

            vctx.fillText(this.sTexto, this.xa+this.nXText, this.ya+this.nYText);
        }
    }
    
    /**
     * Setea el texto en el label.
     * @param vtexto El valor del string para asociar.
     */
    public setTexto(vtexto:string){
        this.sTexto=vtexto;
    }

    public setSize(vWidth:number,vHeight:number):void{
        super.setSize(vWidth,vHeight);
        this.setTextAttrs(this.sAlign,this.sBaseLine);
    }

}