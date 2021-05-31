  class Flex extends Component {
    constructor(obj_ini) {
      super(obj_ini); // call the super class constructor
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      //START INITIALIZE DESIGN
      this.obj_design.str_type="Flex";
      this.obj_design.str_tag="Flex";      
      this.fn_setContainer(true);
      //END INITIALIZE DESIGN

      //START INITIALIZE STYLE
      this.obj_domStyle.display="flex";      
      if(this.obj_domStyle.backgroundColor===undefined){this.obj_domStyle.backgroundColor=obj_shared.fn_getRandomColor();}//no-wrap      
      if(this.obj_domStyle.flexWrap===undefined){this.obj_domStyle.flexWrap="wrap";}//no-wrap      
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="100%";}
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}
      if(this.obj_domStyle.padding==undefined){this.obj_domStyle.padding="10px";}       
      if(this.obj_domStyle.overflow==undefined){this.obj_domStyle.overflow="auto";}             
      //END INITIALIZE STYLE      
    }

}//END CLS
//END FLEX
