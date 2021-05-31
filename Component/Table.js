class Table extends Component {
    constructor(obj_ini) {      
      super(obj_ini); // call the super class constructor        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      this.obj_design.str_type="Table";      
      this.obj_design.str_tag="Table";           
      
      //START INITIALIZE DOM        
      //if(this.obj_domProperty.className==undefined){this.obj_domProperty.className="clsXdesignTable";}             
      //END INITIALIZE DOM        
      this.fn_setContainer(true);      
    }       
    fn_addItem(obj_ini=false){
      let obj_item;        
      if(!obj_ini){
        obj_ini=new Holder;
        obj_ini.obj_design.str_type="TableRow";                   
      }      
      obj_item=super.fn_addItem(obj_ini);          
      return obj_item;
    }
    fn_setCellStyle(str_name, str_value){
      let arr, obj_item;
      arr=this.obj_design.arr_item;
      for(let i=0;i<arr.length;i++){
          obj_item=arr[i];              
          obj_item.fn_setCellStyle(str_name, str_value);            
      }
    }
    fn_locateItem(str_id, str_type){
      if(str_id===undefined){return;}
      if(str_id===""){return;}
      let arr, obj_item, obj_locate;
      arr=this.obj_design.arr_item;
      for(let i=0;i<arr.length;i++){
          obj_item=arr[i];              
          obj_locate=obj_item.fn_locateItem(str_id, str_type);            
          if(obj_locate){
            return obj_locate;
          }
      }
      return false;

    }
}//END CLS
//END IMG
