  class PropertyDesign extends PropertySheetPaletteItem{
    constructor(obj_delegator) { 
      super(obj_delegator); // call the super class constructor      
    }        
    fn_initialize(obj_delegator){
      
      this.obj_design.str_name="Design Property";//name is hard coded in ManagerProperty fn_validate
      this.obj_design.str_title="Design";//title can be changed
      super.fn_initialize(obj_delegator);
    }   
    
    fn_linkPaletteDesignChange(){        
      
      let obj_itemEvent, obj_item, str_name, str_value;      
      obj_itemEvent=obj_project.obj_projectEvent;    
      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);                              
      str_name=obj_itemEvent.obj_design.str_name;
      str_value=obj_itemEvent.str_value;          
      obj_item.fn_setDesignAttribute(str_name, str_value);                  
    }
    fn_propertyDesignChangeName(){      
      let obj_itemEvent, obj_item, str_name, str_value;      
      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      let foo_value=obj_itemEvent.str_value;
      foo_value=obj_shared.fn_parseBool(foo_value);                  
      this.foo_propertyDesignChangeName=foo_value;      
      this.fn_propertyDesignChangeCheck(obj_item);            
    }
    fn_propertyDesignChangeValue(){      
      let obj_itemEvent, obj_item, str_name, str_value;      
      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      let foo_value=obj_itemEvent.str_value;
      foo_value=obj_shared.fn_parseBool(foo_value);            
      this.foo_propertyDesignChangeValue=foo_value;      
      this.fn_propertyDesignChangeCheck(obj_item);            
    }
    fn_propertyDesignChangeCheck(obj_item){
      let str_name, foo_value;
      str_name=this.foo_propertyDesignChangeName;
      foo_value=this.foo_propertyDesignChangeValue;      
      if(str_name===undefined){return;}
      if(foo_value===undefined){return;}
      obj_item.fn_setDesignAttribute(str_name, foo_value);      
      return true;
    }
    fn_linkOperation(obj_arg){         
        

      let obj_selected=obj_arg.obj_item;
     
      if(!obj_selected){return;}

      let obj_container, obj_ini;      

      //if(!this.obj_flexSelectedDesign){
        obj_ini=new Holder;                    
        obj_ini.obj_design.str_type="Flex";                  
        obj_ini.obj_domStyle.padding="5px";
        obj_ini.obj_domStyle.backgroundColor=this.obj_theme.backgroundColor;
        this.obj_flexSelectedDesign=this.obj_flex.fn_addItem(obj_ini);               
      //}

      obj_container=this.obj_flexSelectedDesign;
      
      //START PROPERTY SHEET
      obj_arg=new Holder;
      obj_arg.obj_item=obj_selected;
      obj_arg.obj_container=obj_container;
      obj_arg.str_title="DESIGN";
      obj_arg.obj_item=obj_selected;
      obj_arg.obj_propertySheet=obj_selected.obj_design;                  
      obj_arg.obj_design.str_nameEventChange=obj_project.obj_design.str_prefix + "myDesignerPalettePropertyOnChange";
      //obj_arg.str_propertySourceChange="fn_propertyDesignChange"; //DONT ADD A NEW NAME/VALUE ROW          
      obj_arg.obj_design.str_valueEventChange="fn_linkPaletteDesignChange";                        
      this.fn_displayPropertySheet(obj_arg);
      //END PROPERTY SHEET      
      
      
    }   
    
}
//END MESSENGER
