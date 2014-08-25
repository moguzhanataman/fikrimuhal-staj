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
//  implicit val productWrites = new Writes[Product] {
//    def writes(product: Product) = Json.obj(
//      "id" -> product.id,
//      "name" -> product.name,
//      "price" -> product.price,
//      "popularity" -> product.popularity,
//      "photo" -> product.photo
//    )
//  }

  implicit val productWrites: Writes[Product] = (
    (JsPath \ "id").write[Int] and
      (JsPath \ "name").write[String] and
      (JsPath \ "price").write[BigDecimal] and
      (JsPath \ "popularity").write[Int] and
      (JsPath \ "photo").write[String]
    )(unlift(Product.unapply))

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