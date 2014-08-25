package controllers

import play.api._
import play.api.libs.json.{JsNumber, JsString, JsObject}
import play.api.mvc._
import play.api.libs.json.Json.toJson

object Application extends Controller {

  def index = Action {
    val products = toJson(List("shirt", "pants", "glasses"))
    val userInfo = Map("ad" -> 1, "soyad" -> "Süzen")
    val json = JsObject(
      Seq(
        "id"    -> JsNumber(1),
        "name"  -> JsString("asd"),
        "users" -> toJson(Seq(1, 2, 3))
      )
    )
    Ok(json)
  }

}