

import {DataHolder} from '../dataholder/dataholder';
import {View} from '../views/view';

export class EventsAdmin {

    public static instance:EventsAdmin = new EventsAdmin();
    public arListeners=[];
    private blIsMouseClickRegistered:boolean=false;
    private arViewsForMouseClick=[];

    constructor(){
        window.addEventListener("resize",this.screenSizeResized);

    }

    /**
     * Metodo que agrega (o subsribe) a cualquier clase que implemente el EventsAdminListener en el array de subsriptores
     * para que luego pueda recibir notificaciones del EventsAdmin.
     * @param listener La clase que implementa el EventsAdminListener
     */
    public addListener(listener:EventsAdminListener):void{
        if(this.arListeners.indexOf(listener)==-1)
            this.arListeners.push(listener);
    }

    /**
     * Agrega un elemento visual View a la lista de views que detectan si les han pinchado con el Raton encima.
     * @param view View que queremos subscribir a las notificaciones de MouseClick
     */
    public addMouseClickToView(view:View):void{
        if(this.blIsMouseClickRegistered==false){
            this.blIsMouseClickRegistered=true;
            window.addEventListener("click",this.mouseClick);
        }

        if(this.arViewsForMouseClick.indexOf(view)==-1)
            this.arViewsForMouseClick.push(view);
    }

    /**
     * Metodo de tipo evento Javascript que se ejecutara cuando el Window detecto un MouseClick
     * @param e evento de tipo MouseEvent que recibe la informacion sobre la posicion donde el raton ha pinchado.
     */
    public mouseClick(e:MouseEvent){
        var vfin:View=null;
        //console.log("------>>>>");
        for(let i=0;i<EventsAdmin.instance.arViewsForMouseClick.length;i++){
            let vtemp:View=EventsAdmin.instance.arViewsForMouseClick[i];
            if(vtemp.checkPointInView(e.pageX,e.pageY) && vtemp.blVisible){
                vfin=vtemp;
            }
            //EventsAdmin.instance.arListeners[i].screenSizeChanged(
                //DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
         }
         if(vfin!=null)vfin.mouseClicked(e);
    }

    /**
     * Metodo de tipo evento Javascript que se ejecutara cuando el Window detecto un cambio del tamaño de pantalla.
     */
    private screenSizeResized():void{
        DataHolder.instance.initScreenSize();
        for(let i=0;i<EventsAdmin.instance.arListeners.length;i++){
           EventsAdmin.instance.arListeners[i].screenSizeChanged(
               DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        }
   }



}

/**
 * Clase de interface que se usa para las notificaciones de eventos del EventsAdmin.
 */
export interface EventsAdminListener{
    /**
     * Metodo que se llamara cuando EventsAdmin quiera notificar a los subscriptores que ha cambiado el tamaño de pantalla.
     */
    screenSizeChanged?(vWidth:number,vHeight:number):void;
   
}