package model

import play.api.libs.json._

/**
 * Created by oguzhan on 8/21/14.
 */

/**
 * Holds users cart
 * @param itemList Sequence of (productId, quantity) tuples
 */
case class Cart(id: Int, cid: Int, itemList: Seq[CartItem])

/**
 * @param p Product ID
 * @param q Quantity
 */
case class CartItem(p: Int, q: Int)

object CartItem {
  implicit val jsonConverter = Json.format[CartItem]
}

object Cart {

  implicit val jsonConverter = Json.format[Cart]
  val initialState = Seq(
    Cart(1, 1, Seq(CartItem(1, 2), CartItem(3, 5))),
    Cart(2, 2, Seq(CartItem(1, 2))),
    Cart(3, 3, Seq(CartItem(1, 2)))
  )

  var all = initialState

  def get(id: Int): Option[Cart] = all.find(id == _.id)

  def getCartByUserId(id: Int) = all(0)

  def delCartByUserId(id: Int) = all.filter(_.cid != id)

  def checkoutCartByUserId(id: Int) = {
    all = all.filter(_.cid != id)
    all
  }

  def _seedDatabase {
    all = initialState
  }
}