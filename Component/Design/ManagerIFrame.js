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
        str_path="http://lokal-mycode.buzz/xdesign-projects/MyProject/index.html?mode=edit";           
        //this.obj_delegator.obj_holder.obj_flexPadIframe.fn_setDomAttribute("src", str_path);        
        //*/
        
      //*/
    }
    fn_navigateRecord(){      
      let obj_glass=this.obj_delegator.fn_getGlass();
      obj_glass.location.href="http://lokal-mycode.buzz/xdesign-projects/MyProject/index.html?mode=edit";
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
