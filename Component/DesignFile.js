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