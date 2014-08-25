package controllers.product

import play.api.libs.functional.syntax._
import play.api.libs.json.{JsPath, Json, Writes}
import play.api.mvc.{Action, Controller}
import play.api.Logger
import model.Product

/**
 * Created by oguzhan on 8/20/14.
 */

object ProductController extends Controller {


  /**
   * Take most popular n Products
   * @param limit product number
   * @return
   */

  def popular() = popularLimit("10")

  def popularLimit(limit: String) = Action {
    val products = Product.takeMostPopular(limit.toInt)
    val productsJson = Json.toJson(products)

    Logger.debug(Json.prettyPrint(productsJson))
    Ok(productsJson)
  }

}