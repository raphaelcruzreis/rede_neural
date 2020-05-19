function sigmoid(x) {
    return 1 / (1+ Math.exp(-x));
}

function dsigmoid(x) {
    return x * (1-x);
}

class RedeNeural{
    constructor(i_nodes, h_nodes, o_nodes) {
        this.i_nodes = i_nodes;
        this.h_nodes = h_nodes;
        this.o_nodes = o_nodes;

        this.bias_ih = new Matrix(this.h_nodes, 1);
        this.bias_ih.randomize();
        this.bias_ho = new Matrix(this.o_nodes, 1);
        this.bias_ho.randomize();

        this.weigths_ih = new Matrix(this.h_nodes, this.i_nodes);
        this.weigths_ih.randomize();

        this.weigths_ho = new Matrix(this.o_nodes, this.h_nodes);
        this.weigths_ho.randomize();

        this.learning_rate = 0.1;
    }

    train(arr, target){
        // INPUT -> HIDDEN
        let input = Matrix.arrayToMatrix(arr);
        let hidden = Matrix.multiply(this.weigths_ih, input);
        hidden = Matrix.add(hidden, this.bias_hi);

        hidden.map(sigmoid)

        //HIDDEN -> OUTPUT
        // d(Sigmoid) = Output * (1 - Output)
        let  output = Matrix.multiply(this.weigths_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);

        //BACKPROPAGATION

        //OUTPUT -> HIDDEN
        let expeted = Matrix.arrayToMatrix(target);
        let output_error = Matrix.subtract(expected, output);
        let d_output = Matrix.map(output, dsigmoid);
        let hidden_T = Matrix.transpose(hidden);

        let gradient = Matrix.hadamard(d_output, output_error);
        gradient = Matrix.escalar_multiply(gradient.this.learning_rate);

        // Adjust Bias O->H
        this.bias_ho = Matrix.add(this.bias_ho, gradient);

        // Adjust Weigths O->H
        let weigths_ho_deltas = Matrix.multiply(gradient, hidden_T);

    }
}