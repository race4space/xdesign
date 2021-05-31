class DesignDelegateProjectInstance extends DesignDelegate{
    constructor(obj_delegator) {                  
        super(obj_delegator); // call the super class constructor          

        if(window.parent){            
            window.parent.obj_project.fn_component_onLoad();//notify parent design component 
        }
    }            
    fn_initialize(obj_delegator){
        super.fn_initialize(obj_delegator);        
        

        if(this.obj_delegator.obj_design.bln_projectPin==undefined){this.obj_delegator.obj_design.bln_projectPin=true;}
        if(this.obj_delegator.obj_design.bln_palettePin==undefined){this.obj_delegator.obj_design.bln_palettePin=false;}        
        
    }      
    fn_onPaletteItemClickCapture(){//event capture        
        obj_projectParent.obj_palettSelectedLast=obj_projectParent.obj_palettSelected;        

        //this refers to obj_delegator.obj_designDelegate
        this.fn_deSelectPaletteItems();//deselect all children starting from base
    }
    fn_destructDesignComponent(){

        //this refers to obj_delegator.obj_designDelegate
        this.fn_deSelectPaletteItems();
        alert("should not be occurring ");        
        //should be handled by iframe reload
    }  
    
    
}//END CLS