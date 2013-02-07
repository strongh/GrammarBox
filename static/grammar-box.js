var shapeCanvasSize = 20

function pinkRectangle(paper){
    square = paper.rect(0, shapeCanvasSize/2,
			shapeCanvasSize, shapeCanvasSize/2)
    
    square.attr("fill", "#F984EF");
    square.attr("stroke", "#F984EF");
}

function smallLightBlueTriangle(paper){
    triangle = paper.path("M5,20,15,20,10," + 10*1.41 + "z")
    triangle.attr("fill", "#B4CDCD");
    triangle.attr("stroke", "#B4CDCD");
}

function mediumDarkBlueTriangle(paper){
    triangle = paper.path("M5,20,15,20,10," + 10*1.41 + "z")
    triangle.attr("fill", "#0D4F8B");
    triangle.attr("stroke", "#0D4F8B");
}

function largeBlackTriangle(paper){
    triangle = paper.path("M5,20,15,20,10," + 10*1.41 + "z")
    triangle.attr("fill", "#000");
    triangle.attr("stroke", "#000");
}

function largeRedCircle(paper){
    circle = paper.circle(10, 10, 10/1.41)
    circle.attr("fill", "#F00");
    circle.attr("stroke", "#F00");
}

function mediumOrangeCircle(paper){
    circle = paper.circle(10, 10, 10/1.41)
    circle.attr("fill", "#FF8C00");
    circle.attr("stroke", "#FF8C00");
}

function greenCrescent(paper){
    circle = paper.circle(10, 18, 10/1.41)
    circle.attr("fill", "#308014");
    circle.attr("stroke", "#308014");

    circle = paper.circle(10, 24, 10)
    circle.attr("fill", "#FFF");
    circle.attr("stroke", "#FFF");
}

function noOp(paper){}

function posToShapeFn(pos){
    var drawFn
    switch(pos){
    case 'NN':
	drawFn = largeBlackTriangle
	break

    case 'PRP':
	drawFn = largeBlackTriangle
	break

    case 'VBP':
	drawFn = largeRedCircle
	break

    case 'VBZ':
	drawFn = largeRedCircle
	break

    case 'IN':
	drawFn = greenCrescent
	break

    case 'VB':
	drawFn = largeRedCircle
	break

    case 'VBN':
	drawFn = largeRedCircle
	break

    case 'RB':
	drawFn = mediumOrangeCircle
	break

    case 'VBG':
	drawFn = largeRedCircle
	break
	
    case 'DT':
	drawFn = smallLightBlueTriangle
	break
	
    case 'JJ':
	drawFn = mediumDarkBlueTriangle
	break

    case 'CC':
	drawFn = pinkRectangle
	break
	
    default:
	drawFn = noOp
    }
    
    return(drawFn)
}

$(document).ready(function(){
    $(document).keyup(function(event){
	if (event.keyCode == 32) { // space
	    $.ajax({
		url: "/" + $("#textbox").val()
	    }).done(function(data){
		$("#words").empty()
		$("#shapes").empty()
		_.map($.parseJSON(data), function(d){
		    token = d[0]
		    pos = d[1]
		    word = d[2]
		    $("<td/>", {
			text: word, //+ " (" + pos + ")"
			title: token 
		    }).appendTo("#words")
		    shape = $("<td/>", {
			title: pos
		    })
		    var paper = Raphael(shape[0], 
					shapeCanvasSize, 
					shapeCanvasSize)
		    posToShapeFn(pos)(paper)
		    shape.appendTo("#shapes")
		})
	    })
	}
    })
})
