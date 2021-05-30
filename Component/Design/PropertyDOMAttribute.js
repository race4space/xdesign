  class PropertyDOMAttribute extends PropertySheetPaletteItem{
    constructor(obj_delegator) { 
      super(obj_delegator); // call the super class constructor      
    }    
    fn_initialize(obj_delegator){
      this.obj_design.str_name="DOM Attribute";//name is hard coded in ManagerProperty fn_validate
      this.obj_design.str_title="Attribute";//title can be changed
      super.fn_initialize(obj_delegator);
    }   
    
    fn_linkPaletteDomAttributeChange(){      
      
      let obj_itemEvent, obj_item, str_name, str_value;      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      str_value=obj_itemEvent.str_value;            
      obj_item.fn_setDomAttribute(str_name, str_value);                              
    }    
    fn_propertyDomAttributeChangeName(){    //appears to be defunct  
      let obj_itemEvent, obj_item, str_name, str_value;      
      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      let foo_value=obj_itemEvent.str_value;
      foo_value=obj_shared.fn_parseBool(foo_value);                  
      this.foo_propertyDomAttributeChangeName=foo_value;      
      this.fn_propertyDomAttributeChangeCheck(obj_item);            
    }
    fn_propertyDomAttributeChangeValue(){      
      let obj_itemEvent, obj_item, str_name, str_value;      
      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      let foo_value=obj_itemEvent.str_value;
      foo_value=obj_shared.fn_parseBool(foo_value);            
      this.foo_propertyDomAttributeChangeValue=foo_value;      
      this.fn_propertyDomAttributeChangeCheck(obj_item);            
    }
    fn_propertyDomAttributeChangeCheck(obj_item){
      let str_name, foo_value;
      str_name=this.foo_propertyDomAttributeChangeName;
      foo_value=this.foo_propertyDomAttributeChangeValue;      
      if(str_name===undefined){return;}
      if(foo_value===undefined){return;}
      obj_item.fn_setDomAttribute(str_name, foo_value);      
      return true;
    }
    fn_linkOperation(obj_arg){      

      let obj_selected=obj_arg.obj_item;

      if(!obj_selected){return;}

      if(!obj_selected.fn_isElement()){
        return;
      }

      let obj_container, obj_item, obj_ini, arr;
      let obj_table, obj_row, obj_cell;

      //if(!this.obj_flexSelectedHTMLDom){
        obj_ini=new Holder;                    
        obj_ini.obj_design.str_type="Flex";                  
        obj_ini.obj_domStyle.padding="5px";
        obj_ini.obj_domStyle.backgroundColor=this.obj_theme.backgroundColor;
        this.obj_flexSelectedHTMLDom=this.obj_flex.fn_addItem(obj_ini);               
      //}
      obj_container=this.obj_flexSelectedHTMLDom;
      
      
      //START PROPERTY SHEET
      obj_arg=new Holder;      
      obj_arg.obj_item=obj_selected;
      obj_arg.obj_container=obj_container;
      obj_arg.str_title="ATTRIBUTE";      
      obj_arg.obj_propertySheet=obj_selected.obj_domAttribute;      
      obj_arg.obj_design.str_nameEventChange=obj_project.obj_design.str_prefix + "myDesignerPalettePropertyOnChange";
      obj_arg.str_propertySourceChange="fn_propertyDomAttributeChange";            
      obj_arg.obj_design.str_valueEventChange="fn_linkPaletteDomAttributeChange";                  
      obj_arg.str_optionDOMDisplay="DOMAttribute";
      this.fn_displayPropertySheet(obj_arg);
      //END PROPERTY SHEET
    }        
    
    
    
    

}
//END MESSENGER
