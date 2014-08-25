package controllers.customer

import controllers.product.ProductController
import model.Customer
import play.api.Logger
import play.api.libs.functional.syntax._
import play.api.libs.json.{JsPath, Writes, _}
import play.api.mvc.{Action, Controller}

/**
 * Created by oguzhan on 8/20/14.
 */
object CustomerController extends Controller {


  def list() = Action {
    val customerAsMap = Map("customers" -> Customer.dummy)
    val customerAsJson = Json.toJson(customerAsMap)

    Logger.debug(Json.prettyPrint(customerAsJson))
    Ok(customerAsJson)
  }

  // TODO
  def get(id: String) = Action {
    Customer.get(id.toInt).map { e =>
      val customerJson = Json.toJson(e)
      Ok(customerJson)
    }.getOrElse(NotFound)
  }
}
