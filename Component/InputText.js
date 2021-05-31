class InputText extends Holder{
    constructor(obj_delegator) {                  
      super(obj_delegator); // call the super class constructor
      
      this.fn_initialize(obj_delegator);
    }    
    fn_initialize(obj_delegator){
      this.obj_delegator=obj_delegator;      

      this.obj_design.str_type="TEXT";
    }
    fn_onLoad(){
      this.obj_delegator.dom_obj.value=this.obj_delegator.str_value;
    }       
    fn_onChange(){      
      this.obj_delegator.str_value=this.obj_delegator.dom_obj.value;            
    }
    fn_applyTheme(){        
      
      this.obj_delegator.fn_setStyleAttribute("borderRadius", this.obj_delegator.obj_theme.borderRadius);          
      this.obj_delegator.fn_setStyleAttribute("backgroundColor", this.obj_delegator.obj_theme.forgroundColor);          
      this.obj_delegator.fn_setStyleAttribute("border", this.obj_delegator.obj_theme.forgroundColor);          
      this.obj_delegator.fn_setStyleAttribute("color", this.obj_delegator.obj_theme.highlightColor);          
      
    } 
}//END CLS
//END INPUTTEXT
