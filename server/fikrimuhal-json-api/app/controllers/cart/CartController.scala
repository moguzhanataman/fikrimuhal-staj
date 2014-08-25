package controllers.cart

import controllers.product.ProductController
import model.Cart
import play.api.Logger
import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.mvc.{Action, Controller}


/**
 * Created by oguzhan on 8/20/14.
 */
object CartController extends Controller {
  implicit val cartWrites: Writes[Cart] = (
    (JsPath \ "id").write[Int] and
      (JsPath \ "customerId").write[Int] and
      (JsPath \ "employeeId").write[Int] and
      (JsPath \ "itemList").lazyWrite(Writes.traversableWrites[model.Product](ProductController.productWrites))
    )(unlift(Cart.unapply))

  def list() = Action {
    val cartAsMap = Map("carts" -> Cart.dummy)
    val cartsJson = Json.toJson(cartAsMap)

    Logger.debug(Json.prettyPrint(cartsJson))
    Ok(cartsJson)
  }

  def get(id: String) = Action {
    NotImplemented
  }
}
