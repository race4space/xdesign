class ManagerFile extends Holder{
      constructor(obj_delegator) {
        super(obj_delegator); // call the super class constructor

      this.fn_initialize(obj_delegator);
    }
    fn_initialize(obj_delegator){

      this.obj_delegator=obj_delegator;
    }
    fn_execute(obj_container){//can run only on boot, called by boot build
    }

  //START PALETT COMPONENTS  
  //END PALETT COMPONENTS

  //START PALETT SPECIFIC EVENT
  
  fn_onComponentReady(){        
    //alert("Manager File fn_onComponentReady");
  }  
}//END CLS
//END PALETTE
