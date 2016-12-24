import jsPdf from 'jspdf';

export default class MultilineText extends jsPdf {
    constructor() {
        super({
            orientation: "p",
            unit: "in",
            format: "letter"
        }, '', '', '');

        this._margin = 0.5;

        this.setLineWidth(1/100);

        this._verticalOffset = this._margin;
        //this.setLineWidth(220);

        this.multilineText = (x, y, value) => {
            let size = 12;

            let lines = this.splitTextToSize(value, 7.5);
            let lastLine = 0;

            for(let i = 0, z = lines.length; i < z; i++) {
                console.log(lines[i]);

                this.text(0.75, this._verticalOffset + size / 100, lines[i]);
                this._verticalOffset += (1 + 0.75) * size / 100;

                if (this._verticalOffset > 11 - this._margin) {
                    lastLine = i;
                    this.addPage();
                    this._verticalOffset = this._margin;
                }
            }
        };
    }
}