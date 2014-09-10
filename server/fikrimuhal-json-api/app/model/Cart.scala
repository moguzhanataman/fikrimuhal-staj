package model

import play.api.Logger
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
    Cart(1, 1, Seq(CartItem(1, 2), CartItem(2, 1))),
    Cart(2, 2, Seq(CartItem(3, 1), CartItem(1, 2))),
    Cart(3, 3, Seq(CartItem(2, 4), CartItem(3, 2), CartItem(1, 2))),
    Cart(4, 4, Seq(CartItem(4, 5), CartItem(2, 2), CartItem(1, 2), CartItem(3, 2))),
    Cart(5, 5, Seq(CartItem(4, 6))),
    Cart(6, 6, Seq(CartItem(3, 8))),
    Cart(7, 7, Seq(CartItem(1, 3), CartItem(3, 2), CartItem(2, 8))),
    Cart(8, 8, Seq(CartItem(1, 1), CartItem(3, 3)))
  )

  var cartStore = initialState

  def all = cartStore

  def getCart(id: Int): Option[Cart] = all.find(id == _.id)

  /**
   * Creates cart if given cart doesn't exists
   * Updates otherwise
   *
   * @param cart Cart to add or update
   */
  def createCart(cart: Cart) = {
    cartStore = cartStore :+ cart
  }

  def updateCart(cart: Cart) = {
    var updated = false
    cartStore = cartStore.foldLeft(Seq[Cart]()) { (result, it) =>
      if (it.id == cart.id) {
        updated = true
        result :+ cart
      } else {
        result :+ it
      }
    }

    if (updated == false) createCart(cart)
  }

  def getCartByUserId(id: Int) = all.filter(_.cid == id)(0)

  def delCartByUserId(id: Int) = all.filter(_.cid != id)

  // TODO burayı düzelt
  def checkoutCartByCartId(id: Int) = {
    cartStore = cartStore.filter(_.id != id)
  }

  def _seedDatabase = Logger.error("Beni sil")
}