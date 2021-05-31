class DesignDelegateGridItem extends DesignDelegate{
    constructor(obj_delegator) {                  
        super(obj_delegator); // call the super class constructor        
        
    }        
    fn_setPaletteSelected(bln_maintainMap){ 
      if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteSelected");return;}     
      let obj_delegator=this.obj_delegator;
        super.fn_setPaletteSelected(bln_maintainMap);      
        obj_projectParent.obj_lastGrid=obj_delegator.obj_holder.obj_container;//not part of eazygrid      
      }        
    fn_addPaletteItem(obj_ini){//required                  
        let obj_delegator=this.obj_delegator;
        if(obj_delegator.obj_holder.obj_container.obj_design.bln_eazygrid){          
            switch(obj_ini.obj_design.str_type){
              case "Grid":
                obj_ini.obj_design.bln_split=obj_shared.fn_flipBool(obj_delegator.obj_holder.obj_container.obj_design.bln_split);
              break;      
            }
          }
        return super.fn_addPaletteItem(obj_ini);        
    }    
    
}//END CLS