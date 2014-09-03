package controllers

import model.Cart
import org.apache.commons.codec.binary.Base64
import play.api.Logger
import play.api.Play.current
import play.api.libs.json.Json
import play.api.libs.ws._
import play.api.mvc.{Action, Controller}

import scala.concurrent.ExecutionContext.Implicits.global

/**
 * Created by oguzhan on 8/27/14.
 */
object TestController extends Controller {
  def testUpdateCart(id: Int) = Action.async {
    val url = s"http://localhost:9000/api/customers/$id/cart"
    val data = Json.toJson(Cart.getCartByUserId(id))
    Logger.debug("json: " + data.toString() + "id: " + id)
    WS.url(url).post(data).map { response =>
      Logger.debug("\nurl: " + url + "\ndata: " + data + "\nresponse: " + response.body)
      Ok("request sent: " + response.body)
    }
  }

  def testImages() = Action {
    val x = new java.io.File("./")
//    val imageByteArray = File("/home/oguzhan/staj/fikrimuhal-staj/server/fikrimuhal-json-api/public/data/profilePictures/1.jpg").toByteArray()
//    "data:image/png;base64," + Base64.encodeBase64String(imageByteArray)
    Ok(x.getAbsolutePath())
  }
}
