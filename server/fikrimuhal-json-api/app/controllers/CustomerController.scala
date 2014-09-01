package controllers

import model.{Product, Customer}
import play.api.Logger
import play.api.libs.json._
import play.api.mvc.{Action, Controller}

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
      Ok(Json.toJson(
        Map("id" -> Json.toJson(customer.id), "photoData" -> Json.toJson(customer.photoData))
      ))
    }.getOrElse(NotFound)
  }

  def getCustomerProducts(id: Int) = Action {
    Ok(Json.toJson(Product.all.map { product =>
      product.id
    }))
  }
}
