  class ManagerProject extends Holder{
    constructor(obj_delegator) {
      super(obj_delegator); // call the super class constructor

      this.fn_initialize(obj_delegator);
    }
    fn_initialize(obj_delegator){

      this.obj_delegator=obj_delegator;

      this.obj_design.str_name=obj_delegator.obj_design.ProjectMenuName;
      this.obj_design.str_IdMenuButton="project-menu-button";

      this.obj_theme=this.fn_cloneObject(this.obj_delegator.obj_theme);
    }
    fn_execute(obj_container){//can run only on boot, called by boot build
      let obj_delegator=this.obj_delegator;
      let obj_ini;
      obj_ini=new Holder;
      obj_ini.obj_design.str_id="project-menu";
      obj_ini.obj_design.str_type="Accordion";
      obj_ini.obj_theme=this.obj_theme;
      obj_ini.obj_design.str_name=obj_delegator.obj_design.nameProjectMenu;
      this.obj_accordion=obj_container.fn_addItem(obj_ini);
      this.obj_accordion=obj_accordion;
    }
    //START DESIGNER COMPONENTS
    fn_addItems(){//runs only on boot

      let obj_accordion, obj_menuButton, obj_item, obj_ini;
      obj_accordion=this.obj_accordion;

      //if ManagerProject is the main holder,  remove children
      //Otherwise, Be sure to comment this out
      //obj_accordion.fn_removeChildren();//any default children

      obj_ini=new Holder;
      obj_ini.obj_domProperty.innerText="Project";
      obj_ini.obj_design.str_id=this.obj_design.str_IdMenuButton;
      obj_ini.obj_design.str_variableName=this.obj_design.str_IdMenuButton;
      obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;
      obj_ini.obj_design.str_name="ProjectMenu Button";
      obj_ini.obj_design.bln_toggleProjectPin=true;      
      obj_ini.obj_design.bln_hiddenPin=true;      
      obj_menuButton=obj_accordion.fn_addItem(obj_ini);
      obj_menuButton.fn_debug("bln_toggleProjectPin: " + obj_menuButton.obj_design.bln_toggleProjectPin);
      obj_project.obj_holder.obj_managerBootBuilder.obj_menuButtonProject=obj_menuButton;
    }
    //END PROJECT COMPONENTS

    //START PROJECT SPECIFIC EVENT
    fn_containerOnLoad(){

      if(this.obj_delegator.obj_design.int_modeExecute==this.int_modeEdit){
        return;
      }

      this.obj_menuButton.fn_setDomAttribute("disabled", false);
      this.fn_getListComponent();
    }
    fn_listProject(arr_row){

      this.obj_menuButton.fn_removeChildren();
      this.fn_addDefaultItem();

      let obj_item;
      let obj_ini=new Holder;
      obj_ini.obj_design.str_type="Tag";
      obj_ini.obj_design.str_tag="DIV";
      obj_ini.obj_domStyle.width="100%";
      //obj_ini.obj_domStyle.height="3px";
      this.obj_menuButton.fn_addItem(obj_ini);
      for(var i=0;i<arr_row.length;i++){
        let obj_row=arr_row[i];
        if(obj_shared.fn_isObjectEmpty(obj_row)){continue;}//RowData Can contain a single empty object
        obj_ini=new Holder;
        obj_ini.obj_domProperty.innerText=obj_row.Name;
        obj_ini.obj_design.int_idRecordTarget=obj_row.id;
        obj_ini.obj_design.str_typeRecord=obj_row.Type;
        obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
        obj_ini.obj_design.str_valueEventClick="fn_addProjectItem";
        obj_item=this.obj_menuButton.fn_addItem(obj_ini);        
      }
    }

    fn_addItem(){//Add Project Item From Project Menu

      this.fn_setCurrentProject();
    }
    //////////////////NEW
    //START PROJECT SPECIFIC EVENT
    //START BUTTON EVENT
    fn_newProjectInstance(){//BUTTON PRESS
      //if(this.obj_menuButton){this.obj_menuButton.fn_close();}
      this.obj_delegator.fn_runAction("newProject");
    }
    fn_newProjectCallBack(obj_post){
      this.obj_delegator.obj_holder.obj_managerIFrame.fn_navigateRecord();
    }
    fn_openCurrentProject(){
      //if(this.obj_menuButton){this.obj_menuButton.fn_close();}
      this.obj_delegator.fn_runAction("openCurrentProject");
    }
    fn_openCurrentProjectCallBack(obj_post){
      this.obj_delegator.obj_holder.obj_managerIFrame.fn_navigateRecord();
    }
    fn_saveProjectInstance(){
      
      if(this.obj_menuButton){this.obj_menuButton.fn_close();}      

      let obj_designFile=this.obj_delegator.obj_holder.obj_designFile;
      let obj_ini=new Object;
      obj_ini.ObjectInstance=obj_projectTarget;       
      obj_ini.int_ref=101;       
      obj_ini.str_actionCallback="onSaveProjectInstance";
      obj_designFile.fn_saveComponent(obj_ini);
    }    
    fn_onSaveProjectInstanceCallBack(){      
      this.fn_getListComponent();
      this.obj_delegator.fn_getListPalettePinnedComponent();
    }    
    fn_deleteProjectInstance(){//to delete the loaded instance

      let obj_designFile=this.obj_delegator.obj_holder.obj_designFile;
      let obj_designFileIni=new Object;
      obj_designFileIni.obj_instance=obj_projectTarget;
      obj_designFileIni.str_IdValidator=this.obj_delegator.obj_design.str_id;
      obj_designFileIni.str_actionCallback="deleteProjectInstance";
      obj_designFile.fn_delete(obj_designFileIni);
    }
    fn_deleteProjectInstanceCallback(){

      this.fn_getListComponent();
      this.obj_delegator.fn_getListPalettePinnedComponent();
      this.fn_newProjectInstance();
    }
    fn_publishProject(){
      //if(this.obj_menuButton){this.obj_menuButton.fn_close();}
      let obj_designFile=this.obj_delegator.obj_holder.obj_designFile;
      let obj_designFileIni=new Object;
      obj_designFileIni.obj_instance=obj_projectTarget;
      obj_designFileIni.str_IdValidator=this.obj_delegator.obj_design.str_id;
      obj_designFileIni.str_actionCallback="publishProjectInstance";
      obj_designFile.fn_publish(obj_designFileIni);
    }
    fn_publishProjectInstanceCallback(){
      this.fn_viewInBrowser();
    }
    //END BUTTON EVENT
    //END  PROJECT SPECIFIC EVENT
    //START RUN ACTION
    fn_viewInBrowser(){
      let o=window.open("../myProject/", "xDesignViewInBrowser");
      if(o){o.focus()}
    }

    fn_getListComponent(){      
      this.obj_delegator.fn_runAction("getListProjectComponent");
    }
    fn_getListComponentCallBack(obj_post){
      let arr_row=obj_post.RowData;
      this.fn_listProject(arr_row);
    }
    fn_toggleProjectPin(){
      this.obj_delegator.fn_runAction("toggleProjectPin");
    }
    fn_toggleProjectPinCallback(obj_post){      
      this.fn_getListComponent();
    }
    
    fn_setCurrentProject(){
      //if(this.obj_menuButton){this.obj_menuButton.fn_close();}
      let obj_itemEvent, int_idRecord, obj_post;
      obj_itemEvent=obj_project.obj_projectEvent;//obj_itemEvent is the button
      int_idRecord=obj_itemEvent.obj_design.int_idRecordTarget;
      obj_post={
        RecordId:int_idRecord
      };
      this.obj_delegator.fn_runAction("setCurrentProject", obj_post);
    }
    fn_setCurrentProjectCallBack(obj_post){
      this.fn_openCurrentProject();
    }
    fn_palettePinCurrentProject(){//deprecated
      //if(this.obj_menuButton){this.obj_menuButton.fn_close();}
      this.obj_delegator.fn_runAction("palettePinCurrentProject");
    }
    fn_palettePinCurrentProjectCallBack(obj_post){//deprecated
      this.obj_delegator.fn_getListPalettePinnedComponent();
    }

    //END RUN ACTION

    //START RUN PROCESS

    //END RUN PROCESS

    fn_addDefaultItem(){
      let obj_ini;
      let obj_menuButton=this.obj_menuButton;
      obj_ini=new Holder;
      obj_ini.obj_domProperty.innerText="New";
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_newProjectInstance";
      obj_menuButton.fn_addItem(obj_ini);

      obj_ini=new Holder;
      obj_ini.obj_domProperty.innerText="Open Current";
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_openCurrentProject";
      obj_menuButton.fn_addItem(obj_ini);

      obj_ini=new Holder;
      obj_ini.obj_domProperty.innerText="Save";
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_saveProjectInstance";
      obj_menuButton.fn_addItem(obj_ini);
      
      //*
      obj_ini=new Holder;
      obj_ini.obj_domProperty.innerText="Pin";
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_toggleProjectPin";
      obj_menuButton.fn_addItem(obj_ini);
      //*/

      obj_ini=new Holder;
      obj_ini.obj_domProperty.innerText="Delete";
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_deleteProjectInstance";
      obj_menuButton.fn_addItem(obj_ini);

      obj_ini=new Holder;
      obj_ini.obj_domProperty.innerText="Publish";
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_publishProject";
      obj_menuButton.fn_addItem(obj_ini);

      obj_ini=new Holder;
      obj_ini.obj_domProperty.innerText="View";
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_viewPublishedProject";
      obj_menuButton.fn_addItem(obj_ini);
    }

    //END PROJECT SPECIFIC EVENT
    //END PROJECT COMPONENTS
}//END CLS
//END PROJECT
