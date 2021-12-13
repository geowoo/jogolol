window.onload = function(){
    iniciarJogo();
   
    document.querySelector("#direita").addEventListener("mousedown", function(){
        direita();
    });

    document.querySelector("#esquerda").addEventListener("mousedown", function(){
        esquerda();
    });

    document.querySelector("#subir").addEventListener("mousedown", function(){
        subir();
    });

    document.querySelector("#descer").addEventListener("mousedown", function(){
        descer();
    });

    document.querySelector("#direita").addEventListener("mouseup", function(){
        frear();
    });

    document.querySelector("#esquerda").addEventListener("mouseup", function(){
        frear();
    });

    document.querySelector("#subir").addEventListener("mouseup", function(){
        frear();
    });

    document.querySelector("#descer").addEventListener("mouseup", function(){
        frear();
    });
}

var personagemObj;

var obstaculo = []; 

var pontos; 

function iniciarJogo(){
    areaJogo.start();
    personagemObj = new componente('white',10,120,30,30);
    pontos = new componente('#white',280,40,'Tw Cen MT','30px', 'texto');
    //obstaculo = new componente('white',300,120,200,10);
}

let areaJogo = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width = 600,
        this.canvas.height = 400,
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frame = 0;
        this.intervalo = setInterval(atualizaAreaJogo, 20); 
        window.addEventListener('keydown', function(e){
            //alert(e.key);
            areaJogo.key = e.key;
        });
        window.addEventListener('keyup', function(){
            areaJogo.key = false;
            frear();
        });
    },
    limpar: function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    },
    parar: function(){
        clearInterval(this.interval);

    }

}

function contarIntervalos(n){
    if((areaJogo.frame / n) % 1 == 0){
        return true;
    }else{
        return false;
    }
}

function componente(cor, x, y, largura, altura, tipo){
    this.tipo = tipo;
    this.altura = altura,
    this.largura = largura,
    this.x = x,
    this.y = y,
    this.velocidadeX = 0,
    this.velocidadeY = 0,
    this.texto = 0;
    this.atualiza = function(){
        contexto = areaJogo.context;
        if(this.tipo == "texto"){
            contexto.font = this.altura + " " + this.largura;
            contexto.fillStyle = cor;
            contexto.fillText(this.texto, this.x, this.y);
        }else{
            contexto.fillStyle = cor,
            contexto.fillRect(this.x, this.y, this.altura, this.largura); 
        }
       
    },

    this.novaPosicao = function(){
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

    },

    this.bater = function(obj){
        let esquerda = this.x;
        let direita = this.x + this.largura;
        let superior = this.y;
        let inferior = this.y + this.altura;

        let objEsquerda = obj.x;
        let objDireita = obj.x + obj.altura;
        let objSuperior = obj.y;
        let objInferior = obj.y + obj.largura;

        let batida = true;

        if(
            (inferior < objSuperior) ||
            (superior > objInferior) ||
            (direita < objEsquerda)  ||
            (esquerda > objDireita)  
        ){
            batida = false;
        

        }

            return batida;

    }


}
function atualizaAreaJogo(){
    let x, y;

    for(i = 0; i < obstaculo.length; i += 1){
        if(personagemObj.bater(obstaculo[i])){
            areaJogo.Parar();
            return;
        }
      
    }

    if(areaJogo.key == 'ArrowUp'){
        personagemObj.velocidadeY -= 0.1;
    }

    if(areaJogo.key == 'ArrowDown'){
        personagemObj.velocidadeY += 0.1;
    }

    if(areaJogo.key == 'ArrowLeft'){
        personagemObj.velocidadeX -= 0.1;
    }

    if(areaJogo.key == 'ArrowRight'){
        personagemObj.velocidadeX += 0.1;
    }

        areaJogo.limpar();
        areaJogo.frame += 1;
        if(areaJogo.frame == 1 || contarIntervalos(150)){
            x = areaJogo.canvas.width;
            minAltura = 20;
            maxAltura  = 200;
            altura = Math.floor(Math.random()*(maxAltura-minAltura+1)+minAltura);
             minVazio = 90;
             maxVazio = 100;
             vazio = Math.floor(Math.random()*(maxVazio-minVazio+1)+maxVazio);
            obstaculo.push(new componente('white',x,0,altura,10));
            obstaculo.push(new componente('white',x,altura+vazio,x - altura - vazio,10));
        }

        for(i = 0; i < obstaculo.length;i++){
            obstaculo[i].x += -1;
            obstaculo[i].atualiza();

        }
        pontos.texto = "Pontos: " + areaJogo.frame;
        pontos.atualiza();
        personagemObj.novaPosicao();
        personagemObj.atualiza();

        }
    

function subir(){
    personagemObj.velocidadeY -= 1;

}

function descer(){
    personagemObj.velocidadeY += 1;

}

function esquerda(){
    personagemObj.velocidadeX -= 1;

}

function direita(){
    personagemObj.velocidadeX += 1;

}

function frear(){
    personagemObj.velocidadeX = 0;
    personagemObj.velocidadeY = 0;
}