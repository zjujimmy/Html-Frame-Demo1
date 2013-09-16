// dashboard js for index.html

var innerLayoutOptions = {
		center__paneSelector:   ".inner-center" 
	,	west__paneSelector:		".inner-west" 
	,	east__paneSelector:		".inner-east" 
	,	west__size:				280 
	,	east__size:				.33 
	,	spacing_open:			8  // ALL panes 
	,	spacing_closed:			12  // ALL panes 
	,	west__spacing_closed:   12 
	,	east__spacing_closed:   12 
	,	resizeWhileDragging:	true
};

var myLayout;
$(document).ready(function () {
/*	
	myLayout = $('#order').layout({
	north__slidable:			false,
	north__spacing_closed:		0,
	north__spacing_open:		0,
	south__slidable:			false,
	south__spacing_closed:		0,
	south__spacing_open:		0,
	east__slidable:				false,
	east__spacing_closed:		0,
	east__spacing_open:		0

});
	myLayout.hide('east');
	myLayout.hide('north');
	myLayout.hide('south');
*/

	/*For jquery ui layout*/
	myLayout = $('#order').layout(innerLayoutOptions);

    /* For jqtree */
	var data = [
    {
        label: 'INSTANCES',
        children: [
            { label: 'Instances' },
            { label: 'Reserved Instances' }
        ]
    },
    {
        label: 'IMAGES',
        children: [
            { label: 'AMIs' },
            { label: 'Bundle Tasks'}
        ]
    },
    {
    	label: 'ELASTIC BLOCK STORE',
    	children: [
    		{ label: 'Volumes'},
    		{ label: 'Snapshots'}
    	]
    },
    {
    	label: 'NETWORK & SECURITY',
    	children: [
    		{ label: 'Security Groups'},
    		{ label: 'Elastic IPs'},
    		{ label: 'Placement Groups'},
    		{ label: 'Load Balancers'},
    		{ label: 'Network Interfaces'}
    	]
    }

	];

	$('#tree1').tree({
        	data: data,
        	openedIcon: '-',
        	closedIcon: '+',
        	slide: false,
        	autoOpen: true

    });

   $('#tree1').bind(
    	'tree.click',
    	function(event) {
    		var node = event.node;
    		var strNodeName = "content/sample-";
    		//strNodeName += node.name;
    		
    		if (node.name == "Instances") {
    			strNodeName += "d3";
    		} else if ( node.name == "Reserved Instances"){
    			strNodeName += "Volumes";
    		} else {
                strNodeName += "events";
            }
    		strNodeName += ".html?t=" + Math.random();
    		$('#grid-example').load(strNodeName, function(){


                    $.ajax({
                        type: "GET",
                        url: "../ListIncidentOverviewResp.json",
                        dataType:"json",
                        success: function(data){
                            $.each(data, function(i,n){
                                var rec = "";
                                /*if(i % 2 == 0){
                                    rec += "<tr class='even'>";
                                } else {
                                    rec += "<tr class='odd'>";
                                }*/
                                rec +="<tr>";

                                rec += "<td id='entityId'>";
                                var eArray = n.entity.split(" ");
                                $.each(eArray, function(i, value){
                                    if(i == 0){
                                        rec += "<a href='#'>";
                                        rec += eArray[i];
                                        rec += "</a><br/>";
                                    } else {
                                        rec += eArray[i] + "<br/>";
                                    }
                                    
                                });
                                rec += "</td>";
                                rec += "<td>"
                                $.each(n.incidentList, function(i, item){
                                    rec += item.incidentClass + "<br/>";
                                });
                                rec += "</td>";

                                rec += "<td>";
                                rec += "<table><tr><td>UP</td>";
                                $.each(n.up, function(i, item){
                                    rec += "<td>";
                                    rec += item.value;
                                    rec += "</td>";
                                });
                                rec += "</tr><tr><td>DOWN</td>";
                                $.each(n.down, function(i, item){
                                    rec += "<td>";
                                    rec += item.value;
                                    rec += "</td>";
                                });
                                rec += "</tr></table>";
                                rec += "</td>";

                                rec += "<td> </td>";
                                rec += "<td> </td>";
                                rec += "</tr>";
                                $('#mytable').append(rec);


                                

                            });
                            


                            $('#mytable a').click(function(){

                                    $('#grid-example').load('content/sample-dd.html', function(){
                                       $.ajax({
                                                type: "GET",
                                                url: "../IncidentDetail.json",
                                                dataType:"json",
                                                success: function(data){
                                                    var entityId = data.entityId;
                                                    $.each(data.incidentList, function(i,n){
                                                        var irec = "<tr>";
                                                        if(i % 2 == 0) {
                                                            irec += "<td rowspan=2>" + entityId + "</td>";
                                                        }
                                                        
                                                        irec += "<td>" + n.incidentClass + "</td>";
                                                        var startTime = new Date(n.startTime * 1000);

                                                        irec += "<td>" + startTime.toString() + "</td>";
                                                        irec += "<td>" + n.endTime + "</td>";
                                                        irec += "<td>";
                                                        irec += "<button class='btn btn-success'><i class='icon-play icon-white'></i> Confirm</button> ";
                                                        irec += "<button class='btn btn-danger'><i class='icon-play icon-white'></i> Dismiss</button> ";
                                                        irec += "<button class='btn btn-warning'><i class='icon-play icon-white'></i> Ignore</button> ";
                                                        irec += "<button class='btn'><i class='icon-play icon-white'></i> Whitelist</button> ";
                                                        irec += "</td>";
                                                        irec += "</tr>";
                                                        $('#incidentTable').append(irec);
                                                    });
                                                    

                                                    $.each(data.eventList, function(i,n){
                                                        var seqEvent = i + 1;
                                                        var rec = "<tr><td>" + seqEvent + "</td>";
                                                        rec += "<td>" + n["type"] + "</td>";
                                                        //rec += "<td>" + n["sourceList"] + "</td>";
                                                        rec += "<td>";
                                                        $.each(n.sourceList, function(i,item) {
                                                            rec += item.ip + " :" + item.port + "<br/>";
                                                        });
                                                        rec += "</td>";
                                                        rec += "<td>";
                                                        $.each(n.targetList, function(i,item) {
                                                            rec += item.ip + " :" + item.port + "<br/>";
                                                        });
                                                        rec += "</td>";

                                                        //rec += "<td>" + n["targetList"] + "</td>";
                                                        rec += "<td>" + n["type"] + "</td>";
                                                        rec += "<td>" + n["flows"] + "</td>";
                                                        rec += "<td>" + n["bytesUp"] + "</td>";
                                                        rec += "<td>" + n["packets"] + "</td>";
                                                        rec += "</tr>";
                                                        $('#eventTable').append(rec);
                                                        
                                                    });
                                                    

                                                }//success
                                        });//$.ajax
                                        
                                        
                                    });//load detail page
                                });//a click
                            
                            

                        }//


                        
                    });

 /*
                    $('#mytable').dataTable({
                        "sScrollY": "700px",
                        "sScrollX": "100%",
                        "bPaginate": false,
                        "bScrollCollapse": true,
                        "bInfo": false,
                        "bJQueryUI": true,
                        "bSort": false,
                        "bFilter": false,
                        "sScrollXInner": "110%"
                    });

*/


                

            });

              
     
    		
    	}
    );
	//load default page: sample-content.html
	$('#grid-example').load("content/sample-content.html");
});


