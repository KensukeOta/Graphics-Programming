"use strict";

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
 * イメージのインスタンス
 * @type {Image}
 */
let image = null;
/**
 * 実行開始時のタイムスタンプ
 * @type {number}
 */
let startTime = null;
/**
 * 自機のX座標
 * @type {number}
 */
let viperX = CANVAS_WIDTH / 2; // ここでは仮でcanvasの中心位置
/**
 * 自機のY座標
 * @type {number}
 */
let viperY = CANVAS_HEIGHT / 2; // ここでは仮でcanvasの中心位置

window.addEventListener("load", () => {
  // ユーティリティクラスを初期化
  util = new Canvas2DUtility(document.body.querySelector("#main_canvas"));
  // ユーティリティクラスからcanvasを取得
  canvas = util.canvas;
  // ユーティリティクラスから2dコンテキストを取得
  ctx = util.context;

  // 最初に画像の読み込みを開始する
  util.imageLoader("./image/viper.png", (loadedImage) => {
    // 引数経由で画像を受け取り変数に代入しておく
    image = loadedImage;
    // 初期化処理を行う
    initialize();
    // イベントを設定する
    eventSetting();
    // 実行開始時のタイムスタンプを取得する
    startTime = Date.now();
    // 描画処理を行う
    render();
  });
}, false);

function initialize() {
  // canvasの大きさを設定
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
}

/**
 * イベントを設定する
 */
function eventSetting() {
  // キーの押下時に呼び出されるイベントリスナーを設定する
  window.addEventListener("keydown", (event) => {
    // 入力されたキーに応じて処理内容を変化させる
    switch (event.key) {
      case "ArrowLeft": // 左矢印キー
        viperX -= 10
        break;
      case "ArrowRight": // 右矢印キー
        viperX += 10
        break;
      case "ArrowUp": // 上矢印キー
        viperY -= 10
        break;
      case "ArrowDown": // 下矢印キー
        viperY += 10
        break;
    }
  }, false);
}

function render() {
  // 描画前に画面全体を不透明な明るいグレーで塗りつぶす
  util.drawRect(0, 0, canvas.width, canvas.height, "#eeeeee");

  // 現在までの経過時間を取得する（ミリ秒を秒に変換するため1000で除算）
  let nowTime = (Date.now() - startTime) / 1000;
  
  // 画像を描画する（現在の viper の位置に準じた位置に描画する）
  ctx.drawImage(image, viperX, viperY);

  // 恒常ループのために描画処理を再帰呼び出しする
  requestAnimationFrame(render);
}
