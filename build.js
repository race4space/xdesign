const concat = require('concat');
var outputFile;
var arr_file;

const  filename_xdesign="xdesign.js";
const filename_runtime="filename_runtime.js";
const filename_component_design_map="filename_component_design_map.js";

const filename_designtime="filename_designtime.js";
const filename_template="filename_template.js";

     
//Palette Components      
const filename_component_component="filename_component_component.js";      
const filename_component_tag="filename_component_tag.js";      
const filename_component_ajax="filename_component_ajax.js";      
const filename_component_accordion="filename_component_accordion.js";      
const filename_component_button="filename_component_button.js";      
const filename_component_comment="filename_component_comment.js";      
const filename_component_design="filename_component_design.js";
const filename_component_designfile="filename_component_designfile.js";
const filename_component_flex="filename_component_flex.js";      
const filename_component_grid="filename_component_grid.js";            
const filename_component_griditem="filename_component_griditem.js";                  
const filename_component_img="filename_component_img.js";                  
const filename_component_input="filename_component_input.js";                  
const filename_component_inputandbutton="filename_component_inputandbutton.js";                  
const filename_component_inputtext="filename_component_inputtext.js";                        
const filename_component_menubutton="filename_component_menubutton.js";                  
const filename_component_navelement="filename_component_navelement.js";                        
const filename_component_table="filename_component_table.js";                  
const filename_component_tablerow="filename_component_tablerow.js";                  
const filename_component_tablecell="filename_component_tablecell.js";                        
const filename_component_tableheader="filename_component_tableheader.js";      
const filename_component_textarea="filename_component_textarea.js";                  
const filename_component_textnode="filename_component_textnode.js";                        
//Palette Components
     

arr_file=[

  //RunTime must be at the top of the file    
  "Runtime/Shared.js",
  "Runtime/LevelObject.js",
  "Runtime/Holder.js",  
  "Runtime/BaseObject.js",      
  
  "Runtime/Debug.js",  
  "Runtime/myJSON.js",    
  "Runtime/Main.js"    
  //RunTime must be at the top of the file
  
];
concat(arr_file, filename_runtime);

arr_file=["Component/Component.js"];concat(arr_file, filename_component_component);
arr_file=["Component/Tag.js"];concat(arr_file, filename_component_tag);
arr_file=["Component/AJAX.js"];concat(arr_file, filename_component_ajax);
arr_file=["Component/Accordion.js"];concat(arr_file, filename_component_accordion);
arr_file=["Component/Button.js"];concat(arr_file, filename_component_button);
arr_file=["Component/Comment.js"];concat(arr_file, filename_component_comment);
arr_file=["Component/DesignFile.js"];concat(arr_file, filename_component_designfile);
arr_file=["Component/Flex.js"];concat(arr_file, filename_component_flex);
arr_file=["Component/Grid.js"];concat(arr_file, filename_component_grid);
arr_file=["Component/GridItem.js"];concat(arr_file, filename_component_griditem);
arr_file=["Component/Img.js"];concat(arr_file, filename_component_img);
arr_file=["Component/Input.js"];concat(arr_file, filename_component_input);
arr_file=["Component/InputAndButton.js"];concat(arr_file, filename_component_inputandbutton);
arr_file=["Component/InputText.js"];concat(arr_file, filename_component_inputtext);
arr_file=["Component/Menubutton.js"];concat(arr_file, filename_component_menubutton);
arr_file=["Component/NavElement.js"];concat(arr_file, filename_component_navelement);
arr_file=["Component/Table.js"];concat(arr_file, filename_component_table);
arr_file=["Component/TableRow.js"];concat(arr_file, filename_component_tablerow);
arr_file=["Component/TableCell.js"];concat(arr_file, filename_component_tablecell);      
arr_file=["Component/TableHeader.js"];concat(arr_file, filename_component_tableheader);      
arr_file=["Component/Textarea.js"];concat(arr_file, filename_component_textarea);
arr_file=["Component/TextNode.js"];concat(arr_file, filename_component_textnode);




arr_file=[  
  
  "Component/Design/Design.js",  
  "Component/Design/ManagerBootBuilder.js",
  "Component/Design/ManagerBootOptions.js",
  "Component/Design/ManagerIFrame.js",
  "Component/Design/ManagerProject.js",
  "Component/Design/ManagerPalette.js",  
  "Component/Design/ManagerFile.js",  
  "Component/Design/PropertySheet.js", 
  "Component/Design/ManagerProperty.js",
  "Component/Design/PropertySheetPaletteItem.js",
  "Component/Design/ManagerMessenger.js",
  "Component/Design/ObjectMap.js",
  "Component/Design/ObjectAction.js",
  "Component/Design/PropertyDOMProperty.js",
  "Component/Design/PropertyDOMAttribute.js",
  "Component/Design/PropertyDOMStyle.js",
  "Component/Design/PropertyDesign.js"  
  
];
concat(arr_file, filename_component_design);

arr_file=[  
  
  "Component/ComponentMap.js"
  
];
concat(arr_file, filename_component_design_map);




arr_file=[      
  
  "Component/Design/FileDelegate.js",  
  "Component/Design/DesignDelegate.js",
  "Component/Design/DesignDelegateGrid.js",
  "Component/Design/DesignDelegateGridItem.js",
  "Component/Design/DesignDelegateProjectInstance.js",
  "Component/Design/GlobalVariable.js"
  
  
  
];
concat(arr_file, filename_designtime);

arr_file=[
  "Runtime/Project.js"
];

concat(arr_file, filename_template);


arr_file=[    
  filename_runtime, //Must go at start
  filename_designtime,//Must go at start  
  
  filename_component_component,
  filename_component_tag,
  filename_component_ajax,    
  filename_component_accordion,    
  filename_component_button,    
  filename_component_comment,      
  filename_component_design,
  filename_component_designfile,      
  filename_component_flex,    
  filename_component_grid,    
  filename_component_griditem,    
  filename_component_img,      
  filename_component_input,    
  filename_component_inputandbutton,    
  filename_component_inputtext,        
  filename_component_menubutton,      
  filename_component_navelement,      
  filename_component_table,      
  filename_component_tablerow,      
  filename_component_tablecell,        
  filename_component_tableheader,          
  filename_component_textarea,        
  filename_component_textnode,

  filename_component_design_map,  
  filename_template //Must go at end
];
concat(arr_file, filename_xdesign);