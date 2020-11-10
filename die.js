
function Die(context){
    this.context = context

    this.top = .5 // x
    this.bottom = -.5 // x
    this.right = .5 // y
    this.left = -.5 // y
    this.front = .5 // z
    this.back = -.5 // z

    this.slider1 = document.getElementById("slider1")
    this.slider2 = document.getElementById("slider2")

    this.slider1.value = 0
    this.slider2.value = 0
}

// NOTE: Using for debugging, from lecture
Die.prototype.draw3DAxes = function(color,TxU,scale) {
    var Tx = mat4.clone(TxU);
    mat4.scale(Tx,Tx,[scale,scale,scale]);

    this.context.strokeStyle=color;
    this.context.beginPath();
    // Axes
    this.moveToTx([1.2,0,0],Tx);this.lineToTx([0,0,0],Tx);this.lineToTx([0,1.2,0],Tx);
    this.moveToTx([0,0,0],Tx);this.lineToTx([0,0,1.2],Tx);
    // Arrowheads
    this.moveToTx([1.1,.05,0],Tx);this.lineToTx([1.2,0,0],Tx);this.lineToTx([1.1,-.05,0],Tx);
    this.moveToTx([.05,1.1,0],Tx);this.lineToTx([0,1.2,0],Tx);this.lineToTx([-.05,1.1,0],Tx);
    this.moveToTx([.05,0,1.1],Tx);this.lineToTx([0,0,1.2],Tx);this.lineToTx([-.05,0,1.1],Tx);
    // X-label
    this.moveToTx([1.3,-.05,0],Tx);this.lineToTx([1.4,.05,0],Tx);
    this.moveToTx([1.3,.05,0],Tx);this.lineToTx([1.4,-.05,0],Tx);
    // Y-label
    this.moveToTx([-.05,1.4,0],Tx);this.lineToTx([0,1.35,0],Tx);this.lineToTx([.05,1.4,0],Tx);
    this.moveToTx([0,1.35,0],Tx);this.lineToTx([0,1.28,0],Tx);
    // Z-label
    this.moveToTx([-.05,0,1.3],Tx);
    this.lineToTx([.05,0,1.3],Tx);
    this.lineToTx([-.05,0,1.4],Tx);
    this.lineToTx([.05,0,1.4],Tx);

    this.context.stroke();
}


Die.prototype.moveToTx = function(loc,Tx)
{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); this.context.moveTo(res[0],res[1]);}

Die.prototype.lineToTx = function(loc,Tx)
{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); this.context.lineTo(res[0],res[1]);}


Die.prototype.drawDie = function(color, TxU, scale) {
    var Tx = mat4.clone(TxU)
    mat4.scale(Tx,Tx,[scale,scale,scale]);
    this.context.strokeStyle = color;

    mat4.translate(Tx, Tx, [0,0,0])
    

    /* NOTE: The descriptions on the right are when the square is first loaded */
    this.context.beginPath()
    this.moveToTx([0,0,0], Tx); this.moveToTx([-.5,1,1], Tx); this.lineToTx([.5,1,1], Tx) // x top left
    this.moveToTx([0,0,0], Tx); this.moveToTx([-.5,-1,1], Tx); this.lineToTx([.5,-1,1], Tx) // x bottom left
    this.moveToTx([0,0,0], Tx); this.moveToTx([-.5,1,-1], Tx); this.lineToTx([.5,1,-1], Tx) // x top right
    this.moveToTx([0,0,0], Tx); this.moveToTx([-.5,-1,-1], Tx); this.lineToTx([.5,-1,-1], Tx) // x bottom right

    this.moveToTx([0,0,0], Tx); this.moveToTx([-.5,1,1], Tx); this.lineToTx([-.5,-1,1], Tx) // y front left
    this.moveToTx([0,0,0], Tx); this.moveToTx([.5,1,1], Tx); this.lineToTx([.5,-1,1], Tx) // y front right
    this.moveToTx([0,0,0], Tx); this.moveToTx([-.5,-1,-1], Tx); this.lineToTx([-.5,1,-1], Tx) // y back left
    this.moveToTx([0,0,0], Tx); this.moveToTx([.5,-1,-1], Tx); this.lineToTx([.5,1,-1], Tx) // y back right
    
    this.moveToTx([0,0,0], Tx); this.moveToTx([-.5,1,1], Tx); this.lineToTx([-.5,1,-1], Tx) // z top left
    this.moveToTx([0,0,0], Tx); this.moveToTx([.5,1,1], Tx); this.lineToTx([.5,1,-1], Tx) // z top right
    this.moveToTx([0,0,0], Tx); this.moveToTx([-.5,-1,1], Tx); this.lineToTx([-.5,-1,-1], Tx) // z bottom left
    this.moveToTx([0,0,0], Tx); this.moveToTx([.5,-1,1], Tx); this.lineToTx([.5,-1,-1], Tx) // z bottom right


    // Fills
    this.moveToTx([0,0,0], Tx); this.moveToTx([-.5,1,1], Tx); this.lineToTx([.5,1,1], Tx); this.lineToTx([.5,-1,1], Tx); this.lineToTx([-.5,-1,1], Tx); this.context.closePath(); this.context.fill(); // Front
    
    this.moveToTx([0,0,0], Tx); this.moveToTx([-.5,1,-1], Tx); this.lineToTx([.5,1,-1], Tx); this.lineToTx([.5,-1,-1], Tx); this.lineToTx([-.5,-1,-1], Tx); this.context.closePath(); this.context.fill(); // Back

    this.moveToTx([0,0,0], Tx); this.moveToTx([-.5,1,1], Tx); this.lineToTx([-.5,1,-1], Tx); this.lineToTx([-.5,-1,-1], Tx); this.lineToTx([-.5,-1,1], Tx); this.context.closePath(); this.context.fill(); // Left

    this.moveToTx([0,0,0], Tx); this.moveToTx([.5,1,1], Tx); this.lineToTx([.5,1,-1], Tx); this.lineToTx([.5,-1,-1], Tx); this.lineToTx([.5,-1,1], Tx); this.context.closePath(); this.context.fill(); // Right


    this.context.stroke()


}


Die.prototype.drawCamera = function() {

    var eyeCamera = [this.slider2*Math.sin(this.slider1),10,this.slider2*Math.cos(this.slider1)] // TODO:
    var targetCamera = vec3.fromValues(1,0,0) // Where we are looking
    var upCamera = vec3.fromValues(0,5,0)

    var TLookAtCamera = mat4.create()
    
    mat4.lookAt(TLookAtCamera, eyeCamera, targetCamera, upCamera)

    return TLookAtCamera
}

Die.prototype.draw = function() {

    var Tcanvas_to_die = mat4.create()

    var TlookAtCamera = this.drawCamera()

    // (orthographic for now)
    var TprojectionCamera = mat4.create();
    mat4.ortho(TprojectionCamera,-100,100,-150,100,-1,1);
    //mat4.perspective(TprojectionCamera,Math.PI/4,1,-1,1); // Use for perspective teaser!
    
    // Create ViewPort transform (assumed the same for both canvas instances)
    var Tviewport = mat4.create();
    mat4.fromTranslation(Tviewport,[200,300,0]);  // Move the center of the
                                                // "lookAt" transform (where
                                                // the camera points) to the
                                                // canvas coordinates (200,300)
    mat4.scale(Tviewport,Tviewport,[100,-100,1]); // Flip the Y-axis,
                                                // scale everything by 100x
    // make sure you understand these    

    var tVP_PROJ_VIEW_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Camera,Tviewport,TprojectionCamera);
    mat4.multiply(tVP_PROJ_VIEW_Camera,tVP_PROJ_VIEW_Camera,TlookAtCamera);


    this.draw3DAxes("black", tVP_PROJ_VIEW_Camera, 100)

    this.drawDie("red", tVP_PROJ_VIEW_Camera, 50)

}

Die.prototype.update = function(slider1, slider2) {

    this.slider1 = slider1 * .02 * Math.PI
    this.slider2 = slider2

}