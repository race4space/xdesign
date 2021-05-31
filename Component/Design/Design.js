//START DESIGN
class Design extends Component{
    constructor(obj_ini) {            
      super(obj_ini); // call the super class constructor            
      
}   
fn_initialize(obj_ini){//COMPONENT: fn_initialize is called again upon Component.openInstance from db
  super.fn_initialize(obj_ini);       
  
  this.obj_design.bln_preventSave=true; // important, ensures designer will not save a copy of iteself, or something
  //this is a boot dodge - but seems to prevent double creation of My Designer on Save.
  
  
  //START INITIALIZE DESIGN
  this.obj_design.str_type="Design";
  this.obj_design.str_tag="Design";    
  this.obj_design.bln_hiddenPin=true;    
  
  
  //if(this.obj_design.str_id==undefined){this.obj_design.str_id="ApplicationDesigner";}
  this.obj_design.str_id="ApplicationDesigner";

  this.obj_design.bln_listenChange=true;
  if(this.obj_design.str_name==undefined){this.obj_design.str_name="My Designer";}    
  if(this.obj_design.DesignerMenuName==undefined){this.obj_design.DesignerMenuName="My Designer Menu";}  
  if(this.obj_design.ProjectMenuName==undefined){this.obj_design.ProjectMenuName="My Project Menu";}  
  if(this.obj_design.PaletteMenuName==undefined){this.obj_design.PaletteMenuName="My Palette Menu";}        
  if(this.obj_design.DataName==undefined){this.obj_design.DataName="My Design Data";}
  if(this.obj_design.FileName==undefined){this.obj_design.FileName="My Design File";}
  
  //END INITIALIZE DESIGN
  
  //START INITIALIZE DOM
  
  //END TART INITIALIZE DOM

  //START INITIALIZE THEME
  
  if(this.obj_theme.backgroundColor==undefined){this.obj_theme.backgroundColor="#2b2c34";}                
  if(this.obj_theme.forgroundColor==undefined){this.obj_theme.forgroundColor="#414141";}  
  if(this.obj_theme.lolightColor==undefined){this.obj_theme.lolightColor="gray";}    
  if(this.obj_theme.highlightColor==undefined){this.obj_theme.highlightColor="white";}    
  
  if(this.obj_theme.headingBackgroundColor==undefined){this.obj_theme.headingBackgroundColor=this.obj_theme.highlightColor;}
  if(this.obj_theme.headingTextColor==undefined){this.obj_theme.headingTextColor=this.obj_theme.forgroundColor;}  
  if(this.obj_theme.cellBorder==undefined){this.obj_theme.cellBorder="1px solid " + this.obj_theme.lolightColor;}
  if(this.obj_theme.cellPadding==undefined){this.obj_theme.cellPadding="10px";}
  

  if(this.obj_theme.borderRadius===undefined){this.obj_theme.borderRadius="4px";}
  if(this.obj_theme.fontFamily===undefined){this.obj_theme.fontFamily="Helvetica, Arial, sans-serif";}
  
  //END INITIALIZE THEME

  //Load at end of intialize
  this.obj_holder.obj_managerBootBuilder=new ManagerBootBuilder(this);        
  this.obj_holder.obj_managerBootOptions=new ManagerBootOptions(this);
  this.obj_holder.obj_managerProject=new ManagerProject(this);
  this.obj_holder.obj_managerPalette=new ManagerPalette(this);      
  this.obj_holder.obj_managerIFrame=new ManagerIFrame(this);    
  this.obj_holder.obj_managerProperty=new ManagerProperty(this);  
  this.obj_holder.obj_managerFile=new ManagerFile(this);
  
}
fn_themeInstance(){
  
  
  super.fn_applyTheme();
  this.obj_theme.backgroundColor=obj_shared.fn_getRandomColor();
  this.obj_theme.forgroundColor=obj_shared.fn_getRandomColor();
  this.fn_applyTheme();  
}

fn_applyTheme(){

  this.fn_setBackgroundColor(this.obj_theme.backgroundColor, true);
  
}

fn_validate(obj_item){  

  
  super.fn_validate(obj_item);

  this.obj_holder.obj_managerProperty.fn_validate(obj_item);
  //console.log("DESIGN fn_validate: " + obj_item.obj_design.str_id);
  switch(obj_item.obj_design.str_id){    
    case 'designFile'://reference to obj_file set in super fn_validate                     
      console.log("DESIGN VALDATE designFile");
      this.obj_holder.obj_managerFile.fn_onComponentReady();            
    break;
    case 'control-grid-main'://reference to obj_file set in super fn_validate                         
      console.log("DESIGN VALDATE control-grid-main");
    break;
    case 'flexPad'://reference to obj_file set in super fn_validate                           
      console.log("DESIGN VALDATE flexPad");      
    break;
    case 'flexPadIframe'://reference to obj_file set in super fn_validate                               
      console.log("DESIGN VALDATE flexPadIframe");      
      this.obj_holder.obj_managerIFrame.fn_onComponentReady();            
    break;    
    case 'control-griditem-pad'://reference to obj_file set in super fn_validate                     
      console.log("DESIGN VALDATE control-griditem-pad");
    break;
    case 'control-griditem-panel'://reference to obj_file set in super fn_validate                     
      console.log("DESIGN VALDATE control-griditem-panel");
    break;    
    case 'flexControlPanel'://reference to obj_file set in super fn_validate                     
      console.log("DESIGN VALDATE flexControlPanel");
    break;
    case 'designer-menu-button':        
      console.log("DESIGN VALDATE designer-menu-button");
      this.obj_holder.obj_managerBootOptions.obj_menuButton=obj_item;         
      this.obj_holder.obj_managerBootOptions.fn_containerOnLoad();      
    break;
    case 'project-menu-button':          
      console.log("DESIGN VALDATE project-menu-button");
      this.obj_holder.obj_managerProject.obj_menuButton=obj_item;         
      this.obj_holder.obj_managerProject.fn_containerOnLoad();
    break;
    case 'palette-menu-button':            
      console.log("DESIGN VALDATE palette-menu-button");
      this.obj_holder.obj_managerPalette.obj_menuButton=obj_item;         
      this.obj_holder.obj_managerPalette.fn_containerOnLoad();
    break;    
    
  }
}   
fn_onSaveDesignFile(obj_post){  
}

fn_component_onLoad(){   
  //set reference to design frames publish object, called when that object has loaded in the frame
  obj_projectTarget=this.obj_holder.obj_flexPadIframe.dom_obj.contentWindow.obj_project; 
  //note  obj_projectTarget.obj_designDelegate will still be undefined at thsi point.  
}
fn_getGlass(){
    return this.obj_holder.obj_flexPadIframe.dom_obj.contentWindow;
}

fn_onLoad(){

  //see fn_component_onLoad for design target  on load
  
    super.fn_onLoad();    

    let obj_holder=this.obj_holder;        

    /*
    obj_holder.obj_flexPad=this.fn_findItemById("control-flex-pad");//this is the FLEX into which the ProjectInstance is contained
    if(!obj_holder.obj_flexPad){
      alert("ERROR: Design fn_onLoad obj_holder.obj_flexPad is false");
      return;
    } 
    //*/               

    //obj_holder.obj_flexControlPanel=this.fn_findItemById("control-flex-panel");//this is the FLEX into which Application Menus etc are contained    

    obj_holder.obj_ProjectMenu=this.fn_findItemById("project-menu");//this is the FLEX into which Application Menus etc are contained    
    
    
    //this.fn_newProjectInstance();    
    
    
    //this.obj_holder.obj_managerBootBuilder.fn_onLoad();
    //this.obj_holder.obj_managerBootOptions.fn_onLoad();
    //this.obj_holder.obj_managerProject.fn_onLoad();
    //this.obj_holder.obj_managerPalette.fn_onLoad();    
    //this.obj_holder.obj_managerMessenger.fn_onLoad();  
    //this.obj_holder.obj_managerIFrame.fn_onLoad();      
    
    //this.obj_holder.obj_managerProperty.fn_onLoad();//deprecated due to child items not fincihsing loading etc   

    
    //this.obj_holder.obj_managerIFrame.fn_execute();
}    


fn_createChildren(){//only in boot mode             
  return this.obj_holder.obj_managerBootBuilder.fn_execute();    
}   

fn_runAction(str_action,  obj_designFileIni){      
  let obj_designFile=this.obj_holder.obj_designFile;              
  if(!obj_designFileIni){obj_designFileIni=new Object;}
  obj_designFileIni.str_IdValidator=this.obj_design.str_id;      
  obj_designFileIni.str_action=str_action;
  obj_designFile.fn_runAction(obj_designFileIni);          
}
fn_runSQL(str_sql){      
  this.fn_runAction("SQLQuery", {Query:str_sql});
}          

//START DESIGNER SPECIFIC EVENT
//BUTTON EVENT
fn_save(){//This relates to saving a component within the Project Isntance ie from the aciton button      

  this.obj_design.bln_projectPin=false;  
  this.obj_design.bln_hiddenPin=true;

  let obj_designFile=this.obj_holder.obj_designFile;
  let obj_ini=new Object;
  obj_ini.ObjectInstance=this;  
  obj_designFile.fn_saveComponent(obj_ini);
}
fn_saveDesignFile(){  
  this.obj_holder.obj_managerBootBuilder.fn_saveDesignFile();      
}
fn_saveDesignItems(){
  this.obj_holder.obj_managerBootBuilder.fn_saveDesignItems();      
}
fn_saveDesignMenuButtonFlex(){
  this.obj_holder.obj_managerBootBuilder.fn_saveDesignMenuButtonFlex();      
}
fn_saveDesignMenuButton(){
  this.obj_holder.obj_managerBootBuilder.fn_saveDesignMenuButton();      
}

fn_saveDesignAccordion(){
  this.obj_holder.obj_managerBootBuilder.fn_saveDesignAccordion();      
}
fn_saveFlexControlPanel(){
  this.obj_holder.obj_managerBootBuilder.fn_saveFlexControlPanel();      
}
fn_saveDesignGridItem(){
  this.obj_holder.obj_managerBootBuilder.fn_saveDesignGridItem();      
}
fn_saveDesignGrid(){
  this.obj_holder.obj_managerBootBuilder.fn_saveDesignGrid();      
}




fn_openBootInstance(){
  this.obj_holder.obj_managerBootOptions.fn_openBootInstance();  
}
openBootInstance(obj_post){  
  this.obj_holder.obj_managerBootOptions.fn_openBootInstanceCallBack(obj_post);  
}
fn_deleteInstance(){
  this.obj_holder.obj_managerBootOptions.fn_deleteInstance();  
}
deleteInstance(obj_post){  
  this.obj_holder.obj_managerBootOptions.fn_deleteInstanceCallBack(obj_post);  
}
fn_navigateDesignURL(){   
  this.obj_holder.obj_managerBootOptions.fn_navigateDesignURL();
} 
fn_navigateBootURL(dom_button){
  this.obj_holder.obj_managerBootOptions.fn_navigateBootURL();  
} 
fn_buildDesigner(dom_button){
  this.obj_holder.obj_managerBootOptions.fn_buildDesigner();  
}
buildDesigner(obj_post){
  this.obj_holder.obj_managerBootOptions.fn_buildDesignerCallBack(obj_post);
}
//BUTTON EVENT
//END DESIGNER SPECIFIC EVENT

//Generic State
//Generic State

//START PROJECT SPECIFIC EVENT
//BUTTON EVENT
fn_newProjectInstance(){      
  this.obj_holder.obj_managerProject.fn_newProjectInstance();
} 
newProject(obj_post){  
  this.obj_holder.obj_managerProject.fn_newProjectCallBack(obj_post);  
}
fn_openCurrentProject(){
  this.obj_holder.obj_managerProject.fn_openCurrentProject();  
}

fn_saveProjectInstance(){  
  this.obj_holder.obj_managerProject.fn_saveProjectInstance();    
}
onSaveComponent(){
  this.obj_holder.obj_managerProject.fn_getListComponent();
  this.obj_holder.obj_managerPalette.fn_getListPinnedComponent();  
}

fn_deleteProjectInstance(){  
  this.obj_holder.obj_managerProject.fn_deleteProjectInstance();      
}
deleteProjectInstance(){  
  this.obj_holder.obj_managerProject.fn_deleteProjectInstanceCallback();      
}
fn_publishProject(){  
  this.obj_holder.obj_managerProject.fn_publishProject();        
}
publishProjectInstance(){  
  this.obj_holder.obj_managerProject.fn_publishProjectInstanceCallback();        
}
fn_viewPublishedProject(){
  this.obj_holder.obj_managerProject.fn_viewInBrowser();
}
fn_addProjectItem(){      
  this.obj_holder.obj_managerProject.fn_addItem();        
}
fn_getListProjectComponent(){  
  this.obj_holder.obj_managerProject.fn_getListComponent();          
}
getListProjectComponent(obj_post){  
  this.obj_holder.obj_managerProject.fn_getListComponentCallBack(obj_post);
}
fn_toggleProjectPin(){
  this.obj_holder.obj_managerProject.fn_toggleProjectPin();
}
toggleProjectPin(){
  this.obj_holder.obj_managerProject.fn_toggleProjectPinCallback();
}
fn_setCurrentProject(){   
  this.obj_holder.obj_managerProject.fn_setCurrentProject();          
}
setCurrentProject(obj_post){  
  this.obj_holder.obj_managerProject.fn_setCurrentProjectCallBack(obj_post);  
}

fn_palettePinCurrentProject(){  
  this.obj_holder.obj_managerProject.fn_palettePinCurrentProject();          
}
palettePinCurrentProject(obj_post){  
  this.obj_holder.obj_managerProject.fn_palettePinCurrentProjectCallBack(obj_post);  
}
fn_openCurrentProject(){  
  this.obj_holder.obj_managerProject.fn_openCurrentProject();          
}
openCurrentProject(obj_post){  
  this.obj_holder.obj_managerProject.fn_openCurrentProjectCallBack(obj_post);  
}
//BUTTON EVENT




//END PROJECT SPECIFIC EVENT

//START PALETT SPECIFIC EVENT

fn_getListPalettePinnedComponent(){ //BUTTON EVENT
  return this.obj_holder.obj_managerPalette.fn_getListPinnedComponent();        
}
getListPalettePinnedComponent(obj_post){  
  this.obj_holder.obj_managerPalette.fn_getListPinnedComponentCallBack(obj_post);
}
fn_savePaletteSelected(){    
  this.obj_holder.obj_managerPalette.fn_savePaletteSelected(obj_project.obj_palettSelected);
}
onSavePaletteSelected(){  
  this.obj_holder.obj_managerPalette.fn_onSavePaletteSelectedCallBack();
}

fn_clearPaletteSelect(){
  return this.obj_holder.obj_managerPalette.fn_clearPaletteSelect();      
}
fn_removePaletteItem(){
  return this.obj_holder.obj_managerPalette.fn_removePaletteItem();      
}
fn_addPaletteTag(){
  return this.obj_holder.obj_managerPalette.fn_addPaletteTag();      
}
fn_addPaletteTagFromInput(obj_ini){
  return this.obj_holder.obj_managerPalette.fn_addPaletteTagFromInput();          
}
fn_addComponentItem(obj_ini){//refers to adding custom components from palett via button
  return this.obj_holder.obj_managerPalette.fn_addItem();        
}
//END PALETT SPECIFIC EVENT


//START MESSAGE SPECIFIC EVENT
fn_linkPaletteTextEditChange(){  
  return this.obj_holder.obj_managerMessenger.fn_linkPaletteTextEditChange();
}    
fn_linkPaletteDomPropertyChange(){
  return this.obj_holder.obj_propertyDOMProperty.fn_linkPaletteDomPropertyChange();
}
fn_linkPaletteDomAttributeChange(){
  return this.obj_holder.obj_propertyDOMAttribute.fn_linkPaletteDomAttributeChange();
}
fn_linkPaletteStyleChange(){
  return this.obj_holder.obj_propertyDOMStyle.fn_linkPaletteStyleChange();
}
fn_linkPaletteDesignChange(){  
  return this.obj_holder.obj_propertyDesign.fn_linkPaletteDesignChange();
}
fn_propertyDomPropertyChangeName(){
  return this.obj_holder.obj_propertyDOMProperty.fn_propertyDomPropertyChangeName();
}
fn_propertyDomAttributeChangeName(){
  return this.obj_holder.obj_propertyDOMAttribute.fn_propertyDomAttributeChangeName();
}

fn_propertyDomPropertyChangeValue(){
  return this.obj_holder.obj_propertyDOMProperty.fn_propertyDomPropertyChangeValue();
}
fn_propertyDomAttributeChangeValue(){
  return this.obj_holder.obj_propertyDOMAttribute.fn_propertyDomAttributeChangeValue();
}

fn_propertyDOMStyleChangeName(){
  return this.obj_holder.obj_propertyDOMStyle.fn_propertyDOMStyleChangeName();
}
fn_propertyDOMStyleChangeValue(){
  return this.obj_holder.obj_propertyDOMStyle.fn_propertyDOMStyleChangeValue();
}
fn_propertyDesignChangeName(){
  return this.obj_holder.obj_propertyDesign.fn_propertyDesignChangeName();
}
fn_propertyDesignChangeValue(){
  return this.obj_holder.obj_propertyDesign.fn_propertyDesignChangeValue();
}
fn_setGridSwitch(){
  return this.obj_holder.obj_objectAction.fn_setGridSwitch();
}
fn_moveObjectCompassUp(){  
  return this.obj_holder.obj_objectMap.fn_moveObjectCompassUp();
}
fn_moveObjectCompassDown(){  
  return this.obj_holder.obj_objectMap.fn_moveObjectCompassDown();
}
fn_moveObjectCompassRight(){  
  return this.obj_holder.obj_objectMap.fn_moveObjectCompassRight();
}
fn_moveObjectCompassLeft(){  
  return this.obj_holder.obj_objectMap.fn_moveObjectCompassLeft();
}
fn_moveObjectCompassHome(){
  return this.obj_holder.obj_objectMap.fn_moveObjectCompassHome();
}
fn_moveObjectCompassHorizontal(){
  return this.obj_holder.obj_objectMap.fn_moveObjectCompassHorizontal();
}
fn_linkCompassItem(obj_target){
  return this.obj_holder.obj_managerProperty.fn_linkCompassItem(obj_target);
}
fn_clearOperation(){
  this.obj_holder.obj_managerProperty.fn_clearOperation();  
}
//END MESSAGE SPECIFIC EVENT
   

//START COMPONENT EVENT HANDLING
fn_change(){
  this.fn_event_call(obj_project.obj_design.str_prefix + "myDesignerPalettePropertyOnChange");//see if the event occurred on a dom that has registered this event         
  this.fn_event_call(obj_project.obj_design.str_prefix + "myDesignerPaletteTextEditOnChange");//see if the event occurred on a dom that has registered this event         

}
fn_click(){    
  this.fn_event_call(obj_project.obj_design.str_prefix + "myDesignerButtonClick");//see if the event occurred on a dom that has registered this event         
}

//START COMPONENT EVENT HANDLING   
fn_onPaletteItemSelected(){ 
  let obj_item=obj_project.obj_palettSelected;   
  if(!obj_item){return;}   
  this.obj_holder.obj_managerProperty.fn_onPaletteItemSelected();  
}  
fn_onPaletteItemDeSelected(){ 
  
  let obj_item=obj_project.obj_palettSelected;   
  
  if(!obj_item){return;}        

  this.obj_holder.obj_managerProperty.fn_onPaletteItemDeSelected();  
  
}  

  //*  
fn_setPaletteSelected(){}    
fn_deSelectPaletteItems(){}        
fn_setPaletteDeSelected(){}    
fn_designEventMouseenter(){}
fn_designEventMouseleave(){}  
//*/
}//END OF CLS
//END zDESIGN