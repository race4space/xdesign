  class ManagerPalette extends Holder{
    constructor(obj_delegator) {
      super(obj_delegator); // call the super class constructor

      this.fn_initialize(obj_delegator);
    }
    fn_initialize(obj_delegator){

      this.obj_delegator=obj_delegator;

      this.obj_design.str_name=obj_delegator.obj_design.PaletteMenuName;
      this.obj_design.str_IdMenuButton="palette-menu-button";

      this.obj_theme=this.fn_cloneObject(this.obj_delegator.obj_theme);
    }
    fn_execute(obj_container){//can run only on boot, called by boot build
      let obj_delegator=this.obj_delegator;
      let obj_ini;
      obj_ini=new Holder;
      obj_ini.obj_design.str_id="palette-menu";
      obj_ini.obj_design.str_type="Accordion";
      obj_ini.obj_theme=this.obj_theme;
      obj_ini.obj_design.str_name=obj_delegator.obj_design.namePaletteMenu;
      this.obj_accordion=obj_container.fn_addItem(obj_ini);

      //this.fn_addItems();
    }
    //START DESIGNER COMPONENTS
    fn_addItems(){//runs only on boot

      let obj_accordion, obj_menuButton, obj_item, obj_ini;
      obj_accordion=this.obj_accordion;

      //if ManagerProject is the main holder,  remove children
      //Otherwise, Be sure to comment this out
      //obj_accordion.fn_removeChildren();//any default children

      obj_ini=new Holder;
      obj_ini.obj_domProperty.innerText="Palette";
      obj_ini.obj_design.str_id=this.obj_design.str_IdMenuButton;
      obj_ini.obj_design.str_variableName=this.obj_design.str_IdMenuButton;
      obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;
      obj_ini.obj_design.str_name="PaletteMenu Button";
      obj_ini.obj_design.bln_hiddenPin=true;
      obj_menuButton=obj_accordion.fn_addItem(obj_ini);
      obj_project.obj_holder.obj_managerBootBuilder.obj_menuButtonPalette=obj_menuButton;

    }
    //END PROJECT COMPONENTS

    //START PROJECT SPECIFIC EVENT
    fn_containerOnLoad(){

      if(this.obj_delegator.obj_design.int_modeExecute==this.int_modeEdit){
        return;
      }

      this.obj_menuButton.fn_setDomAttribute("disabled", false);
      this.fn_getListPinnedComponent();
    }
    fn_getListPinnedComponent(){      
      this.obj_delegator.fn_runAction("getListPalettePinnedComponent");
    }
    fn_getListPinnedComponentCallBack(obj_post){      
      let arr_row=obj_post.RowData;
      this.fn_listPinnedComponent(arr_row);
    }
    fn_listPinnedComponent(arr_row){

      this.obj_menuButton.fn_removeChildren();
      this.fn_addDefaultItem();

      let obj_ini=new Holder;
      obj_ini.obj_design.str_type="Tag";
      obj_ini.obj_design.str_tag="DIV";
      obj_ini.obj_domStyle.width="100%";
      //obj_ini.obj_domStyle.height="3px";
      this.obj_menuButton.fn_addItem(obj_ini);

      let bln_startCustom=false;
      let int_idRecord, str_nameRecord, str_typeRecord, int_idRecordPaletteLimit;
      for(var i=0;i<arr_row.length;i++){
        let obj_row=arr_row[i];
        if(obj_shared.fn_isObjectEmpty(obj_row)){continue;}//RowData Can contain a single empty object

        int_idRecord=obj_row.id;
        str_nameRecord=obj_row.Name;
        str_typeRecord=obj_row.Type;

        int_idRecordPaletteLimit=this.obj_delegator.obj_design.int_idRecord;
        
        if((int_idRecord>int_idRecordPaletteLimit) && !bln_startCustom){//start custom component 
          bln_startCustom=true;
          let obj_ini=new Holder;
          obj_ini.obj_design.str_type="Tag";
          obj_ini.obj_design.str_tag="DIV";
          obj_ini.obj_domStyle.width="100%";
          //obj_ini.obj_domStyle.height="3px";
          this.obj_menuButton.fn_addItem(obj_ini);
        }            

        let obj_ini=new Holder;
        obj_ini.obj_domProperty.innerText=obj_row.Name;
        obj_ini.obj_design.int_idRecordTarget=int_idRecord;
        obj_ini.obj_design.str_nameRecordTarget="My " + str_nameRecord;
        obj_ini.obj_design.str_typeRecordTarget=str_typeRecord;
        obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
        obj_ini.obj_design.str_valueEventClick="fn_addComponentItem";

        //this.obj_menuButton.fn_debugDesign(obj_ini.obj_design, obj_row.Name);

        this.obj_menuButton.fn_addItem(obj_ini);



      }
    }

    fn_addDefaultItem(){
      let obj_ini;
      let obj_menuButton=this.obj_menuButton;

      //return;
      //*
      //obj_ComponentMap.get(str_type);}catch{}//if we have a class defintion


      /*
      for (let str_key of obj_ComponentMap.keys()) {
        //console.log(str_key)
        obj_ini=new Holder;
        obj_ini.obj_domProperty.innerText=str_key;
        obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
        obj_ini.obj_design.str_valueEventClick="fn_addPaletteTag";
        obj_menuButton.fn_addItem(obj_ini);
      }
      //*/

      obj_ini=new Holder;
      obj_ini.obj_design.str_type="InputAndButton";
      obj_ini.obj_design.str_nameEventButtonClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventButtonClick="fn_addPaletteTagFromInput";
      obj_ini.obj_design.str_buttonText="Tag";
      obj_menuButton.fn_addItem(obj_ini);

      obj_ini=new Holder;
      obj_ini.obj_domProperty.innerText="ReCenter";
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_clearPaletteSelect";
      obj_menuButton.fn_addItem(obj_ini);

      obj_ini=new Holder;
      obj_ini.obj_domProperty.innerText="Remove";
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_removePaletteItem";
      obj_menuButton.fn_addItem(obj_ini);

    }

    fn_clearPaletteSelect(){
      this.obj_delegator.fn_clearOperation();
      obj_projectTarget.obj_designDelegate.fn_deSelectPaletteItems();
      obj_projectTarget.obj_designDelegate.fn_setPaletteSelected();//to do and check : set global component at this point
    }

    fn_addPaletteTagFromInput(obj_ini){
      let obj_itemEvent, obj_item, str_tag, str_linkId;
      obj_itemEvent=obj_project.obj_projectEvent;//obj_itemEvent is the button
      str_linkId=obj_itemEvent.obj_design.str_linkId;//str_linkId is the input
      obj_item=obj_project.fn_findItemById(str_linkId);//this is the input
      str_tag=obj_item.dom_obj.value;
      this.fn_addPaletteTag(obj_ini, str_tag);
    }
    fn_addPaletteTag(){

      let obj_tag, str_type, str_content;
      let obj_itemEvent, str_tag, obj_ini, foo_val;
      obj_itemEvent=obj_project.obj_projectEvent;//obj_itemEvent is the button
      str_tag=obj_itemEvent.dom_obj.innerText;

      str_content="Place your text here";

      obj_ini=new Holder;
      //obj_ini.obj_design.str_type="Tag";
      obj_ini.obj_design.str_type=str_tag;
      obj_ini.obj_design.str_tag=str_tag;

      obj_ini.obj_design.bln_isGenericTag=true;//this affects canhavechildren. turn off for specifc tags. which we have class files for.


      str_type=str_tag;
      try{foo_val=obj_ComponentMap.get(str_type);}catch{}//if we have a class defintion
      if(foo_val){obj_ini.obj_design.bln_isGenericTag=false;}


      switch(str_type.toUpperCase()){
        case "P":
            obj_ini.obj_design.str_content=str_content;
          break;
        case "H1":
            obj_ini.obj_design.str_content=str_content;
        break;
        case "LI":
            obj_ini.obj_design.str_content=str_content;
        break;
        case "FLEX":
            obj_ini.obj_domStyle.backgroundColor=obj_shared.fn_getRandomColor();
            //obj_ini.obj_domStyle.flexDirection="rows";
            //obj_ini.obj_domStyle.padding="0px";
            //obj_ini.obj_domStyle.border="10px outset grey";
        break;
        case "BUTTON":
            obj_ini.obj_design.str_content="Button";
        break;
        default:
      }

      obj_tag=this.fn_addPaletteObject(obj_ini);
      return obj_tag;
    }

    fn_addItem(){//Component Item

      let obj_itemEvent, obj_item, str_tag, obj_ini, int_idRecord, int_idRecordPaletteLimit;
      obj_itemEvent=obj_project.obj_projectEvent;//obj_itemEvent is the button
      //obj_itemEvent.fn_debug("Palette fn_addItem");
      str_tag=obj_itemEvent.dom_obj.innerText;
      obj_ini=new Holder;
      obj_ini.obj_design.str_type=obj_itemEvent.obj_design.str_typeRecordTarget;
      //obj_ini.obj_design.str_name="My " + obj_ini.obj_design.str_type;
      obj_ini.obj_design.str_name=obj_itemEvent.obj_design.str_nameRecordTarget;      
      obj_ini.obj_design.int_modeExecute=obj_ini.int_modeReadOnly;//      
      
      int_idRecordPaletteLimit=this.obj_delegator.obj_design.int_idRecord;
      int_idRecord=obj_itemEvent.obj_design.int_idRecordTarget;
      obj_ini.obj_design.int_idRecord=int_idRecord;
      if(this.fn_isStandardComponent(obj_ini.obj_design.int_idRecord)){//standard component               
        obj_ini.obj_design.int_modeExecute=obj_ini.int_modeEdit;//
        obj_ini.obj_design.int_idRecord=0;
        obj_item=this.fn_addPaletteObject(obj_ini);
        return obj_item;
      } 
      else{
        //this.fn_getDependencyList(int_idRecord);        
        obj_item=this.fn_addPaletteObject(obj_ini);
        return obj_item;
      }     
    }    
    fn_getDependencyList(int_idRecord){//to delete the loaded instance

      let obj_designFile=this.obj_delegator.obj_holder.obj_designFile;
      let obj_designFileIni=new Object;
      obj_designFileIni.int_idRecord=obj_projectTarget;
      obj_designFileIni.str_IdValidator=this.obj_delegator.obj_design.str_id;
      obj_designFileIni.str_actionCallback="getDependencyList";
      obj_designFile.fn_getDependencyList(obj_designFileIni);
    }
    fn_getDependencyListCallback(){
      
      obj_item=this.fn_addPaletteObject(obj_ini);
      return obj_item;
    }

    fn_isStandardComponent(int_idRecord){      
      if(int_idRecord<=this.obj_delegator.obj_design.int_idRecord){//standard component         
        return true;
      }
      return false;
    }
    fn_isCustomComponent(int_idRecord){      
      if(int_idRecord>this.obj_delegator.obj_design.int_idRecord){//custom component         
        return true;
      }
      return false;
    }

    
    

    fn_validateContainer(obj_container, int_idRecordSearch){

      let bln_debug=true;      

      //At no point in the containers id lineage should int_idRecord occurr
      //(or possibly any of id records children)          
      if(!obj_container){//new component
        if(bln_debug){console.log("CONTAINER IS FALSE");}
        return false;
      }      
      
      if(parseInt(obj_container.obj_design.int_modeExecute)!==this.int_modeEdit){//new component
        if(bln_debug){console.log("CONTAINER IS NOT EDITABLE");}      
        return false;
      }            


      if(int_idRecordSearch===0){//new component
        //if(bln_debug){console.log("int_idRecordSearch is 0");}
        return true;
      }      
      if(obj_container.obj_design.int_idRecord===0){//new component
        //if(bln_debug){console.log("obj_container.obj_design.int_idRecord is 0");}
        return true;
      }      
      
      let bln_inHistory=obj_container.fn_searchIdHistory(obj_container, int_idRecordSearch);
      if(bln_inHistory){        
        if(bln_debug){console.log("CANNOT INSERT PARENT INTO CHILD");}
        return false;
      }
      return true;

      

    }

    fn_addPaletteObject(obj_ini){

      let obj_container, obj_item;


      obj_container=obj_project.obj_palettSelected;

      if(!obj_container){
        alert("NO ITEM SELECTED");
        return;
      }

      let bln_container;
      bln_container=obj_container.obj_design.bln_container;

      if(obj_container.obj_design.bln_isGenericTag){
        bln_container=this.fn_genericTagIsContainer(obj_container.obj_design.str_tag);
      }
      if(!bln_container){
        obj_container=obj_project.obj_palettSelected.obj_holder.obj_container;
      }

      if(!obj_container){
        return;        
      }      
      
      let bln_valid=this.fn_validateContainer(obj_container, obj_ini.obj_design.int_idRecord);            
      if(!bln_valid){
        //alert("INVALID CONTAINER");//leave on til status light !       
        //console.log("INVALID CONTAINER")
        return;
      }
      
      switch(obj_ini.obj_design.str_type.toUpperCase()){
        case "GRIDITEM":
          obj_container=this.obj_delegator.obj_lastGrid;//not part of eazygrid
        break;
        default:
      }
      //ADD ITEM
      //This will need to have obj_ini.obj_design.int_idRecord, if adding an saved instance component
      obj_item=obj_container.obj_designDelegate.fn_addPaletteItem(obj_ini);
      //ADD ITEM




      switch(obj_item.fn_getType()){
        case "GRID":
          this.obj_delegator.obj_lastGrid=obj_item;//not part of eazygrid
        break;
      }



    
      switch(obj_item.fn_getType()){
        case "GRID":
          obj_projectTarget.fn_applyTheme();
        break;
        case "GRIDITEM":
          obj_projectTarget.fn_applyTheme();
        break;
      }
    


      return obj_item;
    }

    fn_genericTagIsContainer(tag) {
      if(tag===undefined){alert("Error: fn_genericTagIsContainer tag is undefined");}
      let o=document.createElement(tag);

      let bln_canHaveHtml=this.canHaveHTML(o);
      //alert("fn_genericTagIsContainer: " + o.outerHTML + ":" + bln_canHaveHtml);
      o.remove();
      return bln_canHaveHtml;
    }

    // Improving the `canHaveHTML` using `canHaveChildren`,
  // using the approach shown by Mårten Wikström
  canHaveChildren(node) {

    // Returns false if it's not an element type node; or if it has a end tag.
    // Use the `ownerDocument` of the `node` given in order to create
    // the node in the same document NS / type, rather than the current one,
    // useful if we works across different windows / documents.
    return node.nodeType === 1 && node.ownerDocument
        .createElement(node.tagName).outerHTML.indexOf("></") > 0;
  }

  canHaveHTML(node) {

    // We don't bother to create a new node in memory if it
    // can't have children at all
    if (!this.canHaveChildren(node))
      return false;

    // Can have children, then we'll check if it can have
    // HTML children.
    node = node.ownerDocument.createElement(node.tagName);

    node.innerHTML = "<b></b>";

    // if `node` can have HTML children, then the `nodeType`
    // of the node just inserted with `innerHTML` has to be `1`
    // (otherwise will be likely `3`, a textnode).
    return node.firstChild.nodeType === 1;
  }

    fn_removePaletteItem(){

      let obj_item;

      obj_item=obj_project.obj_palettSelected;
      if(!obj_item){
        //alert("There is no item selected to remove");
        return;
      }
      if(obj_item===obj_projectTarget){
        alert("Cannot Remove Project Instance")
        return;
      }

      obj_item.obj_holder.obj_container.obj_designDelegate.fn_removePaletteItem(obj_item);
    }
    fn_onPaletteItemSelected(){
      this.obj_menuButton.fn_open();
      //this.obj_menuButton.obj_design.bln_isPinned=true;
    }

    fn_viewSelectedHTML(){
      obj_project.obj_palettSelected.obj_designDelegate.fn_viewHTML();
    }    

    fn_savePaletteSelected(obj_item){//This relates to saving a component within the Project Isntance ie from the aciton button      
      let obj_designFile=this.obj_delegator.obj_holder.obj_designFile;
      let obj_ini=new Object;
      obj_ini.ObjectInstance=obj_item;      
      obj_designFile.fn_saveComponent(obj_ini);
    }
    fn_onSavePaletteSelectedCallBack(){
      this.obj_delegator.fn_getListProjectComponent();
    }
    //END PROJECT SPECIFIC EVENT
    //END PROJECT COMPONENTS
}//END CLS
//END PROJECT
