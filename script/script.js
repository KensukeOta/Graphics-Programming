"use strict";

(() => {
  /**
   * キーの押下状態を調べるためのオブジェクト
   * このオブジェクトはプロジェクトのどこからでも参照できるように
   * window オブジェクトのカスタムプロパティとして設定する
   * @global
   * @type {object}
   */
  window.isKeyDown = {};
  /**
   * canvasの幅
   * @type {number}
   */
  const CANVAS_WIDTH = 640;
  /**
   * canvasの高さ
   * @type {number}
   */
  const CANVAS_HEIGHT = 480;
  /**
   * ショットの最大個数
   * @type {number}
   */
  const SHOT_MAX_COUNT = 10;
  /**
   * Canvas2D API をラップしたユーティリティクラス
   * @type {Canvas2DUtility}
   */
  let util = null;
  /**
   * 描画対象となる Canvas Element
   * @type {HTMLCanvasElement}
   */
  let canvas = null;
  /**
   * Canvas2D API のコンテキスト
   * @type {CanvasRenderingContext2D}
   */
  let ctx = null;
  /**
   * 実行開始時のタイムスタンプ
   * @type {number}
   */
  let startTime = null;
  /**
   * 自機キャラクターのインスタンス
   * @type {Viper}
   */
  let viper = null;
  /**
   * ショットのインスタンスを格納する配列
   * @type {Array<Shot>}
   */
  let shotArray = [];
  
  window.addEventListener("load", () => {
    // ユーティリティクラスを初期化
    util = new Canvas2DUtility(document.body.querySelector("#main_canvas"));
    // ユーティリティクラスからcanvasを取得
    canvas = util.canvas;
    // ユーティリティクラスから2dコンテキストを取得
    ctx = util.context;
  
    // 初期化処理を行う
    initialize();
    // インスタンスの状態を確認する
    loadCheck();
  }, false);
  
  /**
   * canvasやコンテキストを初期化する
   */
  function initialize() {
    // canvasの大きさを設定
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  
    // 自機キャラクターを初期化する
    viper = new Viper(ctx, 0, 0, 64, 64, "./image/viper.png");
    // 登場シーンからスタートするための設定を行う
    viper.setComing(
      CANVAS_WIDTH / 2,    // 登場演出時の開始X座標
      CANVAS_HEIGHT + 50,  // 登場演出時の開始Y座標
      CANVAS_WIDTH / 2,    // 登場演出を終了とするX座標
      CANVAS_HEIGHT - 100, // 登場演出を終了とするY座標
    );

    // ショットを初期化する
    for (let i = 0; i < SHOT_MAX_COUNT; ++i) {
      shotArray[i] = new Shot(ctx, 0, 0, 32, 32, "./image/viper_shot.png");
    }

    // ショットを自機キャラクターに設定する
    viper.setShotArray(shotArray);
  }

  /**
   * インスタンスの準備が完了しているか確認する
   */
  function loadCheck() {
    // 準備完了を意味する真偽値
    let ready = true;
    // AND演算で準備完了しているかチェックする
    ready = ready && viper.ready;
    // 同様にショットの準備状況も確認する
    shotArray.map((v) => {
      ready = ready && v.ready;
    });

    // すべての準備が完了したら次の処理に進む
    if (ready === true) {
      // イベントを設定する
      eventSetting();
      // 実行開始時のタイムスタンプを取得する
      startTime = Date.now();
      // 描画処理を開始する
      render();
    } else {
      // 準備が完了していない場合は0.1秒ごとに再帰呼び出しする
      setTimeout(loadCheck, 100);
    }
  }
  
  /**
   * イベントを設定する
   */
  function eventSetting() {
    // キーの押下時に呼び出されるイベントリスナーを設定する
    window.addEventListener("keydown", (event) => {
      // キーの押下状態を管理するオブジェクトに押下されたことを設定する
      isKeyDown[`key_${event.key}`] = true;
    }, false);
    // キーが離された時に呼び出されるイベントリスナーを設定する 
    window.addEventListener("keyup", (event) => {
      isKeyDown[`key_${event.key}`] = false; // キーが離されたことを設定する
    }, false);
  }
  
  function render() {
    // グローバルなアルファを必ず1.0で描画処理を開始する
    ctx.globalAlpha = 1.0
    // 描画前に画面全体を不透明な明るいグレーで塗りつぶす
    util.drawRect(0, 0, canvas.width, canvas.height, "#eeeeee");
    // 現在までの経過時間を取得する（ミリ秒を秒に変換するため1000で除算）
    let nowTime = (Date.now() - startTime) / 1000;
  
    // 自機キャラクターの状態を更新する
    viper.update();

    // ショットの状態を更新する
    shotArray.map((v) => {
      v.update();
    });
    
    // 恒常ループのために描画処理を再帰呼び出しする
    requestAnimationFrame(render);
  }
})();
