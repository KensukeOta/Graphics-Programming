"use strict";

/**
 * 座標を管理するためのクラス
 */
class Position {
  /**
   * @constructor
   * @param {number} x - X座標
   * @param {number} y - Y座標
   */
  constructor(x, y) {
    /**
     * X座標
     * @type {number}
     */
    this.x = null;
    /**
     * Y座標
     * @type {number}
     */
    this.y = null;

    // setメソッドを使って値を設定
    this.set(x, y);
  }

  /**
   * 値を設定する
   * @param {number} x - 設定する X座標
   * @param {number} y - 設定する Y座標
   */
  set(x, y) {
    if (x != null) { this.x = x; }
    if (y != null) { this.y = y; }
  }
}

/**
 * キャラクター管理のための基幹クラス
 */
class Character {
  /**
   * 
   * @param {CanvasRenderingContext2D} ctx - 描画などに利用する2Dコンテキスト
   * @param {*} x - X座標
   * @param {*} y - Y座標
   * @param {*} life - キャラクターのライフ（生存フラグを兼ねる）
   * @param {*} image - キャラクターの画像
   */
  constructor(ctx, x, y, life, image) {
    /**
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = ctx;
    /**
     * @type {Position}
     */
    this.position = new Position(x, y);
    /**
     * @type {number}
     */
    this.life = life;
    /**
     * @type {Image}
     */
    this.image = image;
  }

  /**
   * キャラクターを描画する
   */
  draw() {
    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
    );
  }
}

/**
 * Viperクラス
 */
class Viper extends Character {
  /**
   * @constructor
   * @param {CanvasRenderingContext2D} ctx - 描画などに利用する2Dコンテキスト 
   * @param {number} x - X座標
   * @param {number} y - Y座標
   * @param {Image} image - キャラクターの画像
   */
  constructor(ctx, x, y, image) {
    super(ctx, x, y, 0, image);

    /**
     * viperが登場中かどうかを表すフラグ
     * @type {boolean}
     */
    this.isComing = false;
    /**
     * 登場演出を開始した際のタイムスタンプ
     * @type {number}
     */
    this.comingStart = null;
    /**
     * 登場演出を完了とする座標
     * @type {Position}
     */
    this.comingEndPosition = null;
  }
  
  /**
   * 登場演出に関する設定を行う
   * @param {number} startX - 登場開始時のX座標
   * @param {number} startY - 登場開始時のY座標
   * @param {number} endX - 登場終了とするX座標
   * @param {number} endY - 登場終了とするY座標
   */
  setComing(startX, startY, endX, endY) {
    this.isComing = true; // 登場中のフラグを立てる
    this.comingStart = Date.now(); // 登場開始時のタイムスタンプを取得する
    this.position.set(startX, startY); // 登場開始位置に自機を移動させる
    this.comingEndPosition = new Position(endX, endY); // 登場終了とする座標を設定する
  }
}
