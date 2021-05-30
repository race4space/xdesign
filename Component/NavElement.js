class NavElement extends Component {
    constructor(obj_ini) {      
      super(obj_ini);
    }    
    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      //START INITIALIZE DESIGN
      this.obj_design.str_type="Div";
      this.obj_design.str_tag="Div";

      this.obj_design.bln_listenClick=true;
      //END INITIALIZE DESIGN
  
      //START INITIALIZE STYLE      
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="10px";}              
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="10px";}              
      if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="10px";}                  
      if(this.obj_domStyle.margin===undefined){this.obj_domStyle.margin="10px";}              
      if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="pointer";}      
      //END INITIALIZE STYLE  
    }     
    fn_applyTheme(){
      super.fn_applyTheme();
      this.fn_setStyleAttribute("backgroundColor", this.obj_theme.lolightColor);          
      this.fn_setStyleAttribute("color", this.obj_theme.lolightColor);       
      this.fn_setStyleAttribute("borderRadius", "0px");                   
  }   
  fn_setDisabled(){    
    super.fn_setDisabled();        
    this.fn_setStyleAttribute("backgroundColor", this.obj_theme.forgroundColor);          
    this.fn_setStyleAttribute("color", this.obj_theme.forgroundColor);                      
  }
  fn_setInvisible(){        
    super.fn_setInvisible();        
    this.fn_setStyleAttribute("backgroundColor", this.obj_theme.backgroundColor);
  }
  fn_click(){
    this.fn_event();                
  }
  
}//END CLS
//END BUTTON
