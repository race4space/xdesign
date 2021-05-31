class Button extends Component {
    constructor(obj_ini) {      
      super(obj_ini);
    }    
    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      //START INITIALIZE DESIGN
      this.obj_design.str_type="Button";
      this.obj_design.str_tag="Button";      

      this.obj_design.bln_listenClick=true;    
      
      if(this.obj_domProperty.innerText===undefined){this.obj_domProperty.innerText="Button"}        

      this.fn_setContainer(false);
      
      //END INITIALIZE DESIGN
  
      //START INITIALIZE STYLE      
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="40px";}              
      if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="3px 12px";}      
      if(this.obj_domStyle.border===undefined){this.obj_domStyle.border="0px solid black";}                  
      if(this.obj_domStyle.color===undefined){this.obj_domStyle.color="black";}      
      if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="pointer";}
      if(this.obj_domStyle.marginRight===undefined){this.obj_domStyle.marginRight="3px";}
      if(this.obj_domStyle.marginBottom===undefined){this.obj_domStyle.marginBottom="3px";}        
      //END INITIALIZE STYLE            

      //this.obj_domProperty.disabled=false;
      
    }         
    fn_click(){          
      this.fn_event();                
    }
    fn_applyTheme(){ 
      super.fn_applyTheme();
      
      this.fn_setStyleAttribute("backgroundColor", this.obj_theme.forgroundColor);          

      let str_color=this.obj_theme.highlightColor;
      
      if(this.obj_domProperty.disabled){        
        str_color="gray";
      }            
      this.fn_setStyleAttribute("color", str_color); 
      
    }   
  fn_setDisabled(){    
    super.fn_setDisabled();
    this.fn_setStyleAttribute("color", this.obj_theme.forgroundColor);                  
  }  
  fn_parseHTMLContent(str_content=""){//Overide for base object
    
    
    this.fn_setDomAttribute("innerText", str_content);    

  }
}//END CLS
//END BUTTON
