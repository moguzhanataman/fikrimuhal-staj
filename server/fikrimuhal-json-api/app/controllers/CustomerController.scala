package controllers

import model.Customer
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
    val customer = Customer.get(id)
    customer match {
      case Some(customer) => Ok(customer.photoData)
      case None => NotFound
    }
  }

  def getCustomerProducts(id: Int) = TODO
}
