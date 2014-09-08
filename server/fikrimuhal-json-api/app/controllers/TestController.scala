package controllers

import model.Cart
import play.api.Logger
import play.api.Play.current
import play.api.libs.iteratee.{Concurrent, Iteratee}
import play.api.libs.json.Json
import play.api.libs.ws._
import play.api.mvc.{Action, Controller, WebSocket}

import scala.collection.mutable.ListBuffer
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

  import scala.collection.mutable.ListBuffer
  var channelSeq = ListBuffer[Concurrent.Channel[String]]()

  def websocket = WebSocket.using[String] { request =>

    val (out, channel) = Concurrent.broadcast[String]
    val in = Iteratee.foreach[String] { msg =>
      println(msg)
      channel push ("RESPONSE:" + msg)
      channelSeq.foreach { c =>
        c.push("selam: " + msg)
        println("channelSeq log")
      }
    }

    channelSeq += channel

    Logger.debug("WEBSOCKET BAGLANDI" + channelSeq)

    channelSeq.foreach { c =>
      println(c)
    }

    (in, out)
  }

}
