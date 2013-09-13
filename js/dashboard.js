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
                                var rec = "<tr>";
                                rec += "<td id='entityId' >";
                                var eArray = n.entity.split(" ");
                                $.each(eArray, function(i, value){
                                    if(i == 0){
                                        rec += "<a href='content/sample-detail.html' target='_blank'>";
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

                        }
                    });

 
                    $('#mytable').dataTable({
                        "sScrollY": "400px",
                        "bPaginate": false,
                        "bScrollCollapse": true,
                        "bInfo": false,
                        "bJQueryUI": true
                    });



            });

              
     
    		
    	}
    );
	//load default page: sample-content.html
	$('#grid-example').load("content/sample-content.html");
});


