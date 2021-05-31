

/*START COMPONENT//*/
/*id: 100//*/
/*type: RuntimeCode//*/
//START Runtime/Shared.js
class Shared{
  constructor(){
  }
fn_removeSpace(str){        
  str = str.replace(/\s+/g, '');
  return str;
}

fn_isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
fn_hasMembersObject(obj) {
  return Object.keys(obj).length !== 0;
}

fn_inStr(str_haystack, str_needle){

  let int_pos=str_haystack.indexOf(str_needle);
  if(int_pos===-1){return false;}
  return true;
}

 fn_enumerateObject(obj_myObj, str_message=""){

    console.groupCollapsed("ENUMERATE OBJECT " + str_message);

    for (let [key, foo_value] of Object.entries(obj_myObj)) {
        console.log(`${key}: ${foo_value}`);
        if (typeof foo_value === "object" && foo_value !== null && key=="obj_design")  {
            this.fn_enumerateObject(foo_value, "");
        }
        else{
            //console.log(`${key}: ${foo_value}`);
        }
    }
    console.groupEnd();
  }
  fn_iteratePropertyNames(obj){
    do Object.getOwnPropertyNames(obj).forEach(function(name) {
        console.log(name);
    });
    while(obj = Object.getPrototypeOf(obj));
  }

  fn_findInObject(obj_myObj, str_search){
    for (let [key, foo_value] of Object.entries(obj_myObj)) {
        console.log(`${key}: ${foo_value}`);
    }
  }

  fn_getUniqueId(str_id){
    let generator = new IDGenerator();
    return str_id +"_" + generator.generate();
  }
   fn_getRandom(number) {
    return Math.floor(Math.random() * (number+1));
  }

  fn_getRandomColor() {
    return 'rgb(' + this.fn_getRandom(255) + ',' + this.fn_getRandom(255) + ',' + this.fn_getRandom(255) + ')';
  }


  fn_flipBool(bln_val){
    if(bln_val){return false;}
    else{return true;}
  }
  fn_parseBool(foo_val){
    switch(foo_val.toLowerCase()){
      case "false":
        foo_val=false;
        break;
      case "0":
        foo_val=false;
        break;
      case "no":
          foo_val=false;
        break;
      case "true":
        foo_val=true;
        break;
      case "1":
        foo_val=true;
        break;
      case "yes":
        foo_val=true;
        break;
      default:
    }
    return foo_val;
  }

  getAllFuncs(toCheck) {
    var props = [];
    var obj = toCheck;
    do {
        props = props.concat(Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));

    return props.sort().filter(function(e, i, arr) {
       if (e!=arr[i+1] && typeof toCheck[e] == 'function') return true;
    });
  }

  fn_removeArrOfArrays(arr_first, arrOfArrays) {
    let str_value1, str_value2;
    let i, j;
    for (i=0; i<arr_first.length; i++) {
        str_value1=arr_first[i];

        for (j=0; j<arrOfArrays.length; j++) {
          str_value2=arrOfArrays[j][0];
          if(str_value1===str_value2){
            arrOfArrays.splice(j, 1);
          }
        }

    }
    return arrOfArrays;
}
}//END CLS



function IDGenerator() {

  this.length = 8;
  this.timestamp = +new Date;

  var _getRandomInt = function( min, max ) {
   return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }

  this.generate = function() {
    var ts = this.timestamp.toString();
    var parts = ts.split( "" ).reverse();
    var id = "";

    for( var i = 0; i < this.length; ++i ) {
     var index = _getRandomInt( 0, parts.length - 1 );
     id += parts[index];
    }

    return id;
  }
}
//END SHARED

function fn_onScroll(){  
}

// Parameters:
// code 								- (string) code you wish to format
// stripWhiteSpaces			- (boolean) do you wish to remove multiple whitespaces coming after each other?
// stripEmptyLines 			- (boolean) do you wish to remove empty lines?
var fn_formatCode = function(code, stripWhiteSpaces=true, stripEmptyLines=true) {
  //"use strict";
  var whitespace          = ' '.repeat(4);             // Default indenting 4 whitespaces
  var currentIndent       = 0;
  var char                = null;
  var nextChar            = null;


  var result = '';
  for(var pos=0; pos <= code.length; pos++) {
      char            = code.substr(pos, 1);
      nextChar        = code.substr(pos+1, 1);

      // If opening tag, add newline character and indention
      if(char === '<' && nextChar !== '/') {
          result += '\n' + whitespace.repeat(currentIndent);
          currentIndent++;
      }
      // if Closing tag, add newline and indention
      else if(char === '<' && nextChar === '/') {
          // If there're more closing tags than opening
          if(--currentIndent < 0) currentIndent = 0;
          result += '\n' + whitespace.repeat(currentIndent);
      }

      // remove multiple whitespaces
      else if(stripWhiteSpaces === true && char === ' ' && nextChar === ' ') char = '';
      // remove empty lines
      else if(stripEmptyLines === true && char === '\n' ) {
          //debugger;
          if(code.substr(pos, code.substr(pos).indexOf("<")).trim() === '' ) char = '';
      }

      result += char;
  }

  return result;
}

//END Runtime/Shared.js
//START Runtime/LevelObject.js
class LevelObject {
    constructor() {      
    }  
    fn_isObject(foo_val){
      if(typeof foo_val === 'object' && foo_val !== null){
        return true;
      }
      return false;
    }                  
    fn_flipBool(bln_bool){
      if(bln_bool){return false;}
      return true;
    }
    fn_debug(obj_debug=false, str_message=""){

      if(!obj_debug){
        obj_debug=this;
      }
      console.groupCollapsed("DEBUG OBJECT " + str_message);    
      console.log("obj_design.str_type: " + obj_debug.obj_design.str_type);
      console.log("str_name: " + obj_debug.obj_design.str_name);
      console.log("obj_design.str_tag: " + obj_debug.obj_design.str_tag);
      console.log("str_id: " + obj_debug.obj_design.str_id);
      console.groupEnd();
      //this.fn_enumerateObject(obj_debug, "LEVEL OBJECT DEBUG")
    }
   fn_enumerateObject(obj_myObj, str_message=""){            
    
      console.groupCollapsed("ENUMERATE OBJECT " + str_message);    
  
      for (let [key, foo_value] of Object.entries(obj_myObj)) {        
          console.log(`${key}: ${foo_value}`);        
          if (typeof foo_value === "object" && foo_value !== null) {            
              //fn_enumerateObject(foo_value, "");
          }
          else{
              //console.log(`${key}: ${foo_value}`);        
          }
      }    
      console.groupEnd();
  }  
  fn_cloneObject(source){      
    return Object.assign({}, source);  
  }
}
//END CLASS LevelObject
//END Runtime/LevelObject.js
//START Runtime/Holder.js

class Holder extends LevelObject{  
    constructor() {      
      super();            
      this.int_modeReadOnly=1;       
      this.int_modeEdit=2;       
      this.int_modeRuntime=10;       

      this.obj_design={};   
      this.obj_domStyle={};   
      this.obj_domProperty={};         
      this.obj_domAttribute={};         
      this.obj_theme={};   

      this.obj_design.int_modeExecute=this.int_modeEdit;     
    } 
    
}

//END Runtime/Holder.js
//START Runtime/BaseObject.js
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
//END Runtime/BaseObject.js
//START Runtime/Debug.js
  class Debug {
    constructor() {      
    }        

    fn_debugServerResponse(Response, bln_expanded=false){        

        
        let str_title="DEBUG SERVER RESPONSE";
        //if(!bln_expanded){console.groupCollapsed(str_title);}
        //else{console.group(str_title);}
        console.group(str_title);

        console.log("Response.headers: " + Response.headers);
        console.log("Response.ok: " + Response.ok);
        console.log("Response.redirected : " + Response.redirected);
        console.log("Response.status : " + Response.status);
        console.log("Response.statusText : " + Response.statusText);
        console.log("Response.trailers : " + Response.trailers);
        console.log("Response.type : " + Response.type);
        console.log("Response.url : " + Response.url);
        console.log("Response.useFinalURL : " + Response.useFinalURL);
        //console.log("Response.body : " + Response.body);
        //console.log("Response.bodyUsed : " + Response.bodyUsed);
        //console.log("Response.formData : " + Response.formData());
        //console.log("Response.json : " + Response.json());
        //console.log("Response.text : " + Response.text());
        console.groupEnd();

    }
    
}

//END Runtime/Debug.js
//START Runtime/myjson.js
class myJSON  {
    constructor() {      
    }
    fn_serialize(obj_myObject){                  
      let fn_serializeReplacer;      
      this.fn_serializeReplacer=this.fn_serializeReplacerDefault;
      if(obj_myObject.fn_serializeReplacer!==undefined){        
        this.fn_serializeReplacer=obj_myObject.fn_serializeReplacer;
      }            
      this.obj_myObject=obj_myObject;
      let str_json=JSON.stringify(obj_myObject, this.fn_serializeReplacer())
      str_json=str_json.replace("xcludex", );
      
      return str_json;      
    }
    fn_deserialize(str_json){      
      let obj_json={};
      try {
        obj_json=JSON.parse(str_json);
      } catch (error) {
          console.error("*****START ERROR myJSON DeSerialize*****");
          console.error("Error: " + error);
          console.error("str_json: " + str_json);
          console.error("*****END ERROR myJSON DeSerialize*****\n\n");
      }      
      return obj_json;
    }
    fn_serializeReplacerDefault = () => {
      //myJSON default serialize object
      
        const seen = new WeakSet();
        return (key, value) => {
          switch(key){
              case "obj_ini":
              return undefined;
              break;
          }
          //console.log(key + ": " + value);
          if (typeof value === "object" && value !== null) {

              //fn_enumerateObject(value, "myJSON fn_serializeReplacerDefault");
              //const found = this.arr_exclude.find(element => element === value);
              //if (found) {return "";}
              if (seen.has(value)) {
                return "circular";
                //return;
              }
              seen.add(value);
          }
          return value;
        };
    };
  }
  //END OF CLS myJSON

//END Runtime/myjson.js
//START Runtime/Main.js
var  obj_project, obj_myJson, obj_shared, obj_boot, obj_holder;

obj_shared=new Shared;
obj_myJson=new myJSON(new Object);
obj_boot=new Holder;
obj_holder=new Holder;

document.addEventListener('DOMContentLoaded', (event) => {
  
  obj_project=new Project(obj_boot);      
  window.obj_project=obj_project;//expose main base object to window scope
  obj_project.fn_execute();  
});



//END Runtime/Main.js

/*id: 100//*/
/*type: RuntimeCode//*/
/*END COMPONENT//*/





/*START COMPONENT//*/
/*id: 120//*/
/*type: DesigntimeCode//*/
//START Component/Design/FileDelegate.js
class FileDelegate{
    constructor(obj_delegator) {                          
        this.fn_initialize(obj_delegator);                        
    }    
    fn_initialize(obj_delegator){
        this.obj_delegator=obj_delegator;

        //obj_delegator will be the button etc , ie the control which has been added
    }      
    
    
}//END CLS
//END Component/Design/FileDelegate.js
//START Component/Design/DesignDelegate.js
class DesignDelegate{
    constructor(obj_delegator) {                          
        this.fn_initialize(obj_delegator);                
        if(window.parent){
            obj_projectParent=window.parent.obj_project;//set reference to parent publish object from this iframe
        }
    }    
    fn_initialize(obj_delegator){
        this.obj_delegator=obj_delegator;

        if(this.obj_delegator.obj_design.bln_hiddenPin==undefined){this.obj_delegator.obj_design.bln_hiddenPin=false;}                

        //obj_delegator will be the button etc , ie the control which has been added
    }      
    fn_addPaletteItem(obj_ini){//required  as is overidden by grid etc                        
        let obj_delegator=this.obj_delegator;

        let obj_item;
        obj_item=obj_delegator.fn_addItem(obj_ini);                        

        return obj_item;
    }
    
    fn_setup(){//not overriden by project instance         
        let obj_item;        
        this.fn_listenEventDesign();
        //obj_item=this.obj_delegator.fn_getEndItem();//return the item or its last child for seleciton                                                           
        //obj_item.obj_designDelegate.fn_setPaletteSelected();        
        this.fn_setPaletteSelected();        
        
    }    
    fn_listenEventDesign(){

        let obj_delegator=this.obj_delegator;
        //obj_delegator will be the button etc , ie the control which has been added
        
        //this refers to obj_delegator.obj_designDelegate
        let that=this;        

        obj_delegator.dom_obj.addEventListener('mouseenter', function(e){                        
            that.fn_designEventMouseenter();
        });
        obj_delegator.dom_obj.addEventListener('mouseleave', function(e){                        
            that.fn_designEventMouseleave();
        });                
        obj_delegator.dom_obj.addEventListener('click', function(e){                        
            that.fn_designEventClickCapture();
        }, true);
        obj_delegator.dom_obj.addEventListener('click', function(e){                        
            that.fn_designEventClickBubble();
        }, false);
        
        let obj_item;
        let arr=obj_delegator.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            obj_item=obj_delegator.obj_design.arr_item[i];  
            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_listenEventDesign();
            }
        }        
    }         
    fn_removePaletteItem(obj_item){//required      
        
        let obj_delegator=this.obj_delegator;

        obj_item.obj_designDelegate.fn_setPaletteDeSelected();
        obj_delegator.fn_removeItem(obj_item);        
        
        //this refers to obj_delegator.obj_designDelegate
        obj_item=obj_delegator.fn_getEndItem();//return the item or its last child for seleciton                        
        
        obj_item.obj_designDelegate.fn_setPaletteSelected();
    }

    
    fn_onPaletteItemClickCapture(){//event capture, overidden for base element             
    }
        
    fn_onPaletteItemClickBubble(){//event capture 
        
        if(obj_projectParent.obj_palettSelected){            
            return;
            //select only first item
        }   
        //alert("fn_onPaletteItemClickBubble");

        ////this refers to obj_delegator.obj_designDelegate
        console.log("fn_onPaletteItemClickBubble")
        this.obj_delegator.obj_design.int_modeExecute=this.obj_delegator.obj_holder.int_modeEdit;
        this.fn_setPaletteSelected();
    }     
    fn_setPaletteSelected(bln_maintainMap){  
        
        
        let obj_delegator=this.obj_delegator;          

        //this refers to obj_delegator.obj_designDelegate
        obj_delegator.fn_setLevelLimit();                              
        
        if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteSelected");return;}

        

        
        if(!bln_maintainMap && obj_delegator!==obj_project){
            if(obj_delegator.obj_holder.obj_levelLimit.bln_limitBottom){          
                let obj_container=obj_delegator.obj_holder.obj_container;
                obj_container.obj_holder.obj_subItem=obj_delegator;
                if(obj_container.obj_designDelegate){
                    obj_container.obj_designDelegate.fn_setPaletteSelected(false);                                    
                }
                return;      
            }        
        }

        obj_delegator.obj_holder.bln_maintainMap=bln_maintainMap;        
        
        if(obj_project.obj_designDelegate){            
            obj_project.obj_designDelegate.fn_deSelectPaletteItems();
        }               
        
        obj_projectParent.obj_palettSelected=obj_delegator;         
        
        if(obj_delegator.obj_holder.obj_container){            
            obj_delegator.obj_holder.obj_container.obj_holder.obj_lastItem=obj_delegator;
        }                        
        
        obj_projectParent.fn_onPaletteItemSelected();//update environment, property sheets etc        
        
        
        if(obj_delegator.obj_holder.obj_subItem){
            let obj_subItem=obj_delegator.obj_holder.obj_subItem;                        
            obj_projectParent.fn_linkCompassItem(obj_subItem);
            obj_delegator.obj_holder.obj_subItem=false;
        }
        


    } 
    
    fn_deSelectPaletteItems(){
        
        let obj_delegator=this.obj_delegator;

        if(!obj_projectParent.obj_palettSelected){                        
        }
        //this refers to obj_delegator.obj_designDelegate
        this.fn_setPaletteDeSelected();        
        let arr=obj_delegator.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            let obj_item=obj_delegator.obj_design.arr_item[i];            
            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_deSelectPaletteItems();
            }
        }
    } 
    
    fn_destructDesignComponent(){//cannot go to base object , as used by design process
        let obj_delegator=this.obj_delegator;
        obj_delegator.fn_removeAllContent();        
    }       
    fn_setPaletteDeSelected(){          

        if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteDeSelected");return;}
        
        obj_projectParent.fn_onPaletteItemDeSelected();//update environment        
        obj_projectParent.obj_palettSelected=false;
        
        //console.log("fn_setPaletteDeSelected: " + this.obj_design.str_type);             
        
    }        
    fn_designEventScroll(){        
    }    
    fn_designEventMouseenter(){
    }
    fn_designEventMouseleave(){            
    }
    
    fn_designEventClickCapture(){        
        //this refers to obj_delegator.obj_designDelegate
        this.fn_onPaletteItemClickCapture();
    }
    fn_designEventClickBubble(){        
        //this refers to obj_delegator.obj_designDelegate
        this.fn_onPaletteItemClickBubble();
    }    
    fn_preparePublish(){

        let obj_delegator=this.obj_delegator;
        
        let arr, obj_item;

        if(!obj_delegator.fn_isElement()){
            return;
        }
        
        let str_designMarker=obj_projectParent.obj_design.str_prefix;
        obj_delegator.dom_obj.removeAttribute(str_designMarker + "id");
        
        arr=obj_delegator.obj_design.arr_item;
        
        for(let i=0;i<arr.length;i++){
            obj_item=obj_delegator.obj_design.arr_item[i];                                      
            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_preparePublish();            
            }
        }
    }

    fn_viewHTML(){

        let obj_delegator=this.obj_delegator;

        //this refers to obj_delegator.obj_designDelegate
        this.fn_preparePublish();        
        obj_delegator.obj_holder.str_html=obj_delegator.dom_obj.outerHTML;
        alert(obj_delegator.obj_holder.str_html);

    } 
    

    fn_parseHTMLContent(str_content=""){                

        //this refers to the "real" target object
        let obj_delegator=this.obj_delegator;

        if(!obj_delegator.fn_isElement()){            
            obj_delegator.dom_obj.data=str_content;
            return;
        }

        obj_delegator.fn_removeAllContent();
        let dom_obj=document.createElement("div");
        
        dom_obj.innerHTML=str_content;   
        
        //console.log("str_content:" + str_content);
        
        var oCol = dom_obj.childNodes;
        for (var i = 0; i < oCol.length; i++) {

            let dom_child, attrib, str_name, str_value, str_type, str_tag, str_text;
            let obj_ini, obj_item;
            
            dom_child = oCol[i];    
            
            obj_ini=new Holder;                       

            str_text="";            
            
            let bln_continue=true;

            switch(dom_child.nodeType){
                case 1://element node,
                    bln_continue=false;
                    //str_type=dom_child.tagName;
                    str_type="tag";
                    str_tag=dom_child.tagName.toLowerCase();                                
                    //console.log("ELEMENTNODE");
                break;
                case 3://3 for text node,                    
                    str_type="TEXTNODE";
                    str_tag="Txt";         
                    str_text=dom_child.data;                                        
                break;                
                case 8://8 for comment node,
                    str_type="Comment";
                    str_tag="<!--"
                    str_text=dom_child.data;                                        
                break;                
                default:
                    //console.log("node Type: " + dom_child.nodeType);
                    str_type="tag";
                    str_tag="tag";
                    //continue;
            }            

            obj_ini.obj_design.str_type=str_type;
            obj_ini.obj_design.str_tag=str_tag;
            obj_ini.obj_design.str_content=str_text;
            
            //obj_ini.obj_design.str_content="aaa";                
            obj_delegator.fn_parseHTMLContentCreateStyle(dom_child, obj_ini.obj_domStyle);
                
            //*
            if(dom_child.attributes){
            for (var j = 0; j < dom_child.attributes.length; j++) {
                attrib = dom_child.attributes[j];                 
                str_name=attrib.name;                                
                if(str_name){
                    str_value=attrib.value;                
                    if(str_name=="style"){}
                    else{
                        
                        //obj_ini.obj_domProperty[str_name]=str_value;            
                        obj_ini.obj_domAttribute[str_name]=str_value;            
                        //console.log(str_name + ":" + str_value);
                    }
                }
            }
            }   
            //*/            

            /*
            console.log("str_tag:" + str_tag);
            console.log("str_text:" + str_text);
            obj_shared.fn_enumerateObject(obj_ini);            
            //*/
            
            
            obj_item=obj_delegator.fn_addItem(obj_ini);  

            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_listenEventDesign(); 
            }
            
            if(obj_item.fn_isElement()){
                obj_item.fn_parseHTMLContent(dom_child.innerHTML);
            }
        }
        dom_obj.remove();
        
    }             
    
    fn_parseHTMLContentCreateStyle(dom_obj, obj_domStyle){

        let obj_delegator=this.obj_delegator;

        if(!dom_obj){return;}
        if(!dom_obj.getAttribute){return;}

        let style=dom_obj.style;
        let str_style, str_name, str_value;
        let i, arr_parts, arr_subParts, str_part;        
        str_style=dom_obj.getAttribute("style");        
        
        if(!str_style){
            str_style="";            
        }
        //console.log("str_style: " + str_style);        
        if(!str_style.length){return;}
        arr_parts = str_style.split(";")        
        for (i=0;i<arr_parts.length;i++) {
            str_part=arr_parts[i];            
            if(str_part.length){
                arr_subParts = str_part.split(':');                            
                str_name=arr_subParts[0].trim();
                str_value=arr_subParts[1].trim();
                //console.log(str_name + ":" + str_value);
                obj_domStyle[str_name]=str_value;
            }
        }
    }       

    //END DESIGN FUNCTIONS AND EVENTS
    
    
}//END CLS
//END Component/Design/DesignDelegate.js
//START Component/Design/DesignDelegateGrid.js
class DesignDelegateGrid extends DesignDelegate{
    constructor(obj_delegator) {                  
        super(obj_delegator); // call the super class constructor        
        
    }        
    fn_setPaletteSelected(bln_maintainMap){      
        if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteSelected");return;}
        let obj_delegator=this.obj_delegator;
        super.fn_setPaletteSelected(bln_maintainMap);              
        obj_projectParent.obj_lastGrid=obj_delegator;      
    }    
    fn_removePaletteItem(obj_item){
        let obj_delegator=this.obj_delegator;
        console.log("fn_removePaletteItem")
        super.fn_removePaletteItem(obj_item);   
        obj_delegator.fn_applyFeatures();      
        obj_projectParent.obj_palettSelected.obj_designDelegate.fn_setPaletteSelected();
        if(!obj_delegator.obj_design.bln_eazygrid){
          console.log("obj_delegator.obj_design.bln_eazygrid is false")
          return;
        }
        
        if(!obj_delegator.fn_getIsEmpty()){
          console.log("this.fn_getIsEmpty is false")
          return;
        }
  
        //obj_delegator.obj_holder.obj_container.obj_delegator.fn_removePaletteItem(obj_delegator);//auto remove self empty grid
      }
    
}//END CLS
//END Component/Design/DesignDelegateGrid.js
//START Component/Design/DesignDelegateGridItem.js
class DesignDelegateGridItem extends DesignDelegate{
    constructor(obj_delegator) {                  
        super(obj_delegator); // call the super class constructor        
        
    }        
    fn_setPaletteSelected(bln_maintainMap){ 
      if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteSelected");return;}     
      let obj_delegator=this.obj_delegator;
        super.fn_setPaletteSelected(bln_maintainMap);      
        obj_projectParent.obj_lastGrid=obj_delegator.obj_holder.obj_container;//not part of eazygrid      
      }        
    fn_addPaletteItem(obj_ini){//required                  
        let obj_delegator=this.obj_delegator;
        if(obj_delegator.obj_holder.obj_container.obj_design.bln_eazygrid){          
            switch(obj_ini.obj_design.str_type){
              case "Grid":
                obj_ini.obj_design.bln_split=obj_shared.fn_flipBool(obj_delegator.obj_holder.obj_container.obj_design.bln_split);
              break;      
            }
          }
        return super.fn_addPaletteItem(obj_ini);        
    }    
    
}//END CLS
//END Component/Design/DesignDelegateGridItem.js
//START Component/Design/DesignDelegateProjectInstance.js
class DesignDelegateProjectInstance extends DesignDelegate{
    constructor(obj_delegator) {                  
        super(obj_delegator); // call the super class constructor          

        if(window.parent){            
            window.parent.obj_project.fn_component_onLoad();//notify parent design component 
        }
    }            
    fn_initialize(obj_delegator){
        super.fn_initialize(obj_delegator);        
        

        if(this.obj_delegator.obj_design.bln_projectPin==undefined){this.obj_delegator.obj_design.bln_projectPin=true;}
        if(this.obj_delegator.obj_design.bln_palettePin==undefined){this.obj_delegator.obj_design.bln_palettePin=false;}        
        
    }      
    fn_onPaletteItemClickCapture(){//event capture        
        obj_projectParent.obj_palettSelectedLast=obj_projectParent.obj_palettSelected;        

        //this refers to obj_delegator.obj_designDelegate
        this.fn_deSelectPaletteItems();//deselect all children starting from base
    }
    fn_destructDesignComponent(){

        //this refers to obj_delegator.obj_designDelegate
        this.fn_deSelectPaletteItems();
        alert("should not be occurring ");        
        //should be handled by iframe reload
    }  
    
    
}//END CLS
//END Component/Design/DesignDelegateProjectInstance.js
//START Component/Design/GlobalVariable.js
//write component specific globals here
var obj_projectTarget;
var obj_projectParent;
//write component specific globals here
//END Component/Design/GlobalVariable.js

/*id: 120//*/
/*type: DesigntimeCode//*/
/*END COMPONENT//*/





/*START COMPONENT//*/
/*id: 300//*/
/*type: Component//*/
//START Component/Component.js
class Component extends BaseObject {
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor
    }
    fn_initialize(obj_ini){//COMPONENT: fn_initialize is called again upon Component.openInstance from db
        super.fn_initialize(obj_ini);
        
        //START INITIALIZE DESIGN
        this.obj_design.int_idRecord=obj_ini.obj_design.int_idRecord;
        if(this.obj_design.int_idRecord==undefined){this.obj_design.int_idRecord=0;}
        if(this.obj_design.int_modeExecute===undefined){                        
            this.obj_design.int_modeExecute=this.obj_holder.int_modeRuntime;                        
            //if(window.name==="xdesign-target"){this.obj_design.int_modeExecute=this.obj_holder.int_modeReadOnly;}
            if(window.name==="xdesign-target"){
                this.obj_design.int_modeExecute=this.obj_holder.int_modeReadOnly;
                if(this.obj_design.int_idRecord===0){
                    this.obj_design.int_modeExecute=this.obj_holder.int_modeEdit;
                }
            }
        }  
        
        if(this.obj_design.bln_hiddenPin==undefined){this.obj_design.bln_hiddenPin=false;}
        if(this.obj_design.bln_toggleProjectPin==undefined){this.obj_design.bln_toggleProjectPin=false;}//Menu Button Only        
        
        
        if(this.obj_design.str_type==undefined){this.obj_design.str_type="Component";}
        if(this.obj_design.str_tag==undefined){this.obj_design.str_tag="Component";}                
        
        this.bln_isComponent=true;        
        
        //if(this.fn_isContainer()==undefined){this.fn_setContainer(true)};        
        if(this.obj_design.bln_container==undefined){
            this.fn_setContainer(true);
        }
        //this.fn_setContainer(true);
        
        
        
        this.obj_design.bln_listenClick=true;
        //END INITIALIZE DESIGN
    }

    fn_execute(){//overides base object execute        
        if(this.obj_design.int_idRecord){this.fn_openInstance();}//grab instance first and intiialize
        this.fn_createSelf();//create self                
        this.fn_onOpenInstance();//run  baseobvject onopeninstance
    }      

    fn_openInstance(){//wont run on boot as will not have a record id        
        if(!this.fn_validIdHistory()){return;}
        let ObjectData=obj_InstanceJSONMap.get(parseInt(this.obj_design.int_idRecord));               
        if(!ObjectData || (ObjectData && !ObjectData.obj_design)){return;}//dont intialize with bank object        
        ObjectData.obj_design.int_modeExecute=this.obj_design.int_modeExecute;//Continuity of Mode                                
        this.fn_initialize(ObjectData);//initialize with self from db                                
    }
    //START COMPONENT OPERATION FUNCTIONS
    
    fn_validate(obj_item){ 
        let str_variableName=obj_item.obj_design.str_variableName;                
        if(str_variableName){
            //console.log("str_variableName: " + str_variableName);
            str_variableName=str_variableName.replace(/-/gi, "_");;        
            this.obj_holder["obj_" + str_variableName]=obj_item;           
            //console.log("this.obj_holder[obj_" + str_variableName + "]: " + this.obj_holder["obj_" + str_variableName]);
        }
    }

    

    
    /*
    fn_saveInstance(){

        //MARK MYSELF
        this.obj_holder.bln_markSave=true;
        this.fn_debug("fn_getSaved");

        let arr, obj_item, bln_allSaved;
        arr=this.obj_design.arr_item;        
        //ARE MY CHILDREN SAVED
        bln_allSaved=true;
        for(let i=0;i<arr.length;i++){
            obj_item=arr[i];
            if(!obj_item.obj_design.int_idRecord){
                obj_item.fn_debug("CHILD NOT SAVED");
                obj_item.fn_saveInstance();
                bln_allSaved=false;
                break;
            }
        }
        if(!bln_allSaved){
            return;
        }

        //SAVE
        //IF MY PARENT IS MARKED, TELL THEM
        let obj_designFile=obj_project.obj_holder.obj_designFile;
        let obj_ini=new Object;
        obj_ini.obj_instance=this;
        let obj_parent=this.fn_getParentComponent();        
        if(obj_parent && obj_parent.obj_holder.bln_markSave){
            obj_ini.str_IdValidator=obj_parent.obj_design.str_id;
            obj_ini.str_actionCallback="fn_saveInstance";
        }            
        obj_designFile.fn_save(obj_ini);
    }
    fn_getParentComponent(){

        let obj_parent=this.obj_holder.obj_container;
        if(obj_parent && obj_parent.bln_isComponent){
            return obj_parent;
        }
        return false;

    }
    //*/

    fn_getRecordStatus(){

        let arr, obj_item, bln_recordStatus;
        arr=this.obj_design.arr_item;
        
        if(this.bln_isComponent){
            if(!this.obj_design.int_idRecord){
                return false;
            }
        }      
        //*          
        for(let i=0;i<arr.length;i++){
            obj_item=arr[i];

            bln_recordStatus=obj_item.fn_getRecordStatus();
            if(!bln_recordStatus){
                obj_item.fn_debug("CHILD NOT SAVED");
                return false;
            }            
        } 
        //*/       
        return true;
    }    

    fn_setBackgroundColor(str_val, bln_propogate){
        //allows for component wide bg color change to propogate
        super.fn_setBackgroundColor(str_val);  
        if (!bln_propogate){return;}        
        let arr=this.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            let obj_item=this.obj_design.arr_item[i];            
            obj_item.fn_setBackgroundColor(str_val, bln_propogate)
        }
    }    
    //START COMPONENT EVENT HANDLING - CONSIDER MOVING to BASEOBJECT IF NECESSARY
    fn_getvalueEvent(o_target, str_nameEvent){        
        let str_valueEvent=o_target.getAttribute(str_nameEvent);
        /*
        console.log(o_target.outerHTML);
        console.log("str_nameEvent: " + str_nameEvent);        
        console.log("str_valueEvent: " + str_valueEvent);
        //*/
        return str_valueEvent;
    }
    fn_event_call(str_nameEvent){
        let e, str_valueEvent;
        e=window.event;
        str_valueEvent=this.fn_getvalueEvent(e.target, str_nameEvent);
        if(!str_valueEvent){            
            str_valueEvent=this.fn_getvalueEvent(e.target.parentNode, str_nameEvent);
        }
        if(!str_valueEvent){
            return;
        }
        try{
            this[str_valueEvent]();
        }
        catch(e){
            alert("fn_event_call error: " + str_nameEvent + ": " + str_valueEvent);
            console.log(e);
        }
      }
    fn_click(){
        //this.fn_debug();
    }//overidden by the instance

    //END COMPONENT EVENT HANDLING
    //END COMPONENT OPERATION FUNCTIONS
}//END CLS
//END COMPONENT

//END Component/Component.js

/*id: 300//*/
/*type: Component//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 301//*/
/*type: Tag//*/
//START Component/Tag.js
class Tag extends Component{
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);        

    this.obj_design.str_type="Tag";      
    this.obj_design.str_tag=obj_ini.obj_design.str_tag;    
    if(this.obj_design.str_tag===undefined){
      alert("this.obj_design.str_tag===undefined")
      this.obj_design.str_tag="Tag";
    }

    if(this.obj_design.tagTitle!==undefined){
      alert(this.obj_design.tagTitle)
      this.obj_domProperty.innerText=this.obj_design.tagTitle;      
      this.obj_design.str_tag=this.obj_design.tagTitle;            
    }    
    this.fn_setContainer(obj_ini.obj_design.bln_container);
  }        

  //cannot call fn_click here this as otherwise the wrong "tag" will likely be set   

}//END CLS
//END TAG
//END Component/Tag.js

/*id: 301//*/
/*type: Tag//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 320//*/
/*type: Accordion//*/
//START Component/Accordion.js
class Accordion extends Component {
    constructor(obj_ini) {        
        super(obj_ini); // call the super class constructor
    }    
    fn_initialize(obj_ini){
        super.fn_initialize(obj_ini);

        //START INITIALIZE DESIGN
        this.obj_design.str_type="Accordion";
        this.obj_design.str_tag="Accordion";
        if(this.obj_design.str_name==undefined){this.obj_design.str_name="My Accordion";}  
        //END INITIALIZE DESIGN

        //START INITIALIZE STYLE        
        if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}    
        //END INITIALIZE STYLE                
    }

    fn_createChildren(){

        
        let obj_ini, obj_menuButton, obj_accordion;
        obj_accordion=this;

        obj_ini=new Holder;
        obj_ini.obj_domProperty.innerText="Group 1";
        obj_ini.obj_design.str_id=this.obj_design.str_IdMenuButton;        
        obj_menuButton=obj_accordion.fn_addItem(obj_ini);      

        obj_ini=new Holder;
        obj_ini.obj_domProperty.innerText="Test A";
        obj_menuButton.fn_addItem(obj_ini);
        
        obj_ini=new Holder;
        obj_ini.obj_domProperty.innerText="Group 2";
        obj_ini.obj_design.str_id=this.obj_design.str_IdMenuButton;        
        obj_menuButton=obj_accordion.fn_addItem(obj_ini);      

        obj_ini=new Holder;
        obj_ini.obj_domProperty.innerText="Test B";
        obj_menuButton.fn_addItem(obj_ini);

        obj_ini=new Holder;
        obj_ini.obj_domProperty.innerText="Test C";
        obj_menuButton.fn_addItem(obj_ini);
        
        obj_ini=new Holder;
        obj_ini.obj_domProperty.innerText="Group 3";
        obj_ini.obj_design.str_id=this.obj_design.str_IdMenuButton;        
        obj_menuButton=obj_accordion.fn_addItem(obj_ini);      

        obj_ini=new Holder;
        obj_ini.obj_domProperty.innerText="Test D";
        obj_menuButton.fn_addItem(obj_ini);

        obj_ini=new Holder;
        obj_ini.obj_domProperty.innerText="Test E";
        obj_menuButton.fn_addItem(obj_ini);

        obj_ini=new Holder;
        obj_ini.obj_domProperty.innerText="Test F";
        obj_menuButton.fn_addItem(obj_ini);

    }

    fn_addItem(obj_ini){
        //obj_ini required , used to pass accordion id etc
        let obj_item;  
        obj_ini.obj_theme=this.fn_cloneObject(this.obj_theme);                                  
        obj_ini.obj_design.str_type="MenuButton";         
        obj_ini.obj_domStyle.flexDirection="row";           
        obj_ini.obj_domStyle.flexWrap="wrap";                  
        obj_item=super.fn_addItem(obj_ini);             
        return obj_item;
    }
    
    //START COMPONENT EVENT HANDLING    
    fn_MenuButtonClick(){
        

        /*
        let str_designMarker=obj_project.obj_design.str_prefix;
        let e=window.event;//detect if ctrl key is pressed, below
        let obj_item_event=obj_project.fn_findItemById(e.target.getAttribute(str_designMarker + "id"));                
        this.fn_open(obj_item_event, e.ctrlKey);    
        //*/                
        let e=window.event;//detect if ctrl key is pressed, below        
        this.fn_open(obj_project.obj_projectEvent, e.ctrlKey);    
        
    }
    fn_open(obj_target, ctrlKey=false){
        
        if(!obj_target){return;}
            
        obj_target.fn_toggle();            
        
        if (ctrlKey) {return;}        
        for(var i=0;i<this.obj_design.arr_item.length;i++){
            let obj_item=this.obj_design.arr_item[i];            
            if(obj_item!=obj_target){
                if(!obj_item.obj_design.bln_isPinned){
                    obj_item.fn_close();                    
                }
            }
        }
    }
    //START COMPONENT EVENT HANDLING 
    fn_click(){    
        this.fn_event_call(obj_project.obj_design.str_prefix + "MenuButtonClick");//trap lower         
    }
    

}//END CLS
//END ACCORDION
//END Component/Accordion.js

/*id: 320//*/
/*type: Accordion//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 325//*/
/*type: Button//*/
//START Component/Button.js
class Button extends Component {
    constructor(obj_ini) {      
      super(obj_ini);
    }    
    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      //START INITIALIZE DESIGN
      this.obj_design.str_type="Button";
      this.obj_design.str_tag="Button";      

      this.obj_design.bln_listenClick=true;    
      
      if(this.obj_domProperty.innerText===undefined){this.obj_domProperty.innerText="Button"}        

      this.fn_setContainer(false);
      
      //END INITIALIZE DESIGN
  
      //START INITIALIZE STYLE      
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="40px";}              
      if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="3px 12px";}      
      if(this.obj_domStyle.border===undefined){this.obj_domStyle.border="0px solid black";}                  
      if(this.obj_domStyle.color===undefined){this.obj_domStyle.color="black";}      
      if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="pointer";}
      if(this.obj_domStyle.marginRight===undefined){this.obj_domStyle.marginRight="3px";}
      if(this.obj_domStyle.marginBottom===undefined){this.obj_domStyle.marginBottom="3px";}        
      //END INITIALIZE STYLE            

      //this.obj_domProperty.disabled=false;
      
    }         
    fn_click(){          
      this.fn_event();                
    }
    fn_applyTheme(){ 
      super.fn_applyTheme();
      
      this.fn_setStyleAttribute("backgroundColor", this.obj_theme.forgroundColor);          

      let str_color=this.obj_theme.highlightColor;
      
      if(this.obj_domProperty.disabled){        
        str_color="gray";
      }            
      this.fn_setStyleAttribute("color", str_color); 
      
    }   
  fn_setDisabled(){    
    super.fn_setDisabled();
    this.fn_setStyleAttribute("color", this.obj_theme.forgroundColor);                  
  }  
  fn_parseHTMLContent(str_content=""){//Overide for base object
    
    
    this.fn_setDomAttribute("innerText", str_content);    

  }
}//END CLS
//END BUTTON

//END Component/Button.js

/*id: 325//*/
/*type: Button//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 335//*/
/*type: Design//*/
//START Component/Design/Design.js
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
//END Component/Design/Design.js
//START Component/Design/ManagerBootBuilder.js
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

//END Component/Design/ManagerBootBuilder.js
//START Component/Design/ManagerBootOptions.js
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
//END Component/Design/ManagerBootOptions.js
//START Component/Design/ManagerIFrame.js
class ManagerIFrame extends Holder{
      constructor(obj_delegator) {
        super(obj_delegator); // call the super class constructor

      this.fn_initialize(obj_delegator);
    }
    fn_initialize(obj_delegator){
      
      this.obj_delegator=obj_delegator;
      //this.obj_theme=this.fn_cloneObject(this.obj_delegator.obj_theme);
    }

    
    fn_execute(){
        
        
        let that=this;
        
        /*
        //This wont work fire when frame is reloaded
        //this.obj_delegator.obj_holder.obj_flexPadIframe.dom_obj.contentWindow.addEventListener('DOMContentLoaded', (event) => {        
        //*/                        
        
        //this.obj_delegator.obj_holder.obj_flexPadIframe.dom_obj.addEventListener("load",  (event) => {}); 
      
        /*
        let str_path;
        str_path="/xdesign/AFrame/index.html?mode=edit";           
        //this.obj_delegator.obj_holder.obj_flexPadIframe.fn_setDomAttribute("src", str_path);        
        //*/
        
      //*/
    }
    fn_navigateRecord(){      
      let obj_glass=this.obj_delegator.fn_getGlass();
      obj_glass.location.href="/xdesign/AFrame/index.html?mode=edit";
    }
    fn_onComponentReady(){        
      //alert("manageriframe fn_onComponentReady");      
      //this.fn_execute();
      
    }  
    
    
    

  //START MANAGERIFRAME COMPONENTS
  
  //END MANAGERIFRAME COMPONENTS

  //START MANAGERIFRAME SPECIFIC EVENT  
  
  //END MANAGERIFRAME SPECIFIC EVENT  
}//END CLS
//END PALETTE

//END Component/Design/ManagerIFrame.js
//START Component/Design/ManagerProject.js
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

//END Component/Design/ManagerProject.js
//START Component/Design/ManagerPalette.js
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

//END Component/Design/ManagerPalette.js
//START Component/Design/ManagerFile.js
class ManagerFile extends Holder{
      constructor(obj_delegator) {
        super(obj_delegator); // call the super class constructor

      this.fn_initialize(obj_delegator);
    }
    fn_initialize(obj_delegator){

      this.obj_delegator=obj_delegator;
    }
    fn_execute(obj_container){//can run only on boot, called by boot build
    }

  //START PALETT COMPONENTS  
  //END PALETT COMPONENTS

  //START PALETT SPECIFIC EVENT
  
  fn_onComponentReady(){        
    //alert("Manager File fn_onComponentReady");
  }  
}//END CLS
//END PALETTE

//END Component/Design/ManagerFile.js
//START Component/Design/PropertySheet.js

class PropertySheet extends Holder{
    constructor(obj_delegator) {  
        super(); // call the super class constructor                
        this.fn_initialize(obj_delegator);
  } 
  fn_initialize(obj_delegator){
    this.obj_delegator=obj_delegator; 
    

    
    this.obj_theme=this.fn_cloneObject(this.obj_delegator.obj_theme);          
    let shortname=this.obj_design.str_name.toLowerCase().replace(/\s/g, '');
    //let shortname=this.obj_design.str_title.toLowerCase().replace(/\s/g, '');
    //let shortname="abcdef";
    
    this.obj_design.str_IdAccordion=shortname + "-menu";
    this.obj_design.str_IdMenuButton=shortname + "-menu-button";
    this.obj_design.str_IdFlex=shortname + "-menu-flex";
    this.obj_design.str_NameFlex=shortname + "MenuFlex";
    
    /*
    this.obj_design.str_contentWelcome=`
      <div style="background-color:black;color:white;padding:20px">Welcome To ${this.obj_design.str_title}        
      </div>
    `;
    //*/      
  }
  //START MESSENGER EVENTS
  fn_onLoad(){//dont place events in here as the menu may not have loaded.         
  }
  fn_containerOnLoad(){    
    if(!this.obj_menuButton){      
      return;
    }

    this.obj_flex=this.obj_delegator.fn_findItemById(this.obj_design.str_IdFlex);              

    if(!this.obj_flex){
      //console.log("this.obj_flex: " + this.obj_flex);
      //obj_project.fn_debugDesign(this.obj_design);
      return;
    }
    
    if(!this.obj_flex){            
      return;
    }
    let obj_item=new Holder;
    if(this.obj_design.str_contentWelcome){
      obj_item.obj_design.str_content=this.obj_design.str_contentWelcome;                  
      this.fn_displayMessage(obj_item);
    }
    this.obj_menuButton.fn_close();                                                 
    
  }    
  fn_displayMessage(obj_item){
    this.fn_setMessage(obj_item);
    this.obj_menuButton.fn_open();
  }    
  fn_setMessage(obj_item){        
    this.obj_flex.obj_design.str_content=obj_item.obj_design.str_content;      
    this.obj_flex.fn_setHTMLContent();
  }    
  fn_displayWelcome(){
    let obj_item=new Holder;
    obj_item.obj_design.str_content=this.obj_design.str_contentWelcome;            
    this.fn_displayMessage(obj_item);      
  }
  
  fn_clearOperation(){    
    if(this.obj_flex){
      this.obj_flex.fn_removeAllContent();           
      //this.fn_displayWelcome();      
    }
  }  
  fn_linkOperation(){

  }   
  //END OBJECT EVENTS    
    
  fn_displayPropertySheet(obj_arg){

    let obj_table;
  
    let obj_item=obj_arg.obj_item;
    let obj_propertySheet=obj_arg.obj_propertySheet;            
    let str_title=obj_arg.str_title;
    let obj_container=obj_arg.obj_container;
  
    let obj_ini, arr;
    let obj_row, obj_cell;
    let obj_input;
  
    obj_ini=new Holder;            
    obj_ini.obj_design.str_type="Table";       
    obj_table=obj_container.fn_addItem(obj_ini);    
    obj_arg.obj_table=obj_table;
  
    if(str_title){
      obj_row=obj_table.fn_addItem();
      obj_ini=new Holder;            
      obj_ini.obj_design.str_type="TableHeader";                        
      obj_ini.obj_theme=this.obj_theme;
      obj_ini.obj_domProperty.colSpan=2;                        
      obj_ini.obj_domProperty.innerText=str_title;
      obj_row.fn_addItem(obj_ini);    
    }
  
    if(obj_arg.str_propertySourceChange){
      this.fn_propertySourceChange(obj_arg);//add new value row    
    }  

    let arr_Property;
    
    switch(obj_arg.str_optionDOMDisplay){
      case "DOMStyle":        
        this.fn_displayPropertySheetDOMStyle(obj_arg);//add new value row            
      break;
      case "DOMAttribute":        
        this.fn_displayPropertySheetDOMAttribute(obj_arg);//add new value row            
      break;
      case "DOMProperty":        
        this.fn_displayPropertySheetDOMProperty(obj_arg);//add new value row            
      break;
      default:
        this.fn_displayPropertySheetDOMObject(obj_arg);//add new value row            
    }
      
  }

  fn_displayPropertySheetDOMStyle(obj_arg){      

    let str_key, foo_val;
    let str_style, arr_parts, str_part, arr_subParts;
    
    str_style=obj_arg.obj_item.dom_obj.getAttribute("style"); 
    if(!str_style){
      str_style="";            
    }
    if(!str_style.length){return;}

    arr_parts = str_style.split(";")        
    for (let i=0;i<arr_parts.length;i++) {
        str_part=arr_parts[i];            
        if(str_part.length){
          arr_subParts = str_part.split(':');                            
          obj_arg.str_key=arr_subParts[0].trim();                    
          obj_arg.foo_val=obj_arg.obj_item.dom_obj.style[obj_arg.str_key];
          //console.log("STYLE: " + obj_arg.str_key + ": " + obj_arg.foo_val);          
          this.fn_displayPropertySheetRow(obj_arg);  
        }
    }  
  }

  fn_displayPropertySheetDOMAttribute(obj_arg){      

    let str_key, foo_val;
    
    let arr_Property=obj_arg.obj_item.dom_obj.attributes;
    for(var i = 0; i < arr_Property.length; i++) {
  
        obj_arg.str_key=arr_Property[i].name;
        //obj_arg.foo_val=arr_Property[i].value;
        obj_arg.foo_val=obj_arg.obj_item.dom_obj.getAttribute(obj_arg.str_key);
        //console.log("ATTRIBUTE: " + obj_arg.str_key + ": " + obj_arg.foo_val);
        this.fn_displayPropertySheetRow(obj_arg);  
        
    } 
  }
  fn_displayPropertySheetDOMProperty(obj_arg){      

    let str_key, foo_val;    
    let arr_Property=obj_arg.obj_item.dom_obj.attributes;
    for(var i = 0; i < arr_Property.length;i++) {
        
        obj_arg.str_key=arr_Property[i].name;        
        obj_arg.foo_val=obj_arg.obj_item.dom_obj[obj_arg.str_key];
        //console.log("PROPERTY: " + obj_arg.str_key  + ": " + obj_arg.foo_val);
        this.fn_displayPropertySheetRow(obj_arg);          
    } 
  }
  fn_displayPropertySheetDOMObject(obj_arg){

    let arr_Property=Object.entries(obj_arg.obj_propertySheet).sort((a, b) => a[0].localeCompare(b[0]));          
    for (let [str_key, foo_val] of arr_Property) {
      //for(var i = 0; i < arr_Property.length; i++) {
  
        //str_key=arr_Property[i].name;
        //foo_val=arr_Property[i].value;
        //console.log("OBJECT: " + str_key + ": " + foo_val);
        obj_arg.str_key=str_key;
        obj_arg.foo_val=foo_val;
        this.fn_displayPropertySheetRow(obj_arg);
      } 
  }
  fn_displayPropertySheetRow(obj_arg){

    let str_key, foo_val;
    let obj_row, obj_ini, obj_container, obj_cell, obj_input;
    str_key=obj_arg.str_key;
    foo_val=obj_arg.foo_val;

    if(foo_val===undefined){return;} 
  
      if(foo_val===""){return;} 
  
      
      if(typeof foo_val==="object"){
        foo_val="object";        
      }

      //console.log("DISPLAY: " + str_key + ": " + foo_val);

      let str_keyDisplay;
      str_keyDisplay=str_key;              
      
      obj_row=obj_arg.obj_table.fn_addItem();
      
      //START CREATE NAME CELL
      obj_ini=new Holder;                        
      //obj_ini.obj_design.str_content=str_keyDisplay+":&nbsp;";
      obj_ini.obj_theme=this.obj_theme;        
      obj_ini.obj_domStyle.minWidth="150px";
      obj_cell=obj_row.fn_addItem(obj_ini);
      obj_container=obj_cell;          
      //END CREATE NAME CELL
  
      //ADD TEXT INPUT TO NAME CELL
      obj_ini=new Holder;
      obj_ini.obj_design.str_type="Input";
      obj_ini.str_subType="text";        
      obj_ini.str_value=str_keyDisplay; 
      obj_ini.obj_design.str_name=str_key;    
      obj_ini.obj_domProperty.disabled=true;    
      obj_ini.obj_theme=this.obj_theme;        
      obj_input=obj_container.fn_addItem(obj_ini);                
      //END TEXT INPUT TO NAME CELL
      
      //START CREATE VALUE CELL
      obj_ini=new Holder;  
      obj_ini.obj_theme=this.obj_theme;        
      obj_cell=obj_row.fn_addItem(obj_ini);          
      obj_container=obj_cell;          
      //END CREATE VALUE CELL
  
      //ADD TEXT INPUT TO VALUE CELL
      obj_ini=new Holder;
      obj_ini.obj_design.str_type="Input";
      obj_ini.str_subType="text";        
      obj_ini.str_value=foo_val;    
      obj_ini.obj_design.str_name=str_key;    
      obj_ini.obj_theme=this.obj_theme;
      obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;            
      obj_ini.obj_design.str_linkId=obj_arg.obj_item.obj_design.str_id;            
      obj_ini.obj_design.str_nameEventChange=obj_arg.obj_design.str_nameEventChange;//this will be added automaticall to dom        
      obj_ini.obj_design.str_valueEventChange=obj_arg.obj_design.str_valueEventChange;
      obj_input=obj_container.fn_addItem(obj_ini);                
      //END TEXT INPUT TO VALUE CELL
      
  }

  
  fn_propertySourceChange(obj_arg){      
    
    let obj_table=obj_arg.obj_table;
    let obj_ini, arr;
    let obj_row, obj_cell;
    let obj_input;
  
    let obj_item=obj_arg.obj_item;      
    let obj_container=obj_arg.obj_container;
  
    obj_row=obj_table.fn_addItem();
  
    //START CREATE NAME CELL
    obj_ini=new Holder; 
    obj_ini.obj_theme=this.obj_theme;              
    obj_cell=obj_row.fn_addItem(obj_ini);          
    obj_container=obj_cell;          
    //END CREATE NAME CELL
  
    //ADD TEXT INPUT TO NAME CELL
    obj_ini=new Holder;
    obj_ini.obj_design.str_type="Input";      
    obj_ini.str_subType="text";
    obj_ini.str_value="";    
    obj_ini.obj_design.str_name="str_key";          
    obj_ini.obj_theme=this.obj_theme;        
    obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;            
    obj_ini.obj_design.str_linkId=obj_item.obj_design.str_id;            
    obj_ini.obj_design.str_nameEventChange=obj_arg.obj_design.str_nameEventChange;//this will be added automatically to dom        
    obj_ini.obj_design.str_valueEventChange=obj_arg.str_propertySourceChange + "Name";      
    obj_input=obj_container.fn_addItem(obj_ini);                
    //END TEXT INPUT TO NAME CELL
    
    //START CREATE VALUE CELL
    obj_ini=new Holder;     
    obj_ini.obj_theme=this.obj_theme;      
    obj_cell=obj_row.fn_addItem(obj_ini);          
    obj_container=obj_cell;          
    //END CREATE VALUE CELL
    
    //ADD TEXT INPUT TO VALUE CELL
    obj_ini=new Holder;
    obj_ini.obj_design.str_type="Input";      
    obj_ini.str_subType="text";
    obj_ini.str_value="";    
    obj_ini.obj_design.str_name="str_key";     
    obj_ini.obj_theme=this.obj_theme;              
    obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;            
    obj_ini.obj_design.str_linkId=obj_item.obj_design.str_id;            
    obj_ini.obj_design.str_nameEventChange=obj_arg.obj_design.str_nameEventChange;//this will be added automaticall to dom        
    obj_ini.obj_design.str_valueEventChange=obj_arg.str_propertySourceChange + "Value";      
    obj_input=obj_container.fn_addItem(obj_ini);                
    //END TEXT INPUT TO VALUE CELL        
  }  
}//Finish Class
//END Component/Design/PropertySheet.js
//START Component/Design/ManagerProperty.js
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
//END Component/Design/ManagerProperty.js
//START Component/Design/PropertySheetPaletteItem.js

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
//END Component/Design/PropertySheetPaletteItem.js
//START Component/Design/ManagerMessenger.js
 class ManagerMessenger extends PropertySheetPaletteItem{
    constructor(obj_delegator) { 
      super(obj_delegator); // call the super class constructor      
    }    
    fn_initialize(obj_delegator){
      this.obj_design.str_name="Messenger";//name is hard coded in ManagerProperty fn_validate
      this.obj_design.str_title="Messenger";//title can be changed
      super.fn_initialize(obj_delegator);

      this.obj_design.str_contentWelcome=`
      <div style="background-color:black;color:white;padding:20px">Welcome To The Designer.
      </div>
      `;      
    }   
    //END OBJECT EVENTS  
    fn_containerOnLoad(){    
      super.fn_containerOnLoad();
      this.obj_menuButton.fn_open();      
    }

    fn_linkOperation(obj_arg){    
      //This funciton will simply display the inner hTML opf the selected object
      //If the content changes it will fire up the textarea onchange event fn_linkPaletteTextEditChange and the new content willb e parsed using fn_parseHTMLContent
      let str_tag=obj_arg.obj_selected.fn_getType();      
      let obj_ini;    
      
      if(!obj_arg.obj_selected.dom_obj.innerHTML){
        //this.obj_menuButton.fn_close();      
        //return;      
      }

      switch(str_tag){
        case "xx-xx-xx"://do we even need this option ?                            
        default:          
        

        let str_content

          
          this.obj_flex.fn_removeAllContent();
          
          //this.obj_menuButton.fn_open();          
          
          //str_content=obj_arg.obj_selected.fn_getHTMLContent();            
          //str_content=obj_arg.obj_selected.dom_obj.outerHTML;            
          if(obj_arg.obj_selected.fn_isElement()){
            obj_arg.obj_selected.obj_designDelegate.fn_preparePublish();            
            str_content=obj_arg.obj_selected.dom_obj.innerHTML;                        
            //str_content=obj_arg.obj_selected.dom_obj.outerHTML;                                               
            if(!str_content){str_content=""};        
            str_content=str_content.replace(/&quot;/gi, "'");            
            str_content=fn_formatCode(str_content);                          
            
          }
          else{
            str_content=obj_arg.obj_selected.dom_obj.data;                         
          }

          //alert("GET INNER HTML: " + obj_arg.obj_selected.dom_obj.innerHTML)          
          

          //*
          obj_ini=new Holder;    
          obj_ini.obj_design.str_type="Textarea"; 
          obj_ini.obj_theme=this.obj_theme;
          obj_ini.obj_design.str_content=str_content;
          obj_ini.obj_design.str_linkId=obj_arg.obj_selected.obj_design.str_id;                                          
          obj_ini.obj_design.str_nameEventChange=obj_project.obj_design.str_prefix + "myDesignerPaletteTextEditOnChange";            
          obj_ini.obj_design.str_valueEventChange="fn_linkPaletteTextEditChange";                  
          obj_ini.obj_domStyle.height="300px";                            
          obj_ini.obj_domStyle.width="100%";
          obj_ini.obj_domStyle.width="6000px";          
          let obj_tag=this.obj_flex.fn_addItem(obj_ini);          
          //*/
            
          /*
          //tinymce.remove();              
          this.fn_getTINYMCEEditor(this.obj_flex.dom_obj, str_content, obj_arg.obj_selected);            
          //*/
          break;
      }
    }

    fn_getTINYMCEEditor(dom_container, str_content, obj_selected){
      let oform, str_html, str_id_form, str_id_textarea, str_id_submit, str_text_submit;
      str_id_form="tinymceForm";
      str_id_textarea="tinymceTextArea";
      str_id_submit="tinymceSumbit";          
      str_text_submit="Save";

      str_html=`<form method="post" id="${str_id_form}" style="display:none"><textarea id="${str_id_textarea}" name="${str_id_textarea}"></textarea></form>`;
      dom_container.innerHTML=str_html;

      tinymce.remove('#' + str_id_textarea);
      tinymce.remove();

      tinymce.
      init({
        selector: "#" + str_id_textarea,  
        plugins: 'code',
        valid_elements : '*[*]',
        height: 300,
        toolbar: 'fontselect fontsizeselect',
        menubar: 'file options tools',                                      
        menu: {
          file: {title: 'File', items: 'newdocument save'},
          options: {title: 'Format', items: ' bold italic underline strikethrough superscript subscript | formats | forecolor backcolor removeformat'},        
        },        
        forced_root_block : '',
        setup: function (editor) {          

          editor.ui.registry.addMenuItem('save', {
            text: 'Save',
            onAction: function () {
              str_html=tinyMCE.get("#" + str_id_textarea).getContent();                                                
              //obj_selected.fn_setHTMLContent(str_html);
            }
          });          
        }
      })
      .then(
        editor => {                
          oform=document.querySelector("#" + str_id_form);
          oform.style.display="block";                              
          let myeditor=tinyMCE.get(str_id_textarea);          
          myeditor.setContent(str_content);
          
        } 
        
    )
    .catch( err => {
            console.error( err.stack );
    } );
    }    
    
    fn_linkPaletteTextEditChange(){            
      
      
      let obj_itemEvent, obj_item, str_name, str_value;      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_project.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      str_value=obj_itemEvent.str_value;

      let str_content=obj_itemEvent.fn_getHTMLContent();                        
      if(str_content===""){
        //str_content="blank";
      }
      obj_item.fn_parseHTMLContent(str_content); 
      
      obj_item.obj_designDelegate.fn_setPaletteSelected();


    }

    fn_clearOperation(){    
      super.fn_clearOperation();      
      //this.fn_displayWelcome();      
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
}
//END MESSENGER

//END Component/Design/ManagerMessenger.js
//START Component/Design/ObjectMap.js
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

//END Component/Design/ObjectMap.js
//START Component/Design/ObjectAction.js
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

//END Component/Design/ObjectAction.js
//START Component/Design/PropertyDOMProperty.js
  class PropertyDOMProperty extends PropertySheetPaletteItem{
    constructor(obj_delegator) { 
      super(obj_delegator); // call the super class constructor      
    }    
    fn_initialize(obj_delegator){
      this.obj_design.str_name="DOM Property";//name is hard coded in ManagerProperty fn_validate
      this.obj_design.str_title="Property";//title can be changed
      super.fn_initialize(obj_delegator);
    }   
    
    fn_linkPaletteDomPropertyChange(){      
      
      let obj_itemEvent, obj_item, str_name, str_value;      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      str_value=obj_itemEvent.str_value;            
      obj_item.fn_setDomProperty(str_name, str_value);                              
    }    
    fn_propertyDomPropertyChangeName(){      
      let obj_itemEvent, obj_item, str_name, str_value;      
      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      let foo_value=obj_itemEvent.str_value;
      foo_value=obj_shared.fn_parseBool(foo_value);                  
      this.foo_propertyDomPropertyChangeName=foo_value;      
      this.fn_propertyDomPropertyChangeCheck(obj_item);            
    }
    fn_propertyDomPropertyChangeValue(){      
      let obj_itemEvent, obj_item, str_name, str_value;      
      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      let foo_value=obj_itemEvent.str_value;
      foo_value=obj_shared.fn_parseBool(foo_value);                  
      this.foo_propertyDomPropertyChangeValue=foo_value;      
      this.fn_propertyDomPropertyChangeCheck(obj_item);            
    }
    fn_propertyDomPropertyChangeCheck(obj_item){
      let str_name, foo_value;
      str_name=this.foo_propertyDomPropertyChangeName;
      foo_value=this.foo_propertyDomPropertyChangeValue;      
      if(str_name===undefined){return;}
      if(foo_value===undefined){return;}
      obj_item.fn_setDomProperty(str_name, foo_value);      
      return true;
    }
    fn_linkOperation(obj_arg){      

      let obj_selected=obj_arg.obj_item;

      if(!obj_selected){return;}

      if(!obj_selected.fn_isElement()){
        return;
      }

      let obj_container, obj_item, obj_ini, arr;
      let obj_table, obj_row, obj_cell;

      //if(!this.obj_flexSelectedHTMLDom){
        obj_ini=new Holder;                    
        obj_ini.obj_design.str_type="Flex";                  
        obj_ini.obj_domStyle.padding="5px";
        obj_ini.obj_domStyle.backgroundColor=this.obj_theme.backgroundColor;
        this.obj_flexSelectedHTMLDom=this.obj_flex.fn_addItem(obj_ini);               
      //}
      obj_container=this.obj_flexSelectedHTMLDom;
      
      
      //START PROPERTY SHEET
      obj_arg=new Holder;      
      obj_arg.obj_item=obj_selected;
      obj_arg.obj_container=obj_container;
      obj_arg.str_title="PROPERTY"
      obj_arg.obj_item=obj_selected;
      obj_arg.obj_propertySheet=obj_selected.obj_domProperty;      
      obj_arg.obj_design.str_nameEventChange=obj_project.obj_design.str_prefix + "myDesignerPalettePropertyOnChange";
      obj_arg.str_propertySourceChange="fn_propertyDomPropertyChange";            
      obj_arg.obj_design.str_valueEventChange="fn_linkPaletteDomPropertyChange";            
      obj_arg.str_optionDOMDisplay="DOMProperty";
      this.fn_displayPropertySheet(obj_arg);
      //END PROPERTY SHEET
    }        
    
    
    
    

}
//END MESSENGER

//END Component/Design/PropertyDOMProperty.js
//START Component/Design/PropertyDOMAttribute.js
  class PropertyDOMAttribute extends PropertySheetPaletteItem{
    constructor(obj_delegator) { 
      super(obj_delegator); // call the super class constructor      
    }    
    fn_initialize(obj_delegator){
      this.obj_design.str_name="DOM Attribute";//name is hard coded in ManagerProperty fn_validate
      this.obj_design.str_title="Attribute";//title can be changed
      super.fn_initialize(obj_delegator);
    }   
    
    fn_linkPaletteDomAttributeChange(){      
      
      let obj_itemEvent, obj_item, str_name, str_value;      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      str_value=obj_itemEvent.str_value;            
      obj_item.fn_setDomAttribute(str_name, str_value);                              
    }    
    fn_propertyDomAttributeChangeName(){    //appears to be defunct  
      let obj_itemEvent, obj_item, str_name, str_value;      
      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      let foo_value=obj_itemEvent.str_value;
      foo_value=obj_shared.fn_parseBool(foo_value);                  
      this.foo_propertyDomAttributeChangeName=foo_value;      
      this.fn_propertyDomAttributeChangeCheck(obj_item);            
    }
    fn_propertyDomAttributeChangeValue(){      
      let obj_itemEvent, obj_item, str_name, str_value;      
      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      let foo_value=obj_itemEvent.str_value;
      foo_value=obj_shared.fn_parseBool(foo_value);            
      this.foo_propertyDomAttributeChangeValue=foo_value;      
      this.fn_propertyDomAttributeChangeCheck(obj_item);            
    }
    fn_propertyDomAttributeChangeCheck(obj_item){
      let str_name, foo_value;
      str_name=this.foo_propertyDomAttributeChangeName;
      foo_value=this.foo_propertyDomAttributeChangeValue;      
      if(str_name===undefined){return;}
      if(foo_value===undefined){return;}
      obj_item.fn_setDomAttribute(str_name, foo_value);      
      return true;
    }
    fn_linkOperation(obj_arg){      

      let obj_selected=obj_arg.obj_item;

      if(!obj_selected){return;}

      if(!obj_selected.fn_isElement()){
        return;
      }

      let obj_container, obj_item, obj_ini, arr;
      let obj_table, obj_row, obj_cell;

      //if(!this.obj_flexSelectedHTMLDom){
        obj_ini=new Holder;                    
        obj_ini.obj_design.str_type="Flex";                  
        obj_ini.obj_domStyle.padding="5px";
        obj_ini.obj_domStyle.backgroundColor=this.obj_theme.backgroundColor;
        this.obj_flexSelectedHTMLDom=this.obj_flex.fn_addItem(obj_ini);               
      //}
      obj_container=this.obj_flexSelectedHTMLDom;
      
      
      //START PROPERTY SHEET
      obj_arg=new Holder;      
      obj_arg.obj_item=obj_selected;
      obj_arg.obj_container=obj_container;
      obj_arg.str_title="ATTRIBUTE";      
      obj_arg.obj_propertySheet=obj_selected.obj_domAttribute;      
      obj_arg.obj_design.str_nameEventChange=obj_project.obj_design.str_prefix + "myDesignerPalettePropertyOnChange";
      obj_arg.str_propertySourceChange="fn_propertyDomAttributeChange";            
      obj_arg.obj_design.str_valueEventChange="fn_linkPaletteDomAttributeChange";                  
      obj_arg.str_optionDOMDisplay="DOMAttribute";
      this.fn_displayPropertySheet(obj_arg);
      //END PROPERTY SHEET
    }        
    
    
    
    

}
//END MESSENGER

//END Component/Design/PropertyDOMAttribute.js
//START Component/Design/PropertyDOMStyle.js
  class PropertyDOMStyle extends PropertySheetPaletteItem{
    constructor(obj_delegator) { 
      super(obj_delegator); // call the super class constructor      
    }        
    fn_initialize(obj_delegator){
      this.obj_design.str_name="Style Property";//name is hard coded in ManagerProperty fn_validate
      this.obj_design.str_title="Style";//title can be changed
      super.fn_initialize(obj_delegator);
    }   
    
    fn_linkPaletteStyleChange(){
      
      let obj_itemEvent, obj_item, str_name, str_value;      
      obj_itemEvent=obj_project.obj_projectEvent;      
      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);                        
      str_name=obj_itemEvent.obj_design.str_name;
      str_value=obj_itemEvent.str_value;      
      obj_item.fn_setStyleAttribute(str_name, str_value);                  
    }
    fn_propertyDOMStyleChangeName(){      
      let obj_itemEvent, obj_item, str_name, str_value;      
      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      let foo_value=obj_itemEvent.str_value;
      foo_value=obj_shared.fn_parseBool(foo_value);                  
      this.foo_propertyDOMStyleChangeName=foo_value;      
      this.fn_propertyDOMStyleChangeCheck(obj_item);            
    }
    fn_propertyDOMStyleChangeValue(){      
      let obj_itemEvent, obj_item, str_name, str_value;      
      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      let foo_value=obj_itemEvent.str_value;
      foo_value=obj_shared.fn_parseBool(foo_value);        
      this.foo_propertyDOMStyleChangeValue=foo_value;      
      this.fn_propertyDOMStyleChangeCheck(obj_item);            
    }
    fn_propertyDOMStyleChangeCheck(obj_item){
      let str_name, foo_value;
      str_name=this.foo_propertyDOMStyleChangeName;
      foo_value=this.foo_propertyDOMStyleChangeValue;      
      if(str_name===undefined){return;}
      if(foo_value===undefined){return;}
      obj_item.fn_setStyleAttribute(str_name, foo_value);      
      return true;
    }
    fn_linkOperation(obj_arg){      

      let obj_selected=obj_arg.obj_item;
     
      if(!obj_selected){return;}

      if(!obj_selected.fn_isElement()){
        return;
      }

      let obj_container, obj_ini;      

      //if(!this.obj_flexSelectedStyle){
        obj_ini=new Holder;                    
        obj_ini.obj_design.str_type="Flex";                  
        obj_ini.obj_domStyle.padding="5px";
        obj_ini.obj_domStyle.backgroundColor=this.obj_theme.backgroundColor;
        this.obj_flexSelectedStyle=this.obj_flex.fn_addItem(obj_ini);               
      //}

      obj_container=this.obj_flexSelectedStyle;
      
      //START PROPERTY SHEET
      obj_arg=new Holder;
      obj_arg.obj_item=obj_selected;
      obj_arg.obj_container=obj_container;
      obj_arg.str_title="STYLE";
      obj_arg.obj_item=obj_selected;
      obj_arg.obj_propertySheet=obj_selected.obj_domStyle;                  
      obj_arg.obj_design.str_nameEventChange=obj_project.obj_design.str_prefix + "myDesignerPalettePropertyOnChange";
      obj_arg.str_propertySourceChange="fn_propertyDOMStyleChange";            
      obj_arg.obj_design.str_valueEventChange="fn_linkPaletteStyleChange";                  
      obj_arg.str_optionDOMDisplay="DOMStyle";
      this.fn_displayPropertySheet(obj_arg);
      //END PROPERTY SHEET            
    }   
    
}
//END MESSENGER

//END Component/Design/PropertyDOMStyle.js
//START Component/Design/PropertyDesign.js
  class PropertyDesign extends PropertySheetPaletteItem{
    constructor(obj_delegator) { 
      super(obj_delegator); // call the super class constructor      
    }        
    fn_initialize(obj_delegator){
      
      this.obj_design.str_name="Design Property";//name is hard coded in ManagerProperty fn_validate
      this.obj_design.str_title="Design";//title can be changed
      super.fn_initialize(obj_delegator);
    }   
    
    fn_linkPaletteDesignChange(){        
      
      let obj_itemEvent, obj_item, str_name, str_value;      
      obj_itemEvent=obj_project.obj_projectEvent;    
      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);                              
      str_name=obj_itemEvent.obj_design.str_name;
      str_value=obj_itemEvent.str_value;          
      obj_item.fn_setDesignAttribute(str_name, str_value);                  
    }
    fn_propertyDesignChangeName(){      
      let obj_itemEvent, obj_item, str_name, str_value;      
      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      let foo_value=obj_itemEvent.str_value;
      foo_value=obj_shared.fn_parseBool(foo_value);                  
      this.foo_propertyDesignChangeName=foo_value;      
      this.fn_propertyDesignChangeCheck(obj_item);            
    }
    fn_propertyDesignChangeValue(){      
      let obj_itemEvent, obj_item, str_name, str_value;      
      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      let foo_value=obj_itemEvent.str_value;
      foo_value=obj_shared.fn_parseBool(foo_value);            
      this.foo_propertyDesignChangeValue=foo_value;      
      this.fn_propertyDesignChangeCheck(obj_item);            
    }
    fn_propertyDesignChangeCheck(obj_item){
      let str_name, foo_value;
      str_name=this.foo_propertyDesignChangeName;
      foo_value=this.foo_propertyDesignChangeValue;      
      if(str_name===undefined){return;}
      if(foo_value===undefined){return;}
      obj_item.fn_setDesignAttribute(str_name, foo_value);      
      return true;
    }
    fn_linkOperation(obj_arg){         
        

      let obj_selected=obj_arg.obj_item;
     
      if(!obj_selected){return;}

      let obj_container, obj_ini;      

      //if(!this.obj_flexSelectedDesign){
        obj_ini=new Holder;                    
        obj_ini.obj_design.str_type="Flex";                  
        obj_ini.obj_domStyle.padding="5px";
        obj_ini.obj_domStyle.backgroundColor=this.obj_theme.backgroundColor;
        this.obj_flexSelectedDesign=this.obj_flex.fn_addItem(obj_ini);               
      //}

      obj_container=this.obj_flexSelectedDesign;
      
      //START PROPERTY SHEET
      obj_arg=new Holder;
      obj_arg.obj_item=obj_selected;
      obj_arg.obj_container=obj_container;
      obj_arg.str_title="DESIGN";
      obj_arg.obj_item=obj_selected;
      obj_arg.obj_propertySheet=obj_selected.obj_design;                  
      obj_arg.obj_design.str_nameEventChange=obj_project.obj_design.str_prefix + "myDesignerPalettePropertyOnChange";
      //obj_arg.str_propertySourceChange="fn_propertyDesignChange"; //DONT ADD A NEW NAME/VALUE ROW          
      obj_arg.obj_design.str_valueEventChange="fn_linkPaletteDesignChange";                        
      this.fn_displayPropertySheet(obj_arg);
      //END PROPERTY SHEET      
      
      
    }   
    
}
//END MESSENGER

//END Component/Design/PropertyDesign.js

/*id: 335//*/
/*type: Design//*/
/*END COMPONENT//*/



/*START COMPONENT//*/
/*id: 302//*/
/*type: AJAX//*/
//START Component/AJAX.js
class AJAX extends Component {
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor
    }
    fn_initialize(obj_ini){
        super.fn_initialize(obj_ini);

        this.obj_holder.bln_debug=true;
        this.obj_design.bln_hiddenPin=true;    
    }
    
    ///START AJAX       
    fn_putPost(obj_post){
        
        obj_post.Direction="SEND";
        if(obj_post.Action===undefined){      
        console.log("Error: Data Put Post: Action is not specified");
        return;
        }

        if(this.obj_holder.bln_debug){
            this.fn_debugServerPost(obj_post, "");
        }
        
        if(obj_post.URL===undefined){
            console.log("obj_post.URL is undeifned");        
            return;
        }

        

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        obj_post.method="POST";
        obj_post.headers=myHeaders;
        obj_post.body=JSON.stringify(obj_post);
        
        this.fn_runDataFetch(obj_post);
    }

    fn_runDataFetch(obj_post){

        fetch(obj_post.URL, obj_post)
        .then(Response=> {
            //this.fn_debugServerResponse(Response, true);
            return Response.json();
        })
        .then(data => {            
            this.fn_putPostCallbackFetch(data);
            //console.log(data)
        })
        .catch(err => {
            console.log(err);
            //this.fn_debugServerResponse(Response, true);
        })
    }

    fn_ajaxLocateObjectInstance(obj_post){
        //let int_index;

        obj_post.ObjectInstance=false;
        int_index=obj_post.DesignId.indexOf("myId");
        if(int_index!==-1){                            
            obj_post.ObjectInstance=obj_project.fn_findItemById(obj_post.DesignId);//try to find in own Project        
        }       
        return obj_post.ObjectInstance;
    }

    fn_ajaxLocateObjectNotifier(obj_post){
        let int_index;
        obj_post.ObjectNotifier=false;
        int_index=obj_post.NotifierId.indexOf("myId");        
        obj_post.ObjectNotifier=obj_project.fn_findItemById(obj_post.NotifierId);                                        
        return obj_post.ObjectNotifier;
    }

    fn_putPostCallbackFetch(obj_post){
        obj_post=this.fn_formatPostFetch(obj_post);    
        let int_index, obj_notifier, str_action, str_actionCallback;  

        obj_post.ObjectInstance=this.fn_ajaxLocateObjectInstance(obj_post);
        obj_post.ObjectNotifier=this.fn_ajaxLocateObjectNotifier(obj_post);
        

        str_action=obj_post.Action;                
        str_actionCallback=obj_post.ActionCallBack;                

        obj_notifier=this;
        if(obj_notifier){
            if(obj_notifier[str_action]){
                obj_notifier[str_action](obj_post);
            }        
        }
        
        obj_notifier=obj_post.ObjectNotifier;
        if(obj_notifier){            
            if(obj_notifier[str_actionCallback]){
                obj_notifier[str_actionCallback](obj_post);
            }        
        }

    }
    fn_formatPostFetch(obj_post, bln_expanded=false){//could this be overriden to allow for applicaiton specific processing

        obj_post.Direction="RECEIVE";  
        obj_post.ObjectData=obj_myJson.fn_deserialize(obj_post.ObjectData);  
        obj_post.RowData=obj_myJson.fn_deserialize(obj_post.RowData);//Array of  Recordset Rows  

        if(Array.isArray(obj_post.RowData)){
            obj_post.RowObject=obj_post.RowData[0];//1st Row of RecordSet, for handy access ? otheriwse just use obj_post.RowData[0]
        }
        if(this.obj_holder.bln_debug){
            this.fn_debugServerPost(obj_post, "");
        }

        return obj_post;
    }


    fn_actionSerialize(obj_myObject){                  

        /*/
        let fn_serializeReplacer;      
            this.fn_serializeReplacer=this.fn_serializeReplacerDefault;
            if(obj_myObject.fn_serializeReplacer!==undefined){        
                this.fn_serializeReplacer=obj_myObject.fn_serializeReplacer;
            }      
            
        //*/
        this.obj_myObject=obj_myObject;
        let str_json=JSON.stringify(obj_myObject, this.fn_mySerializeReplacer());   
        return str_json;      
    }
    fn_deserialize(str_json){      
        let obj_json={};
        try {
        obj_json=JSON.parse(str_json);
        } catch (error) {
            console.error("*****START ERROR myJSON DeSerialize*****");
            console.error("Error: " + error);
            console.error("str_json: " + str_json);
            console.error("*****END ERROR myJSON DeSerialize*****\n\n");
        }      
        return obj_json;
    }
    fn_formatPost(){//to be overriden by component.
        let obj_post=new Object;         
        return obj_post;
    }       

    fn_debugServerPost(obj_post, str_title){//to be overidden by component
    }      

///END AJAX
  
}//END CLS
//END DATA
//END Component/AJAX.js

/*id: 302//*/
/*type: AJAX//*/
/*END COMPONENT//*/




/*START COMPONENT//*/
/*id: 336//*/
/*type: DesignFile//*/
//START Component/DesignFile.js
class DesignFile extends AJAX {
    constructor(obj_ini) {        
      super(obj_ini); // call the super class constructor                    
    }    
    fn_initialize(obj_ini){
        super.fn_initialize(obj_ini);

        //START INITIALIZE DESIGN            
        this.obj_design.str_type="DesignFile";
        this.obj_design.str_tag="DesignFile";
        this.obj_design.str_name="My Design File";        
        this.obj_design.str_url_base="/xdesign/Instance.php";        
        
        //END INITIALIZE DESIGN      
        //START INITIALIZE STYLE                    
        //END INITIALIZE STYLE                
    }     
    fn_runSave(obj_instance){        
        this.fn_save({obj_instance:obj_instance})
    }
    fn_runDelete(obj_instance){        
        this.fn_delete({obj_instance:obj_instance})
    }
    fn_runPublish(obj_instance){        
        this.fn_publish({obj_instance:obj_instance})
    }
    fn_runAction(obj_ini){    
        if(!obj_ini){return;}        
        let obj_post=this.fn_formatPost(obj_ini);                                       
        this.fn_putPost(obj_post);
    }

    fn_saveComponent(obj_iniSave){

        //MARK INSTANCE
        let obj_ini;
        let bln_debug=false;
        let obj_instance=obj_iniSave.ObjectInstance;        
        
        obj_instance.obj_holder.bln_markSave=true;

        if(bln_debug){obj_instance.fn_debug("ENTER fn_saveComponent");}

        let arr, obj_item, bln_allSaved;
        arr=obj_instance.obj_design.arr_item;        
        //ARE THE CHILDREN SAVED
        bln_allSaved=true;
        for(let i=0;i<arr.length;i++){
            obj_item=arr[i];
            if(obj_item.obj_design.int_modeExecute===obj_holder.int_modeEdit){                
                if(bln_debug){obj_item.fn_debug("CHILD NOT SAVED");}
                obj_ini=new Object;
                obj_ini.ObjectInstance=obj_item;                
                this.fn_saveComponent(obj_ini);
                bln_allSaved=false;
                break;
            }
        }
        if(!bln_allSaved){
            if(bln_debug){obj_instance.fn_debug("bln_allSaved is false, return");}
            return;
        }
        
        obj_instance.obj_holder.bln_markSave=false;

        //SAVE        
        if(parseInt(obj_instance.obj_design.int_modeExecute)===obj_holder.int_modeEdit){        
            if(bln_debug){obj_instance.fn_debug("ALL CHILD SAVED, EDITABLE");}            
            obj_ini=new Object;
            obj_ini.obj_instance=obj_instance;
            obj_ini.str_IdValidator=this.obj_design.str_id;
            obj_ini.str_actionCallback="fn_saveComponent";                        
            this.fn_save(obj_ini);            
            obj_instance.obj_design.int_modeExecute=obj_holder.int_modeReadOnly;
        }
        else{
            //IF PARENT IS MARKED, TELL THEM                
            let obj_parent=obj_instance.fn_getParentComponent();                                
            if(obj_parent && obj_parent.obj_holder.bln_markSave){
                if(bln_debug){obj_instance.fn_debug("CALL PARENT, NONEDITABLE");}                
                obj_ini=new Object;
                obj_ini.ObjectInstance=obj_parent;                                
                this.fn_saveComponent(obj_ini);                            
            } 
            else{
                if(bln_debug){obj_instance.fn_debug("END fn_saveComponent");}                
                this.obj_holder.obj_container.onSaveComponent();                
            }           
        }
    }

    fn_save(obj_ini){  
        
        let obj_instance=obj_ini.obj_instance;
        if(parseInt(obj_instance.obj_design.int_modeExecute)!==obj_instance.obj_holder.int_modeEdit){            
            console.log(obj_instance.obj_design.str_tag + ": Mode Not Valid For Operation [" + obj_instance.obj_design.int_modeExecute + "][" + obj_instance.obj_holder.int_modeEdit + "]");
            //this will be the case for runtme components , running within editable components
            return;
        }
        //str_action could be publish
        obj_ini.str_action="save";
        if(!obj_ini.str_actionCallback){obj_ini.str_actionCallback=obj_ini.str_action;}

        if(parseInt(obj_instance.obj_design.int_idRecord)===0){            
            obj_ini.str_action="saveAs";          
        }

        //Very Important - do not fuck about with this
        let int_modeExecuteCopy=obj_instance.obj_design.int_modeExecute;//make a copy of current mode
        obj_instance.obj_design.int_modeExecute=this.obj_holder.int_modeRuntime;//db should be saved in runtime mode
        //Very Important - do not fuck about with this

        
        let obj_post=this.fn_formatPost(obj_ini);               
        obj_post.ObjectData=this.fn_actionSerialize(obj_instance);//obj_post.ObjectData is now a JSON String
        //alert(obj_post.ObjectData);        
        this.fn_putPost(obj_post);
        
        //Very Important - do not fuck about with this
        obj_instance.obj_design.int_modeExecute=int_modeExecuteCopy;//put back in original mode
        //Very Important - do not fuck about with this
    }
    save(obj_post){     
    }
    saveAs(obj_post){        
        obj_post.ObjectInstance.obj_design.int_idRecord=obj_post.RecordId;
    }
    

    fn_formatPost(obj_ini){

        let obj_post=new Object;         
        obj_post.URL=this.obj_design.str_url_base;
        
        obj_post.NotifierId=obj_ini.str_IdValidator;                        
        obj_post.Action=obj_ini.str_action;                
        obj_post.ActionCallBack=obj_ini.str_actionCallback;                
        if(!obj_post.ActionCallBack){
            obj_post.ActionCallBack=obj_ini.str_action;                
        }
        obj_post.RecordId=obj_ini.RecordId;//could get complicated if obj_instance supplied                
        obj_post.Query=obj_ini.Query;
        obj_post.ProjectPin=obj_ini.bln_projectPin;        
        obj_post.PalettePin=obj_ini.bln_palettePin;        
        
        
        let obj_instance=obj_ini.obj_instance;
        if(obj_instance){
            obj_post.DesignId=obj_instance.obj_design.str_id;                                
            obj_post.RecordName=obj_instance.obj_design.str_name;
            obj_post.RecordType=obj_instance.obj_design.str_type;
            obj_post.RecordId=obj_instance.obj_design.int_idRecord;            
            obj_post.ToggleProjectPin=obj_instance.obj_design.bln_toggleProjectPin;
            obj_post.HiddenPin=obj_instance.obj_design.bln_hiddenPin;
            obj_post.ProjectPin=obj_instance.obj_design.bln_projectPin;
            obj_post.PalettePin=obj_instance.obj_design.bln_palettePin;        
            obj_post.DependentId=obj_instance.fn_compileDependentId();              
            obj_post.IsRoot=obj_instance.obj_holder.bln_isRoot;//Is Project Instance - set Current Project            
        }
        return obj_post;
    }    

    fn_delete(obj_ini){        
        if(obj_ini.obj_instance.obj_design.int_idRecord===0){//safety-catch, should be handle before here, dont go to server, go straight to default code open
            console.log("Cannot delete. Record Id is zero.");
            return;            
        }
        obj_ini.str_action="delete";
        let obj_post=this.fn_formatPost(obj_ini);               
        this.fn_putPost(obj_post);
    } 
    delete(obj_post){        
        obj_post.ObjectInstance.obj_design.int_idRecord=0;
    } 

    fn_publish(obj_ini){                
        if(obj_ini.obj_instance.obj_design.int_idRecord===0){return;}        
        obj_ini.str_action="publish";
        let obj_instance=obj_ini.obj_instance;        
        let obj_post=this.fn_formatPost(obj_ini);               
        obj_post.ObjectData=this.fn_actionSerialize(obj_instance);//obj_post.ObjectData is now a JSON String
        this.fn_putPost(obj_post);
    }  
    publish(obj_post){
    }
    
    fn_ajaxLocateObjectInstance(obj_post){
        let int_index;
    
        obj_post.ObjectInstance=false;
        int_index=obj_post.DesignId.indexOf("DesignIdNotSet");        
        if(int_index==-1){                            
            obj_post.ObjectInstance=obj_project.fn_findItemById(obj_post.DesignId);//try to find in own Project
            if(!obj_post.ObjectInstance){
                if(obj_projectTarget){
                    obj_post.ObjectInstance=obj_projectTarget.fn_findItemById(obj_post.DesignId);//try to find in design Project
                }
            }        
        }               
        return obj_post.ObjectInstance;
    }
    
    fn_mySerializeReplacer(){ //when Saving
        //DESIGNFILE overide serialize object
    const seen = new WeakSet();
    return (key, value) => {

        switch(key){
        case "obj_ini":
            return;
        break;
        case "obj_designDelegate":
            return;
        break;
        case "int_modeExecute":
            return;
        }
        //console.log(key + ": " + value);

        if (typeof value === "object" && value !== null) {
            if(value.constructor.name==="Holder"){//Dont serialize this object (or the objects attached to it)
                return;
            }
            if(value.bln_isComponent){
                
                if(value!==this.obj_myObject){//referes to the component that intiated the serializaiton ie the component

                    let obj_instance=value;                    
                    
                    let str_name_constructor=obj_instance.constructor.name;//get class name
                    let obj_ini=new Holder;
                    obj_ini.obj_design.int_idRecord=obj_instance.obj_design.int_idRecord;//Only Previously Saved Components can be saved, (if in Editmode). The Recor dId wil be use dto retireve from the Object Map
                    //obj_ini.obj_design.str_type=obj_instance.obj_design.str_type;//if have any issues with generic tag, try uncommenitng this out , to ensure the correct constructoir is written into the base object add item new instance
                    obj_ini.obj_design.str_tag=obj_instance.obj_design.str_tag;//we ened to ensure the correct Tag name is in the Parent Serialization  - as otheriwse the required tagname may  not be created (during the inital base object new instance ini), e.g. where it is not explicitly stated int the class file. i.e. generci Tag component.
                    let str_eval="new " + str_name_constructor + "(obj_ini)";//Blank Instance wtih  will be saved as child component, not the current child                                            
                    value=eval(str_eval);
                    //*
                    //This allows Controls not be saved - e.g boot controls
                    //also design control that is a special case, apparently.                        
                    if(obj_instance.obj_design.bln_preventSave){
                        //console.log(obj_instance.obj_design.str_name + ": bln_preventSave" + obj_instance.obj_design.bln_preventSave);
                        return ;
                    }                                                
                    //*/
                    
                    let obj_designFile=this;              
                    let obj_designFileIni=new Object;
                    obj_designFileIni.obj_instance=obj_instance;
                    obj_designFile.fn_save(obj_designFileIni);//We need to save this Design Component - however normally you would add componentids to other components.                                                             
                    //this.fn_save(obj_instance);//wont be able to saved if intmodeRuntime etc
                    //suib components wil generlaly not be  in edit mode , and so wont be saved
                }
                //return;
            }

            if (seen.has(value)) {
                //return "circular";
                return;
            }

            seen.add(value);
        }
        return value;
        };
    }  

    fn_debugServerPost(obj_post, str_comment){                        
        
        if(str_comment===undefined){str_comment=""}
        let str_title, s;
        s="";
        if(obj_post.Direction){s+=obj_post.Direction + " ";}
        if(obj_post.Action){s+=obj_post.Action + " ";}
        if(obj_post.RecordName && obj_post.RecordName!="RecordNameNotSet"){s+=obj_post.RecordName + " ";}
        if(obj_post.str_comment){s+=obj_post.str_comment + " ";}        
        str_title=s;
        
        
        console.groupCollapsed(str_title);
        let Context=obj_post.Context;
        if(obj_post.Context==undefined){Context=""}        
        if(Context!==""){console.log("obj_post.Context: " + obj_post.Context);}                            
        
        let NotifierId=obj_post.NotifierId;
        if(obj_post.NotifierId==undefined){NotifierId=""}        
        if(NotifierId!==""){console.log("obj_post.NotifierId: " + obj_post.NotifierId);}                

        let Action=obj_post.Action;
        if(obj_post.Action==undefined){Action=""}        
        if(Action!==""){console.log("obj_post.Action: " + obj_post.Action);}                            

        let ActionCallBack=obj_post.ActionCallBack;
        if(obj_post.ActionCallBack==undefined){ActionCallBack=""}        
        if(ActionCallBack!==""){console.log("obj_post.ActionCallBack: " + obj_post.ActionCallBack);}                            

        let DesignId=obj_post.DesignId;
        if(obj_post.DesignId==undefined){DesignId=""}        
        if(DesignId!==""){console.log("obj_post.DesignId: " + obj_post.DesignId);}                

        let RecordName=obj_post.RecordName;
        if(obj_post.RecordName==undefined){RecordName=""}        
        if(RecordName!==""){console.log("obj_post.RecordName: " + obj_post.RecordName);}        

        let RecordType=obj_post.RecordType;
        if(obj_post.RecordType==undefined){RecordType=""}        
        if(RecordType!==""){console.log("obj_post.RecordType: " + obj_post.RecordType);}
        
        let RecordId=obj_post.RecordId;
        if(obj_post.RecordId==undefined){RecordId=""}        
        if(RecordId!==""){console.log("obj_post.RecordId: " + obj_post.RecordId);}    

        let ToggleProjectPin=obj_post.ToggleProjectPin;
        if(obj_post.ToggleProjectPin==undefined){ToggleProjectPin=""}        
        if(ToggleProjectPin!==""){console.log("obj_post.ToggleProjectPin: " + obj_post.ToggleProjectPin);}    

        let HiddenPin=obj_post.HiddenPin;
        if(obj_post.HiddenPin==undefined){HiddenPin=""}        
        if(HiddenPin!==""){console.log("obj_post.HiddenPin: " + obj_post.HiddenPin);}    
        
        let ProjectPin=obj_post.ProjectPin;
        if(obj_post.ProjectPin==undefined){ProjectPin=""}        
        if(ProjectPin!==""){console.log("obj_post.ProjectPin: " + obj_post.ProjectPin);}    
        
        let PalettePin=obj_post.PalettePin;
        if(obj_post.PalettePin==undefined){PalettePin=""}        
        if(PalettePin!==""){console.log("obj_post.PalettePin: " + obj_post.PalettePin);}                

        let DependentId=obj_post.DependentId;
        if(obj_post.DependentId==undefined){DependentId=""}        
        if(DependentId!==""){console.log("obj_post.DependentId: " + obj_post.DependentId);}                                       
        
        let Query=obj_post.Query;
        if(obj_post.Query==undefined){Query=""}        
        if(Query!==""){console.log("obj_post.Query: " + obj_post.Query);}                                    
        
        let Echo=obj_post.Echo;
        if(obj_post.Echo==undefined){Echo=""}        
        if(Echo!==""){console.log("obj_post.Echo: " + obj_post.Echo);}

        let Hidden=obj_post.Hidden;
        if(obj_post.Hidden==undefined){Hidden=""}        
        if(Hidden!==""){console.log("obj_post.Hidden: " + obj_post.Hidden);}

        let HasError=obj_post.HasError;
        if(obj_post.HasError==undefined){HasError=""}        
        if(obj_post.HasError==false){HasError=""}        
        if(HasError!==""){
            console.error("obj_post.HasError: " + obj_post.HasError);            
            console.error(obj_post.ErrorMessage);
        }                

        console.groupCollapsed("OBJECT DATA");                
        console.table(obj_post.ObjectData);                                
        console.groupEnd();
        
        
        console.groupCollapsed("ROW DATA");
        console.table(obj_post.RowData);
        console.groupEnd();
        

        console.groupEnd();
    }
}//END CLS
//END DATA
//END Component/DesignFile.js

/*id: 336//*/
/*type: DesignFile//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 340//*/
/*type: Flex//*/
//START Component/Flex.js
  class Flex extends Component {
    constructor(obj_ini) {
      super(obj_ini); // call the super class constructor
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      //START INITIALIZE DESIGN
      this.obj_design.str_type="Flex";
      this.obj_design.str_tag="Flex";      
      this.fn_setContainer(true);
      //END INITIALIZE DESIGN

      //START INITIALIZE STYLE
      this.obj_domStyle.display="flex";      
      if(this.obj_domStyle.backgroundColor===undefined){this.obj_domStyle.backgroundColor=obj_shared.fn_getRandomColor();}//no-wrap      
      if(this.obj_domStyle.flexWrap===undefined){this.obj_domStyle.flexWrap="wrap";}//no-wrap      
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="100%";}
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}
      if(this.obj_domStyle.padding==undefined){this.obj_domStyle.padding="10px";}       
      if(this.obj_domStyle.overflow==undefined){this.obj_domStyle.overflow="auto";}             
      //END INITIALIZE STYLE      
    }

}//END CLS
//END FLEX

//END Component/Flex.js

/*id: 340//*/
/*type: Flex//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 350//*/
/*type: Grid//*/
//START Component/Grid.js
class Grid extends Component {
    constructor(obj_ini) {            
      super(obj_ini); // call the super class constructor       
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      //START INITIALIZE DESIGN
      this.obj_design.str_type="Grid";
      this.obj_design.str_tag="Grid";      
      if(this.obj_design.bln_split==undefined){this.obj_design.bln_split=false;}            
      this.fn_setContainer(true);
      
      if(this.obj_design.bln_eazygrid===undefined){this.obj_design.bln_eazygrid=true}      
      
      if(this.obj_design.str_minDim==undefined){this.obj_design.str_minDim="100px";}      
      if(this.obj_design.str_gridTemplateDefault==undefined){this.obj_design.str_gridTemplateDefault="minmax(" + this.obj_design.str_minDim + ", 1fr)";}
      //END  INITIALIZE DESIGN
      
      //START INITIALIZE STYLE        
      this.obj_domStyle.display="grid";
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="100%";}
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}
      if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="0px";}
      if(this.obj_domStyle.gridGap==undefined){this.obj_domStyle.gridGap="10px";}
      if(this.obj_domStyle.gridAutoRows==undefined){this.obj_domStyle.gridAutoRows=this.obj_design.str_gridTemplateDefault;}
      if(this.obj_domStyle.gridAutoColumns==undefined){this.obj_domStyle.gridAutoColumns=this.obj_design.str_gridTemplateDefault;}
      if(this.obj_domStyle.gridTemplateRows==undefined){this.obj_domStyle.gridTemplateRows=this.obj_design.str_gridTemplateDefault;}
      if(this.obj_domStyle.gridTemplateColumns==undefined){this.obj_domStyle.gridTemplateColumns=this.obj_design.str_gridTemplateDefault;}
      if(this.obj_domStyle.overflow==undefined){this.obj_domStyle.overflow="hidden";}
      //END INITIALIZE STYLE
    }     
    fn_initializePluginDesign(){
      this.obj_designDelegate=new DesignDelegateGrid(this);                        
    }
    
    fn_addItem(obj_ini){
      let obj_item;        
      if(obj_ini.obj_design.str_type==undefined){
        obj_ini.obj_design.str_type="GridItem";
      } 

      
      this.fn_setOrientation(obj_ini);
      obj_item=super.fn_addItem(obj_ini);

      this.fn_applyFeatures();
      return obj_item;
    }
    fn_setOrientation(obj_ini){ // now moved to grid
      if(this.obj_design.bln_split!==undefined){
          return;
        }
      if(obj_ini.obj_design.bln_split===undefined){
          return;
      }
      if (typeof obj_ini.obj_design.bln_split !== "boolean"){
          return;
      }
      this.obj_design.bln_split=obj_ini.obj_design.bln_split;
  }
    
    
    fn_getIsEmpty(){
      let arr, obj_item;
      arr=this.obj_design.arr_item;
      if(arr.length>1){
        console.log("arr.length>1")
        return false;
      }
      if(!arr.length){        
        return true;
      }
      obj_item=arr[0];
      if(obj_item.fn_getType()!=="GRIDITEM"){
        console.log("obj_item !==GRIDITEM")
        return false;
      }
      if(obj_item.obj_design.arr_item.length){
        console.log("(obj_item.obj_design.arr_item.length is true")
        return false;
      }
      return true;
    }
      
      
    
    fn_createChildren(){//only in boot/pallteItem phase

      let obj_ini;
      
      
      if(this.obj_design.bln_eazygrid){        
        
        obj_ini=new Holder;                     
        obj_ini.obj_domStyle.backgroundColor=obj_project.obj_theme.forgroundColor;                        
        //obj_ini.obj_domStyle.backgroundColor=obj_shared.fn_getRandomColor();                                
        this.fn_addItem(obj_ini);     
      
        obj_ini=new Holder;                     
        obj_ini.obj_domStyle.backgroundColor=obj_project.obj_theme.forgroundColor;                        
        //obj_ini.obj_domStyle.backgroundColor=obj_shared.fn_getRandomColor();                        
        this.fn_addItem(obj_ini);                
      }    
    }        
    
    fn_compileTemplate(){      

      this.obj_domStyle.gridTemplateRows=this.obj_design.str_gridTemplateDefault;
      this.obj_domStyle.gridTemplateColumns=this.obj_design.str_gridTemplateDefault;     

      if(this.obj_design.bln_split===undefined){
        return;
      }
      
      let obj_item;
      let s="";            
      this.obj_design.arr_item.forEach(obj_item => {                
        s+=obj_item.obj_design.gridTemplate;        
        s+=" ";
      });      
      s=s.trim();

      switch(this.obj_design.bln_split){
            case(true):
              this.obj_domStyle.gridTemplateColumns=s;              
            break;
            case(false):
              this.obj_domStyle.gridTemplateRows=s;
            break;
            default:              
      }      
      if(this.bln_debug){
        let s_debug;
        s_debug="fn_compileTemplate"  +"\n";        
        s_debug+="str_gridTemplateRows: " + this.obj_domStyle.gridTemplateRows  +"\n";
        s_debug+="str_gridTemplateColumns: " + this.obj_domStyle.gridTemplateColumns +"\n";
        //console.log(s_debug);        
      }      
    }
    
    fn_applyFeatures(){
      this.fn_compileTemplate();           
      super.fn_applyFeatures();      
    }    
    
}//END CLS
//END GRID
//END Component/Grid.js

/*id: 350//*/
/*type: Grid//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 360//*/
/*type: GridItem//*/
//START Component/GridItem.js
  class GridItem extends Component {
    constructor(obj_ini) {
      super(obj_ini); // call the super class constructor
    }  
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      //START INITIALIZE DESIGN
      this.obj_design.str_type="GridItem";
      this.obj_design.str_tag="GridItem";            
      if(this.obj_design.str_name==undefined){this.obj_design.str_name="My Grid Item";}      
      this.fn_setContainer(true);

      if(this.obj_design.str_minDim==undefined){this.obj_design.str_minDim="100px";}      
      if(this.obj_design.gridTemplate==undefined){this.fn_setGridTemplate(1);}            
      
      //END  INITIALIZE DESIGN

      //START INITIALIZE STYLE                    
      //END INITIALIZE STYLE        
    }  
    fn_initializePluginDesign(){
      this.obj_designDelegate=new DesignDelegateGridItem(this);                        
    }
    fn_setGridTemplate(int_val){
      this.obj_design.gridTemplate="minmax(" + this.obj_design.str_minDim + ", "+int_val+"fr)";
    }    
    fn_setDesignAttribute(str_name, foo_value){
      super.fn_setDesignAttribute(str_name, foo_value);      
      if(this.obj_holder.obj_container){
        this.obj_holder.obj_container.fn_applyFeatures();
      }
      
    }                        
    
    
}//END CLS
//END GridItem
//END Component/GridItem.js

/*id: 360//*/
/*type: GridItem//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 370//*/
/*type: Img//*/
//START Component/Img.js
class Img extends Component {
    constructor(obj_ini) {      
      super(obj_ini);        
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);    
      
      //START INITIALIZE DESIGN
      this.obj_design.str_type="Img";      
      this.obj_design.str_tag="Img";  
      //END INITIALIZE DESIGN
      
      //START INITIALIZE DOM
      //if(this.obj_domProperty.src===undefined){this.obj_domProperty.src="/firefoxlogo.png";}
      if(this.obj_domAttribute.src===undefined){this.obj_domAttribute.src="/firefoxlogo.png";}
      //END INITIALIZE DOM
      
      //START INITIALIZE STYLE      
      //if(this.obj_domStyle.overflow===undefined){this.obj_domStyle.overflow="hidden";}
      if(this.obj_domStyle.verticalAlign===undefined){this.obj_domStyle.verticalAlign="bottom";}//eazyStyle
      //END  INITIALIZE STYLE  

      this.fn_setContainer(false);
  }    
}//END CLS
//END IMG

//END Component/Img.js

/*id: 370//*/
/*type: Img//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 380//*/
/*type: Input//*/
//START Component/Input.js
class Input extends Component {
    constructor(obj_ini) {      
      super(obj_ini);
    }        
    fn_initialize(obj_ini){
      if(obj_ini.bln_debugx){this.bln_debugx=true;}
      super.fn_initialize(obj_ini);

      this.obj_design.str_type="Input";
      this.obj_design.str_tag="Input";

      
      this.fn_addDelegateType(obj_ini);
      
      this.str_value=obj_ini.str_value;
      if(this.str_value===undefined){this.str_value=undefined;} 

      this.obj_design.bln_listenChange=true;

      this.fn_setContainer(true);      
      
  }   
  fn_addDelegateType(obj_ini){

    let str_sub_type=obj_ini.str_subType.toUpperCase();
    const dict = new Map([
        ['TEXT', InputText],           
    ]);
    try {
      this.obj_holder.obj_type = new (dict.get(str_sub_type))(this);
    }
    catch(err) {                        
        console.log("ERROR INPUT SUBTYPE: " + str_sub_type);
        return;
    }
  }  
  fn_onLoad(){    
    super.fn_onLoad();
    this.obj_holder.obj_type.fn_onLoad();    
  }
  
  fn_change(){           
    super.fn_change();
    this.obj_holder.obj_type.fn_onChange();                
    
  }
  fn_applyTheme(){ 
    super.fn_applyTheme();
    this.obj_holder.obj_type.fn_applyTheme();     
  } 
  
}//END CLS
//END INPUT

//END Component/Input.js

/*id: 380//*/
/*type: Input//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 390//*/
/*type: InputAndButton//*/
//START Component/InputAndButton.js
class InputAndButton extends Component {
    constructor(obj_ini) {


        super(obj_ini); // call the super class constructor        

        
    }    
    fn_initialize(obj_ini){        
        
        super.fn_initialize(obj_ini);       
        

        this.obj_design.str_type="InputAndButton";
        this.obj_design.str_tag="InputAndButton";

        this.fn_setContainer(true);

        //START INITIALIZE DESIGN
        this.bln_isOpen=obj_ini.bln_isOpen;
        if(this.bln_isOpen===undefined){this.bln_isOpen=false}                                        

        //this.obj_design.bln_listenClick=true;
        //this.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "MenuButtonClick";  
        //this.obj_design.str_valueEventClick="fn_MenuButtonClick";          
        //END INITIALIZE DESIGN     
        
        //START INITIALIZE DOM                
        //END INITIALIZE DOM         
        
        //START INITIALIZE STYLE  
        if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="40px";}              
        if(this.obj_domStyle.padding===undefined){this.obj_domStyle.paddingLeft="12px";}            
        if(this.obj_domStyle.marginRight===undefined){this.obj_domStyle.marginRight="3px";}
        //END INITIALIZE STYLE
    }    

    fn_applyTheme(){        

        super.fn_applyTheme();
        this.fn_setStyleAttribute("backgroundColor", this.obj_theme.forgroundColor);          
        this.fn_setStyleAttribute("color", this.obj_theme.highlightColor);          
    }   
    
    fn_createChildren(){//only in boot/pallteItem phase

        let obj_ini, obj_input;
        let obj_row, obj_cell, obj_container;

        obj_container=this;       
        

        //ADD TEXT INPUT
        obj_ini=new Holder;
        obj_ini.obj_design.str_type="Input";
        obj_ini.str_subType="text";        
        obj_ini.str_value="";         
        //obj_ini.obj_design.str_IdValidator=this.obj_delegator.obj_design.str_id;            
        //obj_ini.obj_design.str_linkId=obj_arg.obj_item.obj_design.str_id;            
        //obj_ini.obj_design.str_nameEventChange="str_nameEventChange";//this will be added automaticall to dom        
        //obj_ini.obj_design.str_valueEventChange="str_valueEventChange";
        //obj_ini.obj_design.str_nameEventChange=this.obj_design.str_nameEventInputChange;//this will be added automaticall to dom        
        //obj_ini.obj_design.str_valueEventChange=this.obj_design.str_nameEventInputChange;        
        obj_ini.obj_domStyle.marginRight="3px";
        obj_ini.obj_design.bln_debugx=true;
        obj_input=obj_container.fn_addItem(obj_ini);                
        //END TEXT INPUT        

        //ADD BUTTON TO VALUE CELL
        obj_ini=new Holder;
        obj_ini.obj_design.str_type="Button";
        //obj_ini.obj_domProperty.innerText="Tag";                  
        obj_ini.obj_domProperty.innerText=this.obj_design.str_buttonText;                  
        
        obj_ini.obj_theme=this.obj_theme;
        obj_ini.obj_design.str_linkId=obj_input.obj_design.str_id;            
        obj_ini.obj_design.str_nameEventClick=this.obj_design.str_nameEventButtonClick;
        obj_ini.obj_design.str_valueEventClick=this.obj_design.str_valueEventButtonClick;
        obj_container.fn_addItem(obj_ini);      
        //ADD BUTTON TO VALUE CELL
    
    }
    
}//END CLS
//END MENUBUTTON

//END Component/InputAndButton.js

/*id: 390//*/
/*type: InputAndButton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 400//*/
/*type: InputText//*/
//START Component/InputText.js
class InputText extends Holder{
    constructor(obj_delegator) {                  
      super(obj_delegator); // call the super class constructor
      
      this.fn_initialize(obj_delegator);
    }    
    fn_initialize(obj_delegator){
      this.obj_delegator=obj_delegator;      

      this.obj_design.str_type="TEXT";
    }
    fn_onLoad(){
      this.obj_delegator.dom_obj.value=this.obj_delegator.str_value;
    }       
    fn_onChange(){      
      this.obj_delegator.str_value=this.obj_delegator.dom_obj.value;            
    }
    fn_applyTheme(){        
      
      this.obj_delegator.fn_setStyleAttribute("borderRadius", this.obj_delegator.obj_theme.borderRadius);          
      this.obj_delegator.fn_setStyleAttribute("backgroundColor", this.obj_delegator.obj_theme.forgroundColor);          
      this.obj_delegator.fn_setStyleAttribute("border", this.obj_delegator.obj_theme.forgroundColor);          
      this.obj_delegator.fn_setStyleAttribute("color", this.obj_delegator.obj_theme.highlightColor);          
      
    } 
}//END CLS
//END INPUTTEXT

//END Component/InputText.js

/*id: 400//*/
/*type: InputText//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 410//*/
/*type: MenuButton//*/
//START Component/Menubutton.js
class MenuButton extends Component {
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor        

        //alert("MenuButton");
    }    
    fn_initialize(obj_ini){        
        
        super.fn_initialize(obj_ini);

        this.obj_design.str_type="MenuButton";
        this.obj_design.str_tag="Button";

        this.fn_setContainer(true);

        //START INITIALIZE DESIGN
        this.bln_isOpen=obj_ini.bln_isOpen;
        if(this.bln_isOpen===undefined){this.bln_isOpen=false}                                        

        this.obj_design.bln_listenClick=true;
        this.obj_design.str_nameEventClick=obj_project.obj_design.str_prefix + "MenuButtonClick";  
        this.obj_design.str_valueEventClick="fn_MenuButtonClick";          
        //END INITIALIZE DESIGN     
        
        //START INITIALIZE DOM                
        if(this.obj_domProperty.innerText===undefined){this.obj_domProperty.innerText="My Menu Button"}        
        //END INITIALIZE DOM         
        
        //START INITIALIZE STYLE        
        if(this.obj_domStyle.flexWrap===undefined){this.obj_domStyle.flexWrap="wrap";}//no-wrap
    
        //*
        if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}//row
        if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="45px";}    
        if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="3px 12px";}
        if(this.obj_domStyle.border===undefined){this.obj_domStyle.border="0px solid black";}                          
        if(this.obj_domStyle.fontSize===undefined){this.obj_domStyle.fontSize="12pt";}
        //if(this.obj_domStyle.color===undefined){this.obj_domStyle .color="white";}
        if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="pointer";}
        if(this.obj_domStyle.marginBottom===undefined){this.obj_domStyle.marginBottom="3px";}      
        //*/  
            //END INITIALIZE STYLE
    }    

    fn_applyTheme(){        
        super.fn_applyTheme();
        //*
        
        this.fn_setStyleAttribute("backgroundColor", this.obj_theme.forgroundColor);          
        this.fn_setStyleAttribute("color", this.obj_theme.highlightColor);          
        //*/
    }   

    fn_click(){
        this.fn_event();                
    }


    fn_createSelf(){

        super.fn_createSelf();
        
        let dom_obj;
        dom_obj=document.createElement("DIV");        
        this.dom_obj.parentNode.insertBefore(dom_obj, this.dom_obj.nextSibling);                
        dom_obj.style.display="none";
        this.dom_objContentContainer=dom_obj;            

        dom_obj=document.createElement("Flex");
        dom_obj.style.display="flex";        
        dom_obj.style.padding="0px";        
        dom_obj.style.flexDirection=this.obj_domStyle.flexDirection;
        dom_obj.style.flexWrap=this.obj_domStyle.flexWrap;
        dom_obj.style.flexFlow=this.obj_domStyle.flexFlow;
        dom_obj.style.width="100%";
        dom_obj.innerHTML=this.obj_design.str_content;
        this.dom_objContent=dom_obj;
        this.dom_objContentContainer.append(dom_obj);        
    }    
    fn_addItem(obj_ini){
        let obj_item;        
        if(obj_ini.obj_design.str_type===undefined){
            obj_ini.obj_design.str_type="Button";                   
        }        
        obj_ini.obj_theme=this.fn_cloneObject(this.obj_theme);                                  
        obj_item=super.fn_addItem(obj_ini);      
        
        return obj_item;
    }
    fn_onLoad(){
        super.fn_onLoad();        
        if(this.bln_isOpen){
            this.fn_open();        
        }
    }    
    fn_openContainer(){//not currently in use, assumes container has this funciton
        this.obj_holder.obj_container.fn_open(this);
        
    }
    fn_open(){
        let style=this.dom_objContentContainer.style;
        style.display="block";
        this.bln_isOpen=true;
        //alert("fn_open: " + this.obj_domProperty.innerText);
    }
    fn_close(){               
        
        let style=this.dom_objContentContainer.style;
        style.display="none";
        this.bln_isOpen=false;        
        //alert("fn_close: " + this.obj_domProperty.innerText);
    }
    fn_toggle(){        
        if(this.bln_isOpen){this.fn_close();}
        else{this.fn_open();}
    } 
    
}//END CLS
//END MENUBUTTON

//END Component/Menubutton.js

/*id: 410//*/
/*type: MenuButton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 420//*/
/*type: NavElement//*/
//START Component/NavElement.js
class NavElement extends Component {
    constructor(obj_ini) {      
      super(obj_ini);
    }    
    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      //START INITIALIZE DESIGN
      this.obj_design.str_type="Div";
      this.obj_design.str_tag="Div";

      this.obj_design.bln_listenClick=true;
      //END INITIALIZE DESIGN
  
      //START INITIALIZE STYLE      
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="10px";}              
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="10px";}              
      if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="10px";}                  
      if(this.obj_domStyle.margin===undefined){this.obj_domStyle.margin="10px";}              
      if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="pointer";}      
      //END INITIALIZE STYLE  
    }     
    fn_applyTheme(){
      super.fn_applyTheme();
      this.fn_setStyleAttribute("backgroundColor", this.obj_theme.lolightColor);          
      this.fn_setStyleAttribute("color", this.obj_theme.lolightColor);       
      this.fn_setStyleAttribute("borderRadius", "0px");                   
  }   
  fn_setDisabled(){    
    super.fn_setDisabled();        
    this.fn_setStyleAttribute("backgroundColor", this.obj_theme.forgroundColor);          
    this.fn_setStyleAttribute("color", this.obj_theme.forgroundColor);                      
  }
  fn_setInvisible(){        
    super.fn_setInvisible();        
    this.fn_setStyleAttribute("backgroundColor", this.obj_theme.backgroundColor);
  }
  fn_click(){
    this.fn_event();                
  }
  
}//END CLS
//END BUTTON

//END Component/NavElement.js

/*id: 420//*/
/*type: NavElement//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 430//*/
/*type: Table//*/
//START Component/Table.js
class Table extends Component {
    constructor(obj_ini) {      
      super(obj_ini); // call the super class constructor        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      this.obj_design.str_type="Table";      
      this.obj_design.str_tag="Table";           
      
      //START INITIALIZE DOM        
      //if(this.obj_domProperty.className==undefined){this.obj_domProperty.className="clsXdesignTable";}             
      //END INITIALIZE DOM        
      this.fn_setContainer(true);      
    }       
    fn_addItem(obj_ini=false){
      let obj_item;        
      if(!obj_ini){
        obj_ini=new Holder;
        obj_ini.obj_design.str_type="TableRow";                   
      }      
      obj_item=super.fn_addItem(obj_ini);          
      return obj_item;
    }
    fn_setCellStyle(str_name, str_value){
      let arr, obj_item;
      arr=this.obj_design.arr_item;
      for(let i=0;i<arr.length;i++){
          obj_item=arr[i];              
          obj_item.fn_setCellStyle(str_name, str_value);            
      }
    }
    fn_locateItem(str_id, str_type){
      if(str_id===undefined){return;}
      if(str_id===""){return;}
      let arr, obj_item, obj_locate;
      arr=this.obj_design.arr_item;
      for(let i=0;i<arr.length;i++){
          obj_item=arr[i];              
          obj_locate=obj_item.fn_locateItem(str_id, str_type);            
          if(obj_locate){
            return obj_locate;
          }
      }
      return false;

    }
}//END CLS
//END IMG

//END Component/Table.js

/*id: 430//*/
/*type: Table//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 440//*/
/*type: TableRow//*/
//START Component/TableRow.js
class TableRow extends Component{
    constructor(obj_ini) {            
      super(obj_ini); // call the super class constructor                
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      this.obj_design.str_type="TableRow";      
      this.obj_design.str_tag="Tr";
      
      this.fn_setContainer(true);      
      
    }       
    fn_addItem(obj_ini){
      let obj_item;  

      if(obj_ini.obj_design.str_type===undefined){
        obj_ini.obj_design.str_type="TableCell";                         
      }
      obj_item=super.fn_addItem(obj_ini);          
      return obj_item;
    }
    fn_setCellStyle(str_name, str_value){

      let arr, obj_item;
      arr=this.obj_design.arr_item;
      for(let i=0;i<arr.length;i++){
          obj_item=arr[i];              
          obj_item.fn_setStyleAttribute(str_name, str_value);            
      }
    }
    fn_locateItem(str_id, str_type){
      let arr, obj_item, obj_locate;
      arr=this.obj_design.arr_item;
      for(let i=0;i<arr.length;i++){
          obj_item=arr[i];              
          obj_locate=obj_item.fn_locateItem(str_id, str_type);            
          if(obj_locate){
            return obj_locate;
          }
      }
      return false;
    }
}//END CLS


//END Component/TableRow.js

/*id: 440//*/
/*type: TableRow//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 450//*/
/*type: TableCell//*/
//START Component/TableCell.js
class TableCell extends Component {
    constructor(obj_ini) {      
      super(obj_ini); // call the super class constructor        
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      this.obj_design.str_type="TableCell";      
      this.obj_design.str_tag="Td";      

      //START INITIALIZE DOM        
      //if(this.obj_domStyle.border===undefined){this.obj_domStyle.border="1px solid black";}                
      //END INITIALIZE DOM        
      
      //START INITIALIZE STYLE        
      //if(this.obj_domStyle.padding==undefined){this.obj_domStyle.padding="10px";}                   
    
      this.fn_setContainer(true);      
      //END INITIALIZE STYLE 
    }     
    fn_applyTheme(){        
      
      super.fn_applyTheme();      
      this.fn_setStyleAttribute("backgroundColor", this.obj_theme.forgroundColor);          
      this.fn_setStyleAttribute("color", this.obj_theme.highlightColor);          
      this.fn_setStyleAttribute("border", this.obj_theme.cellBorder);                
      this.fn_setStyleAttribute("padding", this.obj_theme.cellPadding);                
  } 
  fn_locateItem(str_id, str_type){
    let arr, obj_item;
    arr=this.obj_design.arr_item;
    for(let i=0;i<arr.length;i++){
        obj_item=arr[i];     
        
        if(obj_item.fn_getType()===str_type){
          if(obj_item.obj_design.str_id==str_id){
            return obj_item;
          }
          if(obj_item.obj_design.str_linkId==str_id){
            return obj_item;
          }
        }
    }
    return false;
  }  
}//END CLS
//END TABLECELL

//END Component/TableCell.js

/*id: 450//*/
/*type: TableCell//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 460//*/
/*type: TableHeader//*/
//START Component/TableHeader.js
class TableHeader extends TableCell {
    constructor(obj_ini) {      
      super(obj_ini); // call the super class constructor        
    }  
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);      

      this.obj_design.str_type="TableHeader";      
      this.obj_design.str_tag="Th"; 
      
      this.fn_setContainer(true);      
    }
    fn_applyTheme(){        
      super.fn_applyTheme();
      
      this.fn_setStyleAttribute("backgroundColor", "");          
      this.fn_setStyleAttribute("border", "");                
      //this.fn_setStyleAttribute("backgroundColor", this.obj_theme.headingBackgroundColor);                
      this.fn_setStyleAttribute("color", this.obj_theme.headingTextColor);          
  } 
    
}//END CLS
//END Component/TableHeader.js

/*id: 460//*/
/*type: TableHeader//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 480//*/
/*type: Textarea//*/
//START Component/TextArea.js
class Textarea extends Component {
    constructor(obj_ini) {      
      super(obj_ini);        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);        

      this.obj_design.str_type="Textarea";            
      this.obj_design.str_tag="Textarea";      

      this.obj_design.bln_listenChange=true;
    }        
    fn_change(){                    
      obj_project.obj_projectEvent=this;             
      this.obj_design.str_content=this.dom_obj.value;                        
    }   
    fn_applyTheme(){ 
      super.fn_applyTheme();
      this.fn_setStyleAttribute("backgroundColor", this.obj_theme.forgroundColor);          

      let str_color=this.obj_theme.highlightColor;
      if(this.obj_domProperty.disabled){
        str_color="gray";
      }
      this.fn_setStyleAttribute("color", str_color); 
    }   
    fn_setDisabled(){
      super.fn_setDisabled();
      this.fn_setStyleAttribute("color", this.obj_theme.forgroundColor);                  
    }   
    
}//END CLS
//END TAG
//END Component/TextArea.js

/*id: 480//*/
/*type: Textarea//*/
/*END COMPONENT//*/



//START AUTO GENERATED COMPONENT MAP
const obj_ComponentMap = new Map([['Component', Component],['Tag', Tag],['Accordion', Accordion],['Button', Button],['Design', Design],['DesignFile', DesignFile],['Flex', Flex],['Grid', Grid],['GridItem', GridItem],['Img', Img],['Input', Input],['InputAndButton', InputAndButton],['InputText', InputText],['MenuButton', MenuButton],['NavElement', NavElement],['Table', Table],['TableRow', TableRow],['TableCell', TableCell],['TableHeader', TableHeader],['Textarea', Textarea]]);
//END AUTO GENERATED MAP




/*START COMPONENT//*/
/*id: 190//*/
/*type: TemplateCode//*/
//START Runtime/Project.js
class Project extends Design{
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor
        
        /*
        THe use of this wrapper function allows items to be called form database , rather than hard-written into the code.        
        //e.g it allows the use of a simple Main procedure "new wrapper" which is name agnostic.
        //*/
    }    
    fn_initialize(obj_ini){        
        super.fn_initialize(obj_ini);
        
        //START INITIALIZE DESIGN        
        if(this.obj_design.int_idRecord==undefined){this.obj_design.int_idRecord=0;}
        this.obj_design.str_prefix="xDesign_";

        if(this.obj_design.str_name==undefined){this.obj_design.str_name="My Project";}

        this.obj_holder.bln_isRoot=true;      
        this.fn_setContainer(true);
        
        this.fn_loadBootVariables();
        //END INITIALIZE DESIGN

        //START INITIALIZE DOM PROPERTY                
        //END INITIALIZE DOM PROPERTY

        //START INITIALIZE DOM ATTRIBUTE
        //END INITIALIZE DOM ATTRIBUTE
        
        //START INITIALIZE STYLE
        //END INITIALIZE STYLE

        //START INITIALIZE THEME        
        if(this.obj_theme.backgroundColor==undefined){this.obj_theme.backgroundColor="#2b2c34";}
        if(this.obj_theme.forgroundColor==undefined){this.obj_theme.forgroundColor="#414141";}        
        //if(this.obj_theme.forgroundColor==undefined){this.obj_theme.forgroundColor="green";}        
        if(this.obj_theme.highlightColor==undefined){this.obj_theme.highlightColor="white";}                
        if(this.obj_theme.borderRadius===undefined){this.obj_theme.borderRadius="4px";}
        if(this.obj_theme.fontFamily===undefined){this.obj_theme.fontFamily="Helvetica, Arial, sans-serif";}
        //as publish will never be saved we can move theme to holder
        //END INITIALIZE THEME
        
        //this.obj_design.bln_preventSave=true;//can this remain off here.
    }       
    fn_loadBootVariables(){
        let params;
        params = new URLSearchParams(location.search.toLowerCase());                
        let str_mode=params.get('mode');
        switch(str_mode){            
            case "edit":
                this.obj_design.int_modeExecute=this.obj_holder.int_modeEdit;                                
                break;         
            default:
                this.obj_design.int_modeExecute=this.obj_holder.int_modeRuntime;
        }                        
        
        let int_idRecord;        
        int_idRecord=this.obj_design.int_idRecord;
        this.obj_design.int_idRecord=parseInt(int_idRecord);

        /*
        alert("fn_loadBootVariables this.obj_design.int_idRecord: " + this.obj_design.int_idRecord);
        alert("fn_loadBootVariables this.obj_design.int_modeExecute: " + this.obj_design.int_modeExecute);
        //*/

    }

    
    
    
    fn_createSelf(){        
        this.fn_setTagOption();
        super.fn_createSelf();        
    }        
    
    fn_applyTheme(){//for the moment empty to prevent theme being uncessily applied, needs theme moved to obj_holder        
    }       
    fn_initializePluginDesign(){          
        this.obj_designDelegate=new DesignDelegateProjectInstance(this);          
        this.obj_designDelegate.fn_setup();                
    }  
    fn_applyTheme(){
        //this.fn_setBackgroundColor(this.obj_theme.backgroundColor, true);

        //apply theme to all child objects of type grid and griditem
        this.fn_setItemStyleAttribute("GRID", "backgroundColor", this.obj_theme.backgroundColor);
        this.fn_setItemStyleAttribute("GRIDITEM", "backgroundColor", this.obj_theme.forgroundColor);        
     } 
     fn_viewInBrowser(){
        let o=window.open("../../myProject/", "xDesignViewInBrowser");
        if(o){o.focus()}
    }   
    fn_setName(str_value){
        if(!str_value){return;}        
        this.obj_design.str_name=str_value;
        //this.fn_setTag(str_value);        
    }    
    fn_setType(str_value){           
        if(!str_value){return;}
        this.obj_design.str_type=str_value;//will change the required class name that the template class will extend        
    }    
    fn_setTag(str_value){           
        if(!str_value){return;}
        this.obj_design.str_tag=str_value;//wont have any material effect        
    }    
    fn_setBackgroundColor(str_val, bln_propogate){
        super.fn_setBackgroundColor(str_val, false);
    }
    fn_themeInstance(){

        super.fn_applyTheme();
        this.obj_theme.backgroundColor=obj_shared.fn_getRandomColor();
        this.obj_theme.forgroundColor=obj_shared.fn_getRandomColor();
        this.fn_applyTheme();
     }     
     //END Project Instance Functions

     fn_setTagOption(){

        /*COMPONENT TAG    
        //Following options for Project Wrapper:            
        1. Use No Tag
        1. Creating A Tag                 
        2. Use Exisitng Tag and Allow/DisAllow manipulation of this e.g flex, padding etc
        //*/
        
        //Create own publish tag 
        //If used, publish does create its own tag , which will prevent any ammendments being made to its  parent HTML        
        //POSITION SELF
        this.dom_obj = document.createElement(this.obj_design.str_tag);                          
        //APPLIES ONLY TO PUBLISH AS IT IS THE ONLY ITEM THAT IS NOT INSERTED VIA ADDITEM
        //now position element in parent Dom        
        let dom_container=this.fn_getDocumentTag();
        dom_container.append(this.dom_obj);             
        //POSITION SELF
        
        
    }    
    
    fn_getDocumentTag(){
        let dom_element;                
        if(this.obj_design.str_idDocumentTag!==undefined){
            dom_element=document.getElementById(this.obj_design.str_idDocumentTag);
        }        
        if(dom_element===undefined){
            dom_element=document.body;        
        }
        return dom_element;        
    }         
  }//END OF CLS

  /*START DESIGN BOOT VARIABLE//*/
obj_boot.obj_design.int_idRecord=69941; 
/*END DESIGN BOOT VARIABLE//*/


//END Runtime/Project.js

/*id: 190//*/
/*type: TemplateCode//*/
/*END COMPONENT//*/




/*START INSTANCE JSON MAP//*/
var obj_InstanceJSONMap = new Map([
[300, {}],
[301, {}],
[320, {}],
[325, {}],
[340, {}],
[350, {}],
[360, {}],
[370, {}],
[380, {}],
[390, {}],
[400, {}],
[410, {}],
[420, {}],
[430, {}],
[440, {}],
[450, {}],
[460, {}],
[480, {}],
[69913, {"obj_design":{"str_id":"designFile","str_variableName":"designFile","str_IdValidator":"ApplicationDesigner","str_name":"My Design File","str_type":"DesignFile","bln_hiddenPin":true,"bln_container":false,"str_tag":"DesignFile","str_content":"","arr_item":[],"bln_listenClick":true,"int_idRecord":"69913","bln_toggleProjectPin":false,"str_url_base":"\/xdesign\/Instance.php"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69914, {"obj_design":{"str_id":"flexPadIframe","str_variableName":"flexPadIframe","str_IdValidator":"ApplicationDesigner","str_type":"Tag","str_tag":"IFRAME","str_name":"My Design Iframe","bln_hiddenPin":true,"bln_container":false,"str_content":"","arr_item":[],"bln_listenClick":true,"int_idRecord":"69914","bln_toggleProjectPin":false},"obj_domProperty":{"name":"xdesign-target"},"obj_domAttribute":{"name":"xdesign-target"},"obj_domStyle":{"height":"100%","width":"100%"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69915, {"obj_design":{"str_id":"control-flex-pad","str_variableName":"flexPad","str_name":"flexPad","str_IdValidator":"ApplicationDesigner","str_type":"Flex","bln_hiddenPin":true,"bln_container":true,"str_tag":"Flex","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69914","str_tag":"IFRAME","bln_container":false,"str_id":"myId_01121057","str_type":"Tag","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69915","bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"padding":"0px","border":"10px outset grey","backgroundColor":"#2b2c34","display":"flex","flexWrap":"wrap","height":"100%","width":"100%","overflow":"auto"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69916, {"obj_design":{"str_id":"control-griditem-pad","str_variableName":"gridItemPad","str_name":"My Design GridItem Pad","str_IdValidator":"ApplicationDesigner","bln_split":true,"bln_hiddenPin":true,"str_type":"GridItem","bln_container":true,"str_tag":"GridItem","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69915","str_tag":"Flex","bln_container":true,"str_id":"myId_71182872","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(106,251,233)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69916","bln_toggleProjectPin":false,"str_minDim":"100px","gridTemplate":"minmax(100px, 1.75fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"#414141"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69917, {"obj_design":{"str_name":"Build Designer","str_nameEventClick":"xDesign_myDesignerButtonClick","str_valueEventClick":"fn_buildDesigner","bln_hiddenPin":true,"str_type":"Button","bln_container":false,"str_id":"myId_06277102","str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"int_idRecord":"69917","bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Build Designer"},"obj_domAttribute":{"innerText":"Build Designer"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"white","cursor":"pointer","marginRight":"3px","marginBottom":"3px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif","backgroundColor":"#414141"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69918, {"obj_design":{"str_name":"Navigate Start","str_nameEventClick":"xDesign_myDesignerButtonClick","str_valueEventClick":"fn_navigateDesignURL","bln_hiddenPin":true,"str_type":"Button","bln_container":false,"str_id":"myId_27127027","str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"int_idRecord":"69918","bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Navigate Start"},"obj_domAttribute":{"innerText":"Navigate Start"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"white","cursor":"pointer","marginRight":"3px","marginBottom":"3px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif","backgroundColor":"#414141"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69919, {"obj_design":{"str_name":"Navigate Boot","str_nameEventClick":"xDesign_myDesignerButtonClick","str_valueEventClick":"fn_navigateBootURL","bln_hiddenPin":true,"str_type":"Button","bln_container":false,"str_id":"myId_61172116","str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"int_idRecord":"69919","bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Navigate Boot"},"obj_domAttribute":{"innerText":"Navigate Boot"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"white","cursor":"pointer","marginRight":"3px","marginBottom":"3px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif","backgroundColor":"#414141"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69920, {"obj_design":{"str_name":"Save Designer","str_nameEventClick":"xDesign_myDesignerButtonClick","str_valueEventClick":"fn_save","bln_hiddenPin":true,"str_type":"Button","bln_container":false,"str_id":"myId_11767676","str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"int_idRecord":"69920","bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Save Designer"},"obj_domAttribute":{"innerText":"Save Designer"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"white","cursor":"pointer","marginRight":"3px","marginBottom":"3px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif","backgroundColor":"#414141"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69921, {"obj_design":{"str_id":"designer-menu-button","str_variableName":"designer-menu-button","str_IdValidator":"ApplicationDesigner","str_name":"Designer Menu Button","bln_hiddenPin":true,"str_type":"MenuButton","bln_container":true,"str_tag":"Button","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69917","str_tag":"Button","bln_container":false,"str_id":"myId_27884787","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69918","str_tag":"Button","bln_container":false,"str_id":"myId_86482678","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69919","str_tag":"Button","bln_container":false,"str_id":"myId_64824827","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69920","str_tag":"Button","bln_container":false,"str_id":"myId_40818268","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69921","bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"Designer"},"obj_domAttribute":{"innerText":"Designer"},"obj_domStyle":{"flexDirection":"row","flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif","backgroundColor":"#414141","color":"white"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"bln_isOpen":true,"dom_obj":{},"dom_objContent":{"data":""},"dom_objContentContainer":{}}],
[69922, {"obj_design":{"str_id":"project-menu-button","str_variableName":"project-menu-button","str_IdValidator":"ApplicationDesigner","str_name":"ProjectMenu Button","bln_toggleProjectPin":true,"bln_hiddenPin":true,"str_type":"MenuButton","bln_container":true,"str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"int_idRecord":"69922","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"Project"},"obj_domAttribute":{"innerText":"Project"},"obj_domStyle":{"flexDirection":"row","flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif","backgroundColor":"#414141","color":"white"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"bln_isOpen":false,"dom_obj":{},"dom_objContent":{},"dom_objContentContainer":{}}],
[69923, {"obj_design":{"str_id":"palette-menu-button","str_variableName":"palette-menu-button","str_IdValidator":"ApplicationDesigner","str_name":"PaletteMenu Button","bln_hiddenPin":true,"str_type":"MenuButton","bln_container":true,"str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"int_idRecord":"69923","bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"Palette"},"obj_domAttribute":{"innerText":"Palette"},"obj_domStyle":{"flexDirection":"row","flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif","backgroundColor":"#414141","color":"white"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"bln_isOpen":false,"dom_obj":{},"dom_objContent":{},"dom_objContentContainer":{}}],
[69924, {"obj_design":{"str_id":"messenger-menu-flex","str_type":"Flex","str_name":"messengerMenuFlex","str_content":"","bln_hiddenPin":true,"bln_container":true,"str_tag":"Flex","arr_item":[],"bln_listenClick":true,"int_idRecord":"69924","bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"green","flexDirection":"column","color":"#666666","display":"flex","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69925, {"obj_design":{"str_id":"messenger-menu-button","str_variableName":"messenger-menu-button","str_IdValidator":"ApplicationDesigner","str_name":"Messenger","bln_hiddenPin":true,"str_type":"MenuButton","bln_container":true,"str_tag":"Button","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69924","str_tag":"Flex","bln_container":true,"str_id":"myId_60489678","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(254,144,43)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69925","bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"Messenger"},"obj_domAttribute":{"innerText":"Messenger"},"obj_domStyle":{"flexDirection":"row","flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif","backgroundColor":"#414141","color":"white"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"bln_isOpen":false,"dom_obj":{},"dom_objContent":{},"dom_objContentContainer":{}}],
[69926, {"obj_design":{"str_id":"objectmap-menu-flex","str_type":"Flex","str_name":"objectmapMenuFlex","str_content":"","bln_hiddenPin":true,"bln_container":true,"str_tag":"Flex","arr_item":[],"bln_listenClick":true,"int_idRecord":"69926","bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"green","flexDirection":"column","color":"#666666","display":"flex","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69927, {"obj_design":{"str_id":"objectaction-menu-flex","str_type":"Flex","str_name":"objectactionMenuFlex","str_content":"","bln_hiddenPin":true,"bln_container":true,"str_tag":"Flex","arr_item":[],"bln_listenClick":true,"int_idRecord":"69927","bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"green","flexDirection":"column","color":"#666666","display":"flex","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69928, {"obj_design":{"str_id":"objectmap-menu-button","str_variableName":"objectmap-menu-button","str_IdValidator":"ApplicationDesigner","str_name":"Tag","bln_hiddenPin":true,"str_type":"MenuButton","bln_container":true,"str_tag":"Button","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69926","str_tag":"Flex","bln_container":true,"str_id":"myId_01910706","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(107,92,61)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69927","str_tag":"Flex","bln_container":true,"str_id":"myId_02704017","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(191,247,129)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69928","bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"Tag"},"obj_domAttribute":{"innerText":"Tag"},"obj_domStyle":{"flexDirection":"row","flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif","backgroundColor":"#414141","color":"white"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"bln_isOpen":false,"dom_obj":{},"dom_objContent":{},"dom_objContentContainer":{}}],
[69929, {"obj_design":{"str_id":"domproperty-menu-flex","str_type":"Flex","str_name":"dompropertyMenuFlex","str_content":"","bln_hiddenPin":true,"bln_container":true,"str_tag":"Flex","arr_item":[],"bln_listenClick":true,"int_idRecord":"69929","bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"green","flexDirection":"column","color":"#666666","display":"flex","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69930, {"obj_design":{"str_id":"domproperty-menu-button","str_variableName":"domproperty-menu-button","str_IdValidator":"ApplicationDesigner","str_name":"Property","bln_hiddenPin":true,"str_type":"MenuButton","bln_container":true,"str_tag":"Button","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69929","str_tag":"Flex","bln_container":true,"str_id":"myId_67149164","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(134,206,201)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69930","bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"Property"},"obj_domAttribute":{"innerText":"Property"},"obj_domStyle":{"flexDirection":"row","flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif","backgroundColor":"#414141","color":"white"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"bln_isOpen":false,"dom_obj":{},"dom_objContent":{},"dom_objContentContainer":{}}],
[69931, {"obj_design":{"str_id":"domattribute-menu-flex","str_type":"Flex","str_name":"domattributeMenuFlex","str_content":"","bln_hiddenPin":true,"bln_container":true,"str_tag":"Flex","arr_item":[],"bln_listenClick":true,"int_idRecord":"69931","bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"green","flexDirection":"column","color":"#666666","display":"flex","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69932, {"obj_design":{"str_id":"domattribute-menu-button","str_variableName":"domattribute-menu-button","str_IdValidator":"ApplicationDesigner","str_name":"Attribute","bln_hiddenPin":true,"str_type":"MenuButton","bln_container":true,"str_tag":"Button","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69931","str_tag":"Flex","bln_container":true,"str_id":"myId_21111876","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(17,158,105)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69932","bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"Attribute"},"obj_domAttribute":{"innerText":"Attribute"},"obj_domStyle":{"flexDirection":"row","flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif","backgroundColor":"#414141","color":"white"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"bln_isOpen":false,"dom_obj":{},"dom_objContent":{},"dom_objContentContainer":{}}],
[69933, {"obj_design":{"str_id":"styleproperty-menu-flex","str_type":"Flex","str_name":"stylepropertyMenuFlex","str_content":"","bln_hiddenPin":true,"bln_container":true,"str_tag":"Flex","arr_item":[],"bln_listenClick":true,"int_idRecord":"69933","bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"green","flexDirection":"column","color":"#666666","display":"flex","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69934, {"obj_design":{"str_id":"styleproperty-menu-button","str_variableName":"styleproperty-menu-button","str_IdValidator":"ApplicationDesigner","str_name":"Style","bln_hiddenPin":true,"str_type":"MenuButton","bln_container":true,"str_tag":"Button","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69933","str_tag":"Flex","bln_container":true,"str_id":"myId_17679107","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(81,192,116)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69934","bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"Style"},"obj_domAttribute":{"innerText":"Style"},"obj_domStyle":{"flexDirection":"row","flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif","backgroundColor":"#414141","color":"white"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"bln_isOpen":false,"dom_obj":{},"dom_objContent":{},"dom_objContentContainer":{}}],
[69935, {"obj_design":{"str_id":"designproperty-menu-flex","str_type":"Flex","str_name":"designpropertyMenuFlex","str_content":"","bln_hiddenPin":true,"bln_container":true,"str_tag":"Flex","arr_item":[],"bln_listenClick":true,"int_idRecord":"69935","bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"green","flexDirection":"column","color":"#666666","display":"flex","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69936, {"obj_design":{"str_id":"designproperty-menu-button","str_variableName":"designproperty-menu-button","str_IdValidator":"ApplicationDesigner","str_name":"Design","bln_hiddenPin":true,"str_type":"MenuButton","bln_container":true,"str_tag":"Button","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69935","str_tag":"Flex","bln_container":true,"str_id":"myId_77197121","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(29,231,188)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69936","bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"Design"},"obj_domAttribute":{"innerText":"Design"},"obj_domStyle":{"flexDirection":"row","flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif","backgroundColor":"#414141","color":"white"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"bln_isOpen":false,"dom_obj":{},"dom_objContent":{},"dom_objContentContainer":{}}],
[69937, {"obj_design":{"str_variableName":"designer-menu","str_name":"My Designer Menu","str_type":"Accordion","bln_hiddenPin":true,"bln_container":false,"str_id":"myId_46026326","str_tag":"Accordion","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69921","str_tag":"Button","bln_container":true,"str_id":"myId_31714001","str_type":"MenuButton","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"My Menu Button"},"obj_domAttribute":{},"obj_domStyle":{"flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"bln_isOpen":false},{"obj_design":{"int_idRecord":"69922","str_tag":"Button","bln_container":true,"str_id":"myId_14327901","str_type":"MenuButton","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"My Menu Button"},"obj_domAttribute":{},"obj_domStyle":{"flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"bln_isOpen":false},{"obj_design":{"int_idRecord":"69923","str_tag":"Button","bln_container":true,"str_id":"myId_41210319","str_type":"MenuButton","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"My Menu Button"},"obj_domAttribute":{},"obj_domStyle":{"flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"bln_isOpen":false},{"obj_design":{"int_idRecord":"69925","str_tag":"Button","bln_container":true,"str_id":"myId_71101267","str_type":"MenuButton","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"My Menu Button"},"obj_domAttribute":{},"obj_domStyle":{"flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"bln_isOpen":false},{"obj_design":{"int_idRecord":"69928","str_tag":"Button","bln_container":true,"str_id":"myId_11927011","str_type":"MenuButton","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"My Menu Button"},"obj_domAttribute":{},"obj_domStyle":{"flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"bln_isOpen":false},{"obj_design":{"int_idRecord":"69930","str_tag":"Button","bln_container":true,"str_id":"myId_41032170","str_type":"MenuButton","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"My Menu Button"},"obj_domAttribute":{},"obj_domStyle":{"flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"bln_isOpen":false},{"obj_design":{"int_idRecord":"69932","str_tag":"Button","bln_container":true,"str_id":"myId_24301072","str_type":"MenuButton","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"My Menu Button"},"obj_domAttribute":{},"obj_domStyle":{"flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"bln_isOpen":false},{"obj_design":{"int_idRecord":"69934","str_tag":"Button","bln_container":true,"str_id":"myId_60117901","str_type":"MenuButton","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"My Menu Button"},"obj_domAttribute":{},"obj_domStyle":{"flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"bln_isOpen":false},{"obj_design":{"int_idRecord":"69936","str_tag":"Button","bln_container":true,"str_id":"myId_10271011","str_type":"MenuButton","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"innerText":"My Menu Button"},"obj_domAttribute":{},"obj_domStyle":{"flexWrap":"wrap","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","fontSize":"12pt","cursor":"pointer","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"bln_isOpen":false}],"bln_listenClick":true,"int_idRecord":"69937","bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"width":"100%","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{"data":""}}],
[69938, {"obj_design":{"str_id":"control-flex-panel","str_variableName":"flexControlPanel","str_name":"flexControlPanel","str_IdValidator":"ApplicationDesigner","str_type":"Flex","bln_hiddenPin":true,"bln_container":true,"str_tag":"Flex","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69937","str_tag":"Accordion","bln_container":false,"str_id":"myId_16731722","str_name":"My Accordion","str_type":"Accordion","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"width":"100%"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69938","bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"#2b2c34","display":"flex","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69939, {"obj_design":{"str_id":"control-griditem-panel","str_variableName":"gridItemPanel","str_name":"My Design GridItem Panel","str_IdValidator":"ApplicationDesigner","bln_split":true,"bln_hiddenPin":true,"str_type":"GridItem","bln_container":true,"str_tag":"GridItem","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69938","str_tag":"Flex","bln_container":true,"str_id":"myId_99074297","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(122,140,182)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69939","bln_toggleProjectPin":false,"str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"#414141"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69940, {"obj_design":{"str_id":"control-grid-main","str_variableName":"gridMain","str_name":"My Design Grid Main","str_IdValidator":"ApplicationDesigner","str_type":"Grid","bln_split":true,"str_gridTemplateDefault":"minmax(800px, 1fr)","bln_hiddenPin":true,"bln_eazygrid":false,"bln_container":true,"str_tag":"Grid","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69916","str_tag":"GridItem","bln_container":true,"str_id":"myId_99667777","str_name":"My Grid Item","str_type":"GridItem","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69939","str_tag":"GridItem","bln_container":true,"str_id":"myId_26041617","str_name":"My Grid Item","str_type":"GridItem","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69940","bln_toggleProjectPin":false,"str_minDim":"100px"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"grid","height":"100%","width":"100%","padding":"0px","gridGap":"10px","gridAutoRows":"minmax(800px, 1fr)","gridAutoColumns":"minmax(800px, 1fr)","gridTemplateRows":"minmax(800px, 1fr)","gridTemplateColumns":"minmax(100px, 1.75fr) minmax(100px, 1fr)","overflow":"hidden","backgroundColor":"#2b2c34"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69941, {"obj_design":{"int_idRecord":"69941","bln_container":true,"str_id":"ApplicationDesigner","str_name":"My Designer","str_type":"Design","str_tag":"Design","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69913","str_tag":"DesignFile","bln_container":false,"str_id":"myId_46177774","str_name":"My Design File","str_type":"DesignFile","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":true,"bln_toggleProjectPin":false,"str_url_base":"\/xdesign\/Instance.php"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69940","str_tag":"Grid","bln_container":true,"str_id":"myId_61241276","str_type":"Grid","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"bln_split":false,"bln_eazygrid":true,"str_minDim":"100px","str_gridTemplateDefault":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"grid","height":"100%","width":"100%","padding":"0px","gridGap":"10px","gridAutoRows":"minmax(100px, 1fr)","gridAutoColumns":"minmax(100px, 1fr)","gridTemplateRows":"minmax(100px, 1fr)","gridTemplateColumns":"minmax(100px, 1fr)","overflow":"hidden"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_listenChange":true,"bln_hiddenPin":true,"bln_toggleProjectPin":false,"bln_preventSave":true,"DesignerMenuName":"My Designer Menu","ProjectMenuName":"My Project Menu","PaletteMenuName":"My Palette Menu","DataName":"My Design Data","FileName":"My Design File","str_prefix":"xDesign_","bln_projectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","lolightColor":"gray","highlightColor":"white","headingBackgroundColor":"white","headingTextColor":"#414141","cellBorder":"1px solid gray","cellPadding":"10px","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{},"obj_projectEvent":{"obj_design":{"int_idRecord":"69920","str_tag":"Button","bln_container":false,"str_id":"myId_69719742","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true}}],
[69942, {"obj_design":{"str_type":"Button","str_name":"My Button","int_idRecord":"69942","bln_container":false,"str_id":"myId_51553165","str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button","innertext":"Button XYZ"},"obj_domAttribute":{"innerText":"Button","innertext":"Button XYZ"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69943, {"obj_design":{"str_type":"Flex","str_name":"My Flex","int_idRecord":"69943","bln_container":true,"str_id":"myId_73617799","str_tag":"Flex","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69942","str_tag":"Button","bln_container":false,"str_id":"myId_37988777","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69947","str_tag":"Component","bln_container":false,"str_id":"myId_17700772","str_type":"Component","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69950","str_tag":"Button","bln_container":false,"str_id":"myId_02961161","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69951","str_tag":"Button","bln_container":false,"str_id":"myId_67977777","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69952","str_tag":"Button","bln_container":false,"str_id":"myId_12026276","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69953","str_tag":"Button","bln_container":false,"str_id":"myId_32776677","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69954","str_tag":"Button","bln_container":false,"str_id":"myId_67971727","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69955","str_tag":"Button","bln_container":false,"str_id":"myId_77012771","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69956","str_tag":"Button","bln_container":false,"str_id":"myId_07713361","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(228,114,53)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69944, {"obj_design":{"int_idRecord":"69944","bln_container":true,"str_id":"myId_11231619","str_name":"My Project A","str_type":"Component","str_tag":"Component","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69943","str_tag":"Flex","bln_container":true,"str_id":"myId_47902296","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(239,246,240)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_prefix":"xDesign_","bln_projectPin":true,"bln_palettePin":"1"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","highlightColor":"white","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69945, {"obj_design":{"str_type":"Button","str_name":"My Button","int_idRecord":"69945","bln_container":false,"str_id":"myId_15223712","str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button","innertext":"Button ABC"},"obj_domAttribute":{"innerText":"Button","innertext":"Button ABC"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69946, {"obj_design":{"str_type":"Flex","str_name":"My Flex","int_idRecord":"69946","bln_container":true,"str_id":"myId_21275566","str_tag":"Flex","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69945","str_tag":"Button","bln_container":false,"str_id":"myId_92929699","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(253,102,161)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69947, {"obj_design":{"int_idRecord":"69947","bln_container":false,"str_id":"myId_16737361","str_name":"My Project B","str_type":"Component","str_tag":"Component","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69946","str_tag":"Flex","bln_container":true,"str_id":"myId_04179789","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(126,224,193)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_prefix":"xDesign_","bln_projectPin":true,"bln_palettePin":"1"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","highlightColor":"white","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69949, {"obj_design":{"int_idRecord":69949,"bln_container":true,"str_id":"myId_11231619","str_name":"My Project Combo","str_type":"Component","str_tag":"Component","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69943","str_tag":"Flex","bln_container":true,"str_id":"myId_11711227","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(142,231,90)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69947","str_tag":"Component","bln_container":false,"str_id":"myId_12721627","str_type":"Component","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69947","str_tag":"Component","bln_container":false,"str_id":"myId_69962124","str_type":"Component","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69947","str_tag":"Component","bln_container":false,"str_id":"myId_68272272","str_type":"Component","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69947","str_tag":"Component","bln_container":false,"str_id":"myId_01721817","str_type":"Component","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69947","str_tag":"Component","bln_container":false,"str_id":"myId_74402618","str_type":"Component","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69947","str_tag":"Component","bln_container":false,"str_id":"myId_11745061","str_type":"Component","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69947","str_tag":"Component","bln_container":false,"str_id":"myId_44216252","str_type":"Component","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69947","str_tag":"Component","bln_container":false,"str_id":"myId_11177772","str_type":"Component","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69947","str_tag":"Component","bln_container":false,"str_id":"myId_61251026","str_type":"Component","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_prefix":"xDesign_","bln_projectPin":true,"bln_palettePin":"1"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","highlightColor":"white","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69957, {"obj_design":{"str_type":"Flex","str_name":"My Flex","int_idRecord":"69957","bln_container":true,"str_id":"myId_11711515","str_tag":"Flex","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69968","str_tag":"Component","bln_container":false,"str_id":"myId_81244776","str_type":"Component","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(121,29,30)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69958, {"obj_design":{"str_type":"GridItem","bln_container":true,"str_id":"myId_31571776","str_name":"My Grid Item","str_tag":"GridItem","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69957","str_tag":"Flex","bln_container":true,"str_id":"myId_27227132","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(54,190,45)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69958","bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"#414141"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69959, {"obj_design":{"str_type":"Flex","str_name":"My Flex","int_idRecord":"69959","bln_container":true,"str_id":"myId_15616117","str_tag":"Flex","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69968","str_tag":"Component","bln_container":false,"str_id":"myId_76472672","str_type":"Component","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(180,122,204)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69960, {"obj_design":{"str_type":"GridItem","bln_container":true,"str_id":"myId_67414136","str_name":"My Grid Item","str_tag":"GridItem","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69959","str_tag":"Flex","bln_container":true,"str_id":"myId_61761714","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(44,177,38)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69960","bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"#414141"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69961, {"obj_design":{"str_type":"Grid","str_name":"My Grid","int_idRecord":"69961","bln_container":true,"str_id":"myId_12171157","str_tag":"Grid","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69958","str_tag":"GridItem","bln_container":true,"str_id":"myId_17461772","str_name":"My Grid Item","str_type":"GridItem","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69960","str_tag":"GridItem","bln_container":true,"str_id":"myId_72277407","str_name":"My Grid Item","str_type":"GridItem","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"bln_split":false,"bln_eazygrid":true,"str_minDim":"100px","str_gridTemplateDefault":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"grid","height":"100%","width":"100%","padding":"0px","gridGap":"10px","gridAutoRows":"minmax(100px, 1fr)","gridAutoColumns":"minmax(100px, 1fr)","gridTemplateRows":"minmax(100px, 1fr) minmax(100px, 1fr)","gridTemplateColumns":"minmax(100px, 1fr)","overflow":"hidden","backgroundColor":"#2b2c34"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69962, {"obj_design":{"int_idRecord":69962,"bln_container":true,"str_id":"myId_77671261","str_name":"My GRID A","str_type":"Component","str_tag":"Component","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69961","str_tag":"Grid","bln_container":true,"str_id":"myId_72776721","str_type":"Grid","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"bln_split":false,"bln_eazygrid":true,"str_minDim":"100px","str_gridTemplateDefault":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"grid","height":"100%","width":"100%","padding":"0px","gridGap":"10px","gridAutoRows":"minmax(100px, 1fr)","gridAutoColumns":"minmax(100px, 1fr)","gridTemplateRows":"minmax(100px, 1fr)","gridTemplateColumns":"minmax(100px, 1fr)","overflow":"hidden"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_prefix":"xDesign_","bln_projectPin":true,"bln_palettePin":"1"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","highlightColor":"white","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69963, {"obj_design":{"str_type":"Flex","str_name":"My Flex","int_idRecord":"69963","bln_container":true,"str_id":"myId_77161796","str_tag":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(23,246,175)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69964, {"obj_design":{"str_type":"GridItem","bln_container":true,"str_id":"myId_77116797","str_name":"My Grid Item","str_tag":"GridItem","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69963","str_tag":"Flex","bln_container":true,"str_id":"myId_11711777","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(238,27,247)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69964","bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"#414141"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69965, {"obj_design":{"str_type":"Flex","str_name":"My Flex","int_idRecord":"69965","bln_container":true,"str_id":"myId_07111161","str_tag":"Flex","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69969","str_tag":"Button","bln_container":false,"str_id":"myId_51060700","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69970","str_tag":"Button","bln_container":false,"str_id":"myId_71411035","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69971","str_tag":"Button","bln_container":false,"str_id":"myId_74647060","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69972","str_tag":"Button","bln_container":false,"str_id":"myId_61777214","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69973","str_tag":"Button","bln_container":false,"str_id":"myId_74242004","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69974","str_tag":"Button","bln_container":false,"str_id":"myId_27741247","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69975","str_tag":"Button","bln_container":false,"str_id":"myId_73671214","str_type":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(177,62,227)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69966, {"obj_design":{"str_type":"GridItem","bln_container":true,"str_id":"myId_67777717","str_name":"My Grid Item","str_tag":"GridItem","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69965","str_tag":"Flex","bln_container":true,"str_id":"myId_79719282","str_type":"Flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(207,5,238)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"int_idRecord":"69966","bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"backgroundColor":"#414141"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69967, {"obj_design":{"str_type":"Grid","str_name":"My Grid","int_idRecord":"69967","bln_container":true,"str_id":"myId_27722721","str_tag":"Grid","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69964","str_tag":"GridItem","bln_container":true,"str_id":"myId_77626828","str_name":"My Grid Item","str_type":"GridItem","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true},{"obj_design":{"int_idRecord":"69966","str_tag":"GridItem","bln_container":true,"str_id":"myId_72878176","str_name":"My Grid Item","str_type":"GridItem","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"bln_split":false,"bln_eazygrid":true,"str_minDim":"100px","str_gridTemplateDefault":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"grid","height":"100%","width":"100%","padding":"0px","gridGap":"10px","gridAutoRows":"minmax(100px, 1fr)","gridAutoColumns":"minmax(100px, 1fr)","gridTemplateRows":"minmax(100px, 1fr) minmax(100px, 1fr)","gridTemplateColumns":"minmax(100px, 1fr)","overflow":"hidden","backgroundColor":"#2b2c34"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69968, {"obj_design":{"int_idRecord":"69968","bln_container":true,"str_id":"myId_67149911","str_name":"My GRID B","str_type":"Component","str_tag":"Component","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"69967","str_tag":"Grid","bln_container":true,"str_id":"myId_22788712","str_type":"Grid","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"bln_split":false,"bln_eazygrid":true,"str_minDim":"100px","str_gridTemplateDefault":"minmax(100px, 1fr)"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"grid","height":"100%","width":"100%","padding":"0px","gridGap":"10px","gridAutoRows":"minmax(100px, 1fr)","gridAutoColumns":"minmax(100px, 1fr)","gridTemplateRows":"minmax(100px, 1fr)","gridTemplateColumns":"minmax(100px, 1fr)","overflow":"hidden"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false,"str_prefix":"xDesign_","bln_projectPin":true,"bln_palettePin":"1"},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","highlightColor":"white","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}],
[69969, {"obj_design":{"str_type":"Button","str_name":"My Button","int_idRecord":"69969","bln_container":false,"str_id":"myId_92773777","str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{"innerText":"Button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69970, {"obj_design":{"str_type":"Button","str_name":"My Button","int_idRecord":"69970","bln_container":false,"str_id":"myId_78129989","str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{"innerText":"Button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69971, {"obj_design":{"str_type":"Button","str_name":"My Button","int_idRecord":"69971","bln_container":false,"str_id":"myId_32429884","str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{"innerText":"Button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69972, {"obj_design":{"str_type":"Button","str_name":"My Button","int_idRecord":"69972","bln_container":false,"str_id":"myId_17631639","str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{"innerText":"Button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69973, {"obj_design":{"str_type":"Button","str_name":"My Button","int_idRecord":"69973","bln_container":false,"str_id":"myId_86713664","str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{"innerText":"Button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69974, {"obj_design":{"str_type":"Button","str_name":"My Button","int_idRecord":"69974","bln_container":false,"str_id":"myId_37053160","str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{"innerText":"Button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[69975, {"obj_design":{"str_type":"Button","str_name":"My Button","int_idRecord":"69975","bln_container":false,"str_id":"myId_60271151","str_tag":"Button","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{"innerText":"Button"},"obj_domAttribute":{"innerText":"Button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","marginRight":"3px","marginBottom":"3px"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}]
]);
/*END INSTANCE JSON MAP//*/


