export default class Box {
    constructor(ref, value) {
        this.ref = ref;
        this.value = (typeof value !== 'undefined') ? value : 0;
        this.candidates = [];
    }

    get colRef() {
        return this.ref.substr(0, 1);
    }

    get rowRef() {
        return this.ref.substr(1);
    }

    get squareRef() {
        if (this.rowRef <= 3) {
            if (this.colRef <= 'C')
                return 1;
            else if (this.colRef <= 'F')
                return 2;
            else
                return 3;
        }
        else if (this.rowRef <= 6) {
            if (this.colRef <= 'C')
                return 4;
            else if (this.colRef <= 'F')
                return 5;
            else
                return 6;
        }
        else {
            if (this.colRef <= 'C')
                return 7;
            else if (this.colRef <= 'F')
                return 8;
            else
                return 9;
        }
    }
}