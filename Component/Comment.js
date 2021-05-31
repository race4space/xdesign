class Comment extends Tag {
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);        

    this.obj_design.str_type="Comment";      
    this.obj_design.str_tag="<!--";      
  }        
}//END CLS
//END TAG