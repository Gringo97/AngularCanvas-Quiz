import { View } from '../view';
import {Motor} from '../../engines/motor';


export class Imagen extends View{


    private imgBack: HTMLImageElement;
    private blImgLoaded:boolean=false;

    public initFinish():void{
        this.imgBack=new Image();
        this.imgBack.onload = (() => this.imageReady(this));//Unica forma de no perder el hilo central es enviar al que ejecuta la accion como parametro.
    }

    
    /**
     * Metodo que devuelve true en caso que la imagen se haya descargado correctamente
     */
    public isImgLoaded():boolean{
        return this.blImgLoaded;
    }
    

    /**
     * Setea la URL (RUTA) de la imagen para la imagen. EJEMPLO: './assets/btnsback/back1.png'
     * @param urlImg String con la ruta de la imagen.
     */
    public setImg(urlImg:string){
        this.imgBack.src=urlImg;
    }

    /**
     * Metodo que se ejecuta como un evento que notifica cuando la imagen se descarga correctamente
     */
    private imageReady(img_self:Imagen):void{
        this.blImgLoaded=true;
    }

    /**
     * Paint de la clase Imagen.
     * @param vctx Contexto para poder pintar la imagen.
     */
    paint(vctx:CanvasRenderingContext2D){
        
        if(this.blImgLoaded){
            vctx.drawImage(this.imgBack,this.xa,this.ya,this.w,this.h);
        }
    }

}