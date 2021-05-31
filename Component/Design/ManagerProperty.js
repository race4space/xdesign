class ManagerProperty extends LevelObject{
    constructor(obj_delegator) {  
        super(); // call the super class constructor                
        this.obj_delegator=obj_delegator;
        
        obj_delegator.obj_holder.obj_managerMessenger=new ManagerMessenger(obj_delegator);                
        obj_delegator.obj_holder.obj_objectMap=new ObjectMap(obj_delegator);        
        obj_delegator.obj_holder.obj_objectAction=new ObjectAction(obj_delegator);        
        obj_delegator.obj_holder.obj_propertyDOMProperty=new PropertyDOMProperty(obj_delegator);
        obj_delegator.obj_holder.obj_propertyDOMAttribute=new PropertyDOMAttribute(obj_delegator);
        obj_delegator.obj_holder.obj_propertyDOMStyle=new PropertyDOMStyle(obj_delegator);                
        obj_delegator.obj_holder.obj_propertyDesign=new PropertyDesign(obj_delegator);                        
    }    
    fn_execute(obj_accordion){//can run only on boot, called by boot build
      let obj_menu, obj_menuButton;
      let obj_delegator=this.obj_delegator;      

      //this remains the same whether sections are in own or shared menubbutton.
      //in order to add to the same menu button, create a reference to the menu button returned from the "parent"manager additems function
      //then pass that menubutton to the additems function of the required child manager  additems function
      //also be sure to change the validate function below.
      //e.g 
      /*
      obj_menu=obj_delegator.obj_holder.obj_objectMap;
      obj_menu.obj_accordion=obj_accordion;
      obj_menuButton=obj_menu.fn_addItems();                        

      obj_menu=obj_delegator.obj_holder.obj_objectAction;
      obj_menu.obj_accordion=obj_accordion;
      obj_menu.fn_addItems(obj_menuButton);                        
      //*/
      
      obj_menu=obj_delegator.obj_holder.obj_managerMessenger;
      obj_menu.obj_accordion=obj_accordion;
      obj_menu.fn_addItems();      
      
      obj_menu=obj_delegator.obj_holder.obj_objectMap;
      obj_menu.obj_accordion=obj_accordion;
      obj_menuButton=obj_menu.fn_addItems();                        

      obj_menu=obj_delegator.obj_holder.obj_objectAction;
      obj_menu.obj_accordion=obj_accordion;
      obj_menu.fn_addItems(obj_menuButton);                        

      obj_menu=obj_delegator.obj_holder.obj_propertyDOMProperty;
      obj_menu.obj_accordion=obj_accordion;
      obj_menu.fn_addItems();                        

      obj_menu=obj_delegator.obj_holder.obj_propertyDOMAttribute;
      obj_menu.obj_accordion=obj_accordion;
      obj_menu.fn_addItems();                        

      obj_menu=obj_delegator.obj_holder.obj_propertyDOMStyle;
      obj_menu.obj_accordion=obj_accordion;
      obj_menu.fn_addItems();                        

      obj_menu=obj_delegator.obj_holder.obj_propertyDesign;
      obj_menu.obj_accordion=obj_accordion;
      obj_menu.fn_addItems();                        
    }
    fn_onLoad(){  
      //deprecated due to child items needing to load etc
      /*
      let obj_delegator=this.obj_delegator;      
      obj_delegator.obj_holder.obj_managerMessenger.fn_onLoad();
      obj_delegator.obj_holder.obj_objectMap.fn_onLoad();        
      obj_delegator.obj_holder.obj_objectAction.fn_onLoad();
      obj_delegator.obj_holder.obj_propertyDOMProperty.fn_onLoad();        
      obj_delegator.obj_holder.obj_propertyDOMAttribute.fn_onLoad();        
      obj_delegator.obj_holder.obj_propertyDOMStyle.fn_onLoad();        
      obj_delegator.obj_holder.obj_propertyDesign.fn_onLoad();              
      //*/
    }
    fn_onPaletteItemSelected(){
      let obj_delegator=this.obj_delegator;      
      obj_delegator.obj_holder.obj_managerMessenger.fn_onPaletteItemSelected();//Leave Last
      obj_delegator.obj_holder.obj_managerPalette.fn_onPaletteItemSelected();                    
      obj_delegator.obj_holder.obj_objectMap.fn_onPaletteItemSelected();            
      obj_delegator.obj_holder.obj_objectAction.fn_onPaletteItemSelected();            
      obj_delegator.obj_holder.obj_propertyDOMProperty.fn_onPaletteItemSelected();      
      obj_delegator.obj_holder.obj_propertyDOMAttribute.fn_onPaletteItemSelected();            
      obj_delegator.obj_holder.obj_propertyDOMStyle.fn_onPaletteItemSelected();            
      obj_delegator.obj_holder.obj_propertyDesign.fn_onPaletteItemSelected();            
    }
    fn_onPaletteItemDeSelected(){
      
      let obj_delegator=this.obj_delegator;      
      obj_delegator.obj_holder.obj_managerMessenger.fn_onPaletteItemDeSelected();      
      obj_delegator.obj_holder.obj_objectMap.fn_onPaletteItemDeSelected();      
      obj_delegator.obj_holder.obj_objectAction.fn_onPaletteItemDeSelected();      
      obj_delegator.obj_holder.obj_propertyDOMProperty.fn_onPaletteItemDeSelected();
      obj_delegator.obj_holder.obj_propertyDOMAttribute.fn_onPaletteItemDeSelected();      
      obj_delegator.obj_holder.obj_propertyDOMStyle.fn_onPaletteItemDeSelected();            
      obj_delegator.obj_holder.obj_propertyDesign.fn_onPaletteItemDeSelected();            
    }
    fn_linkCompassItem(obj_target){
      let obj_delegator=this.obj_delegator;
      return obj_delegator.obj_holder.obj_objectMap.fn_linkCompassItem(obj_target);
    }
    fn_clearOperation(){       
        let obj_delegator=this.obj_delegator;        
        obj_delegator.obj_holder.obj_managerMessenger.fn_clearOperation();
        obj_delegator.obj_holder.obj_objectMap.fn_clearOperation();
        obj_delegator.obj_holder.obj_objectAction.fn_clearOperation();        
        obj_delegator.obj_holder.obj_propertyDOMProperty.fn_clearOperation();
        obj_delegator.obj_holder.obj_propertyDOMAttribute.fn_clearOperation();
        obj_delegator.obj_holder.obj_propertyDOMStyle.fn_clearOperation();
        obj_delegator.obj_holder.obj_propertyDesign.fn_clearOperation();
      }      
      fn_validate(obj_item){
        let obj_delegator=this.obj_delegator;        
        let obj_inform;

        //in order to change form own to shared menu button, xout the own case below, and add to the shared button
        //e.g.
        /*
        case 'objectmap-menu-button':                            
            obj_inform=obj_delegator.obj_holder.obj_objectMap;
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();            
            
            //add to shared here
            obj_inform=obj_delegator.obj_holder.obj_objectAction;
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();
            
            break;
            //xout here:
            case 'xobjectaction-menu-button':                            
              obj_inform=obj_delegator.obj_holder.obj_objectAction;            
              obj_inform.obj_menuButton=obj_item;
              obj_inform.fn_containerOnLoad();            
            break;
        //*/

        switch(obj_item.obj_design.str_id){                    
          case 'messenger-menu-button':                            
            obj_inform=obj_delegator.obj_holder.obj_managerMessenger;
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();            
          break;
          case 'xobjectmap-menu-button':                                                  
            obj_inform=obj_delegator.obj_holder.obj_objectMap;
            obj_inform.obj_menuButton=obj_item;            
            obj_inform.fn_containerOnLoad();
            obj_inform=obj_delegator.obj_holder.obj_objectAction;
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();
            obj_inform=obj_delegator.obj_holder.obj_propertyDOMProperty;            
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();
            obj_inform=obj_delegator.obj_holder.obj_propertyDOMAttribute;
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();
            obj_inform=obj_delegator.obj_holder.obj_propertyDOMStyle;
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();            
            obj_inform=obj_delegator.obj_holder.obj_propertyDesign;
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();            
            
          break;                        
          case 'objectmap-menu-button':                            
            obj_inform=obj_delegator.obj_holder.obj_objectMap;
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();            

            //*
            obj_inform=obj_delegator.obj_holder.obj_objectAction;
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();
            //*/
          break;
          case 'xobjectaction-menu-button':                            
            obj_inform=obj_delegator.obj_holder.obj_objectAction;            
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();            
          break;
          case 'domattribute-menu-button':                            
          obj_inform=obj_delegator.obj_holder.obj_propertyDOMAttribute;
          obj_inform.obj_menuButton=obj_item;
          obj_inform.fn_containerOnLoad();
          break;
          case 'domproperty-menu-button':                            
            obj_inform=obj_delegator.obj_holder.obj_propertyDOMProperty;            
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();            
          break;
          case 'styleproperty-menu-button':                            
            obj_inform=obj_delegator.obj_holder.obj_propertyDOMStyle;
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();            
          break;
          case 'designproperty-menu-button':                            
            obj_inform=obj_delegator.obj_holder.obj_propertyDesign;
            obj_inform.obj_menuButton=obj_item;
            obj_inform.fn_containerOnLoad();            
          break;
          }
      }
      
      
}