class ManagerBootOptions extends Holder{
    constructor(obj_delegator) {                  
      super(obj_delegator); // call the super class constructor
     
      this.fn_initialize(obj_delegator);
    }    
    fn_initialize(obj_delegator){

      this.obj_delegator=obj_delegator;          
      
      this.obj_design.str_name=obj_delegator.obj_design.DesignerMenuName;      
      this.obj_design.str_IdMenuButton="designer-menu-button";

      this.obj_theme=this.fn_cloneObject(this.obj_delegator.obj_theme);      
    }       
    fn_execute(obj_container){//can run only on boot, called by boot build
      let obj_delegator=this.obj_delegator;
      let obj_ini;    

      obj_ini=new Holder;      
      obj_ini.obj_design.str_variableName="designer-menu";                             
      obj_ini.obj_design.str_name=this.obj_design.str_name;                
      obj_ini.obj_design.str_type="Accordion";              
      obj_ini.obj_theme=this.obj_theme;      
      obj_ini.obj_design.int_modeExecute=this.int_modeEdit;                                
      obj_ini.obj_design.bln_hiddenPin=true;
      let obj_accordion=obj_container.fn_addItem(obj_ini);                      
      this.obj_accordion=obj_accordion;      
    }    
    //START DESIGNER COMPONENTS    
    fn_addItems(){//runs only on boot      

      let obj_accordion, obj_menuButton, obj_item, obj_ini;
      obj_accordion=this.obj_accordion;

      //if ManagerDesigner/BootOptions is the main holder, remove children
      //Otherwise, Be sure to comment this out
      obj_accordion.fn_removeChildren();//any default children      
      
      obj_ini=new Holder;        
      obj_ini.obj_domProperty.innerText="Designer";  
      obj_ini.obj_design.str_id=this.obj_design.str_IdMenuButton;            
      obj_ini.obj_design.str_variableName=this.obj_design.str_IdMenuButton;
      obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;            
      obj_ini.obj_design.str_name="Designer Menu Button";  
      obj_ini.obj_design.bln_hiddenPin=true;    
      obj_menuButton=obj_accordion.fn_addItem(obj_ini);        
      obj_project.obj_holder.obj_managerBootBuilder.obj_menuButtonBootOptions=obj_menuButton;
    }
    //START DESIGNER SPECIFIC EVENT
    fn_containerOnLoad(){

      this.obj_menuButton.fn_removeChildren();
      this.fn_addDefaultItem();
    }
    fn_saveItem(obj_item){
      obj_project.obj_holder.obj_managerBootBuilder.fn_saveItem(obj_item);      
    }

    
    fn_navigateDesignURL(){      
      let obj_delegator=this.obj_delegator;      
      
      let str_url, str_url_new;      
      let str_name, str_value;      
      str_url = "/xdesign";
      str_url_new=str_url + "";      
      window.location=str_url_new;                
    }     
    fn_buildDesigner(){    
      this.obj_delegator.fn_runAction("buildDesigner");
    }    
    fn_buildDesignerCallBack(obj_post){            
    }    
    fn_deleteInstance(){
      let s, str_sql;
      s=""
      s+="DELETE FROM `xdesign`.`instance` WHERE `Name`IN ('";
      s+=this.obj_delegator.obj_design.str_name;
      s+="','";
      s+=this.obj_delegator.obj_design.DesignerMenuName;
      s+="','";
      s+=this.obj_delegator.obj_design.DataName;      
      s+="','";
      s+="My DesignFile";            
      s+="'";      
      s+=");";
      str_sql=s;
      this.obj_delegator.fn_runSQL(str_sql);  
    }
    fn_deleteInstanceCallBack(){
      alert("MANAGER BOOT OPTIONS fn_deleteInstanceCallBack");
    }
    fn_openBootInstance(){
      //if(this.obj_menuButton){this.obj_menuButton.fn_close();}            
      this.obj_delegator.fn_runAction("openBootInstance");      
    }
    fn_openBootInstanceCallBack(obj_post){            
      this.fn_navigateBootURL();                  
    }
    fn_navigateBootURL(){        
      let obj_delegator=this.obj_delegator;    
      let str_url, str_url_new;      
      let str_name, str_value;      
      str_url = "/xdesign?mode=edit";
      str_url_new=str_url + "";      
      window.location=str_url_new;    
    }      
    
    fn_addDefaultItem(){
      let obj_ini, obj_item, str_name;
      let obj_menuButton=this.obj_menuButton;      
      
      /*
      obj_ini=new Holder;        
      obj_ini.obj_domProperty.innerText="Delete";
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";  
      obj_ini.obj_design.str_valueEventClick="fn_deleteInstance";        
      obj_item=obj_menuButton.fn_addItem(obj_ini);                 
      //*/      
      
      obj_ini=new Holder;
      str_name="Build Designer";
      obj_ini.obj_domProperty.innerText=str_name;      
      obj_ini.obj_design.str_name=str_name;
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_buildDesigner";      
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_item=obj_menuButton.fn_addItem(obj_ini);                 

      obj_ini=new Holder;        
      str_name="Navigate Start";
      obj_ini.obj_domProperty.innerText=str_name;      
      obj_ini.obj_design.str_name=str_name;      
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";        
      obj_ini.obj_design.str_valueEventClick="fn_navigateDesignURL";              
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_item=obj_menuButton.fn_addItem(obj_ini);                 
      

      obj_ini=new Holder;        
      str_name="Navigate Boot";
      obj_ini.obj_domProperty.innerText=str_name;      
      obj_ini.obj_design.str_name=str_name;            
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";  
      obj_ini.obj_design.str_valueEventClick="fn_navigateBootURL";        
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_item=obj_menuButton.fn_addItem(obj_ini);                 
      
      /*
      obj_ini=new Holder;      
      obj_ini.obj_design.str_type="Tag";
      obj_ini.obj_design.str_tag="DIV";      
      obj_ini.obj_domStyle.width="100%";   
      obj_ini.obj_design.bln_hiddenPin=true;   
      obj_item=obj_menuButton.fn_addItem(obj_ini);                  

      
      obj_ini=new Holder;      
      str_name="Save Design File";
      obj_ini.obj_domProperty.innerText=str_name;      
      obj_ini.obj_design.str_name=str_name;                    
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";  
      obj_ini.obj_design.str_valueEventClick="fn_saveDesignFile";        
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_item=obj_menuButton.fn_addItem(obj_ini);                 

      obj_ini=new Holder;        
      str_name="Save Design Items";
      obj_ini.obj_domProperty.innerText=str_name;      
      obj_ini.obj_design.str_name=str_name;                          
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";  
      obj_ini.obj_design.str_valueEventClick="fn_saveDesignItems";        
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_item=obj_menuButton.fn_addItem(obj_ini);                 

      obj_ini=new Holder;        
      str_name="Save Menu Button Flex";
      obj_ini.obj_domProperty.innerText=str_name;      
      obj_ini.obj_design.str_name=str_name;                                
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";  
      obj_ini.obj_design.str_valueEventClick="fn_saveDesignMenuButtonFlex";        
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_item=obj_menuButton.fn_addItem(obj_ini);                 

      obj_ini=new Holder;        
      str_name="Save Menu Button";
      obj_ini.obj_domProperty.innerText=str_name;      
      obj_ini.obj_design.str_name=str_name;                                      
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";  
      obj_ini.obj_design.str_valueEventClick="fn_saveDesignMenuButton";        
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_item=obj_menuButton.fn_addItem(obj_ini);                 

      obj_ini=new Holder;        
      str_name="Save Design Accordion";
      obj_ini.obj_domProperty.innerText=str_name;      
      obj_ini.obj_design.str_name=str_name;                                            
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";  
      obj_ini.obj_design.str_valueEventClick="fn_saveDesignAccordion";        
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_item=obj_menuButton.fn_addItem(obj_ini);     

      obj_ini=new Holder;        
      str_name="Save Flex Control Panel";
      obj_ini.obj_domProperty.innerText=str_name;      
      obj_ini.obj_design.str_name=str_name;                                                  
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";  
      obj_ini.obj_design.str_valueEventClick="fn_saveFlexControlPanel";        
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_item=obj_menuButton.fn_addItem(obj_ini);     

      obj_ini=new Holder;        
      str_name="Save GridItem";
      obj_ini.obj_domProperty.innerText=str_name;      
      obj_ini.obj_design.str_name=str_name;                                                        
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";  
      obj_ini.obj_design.str_valueEventClick="fn_saveDesignGridItem";        
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_item=obj_menuButton.fn_addItem(obj_ini);     

      obj_ini=new Holder;        
      str_name="Save Grid";
      obj_ini.obj_domProperty.innerText=str_name;      
      obj_ini.obj_design.str_name=str_name;                                                              
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";  
      obj_ini.obj_design.str_valueEventClick="fn_saveDesignGrid";        
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_item=obj_menuButton.fn_addItem(obj_ini);     
      //*/
      
      obj_ini=new Holder;        
      str_name="Save Designer";
      obj_ini.obj_domProperty.innerText=str_name;      
      obj_ini.obj_design.str_name=str_name;                                                                    
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";  
      obj_ini.obj_design.str_valueEventClick="fn_save";        
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_item=obj_menuButton.fn_addItem(obj_ini);                 
      //this.fn_saveItem(obj_item);      

      
      /*
      obj_ini=new Holder;
      str_name="Boot";
      obj_ini.obj_domProperty.innerText=str_name;      
      obj_ini.obj_design.str_name=str_name;                                                                          
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_openBootInstance";
      obj_ini.obj_design.str_name="Designer Menu Boot Button";        
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_item=obj_menuButton.fn_addItem(obj_ini);           
      //this.fn_saveItem(obj_item);      
      //*/
    }
    //END DESIGNER COMPONENTS  
}//END CLS
//END APPLICATION