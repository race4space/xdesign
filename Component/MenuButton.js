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
