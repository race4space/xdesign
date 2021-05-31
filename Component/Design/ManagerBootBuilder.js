//START BootBuilder
class ManagerBootBuilder extends Holder{
  constructor(obj_delegator) {                  
    super(obj_delegator); // call the super class constructor
    
    this.fn_initialize(obj_delegator);

    
    this.obj_theme=this.fn_cloneObject(this.obj_delegator.obj_theme);
        
  }    
  fn_initialize(obj_delegator){
    this.obj_delegator=obj_delegator;
  }       
  
  fn_execute(){

    let obj_delegator=this.obj_delegator;       
    
    //obj_delegator.fn_deleteInstance();
      
      let obj_ini, obj_grid, obj_flex;    
      
      let obj_container, obj_accordion, obj_manager, obj_designFile;                  
      
      let bln_eazygrid=false;//turn off bln_eazygrid for build
      
      
      //*
      //create data component
      obj_ini=new Holder;      
      obj_ini.obj_design.str_id="designFile";
      obj_ini.obj_design.str_variableName="designFile";
      obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;            
      obj_ini.obj_design.str_name=obj_delegator.obj_design.FileName;
      obj_ini.obj_design.str_type="DesignFile";                        
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_designFile=obj_delegator.fn_addItem(obj_ini);                    
      this.obj_designFile=obj_designFile;            
      //create data component
      //*/

      //START ADD GRID
      obj_ini=new Holder;      
      obj_ini.obj_design.str_id="control-grid-main";
      obj_ini.obj_design.str_variableName="gridMain";
      obj_ini.obj_design.str_name="My Design Grid Main";
      obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;
      obj_ini.obj_design.str_type="Grid";
      obj_ini.obj_design.bln_split=true;//COLUMNS                   
      obj_ini.obj_design.str_gridTemplateDefault="minmax(800px, 1fr)";
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_ini.obj_design.bln_eazygrid=bln_eazygrid;      
      obj_ini.obj_iniItemDefault=new Holder;                  
      this.obj_gridMain=obj_delegator.fn_addItem(obj_ini);
      //END ADD GRID
      
      if(bln_eazygrid){        
        this.obj_gridItemPad=this.obj_gridMain.obj_design.arr_item[0];
        this.obj_gridItemPanel=this.obj_gridMain.obj_design.arr_item[1];
      }
      
      //START ITEMPAD
      if(!bln_eazygrid){
        //START ADD GRIDITEM              
        obj_ini=new Holder;
        obj_ini.obj_design.str_id="control-griditem-pad";    
        obj_ini.obj_design.str_variableName="gridItemPad";
        obj_ini.obj_design.str_name="My Design GridItem Pad";
        obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;
        obj_ini.obj_design.bln_split=true;
        obj_ini.obj_domStyle.backgroundColor="orange";
        obj_ini.obj_design.bln_hiddenPin=true;
        this.obj_gridItemPad=this.obj_gridMain.fn_addItem(obj_ini);  
        //END ADD GRIDITEM
      }      
      this.obj_gridItemPad.fn_setGridTemplate(1.75);    
      

      //START ADD FLEX
      obj_ini=new Holder;
      obj_ini.obj_design.str_id="control-flex-pad";//this is the FLEX into which the ProjectInstance is contained
      obj_ini.obj_design.str_variableName="flexPad";
      obj_ini.obj_design.str_name="flexPad";
      obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;            
      obj_ini.obj_design.str_type="Flex";//FLEX
      obj_ini.obj_domStyle.padding="0px";
      obj_ini.obj_domStyle.border="10px outset grey";            
      obj_ini.obj_domStyle.backgroundColor=this.obj_theme.backgroundColor;
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_flex=this.obj_gridItemPad.fn_addItem(obj_ini);            
      this.obj_flexPad=obj_flex;            
      //END ADD FLEX
      //*
      obj_ini=new Holder;
      obj_ini.obj_design.str_id="flexPadIframe";//this is the FLEX into which the ProjectInstance is contained
      obj_ini.obj_design.str_variableName="flexPadIframe";
      obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;            
      obj_ini.obj_design.str_type="Tag";//FLEX      
      obj_ini.obj_design.str_tag="IFRAME";//FLEX                  
      obj_ini.obj_design.str_name="My Design Iframe";
      obj_ini.obj_design.bln_hiddenPin=true;
      this.obj_flexPadIframe=this.obj_flexPad.fn_addItem(obj_ini);               
      this.obj_flexPadIframe.fn_setStyleAttribute("height", "100%");
      this.obj_flexPadIframe.fn_setStyleAttribute("width", "100%");           
      this.obj_flexPadIframe.fn_setDomAttribute("name", "xdesign-target");                  
      //*/
      //END ITEMPAD

      //START CONTROL PANEL
      if(!bln_eazygrid){
        //START ADD GRIDITEM
        obj_ini=new Holder;
        obj_ini.obj_design.str_id="control-griditem-panel";    
        obj_ini.obj_design.str_variableName="gridItemPanel";
        obj_ini.obj_design.str_name="My Design GridItem Panel";
        obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;
        obj_ini.obj_design.bln_split=true;
        obj_ini.obj_domStyle.backgroundColor="pink";
        obj_ini.obj_design.bln_hiddenPin=true;
        this.obj_gridItemPanel=this.obj_gridMain.fn_addItem(obj_ini);            
        //END ADD GRIDITEM        
      }      
      //START ADD FLEX
      obj_ini=new Holder;
      obj_ini.obj_design.str_id="control-flex-panel";//this is the FLEX into which Application Menus etc are contained    
      obj_ini.obj_design.str_variableName="flexControlPanel";
      obj_ini.obj_design.str_name="flexControlPanel";
      obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;            
      obj_ini.obj_design.str_type="Flex";      
      obj_ini.obj_domStyle.backgroundColor=this.obj_theme.backgroundColor;      
      obj_ini.obj_design.bln_hiddenPin=true;
      this.obj_flexControlPanel=this.obj_gridItemPanel.fn_addItem(obj_ini);                  
      //END ADD FLEX
      //END CONTROL PANEL

      obj_container=this.obj_flexControlPanel;
      

      /*
      obj_manager=obj_delegator.obj_holder.obj_managerBootOptions;
      obj_manager.fn_execute(obj_container);        

      obj_manager=obj_delegator.obj_holder.obj_managerProject;      
      obj_manager.fn_execute(obj_container);
      obj_accordion=obj_manager.obj_accordion;
      //*/

      //*
      obj_manager=obj_delegator.obj_holder.obj_managerBootOptions;      
      obj_manager.fn_execute(obj_container);
      obj_accordion=obj_manager.obj_accordion;
      this.obj_designAccordion=obj_accordion;
      //Specia create

      obj_manager=obj_delegator.obj_holder.obj_managerBootOptions;
      obj_manager.obj_accordion=obj_accordion;
      obj_manager.fn_addItems();            
      
      obj_manager=obj_delegator.obj_holder.obj_managerProject;
      obj_manager.obj_accordion=obj_accordion;
      obj_manager.fn_addItems();
      
      
      obj_manager=obj_delegator.obj_holder.obj_managerPalette;
      obj_manager.obj_accordion=obj_accordion;
      obj_manager.fn_addItems();            
      
      //*
      obj_delegator.obj_holder.obj_managerProperty.fn_execute(obj_accordion);            
      //*/      
      
    }           

    fn_saveDesignFile(){
      this.fn_saveItem(this.obj_designFile);      
    }    
    fn_saveDesignItems(){      
      
      this.fn_saveItem(this.obj_flexPadIframe);       
    }
    fn_saveDesignMenuButtonFlex(){
       //Save MenuButton Flex
       this.fn_saveItem(this.obj_menuFlexMessenger);
       this.fn_saveItem(this.obj_menuFlexObjectMap);
       this.fn_saveItem(this.obj_menuFlexObjectAction);       
       this.fn_saveItem(this.obj_menuFlexDomAttribute);
       this.fn_saveItem(this.obj_menuFlexDomProperty);      
       this.fn_saveItem(this.obj_menuFlexStyleProperty);
       this.fn_saveItem(this.obj_menuFlexDesignProperty);      
       //Save MenuButton Flex            
    }
    fn_saveDesignMenuButton(){
      this.fn_saveItem(this.obj_menuButtonBootOptions);            
      this.fn_saveItem(this.obj_menuButtonProject);      
      this.fn_saveItem(this.obj_menuButtonPalette);

      this.fn_saveItem(this.obj_menuButtonMessenger);
      this.fn_saveItem(this.obj_menuButtonObjectMap);            
      this.fn_saveItem(this.obj_menuButtonDomAttribute);      
      this.fn_saveItem(this.obj_menuButtonDomProperty);      
      this.fn_saveItem(this.obj_menuButtonStyleProperty);      
      this.fn_saveItem(this.obj_menuButtonDesignProperty);
   }
    fn_saveDesignAccordion(){
      this.fn_saveItem(this.obj_designAccordion);         
    }
    fn_saveFlexControlPanel(){
            
      this.fn_saveItem(this.obj_flexPad);
      this.fn_saveItem(this.obj_flexControlPanel);   
    }
    fn_saveDesignGridItem(){                
      
      this.fn_saveItem(this.obj_gridItemPad);            
      this.fn_saveItem(this.obj_gridItemPanel);                  
    }
    fn_saveDesignGrid(){            
     
      this.fn_saveItem(this.obj_gridMain);                                   
    }


    fn_saveItem(obj_item){//bootSave
      if(!obj_item){
        return;
      }
      let obj_ini=new Object;
      obj_ini.obj_instance=obj_item;
      this.fn_save(obj_ini);
    }

    
    fn_save(obj_ini){//bootSave
      
      let obj_instance;      
      obj_instance=obj_ini.obj_instance;      
      obj_instance.obj_design.int_modeExecute=this.int_modeEdit;                                                                                    
      this.obj_designFile.fn_save(obj_ini);//We need to save this Design Component - however normally you would add componentids to other components.                                                                     
      obj_instance.obj_design.int_modeExecute=this.int_modeRuntime;//this should always be the ame
    }

    
    
}
//END BootBuilder
