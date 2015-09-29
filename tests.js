title("Perfectly Precise Math Library Testing");

var tsver = "5.0-1";

aload(["lib/tools/tools.js?v="+tsver, "lib/prec-math/prec-math.js?v="+tsver], function (){

//// Converters ////

function testnum(a, neg, dat, exp){
  test(a + ".neg", neg);
  test(a + ".dat", dat);
  test(a + ".exp", exp);
}

testnum('R.mknum("35.35")', false, "3535", -2);
testnum('R.mknum("0.0001")', false, "1", -4);
testnum('R.mknum("-0.0001")', true, "1", -4);
testnum('R.mknum("0.000012")', false, "12", -6);
testnum('R.mknum("-352534000")', true, "352534", 3);
testnum('R.mknum("")', false, "", 0);
testnum('R.mknum("10000")', false, "1", 4);

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

test('R.siz(R.mknum("2534235"))', 7);
test('R.siz(R.mknum("-100000"))', 6);
test('R.siz(R.mknum("1"))', 1);
test('R.siz(R.mknum("-0.1"))', 0);
test('R.siz(R.mknum("0.01"))', -1);
test('R.siz(R.mknum(""))', -Infinity);

test('R.fig(R.mknum("23432500"))', 6);
test('R.fig(R.mknum("0.0001"))', 1);
test('R.fig(R.mknum("100000"))', 1);
test('R.fig(R.mknum(""))', 0);

testnum('R.chke(1928375932743297520384903285129038401328501)', false, "19283759327432977", 26);
testnum('R.chke(Infinity)', false, "17976931348623157", 292);

//// Comparison functions ////

test('R.gt(R.num(false, "3", 0), R.num(false, "4", 0))', false);
test('R.gt(R.num(false, "3", 1), R.num(false, "4", 0))', true);
test('R.gt(R.num(true, "3", 1), R.num(false, "4", 0))', false);

testnum('R.add(R.num(false, "243", -2), R.num(false, "54215342412523", -10))', false, "54239642412523", -10);
testnum('R.add(R.num(false, "5", 0), R.num(false, "5", 0))', false, "1", 1);
testnum('R.add(R.num(false, "95", 0), R.num(false, "5", 0))', false, "1", 2);
testnum('R.add(R.num(false, "1", 2), R.num(false, "", 0))', false, "1", 2);
testnum('R.add(R.num(false, "", 0), R.num(false, "", 0))', false, "", 0);

testnum('R.sub(R.mknum("5"), R.mknum("5"))', false, "", 0);
testnum('R.sub(R.num(false, "155", 0), R.num(false, "135", 0))', false, "2", 1);
test('R.sub(R.num(true, "155", 0), R.num(false, "135", 0))', R.add(R.num(true, "155", 0), R.num(true, "135", 0)), R.is);
testnum('R.sub(R.num(false, "1", 2), R.num(false, "", 0))', false, "1", 2);
testnum('R.sub(R.num(false, "", 0), R.num(false, "", 0))', false, "", 0);

testnum('R.mul(R.mknum("15"), R.mknum("8"))', false, "12", 1);
testnum('R.mul(R.mknum("32"), R.mknum("3125"))', false, "1", 5);
teststr('R.mul(R.mknum("12573294723952903415"), R.mknum("23473284732827"))', "295136527085097957155099210904205");
teststr('R.mul(R.mknum("-12573294723952903415"), R.mknum("-23473284732827"))', "295136527085097957155099210904205");
teststr('R.mul(R.mknum("-12573294723952903415"), R.mknum("23473284732827"))', "-295136527085097957155099210904205");

testnum('R.div(R.mknum("1"), R.mknum("3"), 3)', false, "333", -3);
testnum('R.div(R.mknum("2"), R.mknum("3"), 3)', false, "667", -3);
testnum('R.div(R.mknum("5"), R.mknum("-9"), 3)', true, "556", -3);
testnum('R.div(R.mknum("-1531"), R.mknum("2534"), 10)', true, "6041831097", -10);
testnum('R.div(R.mknum("234.1283579328472893749275329"), R.mknum("28915723894729375347297"), 30)', false, "8096921896", -30);
testnum('R.div(R.mknum("2.1"), R.mknum("23"), 10)', false, "913043478", -10);


teststr('R.rnd(R.mknum("1253.3535"), 1)', "1253.4");
teststr('R.rnd(R.mknum("1253.3535"), 2)', "1253.35");
teststr('R.rnd(R.mknum("-1253.3535"), 2)', "-1253.35");
teststr('R.rnd(R.mknum("-1253.3535"), 10)', "-1253.3535");
teststr('R.rnd(R.mknum("-1253.3535"), -2)', "-1300");
teststr('R.rnd(R.mknum("1253.3535"), -4)', "");
teststr('R.rnd(R.mknum("-9999.535248923"))', "-10000");

teststr('R.cei(R.mknum("1253.3535"), 1)', "1253.4");
teststr('R.cei(R.mknum("1253.3535"), 2)', "1253.36");
teststr('R.cei(R.mknum("-1253.3535"), 2)', "-1253.35");
teststr('R.cei(R.mknum("-1253.3535"), 10)', "-1253.3535");
teststr('R.cei(R.mknum("-1253.3535"), -2)', "-1200");
teststr('R.cei(R.mknum("1253.3535"), -4)', "10000");
teststr('R.cei(R.mknum("-9999.535248923"))', "-9999");

teststr('R.flr(R.mknum("1253.3535"), 1)', "1253.3");
teststr('R.flr(R.mknum("1253.3535"), 2)', "1253.35");
teststr('R.flr(R.mknum("-1253.3535"), 2)', "-1253.36");
teststr('R.flr(R.mknum("-1253.3535"), 10)', "-1253.3535");
teststr('R.flr(R.mknum("-1253.3535"), -2)', "-1300");
teststr('R.flr(R.mknum("1253.3535"), -4)', "");
teststr('R.flr(R.mknum("-9999.535248923"))', "-10000");

teststr('R.trn(R.mknum("1253.3535"), 1)', "1253.3");
teststr('R.trn(R.mknum("1253.3535"), 2)', "1253.35");
teststr('R.trn(R.mknum("-1253.3535"), 2)', "-1253.35");
teststr('R.trn(R.mknum("-1253.3535"), 10)', "-1253.3535");
teststr('R.trn(R.mknum("-1253.3535"), -2)', "-1200");
teststr('R.trn(R.mknum("1253.3535"), -4)', "");
teststr('R.trn(R.mknum("-9999.535248923"))', "-9999");

teststr('R.dec(R.mknum("23.45215"), -1)', "3.45215");
teststr('R.dec(R.mknum("23.45215"), 0)', "0.45215");
teststr('R.dec(R.mknum("23.45215"), 1)', "0.05215");
teststr('R.dec(R.mknum("-23.45215"), -1)', "-3.45215");
teststr('R.dec(R.mknum("-23.45215"), 0)', "-0.45215");
teststr('R.dec(R.mknum("-23.45215"), 1)', "-0.05215");


teststr('R.expTaylorFrac(R.mknum("0.1"), 1000)', "1.1051709180756476248117078264902466682245471947375187187928632894409679667476543029891433189707486536329171204854012445361537347145315787020068902997574505197515004866018321613310249357028047934586850494525645057122112661163770326284627042965573236001851138977093600284769443372730658853053002811154007820888910705403712481387499832879763074670691187054786420033729321209162792986139109713136202181843612999064371057442214441509033603625128922139492683515203569550353743656144372757405378395318324008280741587539066613515113982139135726893022699091000215648706791206777090283207508625041582515035160384730085864811589785637025471895631826720701700554046867490844416060621933317666818019314469778173494549497985045303406629427511807573756398858555866448811811806333247210364950515781422279735945226411105718464916466588898895425154437563356326922423993425668055030150187978568089290481077628854935380963680803086975643392286380110893491216896970405186147072881173903395370306903756052863966751655566156");

});