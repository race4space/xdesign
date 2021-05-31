class Img extends Component {
    constructor(obj_ini) {      
      super(obj_ini);        
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);    
      
      //START INITIALIZE DESIGN
      this.obj_design.str_type="Img";      
      this.obj_design.str_tag="Img";  
      //END INITIALIZE DESIGN
      
      //START INITIALIZE DOM
      //if(this.obj_domProperty.src===undefined){this.obj_domProperty.src="/firefoxlogo.png";}
      if(this.obj_domAttribute.src===undefined){this.obj_domAttribute.src="/firefoxlogo.png";}
      //END INITIALIZE DOM
      
      //START INITIALIZE STYLE      
      //if(this.obj_domStyle.overflow===undefined){this.obj_domStyle.overflow="hidden";}
      if(this.obj_domStyle.verticalAlign===undefined){this.obj_domStyle.verticalAlign="bottom";}//eazyStyle
      //END  INITIALIZE STYLE  

      this.fn_setContainer(false);
  }    
}//END CLS
//END IMG
