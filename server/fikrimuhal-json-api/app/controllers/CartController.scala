package controllers

import model.Cart
import play.api.Logger
import play.api.libs.json._
import play.api.mvc.{Action, Controller}


/**
 * Created by oguzhan on 8/20/14.
 */
object CartController extends Controller {

  def list() = Action {
    val cartAsMap = Map("carts" -> Cart.all)
    val cartsJson = Json.toJson(cartAsMap)

    Logger.debug(Json.prettyPrint(cartsJson))
    Ok(cartsJson)
  }

  def getCart(id: Int) = Action {
    NotImplemented
  }

  def deleteCart(id: Int) = TODO
  def updateCart(id: Int) = TODO
  def checkoutCart(id: Int) = TODO
}
