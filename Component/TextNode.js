class TextNode extends Tag {
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);        

    this.obj_design.str_type="TextNode";      
    this.obj_design.str_tag="txt";      
  }        
}//END CLS
//END TAG