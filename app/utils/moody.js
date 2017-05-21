export default function moody( Re , rel_e , n) {
  
  if( Re <=3000 ) {
    return 64/Re;
  } 
  
  
var x;
var y;
var y_;
var A;
var B;

A = rel_e/3.7;
B = 2.51/Re;
  
if (!n) {
  n = 3;
}

x = -1.8* Math.log((6.9/Re) * Math.pow(A , 1.11));

for(var i = 0 ; i < n ; i++ ) {

  y = x + 2 * Math.log10( A + B * x);

  y_ = 1 + 2 * ( B / Math.LN10)/ (A+B * x);
  
  x = x - y/y_;
  
}
return 1/(Math.pow(x , 2));
  
}
