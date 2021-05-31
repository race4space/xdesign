
class Holder extends LevelObject{  
    constructor() {      
      super();            
      this.int_modeReadOnly=1;       
      this.int_modeEdit=2;       
      this.int_modeRuntime=10;       

      this.obj_design={};   
      this.obj_domStyle={};   
      this.obj_domProperty={};         
      this.obj_domAttribute={};         
      this.obj_theme={};   

      this.obj_design.int_modeExecute=this.int_modeEdit;     
    } 
    
}
