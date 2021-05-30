 class ManagerMessenger extends PropertySheetPaletteItem{
    constructor(obj_delegator) { 
      super(obj_delegator); // call the super class constructor      
    }    
    fn_initialize(obj_delegator){
      this.obj_design.str_name="Messenger";//name is hard coded in ManagerProperty fn_validate
      this.obj_design.str_title="Messenger";//title can be changed
      super.fn_initialize(obj_delegator);

      this.obj_design.str_contentWelcome=`
      <div style="background-color:black;color:white;padding:20px">Welcome To The Designer.
      </div>
      `;      
    }   
    //END OBJECT EVENTS  
    fn_containerOnLoad(){    
      super.fn_containerOnLoad();
      this.obj_menuButton.fn_open();      
    }

    fn_linkOperation(obj_arg){    
      //This funciton will simply display the inner hTML opf the selected object
      //If the content changes it will fire up the textarea onchange event fn_linkPaletteTextEditChange and the new content willb e parsed using fn_parseHTMLContent
      let str_tag=obj_arg.obj_selected.fn_getType();      
      let obj_ini;    
      
      if(!obj_arg.obj_selected.dom_obj.innerHTML){
        //this.obj_menuButton.fn_close();      
        //return;      
      }

      switch(str_tag){
        case "xx-xx-xx"://do we even need this option ?                            
        default:          
        

        let str_content

          
          this.obj_flex.fn_removeAllContent();
          
          //this.obj_menuButton.fn_open();          
          
          //str_content=obj_arg.obj_selected.fn_getHTMLContent();            
          //str_content=obj_arg.obj_selected.dom_obj.outerHTML;            
          if(obj_arg.obj_selected.fn_isElement()){
            obj_arg.obj_selected.obj_designDelegate.fn_preparePublish();            
            str_content=obj_arg.obj_selected.dom_obj.innerHTML;                        
            //str_content=obj_arg.obj_selected.dom_obj.outerHTML;                                               
            if(!str_content){str_content=""};        
            str_content=str_content.replace(/&quot;/gi, "'");            
            str_content=fn_formatCode(str_content);                          
            
          }
          else{
            str_content=obj_arg.obj_selected.dom_obj.data;                         
          }

          //alert("GET INNER HTML: " + obj_arg.obj_selected.dom_obj.innerHTML)          
          

          //*
          obj_ini=new Holder;    
          obj_ini.obj_design.str_type="Textarea"; 
          obj_ini.obj_theme=this.obj_theme;
          obj_ini.obj_design.str_content=str_content;
          obj_ini.obj_design.str_linkId=obj_arg.obj_selected.obj_design.str_id;                                          
          obj_ini.obj_design.str_nameEventChange=obj_project.obj_design.str_prefix + "myDesignerPaletteTextEditOnChange";            
          obj_ini.obj_design.str_valueEventChange="fn_linkPaletteTextEditChange";                  
          obj_ini.obj_domStyle.height="300px";                            
          obj_ini.obj_domStyle.width="100%";
          obj_ini.obj_domStyle.width="6000px";          
          let obj_tag=this.obj_flex.fn_addItem(obj_ini);          
          //*/
            
          /*
          //tinymce.remove();              
          this.fn_getTINYMCEEditor(this.obj_flex.dom_obj, str_content, obj_arg.obj_selected);            
          //*/
          break;
      }
    }

    fn_getTINYMCEEditor(dom_container, str_content, obj_selected){
      let oform, str_html, str_id_form, str_id_textarea, str_id_submit, str_text_submit;
      str_id_form="tinymceForm";
      str_id_textarea="tinymceTextArea";
      str_id_submit="tinymceSumbit";          
      str_text_submit="Save";

      str_html=`<form method="post" id="${str_id_form}" style="display:none"><textarea id="${str_id_textarea}" name="${str_id_textarea}"></textarea></form>`;
      dom_container.innerHTML=str_html;

      tinymce.remove('#' + str_id_textarea);
      tinymce.remove();

      tinymce.
      init({
        selector: "#" + str_id_textarea,  
        plugins: 'code',
        valid_elements : '*[*]',
        height: 300,
        toolbar: 'fontselect fontsizeselect',
        menubar: 'file options tools',                                      
        menu: {
          file: {title: 'File', items: 'newdocument save'},
          options: {title: 'Format', items: ' bold italic underline strikethrough superscript subscript | formats | forecolor backcolor removeformat'},        
        },        
        forced_root_block : '',
        setup: function (editor) {          

          editor.ui.registry.addMenuItem('save', {
            text: 'Save',
            onAction: function () {
              str_html=tinyMCE.get("#" + str_id_textarea).getContent();                                                
              //obj_selected.fn_setHTMLContent(str_html);
            }
          });          
        }
      })
      .then(
        editor => {                
          oform=document.querySelector("#" + str_id_form);
          oform.style.display="block";                              
          let myeditor=tinyMCE.get(str_id_textarea);          
          myeditor.setContent(str_content);
          
        } 
        
    )
    .catch( err => {
            console.error( err.stack );
    } );
    }    
    
    fn_linkPaletteTextEditChange(){            
      
      
      let obj_itemEvent, obj_item, str_name, str_value;      
      obj_itemEvent=obj_project.obj_projectEvent;      
      obj_item=obj_project.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
      str_name=obj_itemEvent.obj_design.str_name;
      str_value=obj_itemEvent.str_value;

      let str_content=obj_itemEvent.fn_getHTMLContent();                        
      if(str_content===""){
        //str_content="blank";
      }
      obj_item.fn_parseHTMLContent(str_content); 
      
      obj_item.obj_designDelegate.fn_setPaletteSelected();


    }

    fn_clearOperation(){    
      super.fn_clearOperation();      
      //this.fn_displayWelcome();      
    }  
    fn_onPaletteItemSelected(){      
      

      if(!this.obj_flex){return;}
      //this.obj_flex.fn_removeAllContent();//n.b. if flex is cleared, maintain map wont work. So the super is split on  actionLinkOperation

      this.fn_actionLinkOperation();

      //this.obj_menuButton.fn_open();
      //this.obj_menuButton.obj_design.bln_isPinned=true;        
      //this.obj_menuButton.fn_openContainer();      
      
    }
    fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
    }
}
//END MESSENGER
