
const xWide = 40;

const yHigh = 20;

const field = [];


for(let y=0;y<yHigh;y++){
    const row = [];

    for (let x = 0; x< xWide;x++){
        row.push('?');
    }
    field.push(row);
}

const frontier = [];

function carve(y,x){
    const extra = [];

    field[y][x] = '.';
    
    if(x > 0){
        if(field[y][x-1] ==='?'){
            field[y][x-1] = ',';
            extra.push()
        }
    }
}


const xChoice = Math.floor(Math.random()*xWide-1);
const yChoice = Math.floor(Math.random()*yHigh-1);

