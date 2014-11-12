



  jsPlumb.ready(function(e) {


  var iconId; //holds the current id of chevron
  var elementsOnCanvas =[]; // holds all ids of dropped elements on canvas
  var count=0;  // element id incrementer


  // On Canvas doubleclick show create page
  $('#DropArea').dblclick(function(e) {  


   $( "#fullProps" ).show();
   $( "#elementProps" ).hide();


  });
  


  // If chevron element is clicked 
  function divClicked()
  {
      
      

      var clickedElement=$(this);
  		 
      clickedElement.find('.text-edit').css('visibility','visible'); //display textarea on element
     
      var id= clickedElement.find('.text-edit').attr('name');
      var testName = clickedElement.find('.text-edit').text();
     



  	    iconId=id; //setting current id of the element


  		 if(id==0 && elementsOnCanvas.length==0) //first element
       {
         
         id = ++count;
         elementsOnCanvas.push(id); //add id to idList
  			 
          clickedElement.find('.text-edit').attr('name',id);// set new id for element
        }

  		 if( id==0 && elementsOnCanvas.length !== 0) //not first element 
       {
  			   
  			   var lastLocation = elementsOnCanvas.length; //get last stored id location in array
  			  
          var temp= elementsOnCanvas[lastLocation-1];// get last stored id's index
  		
          id= temp +1;
          elementsOnCanvas.push(id);
          clickedElement.find('.text-edit').attr('name',id); //set new id for element
        }



  	 		// make element draggable	 		 
       jsPlumb.draggable(clickedElement, {


        containment : 'parent' // draggable only for container

          });

  	 		  clickedElement.find('.text-edit').position({  // position text box in the center of element

           my: "center",

           at: "center",

           of: clickedElement

         });	

         clearAllFields();  //clear table property values

         $( "#fullProps" ).hide();

         $( "#elementProps" ).show(); // show properties for element 


         clickedElement.find('.text-edit').focus();
                     
      
     
      clickedElement.find('.text-edit').keyup(function(e) // user types in text area of element
            {
                        clickedElement.find('.text-edit').css('background-color','white'); 
                         

               if (e.keyCode === 16) //if user is done editing (shift key) //CHANGE
                   {
                      var tempId= clickedElement.find('.text-edit').attr('name');
                          iconId=tempId;

                    
                    
                              clickedElement.find('.text-edit').css('background-color','BlanchedAlmond'); // change colour of value added text area
                              var nameOfCurrentTextBox = $(this).val();
              
                             $("#properties_ename").val(nameOfCurrentTextBox); // add entered value to table property name
                          
                             

                         }
             });

                    }



        // clear all properties of table
        function clearAllFields(){
       
       $("#properties_ename").val("");
       $("#properties_eowner").val("");
       $("#properties_epredecessors").val("");
       $("#properties_esuccessors").val("");
       $("#properties_Associated_process_emodels").val("");
     }




  //at page load
  jsPlumb.setContainer($('#DropArea'));  //set canvas
  $( "#fullProps" ).show();     //show table properties for main process
  $( "#elementProps" ).hide();




  $(function () {

    $( "#fullProps" ).tabs();   // include jquery.tabs
    $( "#elementProps" ).tabs();
  	   
       //Make element draggable

  	   $(".chevron").draggable({

        helper: 'clone',

        cursor: 'move',

        tolerance: 'fit',


        revert: true



      });
 
   //make elements droppable
  	   $("#DropArea").droppable({

        accept: '.chevron',

        activeClass: "drop-area",

        containment: 'DropArea',

        drop: function (e, ui) {



          element = ui.helper.clone();

          ui.helper.remove(); // remove helper clone for jsPlumb to work

          $(element).removeAttr("class");



          $(element).addClass("chevron"); 

  	           element.appendTo('#DropArea'); // main container canvas

              element.click(divClicked);





            }

          });

     });   // end of function

    });  //end of jsPlumb

