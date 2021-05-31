class Grid extends Component {
    constructor(obj_ini) {            
      super(obj_ini); // call the super class constructor       
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      //START INITIALIZE DESIGN
      this.obj_design.str_type="Grid";
      this.obj_design.str_tag="Grid";      
      if(this.obj_design.bln_split==undefined){this.obj_design.bln_split=false;}            
      this.fn_setContainer(true);
      
      if(this.obj_design.bln_eazygrid===undefined){this.obj_design.bln_eazygrid=true}      
      
      if(this.obj_design.str_minDim==undefined){this.obj_design.str_minDim="100px";}      
      if(this.obj_design.str_gridTemplateDefault==undefined){this.obj_design.str_gridTemplateDefault="minmax(" + this.obj_design.str_minDim + ", 1fr)";}
      //END  INITIALIZE DESIGN
      
      //START INITIALIZE STYLE        
      this.obj_domStyle.display="grid";
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="100%";}
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}
      if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="0px";}
      if(this.obj_domStyle.gridGap==undefined){this.obj_domStyle.gridGap="10px";}
      if(this.obj_domStyle.gridAutoRows==undefined){this.obj_domStyle.gridAutoRows=this.obj_design.str_gridTemplateDefault;}
      if(this.obj_domStyle.gridAutoColumns==undefined){this.obj_domStyle.gridAutoColumns=this.obj_design.str_gridTemplateDefault;}
      if(this.obj_domStyle.gridTemplateRows==undefined){this.obj_domStyle.gridTemplateRows=this.obj_design.str_gridTemplateDefault;}
      if(this.obj_domStyle.gridTemplateColumns==undefined){this.obj_domStyle.gridTemplateColumns=this.obj_design.str_gridTemplateDefault;}
      if(this.obj_domStyle.overflow==undefined){this.obj_domStyle.overflow="hidden";}
      //END INITIALIZE STYLE
    }     
    fn_initializePluginDesign(){
      this.obj_designDelegate=new DesignDelegateGrid(this);                        
    }
    
    fn_addItem(obj_ini){
      let obj_item;        
      if(obj_ini.obj_design.str_type==undefined){
        obj_ini.obj_design.str_type="GridItem";
      } 

      
      this.fn_setOrientation(obj_ini);
      obj_item=super.fn_addItem(obj_ini);

      this.fn_applyFeatures();
      return obj_item;
    }
    fn_setOrientation(obj_ini){ // now moved to grid
      if(this.obj_design.bln_split!==undefined){
          return;
        }
      if(obj_ini.obj_design.bln_split===undefined){
          return;
      }
      if (typeof obj_ini.obj_design.bln_split !== "boolean"){
          return;
      }
      this.obj_design.bln_split=obj_ini.obj_design.bln_split;
  }
    
    
    fn_getIsEmpty(){
      let arr, obj_item;
      arr=this.obj_design.arr_item;
      if(arr.length>1){
        console.log("arr.length>1")
        return false;
      }
      if(!arr.length){        
        return true;
      }
      obj_item=arr[0];
      if(obj_item.fn_getType()!=="GRIDITEM"){
        console.log("obj_item !==GRIDITEM")
        return false;
      }
      if(obj_item.obj_design.arr_item.length){
        console.log("(obj_item.obj_design.arr_item.length is true")
        return false;
      }
      return true;
    }
      
      
    
    fn_createChildren(){//only in boot/pallteItem phase

      let obj_ini;
      
      
      if(this.obj_design.bln_eazygrid){        
        
        obj_ini=new Holder;                     
        obj_ini.obj_domStyle.backgroundColor=obj_project.obj_theme.forgroundColor;                        
        //obj_ini.obj_domStyle.backgroundColor=obj_shared.fn_getRandomColor();                                
        this.fn_addItem(obj_ini);     
      
        obj_ini=new Holder;                     
        obj_ini.obj_domStyle.backgroundColor=obj_project.obj_theme.forgroundColor;                        
        //obj_ini.obj_domStyle.backgroundColor=obj_shared.fn_getRandomColor();                        
        this.fn_addItem(obj_ini);                
      }    
    }        
    
    fn_compileTemplate(){      

      this.obj_domStyle.gridTemplateRows=this.obj_design.str_gridTemplateDefault;
      this.obj_domStyle.gridTemplateColumns=this.obj_design.str_gridTemplateDefault;     

      if(this.obj_design.bln_split===undefined){
        return;
      }
      
      let obj_item;
      let s="";            
      this.obj_design.arr_item.forEach(obj_item => {                
        s+=obj_item.obj_design.gridTemplate;        
        s+=" ";
      });      
      s=s.trim();

      switch(this.obj_design.bln_split){
            case(true):
              this.obj_domStyle.gridTemplateColumns=s;              
            break;
            case(false):
              this.obj_domStyle.gridTemplateRows=s;
            break;
            default:              
      }      
      if(this.bln_debug){
        let s_debug;
        s_debug="fn_compileTemplate"  +"\n";        
        s_debug+="str_gridTemplateRows: " + this.obj_domStyle.gridTemplateRows  +"\n";
        s_debug+="str_gridTemplateColumns: " + this.obj_domStyle.gridTemplateColumns +"\n";
        //console.log(s_debug);        
      }      
    }
    
    fn_applyFeatures(){
      this.fn_compileTemplate();           
      super.fn_applyFeatures();      
    }    
    
}//END CLS
//END GRID