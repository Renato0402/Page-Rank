class Matriz{
	

	constructor(rows,cols,elements){
		
		this.rows = rows
		this.cols = cols
		this.elements = elements

		if(elements == undefined){

			this.elements = new Array(this.rows * this.cols)

			for(var i = 0 ; i < this.rows * this.cols; i++) {
				
				this.elements[i] = 0
				
			}

		}else{

			if(this.rows * this.cols == elements.length){

				this.elements = elements

			}else{

				throw "a quantidade de elementos não é compativel com a quantidade de linhas e colunas";

			}

		}

	}


	 get(i,j){
        
        if(i <= 0 || i > this.rows) throw "O indice da linha não é compativel com as dimensões da matriz."
        if(j <= 0 || j > this.cols) throw "O indice da coluna não é compativel com as dimensões da matriz."
		return this.elements[(j-1) + (i-1) * this.cols];

	}


	 set(i,j,value){

        if(i <= 0 || i > this.rows) throw "O indice da linha não é compativel com as dimensões da matriz."
        if(j <= 0 || j > this.cols) throw "O indice da coluna não é compativel com as dimensões da matriz."
		this.elements[(j-1) + (i-1) * this.cols] = value;


	}

}