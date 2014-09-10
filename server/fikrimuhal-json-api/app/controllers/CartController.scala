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
    Ok(Json.toJson(Cart.getCartByUserId(id)))
  }


  def updateCart(id: Int) = Action(parse.json) { request =>
    val newCart = request.body.as[Cart]
    val success = Cart.updateCart(newCart)

    Ok(Json.toJson(newCart))
  }

  def deleteCart(id: Int) = TODO

  def checkoutCart(id: Int) = Action {
    Cart.checkoutCartByCartId(id)
    Ok(id + " li customer'ın cart'ı silindi")
  }

  def _seedDatabase = Action {
    Cart._seedDatabase
    Ok("Database seeded")
  }

}
