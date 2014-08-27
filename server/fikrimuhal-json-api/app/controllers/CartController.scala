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
    //    (request.body).asOpt[Seq[Cart]].map { cart =>
    //      Ok("Hello " + cart.pid + "\n" + cart.quantity + "\n")
    //    }.getOrElse {
    //      BadRequest("Missing parameter [name]\n")
    //    }

    request.body.validate[Seq[Cart]] map { cart =>
      Logger.debug(cart.toString)
      Ok(Json.toJson(Cart.getCartByUserId(id)))
    } getOrElse (NotFound("Error: JSON format is wrong"))

  }

  def deleteCart(id: Int) = TODO

  def checkoutCart(id: Int) = Action {
    Ok(Json.toJson(Cart.checkoutCartByUserId(id)))
  }

  def _seedDatabase = Action {
    Cart._seedDatabase
    Ok("Database seeded")
  }

}
