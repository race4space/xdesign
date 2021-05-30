class Tag extends Component{
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);        

    this.obj_design.str_type="Tag";      
    this.obj_design.str_tag=obj_ini.obj_design.str_tag;    
    if(this.obj_design.str_tag===undefined){
      alert("this.obj_design.str_tag===undefined")
      this.obj_design.str_tag="Tag";
    }

    if(this.obj_design.tagTitle!==undefined){
      alert(this.obj_design.tagTitle)
      this.obj_domProperty.innerText=this.obj_design.tagTitle;      
      this.obj_design.str_tag=this.obj_design.tagTitle;            
    }    
    this.fn_setContainer(obj_ini.obj_design.bln_container);
  }        

  //cannot call fn_click here this as otherwise the wrong "tag" will likely be set   

}//END CLS
//END TAG