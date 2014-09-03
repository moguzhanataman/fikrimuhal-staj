package controllers

import model.{Customer, Product}
import play.api.Logger
import play.api.libs.json._
import play.api.mvc.{Action, Controller}

import scala.reflect.io.File

/**
 * Created by oguzhan on 8/20/14.
 */
object CustomerController extends Controller {

  def getAllCustomerList() = Action {
    val customerAsMap = Map("customers" -> Customer.all)
    val customerAsJson = Json.toJson(customerAsMap)

    Logger.debug(Json.prettyPrint(customerAsJson))
    Ok(customerAsJson)
  }

  def getCurrentCustomerList() = getAllCustomerList()

  // TODO
  def getCustomer(id: Int) = Action {
    Customer.get(id).map { e =>
      val customerJson = Json.toJson(e)
      Ok(customerJson)
    }.getOrElse(NotFound)
  }

  def getCustomerPhoto(id: Int) = Action {
    Customer.get(id).map { customer =>

      val imageBytes = File(customer.photoData).toByteArray()
      Ok(imageBytes).withHeaders(
        "content-type" -> "image/jpeg",
        "Cache-Control" -> s"public, max-age=${7 * 24 * 60 * 60}"
      )
    }.getOrElse(NotFound)

  }

  def getCustomerProducts(id: Int) = Action {
    Ok(Json.toJson(Product.all.map { product =>
      product.id
    }))
  }
}
