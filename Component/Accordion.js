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