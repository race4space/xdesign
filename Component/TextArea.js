class Textarea extends Component {
    constructor(obj_ini) {      
      super(obj_ini);        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);        

      this.obj_design.str_type="Textarea";            
      this.obj_design.str_tag="Textarea";      

      this.obj_design.bln_listenChange=true;
    }        
    fn_change(){                    
      obj_project.obj_projectEvent=this;             
      this.obj_design.str_content=this.dom_obj.value;                        
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
    
}//END CLS
//END TAG