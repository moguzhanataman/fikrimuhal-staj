package controllers

import controllers.EmployeeController._
import model.Product
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import play.api.{Logger, Play}

import scala.reflect.io.File

/**
 * Created by oguzhan on 8/20/14.
 */

object ProductController extends Controller {

  def list() = Action { request =>
    //    Ok(Json.toJson(Product.all))
    val host = request.headers.get("host").get

    val productAsMap = Map("products" -> Product.all.map { product =>
      val host = Play.current.configuration.getString("server.host").getOrElse("localhost")
      val fullUrl = s"http://${host}:9000/api/products/${product.id}/photo"
      product.copy(photo = fullUrl)
    })
    val productAsJson = Json.toJson(productAsMap)
    Ok(productAsJson)
  }

  def getProduct(id: Int) = Action { request =>
    val host = Play.current.configuration.getString("server.host").getOrElse("localhost")
    val product = Product.get(id).map { product =>
      val fullUrl = s"http://${host}:9000/api/products/${product.id}/photo"
      product.copy(photo = fullUrl)
    }
    val productJson = Json.toJson(product)
    Ok(productJson)
  }

  def getProductPhoto(id: Int) = Action {
    Product.get(id).map { product =>
      val imageBytes = File(product.photo).toByteArray()
      Ok(imageBytes).withHeaders(
        "content-type" -> "image/jpeg",
        "cache-control" -> s"public, max-age=${7 * 24 * 60 * 60}"
      )
    }.getOrElse(NotFound)
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