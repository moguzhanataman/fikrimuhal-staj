package controllers

import play.api.libs.iteratee.{Enumerator, Iteratee}
import play.api.mvc._

import scala.concurrent.ExecutionContext.Implicits.global

object Application extends Controller {

  //  def index = Action {
  //    val products = toJson(List("shirt", "pants", "glasses"))
  //    val userInfo = Map("ad" -> 1, "soyad" -> "Süzen")
  //    val json = JsObject(
  //      Seq(
  //        "id"    -> JsNumber(1),
  //        "name"  -> JsString("asd"),
  //        "users" -> toJson(Seq(1, 2, 3))
  //      )
  //    )
  //    Ok(json)
  //  }

  def index = WebSocket.using[String] { request =>

    // Log events to the console
    val in = Iteratee.foreach[String](chunk => println(chunk))

    // Send a single 'Hello!' message
    val out = Enumerator("Hello!")

    (in, out)
  }

  def preflight(all: String) = Action {
    Ok("").withHeaders("Access-Control-Allow-Origin" -> "*",
      "Allow" -> "*",
      "Access-Control-Allow-Methods" -> "POST, GET, PUT, DELETE, OPTIONS",
      "Access-Control-Max-Age" -> "1728000",
      "Access-Control-Allow-Headers" -> "Origin, X-Requested-With, Content-Type, Accept, Referrer, User-Agent");
  }

}