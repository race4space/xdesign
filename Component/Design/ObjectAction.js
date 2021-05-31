  class ObjectAction extends PropertySheetPaletteItem{
    constructor(obj_delegator) { 
      super(obj_delegator); // call the super class constructor      
    }    
    fn_initialize(obj_delegator){
      this.obj_design.str_name="Object Action";//name is hard coded in ManagerProperty fn_validate
      this.obj_design.str_title="Object Action";//title can be changed
      super.fn_initialize(obj_delegator);
    }   
    fn_setGridSwitch(){
      
      let obj_grid=obj_project.obj_palettSelected;            
      obj_grid.obj_design.bln_split=obj_shared.fn_flipBool(obj_grid.obj_design.bln_split);    
      obj_grid.fn_compileTemplate();                              
      obj_grid.fn_applyFeatures();//required , or must go in base object additem                             
    }
    
    fn_getGridSwitch(obj_selected, obj_container){
      let obj_ini;
      //ADD BUTTON TO VALUE CELL
      obj_ini=new Holder;
      obj_ini.obj_design.str_type="Button";      
      //obj_ini.obj_domProperty.innerText="SPLIT " + obj_selected.obj_design.bln_split;          
      obj_ini.obj_theme=this.obj_theme;
      obj_ini.obj_domProperty.innerText="ROTATE";    
      obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_id;          
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_setGridSwitch";
      obj_container.fn_addItem(obj_ini);      
      //ADD BUTTON TO VALUE CELL
    }

    

    fn_linkOperation(obj_arg){
      
      let obj_container, obj_item, obj_ini, arr;
      let obj_table, obj_row, obj_cell;
      let str_title;

      let obj_selected=obj_arg.obj_item;      

      //if(!this.obj_flexObjectAction){        
        obj_ini=new Holder;                    
        obj_ini.obj_design.str_type="Flex";                  
        obj_ini.obj_domStyle.padding="5px";
        obj_ini.obj_domStyle.backgroundColor=this.obj_theme.backgroundColor;
        this.obj_flexObjectAction=this.obj_flex.fn_addItem(obj_ini);               
      //}
      obj_container=this.obj_flexObjectAction;

      if(!obj_selected){return;}      
      
      obj_ini=new Holder;            
      obj_ini.obj_design.str_type="Table";                              
      //obj_ini.obj_domProperty.className="xDesignConsoleProperty";
      obj_table=obj_container.fn_addItem(obj_ini); 
      
      str_title="ACTION"
      if(str_title){
        obj_row=obj_table.fn_addItem();
        obj_ini=new Holder;            
        obj_ini.obj_design.str_type="TableHeader";          
        obj_ini.obj_theme=this.obj_theme;
        obj_ini.obj_domProperty.colSpan=3;                        
        obj_ini.obj_domProperty.innerText=str_title;        
        obj_row.fn_addItem(obj_ini);    
      }

      obj_row=obj_table.fn_addItem();
      

      //*
      obj_ini=new Holder;  
      obj_ini.obj_theme=this.obj_theme;
      obj_cell=obj_row.fn_addItem(obj_ini);          
      obj_cell.fn_setStyleAttribute("backgroundColor", this.obj_theme.backgroundColor);          
      obj_container=obj_cell;          
      //*/

      //ADD BUTTON TO VALUE CELL
      if(obj_selected.bln_isComponent){
        if(obj_selected.obj_design.int_modeExecute==obj_holder.int_modeEdit || obj_selected.obj_design.int_idRecord===0){
        //*
        obj_ini=new Holder;
        obj_ini.obj_design.str_type="Button";
        obj_ini.obj_domProperty.innerText="Save";          
        obj_ini.obj_theme=this.obj_theme;
        obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_id;    
        //obj_ini.obj_domProperty.disabled=true;    
        obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
        obj_ini.obj_design.str_valueEventClick="fn_savePaletteSelected";  
        obj_item=obj_container.fn_addItem(obj_ini);   
        //*/
        }
      } 
      //ADD BUTTON TO VALUE CELL

      //ADD BUTTON TO VALUE CELL
      obj_ini=new Holder;
      obj_ini.obj_design.str_type="Button";
      obj_ini.obj_domProperty.innerText="Remove";          
      obj_ini.obj_theme=this.obj_theme;
      obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_id;    
      //obj_ini.obj_domProperty.disabled=true;    
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_removePaletteItem";  
      obj_item=obj_container.fn_addItem(obj_ini);   
      //ADD BUTTON TO VALUE CELL

      //ADD BUTTON TO VALUE CELL
      obj_ini=new Holder;
      obj_ini.obj_design.str_type="Button";
      obj_ini.obj_domProperty.innerText="View HTML";          
      obj_ini.obj_theme=this.obj_theme;
      obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_id;    
      //obj_ini.obj_domProperty.disabled=true;    
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_viewSelectedHTML";  
      obj_container.fn_addItem(obj_ini);      
      //ADD BUTTON TO VALUE CELL

      //*
      switch(obj_selected.obj_design.str_type.toUpperCase()){
        case "GRID":
          this.fn_getGridSwitch(obj_selected, obj_container);
          break;
      }
      //*/
    }     
}
//END CLS
