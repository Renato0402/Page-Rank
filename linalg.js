class Linalg {

   


    mul(a, b) {

        //Multiplicando numero (a) para cada elemento da Matriz (b)

        if (typeof (a) == "number") {

            if (!(b instanceof Matriz)) throw "O parametro b deve ser um objeto matriz"

            var res = new Matriz(b.rows, b.cols)

            for (var i = 1; i <= b.rows; i++) {

                for (var j = 1; j <= b.cols; j++) {

                    res.set(i, j, a * b.get(i, j));
                }

            }

            return res

        }

        //Multiplicando cada elemento da Matriz (a) com cada elemento da Matriz (b)

        else if (typeof (a) == "object") {


            if (!(a instanceof Matriz)) throw "O parametro a deve ser um objeto matriz"
            if (!(b instanceof Matriz)) throw "O parametro b deve ser um objeto matriz"

            if (!(a.rows == b.rows && a.cols == b.cols)) throw "As matrizes não possuem as mesmas dimensões."

            var res = new Matriz(a.rows, a.cols)

            for (var i = 1; i <= a.rows; i++) {

                for (var j = 1; j <= a.cols; j++) {

                    res.set(i, j, a.get(i, j) * b.get(i, j))

                }



            }

            return res

        }

    }

    div(a, b) {

        //Dividindo cada elemento da Matriz (a) com cada elemento da Matriz (b)

        if (!(a instanceof Matriz)) throw "O parametro a deve ser um objeto matriz"
        if (!(b instanceof Matriz)) throw "O parametro b deve ser um objeto matriz"

        if (!(a.rows == b.rows && a.cols == b.cols)) throw "As matrizes não possuem as mesmas dimensões."

        var res = new Matriz(a.rows, a.cols)

        for (var i = 1; i <= a.rows; i++) {

            for (var j = 1; j <= a.cols; j++) {

                if (b.get(i, j) == 0) throw "Não pode fazer a divisão pois a matriz B tem um elemento 0"

                res.set(i, j, a.get(i, j) / b.get(i, j))

            }



        }

        return res

    }

    trans(a) {

        // Transposta da Matriz

        if (!(a instanceof Matriz)) throw "O parametro a deve ser um objeto matriz"

        var res = new Matriz(a.cols, a.rows)


        for (var i = 1; i <= a.cols; i++) {

            for (var j = 1; j <= a.rows; j++) {

                res.set(i, j, a.get(j, i))

            }



        }



        return res
    }

    multi(a, b) {

        // Multiplicando 2 Matrizes

        //if (!(a instanceof Matriz)) throw "O parametro a deve ser um objeto matriz"
        //if (!(b instanceof Matriz)) throw "O parametro b deve ser um objeto matriz"

        //if (!(a.cols == b.rows)) throw "Quantidade de colunas de A é diferente da quantidade de linhas de B"

        var res = new Matriz(a.rows, b.cols)

        for (var i = 1; i <= a.rows; i++) {

            for (var j = 1; j <= b.cols; j++) {

                for (var k = 1; k <= b.rows; k++) {

                    res.set(i, j, a.get(i, k) * b.get(k, j) + res.get(i, j))

                }
            }

        }

        return res

    }


   

  


    pageRank(a){


        var lambidaAnt = Infinity;

        var a0 = this.mul(1/this.norma(this.somaLinhas(a)), this.somaLinhas(a))

        var aTa = this.multi(this.trans(a), a);

        var aTaa0 = this.multi(aTa,a0);

        var a1 = this.mul(1/this.norma(aTaa0), aTaa0)

        var lambida = this.div(this.multi(this.trans(aTaa0),a1) , this.multi(this.trans(a1),a1));


        while(Math.abs((lambida.get(1,1) - lambidaAnt) / lambida.get(1,1)) > 1e-5 ){

            a0 = a1

            aTaa0 = this.multi(aTa,a0);

            a1 = this.mul(1/this.norma(aTaa0), aTaa0)

            lambidaAnt = lambida.get(1,1)

            lambida = this.div(this.multi(this.trans(aTaa0),a1) , this.multi(this.trans(a1),a1));

            
        }

        // IMPRIME O(S) SITE(S) DE MAIOR RELEVANCIA

        document.write("Site(s) de maior relevancia: " + this.pegaMaior(a1)[1] + "<br>")

        document.write("Valor de relevancia: " + this.pegaMaior(a1)[0])

        // RETORNA A MATRIZ COM AS RELEVANCIAS E O VALOR DO SITE MAIS RELEVANTE
        
        return [a1, this.pegaMaior(a1)[0]];

    }


    somaLinhas(a){


        var soma = 0;

        var res = new Vector(a.rows)

        for(var j = 1; j <= a.cols; j++){


            for(var i = 1; i <= a.rows; i++){

                soma += a.get(i,j)

            }

            res.set(j,soma);

            soma = 0;

        }

        return res

    }


    norma(a){

        var x = 0;

        for(var i = 1; i <= a.rows; i++){

         x += Math.pow(a.get(i,1), 2);

        }

        return Math.sqrt(x);

    }



    pegaMaior(a){

        var maior = -Infinity;

        var index = [];

        for(var i = 1; i <= a.rows; i++){

            if(maior < a.get(i,1)){
 
                 maior = a.get(i,1)
 
            }
 
 
         }


         for(var i = 1; i <= a.rows; i++){

            if(maior == a.get(i,1)){

                index.push(i)

           }


         }

         return [maior, index];

    }




}

