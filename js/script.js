window.onload = function(){
    iniciarJogo();
    personagem = personagem(60, 60, '#f00', 10,120);
}

function iniciarJogo(){
    areaJogo.start();

}

let areaJogo = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width = 600,
        this.canvas.height = 400,
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.hasChildNodes[0]);

    }

}

function personagem(largura, altura, cor, x, y){
    this.altura = altura,
    this.largura = largura,
    this.x = x,
    this.y = y,
    contexto = areaJogo.context
    contexto.fillStyle = cor, 
    contexto.fillRect(this.x, this.y, this.altura, this.largura,);


}