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
    // 描画処理を行う
    render();
  });
}, false);

function initialize() {
  // canvasの大きさを設定
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
}

function render() {
  // 描画前に画面全体を不透明な明るいグレーで塗りつぶす
  util.drawRect(0, 0, canvas.width, canvas.height, "#eeeeee");
  // 画像を描画する
  ctx.drawImage(image, 100, 100);
}
