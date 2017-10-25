import { Component, OnInit, ViewChild, ElementRef,NgZone } from '@angular/core';
import {Motor} from '../milib/engines/motor';
import {Panel} from '../milib/views/panels/panel';
import {Button} from '../milib/views/buttons/button';
import {DataHolder} from '../milib/dataholder/dataholder';
import {EventsAdmin,EventsAdminListener} from '../milib/events/eventsadmin';
import {Actividad1} from './actividad1';

@Component({
  selector: 'app-micanvas',
  templateUrl: './micanvas.component.html',
  styleUrls: ['./micanvas.component.css']
})
export class MicanvasComponent implements OnInit, EventsAdminListener{

    @ViewChild('mcnv') mcnv: ElementRef;
    
    private contexto: CanvasRenderingContext2D;
    private miMotor:Motor;
    private actividad1:Actividad1;

  constructor(private ngZone: NgZone) { 
    
  }

  ngOnInit() {
    DataHolder.instance.initScreenSize();
    EventsAdmin.instance.addListener(this);
    
    this.mcnv.nativeElement.width=DataHolder.instance.nScreenWidth;
    this.mcnv.nativeElement.height=DataHolder.instance.nScreenHeight;
    
    this.contexto=this.mcnv.nativeElement.getContext('2d');
    
    this.miMotor=new Motor(this.contexto,this.ngZone);
    this.miMotor.start();
    
    this.actividad1=new Actividad1(this.miMotor);
  }
  

  screenSizeChanged?(vWidth:number,vHeight:number):void{
    this.mcnv.nativeElement.width=DataHolder.instance.nScreenWidth;
    this.mcnv.nativeElement.height=DataHolder.instance.nScreenHeight;
  }

}
