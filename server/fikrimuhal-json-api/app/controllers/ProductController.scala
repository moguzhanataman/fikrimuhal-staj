package controllers

import model.Product
import play.api.Logger
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}

/**
 * Created by oguzhan on 8/20/14.
 */

object ProductController extends Controller {

  def list() = Action {
    Ok(Json.toJson(Product.all))
  }

  def popular() = popularLimit("10")

  /**
   * Take most popular n Products
   * @param limit how many product do we want
   * @return
   */
  def popularLimit(limit: String) = Action {
    val products = Product.takeMostPopular(limit.toInt)
    val productsJson = Json.toJson(products)

    Logger.debug(Json.prettyPrint(productsJson))
    Ok(productsJson)
  }

}