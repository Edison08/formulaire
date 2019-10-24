$(document).ready(function(){
	$("#form").validate({
		rules: {
		"nom":{
			"required": true,
			"minlength": 2,
			"maxlength": 30
		},
		"prenom":{
			"required": true,
			"minlength": 2,
			"maxlength": 30
		},
		"mail":{
			"required": false,
			"minlength": 2,
			"email": true
		},
		"tel":{
			"required": false,
			"minlength": 2
		},
		"adresse":{
			"required": true,
			"minlength": 2,
		},
		"codeP":{
			"required": true,
			"minlength": 2
		},
		"naissance":{
			"required": true,
			"minlength": 2
		},
		"IBAN":{
			"required": true,
			"minlength": 2,
			"maxlength": 50
		},
		"secu":{
			"required": true,
			"minlength": 12,
		},
	}
 });
	 
 	/*//Récupération du numéro de déprtement au chargement seulement puis je place celui ci dans le input "secu"
	var secu = $("#secu");
	var dpt = $("#dpt").val().split("-");
	secu.val(dpt[0]);*/
 
 	$('#form').bind('submit', function(e) {
  		var mail = $("#mail").val();
		var tel = $("#tel").val();

  		if(!mail && !tel){
			e.preventDefault();
			  $("#erreurMailTel").html("Vous avez oublié de renseigner au moins un numéro de téléphone et/ou une adresse mail.");
			  $("#numTel").remove();
  		}
		  
	});
});

jQuery.extend(jQuery.validator.messages, {
	required: "Champ manquant",
});


var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

//affiche les noms des villes/villages en fonction du code postale entré par l'utilisateur
var getVille = function(){
	$("#ville").html("");

	fetch('https://www.cyril-minette.net/iut/javascript/webservices/ws_json_villes_par_code_postal.php?code_postal='+ $('#codeP').val())
    .then(function (response) {
        response.json()
            .then(function (value) {
				$('#ville').append("<option value='' disabled selected>Choisissez votre ville</option>");
                for (var i = 0; i < value.length; i++) {
					$('#ville').append( "<option value=''>" + value[i].ville_nom_reel + "</option>");
                }
            });
    });
}


var getCivNaissanceDpt = function(){
	var secu = $("#secu");
	var date = $("#naissance").val().split("-");
	var annéeNaissance = date[0].split("")[2] + date[0].split("")[3];

	//Récupération du numéro de déprtement seulement puis je place celui ci dans le input "secu"
	var dpt = $("#dpt").val().split("-");
	secu.val(dpt[0]);

	//test de la civilite, si monsieur alors on return 1 et si madame on retourne 2
	var civ = $("[name='civ']");
	if(civ[0].checked){
		var civilite = "1";
   	} else if (civ[1].checked){
		var civilite = "2";
	}


	//test et affichage dans le input "secu" des infos déjà renseigné
	if(!civilite && !annéeNaissance && !date[1]){
		secu.val(dpt[0]) ;
	}else if(!annéeNaissance && !date[1]){
		secu.val(civilite + " " + dpt[0]);
	}else if(!civilite){
		secu.val(annéeNaissance + " " + date[1] + " " + dpt[0]);
	}else{
		secu.val(civilite + " " + annéeNaissance + " " + date[1] + " " + dpt[0]);
	}
}