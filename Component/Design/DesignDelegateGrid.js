class DesignDelegateGrid extends DesignDelegate{
    constructor(obj_delegator) {                  
        super(obj_delegator); // call the super class constructor        
        
    }        
    fn_setPaletteSelected(bln_maintainMap){      
        if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteSelected");return;}
        let obj_delegator=this.obj_delegator;
        super.fn_setPaletteSelected(bln_maintainMap);              
        obj_projectParent.obj_lastGrid=obj_delegator;      
    }    
    fn_removePaletteItem(obj_item){
        let obj_delegator=this.obj_delegator;
        console.log("fn_removePaletteItem")
        super.fn_removePaletteItem(obj_item);   
        obj_delegator.fn_applyFeatures();      
        obj_projectParent.obj_palettSelected.obj_designDelegate.fn_setPaletteSelected();
        if(!obj_delegator.obj_design.bln_eazygrid){
          console.log("obj_delegator.obj_design.bln_eazygrid is false")
          return;
        }
        
        if(!obj_delegator.fn_getIsEmpty()){
          console.log("this.fn_getIsEmpty is false")
          return;
        }
  
        //obj_delegator.obj_holder.obj_container.obj_delegator.fn_removePaletteItem(obj_delegator);//auto remove self empty grid
      }
    
}//END CLS