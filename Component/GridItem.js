  class GridItem extends Component {
    constructor(obj_ini) {
      super(obj_ini); // call the super class constructor
    }  
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      //START INITIALIZE DESIGN
      this.obj_design.str_type="GridItem";
      this.obj_design.str_tag="GridItem";            
      if(this.obj_design.str_name==undefined){this.obj_design.str_name="My Grid Item";}      
      this.fn_setContainer(true);

      if(this.obj_design.str_minDim==undefined){this.obj_design.str_minDim="100px";}      
      if(this.obj_design.gridTemplate==undefined){this.fn_setGridTemplate(1);}            
      
      //END  INITIALIZE DESIGN

      //START INITIALIZE STYLE                    
      //END INITIALIZE STYLE        
    }  
    fn_initializePluginDesign(){
      this.obj_designDelegate=new DesignDelegateGridItem(this);                        
    }
    fn_setGridTemplate(int_val){
      this.obj_design.gridTemplate="minmax(" + this.obj_design.str_minDim + ", "+int_val+"fr)";
    }    
    fn_setDesignAttribute(str_name, foo_value){
      super.fn_setDesignAttribute(str_name, foo_value);      
      if(this.obj_holder.obj_container){
        this.obj_holder.obj_container.fn_applyFeatures();
      }
      
    }                        
    
    
}//END CLS
//END GridItem