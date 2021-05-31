class Project extends {str_nameTargetClass}{
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
obj_boot.obj_design.int_idRecord={int_idRecord}; 
/*END DESIGN BOOT VARIABLE//*/

