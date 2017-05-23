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
import React from 'react';
import {Redirect } from 'react-router-dom';

import moody from './moody';

var materials = {
  pvc: {
    rugosidade: 0.005
  },
  "ferro fundido": {
    rugosidade: 0.26
  },
  'ferro galvanizado': {
    rugosidade: 0.15
  },
  'ferro fundido asfaltado': {
    rugosidade: 0.12
  }
  ,'aço comercial': {
    rugosidade: 0.046
  },
  'concreto': {
    rugosidade: 0.3
  },
  'madeira': {
    rugosidade: 0.2
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

function pressaoHM(H , Ht ,  v) {
  return (H - Ht - (Math.pow(v , 2)/(2 * g)));
}


export default function calculatePump( q , AS , AR , L , Visc , Patm , Pv , Densidade, Mat , Equips ,  D ) {
    // this should return an object with the NPSHd , Preasure and Flow(q)
    let Vel = calcVelocity( q , D);
    let Re = Reynolds(D , Vel , Densidade , Visc );
    let rel_e = relative_e(materials[Mat].rugosidade , D);
    let FrictionFactor = moody(Re , rel_e );
    
    let Ks = 0.8;  // soma dos aparelhos localizados
    let Hd = perdasDistribuidas( FrictionFactor , L , D , Vel );
    let Hl = perdasLocalizada(Ks , Vel);
    let PerdaTotal = Hd + Hl;
    let peso_especifico = toPesoEspecifico(Densidade);
    let altura_total = Math.abs(AS) + Math.abs(AR); 
    let patm = 101375;

    var response =  {
        npsh: NPSHd(patm , Pv , peso_especifico , AS , PerdaTotal ),
        total_pressure: pressaoHM( altura_total , PerdaTotal , Vel),
        vazao: q
    };
    return response;
}