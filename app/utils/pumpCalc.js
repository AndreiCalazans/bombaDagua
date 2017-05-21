var Q;
var D;
var AS;
var AR;
var lEquivalente;
var comprimento;
var Re;
var F;
var Hd;
var Hl;
var Vel;
var g = 9.8196;

import moody from './moody';


var fluids = {
    water: {
        name: 'water',
        density: 1000, 
        dynamic_viscosity: 0.001,
        vapor_pressure: 2300  

    }

}
;


var materials = {
  pvc: {
    rugosidade: 0.005
  }
};





///helpers 

function toPesoEspecifico( density ) {
  return density * g;
}


function calcVelocity(q , d) {
  return ((q)/(Math.pow(d , 2) * Math.PI  / 4));
}


function Reynolds( d , v , density , viscosityDynamic) {
  return ((d * v * density )/ viscosityDynamic);
}

//Reynolds( 0.04 , 0.11053310 , 1000 , 0.001);

function frictionFactor(Re , eD) {
  if (Re < 2300) {
    return (64/Re);
  } else {
    return false;
  }
}

function relative_e( e , d) {
    return e/d;
}

function perdasLocalizada( Ks , v) {
  return (Ks * Math.pow(v , 2) / (2* g));
}


function perdasDistribuidas(F , comprimento , D , v) {
    return (F * comprimento/D * Math.pow( v , 2) / (2 * g));
}



function NPSHd(patm , pv , pesoEsp , AS , Ht) {
  return ((patm/pesoEsp) - (pv / pesoEsp ) - AS - Ht);
}

//NPSHd(101375 , 2300 ,9810 , 4, 0.084);

function pressaoHM(H , Ht ,  v) {
  return (H - Ht - (Math.pow(v , 2)/(2 * g)));
}

//pressaoHM( 14 , 0.084 , 0.11);
///////////////////////

export default function calculatePump( q , AS , AR , L , Mat , Fluid , Equips ,  D ) {
    // this should return an object with the NPSHd , Preasure and Flow(q)

    let Vel = calcVelocity( q , D);
    let Re = Reynolds(D , Vel , fluids[Fluid].density , fluids[Fluid].dynamic_viscosity );
    let rel_e = relative_e(materials[Mat].rugosidade , D);
    let FrictionFactor = moody(Re , rel_e );
    
    let Ks = 0.8;  // soma dos aparelhos localizados
    let Hd = perdasDistribuidas( FrictionFactor , L , D , Vel );
    let Hl = perdasLocalizada(Ks , Vel);
    let PerdaTotal = Hd + Hl;
    let peso_especifico = toPesoEspecifico(fluids[Fluid].density);
    let altura_total = Math.abs(AS) + Math.abs(AR); 
    let patm = 101375;

    var response =  {
        npsh: NPSHd(patm , fluids[Fluid].vapor_pressure , peso_especifico , AS , PerdaTotal ),
        total_pressure: pressaoHM( altura_total , PerdaTotal , Vel),
        vazao: q
    };

    return response;
}