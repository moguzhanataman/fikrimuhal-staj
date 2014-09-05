package controllers

import model.{Customer, Product}
import play.api.{Play, Logger}
import play.api.libs.json._
import play.api.mvc.{Action, Controller}

import scala.reflect.io.File

/**
 * Created by oguzhan on 8/20/14.
 */
object CustomerController extends Controller {

  def getAllCustomerList() = Action {  request =>
    val host = request.headers.get("host").get

    val customerAsMap = Map("customers" -> Customer.all.map { customer =>
      val host = Play.current.configuration.getString("server.host").getOrElse("localhost")
      val fullUrl = s"http://${host}:9000/api/customers/${customer.id}/photo"
      customer.copy(photoData = fullUrl)
    })
    val customerAsJson = Json.toJson(customerAsMap)
    Ok(customerAsJson)
  }

  def getCurrentCustomerList() = getAllCustomerList()

  // TODO
  def getCustomer(id: Int) = Action { request =>
    val host = request.headers.get("host").get

    val customer = Customer.get(id).map { customer =>
      val fullUrl = s"http://${host}/api/customers/${customer.id}/photo"
      customer.copy(photoData = fullUrl)
    }
    val customerJson = Json.toJson(customer)
    Ok(customerJson)
  }

  def getCustomerPhoto(id: Int) = Action {
    Customer.get(id).map { customer =>

      val imageBytes = File(customer.photoData).toByteArray()
      Ok(imageBytes).withHeaders(
        "content-type" -> "image/jpeg",
        "cache-control" -> s"public, max-age=${7 * 24 * 60 * 60}"
      )
    }.getOrElse(NotFound)

  }

  def getCustomerProducts(id: Int) = Action {
    if(id == 5) {
      Ok(Json.toJson(Seq(1)))
    } else {
      Ok(Json.toJson(Product.all.map { product =>
        product.id
      }))
    }
  }
}
