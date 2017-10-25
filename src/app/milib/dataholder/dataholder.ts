


export class DataHolder {
    public static instance:DataHolder=new DataHolder();
    public nScreenWidth:number=0;
    public nScreenHeight:number=0;
    public nScreenWidth2:number=0;
    public nScreenHeight2:number=0;
    
    constructor(){
        this.initScreenSize();
        
    }
    
    public initScreenSize():void{
        
        var myWidth = 0, myHeight = 0;
          if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
          } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
          } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
          }

        this.nScreenWidth=myWidth*0.99;
        this.nScreenHeight=myHeight*0.96;
        this.nScreenWidth2=this.nScreenWidth>>1;
        this.nScreenHeight2=this.nScreenHeight>>1;
        
        //console.log("!!!!!!!!!!!!!----------->>>>>>>>>>>>>>>>>>>>> "+this.nScreenWidth);
    
    }
    
}