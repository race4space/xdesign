class Input extends Component {
    constructor(obj_ini) {      
      super(obj_ini);
    }        
    fn_initialize(obj_ini){
      if(obj_ini.bln_debugx){this.bln_debugx=true;}
      super.fn_initialize(obj_ini);

      this.obj_design.str_type="Input";
      this.obj_design.str_tag="Input";

      
      this.fn_addDelegateType(obj_ini);
      
      this.str_value=obj_ini.str_value;
      if(this.str_value===undefined){this.str_value=undefined;} 

      this.obj_design.bln_listenChange=true;

      this.fn_setContainer(true);      
      
  }   
  fn_addDelegateType(obj_ini){

    let str_sub_type=obj_ini.str_subType.toUpperCase();
    const dict = new Map([
        ['TEXT', InputText],           
    ]);
    try {
      this.obj_holder.obj_type = new (dict.get(str_sub_type))(this);
    }
    catch(err) {                        
        console.log("ERROR INPUT SUBTYPE: " + str_sub_type);
        return;
    }
  }  
  fn_onLoad(){    
    super.fn_onLoad();
    this.obj_holder.obj_type.fn_onLoad();    
  }
  
  fn_change(){           
    super.fn_change();
    this.obj_holder.obj_type.fn_onChange();                
    
  }
  fn_applyTheme(){ 
    super.fn_applyTheme();
    this.obj_holder.obj_type.fn_applyTheme();     
  } 
  
}//END CLS
//END INPUT
