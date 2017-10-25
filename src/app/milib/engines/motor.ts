import {Panel} from '../views/panels/panel';
import { View } from '../views/view';
import { NgZone } from '@angular/core';

export class Motor{

    private contexto: CanvasRenderingContext2D;
    private blStarted:boolean=false;

    private dictRelViews = new Map<string, [string]>();
    private sRootViewUID:string=null;
    private dictViews= new Map<string,View>();
    private ngZone: NgZone;


    /**
     * Constructor del motor. 
     * @param vctx Contexto en el cual se pintara usando el motor
     * @param vngZone ngZone que permite llamar al hilo independiente de PAINT
     */
    constructor(vctx:CanvasRenderingContext2D,vngZone: NgZone){
        this.contexto=vctx; 

        this.ngZone=vngZone;
    }
    
    /**
     * Metodo que permite crear el arbol jerarquico de Views. Se recibe un View Padre y un View hijo, y se asocian en un arbol
     * @param vParent View padre.
     * @param vChild View hijo.
     */
    public addViewToParentView(vParent:View,vChild:View):void{
        let archilds=this.dictRelViews[vParent.uid];
        if(archilds==undefined){
            archilds=Array();
        }
        if(archilds.indexOf(vChild.uid)==-1){
            archilds.push(vChild.uid);
            
        }
        this.dictRelViews[vParent.uid]=archilds;
        //if(this.sRootViewUID==null)this.sRootViewUID=vParent.uid;
        
        this.dictViews[vParent.uid]=vParent;
        this.dictViews[vChild.uid]=vChild;
    }
    
    /**
     * Metodo que setea la raiz del arbol para que podamos cambiar la view que usemos como raiz.
     * @param vRaiz View que queremos usar como Raiz de nuestro arbol.
     */
    public setRaiz(vRaiz:View):void{
        this.sRootViewUID=vRaiz.uid;
    }
    
    /**
     * Metodo que arranca el motor
     */
    public start():void{
        this.blStarted=true;
        requestAnimationFrame(() => this.cicle());
    
    }
    
    /**
     * Metodo que para el motor.
     */
    public stop():void{
        this.blStarted=false;
    
    }
    
    /**
     * Metodo que se ejecuta en cada ciclo de motor. Llama a Pintar (Paint) y a Actualizar (Update)
     */
    private cicle():void{
        if(this.sRootViewUID!=null){
        //console.log("AAAAAAAAAAAA");
            this.actualizar(this.sRootViewUID,null);
            this.ngZone.runOutsideAngular(() => this.pintar(this.sRootViewUID));
        }
        
        if(this.blStarted){
            requestAnimationFrame(() => this.cicle());
        }
        
    }
    
    
    /**
     * Metodo recursivo que recore el arbol de views y ejecuta los metodos de pintar de cada view.
     * @param vUid UID del primer view del arbol que vamos a pintar 
     */
    private pintar(vUid:string):void{
    
        let v:View=this.dictViews[vUid];
        if(v.blVisible){
            v.paint(this.contexto);
            let arChilds=this.dictRelViews[vUid];
            if(arChilds!=undefined){
                for(let i=0;i<arChilds.length;i++){
                    this.pintar(arChilds[i]);
                }
            }
        }
    
    }
    
    /**
     * Metodo recursivo que recore el arbol de views y ejecuta los metodos de update de cada view.
     * @param vUid UID del primer view del arbol que vamos a update 
     * @param vParent View del padre del view que se esta actualizando (Update).
     */
    private actualizar(vUid:string,vParent:View):void{
        let v:View=this.dictViews[vUid];
        v.update(vParent);
        let arChilds=this.dictRelViews[vUid];
        if(arChilds!=undefined){
            for(let i=0;i<arChilds.length;i++){
                this.actualizar(arChilds[i],v);
            }
        }
    }

    /**
     * Metodo recursivo que recore el arbol de views y pone visible o invisible todo los hijos del view que queremos
     * que pase a visible o invisible.
     * @param vUid UID del primer view del arbol que vamos a cambiar su visibilidad 
     * @param blVisible El estado de visibilidad que queremos setear a al View y sus hijos.
     */
    public setViewVisibility(vUid:string,blVisible:boolean):void{
        let v:View=this.dictViews[vUid];
        v.blVisible=blVisible;
        let arChilds=this.dictRelViews[vUid];
        if(arChilds!=undefined){
            for(let i=0;i<arChilds.length;i++){
                this.setViewVisibility(arChilds[i],blVisible);
            }
        }
    }

}