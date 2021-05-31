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
