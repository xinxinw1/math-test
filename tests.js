title("Perfectly Precise Math Library Testing");

var tsver = "5.0-1";

aload(["lib/tools/tools.js?v="+tsver, "lib/prec-math/prec-math.js?v="+tsver], function (){

//// Converters ////

function testnum(a, neg, dat, exp){
  test(a + ".neg", neg);
  test(a + ".dat", dat);
  test(a + ".exp", exp);
}

testnum('R.mkreal("35.35")', false, "3535", -2);
testnum('R.mkreal("0.0001")', false, "1", -4);
testnum('R.mkreal("-0.0001")', true, "1", -4);
testnum('R.mkreal("0.000012")', false, "12", -6);
testnum('R.mkreal("-352534000")', true, "352534", 3);
testnum('R.mkreal("")', false, "", 0);
testnum('R.mkreal("10000")', false, "1", 4);

function teststr(a, x){
  test('R.tostr(' + a + ')', x);
}

teststr('R.num(true, "2534", 3)', "-2534000");
teststr('R.num(false, "123435", -3)', "123.435");
teststr('R.num(false, "123435", -10)', "0.0000123435");
teststr('R.num(true, "123435", -10)', "-0.0000123435");
teststr('R.num(false, "", 0)', "");

testnum('R.real(23.53)', false, "2353", -2);
testnum('R.real(-23.53)', true, "2353", -2);
testnum('R.real(0.0001)', false, "1", -4);
testnum('R.real("35.35")', false, "3535", -2);
testnum('R.real(R.num(false, "35", 2))', false, "35", 2);
test('R.real(".2343")', false);
test('R.real("aseewf")', false);
test('R.real("3..3532")', false);
test('R.real("--23432")', false);
test('R.real(true)', false);

test('R.realint(23.53)', false);
test('R.realint(-23.53)', false);
test('R.realint(0.0001)', false);
test('R.realint("35.35")', false);
test('R.realint(253)', 253);
test('R.realint("153")', 153);
test('R.realint(R.num(false, "35", 2))', 3500);
test('R.realint(R.num(false, "35", -2))', false);
test('R.realint(".2343")', false);
test('R.realint("aseewf")', false);
test('R.realint("3..3532")', false);
test('R.realint("--23432")', false);
test('R.realint(true)', false);

//// Int functions ////

test('R.addInt("5", "5")', "10");
test('R.addInt("43", "25343")', "25386");
test('R.addInt("25732842", "2")', "25732844");

test('R.subInt("5", "5")', "");
test('R.subInt("43", "25343")', "Error");
test('R.subInt("25732842", "2")', "25732840");
test('R.subInt("453", "403")', "50");

testnum('R.divInt("1", "3", 1)', false, "3", -1);
testnum('R.divInt("2", "3", 3)', false, "667", -3);
teststr('R.divInt("1257328472933423523", "63728579374218789798791", 100)', "0.0000197294288571898101264910536458231002542223526094727295673986069811829366435877221217623394342043");

//// Processing functions ////

testnum('R.trimr(R.num(true, "1500", 1))', true, "15", 3);
testnum('R.triml(R.num(true, "001500", 1))', true, "1500", 1);

function testarr(a, x, f){
  if (f === udf)f = test;
  for (var i = 0; i < x.length; i++){
    f(a + "[" + i + "]", x[i]);
  }
}

testnum('R.matexp(R.num(true, "23", 3), R.num(false, "1", 5))[0]', true, "23", 3);
testnum('R.matexp(R.num(true, "23", 3), R.num(false, "1", 5))[1]', false, "100", 3);
testnum('R.matexp(R.num(false, "", 0), R.num(false, "23", 3))[0]', false, "", 0);
testnum('R.matexp(R.num(false, "", 0), R.num(false, "23", 3))[1]', false, "23000", 0);
testnum('R.matexp(R.num(false, "", 0), R.num(false, "23", -3))[0]', false, "", -3);
testnum('R.matexp(R.num(false, "", 0), R.num(false, "23", -3))[1]', false, "23", -3);

//testnum('R.pad(R.num(true, "23", 3), R.num(false, "1", 5))[0]', true, "023", 3);
//testnum('R.pad(R.num(true, "23", 3), R.num(false, "1", 5))[1]', false, "100", 3);

//// Comparison functions ////

test('R.gt(R.num(false, "3", 0), R.num(false, "4", 0))', false);
test('R.gt(R.num(false, "3", 1), R.num(false, "4", 0))', true);
test('R.gt(R.num(true, "3", 1), R.num(false, "4", 0))', false);

testnum('R.add(R.num(false, "243", -2), R.num(false, "54215342412523", -10))', false, "54239642412523", -10);
testnum('R.add(R.num(false, "5", 0), R.num(false, "5", 0))', false, "1", 1);

teststr('R.sub(R.mkreal("5"), R.mkreal("5"))', "");
testnum('R.sub(R.num(false, "155", 0), R.num(false, "135", 0))', false, "2", 1);
test('R.sub(R.num(true, "155", 0), R.num(false, "135", 0))', R.add(R.num(true, "155", 0), R.num(true, "135", 0)), R.is);

teststr('R.mul(R.mkreal("15"), R.mkreal("8"))', "120");
teststr('R.mul(R.mkreal("12573294723952903415"), R.mkreal("23473284732827"))', "295136527085097957155099210904205");
teststr('R.mul(R.mkreal("-12573294723952903415"), R.mkreal("-23473284732827"))', "295136527085097957155099210904205");
teststr('R.mul(R.mkreal("-12573294723952903415"), R.mkreal("23473284732827"))', "-295136527085097957155099210904205");

teststr('R.div(R.mkreal("1"), R.mkreal("3"), 3)', "0.333");
teststr('R.div(R.mkreal("-1531"), R.mkreal("2534"), 10)', "-0.6041831097");

teststr('R.rnd(R.mkreal("1234.535248923"), 2)', "1234.54");
teststr('R.rnd(R.mkreal("-9999.535248923"))', "-10000");

});