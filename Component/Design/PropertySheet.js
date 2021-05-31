
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