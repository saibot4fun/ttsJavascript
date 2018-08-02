try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}


var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var notesList = $('ul#notes');

var noteContent = '';



/*-----------------------------
      Voice Recognition 
------------------------------*/
//SpeechRecognition.continuous = true;
// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = true;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function(event) {

  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far. 
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
  // There is no official solution so far so we have to handle an edge case.
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
  
  if(!mobileRepeatBug) {
    noteContent = transcript;
    
    //noteTextarea.val(noteContent);
    var c = noteContent.split(" ");
    console.log(c);
   // alert(noteContent);
   //var comand = noteContent.trim()
    if(noteContent.trim() == "usuários" || noteContent.trim() == "usuário" || noteContent.trim() == "usuario" || noteContent.trim() == "usuarios")// || $("#note-textarea").val()  == "listar usuários")
    {
        menuAjax("usuario/listar_usuario");
        
    }
      else if(noteContent.trim() == "empresas" || noteContent.trim() == "empresa")// || $("#note-textarea").val()  == "listar usuários")
    {
        menuAjax("empresas/listar_empresas");
    }
      else if(noteContent.trim() == "fornecedores" || noteContent.trim() == "fornecedor")// || $("#note-textarea").val()  == "listar usuários")
    {
        menuAjax("fornecedores/listar_fornecedores");
    }
      else if(noteContent.trim() == "bancos" || noteContent.trim() == "banco")// || $("#note-textarea").val()  == "listar usuários")
    {
        menuAjax("bancos/listar_bancos");
         
    }
      else if(noteContent.trim() == "clientes" || noteContent.trim() == "cliente")// || $("#note-textarea").val()  == "listar usuários")
    {
        menuAjax("clientes/listar_clientes");
       
    }
      else if(noteContent.trim() == "funcionários" || noteContent.trim() == "funcionarios" 
                                            || noteContent.trim() == "funcionario" || noteContent.trim() == "funcionário")// || $("#note-textarea").val()  == "listar usuários")
    {
        menuAjax("funcionarios/listar_funcionarios");
        
    }
    else if(noteContent.trim() == "grupos" || noteContent.trim() == "grupo")// || $("#note-textarea").val()  == "listar usuários")
    {
        menuAjax("grupos/listar_grupos");
     
    }
    else if(noteContent.trim() == "adicionar" || noteContent.trim() == "novo")
    {
        //jQuery('#conteudo').load(this.lastModule+"/frm_adicionar_"+this.lastModule);
         $('#botao_adicionar').trigger('click');
         window.setTimeout(function(){
                var dados  = $("#log").serializeArray();
                if(dados.length > 0 )
                {
                    var msg = new SpeechSynthesisUtterance(" "+$("#ui-id-1").text()+" " );
                    window.speechSynthesis.speak( msg );
                    for(var i =1; i < dados.length ; i++)
                    {
                         //var msg = new SpeechSynthesisUtterance(" "+i+" "+$("#"+dados[i].name).attr("title") );
                         var msg = new SpeechSynthesisUtterance($("#"+dados[i].name).attr("title") );
                         window.speechSynthesis.speak( msg );
                    }
                }
        }, 1000);
            
        
    }
    else if(noteContent.trim() == "limpar" || noteContent.trim() == "limpa")
    {
        //jQuery('#conteudo').load(this.lastModule+"/frm_adicionar_"+this.lastModule);
        $('#botao_limpar').trigger('click');
        
    }
    else if(noteContent.trim() == "fechar" 
     || noteContent.trim() == "fecha" 
     || noteContent.trim() == "cancela" 
     || noteContent.trim() == "cancelar" 
     || noteContent.trim() == "sair")
    {
        //jQuery('#conteudo').load(this.lastModule+"/frm_adicionar_"+this.lastModule);
        
        console.log("QUITO");
        //$("#div_form").close();
        $('#div_form').dialog('close')
    }
    else if($("#"+(c[1].trim())).val() != undefined)
    {
        
                
      //  console.log(removerAcentos(c[1].val().trim()));
        //$("#" +removerAcentos(c[1].val().trim()) ).val( c[2].trim() );
                         //if(c[0] == )
                /*             console.log("OIEOIEOIE");
                var dados  = $("#log").serializeArray();
               if(dados.length > 0 )
                {
                    for(var i =1; i < dados.length ; i++)
                    {
                        if(i == c[0])
                        {
                            $("#"+c[1]).val(c[1]);
                             var msg = new SpeechSynthesisUtterance(" "+c[0]+" valor "+c[1] );
                             window.speechSynthesis.speak( msg );
                        }
                        
                    }
                }
    
         window.setTimeout(function(){
                var dados  = $("#log").serializeArray();
                if(dados.length > 0 )
                {
                    for(var i =1; i < dados.length ; i++)
                    {
                         var msg = new SpeechSynthesisUtterance(dados[i].name );
                         window.speechSynthesis.speak( msg );
                    }
                }
        }, 1000);*/
        
    }
    else
    {
        /* if(this.lastModule == "bancos")
        {
            if(this.lastComand == "adicionar")
            {
                alert("Ola");
               //   var msg = new SpeechSynthesisUtterance('Adicionar Bancos');
                //  window.speechSynthesis.speak( 'Adicionar Bancos');
            }
        }*/
       //  var msg = new SpeechSynthesisUtterance('Comando inválido');
         //window.speechSynthesis.speak( msg);
         //noteContent = '';
            //recognition.start();
    }
    
    
   noteContent = "";
   

  }
   
  
};

recognition.onstart = function() { 
    
  instructions.text('Voice recognition activated. Try speaking into the microphone.');


}
recognition.onend  = function() { 
  recognition.start();


}
recognition.onspeechend = function() {
  instructions.text('You were quiet for a while so voice recognition turned itself off.');
   
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');  
  };
}


function delSpace(string)
{
    var newString;
    for(var i =0; i< string.length;i++)
    {
        if(string[i] != "" || string[i] != " " && string[i] != "undefined")
        {
            newString += string[i];
        }
    }
    return newString;
}
/*-----------------------------
      App buttons and input 
------------------------------*/

$('#start-record-btn').on('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
});



notesList.on('click', function(e) {
  e.preventDefault();
  var target = $(e.target);

  // Listen to the selected note.
  if(target.hasClass('listen-note')) {
    var content = target.closest('.note').find('.content').text();
    readOutLoud(content);
  }

  // Delete note.
  if(target.hasClass('delete-note')) {
    var dateTime = target.siblings('.date').text();  
  
    target.closest('.note').remove();
  }
});



/*-----------------------------
      Speech Synthesis 
------------------------------*/

function readOutLoud(message) {
	var speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
	speech.text = message;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;
  
	window.speechSynthesis.speak(speech);
}



function removerAcentos( newStringComAcento ) {
  var string = newStringComAcento;
	var mapaAcentosHex 	= {
	a : /[\xE0-\xE6]/g,
    A : /[\xC0-\xC6]/g,
    e : /[\xE8-\xEB]/g,
    E : /[\xC8-\xCB]/g,
    i : /[\xEC-\xEF]/g,
    I : /[\xCC-\xCF]/g,
    o : /[\xF2-\xF6]/g,
    O : /[\xD2-\xD6]/g,
    u : /[\xF9-\xFC]/g,
    U : /[\xD9-\xDC]/g,
    c : /\xE7/g,
    C : /\xC7/g,
    n : /\xF1/g,
    N : /\xD1/g,
	};

	for ( var letra in mapaAcentosHex ) {
		var expressaoRegular = mapaAcentosHex[letra];
		string = string.replace( expressaoRegular, letra );
	}

	return string;
}

