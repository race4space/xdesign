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