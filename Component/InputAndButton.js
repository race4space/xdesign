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
