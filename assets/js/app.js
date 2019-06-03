//生成した乱数を変数「random」に代入する
// let random = Math.random();

 //Math.random()に最大値+1を掛けることで範囲が決まる
// let random = Math.random() * 76;

//floor()メソッドを使って乱数を整数に
// let random = Math.floor( Math.random() * 76);

//最小値〜最大値の作り方　⇨⇨⇨　Math.random() * ( 最大値 - 最小値 ) + 最小値;
// let random = Math.floor( Math.random() * 75) + 1;

//最大値・最小値を引数に持つ関数
// function getRandom( min, max ) {
//     var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
//     return random;
// }

//関数に最大値と最小値を定義
// let result = getRandom( 1, 76 );
// console.log(result);


$(function() {

    //重複のない乱数の配列をつくる
    //乱数を入れる配列
    let randoms = [];

    //最小値と最大値
    let min = 1, max = 75;

    //最大値の数だけループさせる
    for(i = min; i <= max; i++){

        //ループ内で重複のチェック
        while(true){
            let tmp = intRandom(min, max);
            if(!randoms.includes(tmp)){
                randoms.push(tmp);
                break;
            };
        };
    };

    //min以上max以下の整数値の乱数を返す
    function intRandom(min, max){
        return Math.floor( Math.random() * (max - min + 1)) + min;
    };

    console.log(randoms);

    //配列のインデックスを定義
    let arrayNumber = 0

    //stopボタンを押した時の処理
    let status = true;

    $("#start").on("click", function() {
        if (status) {
            status = false;

            //ボタンのテキストを書き換え
            $(this).text("STOP");

            // 効果音（snare）スタート
            $("#snare").get(0).play();

            //数字をランダムに繰り返し表示
            roulette = setInterval(function() {
                let random = Math.floor( Math.random() * (max - min + 1));
                let number = randoms[random];
                $("#bingoNumber").text(number),
                100;
            });

        } else {
            status = true;

            // ランダム表示を終了
            clearInterval(roulette);

            //ボタンのテキストを書き換え
            $(this).text("START");

            // 効果音（snare）終了
            $("#snare").trigger("pause");
            $("#snare").currentTime = 0;

            //効果音（cymbal）
            $("#cymbal").get(0).play();

            //配列の値を定義
            let bingoNumber = randoms[arrayNumber];
            
            // spanタグに配列の値を追加
            $("#bingoNumber").text(bingoNumber);

            //配列の次のインデックスを用意
            arrayNumber += 1;

            //ビンゴで出た数字のテーブルを取得
            let table = $(".number-table").children().eq(bingoNumber - 1);

            //クラスを追加
            table.addClass("result");
        };

    });

});
