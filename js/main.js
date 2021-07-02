function onButtonClick() {
    var input = document.getElementById("treeinput").value;
    var inputDegrees = [];
    var split = input.split(" ");
    for (var i = 0; i < split.length; i++) {
        if (!isNaN(parseInt(split[i]))) {
            inputDegrees.push(parseInt(split[i]));
        }
    }
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(renderTree(inputDegrees, 0));
}

function treeSize(list, startIndex) {
    var total = 1;
    var endIndex = startIndex;
    while (total > 0) {
        total += list[endIndex];
        endIndex++;
        total--;
    }
    return endIndex - startIndex;
}

const CIRCLE_RADIUS = 30;
const HORIZ_PADDING = 15;
const VERT_PADDING = 20;

function drawLineBetweenCircles(startX, startY, endX, endY, ctx) {
    var dirX = endX - startX;
    var dirY = endY - startY;
    var len = Math.sqrt(dirX * dirX + dirY * dirY);
    dirX /= len;
    dirY /= len;
    dirX *= CIRCLE_RADIUS;
    dirY *= CIRCLE_RADIUS;
    ctx.beginPath();
    ctx.moveTo(startX + dirX, startY + dirY);
    ctx.lineTo(endX - dirX, endY - dirY);
    ctx.stroke();
}

function renderTree(inputDegrees, startIndex) {
    var childImages = [];
    var childWidth = 0;
    var childHeight = 0;
    var curIndex = startIndex + 1;
    for (var i = 0; i < inputDegrees[startIndex]; i++) {
        childImages.push(renderTree(inputDegrees, curIndex));
        childWidth += childImages[i].width;
        childHeight = Math.max(childHeight, childImages[i].height);
        curIndex += treeSize(inputDegrees, curIndex);
    }
    childWidth += HORIZ_PADDING * (inputDegrees[startIndex] - 1);
    var result = document.createElement("canvas");
    var ctx = result.getContext("2d");
    result.width = Math.max((CIRCLE_RADIUS + HORIZ_PADDING) * 2, childWidth);
    result.height = CIRCLE_RADIUS * 2 + childHeight + VERT_PADDING*2;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
    ctx.arc(result.width/2, CIRCLE_RADIUS + VERT_PADDING, CIRCLE_RADIUS, 0, 2*Math.PI);
    ctx.stroke();
    var curX = 0;
    for (var i = 0; i <inputDegrees[startIndex]; i++) {
        ctx.drawImage(childImages[i], curX, CIRCLE_RADIUS * 2 + VERT_PADDING * 2);
        drawLineBetweenCircles(result.width/2, CIRCLE_RADIUS + VERT_PADDING, curX + childImages[i].width/2, CIRCLE_RADIUS * 3 + VERT_PADDING * 3, ctx);
        curX += childImages[i].width + HORIZ_PADDING;
    }
    return result;
}