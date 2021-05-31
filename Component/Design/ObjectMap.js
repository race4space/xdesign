  class ObjectMap extends PropertySheetPaletteItem{
    constructor(obj_delegator) { 
      super(obj_delegator); // call the super class constructor      
    }    
    fn_initialize(obj_delegator){
      this.obj_design.str_name="Object Map";//name is hard coded in ManagerProperty fn_validate
      this.obj_design.str_title="Tag";//title can be changed
      super.fn_initialize(obj_delegator);
    }   
    fn_onPaletteItemSelected(){      

      if(!this.obj_flex){return;}
      //this.obj_flex.fn_removeAllContent();//n.b. if flex is cleared, maintain map wont work. So the super is split on  actionLinkOperation

      this.fn_actionLinkOperation();

      //this.obj_menuButton.fn_open();
      //this.obj_menuButton.obj_design.bln_isPinned=true;        
      //this.obj_menuButton.fn_openContainer();
      
    }
    fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
    }
    
    fn_moveObjectCompassHome(){//HOME
      let obj_item=obj_projectTarget;
      obj_item.obj_designDelegate.fn_setPaletteSelected();                        
    }        
    fn_moveObjectCompassHorizontal(){//HORIZONTAL
      let obj_item, int_index, obj_container, arr_item;      
      let obj_selected, obj_itemEvent, obj_itemOriginal, obj_target;      
      let bln_maintainMap=true;      
      
      obj_selected=obj_project.obj_palettSelected;//currently selected item
      obj_itemEvent=obj_project.obj_projectEvent;//button that was clicked      
      obj_itemOriginal=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);//item that the button is linked to                        

      obj_target=obj_selected;//keep here      
      
      if(obj_selected===obj_itemOriginal.obj_holder.obj_container){//parent, requesting sibling
        bln_maintainMap=false;//requested level is out of view, change map        
      }

      if(obj_selected===obj_itemOriginal){//currently selected, requesting sibling
        bln_maintainMap=false;//requested level is out of view, change map        
      }

      if(obj_selected.obj_holder.obj_container===obj_itemOriginal){//child requesting sibling
        bln_maintainMap=true;
      }
      
      obj_container=obj_project.obj_palettSelected.obj_holder.obj_container;        
      arr_item=obj_container.obj_design.arr_item;
      if(!obj_container){return};
      obj_item=obj_project.obj_palettSelected;
      int_index=obj_container.fn_findItemIndex(obj_item);
      if(int_index==arr_item.length-1){int_index=-1;}
      obj_item=arr_item[int_index+1];        
      obj_target=obj_item;

      if(bln_maintainMap){
        this.fn_clearObjectMapHighlight();
        this.fn_setObjectMapHighlight(obj_target); 
        this.fn_setNavElement(obj_target);             
      }      
      
      obj_target.obj_designDelegate.fn_setPaletteSelected(bln_maintainMap);                        
    }   
    fn_moveObjectCompassUp(){//UP
      let obj_selected, obj_itemEvent, obj_itemOriginal, obj_target, arr_item, obj_item;      
      let bln_maintainMap=true;
      
      obj_selected=obj_project.obj_palettSelected;//currently selected item
      obj_itemEvent=obj_project.obj_projectEvent;//navigation button that was clicked      
      obj_itemOriginal=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);//item that the button is linked to                        

      obj_target=obj_selected;//keep here      

      if(!obj_itemOriginal){
        obj_itemEvent.fn_debug("str_linkId:" + obj_itemEvent.obj_design.str_linkId);
      }
      
      if(obj_selected===obj_itemOriginal.obj_holder.obj_container){//parent, requesting parent                
        bln_maintainMap=false;//requested level is out of view, change map
        let obj_container=obj_selected.obj_holder.obj_container;
        if(obj_container){
          obj_target=obj_container;
        }        
      }

      if(obj_selected===obj_itemOriginal){//currently selected, requesting parent                
        obj_target=obj_selected.obj_holder.obj_container;
      }

      if(obj_selected.obj_holder.obj_container===obj_itemOriginal){//child requesting original selected              
        obj_target=obj_itemOriginal;
      }      

      if(bln_maintainMap){
        this.fn_clearObjectMapHighlight();
        this.fn_setObjectMapHighlight(obj_target); 
        this.fn_setNavElement(obj_target);             
      }      
      
      if(obj_target){
        if(obj_target.obj_designDelegate){
          obj_target.obj_designDelegate.fn_setPaletteSelected(bln_maintainMap);                        
        }
      }
    } 
    fn_moveObjectCompassDown(){//DOWN      
      let obj_selected, obj_itemEvent, obj_itemOriginal, obj_target, arr_item, obj_item;      
      let bln_maintainMap=true;
      
      obj_selected=obj_project.obj_palettSelected;//currently selected item
      obj_itemEvent=obj_project.obj_projectEvent;//button that was clicked      
      obj_itemOriginal=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);//item that the button is linked to                        

      obj_target=obj_selected;//keep here
      
      if(obj_selected===obj_itemOriginal.obj_holder.obj_container){//parent, requesting original selected
        obj_target=obj_itemOriginal;
      }

      if(obj_selected===obj_itemOriginal){//currently selected, requesting a child                
        obj_target=obj_selected.fn_getLastItem();
      }

      if(obj_selected.obj_holder.obj_container===obj_itemOriginal){//child, requesting a subchild        
        bln_maintainMap=false;//requested level is out of view, change map        
        obj_target=obj_selected.fn_getLastItem();  
      }      

      if(bln_maintainMap){
        this.fn_clearObjectMapHighlight();
        this.fn_setObjectMapHighlight(obj_target);        
        this.fn_setNavElement(obj_target);        
      }      
      
      if(obj_target.obj_designDelegate){
        obj_target.obj_designDelegate.fn_setPaletteSelected(bln_maintainMap);                        
      }
    } 
    
    fn_linkCompassItem(obj_target){      
      let obj_itemEvent;            
      

      //if(!this.bln_startMap){return;}

      this.fn_clearObjectMapHighlight();      

      if(!obj_target){
        obj_itemEvent=obj_project.obj_projectEvent;                             
        obj_target=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId); //locate the actual object via the link id                                 
      }

      if(!obj_target){
        alert("CHECK obj_target is false, obj_itemEvent.obj_design.str_linkId is undefined");
        return;
      }

      let bln_maintainMap=true;
      
      if(bln_maintainMap){
        this.fn_clearObjectMapHighlight();
        this.fn_setObjectMapHighlight(obj_target);        
        this.fn_setNavElement(obj_target);        
      }
      
      if(obj_target.obj_designDelegate){
        //console.log("fn_linkCompassItem")        
        //obj_target.obj_design.int_modeExecute=obj_target.obj_holder.int_modeEdit;
        obj_target.obj_designDelegate.fn_setPaletteSelected(bln_maintainMap);                        
      }

    }  

    fn_setNavElement(obj_target){
      
      if(!this.bln_startMap){return;}
      
      obj_target.fn_setLevelLimit();
      
      let obj_levelLimit=obj_target.obj_holder.obj_levelLimit;
      if(obj_levelLimit.bln_limitTop){            
        this.objNavElementTop.fn_setDisabled();
      }        
      else{
        this.objNavElementTop.fn_setEnabled();
      }
      if(obj_levelLimit.bln_limitLeft && obj_levelLimit.bln_limitRight){             
        this.objNavElementMiddle.fn_setDisabled();
      }        
      else{          
        this.objNavElementMiddle.fn_setEnabled();
      }

      if(obj_levelLimit.bln_limitBottom){             
        this.objNavElementBottom.fn_setDisabled();
      }        
      else{          
        this.objNavElementBottom.fn_setEnabled();
      }
        
    }        
    fn_clearObjectMapHighlight(){
      this.obj_objectMapTable.fn_setCellStyle("backgroundColor", this.obj_theme.backgroundColor);
    }    
    fn_setObjectMapHighlight(obj_target){
      
      let str_type="BUTTON";
      let obj_item=this.obj_objectMapTable.fn_locateItem(obj_target.obj_design.str_id, str_type);      
      
      if(obj_item){
        obj_item.obj_holder.obj_container.fn_setStyleAttribute("backgroundColor", this.obj_theme.lolightColor);      
      }
      return obj_item;
    }
    
    fn_linkOperation(obj_arg){

      let obj_container, obj_item, obj_ini, arr;
      let obj_table, obj_row, obj_cell;  
      let str_title;      
      
      if(obj_arg.obj_selected.obj_holder.bln_maintainMap){
        obj_arg.obj_selected.obj_holder.bln_maintainMap=false;        
        return;
      }

      this.obj_flex.fn_removeAllContent();  
      
      obj_ini=new Holder;                    
      obj_ini.obj_design.str_type="Flex";                  
      obj_ini.obj_domStyle.padding="5px";
      obj_ini.obj_domStyle.backgroundColor=this.obj_theme.backgroundColor;
      this.obj_flexObjectMap=this.obj_flex.fn_addItem(obj_ini);               
      
      obj_container=this.obj_flexObjectMap;
      
      obj_ini=new Holder;            
      obj_ini.obj_design.str_type="Table";                        
      //obj_ini.obj_domProperty.className="xDesignConsoleProperty";
      obj_table=obj_container.fn_addItem(obj_ini);      
      this.obj_objectMapTable=obj_table;             

      str_title="MAP"
      if(str_title){
        obj_row=obj_table.fn_addItem();
        obj_ini=new Holder;            
        obj_ini.obj_design.str_type="TableHeader";          
        obj_ini.obj_theme=this.obj_theme;
        obj_ini.obj_domProperty.colSpan=3;                        
        obj_ini.obj_domProperty.innerText=str_title;        
        obj_row.fn_addItem(obj_ini);    
        obj_row.fn_setStyleAttribute("textAlign", "left");      
      }
      
      obj_arg.obj_table=obj_table;          
      
      this.bln_startMap=false;
      if(obj_projectTarget){
        this.bln_startMap=obj_projectTarget.obj_design.arr_item.length        
      }
      
      //START LINK PARENT      
      if(this.bln_startMap){
        this.fn_getLevelParentObjectMap(obj_arg);      
      }
      //END LINK PARENT

      //START LINK SELF            
      this.fn_getLevelSelectedObjectMap(obj_arg);                
      //START LINK SELF

      //START LINK CHILDREN
      if(this.bln_startMap){
        this.fn_getLevelChildObjectMap(obj_arg);      
      }
      //END LINK CHILDREN      
      
    }        
    fn_getLevelParentObjectMap(obj_arg){
      
      let obj_selected=obj_arg.obj_selected;
      let obj_table=obj_arg.obj_table;      
      
      let obj_container, obj_ini, obj_item;
      let obj_row, obj_cell;      
        
      obj_row=obj_table.fn_addItem();         
      
      obj_ini=new Holder;                            
      obj_ini.obj_theme=this.obj_theme;            
      obj_cell=obj_row.fn_addItem(obj_ini);      
      obj_cell.fn_setStyleAttribute("backgroundColor", this.obj_theme.backgroundColor);                
      obj_container=obj_cell;          

      //ADD BUTTON TO VALUE CELL
      obj_ini=new Holder;
      obj_ini.obj_design.str_type="NavElement";//UP      
      obj_ini.obj_theme=this.obj_theme;      
      obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_id;                
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_moveObjectCompassUp";  
      obj_item=obj_container.fn_addItem(obj_ini);              
      if(obj_arg.bln_limitTop){obj_item.fn_setDisabled();}            
      this.objNavElementTop=obj_item;
      //ADD BUTTON TO VALUE CELL

      obj_ini=new Holder;                      
      obj_ini.obj_domProperty.colSpan=obj_selected.obj_design.arr_item.length;        
      obj_ini.obj_theme=this.obj_theme;
      obj_cell=obj_row.fn_addItem(obj_ini);          
      obj_cell.fn_setStyleAttribute("backgroundColor", this.obj_theme.backgroundColor);          
      obj_container=obj_cell;          

      let bln_isRoot=false;
      if(obj_selected.obj_holder.obj_container===obj_projectTarget){bln_isRoot=true;}
      if(obj_arg.bln_limitTop && !bln_isRoot){}
      else{
        obj_ini=new Holder;
        obj_ini.obj_theme=this.obj_theme;
        obj_ini.obj_design.str_type="Button";                       
        obj_ini.obj_design.str_linkId=obj_selected.obj_holder.obj_container.obj_design.str_id;
        obj_ini.obj_domProperty.innerText=obj_selected.obj_holder.obj_container.obj_design.str_type;//str_tag
        obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
        obj_ini.obj_design.str_valueEventClick="fn_linkCompassItem";
        obj_item=obj_container.fn_addItem(obj_ini);
      }
    }
    fn_getLevelSelectedObjectMap(obj_arg){
      
      let obj_selected=obj_arg.obj_selected;
      let obj_table=obj_arg.obj_table;            

      let obj_container, obj_item, obj_ini, arr_item, int_index;
      let obj_row, obj_cell;
      
      
      obj_row=obj_table.fn_addItem();      
      
      //START CREATE VALUE CELL
      obj_ini=new Holder;     
      obj_ini.obj_theme=this.obj_theme;                    
      obj_cell=obj_row.fn_addItem(obj_ini);                  
      obj_cell.fn_setStyleAttribute("backgroundColor", this.obj_theme.backgroundColor);                
      obj_container=obj_cell;          
      //END CREATE VALUE CELL

      //ADD BUTTON TO VALUE CELL
      obj_ini=new Holder;
      obj_ini.obj_design.str_type="NavElement";//UP      
      obj_ini.obj_theme=this.obj_theme;      
      obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_id;          
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_moveObjectCompassHorizontal";  
      obj_item=obj_container.fn_addItem(obj_ini);              
      if(obj_arg.bln_limitLeft && obj_arg.bln_limitRight){obj_item.fn_setDisabled();}
      this.objNavElementMiddle=obj_item;
      
      //START CREATE VALUE CELL
      obj_ini=new Holder;     
       obj_ini.obj_domProperty.colSpan=obj_selected.obj_design.arr_item.length;      
      obj_ini.obj_theme=this.obj_theme;      
      obj_cell=obj_row.fn_addItem(obj_ini);                      
      obj_cell.fn_setStyleAttribute("backgroundColor", this.obj_theme.lolightColor);          
      obj_container=obj_cell;          
      //END CREATE VALUE CELL
      
      //ADD BUTTON TO VALUE CELL
      obj_ini=new Holder;
      obj_ini.obj_design.str_type="Button";
      obj_ini.obj_domProperty.innerText=obj_selected.obj_design.str_type;//str_tag
      //obj_ini.obj_domProperty.innerText=obj_selected.obj_design.str_type;//SELF                
      //obj_ini.obj_domProperty.innerText=obj_selected.obj_design.str_id;                    
      obj_ini.obj_theme=this.obj_theme;        
      obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_id;          
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_linkCompassItem";
      obj_item=obj_container.fn_addItem(obj_ini);              
      //ADD BUTTON TO VALUE CELL
    }    
    fn_getLevelChildObjectMap(obj_arg){
      let obj_selected=obj_arg.obj_selected;
      let obj_table=obj_arg.obj_table;      

      let obj_container, obj_item, obj_ini;
      let obj_row, obj_cell;

      
      if(!obj_selected){return;}  

      obj_row=obj_table.fn_addItem();
      
      obj_ini=new Holder;                            
      obj_ini.obj_theme=this.obj_theme;      
      obj_cell=obj_row.fn_addItem(obj_ini);                
      obj_cell.fn_setStyleAttribute("backgroundColor", this.obj_theme.backgroundColor);                      
      obj_container=obj_cell;
      
      //ADD BUTTON TO VALUE CELL
      obj_ini=new Holder;
      obj_ini.obj_design.str_type="NavElement";//DOWN            
      obj_ini.obj_theme=this.obj_theme;
      obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_id;          
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_moveObjectCompassDown";  
      obj_item=obj_container.fn_addItem(obj_ini);              
      if(obj_arg.bln_limitBottom){obj_item.fn_setDisabled();}           
      this.objNavElementBottom=obj_item;
      

      let arr=obj_selected.obj_design.arr_item;       
      if(!arr.length){
        //START CREATE VALUE CELL
        obj_ini=new Holder;     
        obj_ini.obj_theme=this.obj_theme;                                           
        obj_cell=obj_row.fn_addItem(obj_ini);          
        obj_cell.fn_setStyleAttribute("backgroundColor", this.obj_theme.backgroundColor);          
        obj_container=obj_cell;          
        //END CREATE VALUE CELL
      }    
    
      for(let i=0;i<arr.length;i++){
        obj_item=arr[i];
        
        //START CREATE VALUE CELL
        obj_ini=new Holder;     
        obj_ini.obj_theme=this.obj_theme;                                   
        obj_cell=obj_row.fn_addItem(obj_ini);          
        obj_cell.fn_setStyleAttribute("backgroundColor", this.obj_theme.backgroundColor);          
        obj_container=obj_cell;          
        //END CREATE VALUE CELL              

        obj_ini=new Holder;
        obj_ini.obj_design.str_type="Button";
        obj_ini.obj_domProperty.innerText=obj_item.obj_design.str_type;//str_tag
        
        //obj_ini.obj_domProperty.innerText=obj_item.obj_design.str_type;                    
        //obj_ini.obj_domProperty.innerText=obj_item.obj_design.str_id;                    
        obj_ini.obj_theme=this.obj_theme;
        obj_ini.obj_design.str_linkId=obj_item.obj_design.str_id;          
        obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
        obj_ini.obj_design.str_valueEventClick="fn_linkCompassItem";  
        obj_container.fn_addItem(obj_ini);      
      }            
    }        

    
}
//END CLS
