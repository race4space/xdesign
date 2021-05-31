class TableHeader extends TableCell {
    constructor(obj_ini) {      
      super(obj_ini); // call the super class constructor        
    }  
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);      

      this.obj_design.str_type="TableHeader";      
      this.obj_design.str_tag="Th"; 
      
      this.fn_setContainer(true);      
    }
    fn_applyTheme(){        
      super.fn_applyTheme();
      
      this.fn_setStyleAttribute("backgroundColor", "");          
      this.fn_setStyleAttribute("border", "");                
      //this.fn_setStyleAttribute("backgroundColor", this.obj_theme.headingBackgroundColor);                
      this.fn_setStyleAttribute("color", this.obj_theme.headingTextColor);          
  } 
    
}//END CLS