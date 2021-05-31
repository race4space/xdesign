
class PropertySheetPaletteItem extends PropertySheet{
  constructor(obj_delegator) {  
        super(obj_delegator); // call the super class constructor                        
  } 
  fn_execute(obj_container){//boot only
    let obj_delegator=this.obj_delegator;        
    let obj_ini;    
    obj_ini=new Holder;
    obj_ini.obj_design.str_id=this.obj_design.str_IdAccordion;
    obj_ini.obj_design.str_type="Accordion";                 
    obj_ini.obj_theme=this.obj_theme;
    obj_ini.obj_design.str_name=this.obj_design.str_name;      
    this.obj_accordion=obj_container.fn_addItem(obj_ini);            
    this.fn_addItems();      
  }
  //START OBJECT COMPONENTS    
  fn_addItems(obj_container){//boot only

    let obj_accordion, obj_menuButton, obj_flex, obj_ini;
    obj_accordion=this.obj_accordion;

    //if ManagerDesigner/BootOptions is the main holder, remove children
    //Otherwise, Be sure to comment this out
    //obj_accordion.fn_removeChildren();//any default children          
    
    if(!obj_container){
      /*
      obj_ini=new Holder;        
      obj_ini.obj_domProperty.innerText=this.obj_design.str_title;
      obj_ini.obj_design.str_id=this.obj_design.str_IdMenuButton;
      obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;                  
      obj_ini.bln_isOpen=true;  
      obj_ini.obj_design.bln_isPinned=false;        
      obj_menuButton=obj_accordion.fn_addItem(obj_ini);                
      obj_container=obj_menuButton;
      //*/

      obj_ini=new Holder;        
      obj_ini.obj_domProperty.innerText=this.obj_design.str_title;
      obj_ini.obj_design.str_id=this.obj_design.str_IdMenuButton;            
      obj_ini.obj_design.str_variableName=this.obj_design.str_IdMenuButton;
      obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;            
      obj_ini.obj_design.str_name=this.obj_design.str_title;    
      obj_ini.obj_design.bln_hiddenPin=true;  
      obj_menuButton=obj_accordion.fn_addItem(obj_ini);     
      obj_container=obj_menuButton;    
      
      switch(this.obj_design.str_IdMenuButton){                          
        case "messenger-menu-button":            
          obj_project.obj_holder.obj_managerBootBuilder.obj_menuButtonMessenger=obj_menuButton;            
        break;        
        case "objectmap-menu-button":
          obj_project.obj_holder.obj_managerBootBuilder.obj_menuButtonObjectMap=obj_menuButton;
        break;
        case "domattribute-menu-button":
          obj_project.obj_holder.obj_managerBootBuilder.obj_menuButtonDomAttribute=obj_menuButton;
        break;
        case "domproperty-menu-button":
          obj_project.obj_holder.obj_managerBootBuilder.obj_menuButtonDomProperty=obj_menuButton;
        break;
        case "styleproperty-menu-button":
          obj_project.obj_holder.obj_managerBootBuilder.obj_menuButtonStyleProperty=obj_menuButton;
        break;
        case "designproperty-menu-button":
          obj_project.obj_holder.obj_managerBootBuilder.obj_menuButtonDesignProperty=obj_menuButton;
        break;
      }
    }//if false obj_menuButton Container

    obj_ini=new Holder;      
      obj_ini.obj_design.str_id=this.obj_design.str_IdFlex;      
      obj_ini.obj_design.str_type="Flex";       
      obj_ini.obj_design.str_name=this.obj_design.str_NameFlex;
      //obj_ini.obj_domStyle.backgroundColor=this.obj_theme.backgroundColor;
      obj_ini.obj_domStyle.backgroundColor="green";
      obj_ini.obj_domStyle.flexDirection="column";             
      obj_ini.obj_domStyle.color="#666666";          
      obj_ini.obj_design.str_content="";      
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_flex=obj_container.fn_addItem(obj_ini);

      
      switch(this.obj_design.str_IdFlex){                          
        case "messenger-menu-flex":            
          obj_project.obj_holder.obj_managerBootBuilder.obj_menuFlexMessenger=obj_flex;            
        break;        
        case "objectmap-menu-flex":
          obj_project.obj_holder.obj_managerBootBuilder.obj_menuFlexObjectMap=obj_flex;
        break;
        case "objectaction-menu-flex":
          obj_project.obj_holder.obj_managerBootBuilder.obj_menuFlexObjectAction=obj_flex;
        break;
        case "domattribute-menu-flex":
          obj_project.obj_holder.obj_managerBootBuilder.obj_menuFlexDomAttribute=obj_flex;
        break;
        case "domproperty-menu-flex":
          obj_project.obj_holder.obj_managerBootBuilder.obj_menuFlexDomProperty=obj_flex;
        break;
        case "styleproperty-menu-flex":
          obj_project.obj_holder.obj_managerBootBuilder.obj_menuFlexStyleProperty=obj_flex;
        break;
        case "designproperty-menu-flex":
          obj_project.obj_holder.obj_managerBootBuilder.obj_menuFlexDesignProperty=obj_flex;
        break;
        default:
          alert("Error PropertySheetPaletteItem Add Items Missing: " + this.obj_design.str_IdFlex)
        break;
      }
      
  
    
  
    //this.fn_containerOnLoad();
    return obj_menuButton;
  }   
  //END OBJECT COMPONENTS 
  
  //START OBJECT EVENTS
  fn_onPaletteItemSelected(){      

    
    if(!this.obj_flex){
      return;
    }
    this.obj_flex.fn_removeAllContent();      

    this.fn_actionLinkOperation();//split funciton to allow MAP not to removeContent form Flex in maintain map
  }
  fn_actionLinkOperation(){      
    let obj_selected=obj_project.obj_palettSelected;            
    
    let obj_arg=this.fn_cloneObject(obj_selected.obj_holder.obj_levelLimit);            
    obj_arg.obj_selected=obj_selected;          
    this.fn_linkOperation(obj_arg);      
  }
  fn_onPaletteItemDeSelected(){      
  }         
  //END OBJECT EVENTS
  
}//End Class