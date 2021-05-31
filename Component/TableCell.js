class TableCell extends Component {
    constructor(obj_ini) {      
      super(obj_ini); // call the super class constructor        
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      this.obj_design.str_type="TableCell";      
      this.obj_design.str_tag="Td";      

      //START INITIALIZE DOM        
      //if(this.obj_domStyle.border===undefined){this.obj_domStyle.border="1px solid black";}                
      //END INITIALIZE DOM        
      
      //START INITIALIZE STYLE        
      //if(this.obj_domStyle.padding==undefined){this.obj_domStyle.padding="10px";}                   
    
      this.fn_setContainer(true);      
      //END INITIALIZE STYLE 
    }     
    fn_applyTheme(){        
      
      super.fn_applyTheme();      
      this.fn_setStyleAttribute("backgroundColor", this.obj_theme.forgroundColor);          
      this.fn_setStyleAttribute("color", this.obj_theme.highlightColor);          
      this.fn_setStyleAttribute("border", this.obj_theme.cellBorder);                
      this.fn_setStyleAttribute("padding", this.obj_theme.cellPadding);                
  } 
  fn_locateItem(str_id, str_type){
    let arr, obj_item;
    arr=this.obj_design.arr_item;
    for(let i=0;i<arr.length;i++){
        obj_item=arr[i];     
        
        if(obj_item.fn_getType()===str_type){
          if(obj_item.obj_design.str_id==str_id){
            return obj_item;
          }
          if(obj_item.obj_design.str_linkId==str_id){
            return obj_item;
          }
        }
    }
    return false;
  }  
}//END CLS
//END TABLECELL
