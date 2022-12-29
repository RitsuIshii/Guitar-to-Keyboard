(function() {

    var btn = document.getElementById('btn');  
    var keyboard = document.getElementById('keyboard');  
    var guitar = document.getElementById('stripe1');
    var rbtn = document.getElementById('reset');
    var cbtn = document.getElementById('chord');
    var state = false;  // 状態監視用フラグ
    var synth;
    var div;  // div要素の格納
    var div_r;
    var div_c = [];
    var div_ch = [];
    
    
    // 「電源ON」ボタンのイベント処理
    btn.addEventListener('touchstart', init);
    btn.addEventListener('click', init);
    
    
    // 「押した」状態のイベント処理
    keyboard.addEventListener('mousedown', playKeyboard);
    keyboard.addEventListener('touchstart', playKeyboard);
    guitar.addEventListener('mousedown', playGuitar);
      
    // 「離した」状態のイベント処理
    keyboard.addEventListener('mouseup', offSound);
    keyboard.addEventListener('touchend', offSound);
    guitar.addEventListener('mouseup', offSound);

    //リセットボタン
    rbtn.addEventListener('click', reset);
    //コードボタン
    cbtn.addEventListener('click', chord)
    // 初期設定
    function init() {
      state = true;
      synth = new Tone.PolySynth().toMaster();
      btn.style.display = 'none';
      rbtn.style.opacity = 1;
      cbtn.style.opacity = 1;
      keyboard.style.opacity = 1;
      guitar.style.opacity = 1;
    }
    
    
    function playKeyboard(e) {
      if(!state) return;  // falseなら処理を実行しない
      
      // 「キーボード」はkeyCodeを、「マウス」はdata属性を取得する
      var key = e.keyCode || e.target.dataset.key;
    
      // 「key」を使って「div要素」を取得する
      div = keyboard.querySelector('div[data-key="'+ key +'"]');
      
      // 「div要素」が取得できたかチェック
      if(div) {
      
        // div要素のテキスト(音名)を代入する
        synth.triggerAttackRelease(key, '8n');
        
        // 状態をfalseにして、連続的な発音を防止する
        // state = false;
        div.classList.toggle('activekey');
        
      }
      // 指板で対応する音の色を変えてわかるようにする
      var div_g = guitar.querySelector('div[data-key="'+ key +'"]')
      if(div_g){
        div_g.classList.toggle('activekey');
      }
    }

    function playGuitar(e) {
      if(!state) return;  // falseなら処理を実行しない
      
      // 「キーボード」はkeyCodeを、「マウス」はdata属性を取得する
      var key = e.keyCode || e.target.dataset.key;
      var str = e.target.dataset.str
      // 「key」を使って「div要素」を取得する
      div = guitar.querySelector('div[data-key="'+ key +'"]');
      str = guitar.querySelector('div[data-str="'+ str +'"]');
      // 「div要素」が取得できたかチェック
      if(div) {
      
        // div要素のテキスト(音名)を代入する
        synth.triggerAttackRelease(key, '8n');
        
        // 状態をfalseにして、連続的な発音を防止する
        // state = false;

        // 押された音の色を変えてわかりやすくする
        str.classList.toggle('activekey');
        
      }
      // 鍵盤で対応する音の色を変えてわかるようにする
      var div_k = keyboard.querySelector('div[data-key="'+ key +'"]')
      if(div_k){
        div_k.classList.toggle('activekey');
      }
    }

    
    function offSound(e) {
      if(div) {
        state = true;  // 再度、発音できるようにtrueへ戻す
        // div.classList.remove('activekey');
      }
      e.preventDefault(); //スマホの画面拡大防止
    }
    
    function reset(e) {
      div = document.querySelectorAll('.activekey')
      console.log(div_ch);
      for (var i = 0; i < div.length; i++){
        div_r = div[i];
        div_r.classList.remove('activekey');   
      }
      
    }

    function chord(e) {
      div = document.getElementsByClassName('activekey');
      for (var i = 0; i < div.length; i++){
        div_r = div[i];
        div_c.push(div_r.dataset.key);
      }
      div_ch = Array.from(new Set(div_c));
      console.log(div_ch);
      synth.triggerAttackRelease(div_ch, '4n');
      div_c.length = 0;
    }
    })();