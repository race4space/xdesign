class BaseObject extends LevelObject{
    constructor(obj_ini) {
        super(obj_ini); 
        
        this.fn_initialize(obj_ini);
    }    
    fn_initialize(obj_ini){                           
        
        this.obj_ini=obj_ini;//required   
        if(this.obj_holder==undefined){//ensure continuity of obj_holder variables e.g obj_holder.obj_container
            this.obj_holder=new Holder;//required
        }     
        
        //START INITIALIZE DESIGN
        this.obj_design=obj_ini.obj_design;        
        
        this.fn_setContainer(false);
        
        if(this.obj_design.str_id==undefined){this.obj_design.str_id=obj_shared.fn_getUniqueId("myId");}
        if(this.obj_design.str_name==undefined){this.obj_design.str_name=undefined;}//ensure visible placeholder at front of object defintion
        if(this.obj_design.str_type==undefined){this.obj_design.str_type=undefined;}//ensure visible placeholder at front of object defintion
        if(this.obj_design.str_tag==undefined){this.obj_design.str_tag=undefined;}//ensure visible placeholder at front of object defintion

        if(this.obj_design.str_content===undefined){this.obj_design.str_content="";}           
        
        this.obj_design.int_modeExecute=obj_ini.obj_design.int_modeExecute;         
        if(this.obj_design.int_modeExecute===undefined){this.obj_design.int_modeExecute=undefined;}  
        
        this.obj_design.arr_item=obj_ini.obj_design.arr_item;
        if(this.obj_design.arr_item===undefined){this.obj_design.arr_item=[];}      

        if(this.obj_design.arr_item.length===0){
            this.obj_design.arr_item=[];
        }
        

        if(obj_ini.obj_design.str_nameEventClick){this.obj_design.str_nameEventClick=obj_ini.obj_design.str_nameEventClick;}//this will usually be set by the container
        if(obj_ini.obj_design.str_valueEventClick){this.obj_design.str_valueEventClick=obj_ini.obj_design.str_valueEventClick;}//this will usually be set by the container
        
        if(obj_ini.obj_design.str_nameEventChange){this.obj_design.str_nameEventClick=obj_ini.obj_design.str_nameEventChange;}//this will usually be set by the container
        if(obj_ini.obj_design.str_valueEventChang){this.obj_design.str_valueEventChange=obj_ini.obj_design.str_valueEventChange;}//this will usually be set by the container

        /*
        this.obj_design.str_nameEventClick=obj_ini.obj_design.str_nameEventClick;//this will usually be set by the container
        this.obj_design.str_valueEventClick=obj_ini.obj_design.str_valueEventClick;//this will usually be set by the container        
        
        this.obj_design.str_nameEventChange=obj_ini.obj_design.str_nameEventChange;
        this.obj_design.str_valueEventChange=obj_ini.obj_design.str_valueEventChange;
        //*/
        
        this.obj_design.str_linkId=obj_ini.obj_design.str_linkId;
        if(this.obj_design.str_linkId===undefined){this.obj_design.str_linkId=undefined;} 
        
        this.obj_design.bln_listenClick=obj_ini.obj_design.bln_listenClick;
        if(this.obj_design.bln_listenClick===undefined){this.obj_design.bln_listenClick=undefined;}        

        this.obj_design.bln_listenChange=obj_ini.obj_design.bln_listenChange;
        if(this.obj_design.bln_listenChange===undefined){this.obj_design.bln_listenChange=undefined;}        
        //END INITIALIZE DESIGN        
        
        //START INITIALIZE DOM PROPERTY
        this.obj_domProperty=obj_ini.obj_domProperty;                              
        //END INITIALIZE DOM PROPERTY

        //START INITIALIZE DOM ATTRIBUTE
        this.obj_domAttribute=obj_ini.obj_domAttribute;                              
        //END INITIALIZE DOM ATTRIBUTE
        
        //START INITIALIZE STYLE        
        /*
        DONT set str_height, str_width, str_padding on base object         
        AVOID specified values here. Leave them undefined. Allow sub class to overidde undefined.
        //*/
        this.obj_domStyle=obj_ini.obj_domStyle;
        //END INITIALIZE STYLE        

        //START INITIALIZE THEME
        this.obj_theme=obj_ini.obj_theme;                      
        //END INITIALIZE THEME
    }      
    
    fn_addItem(obj_ini){
        
        if(obj_ini==undefined){
            return;
        }
        
        let obj_item;
        let str_type, str_tag;                       

        

        str_type=obj_ini.obj_design.str_type;                
        
        
        
        try {                        
            obj_item = new (obj_ComponentMap.get(str_type))(obj_ini);            
        }        
        catch(err) {   
            console.log("SUBSTITUTING TAG: " + obj_ini.obj_design.str_type);
            obj_item = new (obj_ComponentMap.get("Tag"))(obj_ini);            
        }
        
        str_type=obj_item.fn_getType();              
        str_tag=obj_item.fn_getTag();
        //create the dom with the informaiton saved into parent component

        obj_item.obj_holder.obj_container=this; 
        
        if(obj_item.obj_design.int_modeExecute===undefined){      //baseobjects will get parents modeExecute
            obj_item.obj_design.int_modeExecute=this.obj_design.int_modeExecute;              
        }       

        
        /*
        console.log("str_type: " + str_type);
        console.log("str_tag: " + str_tag);
        //*/
        
        let int_index, int_remove=0;        
        
        //Following options:            
        //START CREATE DOM ELEMENT
        //To Do
        //1. Creating Own Tag                 
        //2. Use Exisitng Tag and Allow/DisAllow manipulation of this e.g flex, padding etc
        //*/

        switch(str_type){
            case "TABLEROW":                                
                int_index=this.obj_design.arr_item.length;
                this.obj_design.arr_item.splice(int_index, int_remove, obj_item);                
                obj_item.dom_obj = this.dom_obj.insertRow();
                
            break;            
            case "TABLECELL":
                int_index=this.obj_design.arr_item.length;
                this.obj_design.arr_item.splice(int_index, int_remove, obj_item);
                obj_item.dom_obj = this.dom_obj.insertCell();                
            break;                                    
            default:    

                
                switch(str_type){//.nodeType
                    case "TEXTNODE":
                        obj_item.dom_obj = document.createTextNode(obj_item.obj_design.str_content);                                                      
                        break;
                    case "COMMENT":
                    obj_item.dom_obj = document.createComment(obj_item.obj_design.str_content);                                                      
                        break;
                    default:
                        obj_item.dom_obj = document.createElement(obj_item.obj_design.str_tag);                                                      
                        break;

                }                            
                obj_item.dom_objContent=obj_item.dom_obj;//potentially not necessary as this should be set in createSelf                    
                //POSITION DOM ELEMENT
                this.fn_positionItem(obj_item, obj_ini);
                //We need to get the item dom into the page, as fn_create_self may be overriden
        }
        //END CREATE DOM ELEMENT
        
        
        obj_item.fn_execute();        
                    
        return obj_item;
    }
    
    fn_isElement(){return this.dom_obj.nodeType===1;}

    fn_execute(){//overidden by component object - but not called by component object

        if(!this.fn_isElement()){return;}
        
        this.fn_createSelf();        

        this.fn_onOpenInstance();//overridden by component

        
    }        

    fn_createSelf(){//overidden, but should be called 
        

        //dom object must be in place by now

        let str_designMarker=obj_project.obj_design.str_prefix;//needs to go into design object
        
        this.dom_objContent=this.dom_obj;//can be overidden to be another than own dom obj
        this.dom_obj.setAttribute(str_designMarker + "id", this.obj_design.str_id);                    
        
        this.fn_setEventAttributes();        
        
        if(this.obj_design.str_linkId!==undefined){
            this.dom_obj.setAttribute("linkId", this.obj_design.str_linkId);                      
        }

        this.fn_setHTMLContent();

        //BY THIS POINT THE ITEM WILL HAVE AN ELEMENT, INSERTED IN THE DOM                
        this.fn_onLocateInDom();
        
    }
    fn_onLocateInDom(){//overidden to do nothing in project instance          
        //this is essential to fire on any published object.
        //called at end of create self
        //console.log(this.obj_design.str_type);
        this.fn_Listen();
    }    

    fn_onOpenInstance(){//not overidden by Component
        
        if(this.obj_design.arr_item.length===0){
            //for component, if no server trip, (due to recordid=0), length will be zero. Otherwise , the server trip will have completed, arr_item will be full
            //other objects can have default add children methods
            //therefoere we avoid the need to overide this for component using intiIdRecord=0
            this.fn_createChildren();                        
        }
        else{
          this.fn_loadChildren();//if obj_design.arr_item is in place, eg from JSON seriolization
        } 
        
        
        this.fn_onLoad();
    }

    fn_initializePlugins(){//can be overidden        
        
        if(window.self!=window.top){
            if(this.obj_design.int_modeExecute<10){                                         
                this.fn_initializePluginDesign();//can be overidden
                this.obj_designDelegate.fn_setup();//must be 2 separatre functions
            }
        }
    }

    fn_initializePluginDesign(){//overidden by ProjectInstance and GridItem                
        this.obj_designDelegate=new DesignDelegate(this);
    }
    
    
    fn_onLoad(){//can be overriden , but should be called               

        if(this.obj_design.str_IdValidator!==undefined){//Used to inform load event for objects within the component environment
            this.obj_validator=obj_project.fn_findItemById(this.obj_design.str_IdValidator);             
            if(this.obj_validator){
                this.obj_validator.fn_validate(this);                        
            }
        }        
        this.fn_applyFeatures();

        this.fn_initializePlugins();                

        
        //this is the end of the object creation process
    }   
    
    fn_debugDesign(obj_design, str_title=""){                
        
        console.groupCollapsed(str_title);        
        console.log("int_idRecord: " + obj_design.int_idRecord);                
        console.log("str_id: " + obj_design.str_id);
        console.log("int_modeExecute: " + obj_design.int_modeExecute);                              
        console.log("str_name: " + obj_design.str_name);        
        console.log("str_type: " + obj_design.str_type);        
        console.log("str_tag: " + obj_design.str_tag);        
        console.log("str_nameEventClick: " + obj_design.str_nameEventClick);        
        console.log("str_valueEventClick: " + obj_design.str_valueEventClick);                              
        console.groupEnd();
    }
    fn_debugDom(dom_obj, str_title=""){                
        
        if(!dom_obj){
            console.log("dom_obj is not yet in place");                    
            return;
        }
        console.groupCollapsed(str_title);                
        console.log("outerHTML: " + dom_obj.outerHTML);                
        console.groupEnd();
    }    

    fn_debugItems(){

        let arr, obj_item
        arr=this.obj_design.arr_item;        
        this.fn_debug("DEBUG: " + this.obj_design.str_type);
        for(let i=0;i<arr.length;i++){
            obj_item=this.obj_design.arr_item[i];
            obj_item.fn_debugItems();
            
        }
        
    }

    fn_debug(str_title=""){                
        
        if(str_title===undefined){str_title="";}
        let str_name=this.obj_design.str_name;
        if(str_name===undefined){str_name="";}        
        if(str_name){str_title+=": " + str_name;}
        console.groupCollapsed(str_title);        
        console.log("typeof: " + typeof this);
        console.log("constructor: " + this.constructor.name);        
        this.fn_debugDesign(this.obj_design);      
        this.fn_debugDom(this.dom_obj);      
        console.groupEnd();
    }
    
    fn_debugAlert(){
        let s="";
        s+="typeof: " + typeof this + "\r";
        s+="str_id: " + this.obj_design.str_id + "\r";
        s+="str_type: " + this.obj_design.str_type + "\r";
        alert(s);
    }

    fn_listId(){

        let str_val, int_idRecord, str_delim;
        str_val="";
        str_delim=",";                
        int_idRecord=this.obj_design.int_idRecord;
        if(int_idRecord){                
            str_val=int_idRecord + str_delim;
        }
        return str_val;
    }

    fn_compileDependentId(){
        let str_val="";        
        str_val+=this.fn_listDependentId();//Get List of Compone Ids
        str_val=str_val.slice(0,-1);         
        return str_val;
    }

    fn_listDependentId(){        
        let str_val="";
        let arr=this.obj_design.arr_item;        
        for(let i=0;i<arr.length;i++){
            let obj_item=arr[i];
            if(obj_item.bln_isComponent){
                str_val+=obj_item.fn_listId();                
            }
            str_val+=obj_item.fn_listDependentId();
        }                
        return str_val;
    }

    fn_validIdHistory(){

        let int_id_record=this.obj_design.int_idRecord;
        if(!int_id_record){return true;}
        let obj_container=this.fn_getParentComponent();
        if(!obj_container){return true;}
        let bln_exist=this.fn_searchIdHistory(obj_container, int_id_record);
        if(bln_exist){return false;}
        return true;
    }

    fn_searchIdHistory(obj_item, str_listIdRecordSearch){
        
        
        let int_idRecord=obj_item.obj_design.int_idRecord;
        
            
        str_listIdRecordSearch+="";
        int_idRecord+="";
        let bln_val=obj_shared.fn_inStr(str_listIdRecordSearch, int_idRecord);        

        //console.log("str_listIdRecordSearch: " + str_listIdRecordSearch);
        //console.log("int_idRecord: " + int_idRecord);
        
        if(bln_val){            
            return true;
        }
        let obj_parent=obj_item.fn_getParentComponent();
        if(!obj_parent){return false;}

        return this.fn_searchIdHistory(obj_parent, str_listIdRecordSearch);        
    }
   

    fn_getParentComponent(){

        let obj_parent=this.obj_holder.obj_container;
        if(obj_parent && obj_parent.bln_isComponent){
            return obj_parent;
        }
        return false;

    }
    
    fn_positionItem(obj_item, obj_ini=""){  
        //Part of  the Add Item Process
        //allows child item to be inserted at a position in the item array and the parent container
        
        let int_index, int_remove=0;
        let int_index_before, int_index_after, int_index_object;

        let bln_InsertPosition=obj_ini.bln_InsertPosition;
        if(bln_InsertPosition===undefined){
            bln_InsertPosition=true;
        }
        if(obj_ini.obj_ItemTemplate){//to do with the mask maybe
            int_index_object = this.fn_findItemIndex(obj_ini.obj_ItemTemplate);
            if(bln_InsertPosition){//After
            int_index=int_index_object+1;
            obj_ini.obj_ItemTemplate.fn_positionAfter(obj_item);
            }
            else{//Before
            int_index=int_index_object;
            obj_ini.obj_ItemTemplate.dom_objContent.before(obj_item.dom_obj);

            }
            this.obj_design.arr_item.splice(int_index, int_remove, obj_item);
        }
        else{
            if(bln_InsertPosition){//End
                int_index=this.obj_design.arr_item.length;
                this.dom_objContent.append(obj_item.dom_obj);                
            }
            else{//Start
                int_index=0;
                this.dom_objContent.prepend(obj_item.dom_obj);
            }                
            this.obj_design.arr_item.splice(int_index, int_remove, obj_item);
        }        

    }
    
    fn_popItem(){
        if(!this.dom_objContent.lastChild){
            return;
        }
        this.dom_objContent.removeChild(this.dom_obj.lastChild);
    }
    fn_positionAfter(obj_item){
        this.dom_objContent.after(obj_item.dom_obj);
    }    
    
    fn_removeChildren(){
        this.fn_removeItems();        
    }

    fn_createChildren(){//in boot phase , and often overidden        
    }

    fn_loadChildren(){

        let obj_ini, obj_item;
        let arr_ini;
        arr_ini=this.obj_design.arr_item.slice();//creat ea temporary copy of obj_design.arr_item which will contain "ini objects"
        this.obj_design.arr_item=[];//reset this arr item to empty array .

        arr_ini.forEach(obj_ini => {
            //console.log("fn_build: " + this.obj_design.str_type);
            //fn_enumerateObject(obj_ini, "BaseObject fn_loadChildren");            
            obj_item=this.fn_addItem(obj_ini);
         });

    } 
    
    fn_removeItems(){
        
        let arr, obj_item
        arr=this.obj_design.arr_item;
        this.fn_removeAllContent();
        for(let i=0;i<arr.length;i++){
            obj_item=this.obj_design.arr_item[i];            
            if(!obj_item){
                //alert("!obj_item");
            }
            else{
                this.fn_removeItem(obj_item);
            }
        }
    }     

    
    
    fn_removeItem(obj_item){

        obj_item.fn_removeItems();
        
        let arr, int_index;
        arr=this.obj_design.arr_item;
        int_index=0;
        if(arr.length){
            int_index=this.obj_design.arr_item.indexOf(obj_item);            
            if (int_index!==(-1)) {
                arr.splice(int_index, 1);                        
            }
            else{
                alert("should never see");//should never see
            }
        }
        obj_item.fn_onRemove();        
    }   
    
    
    fn_onRemove(){
        this.dom_obj.remove();        
    }

    fn_applyTheme(){

        if(this.obj_theme.borderRadius){
            this.fn_setStyleAttribute("borderRadius", this.obj_theme.borderRadius);          
        }
        if(this.obj_theme.fontFamily){
        this.fn_setStyleAttribute("fontFamily", this.obj_theme.fontFamily);                  
        }
    }

    fn_isContainer(){
        //equivalent of can have chlidren        
        return this.obj_design.bln_container;                
    }    
    
    fn_setContainer(bln_val){
        //equivalent of can have chlidren        
        this.obj_design.bln_container=bln_val;                
    }    
    fn_validate(){
    }
    
    fn_copyArray(arr_source){
        return arr_source.slice();
    }   
    
    fn_getLastItem(){        

        let obj_target=this.obj_holder.obj_lastItem;
        let arr_item=this.obj_design.arr_item;        
        if(!arr_item.length){return false;}        
        if(!obj_target){
            obj_target=arr_item[0];
        }
        return obj_target;
    } 
    fn_getEndItem(){
        
        let arr, obj_item;
        arr=this.obj_design.arr_item;        
        obj_item=this;
        if(arr.length){
            obj_item=arr[arr.length-1];                        
            obj_item=obj_item.fn_getEndItem();
        }
        return obj_item;
    }

    fn_getLimitLeft(){            
        
        let obj_container, int_index;
        obj_container=this.obj_holder.obj_container;
        if(!obj_container){return true;};
        int_index=obj_container.fn_findItemIndex(this);
        if(int_index<=0){return true;}            
        return false;
      }
      fn_getLimitRight(){                                
        let obj_container, int_index;
        obj_container=this.obj_holder.obj_container;
        if(!obj_container){return true;};
        int_index=obj_container.fn_findItemIndex(this);
        if(int_index===obj_container.obj_design.arr_item.length-1){return true;}
        return false;
      }      
      fn_getLimitTop(){                        
        let obj_container=this.obj_holder.obj_container;        
        if(!this.obj_holder.obj_container){return true;}      
        if(this===obj_project){return true;}                        
        return false;
      }
      fn_getLimitBottom(){                
        let arr=this.obj_design.arr_item;       
        let bln_has_grandChildren;
        if(!arr.length){return true;}        
        return false;
      }
      fn_getLimitGrandChild(){
        let bln_has_grandChild=this.fn_hasGrandChild();
        if(!bln_has_grandChild){return true;}        
        return false;
      }
      fn_hasGrandChild(){        
        let arr, int_val, obj_item;        
        arr=this.obj_design.arr_item;        
        for(let i=0;i<arr.length;i++){
            obj_item=arr[i];
            int_val=obj_item.obj_design.arr_item.length;
            if(int_val>0){return true;}
        }
        return false;
    }
    fn_setLevelLimit(){        
        
        let obj_levelLimit=new Object;              
        obj_levelLimit.obj_item=this;        
        obj_levelLimit.bln_limitTop=this.fn_getLimitTop();      
        obj_levelLimit.bln_limitLeft=this.fn_getLimitLeft();      
        obj_levelLimit.bln_limitRight=this.fn_getLimitRight();      
        obj_levelLimit.bln_limitBottom=this.fn_getLimitBottom();     
        obj_levelLimit.bln_limitGrandChild=this.fn_getLimitGrandChild();     
        obj_levelLimit.bln_hasAllLimit=false;
        if(obj_levelLimit.bln_limitTop && obj_levelLimit.bln_limitLeft && obj_levelLimit.bln_limitRight && obj_levelLimit.bln_limitBottom){
            obj_levelLimit.bln_hasAllLimit=true;            
        }
        this.obj_holder.obj_levelLimit=obj_levelLimit;        
    }

    
    
    fn_findItemById(str_id){        
        var obj_match, obj_item;
        if(this.obj_design.str_id===str_id){
            return this;
        }
        for(var i=0;i<this.obj_design.arr_item.length;i++){
            obj_item=this.obj_design.arr_item[i];            
            obj_match=obj_item.fn_findItemById(str_id);
            if(obj_match){
                break;
            }
        }
        if(obj_match){return obj_match;}
        return false;
    }
    fn_findItemIndex(obj_item){
        let arr=this.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            if(arr[i]==obj_item){
                return i;
            }
        }
        return -1;
    }


    fn_applyFeatures(){   
        //if(this.fn_getTag()==="H1"){alert("H1")}         
        this.fn_applyTheme();             
        this.fn_applyDomProperty();               
        this.fn_applyDomAttribute();
        this.fn_applyStyle();       
    }
    
    fn_applyDomProperty(){                     
        let arr_Property=Object.entries(this.obj_domProperty);      
        for (let [str_key, foo_val] of arr_Property) {           
            //console.log("PROPERTY: " + str_key + ": " + foo_val);          
            this.fn_setDomProperty(str_key, foo_val);            
        }        
    }

    fn_applyDomAttribute(){                     
        let arr_Property=Object.entries(this.obj_domAttribute);      
        for (let [str_key, foo_val] of arr_Property) {           
            //console.log("ATTRIB: " + str_key + ": " + foo_val);          
            this.fn_setDomAttribute(str_key, foo_val);        
            //this.dom_obj.setAttribute(str_key, foo_val);                                                      
        }        
    }
    
    fn_setDomProperty(str_name, str_value){ 

        if(str_name.toLowerCase()==="innertext" || str_name.toLowerCase()==="textcontent"){            
            this.dom_obj.innerText="";
            this.dom_obj.textContent="";
            this.dom_obj.innerText=str_value;
            this.dom_obj.textContent=str_value;
        }

        
        this.obj_domProperty[str_name]=str_value;        
        this.obj_domAttribute[str_name]=str_value;        
        
        if(str_value===false){            
            if(this.dom_obj){                                
                this.dom_obj[str_name]=undefined;                                      
            }
        }
        else{            
            this.dom_obj[str_name]=str_value;  
        }
    }    

    fn_setDomAttribute(str_name, str_value){        

        if(str_name.toLowerCase()==="innertext" || str_name.toLowerCase()==="textcontent"){            
            this.dom_obj.innerText="";
            this.dom_obj.textContent="";
            this.dom_obj.innerText=str_value;
            this.dom_obj.textContent=str_value;
        }

        this.obj_domProperty[str_name]=str_value;        
        this.obj_domAttribute[str_name]=str_value;        
        
        if(str_value===false){            
            if(this.dom_obj){                
                this.dom_obj.removeAttribute(str_name);       
            }
        }
        else{            
            this.dom_obj.setAttribute(str_name, str_value);                                                      
        }
    }
    
    fn_applyStyle(){        
        let arr_Property=Object.entries(this.obj_domStyle);      
        for (let [str_key, foo_val] of arr_Property) {           
          //console.log(str_key + ": " + foo_val);
          this.fn_setStyleAttribute(str_key, foo_val);          
        }
    }   

    fn_getStyleAttribute(str_name){        
        return this.obj_domStyle[str_name];
    }

    fn_setStyleAttribute(str_name, str_value){

        if(str_value==undefined){//allow undefined for most style attributes 
            if(str_name==="backgroundColor"){return;}
            if(str_name==="color"){return;}
        }

        switch(this.fn_getType()){
            case "GRID":
                if(str_name==="backgroundColor"){                    
                    this.fn_setItemStyleAttribute("GRID", "backgroundColor", str_value);        
                }
            break;
            default:
        }


        this.obj_domStyle[str_name]=str_value;
        let str_nameDom=str_name;
        this.dom_obj.style[str_nameDom]=str_value;
        if(str_nameDom==="pointerEvents"){
            //alert(this.dom_obj.style[str_nameDom]);
        }                          
        if(this.bln_debug){
            //console.log(this.obj_domProperty.innerText + ": " + str_nameDom + ": " + this.dom_obj.style[str_nameDom]);
        }        
    }

    fn_getDomAttribute(str_name){   
        return this.obj_domProperty[str_name];
    }
    fn_setDesignAttribute(str_name, foo_value){
        this.obj_design[str_name]=foo_value;              
    }

    fn_getBackgroundColor(){
        return this.dom_obj.style.backgroundColor;
      }        
    fn_setBackgroundColor(str_val){//overidden by component
          this.dom_obj.style.backgroundColor=str_val;
          this.obj_domStyle.backgroundColor=str_val;
    }        

    fn_getType(){        
        return this.obj_design.str_type.toUpperCase();
    }
    fn_getTag(){        
        return this.obj_design.str_tag.toUpperCase();
    }
    
    fn_setItemStyleAttribute(str_type, str_name, str_value){          

        let obj_item, arr;
        arr=this.obj_design.arr_item;        
        for(var i=0;i<arr.length;i++){
            obj_item=arr[i];                      
            if(obj_item.fn_getType()===str_type){                                
                obj_item.fn_setStyleAttribute(str_name, str_value);      
            }
            obj_item.fn_setItemStyleAttribute(str_type, str_name, str_value);
        }
    }
    
    fn_getHTMLContent(){        
        let str_content=this.obj_design.str_content;        
        return str_content;
    } 

    fn_setHTMLContent(str_content=""){        

        if(str_content===""){
            str_content=this.obj_design.str_content;
        }
        
        if(str_content===""){return;}
        if(!str_content){return;}
        if(str_content==="blank"){str_content=""}

        this.fn_removeAllContent();
        this.obj_design.str_content=str_content;
        this.dom_objContent.innerHTML=str_content;          
        if(this.bln_x){
            alert(this.dom_objContent.innerHTML);
        }        
    }        
    fn_removeAllContent(){        
        this.obj_design.str_content="";
        this.dom_objContent.innerHTML="";
        this.dom_objContent.data="";
        this.obj_design.arr_item=[];        
    }  
      
    fn_setEnabled(){                
        let obj_enabled=this.obj_holder.obj_enabled;
        if(!obj_enabled){return;}        
        if(!this.obj_domProperty.disabled){return;}
        let bln_val=this.fn_getDomAttribute("disabled");
        if(!bln_val){return;}

        this.fn_setDomAttribute("disabled", false);        
        this.fn_setStyleAttribute("pointerEvents", "auto");          
        this.fn_setStyleAttribute("cursor", obj_enabled.cursor);          
        this.fn_setStyleAttribute("color", obj_enabled.color);        
        this.fn_setStyleAttribute("backgroundColor", obj_enabled.backgroundColor);        
    }      

    fn_setDisabled(){  

        let bln_val=this.fn_getDomAttribute("disabled");
        if(bln_val){return;}
            
        this.obj_domProperty.disabled=true;
        
        let obj_enabled=new Object;
        obj_enabled=this.obj_holder.obj_enabled=new Object;        
        obj_enabled.pointerEvents=this.fn_getStyleAttribute("pointerEvents");                          
        obj_enabled.cursor=this.fn_getStyleAttribute("cursor");                  
        obj_enabled.color=this.fn_getStyleAttribute("color");                          
        obj_enabled.borderColor=this.fn_getStyleAttribute("borderColor");                  
        obj_enabled.backgroundColor=this.fn_getStyleAttribute("backgroundColor");                          
        
        this.fn_setDomAttribute("disabled", true);
        this.fn_setStyleAttribute("pointerEvents", "none");                  
        this.fn_setStyleAttribute("cursor", "default");                        
        this.fn_setStyleAttribute("color", "gray");         
    }
    fn_setInvisible(){                
        this.fn_setDisabled();
        this.fn_setStyleAttribute("borderColor", this.fn_getStyleAttribute("backgroundColor"));                  
    }
    fn_setVisible(){                
        this.fn_setEnabled();
        let obj_enabled=this.obj_holder.obj_enabled;
        this.fn_setStyleAttribute("borderColor", obj_enabled.borderColor);                          
    }    

    
    //START EVENT MANAGEMENT
    fn_click(){//if a component , this needs to be captured on the instance, as the default compoent is blank
        this.fn_event();                
    }
    fn_change(){               
        this.fn_event();                
    }
    fn_event(){          
        obj_project.obj_projectEvent=this;           
    }

    fn_setEventAttributes(){//allows parent component to catch the event via fn_event_call
        
        // this allows the event to be regsitered to a parent component, than the child object the event occurred on                                         
        if(this.obj_design.str_nameEventClick!==undefined){
            //this.fn_debug("fn_setEventAttributes str_nameEventClick");
            this.dom_obj.setAttribute(this.obj_design.str_nameEventClick, this.obj_design.str_valueEventClick);
        }
        
        // this allows the event to be regsitered to a parent component, than the child object the event occurred on                       
        if(this.obj_design.str_nameEventChange!==undefined){            
            this.dom_obj.setAttribute(this.obj_design.str_nameEventChange, this.obj_design.str_valueEventChange);
        }
    }    
    fn_Listen(){//allows this object to catch the event     
        
        let that=this;

        
        if(this.obj_design.bln_listenClick){                    
            this.dom_obj.addEventListener('click', function(e){                                       
                e.preventDefault();
                that.fn_click();
            });
        }
        
        if(this.obj_design.bln_listenChange){                    

            
            this.dom_obj.addEventListener('change', function(e){                                       
                e.preventDefault();
                
                that.fn_change();                
            });

            
            
        }
    }
    //END EVENT MANAGEMENT    
    
}//END CLS