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