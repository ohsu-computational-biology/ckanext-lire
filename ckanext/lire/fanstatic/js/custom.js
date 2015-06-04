//reinicijalizujemo tooltip za datasetove
$("body").tooltip({ selector: '[data-toggle=tooltip]' });
			
$("#form_random").blur(function() {
	if($(this).val() == '')
	{
		$("#form_tag").removeAttr("disabled");
		$("#form_group").removeAttr("disabled");
		$("#form_organization").removeAttr("disabled");		
	}
	else
	{
		$("#form_tag").attr("disabled", "disabled");
		$("#form_group").attr("disabled", "disabled");
		$("#form_organization").attr("disabled", "disabled");
	}
}).tooltip();
$("#form_tag").blur(function() {
	if($(this).val() == '')
	{
		$("#form_random").removeAttr("disabled");
		$("#form_group").removeAttr("disabled");
		$("#form_organization").removeAttr("disabled");		
	}
	else
	{
		$("#form_random").attr("disabled", "disabled");
		$("#form_group").attr("disabled", "disabled");
		$("#form_organization").attr("disabled", "disabled");
	}
}).tooltip();
$("#form_group").blur(function() {
	if($(this).val() == '')
	{
		$("#form_tag").removeAttr("disabled");
		$("#form_random").removeAttr("disabled");
		$("#form_organization").removeAttr("disabled");		
	}
	else
	{
		$("#form_tag").attr("disabled", "disabled");
		$("#form_random").attr("disabled", "disabled");
		$("#form_organization").attr("disabled", "disabled");
	}
}).tooltip();
$("#form_organization").blur(function() {
	if($(this).val() == '')
	{
		$("#form_tag").removeAttr("disabled");
		$("#form_group").removeAttr("disabled");
		$("#form_random").removeAttr("disabled");		
	}
	else
	{
		$("#form_tag").attr("disabled", "disabled");
		$("#form_group").attr("disabled", "disabled");
		$("#form_random").attr("disabled", "disabled");
	}
}).tooltip();
$(".datasetTags").tooltip();
//funkcija za skrivanje prikazivanje forme i menija
$("#hide-button").click(function() {
	$(".hide-menu-form").slideToggle("medium");
	if ($("#hmf").hasClass("glyphicon-chevron-up"))
	{		
		$("#hmf").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
	}
	else
	{	
		$("#hmf").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
	}
});
$("#hide-button").tooltip();
//dodajemo popover i tooltip za svaki pojedinacni dataset
{% for key, value in datasets %}
	$("#{{key}}_td").popover({
		title: '{% for value1 in value.tags %} <h4 style="display: inline-block;"> <span class="label label-default fa fa-tags"><a href="{{tagURL}}?tags={{value1}}" target="_blank" style="padding-left:5px;">{{ value1 }}</a></span> </h4> <nobr> {% endfor %}',
		html: true,
		content: '{{value.notes}}',
		placement: 'top',
		template: '<div style="width:276px;" class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
	});
	$("#{{key}}_fl").popover({
		title: '{% for value2 in value.extrasLinks %} <span class="label label-default fa fa-link"> <a href="{{tagURL}}/{{value2}}" target="_blank" style="text-decoration: none;"> {{ value2 }} </a> </span><p> </p>{% endfor %}',
		html: true,
		content: '{% for value3 in value.formats %} <h5 style="display: inline-block;"><span {% if value3|lower in ldf %} style="background-color:#2DEB60;" {% endif %}class="label label-default fa fa-file"> <a href="{{tagURL}}?res_format={{value3}}" target="_blank" style="padding-left:5px;">{{ value3 }}</a></span></h5> {% endfor %}',
		placement: 'top',
		template: '<div style="width:276px;" class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
	});			
	$("#{{key}}_rel").popover({
		title: 'Relationships',
		html: true,
		content: '{% for value1 in value.relationships %} {{value1.type}} <i class="fa fa-chevron-right"></i> {{value1.object}} <br> {% endfor %}',
		placement: 'top',
		template: '<div style="width:276px; font-size:12px; line-height:1.5em;" class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',	
	});			
	$("#{{key}}_td").tooltip({
		placement: 'bottom',
		title: 'tags and description'
	});	
	$("#{{key}}_fl").tooltip({
		placement: 'bottom',
		title: 'format and extras:links'
	});						
	$("#{{key}}_rel").tooltip({
		placement: 'bottom',
		title:"relationships"
	});						
	$("#{{key}}_detach").tooltip({
		placement: 'bottom',
	});	
{% endfor %}	
$("#semanticFormat").tooltip({
	title: 'Choose output format',
	placement: 'top'
});			
$(".semantic-hover").tooltip({
	title: 'Click on button to mark dataset to get semantic description of relationships',
	html: true,
	placement: 'bottom',
	template: '<div style="width:200px; font-size:14px; font-family: sans-serif;" class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',	
});	
//svim datasetovima postavljamo belu pozadinu
$(".window").addClass("semantic-white");
//funkcija koja kada se klikne na dataset markira ga zalenom bojom i dodaje u 
//modal deo za kreiranje semantike, dok ponovni klik na isti dataset obavlja njegovo
//demarkiranje i uklanjanje iz modal dela
//omogucava/onemogucava Get semantic dugme
var emptySemModal = 0;
$(".semantic-hover").click(function() {
	var datasetName = $(this).parent().parent().attr("id");
	if($(this).parent().parent().hasClass("semantic-white"))
	{
		$(this).parent().parent().removeClass("semantic-white");
		$(this).parent().parent().addClass("semantic-green");
		
		var tempDataset = '<span class="badge" style="background:green;" value="' + datasetName + '">' + datasetName + '</span>';
		var temp = $("#semanticModal .modal-body").html();
		temp = temp + tempDataset;
		$("#semanticModal .modal-body").html(temp);	
		emptySemModal+=1;
	}
	else
	{
		$(this).parent().parent().removeClass("semantic-green");
		$(this).parent().parent().addClass("semantic-white");
		$('span[value="' + datasetName + '"]').remove();
		emptySemModal-=1;
	}
	if (emptySemModal == 0)
	{
		$("#getSemantic").prop('disabled', true);
	}
	else
	{
		$("#getSemantic").prop('disabled', false);
	}
});		
$("#typeDiv").hide();	
//funkcija za dodavanje predlozenog tipa relacije u pending actions tabeli i similiraty test delu
$(".suggestedValue").click(function() {
	var temp = $("#similarityTest tr:last #suggestedValue").text();
	if(temp != 'N.A.')
	{
		$("#conns tr:last td:nth-child(2)").html(temp);
	}	
}).tooltip({
	title: 'Click on suggested type to <br> apply it',
	html: true,
	placement: 'top',
	template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner" style="  font-size: 14px;font-weight: 400;"></div></div>',	
});				
$(".fa-times-circle").tooltip({ 
	placement: 'bottom',
});
$(".fa-check-circle").tooltip();
$('.relationship').click(function() {
	rel = $(this).attr("value");
	$(this).css("background","lime").siblings().css("background","white");
});	
$('.relationship').tooltip({ 
	placement: 'top',
	title: 'choose type of relationship'
});		
connections = [];
$(window).load(function(){
	$( ".hide-menu-form" ).slideToggle("medium");
});		
$("#refresh").click(function() {
	$("#mainForm").submit();
});
//pomocu ovog klika (funkcije) commit-ujemo dodate/obrisane relacije u CKAN
$("#commit").click(function() {
	var table = document.getElementById("conns");
	var tableSim = document.getElementById("similarityTest");
	var rowCount = table.rows.length;
	var rowCountSim = tableSim.rows.length;
	var row = '';

	//u ovoj petlji uzimamo redove iz tabele iz modal popup prozora i za svaki red u tabeli
	//izvrsimo jednu CKAN akciju
	//izuzimamo prvi red jer je on naslovni red tabele
	for (var i = 1; i < rowCount; i++) 
	{
		var subject = table.rows[i].cells[0].innerHTML;
		var type = table.rows[i].cells[1].innerHTML;				
		var object = table.rows[i].cells[2].innerHTML;
		var action = table.rows[i].cells[3].innerHTML;
				
		//AJAX poziv za svaki red iz tabele
		$.post('relationships',{'ckanURL':'{{ check }}','action':action,'subject':subject,'type':type,'object':object,'comment':' ','apiKey':'76985a7a-f550-4b8d-8352-d7b828460f6b'},
			function(data) {
		});				
		//$(".modal-body").append("<br>");
	}
	//ova petlja brise redove iz tabele nakon sto se za njih izvrsi odgovarajuca CKAN akcija
	for (var i = 1; i < rowCount; i++)
	{
		table.deleteRow(-1);
		rowCount--;
		i--;
	}
	//ova petlja brise redove iz tabele sa podacima o ispitivanju dva dataseta
	for (var i = 1; i < rowCountSim; i++)
	{
		tableSim.deleteRow(-1);
		rowCountSim--;
		i--;
	}			
	//podesavamo broj akcija na cekanju na 0
	document.getElementById("pending").innerHTML = 0;	
});	
//pomocu ovog klika (funkcije) dobijamo semanticki opis relacija
$("#getSemantic").click(function() {
	datasets = jQuery.makeArray();
	$("#semanticModal .modal-body").find("span").each(function(){
		datasets.push($(this).text());
	});
	var URL = $("#form_url").val();
	var format = $("#semanticFormat").val();
	//AJAX poziv za dobijanje semantike
	$.post('semanticRelationships',{'datasets':datasets,'URL':URL,'format':format},
		function(data) {
	});	
	window.open("semreDesc", '_blank');		
});	
(function() {
	//funkcija za dodavanje reda u tabeli konekcija
	insertRow = function(var1, var2, var3, var4) {
		var table = document.getElementById("conns");
		var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);	
		var cell4 = row.insertCell(3);	
		cell1.innerHTML = var1;
		cell2.innerHTML = var2;
		cell3.innerHTML = var3;
		cell4.innerHTML = var4;
	};
	var listDiv = document.getElementById("list");
	showConnectionInfo = function() {
		//listDiv.innerHTML = s;
		listDiv.style.display = "block";
	};	
	hideConnectionInfo = function() {
		listDiv.style.display = "none";
	};
	jsPlumb.ready(function() {
		var instance = jsPlumb.getInstance({
			DragOptions : { cursor: 'pointer', zIndex:2000 },
			PaintStyle : { strokeStyle:'#666' },
       			EndpointHoverStyle: { fillStyle:"orange" },
       			HoverPaintStyle: { strokeStyle:"orange" },
			EndpointStyle : { width:20, height:16, strokeStyle:'#666' },
			Endpoint : "Rectangle",
			Anchors : ["TopCenter", "TopCenter"],
			Container:"drag-drop-demo"
		});		
		// suspend drawing and initialise.
		instance.doWhileSuspended(function() {										
			
		// bind to connection/connectionDetached events, and update the list of connections on screen.
		instance.bind("connection", function(info, originalEvent) {
			//updateConnections(info.connection);

		if ((typeof rel === "undefined" ) && (info.connection.scope == "yellow"))
		{
			alert("You didn't select the type of connection. The page will be refreshed.");
			instance.detach(info.connection,{
				forceDetach: true,
				isSource:true
			});
			$("#mainForm").submit();
		}
		else
		{
			//dodajemo konekcije u tabelu
			var con=info.connection;
			var table = document.getElementById("conns");
				
			connections.push(con);
			con.scope = rel;
			insertRow(con.sourceId, rel, con.targetId, "package_relationship_create");
			showConnectionInfo();
			document.getElementById("pending").innerHTML = table.rows.length - 1;

			//AJAX poziv za svaki red iz tabele
			$.post('examineDatasets',{'ckanURL':'{{ check }}','subject':con.sourceId,'object':con.targetId},
				function(data) {
					$("#similarityTest tr:last").after(
					'<tr> <td rowspan="21" style="text-align:center;vertical-align:middle">' + con.sourceId + '<br> & <br>' + con.targetId + 						'</td> </tr> <tr> <td> similarTags </td> <td>'+ data.tagCount +
					'</td> </tr> <tr> <td> open </td> <td>' + data.sOpen + ' <=> ' + data.oOpen +
					'</td> </tr> <tr> <td> subject dataset tags in object organization </td> <td>' + data.tagSOO +
					'%</td> </tr> <tr> <td> object dataset tags in subject organization </td> <td>' + data.tagOSO +
					'%</td> </tr> <tr> <td> subject dataset tags in object group </td> <td>' + data.tagSOG +
					'%</td> </tr> <tr> <td> object dataset tags in subject group </td> <td>' + data.tagOSG +
					'%</td> </tr> <tr> <td> subject formats in object dataset </td> <td>' + data.formatsSO +
					'%</td> </tr> <tr> <td> object formats in subject dataset </td> <td>' + data.formatsOS +
					'%</td> </tr> <tr> <td> subject 5 star </td> <td>' + data.fsS +
					'</td> </tr> <tr> <td> object 5 star </td> <td>' + data.fsO +
					'</td> </tr> <tr> <td> linkedFormats </td> <td>' + data.linkedFormat +
					'</td> </tr> <tr> <td> machine processable formats </td> <td>' + data.machineProcessable +
					'</td> </tr> <tr> <td> subject tracking </td> <td> total: ' + data.trackingSD.total + ', recent: ' + data.trackingSD.recent +
					'</td> </tr> <tr> <td> object tracking </td> <td> total: ' + data.trackingOD.total + ', recent: ' + data.trackingOD.recent +
					'</td> </tr> <tr> <td> subject resources tracking </td> <td> total: ' + data.trackingSResources.total + ', recent: ' + data.trackingSResources.recent +
					'</td> </tr> <tr> <td> object resources tracking </td> <td> total: ' + data.trackingOResources.total + ', recent: ' + data.trackingOResources.recent +
					'</td> </tr> <tr> <td> older dataset </td> <td>' + data.dateTimeCreation +
					'</td> </tr> <tr> <td> extras:links </td> <td>' + data.extrasLink +
					'</td> </tr> <tr> <td> sameOrganization </td> <td>' + data.organization +
					'</td> </tr> <tr> <td> sameGroup </td> <td>' + data.group +
					'</td> </tr> <tr> <td colspan="3" style="text-align:center;  padding:15px; "> <span style="padding: 9px 12px; font-size:13px; margin-right:10px;" class="label label-info">Choosen type: <span class="badge" id="choosenValue"> </span> </span> <span class="label label-success" style="padding: 9px 12px; font-size:13px;">Suggested type: <span class="badge" id="suggestedValue"> </span></span> </td> </tr>'
					);
					$("#similarityTest tr:last #choosenValue").html(con.scope);
					$("#similarityTest tr:last #suggestedValue").html(data.suggestedType);
					
					$(".choosenValue").html(con.scope);
					$(".suggestedValue").html(data.suggestedType);
					$("#typeDiv").show();
					if(data.suggestedType == "N.A."){
						$(".suggestedValue").tooltip('disable');
					}
					else
					{
						$(".suggestedValue").tooltip('enable');
					}
				});		
					
				//ovde brisemo duple konekcije
				//var con=info.connection;
				var arr=instance.select({source:con.sourceId,target:con.targetId,scope:con.scope});
				if(arr.length>1){
					instance.detach(con);
					rowCount = table.rows.length;
					table.deleteRow(rowCount - 1);
					table.deleteRow(rowCount - 2);
					document.getElementById("pending").innerHTML = rowCount - 3;
					
					}
				}
			});	

			instance.bind("connectionDetached", function(info, originalEvent) {
				//updateConnections(info.connection, true);
				//deleteRow(info.connection);
				var con = info.connection;
				var table = document.getElementById("conns");
				var rowCount = table.rows.length;
			
				//pomocu ovog IF uslova blokiramo unos reda u tabelu za default "scope" jsPlumb
				//biblioteke "yellow"
				if (con.scope != "yellow")
				{
					insertRow(con.sourceId, con.scope, con.targetId, "package_relationship_delete");
				}
				//prikaz konekcija
				showConnectionInfo();
					
				//azuriranje broja konekcija na cekanju
				document.getElementById("pending").innerHTML = table.rows.length - 1	;
				
				//ako je broj konekcija 0 sakriti tabelu
				if (connections.length == 0) hideConnectionInfo();
			
			});

			instance.bind("click", function(component, originalEvent) {
               			//alert("click!")
				//brisemo konekciju klikom na nju
				instance.detach(component);				
       			});
		
			// configure some drop options for use by all endpoints.
			var exampleDropOptions = {
				tolerance:"touch",
				hoverClass:"dropHover",
				activeClass:"dragActive"
			};
			// first example endpoint.  it's a 25x21 rectangle (the size is provided in the 'style' arg to the Endpoint),
			// and it's both a source and target.  the 'scope' of this Endpoint is 'exampleConnection', meaning any connection
			// starting from this Endpoint is of type 'exampleConnection' and can only be dropped on an Endpoint target
			// that declares 'exampleEndpoint' as its drop scope, and also that
			// only 'exampleConnection' types can be dropped here.
			//
			// the connection style for this endpoint is a Bezier curve (we didn't provide one, so we use the default), with a lineWidth of
			// 5 pixels, and a gradient.
			//
			// there is a 'beforeDrop' interceptor on this endpoint which is used to allow the user to decide whether
			// or not to allow a particular connection to be established.
			//
			var exampleColor = "#00f";
			var exampleEndpoint = {
				endpoint:"Rectangle",
				paintStyle:{ width:25, height:21, fillStyle:exampleColor },
				isSource:true,
				reattach:true,
				scope:"blue",
				connectorStyle : {
					gradient:{stops:[[0, exampleColor], [0.5, "#09098e"], [1, exampleColor]]},
					lineWidth:5,
					strokeStyle:exampleColor,
					dashstyle:"2 2"
				},
				isTarget:true,
				beforeDrop:function(params) { 
					return confirm("Connect " + params.sourceId + " to " + params.targetId + "?"); 
				},				
				dropOptions : exampleDropOptions
			};			

			//
			// the second example uses a Dot of radius 15 as the endpoint marker, is both a source and target,
			// and has scope 'exampleConnection2'.
			//[[1, 0.2, 1, 0], [0.8, 1, 0, 1], [0, 0.8, -1, 0], [0.2, 0, 0, -1] ]
			var color2 = "#316b31";
			var exampleEndpoint2 = {
				endpoint:["Dot", { radius:17 }],
				paintStyle:{ fillStyle:color2 },
				//isSource:true,
				scope:"green",
				anchor:[0.5, 0, 0, -1],
				//connectorStyle:{ strokeStyle:color2, lineWidth:6 },
				//connector: ["Bezier", { curviness:63 } ],
				//maxConnections: {{datasets|length - 1}},
				//isTarget:true,
				//dropOptions : exampleDropOptions
			};
			// the third example uses a Dot of radius 17 as the endpoint marker, is both a source and target, and has scope
			// 'exampleConnection3'.  it uses a Straight connector, and the Anchor is created here (bottom left corner) and never
			// overriden, so it appears in the same place on every element.
			//
			// this example also demonstrates the beforeDetach interceptor, which allows you to intercept 
			// a connection detach and decide whether or not you wish to allow it to proceed.
			//			
			var example3Color = "rgba(229,219,61,0.5)";
			var exampleEndpoint3 = {
				endpoint:["Dot", {radius:17} ],
				anchor:"BottomLeft",
				paintStyle:{ fillStyle:example3Color, opacity:0.5 },
				isSource:true,
				scope:'yellow',
				connectorStyle:{
	           			strokeStyle:example3Color,
	            			lineWidth:4
	        		},
				connector : "Straight",
				isTarget:true,
				maxConnections: {{datasets|length - 1}},
				dropOptions : exampleDropOptions,
				beforeDetach:function(conn) { 
					return confirm("Detach connection?"); 
				},
				onMaxConnections:function(info) {
					alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
				}
			};
			// setup some empty endpoints.  again note the use of the three-arg method to reuse all the parameters except the location
			// of the anchor (purely because we want to move the anchor around here; you could set it one time and forget about it though.)
			//var e1 = instance.addEndpoint('dragDropWindow1', { anchor:[0.5, 1, 0, 1] }, exampleEndpoint2);

			// setup some DynamicAnchors for use with the blue endpoints			
			// and a function to set as the maxConnections callback.
			var anchors = [[1, 0.2, 1, 0], [0.8, 1, 0, 1], [0, 0.8, -1, 0], [0.2, 0, 0, -1] ],
				maxConnectionsCallback = function(info) {
					alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
				};
 			{% for key, value in datasets %}
	
				var e{{key}} = instance.addEndpoint("{{ value.title }}", { anchor:[1, 0, 0, 0] }, exampleEndpoint3,{uuid:"{{key}}"});
				e{{key}}.bind("maxConnections", maxConnectionsCallback);
	
			{% endfor %}

			{% for value in eKey %}
				{% if value.type is defined %}
					instance.connect({ source:e{{value.subject}},target:e{{value.object}},scope:"{{value.type}}" });
				{% endif %}
			{% endfor %}

			//instance.connect({ source:e10,target:e5,scope:"depends_on" });
			
			// make .window divs draggable
			instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

			// add endpoint of type 3 using a selector. 
			//instance.addEndpoint(jsPlumb.getSelector(".drag-drop-demo .window"), exampleEndpoint2);
			
			var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
			instance.on(hideLinks, "click", function(e) {
				instance.toggleVisible(this.getAttribute("rel"));
				jsPlumbUtil.consume(e);
			});

			var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
			instance.on(dragLinks, "click", function(e) {
				var s = instance.toggleDraggable(this.getAttribute("rel"));
				this.innerHTML = (s ? '<a href="#" class="cmdLink drag" style="margin-right: 3px;"> <span class="fa fa-times-circle" data-toggle="tooltip" data-placement="bottom" title="disable dragging" style="font-size: 15px;"> </span> </a>' : '<a href="#" class="cmdLink drag" style="margin-right: 3px;"> <span class="fa fa-check-circle" data-toggle="tooltip" data-placement="bottom" title="enable dragging" style="font-size: 15px;"> </span> </a>');				
				jsPlumbUtil.consume(e);
			});

			var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
			instance.on(detachLinks, "click", function(e) {
				instance.detachAllConnections(this.getAttribute("rel"));
				jsPlumbUtil.consume(e);
			});

			instance.on(document.getElementById("clear"), "click", function(e) { 
				instance.detachEveryConnection();
				showConnectionInfo("");
				jsPlumbUtil.consume(e);
			});
		});
		jsPlumb.fire("jsPlumbDemoLoaded", instance);			
	});	
})();		

